import type { ReactElement, ReactNode, JSX } from "react";
import CloseIcon from "@/assets/icons/close.svg?react";
import { clsx } from "clsx";
import type { Variant } from "@/types";
import styles from "./badge.module.css";

function Badge({
  id,
  icon,
  variant = "light",
  onClick,
  onRemove,
  selected = false,
  children,
}: {
  id?: string;
  children: ReactNode;
  icon?: ReactElement | null;
  variant?: Variant;
  selected?: boolean;
  onClick?: (id: string) => void;
  onRemove?: (id: string) => void;
}): JSX.Element {
  function handleClick() {
    if (id) onClick?.(id);
  }

  function handleRemove() {
    if (id) onRemove?.(id);
  }

  const baseClass = clsx(styles["badge"], styles[`badge--${variant}`], {
    [styles["badge--selected"]]: selected && variant === "light",
    [styles["badge--clickable"]]: !!onClick,
  });

  const removeClass = clsx(styles["badge__remove"], {
    [styles["badge__remove--light"]]: !selected,
    [styles["badge__remove--dark"]]: selected,
  });

  return (
    <span className={baseClass} onClick={handleClick}>
      {icon && <span className={styles["badge__icon"]}>{icon}</span>}
      {children}
      {onRemove && (
        <button type="button" className={removeClass} onClick={handleRemove}>
          <CloseIcon className={styles["badge__remove-icon"]} />
        </button>
      )}
    </span>
  );
}

export default Badge;
