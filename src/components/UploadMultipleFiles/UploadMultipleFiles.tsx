import styles from "./multiple_files.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import SimpleBar from "simplebar-react";
//import UIMediaFilesItem, { MediaFileItemType } from "../MediaFilesItem";
import type { UploadedFileItem } from "@/types";
import { clsx } from "clsx";
import PlusIcon from "@/assets/icons/plus.svg?react";
import AttachmentIcon from "@/assets/icons/attachment.svg?react";
import UploadMultipleFilesItem from "@/components/UploadMultipleFiles/MultipleFilesItem";

type UploadMultipleFilesProps = {
  max?: number;
  label?: string | null;
  name?: string;
  helpText?: string | null;
  files: UploadedFileItem[];
  loading?: boolean;
  interactiveMode?: boolean;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onFilesAdded: (file: File[]) => void;
  // eslint-disable-next-line no-unused-vars
  onFilesRemoved: (ids: string[]) => void;
};

const ACCEPTED_FILE_TYPES = "image/png,image/jpeg";

function getFileNameFromUrl(url: string): string {
  return url.split("/").pop() || url;
}

function mediaFileFactory(file: UploadedFileItem): UploadedFileItem {
  const isImage = file.url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  return {
    url: file.url,
    // Take last part of URL with extension as a file name
    name: getFileNameFromUrl(file.url),
    type: isImage ? "image" : "pdf",
  };
}

const UploadMultipleFiles = ({
  max = 10,
  label,
  helpText,
  name,
  files = [],
  interactiveMode = false,
  disabled = false,
  loading = false,
  onFilesAdded,
  onFilesRemoved,
}: UploadMultipleFilesProps) => {
  const [filesCopy, setFilesCopy] = useState<UploadedFileItem[]>(files);
  const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
  const selectedLength = useMemo<number>(() => Object.values(selectedMap).length, [selectedMap]);

  const onFileUpload = useCallback(
    function uploadFile(e: ChangeEvent<HTMLInputElement>) {
      // const reader = new FileReader();
      const targetFiles = e.target["files"];
      if (!targetFiles) return;

      // Read each file and push to uploadedMap
      const uploadedFiles: UploadedFileItem[] = [];
      const filesToUpload: File[] = [];
      for (let i = 0; i < targetFiles.length; i++) {
        let formattedName = targetFiles[i].name.replace(/ /g, "_").toLowerCase();
        formattedName = `${filesCopy.length}_${formattedName}`;
        const file = new File([targetFiles[i]], formattedName, {
          type: targetFiles[i].type,
        });

        const type = file.type.split("/")[0];
        filesToUpload.push(file);
        uploadedFiles.push({
          type,
          // eslint-disable-next-line no-undef
          url: (URL || webkitURL).createObjectURL(file),
          name: formattedName,
        });
      }

      // Update the filesCopy state
      if (!interactiveMode) {
        setFilesCopy((prev) => [...prev, ...uploadedFiles]);
      } else {
        // Add files placeholders
        setFilesCopy((prev) => [
          ...prev,
          ...uploadedFiles.map((file) => ({ ...file, isPlaceholder: true })),
        ]);
      }

      if (filesToUpload.length) {
        onFilesAdded(filesToUpload);
      }
    },
    [filesCopy, interactiveMode],
  );

  // Reset selectedMap when files change
  useEffect(() => {
    setSelectedMap({});
    setFilesCopy(files.map(mediaFileFactory));
  }, [files]);

  // Revoke all object URLs when unmounting
  useEffect(() => {
    if (interactiveMode) return;
    return () => {
      filesCopy.forEach((f) => {
        if (f.url.includes("blob:")) {
          // eslint-disable-next-line no-undef
          (URL || webkitURL).revokeObjectURL(f.url);
        }
      });
    };
  }, []);

  const handleSelect = useCallback(
    (file: UploadedFileItem) => {
      if (disabled) return;
      setSelectedMap((prev) => {
        const newMap = { ...prev };
        if (newMap[file.name]) {
          delete newMap[file.name];
        } else {
          newMap[file.name] = true;
        }
        return newMap;
      });
    },
    [disabled],
  );

  const handleDelete = useCallback(() => {
    const deleteFile = (file: UploadedFileItem) => {
      // Revoking object URL if file is a blob
      if (file.url.includes("blob:")) {
        // eslint-disable-next-line no-undef
        (URL || webkitURL).revokeObjectURL(file.url);
      }
    };

    // Delete all if no one file selected
    if (!selectedLength) {
      if (!interactiveMode) {
        filesCopy.forEach(deleteFile);
        setFilesCopy([]);
        setSelectedMap({});
      }

      onFilesRemoved(filesCopy.map((f) => f.name));
      return;
    }

    // Delete only selected files
    if (!interactiveMode) {
      filesCopy.filter((f) => selectedMap[f.name]).forEach(deleteFile);
      setFilesCopy((prev) => prev.filter((f) => !selectedMap[f.name]));
      setSelectedMap({});
    }

    onFilesRemoved(filesCopy.filter((f) => selectedMap[f.name]).map((f) => f.name));
  }, [filesCopy, interactiveMode, selectedLength, selectedMap]);

  // Show upload area if there are no files uploaded
  if (!filesCopy.length) {
    return (
      <div className={clsx(styles["multiple-upload"], disabled && styles["upload--disabled"])}>
        <label htmlFor={name as string} className={styles["multiple-upload__label"]}>
          <AttachmentIcon className={styles["multiple-upload__icon"]} />
          {label}
        </label>
        {helpText && <p className={styles["multiple-upload__help"]}>{helpText}</p>}
        <input
          multiple
          id={name as string}
          name={name as string}
          type="file"
          className={styles["multiple-upload__input"]}
          disabled={disabled as boolean}
          accept={ACCEPTED_FILE_TYPES}
          onChange={onFileUpload}
        />
      </div>
    );
  }

  return (
    <div className={styles["multiple-upload-files"]}>
      <header className={styles["multiple-upload-files__header"]}>
        <span className={styles["multiple-upload-files__title"]}>
          {selectedLength > 0 ? `Selected (${selectedLength})` : "Select files"}
        </span>

        <button
          className={styles["multiple-upload-files__delete"]}
          type="button"
          disabled={(disabled || loading) as boolean}
          onClick={handleDelete}
        >
          {selectedLength > 0 ? "Delete selected" : "Delete all"}
        </button>
      </header>

      <SimpleBar autoHide>
        <ul className={styles["multiple-upload-files__list"]}>
          {filesCopy.map((file) => (
            <UploadMultipleFilesItem
              key={file.name}
              mediaItem={file}
              selected={selectedMap[file.name]}
              onSelect={handleSelect}
            />
          ))}
        </ul>
      </SimpleBar>

      {!disabled && (
        <div className={styles["multiple-upload__addBox"]}>
          <label
            htmlFor={name as string}
            className={clsx(
              styles["multiple-upload__add"],
              filesCopy.length >= max && styles["upload__add--disabled"],
            )}
          >
            <PlusIcon className={styles["multiple-upload__addIcon"]} />
            {label}
            <input
              multiple
              id={name as string}
              name={name as string}
              type="file"
              className={styles["multiple-upload__input"]}
              accept={ACCEPTED_FILE_TYPES}
              disabled={disabled || filesCopy.length > max}
              onChange={onFileUpload}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default UploadMultipleFiles;
