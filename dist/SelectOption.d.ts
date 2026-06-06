import { JSX, ReactElement } from 'react';
export type SelectOptionType<T, V> = {
    label: string;
    value: V;
    selected?: boolean;
    classes?: string;
    helpText?: string;
    iconEl?: ReactElement | null;
    badgeIconEl?: ReactElement | null;
    rawData?: T;
};
export type SelectFieldOptionProps<T, V> = {
    label: string;
    value: V;
    classes?: string;
    helpText?: string;
    iconEl?: ReactElement | null;
    badgeIconEl?: ReactElement | null;
    rawData?: T;
    selected?: boolean;
    disabled?: boolean;
    onSelect: (option: SelectOptionType<T, V>) => void;
};
declare function SingleSelectOption<T, V = string>({ label, value, classes, helpText, iconEl, badgeIconEl, rawData, selected, onSelect, }: SelectFieldOptionProps<T, V>): JSX.Element;
export default SingleSelectOption;
