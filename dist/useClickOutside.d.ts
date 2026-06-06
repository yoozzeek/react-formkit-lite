import { Dispatch, RefObject, SetStateAction } from 'react';
declare function useClickOutside(ref: RefObject<HTMLElement>, initialState?: boolean, manualAutoOpening?: boolean, disabled?: boolean): [boolean, Dispatch<SetStateAction<boolean>>];
export default useClickOutside;
