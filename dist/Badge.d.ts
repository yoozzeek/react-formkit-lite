import { ReactElement, ReactNode, JSX } from 'react';
import { Variant } from './types';
declare function Badge<T = string>({ id, icon, variant, onClick, onRemove, selected, children, }: {
    id?: T;
    children: ReactNode;
    icon?: ReactElement | null;
    variant?: Variant;
    selected?: boolean;
    onClick?: (id: T) => void;
    onRemove?: (id: T) => void;
}): JSX.Element;
export default Badge;
