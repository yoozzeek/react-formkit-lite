import styles from "./checkbox.module.css";
import { memo, useState } from "react";
import { clsx } from "clsx";
import CheckIcon from "@/assets/icons/check.svg?react";
import type { JSX } from "react";
import type { CommonFieldProps } from "@/types";

interface CheckboxFieldProps extends CommonFieldProps {
  value: boolean;
  isGroup?: boolean;
  rightSideLabel?: boolean;
  disabled?: boolean;
  onFocus?: () => void;
  onClick?: (checked: boolean) => void;
}

const CheckboxField: (props: CheckboxFieldProps) => JSX.Element = (props: CheckboxFieldProps) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <div
      className={clsx(styles.checkbox, {
        [styles.checkbox__group]: props.isGroup,
        [styles.checkbox__right_label]: props.rightSideLabel,
        [styles.checkbox__disabled]: props.disabled,
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        id={props.id}
        name={props.name || ""}
        className={styles.checkbox__input}
        type="checkbox"
        checked={props.value}
        disabled={props.disabled || false}
        onFocus={() => {
          setFocused(true);
          props.onFocus?.();
        }}
        onBlur={() => setFocused(false)}
        onChange={() => {
          if (props.onClick) {
            props.onClick(!props.value);
          }
        }}
      />

      {props.label && (
        <label
          htmlFor={props.id}
          className={clsx(styles.checkbox__label, {
            [styles.checkbox__label_right]: props.rightSideLabel,
            [styles.checkbox__label_left]: !props.rightSideLabel,
          })}
        >
          {props.label}
        </label>
      )}

      {props.value ? (
        <span
          className={clsx(styles.checkbox__checked, {
            [styles.checkbox__checked_hover]: hovered && !props.disabled,
            [styles.checkbox__checked_disabled]: props.disabled,
          })}
        >
          <CheckIcon className={styles.checkbox__checkicon} />
        </span>
      ) : (
        <span
          className={clsx(styles.checkbox__box, {
            [styles.checkbox__box_default]: !hovered && !focused,
            [styles.checkbox__box_hover]: hovered && !focused,
            [styles.checkbox__box_focus]: focused,
          })}
        />
      )}
    </div>
  );
};

export default memo(CheckboxField);
