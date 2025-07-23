import { ReactNode } from 'react';
type RadioGroupProps = {
    label: string;
    ariaLabel?: string;
    error?: string;
    children: ReactNode;
};
declare const RadioGroup: ({ ariaLabel, label, error, children }: RadioGroupProps) => import("react/jsx-runtime").JSX.Element;
export default RadioGroup;
