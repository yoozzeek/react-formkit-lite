import MaskedDynamic, { type MaskedDynamicOptions } from "imask/masked/dynamic";
import "imask/masked/pattern";

interface PhoneNumberMask extends MaskedDynamicOptions {
  startsWith: string;
  lazy: boolean;
  country: string;
}

const phoneNumberMasks: Array<PhoneNumberMask> = [
  {
    mask: ["+0 000 000-0000"],
    startsWith: "1",
    lazy: true,
    country: "United States",
  },
  {
    mask: ["+00 {21} 0-000-0000"],
    startsWith: "30",
    lazy: true,
    country: "Greece",
  },
  {
    mask: ["+0 000 000-00-00"],
    startsWith: "7",
    lazy: true,
    country: "Russia",
  },
  {
    mask: ["+00-0000-000000"],
    startsWith: "91",
    lazy: true,
    country: "India",
  },
  {
    mask: ["+00 000 000-0000"],
    startsWith: "63",
    lazy: true,
    country: "Philippines",
  },
  {
    mask: ["+00 000-000000[0]"],
    startsWith: "84",
    lazy: true,
    country: "Vietnam",
  },
  {
    mask: ["+00-000-0000-0000"],
    startsWith: "62",
    lazy: true,
    country: "Indonesia",
  },
  {
    mask: ["00000000000"],
    startsWith: "",
    country: "unknown",
    lazy: true,
  },
];

export const phoneNumberWithCodeMask = new MaskedDynamic<PhoneNumberMask>({
  mask: phoneNumberMasks,
  dispatch: function (appended, dynamicMasked) {
    const value = (dynamicMasked.value + appended).replace(/\D/g, "");
    return dynamicMasked.compiledMasks.find((m) => {
      // eslint-disable-next-line
      // @ts-expect-error
      return value.indexOf(m.startsWith) === 0;
    });
  },
});
