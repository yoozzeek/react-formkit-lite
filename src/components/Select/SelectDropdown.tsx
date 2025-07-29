import styles from "./select.module.css";
import type { ChangeEvent, ReactElement, ReactNode, RefObject } from "react";
import type { JSX } from "react";
import type { SelectOptionType } from "@/components/Select/SelectOption";
import type { Position } from "@/types";
import { useCallback, useMemo, useRef } from "react";
import { Modal, useModalStackCtx } from "@yoozzeek/react-context-modal";
import useIsTabletOrDesktop from "@/hooks/useIsTabletOrDesktop.ts";
import { clsx } from "clsx";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import LoadMoreElement from "@/components/Select/LoadMoreElement";
import SimpleBar from "simplebar-react";
import TextField from "@/components/Text/TextField";
import { ViewportList } from "react-viewport-list";
import MultipleSelectOption from "@/components/Select/SelectMultipleOption.tsx";
import SingleSelectOption from "@/components/Select/SelectOption.tsx";

type SelectFieldDropdownProps<T, V> = {
  id: string;
  label?: string | null;
  isLoading?: boolean;
  selectedValues: RefObject<Set<V>>;
  options: SelectOptionType<T, V>[];
  fullscreen?: boolean;
  position?: Position;
  multiple?: boolean;
  max?: number;
  minWidth?: number;
  helpText?: string | null;
  searchTerm?: string;
  // eslint-disable-next-line no-unused-vars
  getValue: (option: SelectOptionType<T, V>) => V;
  // eslint-disable-next-line no-unused-vars
  footerRenderer?: (onClose: () => void) => ReactElement;
  onLoadMore?: () => void;
  // eslint-disable-next-line no-unused-vars
  onReset?: (field: string, value: number | string, shouldValidate?: boolean | undefined) => void;
  // eslint-disable-next-line no-unused-vars
  onSearch?: (term: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleSelect: (option: SelectOptionType<T, V>) => void;
  onClose: () => void;
};

function GenericOption<T, V>({
  option,
  multiple,
  max = 3,
  selectedValues,
  handleSelect,
  getValue,
  onClose,
}: {
  selectedValues: RefObject<Set<V>>;
  multiple?: boolean;
  max?: number;
  option: SelectOptionType<T, V>;
  onClose?: () => void;
  // eslint-disable-next-line no-unused-vars
  getValue: (option: SelectOptionType<T, V>) => V;
  // eslint-disable-next-line no-unused-vars
  handleSelect: (option: SelectOptionType<T, V>) => void;
}) {
  const value = getValue(option);

  function handleSingleSelect() {
    handleSelect(option);
    onClose?.();
  }

  if (multiple) {
    return (
      <MultipleSelectOption<T, V>
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
    <SingleSelectOption<T, V>
      value={value}
      label={option.label}
      classes={option.classes}
      helpText={option.helpText}
      rawData={option.rawData}
      iconEl={option.iconEl}
      badgeIconEl={option.badgeIconEl}
      selected={selectedValues.current.has(value)}
      onSelect={handleSingleSelect}
    />
  );
}

function SelectOptionsDropdown<T, V>({
  id,
  label = "Select option",
  position = "left",
  helpText,
  multiple,
  max = 3,
  selectedValues,
  options = [],
  isLoading = false,
  fullscreen = true,
  minWidth,
  searchTerm = "",
  footerRenderer,
  getValue,
  onLoadMore,
  handleSelect,
  onSearch,
  onReset,
  onClose,
}: SelectFieldDropdownProps<T, V>): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null!);
  const modalCtx = useModalStackCtx();
  const isTabletOrDesktop = useIsTabletOrDesktop();

  const handleSearch = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onSearch && onSearch(e.target.value);

  const scrollableContentWrapper = useCallback(
    (children: ReactNode) =>
      isTabletOrDesktop ? (
        <SimpleBar
          scrollableNodeProps={{ ref: containerRef }}
          className={styles["select__scrollable-simplebar"]}
        >
          {children}
        </SimpleBar>
      ) : (
        <div ref={containerRef} className={styles.select__scrollable}>
          {children}
        </div>
      ),
    [isTabletOrDesktop],
  );

  const loadMoreContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className={styles["select__loading-block"]}>
          <Loader size="sm" />
        </div>
      );
    }
    if (onLoadMore) return <LoadMoreElement loadMore={onLoadMore} />;
    return null;
  }, [isLoading, onLoadMore]);

  const contentRenderer = useCallback(
    (wrappedOnClose?: () => void) => {
      return (
        <>
          {onSearch && (
            <div className={styles.select__search}>
              <TextField
                fullWidth
                id={`${id}-search`}
                placeholder="Search..."
                value={searchTerm || ""}
                onChange={handleSearch}
                onReset={onReset}
              />
            </div>
          )}

          {!isTabletOrDesktop && helpText && <p className={styles.select__help}>{helpText}</p>}

          {options.length ? (
            scrollableContentWrapper(
              <>
                <ViewportList
                  viewportRef={
                    isTabletOrDesktop ? containerRef : modalCtx?.lastModal?.scrollableContentRef
                  }
                  items={options}
                >
                  {(item: SelectOptionType<T, V>) => (
                    <GenericOption<T, V>
                      key={`${item.value}`}
                      max={max}
                      option={item}
                      multiple={multiple}
                      selectedValues={selectedValues}
                      getValue={getValue}
                      handleSelect={handleSelect}
                      onClose={wrappedOnClose}
                    />
                  )}
                </ViewportList>

                {loadMoreContent}
              </>,
            )
          ) : isLoading ? (
            <div className={styles["select__loading-block"]}>
              <Loader size="sm" />
            </div>
          ) : (
            <p className={styles["select__no-results"]}>No results</p>
          )}
        </>
      );
    },
    [
      id,
      options,
      helpText,
      isLoading,
      isTabletOrDesktop,
      loadMoreContent,
      scrollableContentWrapper,
      searchTerm,
    ],
  );

  // Wrap dropdown content in Modal on mobile devices,
  // and show as dropdown on desktop below the input
  if (isTabletOrDesktop) {
    return (
      <div
        className={clsx(styles.select__dropdown, {
          [styles["select__dropdown--left"]]: position === "left",
          [styles["select__dropdown--right"]]: position === "right",
        })}
        role="combobox"
        aria-controls="listbox"
        aria-expanded="true"
        style={{
          ...(minWidth && isTabletOrDesktop ? { minWidth: minWidth } : {}),
        }}
      >
        {contentRenderer()}
      </div>
    );
  }

  // Otherwise wrap in modal
  return (
    <Modal
      id="select-field-modal"
      title={label}
      type={fullscreen ? "fullscreen" : "overlay-90"}
      fallbackCtx={modalCtx}
      headerRenderer={(wrappedOnClose) =>
        fullscreen ? (
          <Header fixed parentIsModal classes="safe-top" title={label} onGoBack={wrappedOnClose} />
        ) : (
          <></>
        )
      }
      footerRenderer={footerRenderer}
      onClose={onClose}
    >
      {(wrappedOnClose) => <div className="mt-16">{contentRenderer(wrappedOnClose)}</div>}
    </Modal>
  );
}

export default SelectOptionsDropdown;
