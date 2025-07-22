import { memo, useState } from "react";
import { clsx } from "clsx";
import CheckIcon from "@/assets/icons/check.svg?react";
import type { JSX } from "react";
import type { CommonFieldProps } from "@/types";
import styles from "./Checkbox.module.css";

interface CheckboxFieldProps extends CommonFieldProps {
  value: boolean;
  isGroup?: boolean;
  rightSideLabel?: boolean;
  disabled?: boolean;
  onFocus?: () => void;
  onClick?: (checked: boolean) => void;
}

const CheckboxField = ({
  id,
  name,
  label,
  value,
  isGroup,
  rightSideLabel,
  disabled,
  onClick,
  onFocus,
}: CheckboxFieldProps): JSX.Element => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={clsx(styles["checkbox-field"], {
        [styles["checkbox-field--group"]]: isGroup,
        [styles["checkbox-field--right-label"]]: rightSideLabel,
        [styles["checkbox-field--disabled"]]: disabled,
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        id={id}
        name={name}
        className={styles["checkbox-field__input"]}
        type="checkbox"
        checked={value}
        disabled={disabled}
        onFocus={() => {
          setFocused(true);
          onFocus?.();
        }}
        onBlur={() => setFocused(false)}
        onChange={() => {
          onClick?.(!value);
        }}
      />

      {label && (
        <label
          htmlFor={id}
          className={clsx(
            styles["checkbox-field__label"],
            rightSideLabel
              ? styles["checkbox-field__label--right"]
              : styles["checkbox-field__label--left"],
          )}
        >
          {label}
        </label>
      )}

      {value ? (
        <span
          className={clsx(styles["checkbox-field__checked"], {
            [styles["checkbox-field__checked--hovered"]]: hovered && !disabled,
          })}
        >
          <CheckIcon className={styles["checkbox-field__check-icon"]} />
        </span>
      ) : (
        <span
          className={clsx(styles["checkbox-field__unchecked"], {
            [styles["checkbox-field__unchecked--hovered"]]: hovered && !focused,
            [styles["checkbox-field__unchecked--focused"]]: focused,
          })}
        />
      )}
    </div>
  );
};

export default memo(CheckboxField);
