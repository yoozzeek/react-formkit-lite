//#region node_modules/.pnpm/imask@7.6.1/node_modules/imask/esm/core/utils.js
function e(e) {
	return typeof e == "string" || e instanceof String;
}
function t(e) {
	var t;
	return typeof e == "object" && !!e && (e == null || (t = e.constructor) == null ? void 0 : t.name) === "Object";
}
function n(e, t) {
	return Array.isArray(t) ? n(e, (e, n) => t.includes(n)) : Object.entries(e).reduce((e, n) => {
		let [r, i] = n;
		return t(i, r) && (e[r] = i), e;
	}, {});
}
var r = {
	NONE: "NONE",
	LEFT: "LEFT",
	FORCE_LEFT: "FORCE_LEFT",
	RIGHT: "RIGHT",
	FORCE_RIGHT: "FORCE_RIGHT"
};
function i(e) {
	switch (e) {
		case r.LEFT: return r.FORCE_LEFT;
		case r.RIGHT: return r.FORCE_RIGHT;
		default: return e;
	}
}
function a(e) {
	return e.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
}
function o(e, t) {
	if (t === e) return !0;
	let n = Array.isArray(t), r = Array.isArray(e), i;
	if (n && r) {
		if (t.length != e.length) return !1;
		for (i = 0; i < t.length; i++) if (!o(t[i], e[i])) return !1;
		return !0;
	}
	if (n != r) return !1;
	if (t && e && typeof t == "object" && typeof e == "object") {
		let n = t instanceof Date, r = e instanceof Date;
		if (n && r) return t.getTime() == e.getTime();
		if (n != r) return !1;
		let a = t instanceof RegExp, s = e instanceof RegExp;
		if (a && s) return t.toString() == e.toString();
		if (a != s) return !1;
		let c = Object.keys(t);
		for (i = 0; i < c.length; i++) if (!Object.prototype.hasOwnProperty.call(e, c[i])) return !1;
		for (i = 0; i < c.length; i++) if (!o(e[c[i]], t[c[i]])) return !1;
		return !0;
	} else if (t && e && typeof t == "function" && typeof e == "function") return t.toString() === e.toString();
	return !1;
}
//#endregion
//#region node_modules/.pnpm/imask@7.6.1/node_modules/imask/esm/core/holder.js
function s(e, t) {
	return new s.InputMask(e, t);
}
//#endregion
//#region node_modules/.pnpm/imask@7.6.1/node_modules/imask/esm/core/change-details.js
var c = class e {
	static normalize(t) {
		return Array.isArray(t) ? t : [t, new e()];
	}
	constructor(e) {
		Object.assign(this, {
			inserted: "",
			rawInserted: "",
			tailShift: 0,
			skip: !1
		}, e);
	}
	aggregate(e) {
		return this.inserted += e.inserted, this.rawInserted += e.rawInserted, this.tailShift += e.tailShift, this.skip = this.skip || e.skip, this;
	}
	get offset() {
		return this.tailShift + this.inserted.length;
	}
	get consumed() {
		return !!this.rawInserted || this.skip;
	}
	equals(e) {
		return this.inserted === e.inserted && this.tailShift === e.tailShift && this.rawInserted === e.rawInserted && this.skip === e.skip;
	}
};
s.ChangeDetails = c;
//#endregion
//#region node_modules/.pnpm/imask@7.6.1/node_modules/imask/esm/masked/factory.js
function l(t) {
	if (t == null) throw Error("mask property should be defined");
	return t instanceof RegExp ? s.MaskedRegExp : e(t) ? s.MaskedPattern : t === Date ? s.MaskedDate : t === Number ? s.MaskedNumber : Array.isArray(t) || t === Array ? s.MaskedDynamic : s.Masked && t.prototype instanceof s.Masked ? t : s.Masked && t instanceof s.Masked ? t.constructor : t instanceof Function ? s.MaskedFunction : (console.warn("Mask not found for mask", t), s.Masked);
}
function u(e) {
	if (!e) throw Error("Options in not defined");
	if (s.Masked) {
		if (e.prototype instanceof s.Masked) return { mask: e };
		let { mask: r = void 0, ...i } = e instanceof s.Masked ? { mask: e } : t(e) && e.mask instanceof s.Masked ? e : {};
		if (r) {
			let e = r.mask;
			return {
				...n(r, (e, t) => !t.startsWith("_")),
				mask: r.constructor,
				_mask: e,
				...i
			};
		}
	}
	return t(e) ? { ...e } : { mask: e };
}
function d(e) {
	if (s.Masked && e instanceof s.Masked) return e;
	let t = u(e), n = l(t.mask);
	if (!n) throw Error("Masked class is not found for provided mask " + t.mask + ", appropriate module needs to be imported manually before creating mask.");
	return t.mask === n && delete t.mask, t._mask && (t.mask = t._mask, delete t._mask), new n(t);
}
s.createMask = d;
//#endregion
//#region node_modules/.pnpm/imask@7.6.1/node_modules/imask/esm/core/continuous-tail-details.js
var f = class {
	constructor(e, t, n) {
		e === void 0 && (e = ""), t === void 0 && (t = 0), this.value = e, this.from = t, this.stop = n;
	}
	toString() {
		return this.value;
	}
	extend(e) {
		this.value += String(e);
	}
	appendTo(e) {
		return e.append(this.toString(), { tail: !0 }).aggregate(e._appendPlaceholder());
	}
	get state() {
		return {
			value: this.value,
			from: this.from,
			stop: this.stop
		};
	}
	set state(e) {
		Object.assign(this, e);
	}
	unshift(e) {
		if (!this.value.length || e != null && this.from >= e) return "";
		let t = this.value[0];
		return this.value = this.value.slice(1), t;
	}
	shift() {
		if (!this.value.length) return "";
		let e = this.value[this.value.length - 1];
		return this.value = this.value.slice(0, -1), e;
	}
}, p = class t {
	constructor(e) {
		this._value = "", this._update({
			...t.DEFAULTS,
			...e
		}), this._initialized = !0;
	}
	updateOptions(e) {
		this.optionsIsChanged(e) && this.withValueRefresh(this._update.bind(this, e));
	}
	_update(e) {
		Object.assign(this, e);
	}
	get state() {
		return {
			_value: this.value,
			_rawInputValue: this.rawInputValue
		};
	}
	set state(e) {
		this._value = e._value;
	}
	reset() {
		this._value = "";
	}
	get value() {
		return this._value;
	}
	set value(e) {
		this.resolve(e, { input: !0 });
	}
	resolve(e, t) {
		t === void 0 && (t = { input: !0 }), this.reset(), this.append(e, t, ""), this.doCommit();
	}
	get unmaskedValue() {
		return this.value;
	}
	set unmaskedValue(e) {
		this.resolve(e, {});
	}
	get typedValue() {
		return this.parse ? this.parse(this.value, this) : this.unmaskedValue;
	}
	set typedValue(e) {
		this.format ? this.value = this.format(e, this) : this.unmaskedValue = String(e);
	}
	get rawInputValue() {
		return this.extractInput(0, this.displayValue.length, { raw: !0 });
	}
	set rawInputValue(e) {
		this.resolve(e, { raw: !0 });
	}
	get displayValue() {
		return this.value;
	}
	get isComplete() {
		return !0;
	}
	get isFilled() {
		return this.isComplete;
	}
	nearestInputPos(e, t) {
		return e;
	}
	totalInputPositions(e, t) {
		return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), Math.min(this.displayValue.length, t - e);
	}
	extractInput(e, t, n) {
		return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), this.displayValue.slice(e, t);
	}
	extractTail(e, t) {
		return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), new f(this.extractInput(e, t), e);
	}
	appendTail(t) {
		return e(t) && (t = new f(String(t))), t.appendTo(this);
	}
	_appendCharRaw(e, t) {
		return e ? (this._value += e, new c({
			inserted: e,
			rawInserted: e
		})) : new c();
	}
	_appendChar(e, t, n) {
		t === void 0 && (t = {});
		let r = this.state, i;
		if ([e, i] = this.doPrepareChar(e, t), e && (i = i.aggregate(this._appendCharRaw(e, t)), !i.rawInserted && this.autofix === "pad")) {
			let n = this.state;
			this.state = r;
			let a = this.pad(t), o = this._appendCharRaw(e, t);
			a = a.aggregate(o), o.rawInserted || a.equals(i) ? i = a : this.state = n;
		}
		if (i.inserted) {
			let e, a = this.doValidate(t) !== !1;
			if (a && n != null) {
				let t = this.state;
				if (this.overwrite === !0) {
					e = n.state;
					for (let e = 0; e < i.rawInserted.length; ++e) n.unshift(this.displayValue.length - i.tailShift);
				}
				let r = this.appendTail(n);
				if (a = r.rawInserted.length === n.toString().length, !(a && r.inserted) && this.overwrite === "shift") {
					this.state = t, e = n.state;
					for (let e = 0; e < i.rawInserted.length; ++e) n.shift();
					r = this.appendTail(n), a = r.rawInserted.length === n.toString().length;
				}
				a && r.inserted && (this.state = t);
			}
			a || (i = new c(), this.state = r, n && e && (n.state = e));
		}
		return i;
	}
	_appendPlaceholder() {
		return new c();
	}
	_appendEager() {
		return new c();
	}
	append(t, n, r) {
		if (!e(t)) throw Error("value should be string");
		let i = e(r) ? new f(String(r)) : r;
		n != null && n.tail && (n._beforeTailState = this.state);
		let a;
		[t, a] = this.doPrepare(t, n);
		for (let e = 0; e < t.length; ++e) {
			let r = this._appendChar(t[e], n, i);
			if (!r.rawInserted && !this.doSkipInvalid(t[e], n, i)) break;
			a.aggregate(r);
		}
		return (this.eager === !0 || this.eager === "append") && n != null && n.input && t && a.aggregate(this._appendEager()), i != null && (a.tailShift += this.appendTail(i).tailShift), a;
	}
	remove(e, t) {
		return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), this._value = this.displayValue.slice(0, e) + this.displayValue.slice(t), new c();
	}
	withValueRefresh(e) {
		if (this._refreshing || !this._initialized) return e();
		this._refreshing = !0;
		let t = this.rawInputValue, n = this.value, r = e();
		return this.rawInputValue = t, this.value && this.value !== n && n.indexOf(this.value) === 0 && (this.append(n.slice(this.displayValue.length), {}, ""), this.doCommit()), delete this._refreshing, r;
	}
	runIsolated(e) {
		if (this._isolated || !this._initialized) return e(this);
		this._isolated = !0;
		let t = this.state, n = e(this);
		return this.state = t, delete this._isolated, n;
	}
	doSkipInvalid(e, t, n) {
		return !!this.skipInvalid;
	}
	doPrepare(e, t) {
		return t === void 0 && (t = {}), c.normalize(this.prepare ? this.prepare(e, this, t) : e);
	}
	doPrepareChar(e, t) {
		return t === void 0 && (t = {}), c.normalize(this.prepareChar ? this.prepareChar(e, this, t) : e);
	}
	doValidate(e) {
		return (!this.validate || this.validate(this.value, this, e)) && (!this.parent || this.parent.doValidate(e));
	}
	doCommit() {
		this.commit && this.commit(this.value, this);
	}
	splice(e, t, n, a, o) {
		n === void 0 && (n = ""), a === void 0 && (a = r.NONE), o === void 0 && (o = { input: !0 });
		let s = e + t, l = this.extractTail(s), u = this.eager === !0 || this.eager === "remove", d;
		u && (a = i(a), d = this.extractInput(0, s, { raw: !0 }));
		let f = e, p = new c();
		if (a !== r.NONE && (f = this.nearestInputPos(e, t > 1 && e !== 0 && !u ? r.NONE : a), p.tailShift = f - e), p.aggregate(this.remove(f)), u && a !== r.NONE && d === this.rawInputValue) if (a === r.FORCE_LEFT) {
			let e;
			for (; d === this.rawInputValue && (e = this.displayValue.length);) p.aggregate(new c({ tailShift: -1 })).aggregate(this.remove(e - 1));
		} else a === r.FORCE_RIGHT && l.unshift();
		return p.aggregate(this.append(n, o, l));
	}
	maskEquals(e) {
		return this.mask === e;
	}
	optionsIsChanged(e) {
		return !o(this, e);
	}
	typedValueEquals(e) {
		let n = this.typedValue;
		return e === n || t.EMPTY_VALUES.includes(e) && t.EMPTY_VALUES.includes(n) || (this.format ? this.format(e, this) === this.format(this.typedValue, this) : !1);
	}
	pad(e) {
		return new c();
	}
};
p.DEFAULTS = { skipInvalid: !0 }, p.EMPTY_VALUES = [
	void 0,
	null,
	""
], s.Masked = p;
//#endregion
//#region node_modules/.pnpm/imask@7.6.1/node_modules/imask/esm/masked/regexp.js
var m = class extends p {
	updateOptions(e) {
		super.updateOptions(e);
	}
	_update(e) {
		let t = e.mask;
		t && (e.validate = (e) => e.search(t) >= 0), super._update(e);
	}
};
s.MaskedRegExp = m;
//#endregion
export { l as a, s as c, e as d, o as f, d as i, r as l, p as n, u as o, f as r, c as s, m as t, a as u };
