import styles from "./multiple_files.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import SimpleBar from "simplebar-react";
//import UIMediaFilesItem, { MediaFileItemType } from "../MediaFilesItem";
import type { UploadedFileItem } from "@/types";
import { clsx } from "clsx";
import PlusIcon from "@/assets/icons/plus.svg?react";
import AttachmentIcon from "@/assets/icons/attachment.svg?react";
import UploadedFilesItem from "@/components/MultipleFiles/UploadedFilesItem.tsx";

type MultipleFilesFieldProps = {
  max?: number;
  label?: string | null;
  name?: string;
  helpText?: string | null;
  files: UploadedFileItem[];
  loading?: boolean;
  interactiveMode?: boolean;
  disabled?: boolean;
  onFilesAdded: (file: File[]) => void;
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

const MultipleFilesField = ({
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
}: MultipleFilesFieldProps) => {
  const [filesCopy, setFilesCopy] = useState<UploadedFileItem[]>(files);
  const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
  const selectedLength = useMemo<number>(() => Object.values(selectedMap).length, [selectedMap]);

  const onFileUpload = useCallback(
    function uploadFile(e: ChangeEvent<HTMLInputElement>) {
      // const reader = new FileReader();
      const targetFiles = e.target.files;
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
      <div
        className={clsx("relative", {
          "opacity-60": disabled,
        })}
      >
        <label htmlFor={name as string} className="flex items-center font-semibold text-green-500">
          <AttachmentIcon className="mr-1.5 h-auto w-6" />
          {label}
        </label>
        <p className="block pt-2 text-sm text-gray-300">{helpText}</p>
        <input
          multiple
          id={name as string}
          name={name as string}
          type="file"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          disabled={disabled || false}
          accept={ACCEPTED_FILE_TYPES}
          onChange={onFileUpload}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <header className="mb-2 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">
          {selectedLength > 0 ? `Selected (${selectedLength})` : "Select files"}
        </span>

        <button
          className="appearance-none transition-opacity duration-150 disabled:opacity-50"
          type="button"
          disabled={disabled || loading || false}
          onClick={() => handleDelete()}
        >
          {selectedLength > 0 ? "Delete selected" : "Delete all"}
        </button>
      </header>

      <SimpleBar autoHide>
        <ul className="flex gap-4 py-4">
          {filesCopy.map((file) => (
            <UploadedFilesItem
              key={file.name}
              mediaItem={file}
              selected={selectedMap[file.name]}
              onSelect={handleSelect}
            />
          ))}
        </ul>
      </SimpleBar>

      {!disabled && (
        <div className="relative mt-4 cursor-pointer">
          <label
            htmlFor={name as string}
            className={`flex items-center font-semibold text-green-500 ${
              filesCopy.length >= max ? "opacity-50" : ""
            }`}
          >
            <PlusIcon className="mr-1.5 h-7 w-7" />
            {label}

            <input
              multiple
              id={name as string}
              name={name as string}
              type="file"
              className="absolute inset-0 h-full w-full opacity-0"
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

export default MultipleFilesField;
