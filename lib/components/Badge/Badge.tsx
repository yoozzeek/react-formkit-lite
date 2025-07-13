import type { ReactElement, ReactNode } from "react";
import CloseIcon from "@/assets/icons/close.svg?react";
import { clsx } from "clsx";
import type { Variant } from "@/types";

const UIBadge = ({
  id,
  icon,
  variant = "light",
  onClick,
  onRemove,
  selected = false,
  children,
}: {
  id?: string;
  children: ReactNode;
  icon?: ReactElement | null;
  variant?: Variant;
  selected?: boolean;
  onClick?: (id: string) => void;
  onRemove?: (id: string) => void;
}) => {
  function handleClick() {
    if (id) onClick?.(id);
  }

  function handleRemove() {
    if (id) onRemove?.(id);
  }

  return (
    <span
      className={clsx("flex items-center rounded-lg px-2 py-1 text-sm", {
        "bg-gray-100 text-gray-900 hover:bg-gray-200/50": !selected && variant === "light",
        "bg-gray-900 text-white hover:bg-gray-900/90":
          (!selected && variant === "dark") || (selected && variant === "light"),
        "bg-green-500 text-white hover:bg-green-500/90": !selected && variant === "success",
        "bg-red-500 text-white hover:bg-red-500/90": !selected && variant === "danger",

        "bg-orange-500 text-white hover:bg-orange-500/90": !selected && variant === "warning",
        "bg-blue-500 text-white hover:bg-blue-500/90": !selected && variant === "info",
        "bg-purple-500 text-white hover:bg-purple-500/90": !selected && variant === "primary",
        "bg-black text-white hover:bg-black/90": !selected && variant === "black",

        "cursor-pointer": Boolean(onClick),
      })}
      onClick={handleClick}
    >
      {icon && <span className="mx-1 h-5 w-5">{icon}</span>}
      {children}
      {onRemove && (
        <button
          className={clsx("ml-1.5", {
            "text-gray-250 hover:text-gray-500": !selected,
            "text-white hover:text-gray-200": selected,
          })}
          type="button"
          onClick={handleRemove}
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}
    </span>
  );
};

export default UIBadge;
