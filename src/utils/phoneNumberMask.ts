import MaskedDynamic from "imask/masked/dynamic";
import "imask/masked/pattern";

interface PhoneNumberMask {
  mask: string;
  startsWith: string;
  lazy: boolean;
  country: string;
}

const phoneNumberMasks = [
  {
    mask: "+0 000 000-0000",
    startsWith: "1",
    lazy: false,
    country: "United States",
  },
  {
    mask: "+00 {21} 0-000-0000",
    startsWith: "30",
    lazy: false,
    country: "Greece",
  },
  {
    mask: "+0 000 000-00-00",
    startsWith: "7",
    lazy: false,
    country: "Russia",
  },
  {
    mask: "+00-0000-000000",
    startsWith: "91",
    lazy: false,
    country: "India",
  },
  {
    mask: "+00 000 000-0000",
    startsWith: "63",
    lazy: false,
    country: "Philippines",
  },
  {
    mask: "+00 000-000000[0]",
    startsWith: "84",
    lazy: false,
    country: "Vietnam",
  },
  {
    mask: "+00-000-0000-0000",
    startsWith: "62",
    lazy: false,
    country: "Indonesia",
  },
  {
    mask: "00000000000",
    startsWith: "",
    country: "unknown",
    lazy: false,
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
