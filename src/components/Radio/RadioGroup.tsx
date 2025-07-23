import styles from "./radio.module.css";
import type { ReactNode } from "react";

type RadioGroupProps = {
  label: string;
  ariaLabel?: string;
  error?: string;
  children: ReactNode;
};

const RadioGroup = ({ ariaLabel = "radio-group", label, error, children }: RadioGroupProps) => {
  return (
    <div role="group" aria-labelledby={ariaLabel || "radio-group"}>
      <span className={styles["radio-group__label"]}>{label}</span>
      <div className={styles["radio-group__content"]}>{children}</div>
      {error && <p className={styles["radio-group__error"]}>{error}</p>}
    </div>
  );
};

export default RadioGroup;
