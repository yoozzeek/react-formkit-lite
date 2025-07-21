import styles from "./date.module.css";
import { memo, useState, useRef } from "react";
import useIMask from "react-imask/hook";
import { clsx } from "clsx";
import RemoveIcon from "@/assets/icons/remove.svg?react";
import { dateMask } from "@/utils/dateMask.ts";
import type { MouseEvent, RefObject, FocusEvent, JSX } from "react";
import type { CommonFieldProps } from "@/types";

interface DateFieldProps extends CommonFieldProps {
  ref?: RefObject<HTMLInputElement>;
  rows?: number;
  value: string;
  onChange?: (field: string, value: string, shouldValidate?: boolean | undefined) => void;
}

const UIDateField: (props: DateFieldProps) => JSX.Element = (props: DateFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [focused, onFocused] = useState<boolean>(false);
  const classes = clsx(
    "block rounded-lg border px-3 py-2.5 text-sm placeholder-gray-250 text-gray-900 appearance-none focus:outline-none focus:ring-1",
    {
      "w-full": props.fullWidth,
      "border-red-400 focus:ring-red-500": props.error,
      "border-gray-150 focus:ring-green-500": !props.error,
    },
  );

  // Use IMask for input masking
  const maskProps = useIMask(
    {
      mask: dateMask,
    },
    {
      ref: inputRef,
      onComplete: (value) => {
        if (props.onChange) props.onChange(props.id, value, true);
      },
    },
  );

  function handleReset(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (props.onReset) props.onReset(props.id, "", true);
  }

  function handleFocus(e: FocusEvent<HTMLInputElement>) {
    onFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  }

  return (
    <div
      className={clsx("", {
        "flex-1": props.fullWidth,
      })}
    >
      {props.label && (
        <label htmlFor={props.id} className="block pb-1.5 font-semibold text-gray-900">
          {props.label}
          {props.required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}
      <div className="relative block">
        <input
          ref={maskProps.ref}
          className={classes}
          type="text"
          id={props.id}
          name={props.name as string}
          placeholder={props.placeholder || "MM-DD-YYYY"}
          defaultValue={props.value}
          onFocus={handleFocus}
        />
        {props.value && focused && (
          <button
            className="absolute top-2.5 right-3 z-10 h-6 w-6 cursor-pointer"
            role="button"
            onClick={handleReset}
          >
            <RemoveIcon className="text-gray-200" />
          </button>
        )}
      </div>
      {props.error && <span className="block pt-1.5 text-xs text-red-400">{props.error}</span>}
      {props.helpText && (
        <span className="block pt-1.5 text-xs text-gray-300">{props.helpText}</span>
      )}
    </div>
  );
};

export default memo(UIDateField);
