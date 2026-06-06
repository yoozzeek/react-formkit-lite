import { UploadedFileItem } from './types';
declare const UploadMultipleFilesItem: (props: {
    mediaItem: UploadedFileItem;
    selected?: boolean;
    onSelect?: (file: UploadedFileItem) => void;
}) => import("react").JSX.Element;
export default UploadMultipleFilesItem;
