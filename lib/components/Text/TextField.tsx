import styles from "./text.module.css";
import { useState, useMemo, useEffect, useRef } from "react";
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

  const sharedInputStyles = {
    [styles.input__full]: fullWidth,
    [styles.input__primary]: isPrimary,
    [styles.input__rounded_l_none]: leftIcon && !iconCompact,
    [styles.input__border_error]: !!error,
    [styles.input__border_default]: !error,
    [styles.input__pl_icon]: iconCompact && !!leftIcon,
    [styles.input__pr_icon_right]: iconCompact && !!rightIcon && !resetVisible,
    [styles.input__pr_reset]: resetVisible && !rightIcon,
    [styles.input__pr_double]: resetVisible && rightIcon,
    [styles.input__disabled]: disabled,
  };

  const inputEl = useMemo(() => {
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
          className={clsx(styles.input, styles.textarea, sharedInputStyles)}
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
          className={clsx(styles.input, sharedInputStyles)}
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
        className={clsx(styles.input, sharedInputStyles)}
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
    <div className={clsx({ [styles.field_container]: fullWidth })}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.label__asterisk}>*</span>}
        </label>
      )}
      <div
        className={clsx(styles.control, {
          [styles.control__full]: fullWidth,
          [styles.control__error]: error,
          [styles.control__default]: !error,
          [styles.control__disabled]: disabled,
          [styles.control__primary]: isPrimary,
        })}
      >
        {Boolean(leftIcon) &&
          (customIconContainer ? (
            leftIcon
          ) : (
            <span
              className={clsx(styles.icon_left, {
                [styles.icon_left__bordered]: !iconCompact,
                [styles.icon_left__compact]: iconCompact,
              })}
            >
              {iconCompact ? <span className={styles.icon_left__icon}>{leftIcon}</span> : leftIcon}
            </span>
          ))}
        {inputEl}
        {Boolean(rightIcon) &&
          (customIconContainer ? (
            rightIcon
          ) : (
            <span
              className={clsx(styles.icon_right, {
                [styles.icon_right__bordered]: !iconCompact,
                [styles.icon_right__compact]: iconCompact,
              })}
            >
              {iconCompact ? (
                <span className={styles.icon_right__icon}>{rightIcon}</span>
              ) : (
                rightIcon
              )}
            </span>
          ))}
        {resetVisible && (
          <button
            tabIndex={-1}
            className={clsx(styles.reset, {
              [styles.reset__right]: !rightIcon,
              [styles.reset__right_double]: rightIcon && !customIconContainer,
              [styles.reset__right_triple]: rightIcon && !!customIconContainer,
            })}
            type="button"
            onClick={handleReset}
          >
            <RemoveIcon className={styles.reset__icon} />
          </button>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
      {helpText && <span className={styles.help}>{helpText}</span>}
    </div>
  );
};

export default TextField;
