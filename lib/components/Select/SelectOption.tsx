import styles from "./select.module.css";
import type { JSX, MouseEvent, ReactElement } from "react";
import { memo } from "react";
import { clsx } from "clsx";

export type SelectOptionType<T> = {
  label: string;
  value: string | number;
  selected?: boolean;
  classes?: string;
  helpText?: string;
  iconEl?: ReactElement | null;
  badgeIconEl?: ReactElement | null;
  rawData?: T;
};

export type SelectFieldOptionProps<T> = {
  label: string;
  value: string | number;
  classes?: string;
  helpText?: string;
  iconEl?: ReactElement | null;
  badgeIconEl?: ReactElement | null;
  rawData?: T;
  selected?: boolean;
  disabled?: boolean;
  onSelect: (option: SelectOptionType<T>) => void;
};

function SingleSelectOption<T>({
  label,
  value,
  classes,
  helpText,
  iconEl,
  badgeIconEl,
  rawData,
  selected = false,
  onSelect,
}: SelectFieldOptionProps<T>): JSX.Element {
  function handleSelect(e: MouseEvent) {
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
        "flex cursor-pointer justify-between border-b border-gray-100 px-4 py-4 text-sm text-gray-900 last:border-none hover:bg-gray-100",
        {
          "bg-gray-100 text-green-500": selected,
          [classes || ""]: !!classes,
        },
      )}
      onClick={handleSelect}
    >
      <div className="flex flex-1 items-center">
        {iconEl && <span className="mr-4 flex">{iconEl}</span>}
        {label}
      </div>
      {helpText && <span className="flex-shrink-0 text-gray-300">{helpText}</span>}
    </div>
  );
}

export default memo(SingleSelectOption) as typeof SingleSelectOption;
