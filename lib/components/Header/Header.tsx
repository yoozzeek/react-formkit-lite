import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { clsx } from "clsx";
//import useModal from "../hooks/useModal";
import type { Variant } from "@/types";
import useGteSm from "@/hooks/useGteSm.ts";
import ArrowIcon from "@/assets/icons/arrow.svg?react";

export type UIHeaderActionType = {
  label?: string | null;
  icon?: ReactElement;
  primary?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

type HeaderProps = {
  title?: string | ReactElement | null;
  fixed?: boolean;
  children?: ReactNode;
  serifTitle?: boolean;
  titleH1?: boolean;
  variant?: Variant;
  // if transparent is true, this will
  // add a gradient cover to the header
  transparent?: boolean;
  transparentCover?: boolean;

  // The scroll delta is used to determine when the header
  // should be detected as scrolled down.
  scrollDelta?: number;

  autoThemeColorDisabled?: boolean;
  classes?: string;
  parentIsModal?: boolean;
  goBackLabel?: string;
  action?: UIHeaderActionType;
  onGoBack?: () => void;
};

function Header({
  title,
  goBackLabel,
  onGoBack,
  serifTitle = false,
  fixed = false,
  titleH1 = false,
  transparent = false,
  transparentCover = true,
  parentIsModal = false,
  scrollDelta,
  variant = "dark",
  action,
  classes,
  children,
}: HeaderProps) {
  //const modal = useModal();
  const headerRef = useRef<HTMLDivElement>(null!);
  const [scrolledDown, setScrolledDown] = useState(scrollDelta === 0);

  const gteSm = useGteSm();

  // After user scrolled down the header light should be turned off
  useEffect(() => {
    // If the header is not fixed, we don't need to do anything
    if (!fixed || gteSm) return;

    const headerEl = headerRef.current;
    const modalEl = modal.lastModal?.scrollableContentRef.current;
    const delta = scrollDelta || headerEl?.offsetHeight || 0;

    const onScroll = () => {
      const scrollY =
        parentIsModal && modalEl
          ? modal.lastModal?.scrollableContentRef.current?.scrollTop || 0
          : window.scrollY;

      if (delta && scrollY > delta) {
        setScrolledDown(true);
        return;
      }

      setScrolledDown(false);
    };

    // If it's a modal then listen to scroll on the modal content
    if (parentIsModal && modalEl) {
      modalEl.addEventListener("scroll", onScroll);
      return () => {
        modalEl.removeEventListener("scroll", onScroll);
      };
    }

    // Otherwise listen to window scroll
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [gteSm, scrollDelta, fixed, modal.lastModal]);

  const handleGoBack = useCallback(() => onGoBack?.(), [onGoBack]);

  const handleActionClick = useCallback(() => {
    if (!action) return;
    if (!action.disabled && action.onClick) {
      action.onClick();
    }
  }, [action]);

  const actionLabel = useMemo<string | ReactElement | null>(
    () => action?.icon || action?.label || "Done",
    [action],
  );

  const showAction = useMemo<boolean>(() => !!children || !!action, [children, action]);

  const renderTitle = useMemo(() => {
    const classes = clsx("min-w-0 flex-1 truncate text-xl font-semibold", {
      "font-serif": serifTitle,
      "mx-4 sm:mr-6": !!onGoBack,
    });
    return titleH1 ? <h1 className={classes}>{title}</h1> : <div className={classes}>{title}</div>;
  }, [title, titleH1, serifTitle, onGoBack]);

  return (
    <header
      ref={headerRef}
      className={clsx(
        "flex min-h-[3.5rem] shrink-0 items-center transition-all sm:rounded-t-2xl",
        "px-4 sm:px-6 sm:pt-4",
        {
          relative: !fixed,
          "fixed top-0 left-0 z-30 w-full sm:relative": fixed,
          "bg-white border-b border-gray-150/50": fixed && scrolledDown,
          "dark-bg-gradient": transparent && transparentCover && !scrolledDown,
          // "border-b sm:border-none":
          //   haveScrolled || (!transparent && !haveScrolled),
          // "border-gray-150": haveScrolled || (!transparent && !haveScrolled),
          "text-gray-900": variant === "dark" || scrolledDown,
          "text-white": variant === "light" && !scrolledDown,
          [classes as string]: classes,
        },
      )}
    >
      {
        // TODO Make it with js then ssr will not work. Need to find a solution
      }
      {/*{!autoThemeColorDisabled && (*/}
      {/*  <Head>*/}
      {/*    <meta name="theme-color" content={!transparent || scrolledDown ? "#FFFFFF" : "#000000"} />*/}
      {/*  </Head>*/}
      {/*)}*/}

      {onGoBack &&
        (goBackLabel ? (
          <button className="-m-4 p-4 sm:-m-6 sm:p-6" type="button" onClick={handleGoBack}>
            <span className="text-lg font-light text-gray-400">{goBackLabel}</span>
          </button>
        ) : (
          <button
            className="rounded-full border border-gray-200 p-1"
            type="button"
            onClick={handleGoBack}
          >
            <ArrowIcon
              className={clsx("h-5 w-5 rotate-180", {
                "text-gray-900": variant === "dark" || scrolledDown,
                "text-white": variant === "light" && !scrolledDown,
              })}
            />
          </button>
        ))}

      {title && typeof title === "string" ? renderTitle : title}

      {showAction && (
        <div className="flex shrink-0 items-center justify-end">
          {children}
          {action && (
            <span
              className={clsx("cursor-pointer", {
                "text-gray-900": action.icon,
                "text-sm text-gray-300 hover:text-gray-500":
                  !action.icon && action.label && !action.primary,
                "text-lg font-medium text-green-500 hover:text-green-600":
                  !action.icon && action.primary && !action.disabled,
                "text-lg font-medium text-gray-200":
                  !action.icon && action.primary && action.disabled,
              })}
              onClick={handleActionClick}
            >
              {actionLabel}
            </span>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
