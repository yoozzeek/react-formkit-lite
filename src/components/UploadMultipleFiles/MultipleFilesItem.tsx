import styles from "./multiple_files.module.css";
import { useState } from "react";
import { clsx } from "clsx";
import Loader from "../Loader";
import type { UploadedFileItem } from "@/types";
import CheckedIcon from "@/assets/icons/checked.svg?react";
import FileIcon from "@/assets/icons/file.svg?react";

const UploadMultipleFilesItem = (props: {
  mediaItem: UploadedFileItem;
  selected?: boolean;
  // eslint-disable-next-line no-unused-vars
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

    return <FileIcon className={styles.file__icon} />;
  }

  return (
    <li
      className={clsx(styles.file, props.selected && styles["file--selected"])}
      onClick={handleTap}
    >
      {renderContent()}
      {props.selected && (
        <div className={styles.file__overlay}>
          <CheckedIcon className={styles.file__check} />
        </div>
      )}
    </li>
  );
};

export default UploadMultipleFilesItem;
