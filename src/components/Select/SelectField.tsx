import styles from "./select.module.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import type { JSX, ReactElement, FocusEvent } from "react";
import type { SelectOptionType } from "./SelectOption";
import useClickOutside from "@/hooks/useClickOutside";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import type { CommonFieldProps, Position } from "@/types";
import useIsTabletOrDesktop from "@/hooks/useIsTabletOrDesktop";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";
import PlusIcon from "@/assets/icons/plus.svg?react";
import SelectOptionsDropdown from "./SelectDropdown";

export type SelectFormikHandler<V> = (
  field: string,
  value: V,
  shouldValidate?: boolean | undefined,
) => void;

export type SelectSimpleHandler<T, V> = (value: V, opt?: SelectOptionType<T, V>) => void;

export interface SelectFieldCommonProps<T, V> extends CommonFieldProps {
  max?: number;
  min?: number;
  searchTerm?: string;
  popupLabel?: string | null;
  isLoading?: boolean;
  dpWidth?: number;
  dpPosition?: Position;
  dpFullscreen?: boolean;
  formikHandler?: boolean;
  options: SelectOptionType<T, V>[];
  valueGetter?: (rawData: T) => V;
  valueRender?: (opt: SelectOptionType<T, V>) => ReactElement;
  onLoadMore?: () => void;
  onSearch?: (term: string) => void;
}

interface SelectFieldSimpleHandlerProps<T, V> extends SelectFieldCommonProps<T, V> {
  value: V;
  multiple?: false | undefined;
  formikHandler?: false | undefined;
  onChange: SelectSimpleHandler<T, V>;
}

interface MultipleSelectFieldSimpleHandlerProps<T, V> extends SelectFieldCommonProps<T, V> {
  value: V[];
  multiple: true;
  formikHandler?: false | undefined;
  onChange: SelectSimpleHandler<T, V[]>;
}

interface SelectFieldWithFormikHandlerProps<T, V> extends SelectFieldCommonProps<T, V> {
  value: V;
  multiple?: false | undefined;
  formikHandler: true;
  onChange: SelectFormikHandler<V>;
}

interface MultipleSelectFieldWithFormikHandlerProps<T, V> extends SelectFieldCommonProps<T, V> {
  value: V[];
  multiple: true;
  formikHandler: true;
  onChange: SelectFormikHandler<V[]>;
}

export type SelectFieldProps<T, V> =
  | SelectFieldWithFormikHandlerProps<T, V>
  | MultipleSelectFieldWithFormikHandlerProps<T, V>
  | SelectFieldSimpleHandlerProps<T, V>
  | MultipleSelectFieldSimpleHandlerProps<T, V>;

function SelectField<T = any, V = string>({
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
  formikHandler = false,
  fullWidth = false,
  disabled = false,
  onLoadMore,
  onFocus,
  onSearch,
  onChange,
  onReset,
}: SelectFieldProps<T, V>): JSX.Element {
  const dpRef = useRef<HTMLDivElement>(null!);
  const selectedValues = useRef<Set<V>>(new Set());

  // Hide dropdown on outside click or ESC
  const isTabletOrDesktop = useIsTabletOrDesktop();
  const [collapsed, setCollapsed] = useClickOutside(dpRef, false, true, !isTabletOrDesktop);

  // Fill selected options once when options are loaded
  const selectedOptionsInitialized = useRef(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectOptionType<T, V>[]>([]);

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
    (option: SelectOptionType<T, V>) => {
      const selected = selectedValues.current;

      // If option is already selected remove it
      if (selected.has(option.value)) {
        selected.delete(option.value);

        // Handle removing as multiple selection
        if (multiple) {
          let newSelectedOptions: SelectOptionType<T, V>[] = [];

          // Update local state
          //flushSync(() => {
          setSelectedOptions((prev) => {
            newSelectedOptions = prev.filter((opt) => opt.value !== option.value);
            return newSelectedOptions;
          });
          //});

          // Emit values to parent
          emitMultipleValue(newSelectedOptions);
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
        let newSelectedOptions: SelectOptionType<T, V>[] = [];
        selected.add(option.value);
        //flushSync(() => {
        setSelectedOptions((prev) => {
          newSelectedOptions = [...prev, option];
          return newSelectedOptions;
        });
        //});

        // Emit values to parent
        emitMultipleValue(newSelectedOptions);
        return;
      }

      // Handle adding as single selection
      selected.clear(); // Clear previous selection
      selected.add(option.value);
      setSelectedOptions([option]);
      emitValue(option.value);
      close();
    },
    [multiple],
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
  function getValue(option: SelectOptionType<T, V>): V {
    if (valueGetter && option.rawData !== undefined && option.rawData !== null)
      return valueGetter(option.rawData as T);
    return option.value;
  }

  /**
   * Emit value to parent based on multiple or single selection
   * and pass necessary arguments that depends on the handler type
   */
  function emitValue<T, V>(value: V) {
    // Check if handler is a formik handler
    if (formikHandler) {
      (onChange as SelectFormikHandler<V>)(id, value, true);
    } else {
      // Otherwise handle as normal onChange handler
      (onChange as unknown as SelectSimpleHandler<T, V>)(value);
    }
  }

  function emitMultipleValue(options: SelectOptionType<T, V>[] = []) {
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
    (val: V) => {
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
        let newSelectedOptions: SelectOptionType<T, V>[] = [];
        //flushSync(() => {
        setSelectedOptions((prev) => {
          newSelectedOptions = prev.filter((opt) => opt.value !== val);
          return newSelectedOptions;
        });
        //});

        // Emit values to parent
        emitMultipleValue(newSelectedOptions);
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
    onSearch?.("");
    setCollapsed(false);
  }

  const multipleFooterRenderer = useCallback(
    (onCloseHandler: () => void) => {
      function handleClick() {
        chooseSelected();
        onCloseHandler();
      }

      if (!multiple) return <></>;
      return (
        <Button
          fullWidth
          type="button"
          variant="success"
          disabled={selectedOptions.length < min}
          onClick={handleClick}
        >
          Selected {selectedOptions.length > 0 && `(${selectedOptions.length})`}
        </Button>
      );
    },
    [selectedOptions.length, min, multiple],
  );

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
        const strValue = `${value}`;
        // Render default badge if valueRender is not provided
        return valueRender ? (
          valueRender(opt)
        ) : (
          <Badge<V>
            id={value}
            key={strValue}
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
          <SelectOptionsDropdown<T, V>
            id={id}
            max={max}
            multiple={multiple}
            label={popupLabel}
            options={options}
            helpText={helpText}
            isLoading={isLoading}
            searchTerm={searchTerm}
            fullscreen={dpFullscreen}
            selectedValues={selectedValues}
            position={dpPosition}
            minWidth={dpWidth}
            onLoadMore={onLoadMore}
            footerRenderer={multipleFooterRenderer}
            getValue={getValue}
            onClose={close}
            onReset={onReset}
            onSearch={onSearch}
            handleSelect={handleSelect}
          />
        )}
      </div>

      {error && <span className={styles.select__error}>{error}</span>}
      {helpText && <span className={styles.select__help}>{helpText}</span>}
    </div>
  );
}

export default SelectField;
