import { JSX, ReactElement } from 'react';
type RadioFieldProps = {
    label?: string | ReactElement;
    name: string;
    value: string | number;
    disabled?: boolean;
    lightVariant?: boolean;
    checkedValue?: string | number;
    onChange?: () => void;
    onFocus?: () => void;
};
declare const _default: import('react').MemoExoticComponent<({ name, value, label, disabled, lightVariant, checkedValue, onChange, onFocus, }: RadioFieldProps) => JSX.Element | null>;
export default _default;
