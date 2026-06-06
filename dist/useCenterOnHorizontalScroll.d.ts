import { MouseEventHandler } from 'react';
export type CenterOnHorizontalScrollOptions = {
    container?: HTMLElement | null;
};
export declare function useCenterOnHorizontalScroll(options?: CenterOnHorizontalScrollOptions): MouseEventHandler<HTMLElement>;
