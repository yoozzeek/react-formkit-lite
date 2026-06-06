import { c as e, l as t, n, s as r, t as i, u as a } from "./chunks/regexp.BJs0YnOh.js";
import { t as o } from "./chunks/pattern.o_LM6fbU.js";
//#region node_modules/.pnpm/imask@7.6.1/node_modules/imask/esm/masked/number.js
var s, c = class e extends n {
	constructor(t) {
		super({
			...e.DEFAULTS,
			...t
		});
	}
	updateOptions(e) {
		super.updateOptions(e);
	}
	_update(e) {
		super._update(e), this._updateRegExps();
	}
	_updateRegExps() {
		let e = "^" + (this.allowNegative ? "[+|\\-]?" : ""), t = (this.scale ? "(" + a(this.radix) + "\\d{0," + this.scale + "})?" : "") + "$";
		this._numberRegExp = RegExp(e + "\\d*" + t), this._mapToRadixRegExp = RegExp("[" + this.mapToRadix.map(a).join("") + "]", "g"), this._thousandsSeparatorRegExp = new RegExp(a(this.thousandsSeparator), "g");
	}
	_removeThousandsSeparators(e) {
		return e.replace(this._thousandsSeparatorRegExp, "");
	}
	_insertThousandsSeparators(e) {
		let t = e.split(this.radix);
		return t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator), t.join(this.radix);
	}
	doPrepareChar(e, t) {
		t === void 0 && (t = {});
		let [n, r] = super.doPrepareChar(this._removeThousandsSeparators(this.scale && this.mapToRadix.length && (t.input && t.raw || !t.input && !t.raw) ? e.replace(this._mapToRadixRegExp, this.radix) : e), t);
		return e && !n && (r.skip = !0), n && !this.allowPositive && !this.value && n !== "-" && r.aggregate(this._appendChar("-")), [n, r];
	}
	_separatorsCount(e, t) {
		t === void 0 && (t = !1);
		let n = 0;
		for (let r = 0; r < e; ++r) this._value.indexOf(this.thousandsSeparator, r) === r && (++n, t && (e += this.thousandsSeparator.length));
		return n;
	}
	_separatorsCountFromSlice(e) {
		return e === void 0 && (e = this._value), this._separatorsCount(this._removeThousandsSeparators(e).length, !0);
	}
	extractInput(e, t, n) {
		return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), [e, t] = this._adjustRangeWithSeparators(e, t), this._removeThousandsSeparators(super.extractInput(e, t, n));
	}
	_appendCharRaw(t, n) {
		n === void 0 && (n = {});
		let i = n.tail && n._beforeTailState ? n._beforeTailState._value : this._value, a = this._separatorsCountFromSlice(i);
		this._value = this._removeThousandsSeparators(this.value);
		let o = this._value;
		this._value += t;
		let s = this.number, c = !isNaN(s), l = !1;
		if (c) {
			let t;
			this.min != null && this.min < 0 && this.number < this.min && (t = this.min), this.max != null && this.max > 0 && this.number > this.max && (t = this.max), t != null && (this.autofix ? (this._value = this.format(t, this).replace(e.UNMASKED_RADIX, this.radix), l ||= o === this._value && !n.tail) : c = !1), c &&= !!this._value.match(this._numberRegExp);
		}
		let u;
		c ? u = new r({
			inserted: this._value.slice(o.length),
			rawInserted: l ? "" : t,
			skip: l
		}) : (this._value = o, u = new r()), this._value = this._insertThousandsSeparators(this._value);
		let d = n.tail && n._beforeTailState ? n._beforeTailState._value : this._value, f = this._separatorsCountFromSlice(d);
		return u.tailShift += (f - a) * this.thousandsSeparator.length, u;
	}
	_findSeparatorAround(e) {
		if (this.thousandsSeparator) {
			let t = e - this.thousandsSeparator.length + 1, n = this.value.indexOf(this.thousandsSeparator, t);
			if (n <= e) return n;
		}
		return -1;
	}
	_adjustRangeWithSeparators(e, t) {
		let n = this._findSeparatorAround(e);
		n >= 0 && (e = n);
		let r = this._findSeparatorAround(t);
		return r >= 0 && (t = r + this.thousandsSeparator.length), [e, t];
	}
	remove(e, t) {
		e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), [e, t] = this._adjustRangeWithSeparators(e, t);
		let n = this.value.slice(0, e), i = this.value.slice(t), a = this._separatorsCount(n.length);
		return this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(n + i)), new r({ tailShift: (this._separatorsCountFromSlice(n) - a) * this.thousandsSeparator.length });
	}
	nearestInputPos(e, n) {
		if (!this.thousandsSeparator) return e;
		switch (n) {
			case t.NONE:
			case t.LEFT:
			case t.FORCE_LEFT: {
				let r = this._findSeparatorAround(e - 1);
				if (r >= 0) {
					let i = r + this.thousandsSeparator.length;
					if (e < i || this.value.length <= i || n === t.FORCE_LEFT) return r;
				}
				break;
			}
			case t.RIGHT:
			case t.FORCE_RIGHT: {
				let t = this._findSeparatorAround(e);
				if (t >= 0) return t + this.thousandsSeparator.length;
			}
		}
		return e;
	}
	doCommit() {
		if (this.value) {
			let e = this.number, t = e;
			this.min != null && (t = Math.max(t, this.min)), this.max != null && (t = Math.min(t, this.max)), t !== e && (this.unmaskedValue = this.format(t, this));
			let n = this.value;
			this.normalizeZeros && (n = this._normalizeZeros(n)), this.padFractionalZeros && this.scale > 0 && (n = this._padFractionalZeros(n)), this._value = n;
		}
		super.doCommit();
	}
	_normalizeZeros(e) {
		let t = this._removeThousandsSeparators(e).split(this.radix);
		return t[0] = t[0].replace(/^(\D*)(0*)(\d*)/, (e, t, n, r) => t + r), e.length && !/\d$/.test(t[0]) && (t[0] += "0"), t.length > 1 && (t[1] = t[1].replace(/0*$/, ""), t[1].length || (t.length = 1)), this._insertThousandsSeparators(t.join(this.radix));
	}
	_padFractionalZeros(e) {
		if (!e) return e;
		let t = e.split(this.radix);
		return t.length < 2 && t.push(""), t[1] = t[1].padEnd(this.scale, "0"), t.join(this.radix);
	}
	doSkipInvalid(t, n, r) {
		n === void 0 && (n = {});
		let i = this.scale === 0 && t !== this.thousandsSeparator && (t === this.radix || t === e.UNMASKED_RADIX || this.mapToRadix.includes(t));
		return super.doSkipInvalid(t, n, r) && !i;
	}
	get unmaskedValue() {
		return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, e.UNMASKED_RADIX);
	}
	set unmaskedValue(e) {
		super.unmaskedValue = e;
	}
	get typedValue() {
		return this.parse(this.unmaskedValue, this);
	}
	set typedValue(t) {
		this.rawInputValue = this.format(t, this).replace(e.UNMASKED_RADIX, this.radix);
	}
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
	typedValueEquals(t) {
		return (super.typedValueEquals(t) || e.EMPTY_VALUES.includes(t) && e.EMPTY_VALUES.includes(this.typedValue)) && !(t === 0 && this.value === "");
	}
};
s = c, c.UNMASKED_RADIX = ".", c.EMPTY_VALUES = [...n.EMPTY_VALUES, 0], c.DEFAULTS = {
	...n.DEFAULTS,
	mask: Number,
	radix: ",",
	thousandsSeparator: "",
	mapToRadix: [s.UNMASKED_RADIX],
	min: -(2 ** 53 - 1),
	max: 2 ** 53 - 1,
	scale: 2,
	normalizeZeros: !0,
	padFractionalZeros: !1,
	parse: Number,
	format: (e) => e.toLocaleString("en-US", {
		useGrouping: !1,
		maximumFractionDigits: 20
	})
}, e.MaskedNumber = c;
//#endregion
//#region src/utils/otherMasks.ts
var l = new o({
	mask: "$num",
	blocks: { num: {
		mask: Number,
		scale: 2,
		thousandsSeparator: " ",
		padFractionalZeros: !1,
		normalizeZeros: !0,
		radix: ".",
		mapToRadix: [".", ","],
		min: 0,
		max: 999999999
	} }
}), u = new c({
	mask: Number,
	scale: 6,
	thousandsSeparator: "",
	padFractionalZeros: !1,
	normalizeZeros: !0,
	radix: ".",
	mapToRadix: [".", ","],
	min: 0,
	max: 999999999
}), d = new i({
	mask: /^([a-zA-Z]|\d|_)+$/,
	autofix: !0,
	overwrite: !0,
	prepare: (e) => e.toLowerCase()
});
//#endregion
export { d as lowercaseMask, l as moneyAmountMask, u as tokensAmountMask };
