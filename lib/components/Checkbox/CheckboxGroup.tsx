import styles from "./checkbox.module.css";
import type { ReactNode } from "react";

export type CheckboxGroupProps = {
  label: string;
  classes?: string;
  children: ReactNode;
};

const CheckboxGroup = ({ label, children }: CheckboxGroupProps) => {
  return (
    <div
      className={styles.checkbox_group}
      role="group"
      aria-labelledby="account-notifications-group"
    >
      <h3 className={styles.checkbox_group_label}>{label}</h3>
      {children}
    </div>
  );
};

export default CheckboxGroup;
