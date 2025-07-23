import { M as c, I as f, e as m, C as _, D as n, a as E } from "./chunks/regexp.BA-GGPSE.js";
import { M as T } from "./chunks/pattern.KyQgdgMN.js";
var S;
class i extends c {
  /** Single char */
  /** Single char */
  /** Array of single chars */
  /** */
  /** */
  /** Digits after point */
  /** Flag to remove leading and trailing zeros in the end of editing */
  /** Flag to pad trailing zeros after point in the end of editing */
  /** Enable characters overwriting */
  /** */
  /** */
  /** */
  /** Format typed value to string */
  /** Parse string to get typed value */
  constructor(e) {
    super({
      ...i.DEFAULTS,
      ...e
    });
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    super._update(e), this._updateRegExps();
  }
  _updateRegExps() {
    const e = "^" + (this.allowNegative ? "[+|\\-]?" : ""), t = "\\d*", a = (this.scale ? "(" + m(this.radix) + "\\d{0," + this.scale + "})?" : "") + "$";
    this._numberRegExp = new RegExp(e + t + a), this._mapToRadixRegExp = new RegExp("[" + this.mapToRadix.map(m).join("") + "]", "g"), this._thousandsSeparatorRegExp = new RegExp(m(this.thousandsSeparator), "g");
  }
  _removeThousandsSeparators(e) {
    return e.replace(this._thousandsSeparatorRegExp, "");
  }
  _insertThousandsSeparators(e) {
    const t = e.split(this.radix);
    return t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator), t.join(this.radix);
  }
  doPrepareChar(e, t) {
    t === void 0 && (t = {});
    const [a, s] = super.doPrepareChar(this._removeThousandsSeparators(this.scale && this.mapToRadix.length && /*
      radix should be mapped when
      1) input is done from keyboard = flags.input && flags.raw
      2) unmasked value is set = !flags.input && !flags.raw
      and should not be mapped when
      1) value is set = flags.input && !flags.raw
      2) raw value is set = !flags.input && flags.raw
    */
    (t.input && t.raw || !t.input && !t.raw) ? e.replace(this._mapToRadixRegExp, this.radix) : e), t);
    return e && !a && (s.skip = !0), a && !this.allowPositive && !this.value && a !== "-" && s.aggregate(this._appendChar("-")), [a, s];
  }
  _separatorsCount(e, t) {
    t === void 0 && (t = !1);
    let a = 0;
    for (let s = 0; s < e; ++s)
      this._value.indexOf(this.thousandsSeparator, s) === s && (++a, t && (e += this.thousandsSeparator.length));
    return a;
  }
  _separatorsCountFromSlice(e) {
    return e === void 0 && (e = this._value), this._separatorsCount(this._removeThousandsSeparators(e).length, !0);
  }
  extractInput(e, t, a) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), [e, t] = this._adjustRangeWithSeparators(e, t), this._removeThousandsSeparators(super.extractInput(e, t, a));
  }
  _appendCharRaw(e, t) {
    t === void 0 && (t = {});
    const a = t.tail && t._beforeTailState ? t._beforeTailState._value : this._value, s = this._separatorsCountFromSlice(a);
    this._value = this._removeThousandsSeparators(this.value);
    const r = this._value;
    this._value += e;
    const o = this.number;
    let h = !isNaN(o), u = !1;
    if (h) {
      let p;
      this.min != null && this.min < 0 && this.number < this.min && (p = this.min), this.max != null && this.max > 0 && this.number > this.max && (p = this.max), p != null && (this.autofix ? (this._value = this.format(p, this).replace(i.UNMASKED_RADIX, this.radix), u || (u = r === this._value && !t.tail)) : h = !1), h && (h = !!this._value.match(this._numberRegExp));
    }
    let l;
    h ? l = new _({
      inserted: this._value.slice(r.length),
      rawInserted: u ? "" : e,
      skip: u
    }) : (this._value = r, l = new _()), this._value = this._insertThousandsSeparators(this._value);
    const x = t.tail && t._beforeTailState ? t._beforeTailState._value : this._value, v = this._separatorsCountFromSlice(x);
    return l.tailShift += (v - s) * this.thousandsSeparator.length, l;
  }
  _findSeparatorAround(e) {
    if (this.thousandsSeparator) {
      const t = e - this.thousandsSeparator.length + 1, a = this.value.indexOf(this.thousandsSeparator, t);
      if (a <= e) return a;
    }
    return -1;
  }
  _adjustRangeWithSeparators(e, t) {
    const a = this._findSeparatorAround(e);
    a >= 0 && (e = a);
    const s = this._findSeparatorAround(t);
    return s >= 0 && (t = s + this.thousandsSeparator.length), [e, t];
  }
  remove(e, t) {
    e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), [e, t] = this._adjustRangeWithSeparators(e, t);
    const a = this.value.slice(0, e), s = this.value.slice(t), r = this._separatorsCount(a.length);
    this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(a + s));
    const o = this._separatorsCountFromSlice(a);
    return new _({
      tailShift: (o - r) * this.thousandsSeparator.length
    });
  }
  nearestInputPos(e, t) {
    if (!this.thousandsSeparator) return e;
    switch (t) {
      case n.NONE:
      case n.LEFT:
      case n.FORCE_LEFT: {
        const a = this._findSeparatorAround(e - 1);
        if (a >= 0) {
          const s = a + this.thousandsSeparator.length;
          if (e < s || this.value.length <= s || t === n.FORCE_LEFT)
            return a;
        }
        break;
      }
      case n.RIGHT:
      case n.FORCE_RIGHT: {
        const a = this._findSeparatorAround(e);
        if (a >= 0)
          return a + this.thousandsSeparator.length;
      }
    }
    return e;
  }
  doCommit() {
    if (this.value) {
      const e = this.number;
      let t = e;
      this.min != null && (t = Math.max(t, this.min)), this.max != null && (t = Math.min(t, this.max)), t !== e && (this.unmaskedValue = this.format(t, this));
      let a = this.value;
      this.normalizeZeros && (a = this._normalizeZeros(a)), this.padFractionalZeros && this.scale > 0 && (a = this._padFractionalZeros(a)), this._value = a;
    }
    super.doCommit();
  }
  _normalizeZeros(e) {
    const t = this._removeThousandsSeparators(e).split(this.radix);
    return t[0] = t[0].replace(/^(\D*)(0*)(\d*)/, (a, s, r, o) => s + o), e.length && !/\d$/.test(t[0]) && (t[0] = t[0] + "0"), t.length > 1 && (t[1] = t[1].replace(/0*$/, ""), t[1].length || (t.length = 1)), this._insertThousandsSeparators(t.join(this.radix));
  }
  _padFractionalZeros(e) {
    if (!e) return e;
    const t = e.split(this.radix);
    return t.length < 2 && t.push(""), t[1] = t[1].padEnd(this.scale, "0"), t.join(this.radix);
  }
  doSkipInvalid(e, t, a) {
    t === void 0 && (t = {});
    const s = this.scale === 0 && e !== this.thousandsSeparator && (e === this.radix || e === i.UNMASKED_RADIX || this.mapToRadix.includes(e));
    return super.doSkipInvalid(e, t, a) && !s;
  }
  get unmaskedValue() {
    return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, i.UNMASKED_RADIX);
  }
  set unmaskedValue(e) {
    super.unmaskedValue = e;
  }
  get typedValue() {
    return this.parse(this.unmaskedValue, this);
  }
  set typedValue(e) {
    this.rawInputValue = this.format(e, this).replace(i.UNMASKED_RADIX, this.radix);
  }
  /** Parsed Number */
  get number() {
    return this.typedValue;
  }
  set number(e) {
    this.typedValue = e;
  }
  get allowNegative() {
    return this.min != null && this.min < 0 || this.max != null && this.max < 0;
  }
  get allowPositive() {
    return this.min != null && this.min > 0 || this.max != null && this.max > 0;
  }
  typedValueEquals(e) {
    return (super.typedValueEquals(e) || i.EMPTY_VALUES.includes(e) && i.EMPTY_VALUES.includes(this.typedValue)) && !(e === 0 && this.value === "");
  }
}
S = i;
i.UNMASKED_RADIX = ".";
i.EMPTY_VALUES = [...c.EMPTY_VALUES, 0];
i.DEFAULTS = {
  ...c.DEFAULTS,
  mask: Number,
  radix: ",",
  thousandsSeparator: "",
  mapToRadix: [S.UNMASKED_RADIX],
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  scale: 2,
  normalizeZeros: !0,
  padFractionalZeros: !1,
  parse: Number,
  format: (d) => d.toLocaleString("en-US", {
    useGrouping: !1,
    maximumFractionDigits: 20
  })
};
f.MaskedNumber = i;
const A = new T({
  mask: "$num",
  // enable number mask
  blocks: {
    num: {
      mask: Number,
      // other options are optional with defaults below
      scale: 2,
      // digits after point, 0 for integers
      // signed: false, // disallow negative
      thousandsSeparator: " ",
      // any single char
      padFractionalZeros: !1,
      // if true, then pads zeros at end to the length of scale
      normalizeZeros: !0,
      // appends or removes zeros at ends
      radix: ".",
      // fractional delimiter
      mapToRadix: [".", ","],
      // symbols to process as radix
      // additional number interval options (e.g.)
      min: 0,
      max: 999999999
    }
  }
}), C = new i({
  mask: Number,
  // enable number mask
  // other options are optional with defaults below
  scale: 6,
  // digits after point, 0 for integers
  // signed: false, // disallow negative
  thousandsSeparator: "",
  // any single char
  padFractionalZeros: !1,
  // if true, then pads zeros at end to the length of scale
  normalizeZeros: !0,
  // appends or removes zeros at ends
  radix: ".",
  // fractional delimiter
  mapToRadix: [".", ","],
  // symbols to process as radix
  // additional number interval options (e.g.)
  min: 0,
  max: 999999999
}), F = new E({
  mask: /^([a-zA-Z]|\d|_)+$/,
  autofix: !0,
  overwrite: !0,
  prepare: (d) => d.toLowerCase()
});
export {
  F as lowercaseMask,
  A as moneyAmountMask,
  C as tokensAmountMask
};
