import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, RefObject } from "react";
import type { Position } from "@/types";

const ANCHOR_GAP = 6;
const VIEWPORT_MARGIN = 8;
const OVERHANG_RATIO = 0.02;
const MAX_HEIGHT = 320;
const MIN_HEIGHT = 120;

const HIDDEN: CSSProperties = { visibility: "hidden", pointerEvents: "none" };

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

function isOutsideViewport(rect: DOMRect, width: number, height: number): boolean {
  return rect.bottom <= 0 || rect.top >= height || rect.right <= 0 || rect.left >= width;
}

function computeStyle(anchor: HTMLElement, position: Position, minWidth?: number): CSSProperties {
  const rect = anchor.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  if (isOutsideViewport(rect, viewportWidth, viewportHeight)) return HIDDEN;

  const overhang = rect.width * OVERHANG_RATIO;
  const spaceBelow = viewportHeight - rect.bottom - ANCHOR_GAP - VIEWPORT_MARGIN;
  const spaceAbove = rect.top - ANCHOR_GAP - VIEWPORT_MARGIN;
  const openAbove = spaceBelow < MAX_HEIGHT && spaceAbove > spaceBelow;

  const height = clamp(
    openAbove ? spaceAbove : spaceBelow,
    MIN_HEIGHT,
    Math.min(MAX_HEIGHT, viewportHeight - VIEWPORT_MARGIN * 2),
  );

  const width = clamp(
    Math.max(rect.width + overhang * 2, minWidth ?? 0),
    0,
    viewportWidth - VIEWPORT_MARGIN * 2,
  );

  const left = position === "right" ? rect.right + overhang - width : rect.left - overhang;
  const offset = openAbove ? viewportHeight - rect.top + ANCHOR_GAP : rect.bottom + ANCHOR_GAP;
  const maxOffset = viewportHeight - height - VIEWPORT_MARGIN;

  const style: CSSProperties = {
    width,
    maxHeight: height,
    left: clamp(left, VIEWPORT_MARGIN, viewportWidth - width - VIEWPORT_MARGIN),
  };

  if (openAbove) {
    style.bottom = clamp(offset, VIEWPORT_MARGIN, maxOffset);
  } else {
    style.top = clamp(offset, VIEWPORT_MARGIN, maxOffset);
  }

  return style;
}

function isSameStyle(a: CSSProperties, b: CSSProperties): boolean {
  const keys = Object.keys(a) as (keyof CSSProperties)[];
  return keys.length === Object.keys(b).length && keys.every((key) => a[key] === b[key]);
}

function useAnchoredDropdown(
  anchorRef: RefObject<HTMLElement>,
  position: Position,
  minWidth: number | undefined,
  enabled: boolean,
): CSSProperties | null {
  const [style, setStyle] = useState<CSSProperties | null>(null);
  const frameRef = useRef(0);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    if (!enabled || !anchor) return;

    function update() {
      const next = computeStyle(anchor, position, minWidth);
      setStyle((prev) => (prev && isSameStyle(prev, next) ? prev : next));
    }

    function schedule() {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(update);
    }

    update();

    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, { capture: true, passive: true });

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(anchor);

    return () => {
      cancelAnimationFrame(frameRef.current);

      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule, { capture: true });

      resizeObserver.disconnect();
    };
  }, [anchorRef, position, minWidth, enabled]);

  return enabled ? style : null;
}

export default useAnchoredDropdown;
