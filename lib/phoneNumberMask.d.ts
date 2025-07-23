import { default as MaskedDynamic } from 'imask/masked/dynamic';
interface PhoneNumberMask {
    mask: string;
    startsWith: string;
    lazy: boolean;
    country: string;
}
export declare const phoneNumberWithCodeMask: MaskedDynamic<PhoneNumberMask>;
export {};
