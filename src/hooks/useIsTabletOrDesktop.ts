import { useCallback, useSyncExternalStore } from "react";

export default function useIsTabletOrDesktop(minWidth = "576px"): boolean {
  const query = `(min-width: ${minWidth})`;

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onStoreChange);

      return () => media.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => true,
  );
}
