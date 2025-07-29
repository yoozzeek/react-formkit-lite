import styles from "./select.module.css";
import { useState } from "react";
import type { JSX, MouseEvent } from "react";
import { clsx } from "clsx";
import CheckIcon from "@/assets/icons/check.svg?react";
import type { SelectFieldOptionProps } from "@/components/Select/SelectOption.tsx";

function MultipleSelectOption<T, V>({
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
}: SelectFieldOptionProps<T, V>): JSX.Element {
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
      className={clsx(styles["select-option"], {
        "cursor-pointer": !disabled,
        [styles["select-option--disabled"]]: disabled && !selected,
        [classes || ""]: !!classes,
      })}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-1 items-center">
        {iconEl && <span className={styles["select-option__icon"]}>{iconEl}</span>}
        {label}
      </div>

      {helpText && <span className={styles["select-option__help"]}>{helpText}</span>}

      <span
        className={clsx(styles["select-option__checkbox"], {
          [styles["select-option__checkbox--selected"]]: selected && !hovered,
          [styles["select-option__checkbox--hovered"]]: selected && hovered,
          [styles["select-option__checkbox--unselected"]]: !selected,
        })}
      >
        {selected && <CheckIcon className={styles["select-option__check-icon"]} />}
      </span>
    </div>
  );
}

export default MultipleSelectOption;
