import styles from "./switch.module.css";
import type { FocusEvent } from "react";

type SwitchFieldProps = {
  id: string;
  name: string;
  label?: string | null;
  helpText?: string;
  value: boolean;
  // eslint-disable-next-line
  onChange: (value: boolean) => void;
  // eslint-disable-next-line
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
};

const SwitchField = ({ id, name, label, helpText, value, onFocus, onChange }: SwitchFieldProps) => {
  const helpId = `${id}-help`;

  return (
    <div className={styles.switch}>
      {(!!label || !!helpText) && (
        <div className={styles["switch__info"]}>
          {!!label && (
            <label htmlFor={id} className={styles["switch__label"]}>
              {label}
            </label>
          )}
          {!!helpText && (
            <p id={helpId} className={styles["switch__help"]}>
              {helpText}
            </p>
          )}
        </div>
      )}

      <label htmlFor={id} className={styles["switch__control"]}>
        <input
          id={id}
          name={name}
          checked={value}
          type="checkbox"
          className={styles["switch__input"]}
          aria-describedby={helpText ? helpId : undefined}
          onChange={(e) => onChange(e.target.checked)}
          onFocus={onFocus}
        />
        <span className={styles["switch__slider"]} />
      </label>
    </div>
  );
};

export default SwitchField;
