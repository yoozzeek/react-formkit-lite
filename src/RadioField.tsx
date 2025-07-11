import { FC, memo, ReactElement, ReactNode, useMemo } from "react";
import classNames from "classnames";

type UIRadioFieldProps = {
  label?: string | ReactElement;
  name: string;
  value: string | number;
  disabled?: boolean;
  lightVariant?: boolean;
  checkedValue?: string | number;
  onChange?: any;
  onFocus?: any;
};

const RadioField: FC<UIRadioFieldProps> = ({
  name,
  value,
  label,
  disabled = false,
  lightVariant = false,
  checkedValue,
  onChange,
  onFocus,
}) => {
  const isChecked = useMemo(
    () => (checkedValue ? checkedValue === value : false),
    [checkedValue, value]
  );
  return (
    <label
      className={classNames("flex cursor-pointer items-center text-lg", {
        "opacity-50": disabled,
        "cursor-pointer": !disabled,
        "text-gray-900": isChecked,
        "text-gray-800": !isChecked,
      })}
    >
      <input
        className={classNames(
          "grid h-7 w-7 shrink-0 cursor-pointer appearance-none place-content-center rounded-full border-2 bg-white",
          "before:h-5 before:w-5 before:scale-0 before:rounded-full before:bg-green-500",
          "checked:before:scale-95",
          {
            "mr-3": label,
            "border-green-500": !lightVariant,
            "border-gray-200 checked:border-green-500": lightVariant,
          }
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

export const UIRadioField = memo(RadioField);

type UIRadioGroupProps = {
  label: string;
  ariaLabel?: string;
  error?: string;
  children: ReactNode;
};

const UIRadioGroup: FC<UIRadioGroupProps> = ({
  ariaLabel = "radio-group",
  label,
  error,
  children,
}) => {
  return (
    <div role="group" aria-labelledby={ariaLabel}>
      <span className="block pb-4 font-semibold text-gray-900">{label}</span>
      {children}
      {error && <p className="mt-4 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default UIRadioGroup;
