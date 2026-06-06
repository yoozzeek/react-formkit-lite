import { default as MaskedDynamic, MaskedDynamicOptions } from 'imask/masked/dynamic';
interface PhoneNumberMask extends MaskedDynamicOptions {
    startsWith: string;
    lazy: boolean;
    country: string;
}
export declare const phoneNumberWithCodeMask: MaskedDynamic<PhoneNumberMask>;
export {};
