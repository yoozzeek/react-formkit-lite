import styles from "./multiple_files.module.css";
import { useState } from "react";
import { clsx } from "clsx";
import Loader from "../Loader";
import type { UploadedFileItem } from "@/types";
import CheckedIcon from "@/assets/icons/checked.svg?react";
import FileIcon from "@/assets/icons/file.svg?react";

const MediaFilesItem = (props: {
  mediaItem: UploadedFileItem;
  selected?: boolean;
  onSelect?: (file: UploadedFileItem) => void;
}) => {
  const [imageLoaded, setImageLoaded] = useState(props.mediaItem.type !== "image");

  function handleTap() {
    props.onSelect?.(props.mediaItem);
  }

  function renderContent() {
    if (!imageLoaded && props.mediaItem.isPlaceholder) {
      return <Loader size="sm" />;
    }

    // Show image
    if (props.mediaItem.type === "image") {
      return (
        <img
          width={60}
          height={60}
          alt="Media file"
          src={props.mediaItem.url}
          onLoad={() => setImageLoaded(true)}
          style={{
            width: 60,
            height: 60,
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      );
    }

    // If it's a pdf, render the file icon
    return <FileIcon className="-mr-0.5 h-6 w-6" />;
  }

  return (
    <li
      className={clsx(
        "flex shrink-0 cursor-pointer items-center justify-center",
        "relative h-[60px] w-[60px] rounded-[2px] bg-gray-100",
        "transition-transform duration-200 ease-in-out hover:scale-105",
      )}
      onClick={handleTap}
    >
      {renderContent()}
      {props.selected && (
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-gray-800/50">
          <CheckedIcon className="h-7 w-7 text-white" />
        </div>
      )}
    </li>
  );
};

export default MediaFilesItem;
