import React, { DragEvent, FC, ReactElement, useRef } from "react";
import { UIVariant } from "../types";
import classNames from "classnames";

const UIUploadArea: FC<{
  title?: string | null;
  description?: string | null;
  icon?: ReactElement;
  accept?: string;
  variant?: UIVariant;
  onSelectFile: (files: FileList | null) => void;
}> = ({
  title = "Drop video to upload, or browse",
  icon,
  accept = "image/*",
  variant = "light",
  description,
  onSelectFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragHover, setDragHover] = React.useState(false);

  function dropHandler(ev: any) {
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
      className={classNames(
        "flex h-full w-full flex-col items-center justify-center",
        "cursor-pointer rounded-3xl py-10 text-center",
        "border border-dashed border-green-500",
        "transition-colors duration-200",
        {
          "bg-gray-100": variant === "light" && !dragHover,
          "bg-gray-800": variant === "dark" && !dragHover,
          "bg-gray-150": dragHover && variant === "light",
          "bg-gray-700": dragHover && variant === "dark",
        }
      )}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onClick={() => {
        fileInputRef.current?.click();
      }}
    >
      {icon && <span className="mb-4">{icon}</span>}
      <h5
        className={classNames("mx-8 mb-2", {
          "text-gray-900": variant === "light",
          "text-gray-100": variant === "dark",
        })}
      >
        {title}
      </h5>
      {description && (
        <p
          className={classNames("mx-4 text-xs", {
            "text-gray-300": variant === "light",
            "text-gray-200": variant === "dark",
          })}
        >
          {description}
        </p>
      )}
      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept={accept}
        onChange={(e) => onSelectFile(e.target.files)}
      />
    </div>
  );
};

export default UIUploadArea;
