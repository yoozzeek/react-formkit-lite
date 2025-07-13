import type { ReactNode } from "react";

type RadioGroupProps = {
  label: string;
  ariaLabel?: string;
  error?: string;
  children: ReactNode;
};

const RadioGroup = ({ ariaLabel = "radio-group", label, error, children }: RadioGroupProps) => {
  return (
    <div role="group" aria-labelledby={ariaLabel || "Group"}>
      <span className="block pb-4 font-semibold text-gray-900">{label}</span>
      {children}
      {error && <p className="mt-4 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default RadioGroup;
