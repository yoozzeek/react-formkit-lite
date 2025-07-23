import { FC, ReactElement } from 'react';
import { Variant } from './types';
declare const UploadArea: FC<{
    title?: string | null;
    description?: string | null;
    icon?: ReactElement;
    accept?: string;
    variant?: Variant;
    onSelectFile: (files: FileList | null) => void;
}>;
export default UploadArea;
