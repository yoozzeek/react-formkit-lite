import { M as G } from "./chunks/pattern.KyQgdgMN.js";
import { I as st, C as xt, i as J } from "./chunks/regexp.BA-GGPSE.js";
class _ extends G {
  /**
    Optionally sets max length of pattern.
    Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
  */
  /** Min bound */
  /** Max bound */
  get _matchFrom() {
    return this.maxLength - String(this.from).length;
  }
  constructor(t) {
    super(t);
  }
  updateOptions(t) {
    super.updateOptions(t);
  }
  _update(t) {
    const {
      to: e = this.to || 0,
      from: n = this.from || 0,
      maxLength: a = this.maxLength || 0,
      autofix: s = this.autofix,
      ...o
    } = t;
    this.to = e, this.from = n, this.maxLength = Math.max(String(e).length, a), this.autofix = s;
    const i = String(this.from).padStart(this.maxLength, "0"), y = String(this.to).padStart(this.maxLength, "0");
    let l = 0;
    for (; l < y.length && y[l] === i[l]; ) ++l;
    o.mask = y.slice(0, l).replace(/0/g, "\\0") + "0".repeat(this.maxLength - l), super._update(o);
  }
  get isComplete() {
    return super.isComplete && !!this.value;
  }
  boundaries(t) {
    let e = "", n = "";
    const [, a, s] = t.match(/^(\D*)(\d*)(\D*)/) || [];
    return s && (e = "0".repeat(a.length) + s, n = "9".repeat(a.length) + s), e = e.padEnd(this.maxLength, "0"), n = n.padEnd(this.maxLength, "9"), [e, n];
  }
  doPrepareChar(t, e) {
    e === void 0 && (e = {});
    let n;
    return [t, n] = super.doPrepareChar(t.replace(/\D/g, ""), e), t || (n.skip = !this.isComplete), [t, n];
  }
  _appendCharRaw(t, e) {
    if (e === void 0 && (e = {}), !this.autofix || this.value.length + 1 > this.maxLength) return super._appendCharRaw(t, e);
    const n = String(this.from).padStart(this.maxLength, "0"), a = String(this.to).padStart(this.maxLength, "0"), [s, o] = this.boundaries(this.value + t);
    return Number(o) < this.from ? super._appendCharRaw(n[this.value.length], e) : Number(s) > this.to ? !e.tail && this.autofix === "pad" && this.value.length + 1 < this.maxLength ? super._appendCharRaw(n[this.value.length], e).aggregate(this._appendCharRaw(t, e)) : super._appendCharRaw(a[this.value.length], e) : super._appendCharRaw(t, e);
  }
  doValidate(t) {
    const e = this.value;
    if (e.search(/[^0]/) === -1 && e.length <= this._matchFrom) return !0;
    const [a, s] = this.boundaries(e);
    return this.from <= Number(s) && Number(a) <= this.to && super.doValidate(t);
  }
  pad(t) {
    const e = new xt();
    if (this.value.length === this.maxLength) return e;
    const n = this.value, a = this.maxLength - this.value.length;
    if (a) {
      this.reset();
      for (let s = 0; s < a; ++s)
        e.aggregate(super._appendCharRaw("0", t));
      n.split("").forEach((s) => this._appendCharRaw(s));
    }
    return e;
  }
}
st.MaskedRange = _;
const Dt = "d{.}`m{.}`Y";
class k extends G {
  static extractPatternOptions(t) {
    const {
      mask: e,
      pattern: n,
      ...a
    } = t;
    return {
      ...a,
      mask: J(e) ? e : n
    };
  }
  /** Pattern mask for date according to {@link MaskedDate#format} */
  /** Start date */
  /** End date */
  /** Format typed value to string */
  /** Parse string to get typed value */
  constructor(t) {
    super(k.extractPatternOptions({
      ...k.DEFAULTS,
      ...t
    }));
  }
  updateOptions(t) {
    super.updateOptions(t);
  }
  _update(t) {
    const {
      mask: e,
      pattern: n,
      blocks: a,
      ...s
    } = {
      ...k.DEFAULTS,
      ...t
    }, o = Object.assign({}, k.GET_DEFAULT_BLOCKS());
    t.min && (o.Y.from = t.min.getFullYear()), t.max && (o.Y.to = t.max.getFullYear()), t.min && t.max && o.Y.from === o.Y.to && (o.m.from = t.min.getMonth() + 1, o.m.to = t.max.getMonth() + 1, o.m.from === o.m.to && (o.d.from = t.min.getDate(), o.d.to = t.max.getDate())), Object.assign(o, this.blocks, a), super._update({
      ...s,
      mask: J(e) ? e : n,
      blocks: o
    });
  }
  doValidate(t) {
    const e = this.date;
    return super.doValidate(t) && (!this.isComplete || this.isDateExist(this.value) && e != null && (this.min == null || this.min <= e) && (this.max == null || e <= this.max));
  }
  /** Checks if date is exists */
  isDateExist(t) {
    return this.format(this.parse(t, this), this).indexOf(t) >= 0;
  }
  /** Parsed Date */
  get date() {
    return this.typedValue;
  }
  set date(t) {
    this.typedValue = t;
  }
  get typedValue() {
    return this.isComplete ? super.typedValue : null;
  }
  set typedValue(t) {
    super.typedValue = t;
  }
  maskEquals(t) {
    return t === Date || super.maskEquals(t);
  }
  optionsIsChanged(t) {
    return super.optionsIsChanged(k.extractPatternOptions(t));
  }
}
k.GET_DEFAULT_BLOCKS = () => ({
  d: {
    mask: _,
    from: 1,
    to: 31,
    maxLength: 2
  },
  m: {
    mask: _,
    from: 1,
    to: 12,
    maxLength: 2
  },
  Y: {
    mask: _,
    from: 1900,
    to: 9999
  }
});
k.DEFAULTS = {
  ...G.DEFAULTS,
  mask: Date,
  pattern: Dt,
  format: (r, t) => {
    if (!r) return "";
    const e = String(r.getDate()).padStart(2, "0"), n = String(r.getMonth() + 1).padStart(2, "0"), a = r.getFullYear();
    return [e, n, a].join(".");
  },
  parse: (r, t) => {
    const [e, n, a] = r.split(".").map(Number);
    return new Date(a, n - 1, e);
  }
};
st.MaskedDate = k;
const Pt = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, kt = (r, t, e) => {
  let n;
  const a = Pt[r];
  return typeof a == "string" ? n = a : t === 1 ? n = a.one : n = a.other.replace("{{count}}", t.toString()), e?.addSuffix ? e.comparison && e.comparison > 0 ? "in " + n : n + " ago" : n;
};
function Q(r) {
  return (t = {}) => {
    const e = t.width ? String(t.width) : r.defaultWidth;
    return r.formats[e] || r.formats[r.defaultWidth];
  };
}
const Mt = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Tt = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Ot = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Yt = {
  date: Q({
    formats: Mt,
    defaultWidth: "full"
  }),
  time: Q({
    formats: Tt,
    defaultWidth: "full"
  }),
  dateTime: Q({
    formats: Ot,
    defaultWidth: "full"
  })
}, vt = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Et = (r, t, e, n) => vt[r];
function N(r) {
  return (t, e) => {
    const n = e?.context ? String(e.context) : "standalone";
    let a;
    if (n === "formatting" && r.formattingValues) {
      const o = r.defaultFormattingWidth || r.defaultWidth, i = e?.width ? String(e.width) : o;
      a = r.formattingValues[i] || r.formattingValues[o];
    } else {
      const o = r.defaultWidth, i = e?.width ? String(e.width) : r.defaultWidth;
      a = r.values[i] || r.values[o];
    }
    const s = r.argumentCallback ? r.argumentCallback(t) : t;
    return a[s];
  };
}
const _t = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Wt = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Lt = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, Ct = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, qt = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, Nt = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, Ht = (r, t) => {
  const e = Number(r), n = e % 100;
  if (n > 20 || n < 10)
    switch (n % 10) {
      case 1:
        return e + "st";
      case 2:
        return e + "nd";
      case 3:
        return e + "rd";
    }
  return e + "th";
}, Ft = {
  ordinalNumber: Ht,
  era: N({
    values: _t,
    defaultWidth: "wide"
  }),
  quarter: N({
    values: Wt,
    defaultWidth: "wide",
    argumentCallback: (r) => r - 1
  }),
  month: N({
    values: Lt,
    defaultWidth: "wide"
  }),
  day: N({
    values: Ct,
    defaultWidth: "wide"
  }),
  dayPeriod: N({
    values: qt,
    defaultWidth: "wide",
    formattingValues: Nt,
    defaultFormattingWidth: "wide"
  })
};
function H(r) {
  return (t, e = {}) => {
    const n = e.width, a = n && r.matchPatterns[n] || r.matchPatterns[r.defaultMatchWidth], s = t.match(a);
    if (!s)
      return null;
    const o = s[0], i = n && r.parsePatterns[n] || r.parsePatterns[r.defaultParseWidth], y = Array.isArray(i) ? Rt(i, (b) => b.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      It(i, (b) => b.test(o))
    );
    let l;
    l = r.valueCallback ? r.valueCallback(y) : y, l = e.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      e.valueCallback(l)
    ) : l;
    const w = t.slice(o.length);
    return { value: l, rest: w };
  };
}
function It(r, t) {
  for (const e in r)
    if (Object.prototype.hasOwnProperty.call(r, e) && t(r[e]))
      return e;
}
function Rt(r, t) {
  for (let e = 0; e < r.length; e++)
    if (t(r[e]))
      return e;
}
function Qt(r) {
  return (t, e = {}) => {
    const n = t.match(r.matchPattern);
    if (!n) return null;
    const a = n[0], s = t.match(r.parsePattern);
    if (!s) return null;
    let o = r.valueCallback ? r.valueCallback(s[0]) : s[0];
    o = e.valueCallback ? e.valueCallback(o) : o;
    const i = t.slice(a.length);
    return { value: o, rest: i };
  };
}
const Bt = /^(\d+)(th|st|nd|rd)?/i, Xt = /\d+/i, At = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Gt = {
  any: [/^b/i, /^(a|c)/i]
}, Vt = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, jt = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, $t = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, zt = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, Ut = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Zt = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Kt = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Jt = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, St = {
  ordinalNumber: Qt({
    matchPattern: Bt,
    parsePattern: Xt,
    valueCallback: (r) => parseInt(r, 10)
  }),
  era: H({
    matchPatterns: At,
    defaultMatchWidth: "wide",
    parsePatterns: Gt,
    defaultParseWidth: "any"
  }),
  quarter: H({
    matchPatterns: Vt,
    defaultMatchWidth: "wide",
    parsePatterns: jt,
    defaultParseWidth: "any",
    valueCallback: (r) => r + 1
  }),
  month: H({
    matchPatterns: $t,
    defaultMatchWidth: "wide",
    parsePatterns: zt,
    defaultParseWidth: "any"
  }),
  day: H({
    matchPatterns: Ut,
    defaultMatchWidth: "wide",
    parsePatterns: Zt,
    defaultParseWidth: "any"
  }),
  dayPeriod: H({
    matchPatterns: Kt,
    defaultMatchWidth: "any",
    parsePatterns: Jt,
    defaultParseWidth: "any"
  })
}, ot = {
  code: "en-US",
  formatDistance: kt,
  formatLong: Yt,
  formatRelative: Et,
  localize: Ft,
  match: St,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
let te = {};
function q() {
  return te;
}
const it = 6048e5, ee = 864e5, ne = 6e4, re = 36e5, ae = 1e3, S = Symbol.for("constructDateFrom");
function D(r, t) {
  return typeof r == "function" ? r(t) : r && typeof r == "object" && S in r ? r[S](t) : r instanceof Date ? new r.constructor(t) : new Date(t);
}
function x(r, t) {
  return D(t || r, r);
}
function F(r) {
  const t = x(r), e = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return e.setUTCFullYear(t.getFullYear()), +r - +e;
}
function se(r, ...t) {
  const e = D.bind(
    null,
    t.find((n) => typeof n == "object")
  );
  return t.map(e);
}
function tt(r, t) {
  const e = x(r, t?.in);
  return e.setHours(0, 0, 0, 0), e;
}
function oe(r, t, e) {
  const [n, a] = se(
    e?.in,
    r,
    t
  ), s = tt(n), o = tt(a), i = +s - F(s), y = +o - F(o);
  return Math.round((i - y) / ee);
}
function ie(r, t) {
  const e = x(r, t?.in);
  return e.setFullYear(e.getFullYear(), 0, 1), e.setHours(0, 0, 0, 0), e;
}
function ue(r, t) {
  const e = x(r, t?.in);
  return oe(e, ie(e)) + 1;
}
function Y(r, t) {
  const e = q(), n = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? e.weekStartsOn ?? e.locale?.options?.weekStartsOn ?? 0, a = x(r, t?.in), s = a.getDay(), o = (s < n ? 7 : 0) + s - n;
  return a.setDate(a.getDate() - o), a.setHours(0, 0, 0, 0), a;
}
function C(r, t) {
  return Y(r, { ...t, weekStartsOn: 1 });
}
function ut(r, t) {
  const e = x(r, t?.in), n = e.getFullYear(), a = D(e, 0);
  a.setFullYear(n + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const s = C(a), o = D(e, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const i = C(o);
  return e.getTime() >= s.getTime() ? n + 1 : e.getTime() >= i.getTime() ? n : n - 1;
}
function ce(r, t) {
  const e = ut(r, t), n = D(r, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), C(n);
}
function ct(r, t) {
  const e = x(r, t?.in), n = +C(e) - +ce(e);
  return Math.round(n / it) + 1;
}
function V(r, t) {
  const e = x(r, t?.in), n = e.getFullYear(), a = q(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? a.firstWeekContainsDate ?? a.locale?.options?.firstWeekContainsDate ?? 1, o = D(t?.in || r, 0);
  o.setFullYear(n + 1, 0, s), o.setHours(0, 0, 0, 0);
  const i = Y(o, t), y = D(t?.in || r, 0);
  y.setFullYear(n, 0, s), y.setHours(0, 0, 0, 0);
  const l = Y(y, t);
  return +e >= +i ? n + 1 : +e >= +l ? n : n - 1;
}
function de(r, t) {
  const e = q(), n = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? e.firstWeekContainsDate ?? e.locale?.options?.firstWeekContainsDate ?? 1, a = V(r, t), s = D(t?.in || r, 0);
  return s.setFullYear(a, 0, n), s.setHours(0, 0, 0, 0), Y(s, t);
}
function dt(r, t) {
  const e = x(r, t?.in), n = +Y(e, t) - +de(e, t);
  return Math.round(n / it) + 1;
}
function d(r, t) {
  const e = r < 0 ? "-" : "", n = Math.abs(r).toString().padStart(t, "0");
  return e + n;
}
const O = {
  // Year
  y(r, t) {
    const e = r.getFullYear(), n = e > 0 ? e : 1 - e;
    return d(t === "yy" ? n % 100 : n, t.length);
  },
  // Month
  M(r, t) {
    const e = r.getMonth();
    return t === "M" ? String(e + 1) : d(e + 1, 2);
  },
  // Day of the month
  d(r, t) {
    return d(r.getDate(), t.length);
  },
  // AM or PM
  a(r, t) {
    const e = r.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return e.toUpperCase();
      case "aaa":
        return e;
      case "aaaaa":
        return e[0];
      case "aaaa":
      default:
        return e === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(r, t) {
    return d(r.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(r, t) {
    return d(r.getHours(), t.length);
  },
  // Minute
  m(r, t) {
    return d(r.getMinutes(), t.length);
  },
  // Second
  s(r, t) {
    return d(r.getSeconds(), t.length);
  },
  // Fraction of second
  S(r, t) {
    const e = t.length, n = r.getMilliseconds(), a = Math.trunc(
      n * Math.pow(10, e - 3)
    );
    return d(a, t.length);
  }
}, L = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, et = {
  // Era
  G: function(r, t, e) {
    const n = r.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return e.era(n, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return e.era(n, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return e.era(n, { width: "wide" });
    }
  },
  // Year
  y: function(r, t, e) {
    if (t === "yo") {
      const n = r.getFullYear(), a = n > 0 ? n : 1 - n;
      return e.ordinalNumber(a, { unit: "year" });
    }
    return O.y(r, t);
  },
  // Local week-numbering year
  Y: function(r, t, e, n) {
    const a = V(r, n), s = a > 0 ? a : 1 - a;
    if (t === "YY") {
      const o = s % 100;
      return d(o, 2);
    }
    return t === "Yo" ? e.ordinalNumber(s, { unit: "year" }) : d(s, t.length);
  },
  // ISO week-numbering year
  R: function(r, t) {
    const e = ut(r);
    return d(e, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(r, t) {
    const e = r.getFullYear();
    return d(e, t.length);
  },
  // Quarter
  Q: function(r, t, e) {
    const n = Math.ceil((r.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "Q":
        return String(n);
      // 01, 02, 03, 04
      case "QQ":
        return d(n, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return e.ordinalNumber(n, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return e.quarter(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return e.quarter(n, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return e.quarter(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(r, t, e) {
    const n = Math.ceil((r.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "q":
        return String(n);
      // 01, 02, 03, 04
      case "qq":
        return d(n, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return e.ordinalNumber(n, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return e.quarter(n, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return e.quarter(n, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return e.quarter(n, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(r, t, e) {
    const n = r.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return O.M(r, t);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return e.ordinalNumber(n + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return e.month(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return e.month(n, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return e.month(n, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(r, t, e) {
    const n = r.getMonth();
    switch (t) {
      // 1, 2, ..., 12
      case "L":
        return String(n + 1);
      // 01, 02, ..., 12
      case "LL":
        return d(n + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return e.ordinalNumber(n + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return e.month(n, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return e.month(n, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return e.month(n, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(r, t, e, n) {
    const a = dt(r, n);
    return t === "wo" ? e.ordinalNumber(a, { unit: "week" }) : d(a, t.length);
  },
  // ISO week of year
  I: function(r, t, e) {
    const n = ct(r);
    return t === "Io" ? e.ordinalNumber(n, { unit: "week" }) : d(n, t.length);
  },
  // Day of the month
  d: function(r, t, e) {
    return t === "do" ? e.ordinalNumber(r.getDate(), { unit: "date" }) : O.d(r, t);
  },
  // Day of year
  D: function(r, t, e) {
    const n = ue(r);
    return t === "Do" ? e.ordinalNumber(n, { unit: "dayOfYear" }) : d(n, t.length);
  },
  // Day of week
  E: function(r, t, e) {
    const n = r.getDay();
    switch (t) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return e.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return e.day(n, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return e.day(n, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return e.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(r, t, e, n) {
    const a = r.getDay(), s = (a - n.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(s);
      // Padded numerical value
      case "ee":
        return d(s, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return e.ordinalNumber(s, { unit: "day" });
      case "eee":
        return e.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return e.day(a, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return e.day(a, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return e.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(r, t, e, n) {
    const a = r.getDay(), s = (a - n.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (same as in `e`)
      case "c":
        return String(s);
      // Padded numerical value
      case "cc":
        return d(s, t.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return e.ordinalNumber(s, { unit: "day" });
      case "ccc":
        return e.day(a, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return e.day(a, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return e.day(a, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return e.day(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(r, t, e) {
    const n = r.getDay(), a = n === 0 ? 7 : n;
    switch (t) {
      // 2
      case "i":
        return String(a);
      // 02
      case "ii":
        return d(a, t.length);
      // 2nd
      case "io":
        return e.ordinalNumber(a, { unit: "day" });
      // Tue
      case "iii":
        return e.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return e.day(n, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return e.day(n, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return e.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(r, t, e) {
    const a = r.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return e.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return e.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return e.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return e.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(r, t, e) {
    const n = r.getHours();
    let a;
    switch (n === 12 ? a = L.noon : n === 0 ? a = L.midnight : a = n / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return e.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return e.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return e.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return e.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(r, t, e) {
    const n = r.getHours();
    let a;
    switch (n >= 17 ? a = L.evening : n >= 12 ? a = L.afternoon : n >= 4 ? a = L.morning : a = L.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return e.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return e.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return e.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(r, t, e) {
    if (t === "ho") {
      let n = r.getHours() % 12;
      return n === 0 && (n = 12), e.ordinalNumber(n, { unit: "hour" });
    }
    return O.h(r, t);
  },
  // Hour [0-23]
  H: function(r, t, e) {
    return t === "Ho" ? e.ordinalNumber(r.getHours(), { unit: "hour" }) : O.H(r, t);
  },
  // Hour [0-11]
  K: function(r, t, e) {
    const n = r.getHours() % 12;
    return t === "Ko" ? e.ordinalNumber(n, { unit: "hour" }) : d(n, t.length);
  },
  // Hour [1-24]
  k: function(r, t, e) {
    let n = r.getHours();
    return n === 0 && (n = 24), t === "ko" ? e.ordinalNumber(n, { unit: "hour" }) : d(n, t.length);
  },
  // Minute
  m: function(r, t, e) {
    return t === "mo" ? e.ordinalNumber(r.getMinutes(), { unit: "minute" }) : O.m(r, t);
  },
  // Second
  s: function(r, t, e) {
    return t === "so" ? e.ordinalNumber(r.getSeconds(), { unit: "second" }) : O.s(r, t);
  },
  // Fraction of second
  S: function(r, t) {
    return O.S(r, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(r, t, e) {
    const n = r.getTimezoneOffset();
    if (n === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return rt(n);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return E(n);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return E(n, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(r, t, e) {
    const n = r.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return rt(n);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return E(n);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return E(n, ":");
    }
  },
  // Timezone (GMT)
  O: function(r, t, e) {
    const n = r.getTimezoneOffset();
    switch (t) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + nt(n, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + E(n, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(r, t, e) {
    const n = r.getTimezoneOffset();
    switch (t) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + nt(n, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + E(n, ":");
    }
  },
  // Seconds timestamp
  t: function(r, t, e) {
    const n = Math.trunc(+r / 1e3);
    return d(n, t.length);
  },
  // Milliseconds timestamp
  T: function(r, t, e) {
    return d(+r, t.length);
  }
};
function nt(r, t = "") {
  const e = r > 0 ? "-" : "+", n = Math.abs(r), a = Math.trunc(n / 60), s = n % 60;
  return s === 0 ? e + String(a) : e + String(a) + t + d(s, 2);
}
function rt(r, t) {
  return r % 60 === 0 ? (r > 0 ? "-" : "+") + d(Math.abs(r) / 60, 2) : E(r, t);
}
function E(r, t = "") {
  const e = r > 0 ? "-" : "+", n = Math.abs(r), a = d(Math.trunc(n / 60), 2), s = d(n % 60, 2);
  return e + a + t + s;
}
const at = (r, t) => {
  switch (r) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, lt = (r, t) => {
  switch (r) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, le = (r, t) => {
  const e = r.match(/(P+)(p+)?/) || [], n = e[1], a = e[2];
  if (!a)
    return at(r, t);
  let s;
  switch (n) {
    case "P":
      s = t.dateTime({ width: "short" });
      break;
    case "PP":
      s = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      s = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      s = t.dateTime({ width: "full" });
      break;
  }
  return s.replace("{{date}}", at(n, t)).replace("{{time}}", lt(a, t));
}, X = {
  p: lt,
  P: le
}, he = /^D+$/, fe = /^Y+$/, me = ["D", "DD", "YY", "YYYY"];
function ht(r) {
  return he.test(r);
}
function ft(r) {
  return fe.test(r);
}
function A(r, t, e) {
  const n = we(r, t, e);
  if (console.warn(n), me.includes(r)) throw new RangeError(n);
}
function we(r, t, e) {
  const n = r[0] === "Y" ? "years" : "days of the month";
  return `Use \`${r.toLowerCase()}\` instead of \`${r}\` (in \`${t}\`) for formatting ${n} to the input \`${e}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
function pe(r) {
  return r instanceof Date || typeof r == "object" && Object.prototype.toString.call(r) === "[object Date]";
}
function ge(r) {
  return !(!pe(r) && typeof r != "number" || isNaN(+x(r)));
}
const ye = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, be = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, xe = /^'([^]*?)'?$/, De = /''/g, Pe = /[a-zA-Z]/;
function ke(r, t, e) {
  const n = q(), a = n.locale ?? ot, s = n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = x(r, e?.in);
  if (!ge(i))
    throw new RangeError("Invalid time value");
  let y = t.match(be).map((w) => {
    const b = w[0];
    if (b === "p" || b === "P") {
      const v = X[b];
      return v(w, a.formatLong);
    }
    return w;
  }).join("").match(ye).map((w) => {
    if (w === "''")
      return { isToken: !1, value: "'" };
    const b = w[0];
    if (b === "'")
      return { isToken: !1, value: Me(w) };
    if (et[b])
      return { isToken: !0, value: w };
    if (b.match(Pe))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + b + "`"
      );
    return { isToken: !1, value: w };
  });
  a.localize.preprocessor && (y = a.localize.preprocessor(i, y));
  const l = {
    firstWeekContainsDate: s,
    weekStartsOn: o,
    locale: a
  };
  return y.map((w) => {
    if (!w.isToken) return w.value;
    const b = w.value;
    (ft(b) || ht(b)) && A(b, t, String(r));
    const v = et[b[0]];
    return v(i, b, a.localize, l);
  }).join("");
}
function Me(r) {
  const t = r.match(xe);
  return t ? t[1].replace(De, "'") : r;
}
function Te() {
  return Object.assign({}, q());
}
function Oe(r, t) {
  const e = Ye(t) ? new t(0) : D(t, 0);
  return e.setFullYear(r.getFullYear(), r.getMonth(), r.getDate()), e.setHours(
    r.getHours(),
    r.getMinutes(),
    r.getSeconds(),
    r.getMilliseconds()
  ), e;
}
function Ye(r) {
  return typeof r == "function" && r.prototype?.constructor === r;
}
const ve = 10;
class mt {
  subPriority = 0;
  validate(t, e) {
    return !0;
  }
}
class Ee extends mt {
  constructor(t, e, n, a, s) {
    super(), this.value = t, this.validateValue = e, this.setValue = n, this.priority = a, s && (this.subPriority = s);
  }
  validate(t, e) {
    return this.validateValue(t, this.value, e);
  }
  set(t, e, n) {
    return this.setValue(t, e, this.value, n);
  }
}
class _e extends mt {
  priority = ve;
  subPriority = -1;
  constructor(t, e) {
    super(), this.context = t || ((n) => D(e, n));
  }
  set(t, e) {
    return e.timestampIsSet ? t : D(t, Oe(t, this.context));
  }
}
class c {
  run(t, e, n, a) {
    const s = this.parse(t, e, n, a);
    return s ? {
      setter: new Ee(
        s.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority
      ),
      rest: s.rest
    } : null;
  }
  validate(t, e, n) {
    return !0;
  }
}
class We extends c {
  priority = 140;
  parse(t, e, n) {
    switch (e) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return n.era(t, { width: "abbreviated" }) || n.era(t, { width: "narrow" });
      // A, B
      case "GGGGG":
        return n.era(t, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return n.era(t, { width: "wide" }) || n.era(t, { width: "abbreviated" }) || n.era(t, { width: "narrow" });
    }
  }
  set(t, e, n) {
    return e.era = n, t.setFullYear(n, 0, 1), t.setHours(0, 0, 0, 0), t;
  }
  incompatibleTokens = ["R", "u", "t", "T"];
}
const p = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
}, M = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function g(r, t) {
  return r && {
    value: t(r.value),
    rest: r.rest
  };
}
function h(r, t) {
  const e = t.match(r);
  return e ? {
    value: parseInt(e[0], 10),
    rest: t.slice(e[0].length)
  } : null;
}
function T(r, t) {
  const e = t.match(r);
  if (!e)
    return null;
  if (e[0] === "Z")
    return {
      value: 0,
      rest: t.slice(1)
    };
  const n = e[1] === "+" ? 1 : -1, a = e[2] ? parseInt(e[2], 10) : 0, s = e[3] ? parseInt(e[3], 10) : 0, o = e[5] ? parseInt(e[5], 10) : 0;
  return {
    value: n * (a * re + s * ne + o * ae),
    rest: t.slice(e[0].length)
  };
}
function wt(r) {
  return h(p.anyDigitsSigned, r);
}
function m(r, t) {
  switch (r) {
    case 1:
      return h(p.singleDigit, t);
    case 2:
      return h(p.twoDigits, t);
    case 3:
      return h(p.threeDigits, t);
    case 4:
      return h(p.fourDigits, t);
    default:
      return h(new RegExp("^\\d{1," + r + "}"), t);
  }
}
function I(r, t) {
  switch (r) {
    case 1:
      return h(p.singleDigitSigned, t);
    case 2:
      return h(p.twoDigitsSigned, t);
    case 3:
      return h(p.threeDigitsSigned, t);
    case 4:
      return h(p.fourDigitsSigned, t);
    default:
      return h(new RegExp("^-?\\d{1," + r + "}"), t);
  }
}
function j(r) {
  switch (r) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function pt(r, t) {
  const e = t > 0, n = e ? t : 1 - t;
  let a;
  if (n <= 50)
    a = r || 100;
  else {
    const s = n + 50, o = Math.trunc(s / 100) * 100, i = r >= s % 100;
    a = r + o - (i ? 100 : 0);
  }
  return e ? a : 1 - a;
}
function gt(r) {
  return r % 400 === 0 || r % 4 === 0 && r % 100 !== 0;
}
class Le extends c {
  priority = 130;
  incompatibleTokens = ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"];
  parse(t, e, n) {
    const a = (s) => ({
      year: s,
      isTwoDigitYear: e === "yy"
    });
    switch (e) {
      case "y":
        return g(m(4, t), a);
      case "yo":
        return g(
          n.ordinalNumber(t, {
            unit: "year"
          }),
          a
        );
      default:
        return g(m(e.length, t), a);
    }
  }
  validate(t, e) {
    return e.isTwoDigitYear || e.year > 0;
  }
  set(t, e, n) {
    const a = t.getFullYear();
    if (n.isTwoDigitYear) {
      const o = pt(
        n.year,
        a
      );
      return t.setFullYear(o, 0, 1), t.setHours(0, 0, 0, 0), t;
    }
    const s = !("era" in e) || e.era === 1 ? n.year : 1 - n.year;
    return t.setFullYear(s, 0, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class Ce extends c {
  priority = 130;
  parse(t, e, n) {
    const a = (s) => ({
      year: s,
      isTwoDigitYear: e === "YY"
    });
    switch (e) {
      case "Y":
        return g(m(4, t), a);
      case "Yo":
        return g(
          n.ordinalNumber(t, {
            unit: "year"
          }),
          a
        );
      default:
        return g(m(e.length, t), a);
    }
  }
  validate(t, e) {
    return e.isTwoDigitYear || e.year > 0;
  }
  set(t, e, n, a) {
    const s = V(t, a);
    if (n.isTwoDigitYear) {
      const i = pt(
        n.year,
        s
      );
      return t.setFullYear(
        i,
        0,
        a.firstWeekContainsDate
      ), t.setHours(0, 0, 0, 0), Y(t, a);
    }
    const o = !("era" in e) || e.era === 1 ? n.year : 1 - n.year;
    return t.setFullYear(o, 0, a.firstWeekContainsDate), t.setHours(0, 0, 0, 0), Y(t, a);
  }
  incompatibleTokens = [
    "y",
    "R",
    "u",
    "Q",
    "q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "i",
    "t",
    "T"
  ];
}
class qe extends c {
  priority = 130;
  parse(t, e) {
    return I(e === "R" ? 4 : e.length, t);
  }
  set(t, e, n) {
    const a = D(t, 0);
    return a.setFullYear(n, 0, 4), a.setHours(0, 0, 0, 0), C(a);
  }
  incompatibleTokens = [
    "G",
    "y",
    "Y",
    "u",
    "Q",
    "q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "e",
    "c",
    "t",
    "T"
  ];
}
class Ne extends c {
  priority = 130;
  parse(t, e) {
    return I(e === "u" ? 4 : e.length, t);
  }
  set(t, e, n) {
    return t.setFullYear(n, 0, 1), t.setHours(0, 0, 0, 0), t;
  }
  incompatibleTokens = ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"];
}
class He extends c {
  priority = 120;
  parse(t, e, n) {
    switch (e) {
      // 1, 2, 3, 4
      case "Q":
      case "QQ":
        return m(e.length, t);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return n.ordinalNumber(t, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return n.quarter(t, {
          width: "abbreviated",
          context: "formatting"
        }) || n.quarter(t, {
          width: "narrow",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return n.quarter(t, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return n.quarter(t, {
          width: "wide",
          context: "formatting"
        }) || n.quarter(t, {
          width: "abbreviated",
          context: "formatting"
        }) || n.quarter(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  validate(t, e) {
    return e >= 1 && e <= 4;
  }
  set(t, e, n) {
    return t.setMonth((n - 1) * 3, 1), t.setHours(0, 0, 0, 0), t;
  }
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
}
class Fe extends c {
  priority = 120;
  parse(t, e, n) {
    switch (e) {
      // 1, 2, 3, 4
      case "q":
      case "qq":
        return m(e.length, t);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return n.ordinalNumber(t, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return n.quarter(t, {
          width: "abbreviated",
          context: "standalone"
        }) || n.quarter(t, {
          width: "narrow",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return n.quarter(t, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return n.quarter(t, {
          width: "wide",
          context: "standalone"
        }) || n.quarter(t, {
          width: "abbreviated",
          context: "standalone"
        }) || n.quarter(t, {
          width: "narrow",
          context: "standalone"
        });
    }
  }
  validate(t, e) {
    return e >= 1 && e <= 4;
  }
  set(t, e, n) {
    return t.setMonth((n - 1) * 3, 1), t.setHours(0, 0, 0, 0), t;
  }
  incompatibleTokens = [
    "Y",
    "R",
    "Q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
}
class Ie extends c {
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "L",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
  priority = 110;
  parse(t, e, n) {
    const a = (s) => s - 1;
    switch (e) {
      // 1, 2, ..., 12
      case "M":
        return g(
          h(p.month, t),
          a
        );
      // 01, 02, ..., 12
      case "MM":
        return g(m(2, t), a);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return g(
          n.ordinalNumber(t, {
            unit: "month"
          }),
          a
        );
      // Jan, Feb, ..., Dec
      case "MMM":
        return n.month(t, {
          width: "abbreviated",
          context: "formatting"
        }) || n.month(t, { width: "narrow", context: "formatting" });
      // J, F, ..., D
      case "MMMMM":
        return n.month(t, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return n.month(t, { width: "wide", context: "formatting" }) || n.month(t, {
          width: "abbreviated",
          context: "formatting"
        }) || n.month(t, { width: "narrow", context: "formatting" });
    }
  }
  validate(t, e) {
    return e >= 0 && e <= 11;
  }
  set(t, e, n) {
    return t.setMonth(n, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class Re extends c {
  priority = 110;
  parse(t, e, n) {
    const a = (s) => s - 1;
    switch (e) {
      // 1, 2, ..., 12
      case "L":
        return g(
          h(p.month, t),
          a
        );
      // 01, 02, ..., 12
      case "LL":
        return g(m(2, t), a);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return g(
          n.ordinalNumber(t, {
            unit: "month"
          }),
          a
        );
      // Jan, Feb, ..., Dec
      case "LLL":
        return n.month(t, {
          width: "abbreviated",
          context: "standalone"
        }) || n.month(t, { width: "narrow", context: "standalone" });
      // J, F, ..., D
      case "LLLLL":
        return n.month(t, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return n.month(t, { width: "wide", context: "standalone" }) || n.month(t, {
          width: "abbreviated",
          context: "standalone"
        }) || n.month(t, { width: "narrow", context: "standalone" });
    }
  }
  validate(t, e) {
    return e >= 0 && e <= 11;
  }
  set(t, e, n) {
    return t.setMonth(n, 1), t.setHours(0, 0, 0, 0), t;
  }
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "M",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
}
function Qe(r, t, e) {
  const n = x(r, e?.in), a = dt(n, e) - t;
  return n.setDate(n.getDate() - a * 7), x(n, e?.in);
}
class Be extends c {
  priority = 100;
  parse(t, e, n) {
    switch (e) {
      case "w":
        return h(p.week, t);
      case "wo":
        return n.ordinalNumber(t, { unit: "week" });
      default:
        return m(e.length, t);
    }
  }
  validate(t, e) {
    return e >= 1 && e <= 53;
  }
  set(t, e, n, a) {
    return Y(Qe(t, n, a), a);
  }
  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "i",
    "t",
    "T"
  ];
}
function Xe(r, t, e) {
  const n = x(r, e?.in), a = ct(n, e) - t;
  return n.setDate(n.getDate() - a * 7), n;
}
class Ae extends c {
  priority = 100;
  parse(t, e, n) {
    switch (e) {
      case "I":
        return h(p.week, t);
      case "Io":
        return n.ordinalNumber(t, { unit: "week" });
      default:
        return m(e.length, t);
    }
  }
  validate(t, e) {
    return e >= 1 && e <= 53;
  }
  set(t, e, n) {
    return C(Xe(t, n));
  }
  incompatibleTokens = [
    "y",
    "Y",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "e",
    "c",
    "t",
    "T"
  ];
}
const Ge = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Ve = [
  31,
  29,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];
class je extends c {
  priority = 90;
  subPriority = 1;
  parse(t, e, n) {
    switch (e) {
      case "d":
        return h(p.date, t);
      case "do":
        return n.ordinalNumber(t, { unit: "date" });
      default:
        return m(e.length, t);
    }
  }
  validate(t, e) {
    const n = t.getFullYear(), a = gt(n), s = t.getMonth();
    return a ? e >= 1 && e <= Ve[s] : e >= 1 && e <= Ge[s];
  }
  set(t, e, n) {
    return t.setDate(n), t.setHours(0, 0, 0, 0), t;
  }
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
}
class $e extends c {
  priority = 90;
  subpriority = 1;
  parse(t, e, n) {
    switch (e) {
      case "D":
      case "DD":
        return h(p.dayOfYear, t);
      case "Do":
        return n.ordinalNumber(t, { unit: "date" });
      default:
        return m(e.length, t);
    }
  }
  validate(t, e) {
    const n = t.getFullYear();
    return gt(n) ? e >= 1 && e <= 366 : e >= 1 && e <= 365;
  }
  set(t, e, n) {
    return t.setMonth(0, n), t.setHours(0, 0, 0, 0), t;
  }
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "E",
    "i",
    "e",
    "c",
    "t",
    "T"
  ];
}
function yt(r, t, e) {
  const n = x(r, e?.in);
  return isNaN(t) ? D(e?.in || r, NaN) : (t && n.setDate(n.getDate() + t), n);
}
function $(r, t, e) {
  const n = q(), a = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = x(r, e?.in), o = s.getDay(), y = (t % 7 + 7) % 7, l = 7 - a, w = t < 0 || t > 6 ? t - (o + l) % 7 : (y + l) % 7 - (o + l) % 7;
  return yt(s, w, e);
}
class ze extends c {
  priority = 90;
  parse(t, e, n) {
    switch (e) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return n.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || n.day(t, { width: "short", context: "formatting" }) || n.day(t, { width: "narrow", context: "formatting" });
      // T
      case "EEEEE":
        return n.day(t, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return n.day(t, { width: "short", context: "formatting" }) || n.day(t, { width: "narrow", context: "formatting" });
      // Tuesday
      case "EEEE":
      default:
        return n.day(t, { width: "wide", context: "formatting" }) || n.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || n.day(t, { width: "short", context: "formatting" }) || n.day(t, { width: "narrow", context: "formatting" });
    }
  }
  validate(t, e) {
    return e >= 0 && e <= 6;
  }
  set(t, e, n, a) {
    return t = $(t, n, a), t.setHours(0, 0, 0, 0), t;
  }
  incompatibleTokens = ["D", "i", "e", "c", "t", "T"];
}
class Ue extends c {
  priority = 90;
  parse(t, e, n, a) {
    const s = (o) => {
      const i = Math.floor((o - 1) / 7) * 7;
      return (o + a.weekStartsOn + 6) % 7 + i;
    };
    switch (e) {
      // 3
      case "e":
      case "ee":
        return g(m(e.length, t), s);
      // 3rd
      case "eo":
        return g(
          n.ordinalNumber(t, {
            unit: "day"
          }),
          s
        );
      // Tue
      case "eee":
        return n.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || n.day(t, { width: "short", context: "formatting" }) || n.day(t, { width: "narrow", context: "formatting" });
      // T
      case "eeeee":
        return n.day(t, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return n.day(t, { width: "short", context: "formatting" }) || n.day(t, { width: "narrow", context: "formatting" });
      // Tuesday
      case "eeee":
      default:
        return n.day(t, { width: "wide", context: "formatting" }) || n.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || n.day(t, { width: "short", context: "formatting" }) || n.day(t, { width: "narrow", context: "formatting" });
    }
  }
  validate(t, e) {
    return e >= 0 && e <= 6;
  }
  set(t, e, n, a) {
    return t = $(t, n, a), t.setHours(0, 0, 0, 0), t;
  }
  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "E",
    "i",
    "c",
    "t",
    "T"
  ];
}
class Ze extends c {
  priority = 90;
  parse(t, e, n, a) {
    const s = (o) => {
      const i = Math.floor((o - 1) / 7) * 7;
      return (o + a.weekStartsOn + 6) % 7 + i;
    };
    switch (e) {
      // 3
      case "c":
      case "cc":
        return g(m(e.length, t), s);
      // 3rd
      case "co":
        return g(
          n.ordinalNumber(t, {
            unit: "day"
          }),
          s
        );
      // Tue
      case "ccc":
        return n.day(t, {
          width: "abbreviated",
          context: "standalone"
        }) || n.day(t, { width: "short", context: "standalone" }) || n.day(t, { width: "narrow", context: "standalone" });
      // T
      case "ccccc":
        return n.day(t, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return n.day(t, { width: "short", context: "standalone" }) || n.day(t, { width: "narrow", context: "standalone" });
      // Tuesday
      case "cccc":
      default:
        return n.day(t, { width: "wide", context: "standalone" }) || n.day(t, {
          width: "abbreviated",
          context: "standalone"
        }) || n.day(t, { width: "short", context: "standalone" }) || n.day(t, { width: "narrow", context: "standalone" });
    }
  }
  validate(t, e) {
    return e >= 0 && e <= 6;
  }
  set(t, e, n, a) {
    return t = $(t, n, a), t.setHours(0, 0, 0, 0), t;
  }
  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "E",
    "i",
    "e",
    "t",
    "T"
  ];
}
function Ke(r, t) {
  const e = x(r, t?.in).getDay();
  return e === 0 ? 7 : e;
}
function Je(r, t, e) {
  const n = x(r, e?.in), a = Ke(n, e), s = t - a;
  return yt(n, s, e);
}
class Se extends c {
  priority = 90;
  parse(t, e, n) {
    const a = (s) => s === 0 ? 7 : s;
    switch (e) {
      // 2
      case "i":
      case "ii":
        return m(e.length, t);
      // 2nd
      case "io":
        return n.ordinalNumber(t, { unit: "day" });
      // Tue
      case "iii":
        return g(
          n.day(t, {
            width: "abbreviated",
            context: "formatting"
          }) || n.day(t, {
            width: "short",
            context: "formatting"
          }) || n.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          a
        );
      // T
      case "iiiii":
        return g(
          n.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          a
        );
      // Tu
      case "iiiiii":
        return g(
          n.day(t, {
            width: "short",
            context: "formatting"
          }) || n.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          a
        );
      // Tuesday
      case "iiii":
      default:
        return g(
          n.day(t, {
            width: "wide",
            context: "formatting"
          }) || n.day(t, {
            width: "abbreviated",
            context: "formatting"
          }) || n.day(t, {
            width: "short",
            context: "formatting"
          }) || n.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          a
        );
    }
  }
  validate(t, e) {
    return e >= 1 && e <= 7;
  }
  set(t, e, n) {
    return t = Je(t, n), t.setHours(0, 0, 0, 0), t;
  }
  incompatibleTokens = [
    "y",
    "Y",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "E",
    "e",
    "c",
    "t",
    "T"
  ];
}
class tn extends c {
  priority = 80;
  parse(t, e, n) {
    switch (e) {
      case "a":
      case "aa":
      case "aaa":
        return n.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || n.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaaa":
        return n.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(t, {
          width: "wide",
          context: "formatting"
        }) || n.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || n.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(t, e, n) {
    return t.setHours(j(n), 0, 0, 0), t;
  }
  incompatibleTokens = ["b", "B", "H", "k", "t", "T"];
}
class en extends c {
  priority = 80;
  parse(t, e, n) {
    switch (e) {
      case "b":
      case "bb":
      case "bbb":
        return n.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || n.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbbb":
        return n.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(t, {
          width: "wide",
          context: "formatting"
        }) || n.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || n.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(t, e, n) {
    return t.setHours(j(n), 0, 0, 0), t;
  }
  incompatibleTokens = ["a", "B", "H", "k", "t", "T"];
}
class nn extends c {
  priority = 80;
  parse(t, e, n) {
    switch (e) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || n.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(t, {
          width: "wide",
          context: "formatting"
        }) || n.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || n.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(t, e, n) {
    return t.setHours(j(n), 0, 0, 0), t;
  }
  incompatibleTokens = ["a", "b", "t", "T"];
}
class rn extends c {
  priority = 70;
  parse(t, e, n) {
    switch (e) {
      case "h":
        return h(p.hour12h, t);
      case "ho":
        return n.ordinalNumber(t, { unit: "hour" });
      default:
        return m(e.length, t);
    }
  }
  validate(t, e) {
    return e >= 1 && e <= 12;
  }
  set(t, e, n) {
    const a = t.getHours() >= 12;
    return a && n < 12 ? t.setHours(n + 12, 0, 0, 0) : !a && n === 12 ? t.setHours(0, 0, 0, 0) : t.setHours(n, 0, 0, 0), t;
  }
  incompatibleTokens = ["H", "K", "k", "t", "T"];
}
class an extends c {
  priority = 70;
  parse(t, e, n) {
    switch (e) {
      case "H":
        return h(p.hour23h, t);
      case "Ho":
        return n.ordinalNumber(t, { unit: "hour" });
      default:
        return m(e.length, t);
    }
  }
  validate(t, e) {
    return e >= 0 && e <= 23;
  }
  set(t, e, n) {
    return t.setHours(n, 0, 0, 0), t;
  }
  incompatibleTokens = ["a", "b", "h", "K", "k", "t", "T"];
}
class sn extends c {
  priority = 70;
  parse(t, e, n) {
    switch (e) {
      case "K":
        return h(p.hour11h, t);
      case "Ko":
        return n.ordinalNumber(t, { unit: "hour" });
      default:
        return m(e.length, t);
    }
  }
  validate(t, e) {
    return e >= 0 && e <= 11;
  }
  set(t, e, n) {
    return t.getHours() >= 12 && n < 12 ? t.setHours(n + 12, 0, 0, 0) : t.setHours(n, 0, 0, 0), t;
  }
  incompatibleTokens = ["h", "H", "k", "t", "T"];
}
class on extends c {
  priority = 70;
  parse(t, e, n) {
    switch (e) {
      case "k":
        return h(p.hour24h, t);
      case "ko":
        return n.ordinalNumber(t, { unit: "hour" });
      default:
        return m(e.length, t);
    }
  }
  validate(t, e) {
    return e >= 1 && e <= 24;
  }
  set(t, e, n) {
    const a = n <= 24 ? n % 24 : n;
    return t.setHours(a, 0, 0, 0), t;
  }
  incompatibleTokens = ["a", "b", "h", "H", "K", "t", "T"];
}
class un extends c {
  priority = 60;
  parse(t, e, n) {
    switch (e) {
      case "m":
        return h(p.minute, t);
      case "mo":
        return n.ordinalNumber(t, { unit: "minute" });
      default:
        return m(e.length, t);
    }
  }
  validate(t, e) {
    return e >= 0 && e <= 59;
  }
  set(t, e, n) {
    return t.setMinutes(n, 0, 0), t;
  }
  incompatibleTokens = ["t", "T"];
}
class cn extends c {
  priority = 50;
  parse(t, e, n) {
    switch (e) {
      case "s":
        return h(p.second, t);
      case "so":
        return n.ordinalNumber(t, { unit: "second" });
      default:
        return m(e.length, t);
    }
  }
  validate(t, e) {
    return e >= 0 && e <= 59;
  }
  set(t, e, n) {
    return t.setSeconds(n, 0), t;
  }
  incompatibleTokens = ["t", "T"];
}
class dn extends c {
  priority = 30;
  parse(t, e) {
    const n = (a) => Math.trunc(a * Math.pow(10, -e.length + 3));
    return g(m(e.length, t), n);
  }
  set(t, e, n) {
    return t.setMilliseconds(n), t;
  }
  incompatibleTokens = ["t", "T"];
}
class ln extends c {
  priority = 10;
  parse(t, e) {
    switch (e) {
      case "X":
        return T(
          M.basicOptionalMinutes,
          t
        );
      case "XX":
        return T(M.basic, t);
      case "XXXX":
        return T(
          M.basicOptionalSeconds,
          t
        );
      case "XXXXX":
        return T(
          M.extendedOptionalSeconds,
          t
        );
      case "XXX":
      default:
        return T(M.extended, t);
    }
  }
  set(t, e, n) {
    return e.timestampIsSet ? t : D(
      t,
      t.getTime() - F(t) - n
    );
  }
  incompatibleTokens = ["t", "T", "x"];
}
class hn extends c {
  priority = 10;
  parse(t, e) {
    switch (e) {
      case "x":
        return T(
          M.basicOptionalMinutes,
          t
        );
      case "xx":
        return T(M.basic, t);
      case "xxxx":
        return T(
          M.basicOptionalSeconds,
          t
        );
      case "xxxxx":
        return T(
          M.extendedOptionalSeconds,
          t
        );
      case "xxx":
      default:
        return T(M.extended, t);
    }
  }
  set(t, e, n) {
    return e.timestampIsSet ? t : D(
      t,
      t.getTime() - F(t) - n
    );
  }
  incompatibleTokens = ["t", "T", "X"];
}
class fn extends c {
  priority = 40;
  parse(t) {
    return wt(t);
  }
  set(t, e, n) {
    return [D(t, n * 1e3), { timestampIsSet: !0 }];
  }
  incompatibleTokens = "*";
}
class mn extends c {
  priority = 20;
  parse(t) {
    return wt(t);
  }
  set(t, e, n) {
    return [D(t, n), { timestampIsSet: !0 }];
  }
  incompatibleTokens = "*";
}
const wn = {
  G: new We(),
  y: new Le(),
  Y: new Ce(),
  R: new qe(),
  u: new Ne(),
  Q: new He(),
  q: new Fe(),
  M: new Ie(),
  L: new Re(),
  w: new Be(),
  I: new Ae(),
  d: new je(),
  D: new $e(),
  E: new ze(),
  e: new Ue(),
  c: new Ze(),
  i: new Se(),
  a: new tn(),
  b: new en(),
  B: new nn(),
  h: new rn(),
  H: new an(),
  K: new sn(),
  k: new on(),
  m: new un(),
  s: new cn(),
  S: new dn(),
  X: new ln(),
  x: new hn(),
  t: new fn(),
  T: new mn()
}, pn = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, gn = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, yn = /^'([^]*?)'?$/, bn = /''/g, xn = /\S/, Dn = /[a-zA-Z]/;
function Pn(r, t, e, n) {
  const a = () => D(e, NaN), s = Te(), o = s.locale ?? ot, i = s.firstWeekContainsDate ?? s.locale?.options?.firstWeekContainsDate ?? 1, y = s.weekStartsOn ?? s.locale?.options?.weekStartsOn ?? 0, l = {
    firstWeekContainsDate: i,
    weekStartsOn: y,
    locale: o
  }, w = [new _e(n?.in, e)], b = t.match(gn).map((u) => {
    const f = u[0];
    if (f in X) {
      const P = X[f];
      return P(u, o.formatLong);
    }
    return u;
  }).join("").match(pn), v = [];
  for (let u of b) {
    ft(u) && A(u, t, r), ht(u) && A(u, t, r);
    const f = u[0], P = wn[f];
    if (P) {
      const { incompatibleTokens: U } = P;
      if (Array.isArray(U)) {
        const Z = v.find(
          (K) => U.includes(K.token) || K.token === f
        );
        if (Z)
          throw new RangeError(
            `The format string mustn't contain \`${Z.fullToken}\` and \`${u}\` at the same time`
          );
      } else if (P.incompatibleTokens === "*" && v.length > 0)
        throw new RangeError(
          `The format string mustn't contain \`${u}\` and any other token at the same time`
        );
      v.push({ token: f, fullToken: u });
      const R = P.run(
        r,
        u,
        o.match,
        l
      );
      if (!R)
        return a();
      w.push(R.setter), r = R.rest;
    } else {
      if (f.match(Dn))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + f + "`"
        );
      if (u === "''" ? u = "'" : f === "'" && (u = kn(u)), r.indexOf(u) === 0)
        r = r.slice(u.length);
      else
        return a();
    }
  }
  if (r.length > 0 && xn.test(r))
    return a();
  const bt = w.map((u) => u.priority).sort((u, f) => f - u).filter((u, f, P) => P.indexOf(u) === f).map(
    (u) => w.filter((f) => f.priority === u).sort((f, P) => P.subPriority - f.subPriority)
  ).map((u) => u[0]);
  let W = x(e, n?.in);
  if (isNaN(+W)) return a();
  const z = {};
  for (const u of bt) {
    if (!u.validate(W, l))
      return a();
    const f = u.set(W, z, l);
    Array.isArray(f) ? (W = f[0], Object.assign(z, f[1])) : W = f;
  }
  return W;
}
function kn(r) {
  return r.match(yn)[1].replace(bn, "'");
}
const B = "MM-dd-yyyy", On = new k({
  mask: Date,
  pattern: B,
  blocks: {
    dd: {
      mask: _,
      from: 1,
      to: 31,
      placeholderChar: "D"
    },
    MM: {
      mask: _,
      from: 1,
      to: 12,
      placeholderChar: "M"
    },
    yyyy: {
      mask: _,
      from: 1900,
      to: 2030,
      placeholderChar: "Y"
    }
  },
  format: (r) => ke(r, B),
  parse: (r) => Pn(r, B, /* @__PURE__ */ new Date()),
  // optional interval options
  min: new Date(1900, 0, 1),
  max: new Date(2030, 0, 1),
  autofix: !0,
  lazy: !1,
  overwrite: !0
});
export {
  B as DEFAULT_DATE_FORMAT,
  On as dateMask
};
