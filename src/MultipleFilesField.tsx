import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import AttachmentIcon from "../../../../assets/icons/attachment.svg";
import PlusIcon from "../../../../assets/icons/plus.svg";
import SimpleBar from "simplebar-react";
import UIMediaFilesItem, { MediaFileItemType } from "../MediaFilesItem";
import MediaFile from "../../../media/types";
import { mediaFileFactory } from "../../../uploader/factories";
import { useTranslation } from "next-i18next";
import classNames from "classnames";

type MultipleFilesFieldProps = {
  max?: number;
  label?: string | null;
  name?: string;
  helpText?: string | null;
  files: MediaFile[];
  loading?: boolean;
  interactiveMode?: boolean;
  disabled?: boolean;
  onFilesAdded: (file: File[]) => void;
  onFilesRemoved: (ids: string[]) => void;
};

const ACCEPTED_FILE_TYPES = "image/png,image/jpeg";

const UIMultipleFilesField: FC<MultipleFilesFieldProps> = ({
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
}) => {
  const { t } = useTranslation("common");
  const [filesCopy, setFilesCopy] = useState<MediaFileItemType[]>(
    files.map(mediaFileFactory),
  );
  const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
  const selectedLength = useMemo<number>(
    () => Object.values(selectedMap).length,
    [selectedMap],
  );

  const onFileUpload = useCallback(
    function uploadFile(e: ChangeEvent<HTMLInputElement>) {
      // const reader = new FileReader();
      const targetFiles = e.target.files;
      if (!targetFiles) return;

      // Read each file and push to uploadedMap
      const uploadedFiles: MediaFileItemType[] = [];
      const filesToUpload: File[] = [];
      for (let i = 0; i < targetFiles.length; i++) {
        let formattedName = targetFiles[i].name
          .replace(/ /g, "_")
          .toLowerCase();
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
    (file: MediaFileItemType) => {
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
    const deleteFile = (file: MediaFileItemType) => {
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

    onFilesRemoved(
      filesCopy.filter((f) => selectedMap[f.name]).map((f) => f.name),
    );
  }, [filesCopy, interactiveMode, selectedLength, selectedMap]);

  // Show upload area if there are no files uploaded
  if (!filesCopy.length) {
    return (
      <div
        className={classNames("relative", {
          "opacity-60": disabled,
        })}
      >
        <label
          htmlFor={name}
          className="flex items-center font-semibold text-green-500"
        >
          <AttachmentIcon className="mr-1.5 h-auto w-6" />
          {label}
        </label>
        <p className="block pt-2 text-sm text-gray-300">{helpText}</p>
        <input
          multiple
          id={name}
          name={name}
          type="file"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          disabled={disabled}
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
          {selectedLength > 0
            ? t("ui.multiple_files_uploader.selected_files", {
                count: selectedLength,
              })
            : t("ui.multiple_files_uploader.uploaded_media_filed", {
                count: filesCopy.length,
              })}
        </span>

        <button
          className="appearance-none transition-opacity duration-150 disabled:opacity-50"
          type="button"
          disabled={disabled || loading}
          onClick={() => handleDelete()}
        >
          {selectedLength > 0
            ? t("ui.multiple_files_uploader.delete")
            : t("ui.multiple_files_uploader.delete_all")}
        </button>
      </header>

      <SimpleBar autoHide>
        <ul className="flex gap-4 py-4">
          {filesCopy.map((file) => (
            <UIMediaFilesItem
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
            htmlFor={name}
            className={`flex items-center font-semibold text-green-500 ${
              filesCopy.length >= max ? "opacity-50" : ""
            }`}
          >
            <PlusIcon className="mr-1.5 h-7 w-7" />
            {label}

            <input
              multiple
              id={name}
              name={name}
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

export default UIMultipleFilesField;
