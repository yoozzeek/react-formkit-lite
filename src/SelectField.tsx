import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  memo,
  MouseEvent,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { UIBaseFieldProps, UIPosition } from "../../types";
import useResponsiveBreakpoints from "../../hooks/useResponsiveBreakpoints";
import classNames from "classnames";
import UIModal from "../modal/Modal";
import UIHeader from "../Header";
import UILoader from "../Loader";
import LoadMoreElement from "../../../../lib/components/LoadMoreElement";
import UITextField from "./TextField";
import { ViewportList } from "react-viewport-list";
import CheckIcon from "../../../../assets/icons/check.svg";
import useOutsideClick from "../../../../lib/hooks/useOutsiteClick";
import UIButton from "../Button";
import UIBadge from "../Badge";
import ChevronDownIcon from "../../../../assets/icons/chevron-down.svg";
import useModal from "../../hooks/useModal";
import PlusIcon from "../../../../assets/icons/plus.svg";
import { flushSync } from "react-dom";
import SimpleBar from "simplebar-react";
import { useTranslation } from "next-i18next";

type SelectValueType = string[] | number[] | string | number;
export type SelectFormikHandler = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined,
) => void;

type SelectSimpleHandler = (
  value: SelectValueType,
  opt?: SelectOptionType,
) => void;

export type SelectHandlerType = SelectSimpleHandler | SelectFormikHandler;

export interface UISelectFieldProps extends UIBaseFieldProps {
  multiple?: boolean;
  value: SelectValueType;
  max?: number;
  min?: number;
  searchTerm?: string;
  popupLabel?: string | null;
  isLoading?: boolean;
  dpWidth?: number;
  dpPosition?: UIPosition;
  dpFullscreen?: boolean;
  formikHandler?: boolean;
  options: SelectOptionType[];
  valueGetter?: (rawData: any) => string | number;
  valueRender?: (opt: SelectOptionType) => ReactElement;
  onLoadMore?: () => void;
  onSearch?: (term: string) => void;
  onChange: SelectHandlerType;
}

export type SelectOptionType = {
  label: string;
  value: string | number;
  selected?: boolean;
  classes?: string;
  helpText?: string;
  iconEl?: ReactElement | null;
  badgeIconEl?: ReactElement | null;
  rawData?: any;
};

export type SelectFieldOptionProps = {
  label: string;
  value: string | number;
  classes?: string;
  helpText?: string;
  iconEl?: ReactElement | null;
  badgeIconEl?: ReactElement | null;
  rawData?: any;
  selected?: boolean;
  disabled?: boolean;
  onSelect: (option: SelectOptionType) => void;
};

type SelectFieldDropdownProps = {
  id: string;
  label?: string | null;
  isLoading?: boolean;
  footerEl?: ReactElement | null;
  options: SelectOptionType[];
  fullscreen?: boolean;
  position?: UIPosition;
  minWidth?: number;
  helpText?: string | null;
  searchTerm?: string;
  optionRenderer: (option: SelectOptionType) => ReactNode;
  onLoadMore?: () => void;
  onReset?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => any;
  onSearch?: (term: string) => void;
  onClose: () => void;
};

const MultipleSelectOption: FC<SelectFieldOptionProps> = ({
  label,
  value,
  classes,
  helpText,
  iconEl,
  badgeIconEl,
  rawData,
  disabled = false,
  selected = false,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    onSelect({
      label,
      value,
      classes,
      helpText,
      iconEl,
      badgeIconEl,
      rawData,
      selected: !selected,
    });
  }

  return (
    <div
      className={classNames(
        "flex justify-between border-b border-gray-100 px-4 py-4 text-sm text-gray-900",
        "cursor-pointer last:border-none hover:bg-gray-100",
        {
          "opacity-50": disabled && !selected,
          [classes || ""]: !!classes,
        },
      )}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-1 items-center">
        {iconEl && <span className="mr-4 inline-block h-7 w-6">{iconEl}</span>}
        {label}
      </div>

      {helpText && (
        <span className="flex-shrink-0 text-gray-300">{helpText}</span>
      )}

      {selected ? (
        <span
          className={classNames(
            "inline-flex h-6 w-6 justify-center rounded-full md:rounded-xs md:p-1",
            "border-b border-gray-100 text-gray-900",
            {
              "bg-green-500": !hovered,
              "bg-green-600": hovered,
            },
          )}
        >
          <CheckIcon className="h-[10px] w-[13px] self-center text-white" />
        </span>
      ) : (
        <span
          className={classNames(
            "inline-block h-6 w-6 border",
            "rounded-full md:rounded-xs",
            {
              "border-green-500 bg-green-500": selected,
              "border-gray-200 bg-white": !selected,
              "border-2 border-gray-200": disabled && !selected,
            },
          )}
        />
      )}
    </div>
  );
};

const MemoizedMultipleSelectOption = memo(MultipleSelectOption);

const SingleSelectOption: FC<SelectFieldOptionProps> = ({
  label,
  value,
  classes,
  helpText,
  iconEl,
  badgeIconEl,
  rawData,
  selected = false,
  onSelect,
}) => {
  function handleSelect(e: MouseEvent) {
    e.stopPropagation();
    onSelect({
      label,
      value,
      classes,
      helpText,
      iconEl,
      badgeIconEl,
      rawData,
      selected: !selected,
    });
  }

  return (
    <div
      className={classNames(
        "flex cursor-pointer justify-between border-b border-gray-100 px-4 py-4 text-sm text-gray-900 last:border-none hover:bg-gray-100",
        {
          "bg-gray-100 text-green-500": selected,
          [classes || ""]: !!classes,
        },
      )}
      onClick={handleSelect}
    >
      <div className="flex flex-1 items-center">
        {iconEl && <span className="mr-4 flex">{iconEl}</span>}
        {label}
      </div>
      {helpText && (
        <span className="flex-shrink-0 text-gray-300">{helpText}</span>
      )}
    </div>
  );
};

const MemoizedSingleSelectOption = memo(SingleSelectOption);

const SelectOptionsDropdown: FC<SelectFieldDropdownProps> = ({
  id,
  label = "Select option",
  position = "left",
  helpText,
  options = [],
  isLoading = false,
  fullscreen = true,
  minWidth,
  searchTerm = "",
  footerEl,
  onLoadMore,
  optionRenderer,
  onSearch,
  onReset,
  onClose,
}) => {
  const { t } = useTranslation("common");
  const containerRef = useRef<HTMLDivElement>(null);
  const { lastModal } = useModal();
  const { gteSm } = useResponsiveBreakpoints();

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => onSearch && onSearch(e.target.value);

  // Wrap dropdown content in Modal on mobile devices,
  // and show as dropdown on desktop below the input
  const wrapperRenderer = useCallback<(children: ReactNode) => ReactElement>(
    (children) => {
      // Show as dropdown on desktop
      if (gteSm) {
        return (
          <div
            className={classNames(
              "flex w-full flex-col bg-white",
              "absolute -top-2 z-20 mt-1.5 pb-2 shadow-popup",
              "max-h-[280px] w-[104%] rounded-2xl",
              {
                "bottom-auto -left-[2%]": position === "left",
                "bottom-auto -right-[2%]": position === "right",
              },
            )}
            role="combobox"
            aria-controls="listbox"
            aria-expanded="true"
            style={{
              ...(minWidth && gteSm ? { minWidth: minWidth } : {}),
            }}
          >
            {children}
          </div>
        );
      }

      // Otherwise wrap in modal
      return (
        <UIModal
          id="select-field-modal"
          title={label}
          type={fullscreen ? "fullscreen" : "overlay-90"}
          onCloseModal={onClose}
          headerEl={
            fullscreen ? (
              <UIHeader
                fixed
                parentIsModal
                classes="safe-top"
                title={label}
                onGoBack={onClose}
              />
            ) : (
              // Show default header otherwise
              true
            )
          }
          footerEl={footerEl}
        >
          <div className="mt-16">{children}</div>
        </UIModal>
      );
    },
    [gteSm, footerEl],
  );

  const loadMoreContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="my-8 flex w-full items-center justify-center">
          <UILoader size="sm" />
        </div>
      );
    }
    if (onLoadMore) return <LoadMoreElement loadMore={onLoadMore} />;
    return null;
  }, [isLoading, onLoadMore]);

  const scrollableContentWrapper = useCallback(
    (children: ReactNode) =>
      gteSm ? (
        <SimpleBar
          scrollableNodeProps={{ ref: containerRef }}
          className="mt-4 pb-1 sm:max-h-[200px] sm:overflow-auto"
        >
          {children}
        </SimpleBar>
      ) : (
        <div
          ref={containerRef}
          className="mt-4 pb-1 sm:max-h-[240px] sm:overflow-hidden"
        >
          {children}
        </div>
      ),
    [gteSm],
  );

  return wrapperRenderer(
    <>
      {onSearch && (
        <div className="mx-4 mt-4">
          <UITextField
            fullWidth
            id={`${id}-search`}
            placeholder={t("ui.select.search_placeholder")}
            value={searchTerm}
            onChange={handleSearch}
            onReset={onReset}
          />
        </div>
      )}

      {!gteSm && helpText && (
        <p className="mx-4 mt-2 text-xs text-gray-300">{helpText}</p>
      )}

      {options.length ? (
        scrollableContentWrapper(
          <>
            <ViewportList
              viewportRef={
                gteSm ? containerRef : lastModal?.scrollableContentRef
              }
              items={options}
            >
              {(item) => optionRenderer(item)}
            </ViewportList>

            {loadMoreContent}
          </>,
        )
      ) : isLoading ? (
        <div className="my-8 flex w-full items-center justify-center">
          <UILoader size="sm" />
        </div>
      ) : (
        <p className="p-6 text-center text-xs text-gray-400">
          {t("ui.select.no_results")}
        </p>
      )}
    </>,
  );
};

const UISelectField: FC<UISelectFieldProps> = ({
  id,
  name,
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
}) => {
  const { t } = useTranslation("common");
  const dpRef = useRef<HTMLDivElement>(null);
  const selectedValues = useRef<Set<number | string>>(new Set());

  // Hide dropdown on outside click or ESC
  const { gteSm } = useResponsiveBreakpoints();
  const [collapsed, setCollapsed] = useOutsideClick(dpRef, false, true, !gteSm);

  // Fill selected options once when options are loaded
  const selectedOptionsInitialized = useRef(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectOptionType[]>(
    [],
  );

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
      setSelectedOptions(
        options.filter((option) =>
          selectedValues.current.has(getValue(option)),
        ),
      );
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
    (option: SelectOptionType) => {
      const selected = selectedValues.current;

      // If option is already selected remove it
      if (selected.has(option.value)) {
        selected.delete(option.value);

        // Handle removing as multiple selection
        if (multiple) {
          let newSelectedOptions: SelectOptionType[] = [];

          // Update local state
          flushSync(() => {
            setSelectedOptions((prev) => {
              newSelectedOptions = prev.filter(
                (opt) => opt.value !== option.value,
              );
              return newSelectedOptions;
            });
          });

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
        let newSelectedOptions: SelectOptionType[] = [];
        selected.add(option.value);
        flushSync(() => {
          setSelectedOptions((prev) => {
            newSelectedOptions = [...prev, option];
            return newSelectedOptions;
          });
        });

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
  function getValue(option: SelectOptionType): string | number {
    if (!option) return "";
    if (valueGetter) return valueGetter(option);
    return option.value;
  }

  /**
   * Emit value to parent based on multiple or single selection
   * and pass necessary arguments that depends on the handler type
   */
  function emitValue<T>(value: string | number | string[] | number[]) {
    // Check if handler is a formik handler
    if (formikHandler) {
      // Emit value as array if multiple selection
      if (multiple) {
        (onChange as SelectFormikHandler)(id, value, true);
        return;
      }

      // Emit value as string | number if single selection
      (onChange as SelectFormikHandler)(id, value, true);
      return;
    } else {
      // Otherwise handle as normal onChange handler
      (onChange as SelectSimpleHandler)(value);
    }
  }

  function emitTypedValue(options: SelectOptionType[] = []) {
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
    (e: MouseEvent, val: string) => {
      // Prevent outside click handler
      e.stopPropagation();

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
        let newSelectedOptions: SelectOptionType[] = [];
        flushSync(() => {
          setSelectedOptions((prev) => {
            newSelectedOptions = prev.filter((opt) => opt.value !== val);
            return newSelectedOptions;
          });
        });

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
    onSearch && onSearch("");
  }

  /**
   * Handle close dropdown and reset search term
   */
  function close() {
    setCollapsed(false);
    onSearch && onSearch("");
  }

  const multipleMobileFooterEl = useMemo(() => {
    if (!multiple) return null;
    return (
      <UIButton
        fullWidth
        type="button"
        variant="success"
        disabled={selectedOptions.length < min}
        onClick={chooseSelected}
      >
        {t("ui.select.choose")}{" "}
        {selectedOptions.length > 0 && `(${selectedOptions.length})`}
      </UIButton>
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
          className={classNames("flex-1 truncate text-sm", {
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
          <UIBadge
            key={value}
            id={value}
            icon={opt.badgeIconEl || opt.iconEl}
            onRemove={removeOption}
          >
            {opt.label}
          </UIBadge>
        );
      });
    }

    // Or show multiple field placeholder
    return (
      <span
        className={classNames("flex items-center gap-2 text-sm", {
          "text-green-500": !disabled,
          "text-gray-250": disabled,
        })}
      >
        <PlusIcon className="inline h-5 w-5" />
        <span className="py-1">{placeholder}</span>
      </span>
    );
  }, [selectedOptions, disabled, placeholder, multiple]);

  // Based on multiple prop, return different renderers
  function optionRenderer(option: SelectOptionType) {
    const value = getValue(option);
    if (multiple) {
      return (
        <MemoizedMultipleSelectOption
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
      <MemoizedSingleSelectOption
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
      {label && (
        <label
          className="mb-1.5 block font-semibold text-gray-900"
          onClick={focus}
        >
          {label}
          {required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}
      <div
        ref={dpRef}
        tabIndex={0}
        className={classNames(
          "relative appearance-none rounded-lg border bg-white",
          "flex cursor-pointer flex-wrap items-center",
          "focus:outline-none",
          {
            "w-full": fullWidth,
            "border-gray-150 focus:ring-green-500 md:hover:border-gray-300":
              !error && !disabled,
            "border-red-500 focus:ring-red-500": error && !disabled,
            "cursor-not-allowed opacity-60": disabled,
            "focus:ring-1": !disabled,

            "py-2.5 px-3": !multiple,
            "py-1.5 pl-3 pr-12": multiple,
            "gap-2": multiple && selectedOptions.length,
            "justify-between": multiple && !selectedOptions.length,
          },
        )}
        onClick={focus}
      >
        {selectedValueEl}
        <ChevronDownIcon
          className={classNames(
            "absolute top-2 right-3 inline h-6 w-6 bg-white",
            {
              "text-gray-800": !disabled,
              "text-gray-200": disabled,
              "ml-1": !multiple,
            },
          )}
        />

        {collapsed && (
          <SelectOptionsDropdown
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
            footerEl={multipleMobileFooterEl}
            onClose={close}
            onReset={onReset}
            onSearch={onSearch}
          />
        )}
      </div>

      {error && (
        <span className="block pt-1.5 text-xs text-red-400">{error}</span>
      )}
      {helpText && (
        <span className="block pt-1.5 text-xs text-gray-300">{helpText}</span>
      )}
    </div>
  );
};

export default UISelectField;
