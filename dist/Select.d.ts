import { JSX, ReactElement } from 'react';
import { SelectOptionType } from './SelectOption';
import { CommonFieldProps, Position } from './types';
export type SelectFormikHandler<V> = (field: string, value: V, shouldValidate?: boolean | undefined) => void;
export type SelectSimpleHandler<T, V> = (value: V, opt?: SelectOptionType<T, V>) => void;
export interface SelectFieldCommonProps<T, V> extends CommonFieldProps {
    max?: number;
    min?: number;
    searchTerm?: string;
    popupLabel?: string | null;
    isLoading?: boolean;
    dpWidth?: number;
    dpPosition?: Position;
    dpFullscreen?: boolean;
    formikHandler?: boolean;
    options: SelectOptionType<T, V>[];
    valueGetter?: (rawData: T) => V;
    valueRender?: (opt: SelectOptionType<T, V>) => ReactElement;
    onLoadMore?: () => void;
    onSearch?: (term: string) => void;
}
interface SelectFieldSimpleHandlerProps<T, V> extends SelectFieldCommonProps<T, V> {
    value: V;
    multiple?: false | undefined;
    formikHandler?: false | undefined;
    onChange: SelectSimpleHandler<T, V>;
}
interface MultipleSelectFieldSimpleHandlerProps<T, V> extends SelectFieldCommonProps<T, V> {
    value: V[];
    multiple: true;
    formikHandler?: false | undefined;
    onChange: SelectSimpleHandler<T, V[]>;
}
interface SelectFieldWithFormikHandlerProps<T, V> extends SelectFieldCommonProps<T, V> {
    value: V;
    multiple?: false | undefined;
    formikHandler: true;
    onChange: SelectFormikHandler<V>;
}
interface MultipleSelectFieldWithFormikHandlerProps<T, V> extends SelectFieldCommonProps<T, V> {
    value: V[];
    multiple: true;
    formikHandler: true;
    onChange: SelectFormikHandler<V[]>;
}
export type SelectFieldProps<T, V> = SelectFieldWithFormikHandlerProps<T, V> | MultipleSelectFieldWithFormikHandlerProps<T, V> | SelectFieldSimpleHandlerProps<T, V> | MultipleSelectFieldSimpleHandlerProps<T, V>;
declare function SelectField<T = unknown, V = string>({ id, label, popupLabel, dpWidth, placeholder, max, min, options, error, helpText, value, valueGetter, valueRender, searchTerm, required, multiple, dpFullscreen, dpPosition, isLoading, formikHandler, fullWidth, disabled, onLoadMore, onFocus, onSearch, onChange, onReset, }: SelectFieldProps<T, V>): JSX.Element;
export default SelectField;
