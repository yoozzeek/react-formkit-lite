import styles from "./select.module.css";
import { memo, useState } from "react";
import type { JSX, MouseEvent } from "react";
import { clsx } from "clsx";
import CheckIcon from "@/assets/icons/check.svg?react";
import type { SelectFieldOptionProps } from "@/components/Select/SelectOption.tsx";

function MultipleSelectOption<T>({
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
}: SelectFieldOptionProps<T>): JSX.Element {
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
      className={clsx(
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

      {helpText && <span className="flex-shrink-0 text-gray-300">{helpText}</span>}

      {selected ? (
        <span
          className={clsx(
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
          className={clsx("inline-block h-6 w-6 border", "rounded-full md:rounded-xs", {
            "border-green-500 bg-green-500": selected,
            "border-gray-200 bg-white": !selected,
            "border-2 border-gray-200": disabled && !selected,
          })}
        />
      )}
    </div>
  );
}

export default memo(MultipleSelectOption) as typeof MultipleSelectOption;
