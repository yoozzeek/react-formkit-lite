import styles from "./range.module.css";
import { useEffect, useState } from "react";
import type { ChangeEvent, ChangeEventHandler } from "react";
import { clsx } from "clsx";
import useDebounce from "@/hooks/useDebounce";

type RangeFieldProps = {
  id: string;
  name: string;
  value: number;
  min?: number;
  max?: number;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  step?: number;
  label?: string;
  disabled?: boolean;
  onValueChange?: (value: number) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const RangeField = ({
  id,
  name,
  min = 0,
  max = 100,
  minPlaceholder,
  maxPlaceholder,
  step = 1,
  label,
  disabled = false,
  value,
  onValueChange,
  onFocus,
}: RangeFieldProps) => {
  const [internalValue, setInternalValue] = useState<number>(value);
  const debouncedValue = useDebounce(internalValue, 50);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    onValueChange?.(debouncedValue);
  }, [debouncedValue]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setInternalValue(Number(value));
  }

  function handleFocus(e: ChangeEvent<HTMLInputElement>) {
    onFocus?.(e);
  }

  return (
    <div>
      {!!label && (
        <label htmlFor={id} className={styles.range__label}>
          {label}
        </label>
      )}
      <div
        className={clsx(styles.range, {
          [styles["range--disabled"]]: disabled,
        })}
      >
        {minPlaceholder && (
          <span className={clsx(styles.range__placeholder, styles["range__placeholder--left"])}>
            {minPlaceholder}
          </span>
        )}
        <input
          id={id}
          name={name}
          type="range"
          value={internalValue}
          min={min as number}
          max={max as number}
          step={step as number}
          disabled={disabled as boolean}
          onChange={handleChange}
          onFocus={handleFocus}
          className={styles.range__input}
        />
        {maxPlaceholder && (
          <span className={clsx(styles.range__placeholder, styles["range__placeholder--right"])}>
            {maxPlaceholder}
          </span>
        )}
      </div>
    </div>
  );
};

export default RangeField;
