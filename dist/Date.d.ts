import { RefObject, JSX } from 'react';
import { CommonFieldProps } from './types';
interface DateFieldProps extends CommonFieldProps {
    ref?: RefObject<HTMLInputElement>;
    rows?: number;
    value: string;
    onChange?: (field: string, value: string, shouldValidate?: boolean | undefined) => void;
}
declare const _default: import('react').MemoExoticComponent<(props: DateFieldProps) => JSX.Element>;
export default _default;
