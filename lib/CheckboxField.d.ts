import { JSX } from 'react';
import { CommonFieldProps } from './types';
interface CheckboxFieldProps extends CommonFieldProps {
    value: boolean;
    isGroup?: boolean;
    rightSideLabel?: boolean;
    disabled?: boolean;
    onFocus?: () => void;
    onClick?: (checked: boolean) => void;
}
declare const _default: import('react').MemoExoticComponent<({ id, name, label, value, isGroup, rightSideLabel, disabled, onClick, onFocus, }: CheckboxFieldProps) => JSX.Element>;
export default _default;
