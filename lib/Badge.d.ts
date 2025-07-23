import { ReactElement, ReactNode, JSX } from 'react';
import { Variant } from './types';
declare function Badge({ id, icon, variant, onClick, onRemove, selected, children, }: {
    id?: string;
    children: ReactNode;
    icon?: ReactElement | null;
    variant?: Variant;
    selected?: boolean;
    onClick?: (id: string) => void;
    onRemove?: (id: string) => void;
}): JSX.Element;
export default Badge;
