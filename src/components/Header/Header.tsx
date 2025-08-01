import styles from "./header.module.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { clsx } from "clsx";
import type { Variant } from "@/types";
import useIsTabletOrDesktop from "@/hooks/useIsTabletOrDesktop";
import ArrowIcon from "@/assets/icons/arrow.svg?react";
import { useModal } from "@yoozzeek/react-context-modal";

export type HeaderActionType = {
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
  action?: HeaderActionType;
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
  const stackCtx = useModal();
  const headerRef = useRef<HTMLDivElement>(null!);
  const [scrolledDown, setScrolledDown] = useState(scrollDelta === 0);
  const isTabletOrDesktop = useIsTabletOrDesktop();

  // After user scrolled down the header light should be turned off
  useEffect(() => {
    // If the header is not fixed, we don't need to do anything
    if (!fixed || isTabletOrDesktop) return;

    const headerEl = headerRef.current;
    const modalScrollContentEl = stackCtx?.lastModal?.scrollableContentRef.current;
    const delta = scrollDelta || headerEl?.offsetHeight || 0;

    const onScroll = () => {
      const scrollY =
        parentIsModal && modalScrollContentEl
          ? stackCtx.lastModal?.scrollableContentRef.current?.scrollTop || 0
          : window.scrollY;

      if (delta && scrollY > delta) {
        setScrolledDown(true);
        return;
      }

      setScrolledDown(false);
    };

    // If it's a modal then listen to scroll on the modal content
    if (parentIsModal && modalScrollContentEl) {
      modalScrollContentEl.addEventListener("scroll", onScroll);
      return () => {
        modalScrollContentEl.removeEventListener("scroll", onScroll);
      };
    }

    // Otherwise listen to window scroll
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [parentIsModal, isTabletOrDesktop, scrollDelta, fixed, stackCtx?.lastModal]);

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
    const classes = clsx(
      styles["header__title"],
      serifTitle && styles["header__title--serif"],
      onGoBack && styles["header__title--spaced"],
    );
    return titleH1 ? <h1 className={classes}>{title}</h1> : <div className={classes}>{title}</div>;
  }, [title, titleH1, serifTitle, onGoBack]);

  return (
    <header
      ref={headerRef}
      className={clsx(styles.header, {
        [styles["header--fixed"]]: fixed,
        [styles["header--scrolled"]]: fixed && scrolledDown,
        [styles["header--gradient"]]: transparent && transparentCover && !scrolledDown,
        [styles["header--dark"]]: variant === "dark" || scrolledDown,
        [styles["header--light"]]: variant === "light" && !scrolledDown,
        [classes as string]: classes,
      })}
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
          <button className={styles["header__back-button"]} type="button" onClick={handleGoBack}>
            <span className={styles["header__back-text"]}>{goBackLabel}</span>
          </button>
        ) : (
          <button className={styles["header__back-icon-btn"]} type="button" onClick={handleGoBack}>
            <ArrowIcon
              className={clsx(styles["header__back-icon"], {
                [styles["header__back-icon--dark"]]: variant === "dark" || scrolledDown,
                [styles["header__back-icon--light"]]: variant === "light" && !scrolledDown,
              })}
            />
          </button>
        ))}

      {title && typeof title === "string" ? renderTitle : title}

      {showAction && (
        <div className={styles.header__actions}>
          {children}
          {action && (
            <span
              className={clsx(styles.header__action, {
                [styles["header__action--icon"]]: action.icon,
                [styles["header__action--text"]]: !action.icon && action.label && !action.primary,
                [styles["header__action--primary"]]:
                  !action.icon && action.primary && !action.disabled,
                [styles["header__action--disabled"]]:
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
