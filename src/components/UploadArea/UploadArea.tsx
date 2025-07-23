import styles from "./upload.module.css";
import React, { useRef } from "react";
import type { DragEvent, FC, ReactElement } from "react";
import type { Variant } from "@/types";
import { clsx } from "clsx";

const UploadArea: FC<{
  title?: string | null;
  description?: string | null;
  icon?: ReactElement;
  accept?: string;
  variant?: Variant;
  // eslint-disable-next-line no-unused-vars
  onSelectFile: (files: FileList | null) => void;
}> = ({
  title = "Drop video to upload, or browse",
  icon,
  accept = "image/*",
  variant = "light",
  description,
  onSelectFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [dragHover, setDragHover] = React.useState(false);

  function dropHandler(ev: DragEvent<HTMLDivElement>) {
    ev.preventDefault();

    onSelectFile(ev.dataTransfer.files);
    setDragHover(false);

    // if (ev.dataTransfer.items) {
    //   // Use DataTransferItemList interface to access the file(s)
    //   for (let i = 0; i < ev.dataTransfer.items.length; i++) {
    //     // If dropped items aren't files, reject them
    //     if (ev.dataTransfer.items[i].kind === "file") {
    //       const file = ev.dataTransfer.items[i].getAsFile();
    //       onSelectFile(file);
    //     }
    //   }
    // } else {
    //   // Use DataTransfer interface to access the file(s)
    //   // for (let i = 0; i < ev.dataTransfer.files.length; i++) {
    //   //   files.push(ev.dataTransfer.files[i]);
    //   // }
    //   onSelectFile(ev.dataTransfer.files)
    // }
  }

  function dragOverHandler(e: DragEvent) {
    e.preventDefault();
    if (!dragHover) {
      setDragHover(true);
    }
  }

  function dragLeaveHandler(e: DragEvent) {
    e.preventDefault();
    if (dragHover) {
      setDragHover(false);
    }
  }

  return (
    <div
      className={clsx(
        styles.upload,
        variant === "light" && !dragHover && styles["upload--light"],
        variant === "dark" && !dragHover && styles["upload--dark"],
        dragHover && variant === "light" && styles["upload--drag-light"],
        dragHover && variant === "dark" && styles["upload--drag-dark"],
      )}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onClick={() => {
        fileInputRef.current?.click();
      }}
    >
      {icon && <span className={styles.upload__icon}>{icon}</span>}
      <h5
        className={clsx(
          styles.upload__title,
          variant === "light" && styles["upload__title--light"],
          variant === "dark" && styles["upload__title--dark"],
        )}
      >
        {title}
      </h5>
      {description && (
        <p
          className={clsx(
            styles.upload__description,
            variant === "light" && styles["upload__description--light"],
            variant === "dark" && styles["upload__description--dark"],
          )}
        >
          {description}
        </p>
      )}
      <input
        ref={fileInputRef}
        className={styles.upload__input}
        type="file"
        accept={accept}
        onChange={(e) => onSelectFile(e.target.files)}
      />
    </div>
  );
};

export default UploadArea;
