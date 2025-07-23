import MaskedDate from "imask/masked/date";
import MaskedRange from "imask/masked/range";
import type { DateValue } from "imask/masked/date";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";

export const DEFAULT_DATE_FORMAT = "MM-dd-yyyy";

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
