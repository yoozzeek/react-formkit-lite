import styles from "./text.module.css";
import { useState, useMemo, useEffect, useRef, memo } from "react";
import type { JSX, MouseEvent, FocusEvent, ChangeEvent, ReactElement, RefObject } from "react";
import RemoveIcon from "@/assets/icons/remove.svg?react";
import MaskedDynamic from "imask/masked/dynamic";
import MaskedRegExp from "imask/masked/regexp";
import type Masked from "imask/masked/base";
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
  autoComplete?: string;
  spellCheck?: boolean;
  pattern?: string;
  mask?: Masked | Masked[];
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
  inputMode?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onComplete?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

// eslint-disable-next-line no-unused-vars
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

  function buildInputMask(mask?: Masked | Masked[]): MaskedDynamic {
    return new MaskedDynamic({
      mask: Array.isArray(mask)
        ? mask
        : mask
          ? [mask]
          : [
              {
                mask: new MaskedRegExp({
                  mask: /.*/,
                }),
              },
            ],
    });
  }

  // Mask logic
  const [maskOpts, setMaskOpts] = useState({
    mask: buildInputMask(mask),
  });
  useEffect(() => {
    setMaskOpts({
      mask: buildInputMask(mask),
    });
  }, [mask]);
  const inputRef = useRef<HTMLInputElement>(null!);

  const { setValue, setUnmaskedValue } = useIMask(maskOpts, {
    ref: inputRef,
    onAccept: (_, maskRef) => {
      onChange?.({
        target: { value: maskRef.unmaskedValue, name },
      } as ChangeEvent<HTMLInputElement>);
    },
    onComplete: (_, maskRef) => {
      onComplete?.(maskRef.unmaskedValue);
    },
  });

  useEffect(() => {
    setUnmaskedValue(`${initialValue}`);
  }, [initialValue]);
  useEffect(() => {
    setUnmaskedValue(`${value}`);
  }, [value]);

  const wrapperClass = clsx(styles["text-field__wrapper"], {
    [styles["text-field__wrapper--error"]]: !!error,
    [styles["text-field__wrapper--primary"]]: isPrimary,
    [styles["text-field__wrapper--disabled"]]: disabled,
  });

  const inputClass = clsx(textarea ? styles["text-field__textarea"] : styles["text-field__input"]);

  const labelMarkup = label && (
    <label htmlFor={id} className={styles["text-field__label"]}>
      {label}
      {required && <span className={styles["text-field__required"]}>*</span>}
    </label>
  );

  function handleFocus(e: FocusEvent) {
    onFocused(true);
    onFocus?.();
    if (textareaAutoHeight && textarea) {
      const el = e.target as HTMLTextAreaElement;
      el.style.height = "auto";
      const height = el.scrollHeight > 135 ? el.scrollHeight : 135;
      el.style.height = `${height}px`;
    }
  }
  function handleBlur(e: FocusEvent<HTMLTextAreaElement>) {
    e.stopPropagation();
    onFocused(false);
    onBlur?.();
    if (textareaAutoHeight && textarea) {
      const ta = e.target as HTMLTextAreaElement;
      ta.style.height = "100%";
    }
  }
  function handleReset(e: MouseEvent) {
    e.stopPropagation();
    setValue("");
    onReset?.(id, "", true);
  }

  const inputEl = useMemo(() => {
    if (textarea) {
      const dynamicProps: {
        // eslint-disable-next-line no-unused-vars
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
          className={inputClass}
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
          className={inputClass}
          onChange={onChange}
          onFocus={handleFocus}
        />
      );
    }
    // Normal input or masked
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
        className={inputClass}
        inputMode={inputMode as never}
        type={secure ? "password" : type}
        placeholder={placeholder || undefined}
        defaultValue={initialValue}
        onFocus={handleFocus}
      />
    );
  }, [
    textarea,
    textareaAutoHeight,
    id,
    name,
    value,
    rows,
    disabled,
    placeholder,
    fullWidth,
    isPrimary,
    leftIcon,
    iconCompact,
    rightIcon,
    error,
    resetVisible,
    type,
    inputRef,
    autoComplete,
    autoCorrect,
    spellCheck,
    pattern,
    inputMode,
    secure,
    initialValue,
    onChange,
  ]);

  return (
    <div className={clsx(styles["text-field"], { [styles["text-field--full"]]: fullWidth })}>
      {labelMarkup}
      <div className={wrapperClass}>
        {leftIcon && !customIconContainer && (
          <span
            className={clsx(styles["text-field__icon-left"], {
              [styles["text-field__icon--compact"]]: iconCompact,
            })}
          >
            {iconCompact ? (
              <span className={styles["text-field__icon-inner"]}>{leftIcon}</span>
            ) : (
              leftIcon
            )}
          </span>
        )}
        {leftIcon && customIconContainer && leftIcon}
        {inputEl}
        {rightIcon && !customIconContainer && (
          <span
            className={clsx(styles["text-field__icon-right"], {
              [styles["text-field__icon--compact"]]: iconCompact,
            })}
          >
            {iconCompact ? (
              <span className={styles["text-field__icon-inner"]}>{rightIcon}</span>
            ) : (
              rightIcon
            )}
          </span>
        )}
        {rightIcon && customIconContainer && rightIcon}
        {resetVisible && (
          <button
            type="button"
            tabIndex={-1}
            onClick={handleReset}
            className={clsx(styles["text-field__reset-button"], {
              [styles["text-field__reset-button--right"]]: !rightIcon,
              [styles["text-field__reset-button--right-icon"]]: rightIcon && !customIconContainer,
              [styles["text-field__reset-button--right-icon-custom"]]:
                rightIcon && customIconContainer,
            })}
          >
            <RemoveIcon className={styles["text-field__reset-icon"]} />
          </button>
        )}
      </div>
      {error && <span className={styles["text-field__error"]}>{error}</span>}
      {helpText && <span className={styles["text-field__help"]}>{helpText}</span>}
    </div>
  );
};

export default memo(TextField);
