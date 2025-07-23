import { FocusEvent } from 'react';
type SwitchFieldProps = {
    id: string;
    name: string;
    label?: string | null;
    helpText?: string;
    value: boolean;
    onChange: (value: boolean) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
};
declare const SwitchField: ({ id, name, label, helpText, value, onFocus, onChange }: SwitchFieldProps) => import("react/jsx-runtime").JSX.Element;
export default SwitchField;
