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

const RadioField: (props: RadioFieldProps) => JSX.Element | null = ({
  name,
  value,
  label,
  disabled = false,
  lightVariant = false,
  checkedValue,
  onChange,
  onFocus,
}: RadioFieldProps) => {
  const isChecked = useMemo(
    () => (checkedValue ? checkedValue === value : false),
    [checkedValue, value],
  );
  return (
    <label
      className={clsx("flex cursor-pointer items-center text-lg", {
        "opacity-50": disabled,
        "cursor-pointer": !disabled,
        "text-gray-900": isChecked,
        "text-gray-800": !isChecked,
      })}
    >
      <input
        className={clsx(
          "grid h-7 w-7 shrink-0 cursor-pointer appearance-none place-content-center rounded-full border-2 bg-white",
          "before:h-5 before:w-5 before:scale-0 before:rounded-full before:bg-green-500",
          "checked:before:scale-95",
          {
            "mr-3": label,
            "border-green-500": !lightVariant,
            "border-gray-200 checked:border-green-500": lightVariant,
          },
        )}
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
