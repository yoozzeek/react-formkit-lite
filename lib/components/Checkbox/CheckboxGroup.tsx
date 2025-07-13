import type { ReactNode } from "react";

export type CheckboxGroupProps = {
  label: string;
  classes?: string;
  children: ReactNode;
};

const CheckboxGroup = ({ label, children }: CheckboxGroupProps) => {
  return (
    <div className="mb-8 last:mb-0" role="group" aria-labelledby="account-notifications-group">
      <h3 className="mb-4 px-4 text-2xl text-gray-900 sm:px-6">{label}</h3>
      {children}
    </div>
  );
};

export default CheckboxGroup;
