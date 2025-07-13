import MaskedNumber from "imask/masked/number";
import MaskedRegExp from "imask/masked/regexp";

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
