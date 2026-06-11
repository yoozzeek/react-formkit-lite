import { FocusEvent } from 'react';
type RangeFieldProps = {
    id: string;
    name: string;
    value: number;
    min?: number;
    max?: number;
    minPlaceholder?: string;
    maxPlaceholder?: string;
    step?: number;
    label?: string;
    disabled?: boolean;
    onValueChange?: (value: number) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
};
declare const RangeField: ({ id, name, min, max, minPlaceholder, maxPlaceholder, step, label, disabled, value, onValueChange, onFocus, }: RangeFieldProps) => import("react").JSX.Element;
export default RangeField;
