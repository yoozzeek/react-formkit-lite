import MaskedNumber from "imask/masked/number";
import MaskedRange from "imask/masked/range";
import MaskedDynamic from "imask/masked/dynamic";
import MaskedRegExp from "imask/masked/regexp";
import MaskedDate from "imask/masked/date";
import type { DateValue } from "imask/masked/date";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";

export const DEFAULT_DATE_FORMAT = "MM-dd-yyyy";

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

export const phoneNumberWithCodeMask = new MaskedDynamic<string>({
  mask: phoneNumberMasks,
  dispatch: function (appended, dynamicMasked) {
    const value = (dynamicMasked.value + appended).replace(/\D/g, "");
    return dynamicMasked.compiledMasks.find((m) => value.indexOf(m["startsWith"]) === 0);
  },
});

export const dateMask = new MaskedDate({
  mask: Date,
  pattern: DEFAULT_DATE_FORMAT,
  blocks: {
    dd: {
      mask: MaskedRange,
      from: 1,
      to: 31,
      placeholderChar: "D",
    },
    MM: {
      mask: MaskedRange,
      from: 1,
      to: 12,
      placeholderChar: "M",
    },
    yyyy: {
      mask: MaskedRange,
      from: 1900,
      to: 2030,
      placeholderChar: "Y",
    },
  },

  format: (value: DateValue): string => format(value as Date, DEFAULT_DATE_FORMAT),
  parse: (str: string): Date => parse(str, DEFAULT_DATE_FORMAT, new Date()),

  // optional interval options
  min: new Date(1900, 0, 1),
  max: new Date(2030, 0, 1),

  autofix: true,
  lazy: false,
  overwrite: true,
});

export const moneyAmountMask = new MaskedNumber({
  mask: Number, // enable number mask

  // other options are optional with defaults below
  scale: 2, // digits after point, 0 for integers
  // signed: false, // disallow negative
  thousandsSeparator: "", // any single char
  padFractionalZeros: true, // if true, then pads zeros at end to the length of scale
  normalizeZeros: true, // appends or removes zeros at ends
  radix: ".", // fractional delimiter
  mapToRadix: [".", ","], // symbols to process as radix

  // additional number interval options (e.g.)
  min: 0,
  max: 999999999,
});

export const tokensAmountMask = new MaskedNumber({
  mask: Number, // enable number mask

  // other options are optional with defaults below
  scale: 6, // digits after point, 0 for integers
  // signed: false, // disallow negative
  thousandsSeparator: "", // any single char
  padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
  normalizeZeros: true, // appends or removes zeros at ends
  radix: ".", // fractional delimiter
  mapToRadix: [".", ","], // symbols to process as radix

  // additional number interval options (e.g.)
  min: 0,
  max: 999999999,
});

export const lowercaseMask = new MaskedRegExp({
  mask: /^([a-zA-Z]|\d|_)+$/,
  autofix: true,
  overwrite: true,
  prepare: (value: string) => value.toLowerCase(),
});
