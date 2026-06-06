import { UploadedFileItem } from './types';
type UploadMultipleFilesProps = {
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
declare const UploadMultipleFiles: ({ max, label, helpText, name, files, interactiveMode, disabled, loading, onFilesAdded, onFilesRemoved, }: UploadMultipleFilesProps) => import("react").JSX.Element;
export default UploadMultipleFiles;
