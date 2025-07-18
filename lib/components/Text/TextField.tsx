import { useState, useMemo, useEffect, useRef } from "react";
import type { JSX, MouseEvent, FocusEvent, ChangeEvent, ReactElement, RefObject } from "react";
import RemoveIcon from "@/assets/icons/remove.svg?react";
import MaskedDynamic from "imask/masked/dynamic";
import useIMask from "react-imask/hook";
import { clsx } from "clsx";
import type { CommonFieldProps } from "@/types";
import textAreaAutoHeight from "@/utils/textAreaAutoHeight";

interface TextFieldProps extends CommonFieldProps {
  ref?: RefObject<HTMLInputElement>;
  secure?: boolean;
  textarea?: boolean;
  rows?: number;
  autoCorrect?: "off" | "on";
  autoComplete?:
    | "off"
    | "on"
    | "current-password"
    | "new-password"
    | "email"
    | "username"
    | "phone";
  spellCheck?: boolean;
  pattern?: string;
  mask?: MaskedDynamic | MaskedDynamic[];
  isPrimary?: boolean;
  leftIcon?: ReactElement;
  iconCompact?: boolean;
  rightIcon?: ReactElement;
  customIconContainer?: boolean;
  resetDisabled?: boolean;
  textareaAutoHeight?: boolean;
  type?: "text" | "email" | "number";
  value: string | number;
  initialValue?: string | number;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
    | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onComplete?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const TextField: (props: TextFieldProps) => JSX.Element = ({
  id,
  label,
  value,
  name,
  error,
  initialValue,
  placeholder,
  leftIcon,
  rightIcon,
  autoCorrect,
  autoComplete,
  spellCheck,
  pattern,
  inputMode,
  isPrimary = false,
  resetDisabled = false,
  textareaAutoHeight = false,
  customIconContainer = false,
  type = "text",
  rows = 3,
  mask,
  helpText,
  required = false,
  disabled = false,
  textarea = false,
  secure = false,
  fullWidth = false,
  iconCompact = false,
  onReset,
  onChange,
  onComplete,
  onFocus,
  onBlur,
}: TextFieldProps) => {
  const [focused, onFocused] = useState<boolean>(false);
  const resetVisible = useMemo(
    () => Boolean(value) && focused && !resetDisabled,
    [value, focused, resetDisabled],
  );
  const classes = clsx(
    "block flex-1 text-sm px-3 rounded-lg py-2.5 placeholder-gray-250 text-gray-900",
    "appearance-none focus:outline-none focus:ring-1",
    {
      "w-full": fullWidth,
      "bg-gray-100": isPrimary,
      "rounded-l-none": leftIcon && !iconCompact,
      "border-red-400 focus:ring-red-500": error,
      "border-gray-150 focus:ring-green-500": !error,
      "pl-10": iconCompact && !!leftIcon,
      "pr-12": iconCompact && !!rightIcon && !resetVisible,
      "pr-10": resetVisible && !rightIcon,
      "pr-20": resetVisible && rightIcon,
      "disabled:bg-gray-50": disabled,
    },
  );

  // Use IMask for input masking
  const [maskOpts, setMaskOpts] = useState({
    mask: MaskedDynamic,
    ...mask,
  });

  // If mask changes, update the mask options
  useEffect(() => {
    setMaskOpts({ mask: MaskedDynamic, ...mask });
  }, [mask]);

  const inputRef = useRef<HTMLInputElement>(null!);

  const { setValue, setUnmaskedValue } = useIMask(maskOpts, {
    ref: inputRef,
    // When the mask changes emulating input change event
    onAccept: (_, maskRef) => {
      if (onChange) {
        onChange({
          target: {
            value: maskRef.unmaskedValue,
            name,
          },
        } as ChangeEvent<HTMLInputElement>);
      }
    },

    // When the mask is complete, call onComplete
    // and pass the unmasked value
    onComplete: (_, maskRef) => {
      if (onComplete) {
        onComplete(maskRef.unmaskedValue);
      }
    },
  });

  // If initialValue changes, update the unmasked value
  useEffect(() => {
    setUnmaskedValue(`${initialValue}`);
  }, [initialValue]);

  // If value changes, update the unmasked value
  useEffect(() => {
    setUnmaskedValue(`${value}`);
  }, [value]);

  function handleFocus(e: FocusEvent) {
    onFocused(true);

    if (onFocus) onFocus();
    if (textareaAutoHeight) {
      // Expand textarea to fit the content
      const el = e.target as HTMLTextAreaElement;
      el.style.height = "auto";
      const height = el.scrollHeight > 135 ? el.scrollHeight : 135;
      el.style.height = `${height}px`;
    }
  }

  function handleBlur(e: FocusEvent<HTMLTextAreaElement>) {
    e.stopPropagation();
    onFocused(false);

    if (onBlur) onBlur();
    if (textareaAutoHeight) {
      // Reset el height to parent height
      const ta = e.target as HTMLTextAreaElement;
      ta.style.height = "100%";
    }
  }

  function handleReset(e: MouseEvent) {
    e.stopPropagation();
    setValue("");
    if (onReset) {
      onReset(id, "", true);
    }
  }

  const inputEl = useMemo(() => {
    // If textarea is true, render a textarea
    if (textarea) {
      const dynamicProps: {
        onInput?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
      } = {};
      if (textareaAutoHeight) {
        dynamicProps.onInput = textAreaAutoHeight;
      }

      return (
        <textarea
          {...dynamicProps}
          id={id}
          name={name}
          value={value}
          rows={rows}
          disabled={disabled}
          placeholder={placeholder || undefined}
          className={clsx("resize-none", classes)}
          style={{
            minHeight: textareaAutoHeight ? rows * 1.5 + "rem" : "auto",
            maxHeight: textareaAutoHeight ? "360px" : "auto",
          }}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );
    }

    // Render number input without mask
    if (type === "number") {
      return (
        <input
          id={id}
          name={name}
          value={value}
          type={type}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder || undefined}
          className={classes}
          onChange={onChange}
          onFocus={handleFocus}
        />
      );
    }

    // Render text input
    return (
      <input
        ref={inputRef}
        id={id}
        name={name}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        spellCheck={spellCheck}
        pattern={pattern}
        disabled={disabled}
        className={classes}
        inputMode={inputMode}
        type={secure ? "password" : type}
        placeholder={placeholder || undefined}
        defaultValue={initialValue}
        onFocus={handleFocus}
      />
    );
  }, [
    classes,
    disabled,
    handleFocus,
    id,
    name,
    placeholder,
    inputRef,
    rows,
    secure,
    textarea,
    type,
    value,
  ]);

  return (
    <div
      className={clsx("", {
        "flex-1": fullWidth,
      })}
    >
      {label && (
        <label htmlFor={id} className="block pb-1.5 font-semibold text-gray-900">
          {label}
          {required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}
      <div
        className={clsx("relative flex items-center rounded-lg border", {
          "w-full": fullWidth,
          "border-red-400 focus:ring-red-500": error,
          "border-gray-150 focus:ring-green-500 md:hover:border-green-500": !error,
          "opacity-60": disabled,
          "focus:ring-1": !disabled,
          "bg-gray-100": isPrimary,
        })}
      >
        {Boolean(leftIcon) &&
          (customIconContainer ? (
            leftIcon
          ) : (
            <span
              className={clsx(
                "flex w-auto flex-shrink items-center justify-center self-stretch px-2",
                {
                  "border-r border-gray-200 text-gray-900": !iconCompact,
                  "absolute h-full text-gray-250": iconCompact,
                },
              )}
            >
              {iconCompact ? <span className="h-5 w-5">{leftIcon}</span> : leftIcon}
            </span>
          ))}
        {inputEl}
        {Boolean(rightIcon) &&
          (customIconContainer ? (
            rightIcon
          ) : (
            <span
              className={clsx(
                "absolute right-2 flex w-auto flex-shrink items-center justify-center self-stretch px-2",
                {
                  "border-l border-gray-200 text-gray-900": !iconCompact,
                  "h-full text-gray-250": iconCompact,
                },
              )}
            >
              {iconCompact ? <span className="h-5 w-5">{rightIcon}</span> : rightIcon}
            </span>
          ))}
        {resetVisible && (
          <button
            tabIndex={-1}
            className={clsx("absolute top-2.5 z-10 h-6 w-6 cursor-pointer", {
              "right-2.5": !rightIcon,
              "right-10": rightIcon && !customIconContainer,
              "right-12": rightIcon && !!customIconContainer,
            })}
            type="button"
            onClick={handleReset}
          >
            <RemoveIcon className="h-5 w-5 text-gray-200" />
          </button>
        )}
      </div>
      {error && <span className="block pt-1.5 text-xs text-red-400">{error}</span>}
      {helpText && <span className="block pt-1.5 text-xs text-gray-300">{helpText}</span>}
    </div>
  );
};

export default TextField;
