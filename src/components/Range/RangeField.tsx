import styles from "./range.module.css";
import { useEffect, useRef } from "react";
import type { ChangeEvent, FocusEvent } from "react";
import { clsx } from "clsx";

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
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (value: number) => void;
  // eslint-disable-next-line no-unused-vars
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
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
  const inputRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<number | null>(null);
  const pendingRef = useRef<number>(value);

  // Uncontrolled thumb
  useEffect(() => {
    const el = inputRef.current;
    if (el && Number(el.value) !== value) {
      el.value = String(value);
    }

    pendingRef.current = value;
  }, [value]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  function flush() {
    frameRef.current = null;
    onValueChange?.(pendingRef.current);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    pendingRef.current = Number(e.currentTarget.value);

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(flush);
    }
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
          ref={inputRef}
          id={id}
          name={name}
          type="range"
          defaultValue={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={handleChange}
          onFocus={onFocus}
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
