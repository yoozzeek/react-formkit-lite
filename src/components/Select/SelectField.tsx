import styles from "./select.module.css";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import type { JSX, ReactElement, FocusEvent } from "react";
import type { SelectOptionType } from "./SelectOption";
import useClickOutside from "@/hooks/useClickOutside";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import type { CommonFieldProps, Position } from "@/types";
import useGteSm from "@/hooks/useGteSm";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";
import PlusIcon from "@/assets/icons/plus.svg?react";
import SingleSelectOption from "./SelectOption";
import MultipleSelectOption from "@/components/Select/SelectMultipleOption";
import SelectOptionsDropdown from "@/components/Select/SelectDropdown";

export type SelectValueType = string[] | number[] | string | number;

export type SelectFormikHandler = (
  field: string,
  value: SelectValueType,
  shouldValidate?: boolean | undefined,
) => void;

export type SelectSimpleHandler<T> = (value: SelectValueType, opt?: SelectOptionType<T>) => void;

export interface SelectFieldProps<T> extends CommonFieldProps {
  multiple?: boolean;
  value: SelectValueType;
  max?: number;
  min?: number;
  searchTerm?: string;
  popupLabel?: string | null;
  isLoading?: boolean;
  dpWidth?: number;
  dpPosition?: Position;
  dpFullscreen?: boolean;
  formikHandler?: boolean;
  options: SelectOptionType<T>[];
  valueGetter?: (rawData: T) => string | number;
  valueRender?: (opt: SelectOptionType<T>) => ReactElement;
  onLoadMore?: () => void;
  onSearch?: (term: string) => void;
  onChange: SelectSimpleHandler<T> | SelectFormikHandler;
}

function SelectField<T>({
  id,
  label,
  popupLabel,
  dpWidth,
  placeholder = "Select value",
  max = 10,
  min = 0,
  options,
  error,
  helpText,
  value,
  valueGetter,
  valueRender,
  searchTerm,
  required = false,
  multiple = false,
  dpFullscreen = true,
  dpPosition = "left",
  isLoading = false,
  formikHandler = true,
  fullWidth = false,
  disabled = false,
  onLoadMore,
  onFocus,
  onSearch,
  onChange,
  onReset,
}: SelectFieldProps<T>): JSX.Element {
  const dpRef = useRef<HTMLDivElement>(null!);
  const selectedValues = useRef<Set<number | string>>(new Set());

  // Hide dropdown on outside click or ESC
  const gteSm = useGteSm();
  const [collapsed, setCollapsed] = useClickOutside(dpRef, false, true, !gteSm);

  // Fill selected options once when options are loaded
  const selectedOptionsInitialized = useRef(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectOptionType<T>[]>([]);

  useEffect(() => {
    if (typeof value === "number" && value <= 0) return;
    if (typeof value === "string" && value.length === 0) return;
    if (Array.isArray(value) && value.length === 0) return;
    if (selectedOptionsInitialized.current) return;

    // Set initialized flag to true to prevent multiple calls
    selectedOptionsInitialized.current = true;

    // Handle multiple selection
    if (multiple && Array.isArray(value)) {
      value.forEach((val) => selectedValues.current.add(val));
      setSelectedOptions(options.filter((option) => selectedValues.current.has(getValue(option))));
    }
    // Handle single selection
    else if (!multiple) {
      const option = options.find((option) => getValue(option) === value);
      if (option) {
        setSelectedOptions([option]);
        selectedValues.current.add(option.value);
      }
    }
  }, [options]);

  /**
   * @description Handle selection of an option.
   * @description It handles both single and multiple selection.
   */
  const handleSelect = useCallback(
    (option: SelectOptionType<T>) => {
      const selected = selectedValues.current;

      // If option is already selected remove it
      if (selected.has(option.value)) {
        selected.delete(option.value);

        // Handle removing as multiple selection
        if (multiple) {
          let newSelectedOptions: SelectOptionType<T>[] = [];

          // Update local state
          //flushSync(() => {
          setSelectedOptions((prev) => {
            newSelectedOptions = prev.filter((opt) => opt.value !== option.value);
            return newSelectedOptions;
          });
          //});

          // Emit values to parent
          emitTypedValue(newSelectedOptions);
          return;
        }

        // Handle removing as single selection
        setSelectedOptions([]);
        emitValue("");
        return;
      }

      // ------------------------------------
      // Otherwise add it to selected values

      // Block if max is reached
      if (selected.size >= max) return;

      // Handle adding as multiple selection
      if (multiple) {
        let newSelectedOptions: SelectOptionType<T>[] = [];
        selected.add(option.value);
        //flushSync(() => {
        setSelectedOptions((prev) => {
          newSelectedOptions = [...prev, option];
          return newSelectedOptions;
        });
        //});

        // Emit values to parent
        emitTypedValue(newSelectedOptions);
        return;
      }

      // Handle adding as single selection
      selected.clear(); // Clear previous selection
      selected.add(option.value);
      setSelectedOptions([option]);
      emitValue(option.value);
      close();
    },
    [multiple, setSelectedOptions],
  );

  function resetAll() {
    selectedValues.current.clear();
    setSelectedOptions([]);
    emitValue(multiple ? [] : "");
  }

  // Reset selected options if value is empty
  useEffect(() => {
    if (!value) resetAll();
  }, [value]);

  /**
   * Get value via valueGetter if provided
   * Otherwise use option value directly
   * @param option
   */
  function getValue(option: SelectOptionType<T>): string | number {
    if (!option) return "";
    if (valueGetter && option.rawData !== undefined && option.rawData !== null)
      return valueGetter(option.rawData as T);
    return option.value;
  }

  /**
   * Emit value to parent based on multiple or single selection
   * and pass necessary arguments that depends on the handler type
   */
  function emitValue<T>(value: string | number | string[] | number[]) {
    // Check if handler is a formik handler
    if (formikHandler) {
      (onChange as SelectFormikHandler)(id, value, true);
    } else {
      // Otherwise handle as normal onChange handler
      (onChange as unknown as SelectSimpleHandler<T>)(value);
    }
  }

  function emitTypedValue(options: SelectOptionType<T>[] = []) {
    const values = options.map((opt) => opt.value);
    if (values.length) {
      if (typeof values[0] === "number") {
        emitValue(values as number[]);
      } else {
        emitValue(values as string[]);
      }
    } else {
      emitValue(multiple ? [] : "");
    }
  }

  /**
   * Remove selected option by value
   */
  const removeOption = useCallback(
    (val: string) => {
      const selected = selectedValues.current;
      if (!selected.has(val)) return;
      selected.delete(val);

      // Emit onFocus event to parent
      if (onFocus) {
        onFocus({
          target: {
            id,
          },
        } as FocusEvent);
      }

      // Handle removing as multiple selection
      if (multiple) {
        let newSelectedOptions: SelectOptionType<T>[] = [];
        //flushSync(() => {
        setSelectedOptions((prev) => {
          newSelectedOptions = prev.filter((opt) => opt.value !== val);
          return newSelectedOptions;
        });
        //});

        // Emit values to parent
        emitTypedValue(newSelectedOptions);
        return;
      }

      // Handle removing as single selection
      setSelectedOptions([]);
      emitValue("");
    },
    [multiple, setSelectedOptions],
  );

  /**
   * Handle click on element and toggle collapsed state
   */
  function focus() {
    if (disabled) return;
    setCollapsed(true);
    if (onFocus) {
      onFocus({
        target: {
          id,
        },
      } as FocusEvent);
    }
  }

  /**
   * Handle choose all selected options and close dropdown
   */
  function chooseSelected() {
    setCollapsed(false);
    onSearch?.("");
  }

  /**
   * Handle close dropdown and reset search term
   */
  function close() {
    setCollapsed(false);
    onSearch?.("");
  }

  const multipleFooterRenderer = useCallback(() => {
    if (!multiple) return <></>;
    return (
      <Button
        fullWidth
        type="button"
        variant="success"
        disabled={selectedOptions.length < min}
        onClick={chooseSelected}
      >
        Selected {selectedOptions.length > 0 && `(${selectedOptions.length})`}
      </Button>
    );
  }, [selectedOptions.length, min, multiple]);

  const selectedValueEl = useMemo(() => {
    if (!multiple) {
      const option = selectedOptions[0];
      // Render via valueRender
      if (valueRender && option) {
        return <div className="flex-1">{valueRender(option)}</div>;
      }

      // Or show default label
      const label = option ? option.label : placeholder;
      return (
        <span
          className={clsx("flex-1 truncate text-sm", {
            "text-gray-800": option,
            "text-gray-250": !option,
          })}
        >
          {label}
        </span>
      );
    }

    // Show badges if selected more than 1 option
    if (selectedOptions.length) {
      return selectedOptions.map((opt) => {
        const value = getValue(opt);
        // Render default badge if valueRender is not provided
        return valueRender ? (
          valueRender(opt)
        ) : (
          <Badge
            id={`${value}`}
            key={value}
            icon={opt.badgeIconEl || opt.iconEl}
            onRemove={removeOption}
          >
            {opt.label}
          </Badge>
        );
      });
    }

    // Or show multiple field placeholder
    return (
      <span
        className={clsx(styles["select__multiple-placeholder"], {
          [styles["select__multiple-placeholder--disabled"]]: disabled,
        })}
      >
        <PlusIcon className={styles["select__multiple-placeholder-icon"]} />
        <span className={styles["select__multiple-placeholder-text"]}>{placeholder}</span>
      </span>
    );
  }, [selectedOptions, disabled, placeholder, multiple]);

  // Based on multiple prop, return different renderers
  function optionRenderer(option: SelectOptionType<T>) {
    const value = getValue(option);
    if (multiple) {
      return (
        <MultipleSelectOption<T>
          key={option.value}
          value={value}
          label={option.label}
          classes={option.classes}
          helpText={option.helpText}
          rawData={option.rawData}
          iconEl={option.iconEl}
          badgeIconEl={option.badgeIconEl}
          disabled={selectedValues.current.size >= max}
          selected={selectedValues.current.has(value)}
          onSelect={handleSelect}
        />
      );
    }

    return (
      <SingleSelectOption<T>
        key={option.value}
        value={value}
        label={option.label}
        classes={option.classes}
        helpText={option.helpText}
        rawData={option.rawData}
        iconEl={option.iconEl}
        badgeIconEl={option.badgeIconEl}
        selected={selectedValues.current.has(value)}
        onSelect={handleSelect}
      />
    );
  }

  return (
    <div className="relative">
      <div className={styles["select__label"]}>
        {label}
        {required && <span className={styles["select__required"]}>*</span>}
      </div>
      <div
        ref={dpRef}
        tabIndex={0}
        className={clsx(styles.select__control, {
          [styles["select__control--full"]]: fullWidth,
          [styles["select__control--error"]]: error,
          [styles["select__control--disabled"]]: disabled,
          [styles["select__control--multiple"]]: multiple,
          [styles["select__control--single"]]: !multiple,
        })}
        onClick={focus}
      >
        {selectedValueEl}
        <ChevronDownIcon
          className={clsx(styles.select__icon, {
            [styles["select__icon--disabled"]]: disabled,
          })}
        />

        {collapsed && (
          <SelectOptionsDropdown<T>
            id={id}
            label={popupLabel}
            options={options}
            helpText={helpText}
            isLoading={isLoading}
            searchTerm={searchTerm}
            fullscreen={dpFullscreen}
            position={dpPosition}
            minWidth={dpWidth}
            onLoadMore={onLoadMore}
            optionRenderer={optionRenderer}
            footerRenderer={multipleFooterRenderer}
            onClose={close}
            onReset={onReset}
            onSearch={onSearch}
          />
        )}
      </div>

      {error && <span className={styles.select__error}>{error}</span>}
      {helpText && <span className={styles.select__help}>{helpText}</span>}
    </div>
  );
}

export default memo(SelectField);
