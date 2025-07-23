import { ReactElement, ReactNode } from 'react';
import { Variant } from './types';
export type HeaderActionType = {
    label?: string | null;
    icon?: ReactElement;
    primary?: boolean;
    disabled?: boolean;
    onClick?: () => void;
};
type HeaderProps = {
    title?: string | ReactElement | null;
    fixed?: boolean;
    children?: ReactNode;
    serifTitle?: boolean;
    titleH1?: boolean;
    variant?: Variant;
    transparent?: boolean;
    transparentCover?: boolean;
    scrollDelta?: number;
    autoThemeColorDisabled?: boolean;
    classes?: string;
    parentIsModal?: boolean;
    goBackLabel?: string;
    action?: HeaderActionType;
    onGoBack?: () => void;
};
declare function Header({ title, goBackLabel, onGoBack, serifTitle, fixed, titleH1, transparent, transparentCover, parentIsModal, scrollDelta, variant, action, classes, children, }: HeaderProps): import("react/jsx-runtime").JSX.Element;
export default Header;
