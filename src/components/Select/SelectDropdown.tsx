import styles from "./select.module.css";
import type { ChangeEvent, ReactElement, ReactNode } from "react";
import type { JSX } from "react";
import type { SelectOptionType } from "@/components/Select/SelectOption";
import type { Position } from "@/types";
import { useCallback, useMemo, useRef } from "react";
import { Modal, useModalStackCtx } from "react-context-modal";
import useGteSm from "@/hooks/useGteSm";
import { clsx } from "clsx";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import LoadMoreElement from "@/components/Select/LoadMoreElement";
import SimpleBar from "simplebar-react";
import TextField from "@/components/Text/TextField";
import { ViewportList } from "react-viewport-list";

type SelectFieldDropdownProps<T> = {
  id: string;
  label?: string | null;
  isLoading?: boolean;
  options: SelectOptionType<T>[];
  fullscreen?: boolean;
  position?: Position;
  minWidth?: number;
  helpText?: string | null;
  searchTerm?: string;
  // eslint-disable-next-line no-unused-vars
  optionRenderer: (option: SelectOptionType<T>) => ReactNode;
  // eslint-disable-next-line no-unused-vars
  footerRenderer?: (onClose: () => void) => ReactElement;
  onLoadMore?: () => void;
  // eslint-disable-next-line no-unused-vars
  onReset?: (field: string, value: number | string, shouldValidate?: boolean | undefined) => void;
  // eslint-disable-next-line no-unused-vars
  onSearch?: (term: string) => void;
  onClose: () => void;
};

function SelectOptionsDropdown<T>({
  id,
  label = "Select option",
  position = "left",
  helpText,
  options = [],
  isLoading = false,
  fullscreen = true,
  minWidth,
  searchTerm = "",
  footerRenderer,
  onLoadMore,
  optionRenderer,
  onSearch,
  onReset,
  onClose,
}: SelectFieldDropdownProps<T>): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null!);
  const modalCtx = useModalStackCtx();
  const gteSm = useGteSm();

  const handleSearch = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onSearch && onSearch(e.target.value);

  // Wrap dropdown content in Modal on mobile devices,
  // and show as dropdown on desktop below the input
  // eslint-disable-next-line no-unused-vars
  const wrapperRenderer = useCallback<(children: ReactNode) => ReactElement>(
    (children) => {
      // Show as dropdown on desktop
      if (gteSm) {
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
              ...(minWidth && gteSm ? { minWidth: minWidth } : {}),
            }}
          >
            {children}
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
          headerRenderer={(onCloseHandler) =>
            fullscreen ? (
              <Header
                fixed
                parentIsModal
                classes="safe-top"
                title={label}
                onGoBack={onCloseHandler}
              />
            ) : (
              <></>
            )
          }
          footerRenderer={footerRenderer}
          onClose={onClose}
        >
          <div className="mt-16">{children}</div>
        </Modal>
      );
    },
    [gteSm, footerRenderer],
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

  const scrollableContentWrapper = useCallback(
    (children: ReactNode) =>
      gteSm ? (
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
    [gteSm],
  );

  return (
    <>
      {wrapperRenderer(
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

          {!gteSm && helpText && <p className={styles.select__help}>{helpText}</p>}

          {options.length ? (
            scrollableContentWrapper(
              <>
                <ViewportList
                  viewportRef={gteSm ? containerRef : modalCtx?.lastModal?.scrollableContentRef}
                  items={options}
                >
                  {(item: SelectOptionType<T>) => optionRenderer(item)}
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
        </>,
      )}
    </>
  );
}

export default SelectOptionsDropdown;
