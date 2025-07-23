import { UploadedFileItem } from './types';
type MultipleFilesFieldProps = {
    max?: number;
    label?: string | null;
    name?: string;
    helpText?: string | null;
    files: UploadedFileItem[];
    loading?: boolean;
    interactiveMode?: boolean;
    disabled?: boolean;
    onFilesAdded: (file: File[]) => void;
    onFilesRemoved: (ids: string[]) => void;
};
declare const MultipleFilesField: ({ max, label, helpText, name, files, interactiveMode, disabled, loading, onFilesAdded, onFilesRemoved, }: MultipleFilesFieldProps) => import("react/jsx-runtime").JSX.Element;
export default MultipleFilesField;
