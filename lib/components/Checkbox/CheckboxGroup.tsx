import type { ReactNode } from "react";
import styles from "./Checkbox.module.css";

export type CheckboxGroupProps = {
  label: string;
  classes?: string;
  children: ReactNode;
};

const CheckboxGroup = ({ label, children }: CheckboxGroupProps) => {
  return (
    <div
      className={styles["checkbox-group"]}
      role="group"
      aria-labelledby="account-notifications-group"
    >
      <h3 className={styles["checkbox-group__label"]}>{label}</h3>
      {children}
    </div>
  );
};

export default CheckboxGroup;
