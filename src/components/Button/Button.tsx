import { clsx } from "clsx";
import LoadingIcon from "@/components/Loader";
import type { MouseEvent, ReactNode, JSX } from "react";
import type { Size } from "@/types";
import styles from "./button.module.css";

type ButtonTypes = "button" | "submit" | "reset";

interface ButtonProps {
  children: ReactNode;
  type?: ButtonTypes;
  variant?:
    | "light"
    | "dark"
    | "outline-light"
    | "outline-green"
    | "outline-warning"
    | "success"
    | "danger"
    | "warning"
    | "gray"
    | "none";
  size?: Size | "icon";
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  fullWidth = false,
  type = "button",
  size = "md",
  disabled = false,
  loading = false,
  loadingText,
  variant = "light",
  onClick,
  children,
}: ButtonProps): JSX.Element {
  const variantClass = styles[`button--${variant}`];
  const sizeClass = styles[`button--${size}`];

  const loadingIconClass = clsx(styles["button__loading-icon"], {
    [styles["button__loading-icon--white"]]: [
      "success",
      "danger",
      "warning",
      "outline-light",
    ].includes(variant!),
    [styles["button__loading-icon--dark"]]: variant === "light",
    [styles["button__loading-icon--green"]]: variant === "outline-green",
    [styles["button__loading-icon--warning"]]: variant === "outline-warning",
  });

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(styles.button, variantClass, sizeClass, {
        [styles["button--full-width"]]: fullWidth,
        [styles["button--loading"]]: loading,
      })}
    >
      {loading && variant !== "none" ? (
        <>
          <LoadingIcon className={loadingIconClass} />
          {loadingText && <span className={styles["button__loading-text"]}>{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
