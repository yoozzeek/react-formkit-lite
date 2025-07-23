import { JSX, ReactElement } from 'react';
import { SelectOptionType } from './SelectOption';
import { CommonFieldProps, Position } from './types';
export type SelectValueType = string[] | number[] | string | number;
export type SelectFormikHandler = (field: string, value: SelectValueType, shouldValidate?: boolean | undefined) => void;
export type SelectSimpleHandler<T> = (value: SelectValueType, opt?: SelectOptionType<T>) => void;
export interface SelectFieldProps<T> extends CommonFieldProps {
    multiple?: boolean;
    value: SelectValueType;
    max?: number;
    min?: number;
    searchTerm?: string;
    popupLabel?: string | null;
    isLoading?: boolean;
    dpWidth?: number;
    dpPosition?: Position;
    dpFullscreen?: boolean;
    formikHandler?: boolean;
    options: SelectOptionType<T>[];
    valueGetter?: (rawData: T) => string | number;
    valueRender?: (opt: SelectOptionType<T>) => ReactElement;
    onLoadMore?: () => void;
    onSearch?: (term: string) => void;
    onChange: SelectSimpleHandler<T> | SelectFormikHandler;
}
declare function SelectField<T>({ id, label, popupLabel, dpWidth, placeholder, max, min, options, error, helpText, value, valueGetter, valueRender, searchTerm, required, multiple, dpFullscreen, dpPosition, isLoading, formikHandler, fullWidth, disabled, onLoadMore, onFocus, onSearch, onChange, onReset, }: SelectFieldProps<T>): JSX.Element;
declare const _default: import('react').MemoExoticComponent<typeof SelectField>;
export default _default;
