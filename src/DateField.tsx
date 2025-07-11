import React, {
  FC,
  MouseEvent,
  FocusEvent,
  memo,
  RefObject,
  useState,
} from "react";
import { useIMask } from "react-imask";
import classNames from "classnames";
import { UIBaseFieldProps } from "../../types";
import RemoveIcon from "../../../../assets/icons/remove.svg";
import { dateMask } from "../../../../lib/form/masks";

type DateFieldProps = UIBaseFieldProps & {
  ref?: RefObject<HTMLInputElement>;
  rows?: number;
  value: string;
  onChange?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
};

const UIDateField: FC<DateFieldProps> = (props) => {
  const [focused, onFocused] = useState<boolean>(false);
  const classes = classNames(
    "block rounded-lg border px-3 py-2.5 text-sm placeholder-gray-250 text-gray-900 appearance-none focus:outline-none focus:ring-1",
    {
      "w-full": props.fullWidth,
      "border-red-400 focus:ring-red-500": props.error,
      "border-gray-150 focus:ring-green-500": !props.error,
    },
  );

  // Use IMask for input masking
  const maskProps = useIMask(dateMask, {
    onComplete: (value, maskRef) => {
      if (props.onChange) props.onChange(props.id, value, true);
    },
  });

  function handleReset(e: MouseEvent) {
    e.stopPropagation();
    if (props.onReset) props.onReset(props.id, "", true);
  }

  function handleFocus(e: FocusEvent) {
    onFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  }

  return (
    <div
      className={classNames("", {
        "flex-1": props.fullWidth,
      })}
    >
      {props.label && (
        <label
          htmlFor={props.id}
          className="block pb-1.5 font-semibold text-gray-900"
        >
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
          name={props.name}
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
      {props.error && (
        <span className="block pt-1.5 text-xs text-red-400">{props.error}</span>
      )}
      {props.helpText && (
        <span className="block pt-1.5 text-xs text-gray-300">
          {props.helpText}
        </span>
      )}
    </div>
  );
};

export default memo(UIDateField);
