import { CSSProperties, RefObject } from 'react';
import { Position } from '../types';
declare function useAnchoredDropdown(anchorRef: RefObject<HTMLElement>, position: Position, minWidth: number | undefined, enabled: boolean): CSSProperties | null;
export default useAnchoredDropdown;
