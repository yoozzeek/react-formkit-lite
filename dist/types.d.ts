import { SelectFormikHandler, SelectSimpleHandler } from './Select';
import { SelectOptionType } from './SelectOption';
import { MouseEvent, FocusEvent } from 'react';
export type Size = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type Position = "center" | "right" | "left" | "top" | "bottom";
export type Variant = "light" | "dark" | "success" | "danger" | "warning" | "none" | "primary" | "info" | "black";
export interface CommonFieldProps {
    id: string;
    name?: string;
    label?: string | null;
    helpText?: string | null;
    placeholder?: string | null;
    fullWidth?: boolean;
    disabled?: boolean;
    required?: boolean;
    resetDisabled?: boolean;
    error?: string | boolean | string[];
    onFocus?: (e: MouseEvent | FocusEvent) => void;
    onReset?: (field: string, value: string | number, shouldValidate?: boolean | undefined) => void;
}
export interface CustomSelectFieldProps<T, V> {
    id: string;
    name: string;
    label?: string | null;
    disabled?: boolean;
    placeholder?: string | null;
    error?: string | string[] | boolean;
    required?: boolean;
    helpText?: string | null;
    popupLabel?: string | null;
    dpPosition?: Position;
    dpFullscreen?: boolean;
    dpWidth?: number;
    fixedOptions?: SelectOptionType<T, V>[];
    onFocus?: (e?: MouseEvent | FocusEvent) => void;
}
export interface CustomSingleSelectFieldProps<T, V> extends CustomSelectFieldProps<T, V> {
    value: V;
    onChange: SelectSimpleHandler<T, V> | SelectFormikHandler<V>;
}
export interface CustomMultipleSelectFieldProps<T, V> extends CustomSelectFieldProps<T, V> {
    min?: number;
    max?: number;
    value: V[];
    onChange: SelectSimpleHandler<T, V> | SelectFormikHandler<V>;
}
export type UploadedFileItem = {
    url: string;
    name: string;
    type: string;
    isPlaceholder?: boolean;
};
