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
      className={clsx("relative flex items-center text-gray-900", "md:flex-row-reverse md:gap-3", {
        "border-b border-gray-100 px-4 py-4 last:border-none sm:px-6 md:border-none": props.isGroup,
        "flex-row-reverse": props.rightSideLabel,
        "opacity-50": props.disabled,
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        id={props.id}
        name={props.name || ""}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        type="checkbox"
        checked={props.value}
        disabled={props.disabled || false}
        onFocus={() => {
          setFocused(true);
          props.onFocus?.();
        }}
        onBlur={() => {
          setFocused(false);
        }}
        onChange={() => {
          if (props.onClick) {
            props.onClick(!props.value);
          }
        }}
      />

      {props.label && (
        <label
          htmlFor={props.id}
          className={clsx("ld-base flex-1 text-gray-800", {
            "pr-3": !props.rightSideLabel,
            "pl-3 md:pl-0": props.rightSideLabel,
          })}
        >
          {props.label}
        </label>
      )}

      {props.value ? (
        <span
          className={clsx("flex h-6 w-6 justify-center rounded-full md:rounded-xs md:p-1.5", {
            "bg-green-500": !hovered || props.disabled,
            "bg-green-600": hovered && !props.disabled,
            "opacity-50": props.disabled,
          })}
        >
          <CheckIcon className="h-[10px] w-[13px] self-center text-white" />
        </span>
      ) : (
        <span
          className={clsx(
            "inline-block h-6 w-6 appearance-none rounded-full border-2 bg-white",
            "focus:border-black md:rounded-xs",
            {
              "border-gray-200": !hovered && !focused,
              "border-gray-300": hovered && !focused,
              "border-green-500": focused,
            },
          )}
        />
      )}
    </div>
  );
};

export default memo(CheckboxField);
