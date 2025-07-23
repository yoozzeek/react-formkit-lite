import styles from "./radio.module.css";
import { memo, useMemo } from "react";
import type { JSX, ReactElement } from "react";
import { clsx } from "clsx";

type RadioFieldProps = {
  label?: string | ReactElement;
  name: string;
  value: string | number;
  disabled?: boolean;
  lightVariant?: boolean;
  checkedValue?: string | number;
  onChange?: () => void;
  onFocus?: () => void;
};

const RadioField = ({
  name,
  value,
  label,
  disabled = false,
  lightVariant = false,
  checkedValue,
  onChange,
  onFocus,
}: RadioFieldProps): JSX.Element | null => {
  const isChecked = useMemo(
    () => (checkedValue ? checkedValue === value : false),
    [checkedValue, value],
  );

  return (
    <label
      className={clsx(styles.radio, {
        [styles["radio--disabled"]]: disabled,
        [styles["radio--checked"]]: isChecked,
        [styles["radio--unchecked"]]: !isChecked,
      })}
    >
      <input
        className={clsx(styles.radio__input, {
          [styles["radio__input--spaced"]]: label,
          [styles["radio__input--primary"]]: !lightVariant,
          [styles["radio__input--light"]]: lightVariant,
        })}
        disabled={disabled}
        checked={isChecked}
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
      {label && label}
    </label>
  );
};

export default memo(RadioField);
