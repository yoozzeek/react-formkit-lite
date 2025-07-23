import { M as k, D as o, n as d, c as v, C as l, o as _, I as g } from "./regexp.BA-GGPSE.js";
class h extends k {
  constructor(e) {
    super({
      ...h.DEFAULTS,
      ...e
    }), this.currentMask = void 0;
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    super._update(e), "mask" in e && (this.exposeMask = void 0, this.compiledMasks = Array.isArray(e.mask) ? e.mask.map((t) => {
      const {
        expose: s,
        ...a
      } = d(t), i = v({
        overwrite: this._overwrite,
        eager: this._eager,
        skipInvalid: this._skipInvalid,
        ...a
      });
      return s && (this.exposeMask = i), i;
    }) : []);
  }
  _appendCharRaw(e, t) {
    t === void 0 && (t = {});
    const s = this._applyDispatch(e, t);
    return this.currentMask && s.aggregate(this.currentMask._appendChar(e, this.currentMaskFlags(t))), s;
  }
  _applyDispatch(e, t, s) {
    e === void 0 && (e = ""), t === void 0 && (t = {}), s === void 0 && (s = "");
    const a = t.tail && t._beforeTailState != null ? t._beforeTailState._value : this.value, i = this.rawInputValue, r = t.tail && t._beforeTailState != null ? t._beforeTailState._rawInputValue : i, n = i.slice(r.length), u = this.currentMask, p = new l(), c = u?.state;
    return this.currentMask = this.doDispatch(e, {
      ...t
    }, s), this.currentMask && (this.currentMask !== u ? (this.currentMask.reset(), r && (this.currentMask.append(r, {
      raw: !0
    }), p.tailShift = this.currentMask.value.length - a.length), n && (p.tailShift += this.currentMask.append(n, {
      raw: !0,
      tail: !0
    }).tailShift)) : c && (this.currentMask.state = c)), p;
  }
  _appendPlaceholder() {
    const e = this._applyDispatch();
    return this.currentMask && e.aggregate(this.currentMask._appendPlaceholder()), e;
  }
  _appendEager() {
    const e = this._applyDispatch();
    return this.currentMask && e.aggregate(this.currentMask._appendEager()), e;
  }
  appendTail(e) {
    const t = new l();
    return e && t.aggregate(this._applyDispatch("", {}, e)), t.aggregate(this.currentMask ? this.currentMask.appendTail(e) : super.appendTail(e));
  }
  currentMaskFlags(e) {
    var t, s;
    return {
      ...e,
      _beforeTailState: ((t = e._beforeTailState) == null ? void 0 : t.currentMaskRef) === this.currentMask && ((s = e._beforeTailState) == null ? void 0 : s.currentMask) || e._beforeTailState
    };
  }
  doDispatch(e, t, s) {
    return t === void 0 && (t = {}), s === void 0 && (s = ""), this.dispatch(e, this, t, s);
  }
  doValidate(e) {
    return super.doValidate(e) && (!this.currentMask || this.currentMask.doValidate(this.currentMaskFlags(e)));
  }
  doPrepare(e, t) {
    t === void 0 && (t = {});
    let [s, a] = super.doPrepare(e, t);
    if (this.currentMask) {
      let i;
      [s, i] = super.doPrepare(s, this.currentMaskFlags(t)), a = a.aggregate(i);
    }
    return [s, a];
  }
  doPrepareChar(e, t) {
    t === void 0 && (t = {});
    let [s, a] = super.doPrepareChar(e, t);
    if (this.currentMask) {
      let i;
      [s, i] = super.doPrepareChar(s, this.currentMaskFlags(t)), a = a.aggregate(i);
    }
    return [s, a];
  }
  reset() {
    var e;
    (e = this.currentMask) == null || e.reset(), this.compiledMasks.forEach((t) => t.reset());
  }
  get value() {
    return this.exposeMask ? this.exposeMask.value : this.currentMask ? this.currentMask.value : "";
  }
  set value(e) {
    this.exposeMask ? (this.exposeMask.value = e, this.currentMask = this.exposeMask, this._applyDispatch()) : super.value = e;
  }
  get unmaskedValue() {
    return this.exposeMask ? this.exposeMask.unmaskedValue : this.currentMask ? this.currentMask.unmaskedValue : "";
  }
  set unmaskedValue(e) {
    this.exposeMask ? (this.exposeMask.unmaskedValue = e, this.currentMask = this.exposeMask, this._applyDispatch()) : super.unmaskedValue = e;
  }
  get typedValue() {
    return this.exposeMask ? this.exposeMask.typedValue : this.currentMask ? this.currentMask.typedValue : "";
  }
  set typedValue(e) {
    if (this.exposeMask) {
      this.exposeMask.typedValue = e, this.currentMask = this.exposeMask, this._applyDispatch();
      return;
    }
    let t = String(e);
    this.currentMask && (this.currentMask.typedValue = e, t = this.currentMask.unmaskedValue), this.unmaskedValue = t;
  }
  get displayValue() {
    return this.currentMask ? this.currentMask.displayValue : "";
  }
  get isComplete() {
    var e;
    return !!((e = this.currentMask) != null && e.isComplete);
  }
  get isFilled() {
    var e;
    return !!((e = this.currentMask) != null && e.isFilled);
  }
  remove(e, t) {
    const s = new l();
    return this.currentMask && s.aggregate(this.currentMask.remove(e, t)).aggregate(this._applyDispatch()), s;
  }
  get state() {
    var e;
    return {
      ...super.state,
      _rawInputValue: this.rawInputValue,
      compiledMasks: this.compiledMasks.map((t) => t.state),
      currentMaskRef: this.currentMask,
      currentMask: (e = this.currentMask) == null ? void 0 : e.state
    };
  }
  set state(e) {
    const {
      compiledMasks: t,
      currentMaskRef: s,
      currentMask: a,
      ...i
    } = e;
    t && this.compiledMasks.forEach((r, n) => r.state = t[n]), s != null && (this.currentMask = s, this.currentMask.state = a), super.state = i;
  }
  extractInput(e, t, s) {
    return this.currentMask ? this.currentMask.extractInput(e, t, s) : "";
  }
  extractTail(e, t) {
    return this.currentMask ? this.currentMask.extractTail(e, t) : super.extractTail(e, t);
  }
  doCommit() {
    this.currentMask && this.currentMask.doCommit(), super.doCommit();
  }
  nearestInputPos(e, t) {
    return this.currentMask ? this.currentMask.nearestInputPos(e, t) : super.nearestInputPos(e, t);
  }
  get overwrite() {
    return this.currentMask ? this.currentMask.overwrite : this._overwrite;
  }
  set overwrite(e) {
    this._overwrite = e;
  }
  get eager() {
    return this.currentMask ? this.currentMask.eager : this._eager;
  }
  set eager(e) {
    this._eager = e;
  }
  get skipInvalid() {
    return this.currentMask ? this.currentMask.skipInvalid : this._skipInvalid;
  }
  set skipInvalid(e) {
    this._skipInvalid = e;
  }
  get autofix() {
    return this.currentMask ? this.currentMask.autofix : this._autofix;
  }
  set autofix(e) {
    this._autofix = e;
  }
  maskEquals(e) {
    return Array.isArray(e) ? this.compiledMasks.every((t, s) => {
      if (!e[s]) return;
      const {
        mask: a,
        ...i
      } = e[s];
      return _(t, i) && t.maskEquals(a);
    }) : super.maskEquals(e);
  }
  typedValueEquals(e) {
    var t;
    return !!((t = this.currentMask) != null && t.typedValueEquals(e));
  }
}
h.DEFAULTS = {
  ...k.DEFAULTS,
  dispatch: (M, e, t, s) => {
    if (!e.compiledMasks.length) return;
    const a = e.rawInputValue, i = e.compiledMasks.map((r, n) => {
      const u = e.currentMask === r, p = u ? r.displayValue.length : r.nearestInputPos(r.displayValue.length, o.FORCE_LEFT);
      return r.rawInputValue !== a ? (r.reset(), r.append(a, {
        raw: !0
      })) : u || r.remove(p), r.append(M, e.currentMaskFlags(t)), r.appendTail(s), {
        index: n,
        weight: r.rawInputValue.length,
        totalInputPositions: r.totalInputPositions(0, Math.max(p, r.nearestInputPos(r.displayValue.length, o.FORCE_LEFT)))
      };
    });
    return i.sort((r, n) => n.weight - r.weight || n.totalInputPositions - r.totalInputPositions), e.compiledMasks[i[0].index];
  }
};
g.MaskedDynamic = h;
export {
  h as M
};
