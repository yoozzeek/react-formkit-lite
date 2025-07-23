function v(i) {
  return typeof i == "string" || i instanceof String;
}
function k(i) {
  var t;
  return typeof i == "object" && i != null && (i == null || (t = i.constructor) == null ? void 0 : t.name) === "Object";
}
function E(i, t) {
  return Array.isArray(t) ? E(i, (e, s) => t.includes(s)) : Object.entries(i).reduce((e, s) => {
    let [r, n] = s;
    return t(n, r) && (e[r] = n), e;
  }, {});
}
const p = {
  NONE: "NONE",
  LEFT: "LEFT",
  FORCE_LEFT: "FORCE_LEFT",
  RIGHT: "RIGHT",
  FORCE_RIGHT: "FORCE_RIGHT"
};
function y(i) {
  switch (i) {
    case p.LEFT:
      return p.FORCE_LEFT;
    case p.RIGHT:
      return p.FORCE_RIGHT;
    default:
      return i;
  }
}
function O(i) {
  return i.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
}
function I(i, t) {
  if (t === i) return !0;
  const e = Array.isArray(t), s = Array.isArray(i);
  let r;
  if (e && s) {
    if (t.length != i.length) return !1;
    for (r = 0; r < t.length; r++) if (!I(t[r], i[r])) return !1;
    return !0;
  }
  if (e != s) return !1;
  if (t && i && typeof t == "object" && typeof i == "object") {
    const n = t instanceof Date, h = i instanceof Date;
    if (n && h) return t.getTime() == i.getTime();
    if (n != h) return !1;
    const u = t instanceof RegExp, o = i instanceof RegExp;
    if (u && o) return t.toString() == i.toString();
    if (u != o) return !1;
    const l = Object.keys(t);
    for (r = 0; r < l.length; r++) if (!Object.prototype.hasOwnProperty.call(i, l[r])) return !1;
    for (r = 0; r < l.length; r++) if (!I(i[l[r]], t[l[r]])) return !1;
    return !0;
  } else if (t && i && typeof t == "function" && typeof i == "function")
    return t.toString() === i.toString();
  return !1;
}
function a(i, t) {
  return new a.InputMask(i, t);
}
class d {
  /** Inserted symbols */
  /** Additional offset if any changes occurred before tail */
  /** Raw inserted is used by dynamic mask */
  /** Can skip chars */
  static normalize(t) {
    return Array.isArray(t) ? t : [t, new d()];
  }
  constructor(t) {
    Object.assign(this, {
      inserted: "",
      rawInserted: "",
      tailShift: 0,
      skip: !1
    }, t);
  }
  /** Aggregate changes */
  aggregate(t) {
    return this.inserted += t.inserted, this.rawInserted += t.rawInserted, this.tailShift += t.tailShift, this.skip = this.skip || t.skip, this;
  }
  /** Total offset considering all changes */
  get offset() {
    return this.tailShift + this.inserted.length;
  }
  get consumed() {
    return !!this.rawInserted || this.skip;
  }
  equals(t) {
    return this.inserted === t.inserted && this.tailShift === t.tailShift && this.rawInserted === t.rawInserted && this.skip === t.skip;
  }
}
a.ChangeDetails = d;
function m(i) {
  if (i == null) throw new Error("mask property should be defined");
  return i instanceof RegExp ? a.MaskedRegExp : v(i) ? a.MaskedPattern : i === Date ? a.MaskedDate : i === Number ? a.MaskedNumber : Array.isArray(i) || i === Array ? a.MaskedDynamic : a.Masked && i.prototype instanceof a.Masked ? i : a.Masked && i instanceof a.Masked ? i.constructor : i instanceof Function ? a.MaskedFunction : (console.warn("Mask not found for mask", i), a.Masked);
}
function V(i) {
  if (!i) throw new Error("Options in not defined");
  if (a.Masked) {
    if (i.prototype instanceof a.Masked) return {
      mask: i
    };
    const {
      mask: t = void 0,
      ...e
    } = i instanceof a.Masked ? {
      mask: i
    } : k(i) && i.mask instanceof a.Masked ? i : {};
    if (t) {
      const s = t.mask;
      return {
        ...E(t, (r, n) => !n.startsWith("_")),
        mask: t.constructor,
        _mask: s,
        ...e
      };
    }
  }
  return k(i) ? {
    ...i
  } : {
    mask: i
  };
}
function S(i) {
  if (a.Masked && i instanceof a.Masked) return i;
  const t = V(i), e = m(t.mask);
  if (!e) throw new Error("Masked class is not found for provided mask " + t.mask + ", appropriate module needs to be imported manually before creating mask.");
  return t.mask === e && delete t.mask, t._mask && (t.mask = t._mask, delete t._mask), new e(t);
}
a.createMask = S;
class w {
  /** Tail value as string */
  /** Tail start position */
  /** Start position */
  constructor(t, e, s) {
    t === void 0 && (t = ""), e === void 0 && (e = 0), this.value = t, this.from = e, this.stop = s;
  }
  toString() {
    return this.value;
  }
  extend(t) {
    this.value += String(t);
  }
  appendTo(t) {
    return t.append(this.toString(), {
      tail: !0
    }).aggregate(t._appendPlaceholder());
  }
  get state() {
    return {
      value: this.value,
      from: this.from,
      stop: this.stop
    };
  }
  set state(t) {
    Object.assign(this, t);
  }
  unshift(t) {
    if (!this.value.length || t != null && this.from >= t) return "";
    const e = this.value[0];
    return this.value = this.value.slice(1), e;
  }
  shift() {
    if (!this.value.length) return "";
    const t = this.value[this.value.length - 1];
    return this.value = this.value.slice(0, -1), t;
  }
}
class c {
  /** */
  /** */
  /** Transforms value before mask processing */
  /** Transforms each char before mask processing */
  /** Validates if value is acceptable */
  /** Does additional processing at the end of editing */
  /** Format typed value to string */
  /** Parse string to get typed value */
  /** Enable characters overwriting */
  /** */
  /** */
  /** */
  /** */
  constructor(t) {
    this._value = "", this._update({
      ...c.DEFAULTS,
      ...t
    }), this._initialized = !0;
  }
  /** Sets and applies new options */
  updateOptions(t) {
    this.optionsIsChanged(t) && this.withValueRefresh(this._update.bind(this, t));
  }
  /** Sets new options */
  _update(t) {
    Object.assign(this, t);
  }
  /** Mask state */
  get state() {
    return {
      _value: this.value,
      _rawInputValue: this.rawInputValue
    };
  }
  set state(t) {
    this._value = t._value;
  }
  /** Resets value */
  reset() {
    this._value = "";
  }
  get value() {
    return this._value;
  }
  set value(t) {
    this.resolve(t, {
      input: !0
    });
  }
  /** Resolve new value */
  resolve(t, e) {
    e === void 0 && (e = {
      input: !0
    }), this.reset(), this.append(t, e, ""), this.doCommit();
  }
  get unmaskedValue() {
    return this.value;
  }
  set unmaskedValue(t) {
    this.resolve(t, {});
  }
  get typedValue() {
    return this.parse ? this.parse(this.value, this) : this.unmaskedValue;
  }
  set typedValue(t) {
    this.format ? this.value = this.format(t, this) : this.unmaskedValue = String(t);
  }
  /** Value that includes raw user input */
  get rawInputValue() {
    return this.extractInput(0, this.displayValue.length, {
      raw: !0
    });
  }
  set rawInputValue(t) {
    this.resolve(t, {
      raw: !0
    });
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
  /** Finds nearest input position in direction */
  nearestInputPos(t, e) {
    return t;
  }
  totalInputPositions(t, e) {
    return t === void 0 && (t = 0), e === void 0 && (e = this.displayValue.length), Math.min(this.displayValue.length, e - t);
  }
  /** Extracts value in range considering flags */
  extractInput(t, e, s) {
    return t === void 0 && (t = 0), e === void 0 && (e = this.displayValue.length), this.displayValue.slice(t, e);
  }
  /** Extracts tail in range */
  extractTail(t, e) {
    return t === void 0 && (t = 0), e === void 0 && (e = this.displayValue.length), new w(this.extractInput(t, e), t);
  }
  /** Appends tail */
  appendTail(t) {
    return v(t) && (t = new w(String(t))), t.appendTo(this);
  }
  /** Appends char */
  _appendCharRaw(t, e) {
    return t ? (this._value += t, new d({
      inserted: t,
      rawInserted: t
    })) : new d();
  }
  /** Appends char */
  _appendChar(t, e, s) {
    e === void 0 && (e = {});
    const r = this.state;
    let n;
    if ([t, n] = this.doPrepareChar(t, e), t && (n = n.aggregate(this._appendCharRaw(t, e)), !n.rawInserted && this.autofix === "pad")) {
      const h = this.state;
      this.state = r;
      let u = this.pad(e);
      const o = this._appendCharRaw(t, e);
      u = u.aggregate(o), o.rawInserted || u.equals(n) ? n = u : this.state = h;
    }
    if (n.inserted) {
      let h, u = this.doValidate(e) !== !1;
      if (u && s != null) {
        const o = this.state;
        if (this.overwrite === !0) {
          h = s.state;
          for (let f = 0; f < n.rawInserted.length; ++f)
            s.unshift(this.displayValue.length - n.tailShift);
        }
        let l = this.appendTail(s);
        if (u = l.rawInserted.length === s.toString().length, !(u && l.inserted) && this.overwrite === "shift") {
          this.state = o, h = s.state;
          for (let f = 0; f < n.rawInserted.length; ++f)
            s.shift();
          l = this.appendTail(s), u = l.rawInserted.length === s.toString().length;
        }
        u && l.inserted && (this.state = o);
      }
      u || (n = new d(), this.state = r, s && h && (s.state = h));
    }
    return n;
  }
  /** Appends optional placeholder at the end */
  _appendPlaceholder() {
    return new d();
  }
  /** Appends optional eager placeholder at the end */
  _appendEager() {
    return new d();
  }
  /** Appends symbols considering flags */
  append(t, e, s) {
    if (!v(t)) throw new Error("value should be string");
    const r = v(s) ? new w(String(s)) : s;
    e != null && e.tail && (e._beforeTailState = this.state);
    let n;
    [t, n] = this.doPrepare(t, e);
    for (let h = 0; h < t.length; ++h) {
      const u = this._appendChar(t[h], e, r);
      if (!u.rawInserted && !this.doSkipInvalid(t[h], e, r)) break;
      n.aggregate(u);
    }
    return (this.eager === !0 || this.eager === "append") && e != null && e.input && t && n.aggregate(this._appendEager()), r != null && (n.tailShift += this.appendTail(r).tailShift), n;
  }
  remove(t, e) {
    return t === void 0 && (t = 0), e === void 0 && (e = this.displayValue.length), this._value = this.displayValue.slice(0, t) + this.displayValue.slice(e), new d();
  }
  /** Calls function and reapplies current value */
  withValueRefresh(t) {
    if (this._refreshing || !this._initialized) return t();
    this._refreshing = !0;
    const e = this.rawInputValue, s = this.value, r = t();
    return this.rawInputValue = e, this.value && this.value !== s && s.indexOf(this.value) === 0 && (this.append(s.slice(this.displayValue.length), {}, ""), this.doCommit()), delete this._refreshing, r;
  }
  runIsolated(t) {
    if (this._isolated || !this._initialized) return t(this);
    this._isolated = !0;
    const e = this.state, s = t(this);
    return this.state = e, delete this._isolated, s;
  }
  doSkipInvalid(t, e, s) {
    return !!this.skipInvalid;
  }
  /** Prepares string before mask processing */
  doPrepare(t, e) {
    return e === void 0 && (e = {}), d.normalize(this.prepare ? this.prepare(t, this, e) : t);
  }
  /** Prepares each char before mask processing */
  doPrepareChar(t, e) {
    return e === void 0 && (e = {}), d.normalize(this.prepareChar ? this.prepareChar(t, this, e) : t);
  }
  /** Validates if value is acceptable */
  doValidate(t) {
    return (!this.validate || this.validate(this.value, this, t)) && (!this.parent || this.parent.doValidate(t));
  }
  /** Does additional processing at the end of editing */
  doCommit() {
    this.commit && this.commit(this.value, this);
  }
  splice(t, e, s, r, n) {
    s === void 0 && (s = ""), r === void 0 && (r = p.NONE), n === void 0 && (n = {
      input: !0
    });
    const h = t + e, u = this.extractTail(h), o = this.eager === !0 || this.eager === "remove";
    let l;
    o && (r = y(r), l = this.extractInput(0, h, {
      raw: !0
    }));
    let f = t;
    const g = new d();
    if (r !== p.NONE && (f = this.nearestInputPos(t, e > 1 && t !== 0 && !o ? p.NONE : r), g.tailShift = f - t), g.aggregate(this.remove(f)), o && r !== p.NONE && l === this.rawInputValue)
      if (r === p.FORCE_LEFT) {
        let _;
        for (; l === this.rawInputValue && (_ = this.displayValue.length); )
          g.aggregate(new d({
            tailShift: -1
          })).aggregate(this.remove(_ - 1));
      } else r === p.FORCE_RIGHT && u.unshift();
    return g.aggregate(this.append(s, n, u));
  }
  maskEquals(t) {
    return this.mask === t;
  }
  optionsIsChanged(t) {
    return !I(this, t);
  }
  typedValueEquals(t) {
    const e = this.typedValue;
    return t === e || c.EMPTY_VALUES.includes(t) && c.EMPTY_VALUES.includes(e) || (this.format ? this.format(t, this) === this.format(this.typedValue, this) : !1);
  }
  pad(t) {
    return new d();
  }
}
c.DEFAULTS = {
  skipInvalid: !0
};
c.EMPTY_VALUES = [void 0, null, ""];
a.Masked = c;
class C extends c {
  /** */
  /** Enable characters overwriting */
  /** */
  /** */
  /** */
  updateOptions(t) {
    super.updateOptions(t);
  }
  _update(t) {
    const e = t.mask;
    e && (t.validate = (s) => s.search(e) >= 0), super._update(t);
  }
}
a.MaskedRegExp = C;
export {
  d as C,
  p as D,
  a as I,
  c as M,
  C as a,
  w as b,
  S as c,
  O as e,
  v as i,
  m,
  V as n,
  I as o
};
