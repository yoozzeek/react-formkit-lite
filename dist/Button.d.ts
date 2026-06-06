import { MouseEvent, ReactNode, JSX } from 'react';
import { Size } from './types';
type ButtonTypes = "button" | "submit" | "reset";
interface ButtonProps {
    children: ReactNode;
    type?: ButtonTypes;
    variant?: "light" | "dark" | "outline-light" | "outline-green" | "outline-warning" | "success" | "danger" | "warning" | "gray" | "none";
    size?: Size | "icon";
    loading?: boolean;
    loadingText?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
declare function Button({ fullWidth, type, size, disabled, loading, loadingText, variant, onClick, children, }: ButtonProps): JSX.Element;
export default Button;
