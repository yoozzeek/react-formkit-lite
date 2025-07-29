import type { ReactNode } from "react";
import styles from "./checkbox.module.css";

export type CheckboxGroupProps = {
  label: string;
  error?: string;
  classes?: string;
  ariaLabel?: string;
  children: ReactNode;
};

const CheckboxGroup = ({
  label,
  children,
  error,
  ariaLabel = "checkbox-group",
}: CheckboxGroupProps) => {
  return (
    <div role="group" className={styles["checkbox-group"]} aria-labelledby={ariaLabel}>
      <span className={styles["checkbox-group__label"]}>{label}</span>
      <div className={styles["checkbox-group__content"]}>{children}</div>
      {error && <p className={styles["checkbox-group__error"]}>{error}</p>}
    </div>
  );
};

export default CheckboxGroup;
