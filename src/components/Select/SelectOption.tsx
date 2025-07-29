import styles from "./select.module.css";
import type { JSX, MouseEvent, ReactElement } from "react";
import { clsx } from "clsx";

export type SelectOptionType<T, V> = {
  label: string;
  value: V;
  selected?: boolean;
  classes?: string;
  helpText?: string;
  iconEl?: ReactElement | null;
  badgeIconEl?: ReactElement | null;
  rawData?: T;
};

export type SelectFieldOptionProps<T, V> = {
  label: string;
  value: V;
  classes?: string;
  helpText?: string;
  iconEl?: ReactElement | null;
  badgeIconEl?: ReactElement | null;
  rawData?: T;
  selected?: boolean;
  disabled?: boolean;
  onSelect: (option: SelectOptionType<T, V>) => void;
};

function SingleSelectOption<T, V = string>({
  label,
  value,
  classes,
  helpText,
  iconEl,
  badgeIconEl,
  rawData,
  selected = false,
  onSelect,
}: SelectFieldOptionProps<T, V>): JSX.Element {
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
      className={clsx(styles["select-option"], {
        [styles["select-option--single-selected"]]: selected,
        [classes || ""]: !!classes,
      })}
      onClick={handleSelect}
    >
      <div className="flex flex-1 items-center">
        {iconEl && <span className={styles["select-option__icon"]}>{iconEl}</span>}
        {label}
      </div>
      {helpText && <span className={styles["select-option__help"]}>{helpText}</span>}
    </div>
  );
}

export default SingleSelectOption;
