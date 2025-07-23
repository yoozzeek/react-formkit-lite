import LoaderIcon from "@/assets/icons/loader.svg?react";
import { clsx } from "clsx";
import styles from "./loader.module.css";

const Loader = ({
  className,
  size = "md",
  text,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}) => {
  const iconSizeClass = {
    sm: styles["loader__icon--sm"],
    md: styles["loader__icon--md"],
    lg: styles["loader__icon--lg"],
  }[size];

  const textSizeClass = {
    sm: styles["loader__text--sm"],
    md: styles["loader__text--md"],
    lg: styles["loader__text--md"],
  }[size];

  return (
    <div className={styles.loader}>
      <LoaderIcon className={clsx(styles["loader__icon"], iconSizeClass, className)} />
      {text && <span className={clsx(styles["loader__text"], textSizeClass)}>{text}</span>}
      <span className={styles["loader__sr-only"]}>Loading...</span>
    </div>
  );
};

export default Loader;
