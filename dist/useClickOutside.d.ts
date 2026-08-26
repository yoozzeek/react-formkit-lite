import { Dispatch, RefObject, SetStateAction } from 'react';
declare function useClickOutside(ref: RefObject<HTMLElement>, initialState?: boolean, manualAutoOpening?: boolean, disabled?: boolean, portalRef?: RefObject<HTMLElement | null>): [boolean, Dispatch<SetStateAction<boolean>>];
export default useClickOutside;
