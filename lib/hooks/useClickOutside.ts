import { useEffect, useState } from "react";
import type { Dispatch, RefObject, SetStateAction } from "react";

function useClickOutside(
  ref: RefObject<HTMLElement>,
  initialState: boolean = false,
  manualAutoOpening: boolean = false,
  disabled: boolean = false,
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [isOpened, setOpen] = useState<boolean>(initialState);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (disabled) return;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
        return;
      }

      if (!manualAutoOpening) {
        setOpen(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [disabled, manualAutoOpening]);

  return [isOpened, setOpen];
}

export default useClickOutside;
