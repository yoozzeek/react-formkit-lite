import { type MouseEventHandler, useCallback } from "react";

export type CenterOnHorizontalScrollOptions = {
  container?: HTMLElement | null;
};

function findHScrollContainer(startEl: HTMLElement): HTMLElement | null {
  let el: HTMLElement | null = startEl.parentElement;
  while (el) {
    const style = window.getComputedStyle(el);
    const canScrollByOverflow =
      style.overflowX === "auto" || style.overflowX === "scroll" || style.overflowX === "overlay";
    const canScrollBySize = el.scrollWidth > el.clientWidth;

    if (canScrollBySize && canScrollByOverflow) return el;

    // SimpleBar special case: actual scrollable element is the wrapper
    if (el.classList.contains("simplebar-content")) {
      const wrapper = el.closest(".simplebar-content-wrapper") as HTMLElement | null;
      if (wrapper) return wrapper;
    }

    el = el.parentElement;
  }

  return null;
}

function centerItem(container: HTMLElement, item: HTMLElement): void {
  const containerRectLeft = container.getBoundingClientRect().left;
  const itemRectLeft = item.getBoundingClientRect().left;

  const currentLeft = container.scrollLeft;
  const itemCenterOffset = itemRectLeft - containerRectLeft + item.offsetWidth / 2;
  const target = currentLeft + itemCenterOffset - container.clientWidth / 2;

  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  const clamped = Math.max(0, Math.min(maxScrollLeft, target));

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  container.scrollTo({ left: clamped, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

export function useCenterOnHorizontalScroll(options?: CenterOnHorizontalScrollOptions) {
  return useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      const current = e.currentTarget as HTMLElement;

      const container =
        options?.container ||
        (current.closest(".simplebar-content-wrapper") as HTMLElement | null) ||
        findHScrollContainer(current);

      if (container) {
        centerItem(container, current);
      }
    },
    [options?.container],
  );
}
