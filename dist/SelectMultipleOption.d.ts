import { JSX } from 'react';
import { SelectFieldOptionProps } from './SelectOption.tsx';
declare function MultipleSelectOption<T, V>({ label, value, classes, helpText, iconEl, badgeIconEl, rawData, disabled, selected, onSelect, }: SelectFieldOptionProps<T, V>): JSX.Element;
export default MultipleSelectOption;
