import { JSX, ReactElement } from 'react';
export type SelectOptionType<T> = {
    label: string;
    value: string | number;
    selected?: boolean;
    classes?: string;
    helpText?: string;
    iconEl?: ReactElement | null;
    badgeIconEl?: ReactElement | null;
    rawData?: T;
};
export type SelectFieldOptionProps<T> = {
    label: string;
    value: string | number;
    classes?: string;
    helpText?: string;
    iconEl?: ReactElement | null;
    badgeIconEl?: ReactElement | null;
    rawData?: T;
    selected?: boolean;
    disabled?: boolean;
    onSelect: (option: SelectOptionType<T>) => void;
};
declare function SingleSelectOption<T>({ label, value, classes, helpText, iconEl, badgeIconEl, rawData, selected, onSelect, }: SelectFieldOptionProps<T>): JSX.Element;
declare const _default: typeof SingleSelectOption;
export default _default;
