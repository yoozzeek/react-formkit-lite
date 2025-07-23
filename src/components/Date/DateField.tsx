import { memo, useState, useRef } from "react";
import useIMask from "react-imask/hook";
import { clsx } from "clsx";
import RemoveIcon from "@/assets/icons/remove.svg?react";
import { dateMask } from "@/utils/dateMask.ts";
import type { MouseEvent, RefObject, FocusEvent, JSX } from "react";
import type { CommonFieldProps } from "@/types";
import styles from "./date.module.css";

interface DateFieldProps extends CommonFieldProps {
  ref?: RefObject<HTMLInputElement>;
  rows?: number;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (field: string, value: string, shouldValidate?: boolean | undefined) => void;
}

const DateField = (props: DateFieldProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [focused, onFocused] = useState(false);

  const maskProps = useIMask(
    {
      mask: dateMask,
    },
    {
      ref: inputRef,
      onComplete: (value) => {
        props.onChange?.(props.id, value, true);
      },
    },
  );

  function handleReset(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    props.onReset?.(props.id, "", true);
  }

  function handleFocus(e: FocusEvent<HTMLInputElement>) {
    onFocused(true);
    props.onFocus?.(e);
  }

  return (
    <div
      className={clsx(styles["date-field"], {
        [styles["date-field--full"]]: props.fullWidth,
      })}
    >
      {props.label && (
        <label htmlFor={props.id} className={styles["date-field__label"]}>
          {props.label}
          {props.required && <span className={styles["date-field__required"]}>*</span>}
        </label>
      )}

      <div className={styles["date-field__wrapper"]}>
        <input
          ref={maskProps.ref}
          className={clsx(styles["date-field__input"], {
            [styles["date-field__input--error"]]: props.error,
            [styles["date-field__input--valid"]]: !props.error,
          })}
          type="text"
          id={props.id}
          name={props.name as string}
          placeholder={props.placeholder || "MM-DD-YYYY"}
          defaultValue={props.value}
          onFocus={handleFocus}
        />

        {props.value && focused && (
          <button
            className={styles["date-field__reset-button"]}
            role="button"
            onClick={handleReset}
          >
            <RemoveIcon className={styles["date-field__reset-icon"]} />
          </button>
        )}
      </div>

      {props.error && <span className={styles["date-field__error"]}>{props.error}</span>}
      {props.helpText && <span className={styles["date-field__help"]}>{props.helpText}</span>}
    </div>
  );
};

export default memo(DateField);
