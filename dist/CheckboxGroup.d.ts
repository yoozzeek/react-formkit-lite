import { ReactNode } from 'react';
export type CheckboxGroupProps = {
    label: string;
    error?: string;
    classes?: string;
    ariaLabel?: string;
    children: ReactNode;
};
declare const CheckboxGroup: ({ label, children, error, ariaLabel, }: CheckboxGroupProps) => import("react/jsx-runtime").JSX.Element;
export default CheckboxGroup;
