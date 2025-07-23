import { b as A, i as b, I as C, C as h, D as a, c as v, M as x, n as D } from "./regexp.BA-GGPSE.js";
class c {
  /** */
  constructor(t, e) {
    t === void 0 && (t = []), e === void 0 && (e = 0), this.chunks = t, this.from = e;
  }
  toString() {
    return this.chunks.map(String).join("");
  }
  extend(t) {
    if (!String(t)) return;
    t = b(t) ? new A(String(t)) : t;
    const e = this.chunks[this.chunks.length - 1], u = e && // if stops are same or tail has no stop
    (e.stop === t.stop || t.stop == null) && // if tail chunk goes just after last chunk
    t.from === e.from + e.toString().length;
    if (t instanceof A)
      u ? e.extend(t.toString()) : this.chunks.push(t);
    else if (t instanceof c) {
      if (t.stop == null) {
        let s;
        for (; t.chunks.length && t.chunks[0].stop == null; )
          s = t.chunks.shift(), s.from += t.from, this.extend(s);
      }
      t.toString() && (t.stop = t.blockIndex, this.chunks.push(t));
    }
  }
  appendTo(t) {
    if (!(t instanceof C.MaskedPattern))
      return new A(this.toString()).appendTo(t);
    const e = new h();
    for (let u = 0; u < this.chunks.length; ++u) {
      const s = this.chunks[u], i = t._mapPosToBlock(t.displayValue.length), n = s.stop;
      let l;
      if (n != null && // if block not found or stop is behind lastBlock
      (!i || i.index <= n) && ((s instanceof c || // for continuous block also check if stop is exist
      t._stops.indexOf(n) >= 0) && e.aggregate(t._appendPlaceholder(n)), l = s instanceof c && t._blocks[n]), l) {
        const r = l.appendTail(s);
        e.aggregate(r);
        const o = s.toString().slice(r.rawInserted.length);
        o && e.aggregate(t.append(o, {
          tail: !0
        }));
      } else
        e.aggregate(t.append(s.toString(), {
          tail: !0
        }));
    }
    return e;
  }
  get state() {
    return {
      chunks: this.chunks.map((t) => t.state),
      from: this.from,
      stop: this.stop,
      blockIndex: this.blockIndex
    };
  }
  set state(t) {
    const {
      chunks: e,
      ...u
    } = t;
    Object.assign(this, u), this.chunks = e.map((s) => {
      const i = "chunks" in s ? new c() : new A();
      return i.state = s, i;
    });
  }
  unshift(t) {
    if (!this.chunks.length || t != null && this.from >= t) return "";
    const e = t != null ? t - this.from : t;
    let u = 0;
    for (; u < this.chunks.length; ) {
      const s = this.chunks[u], i = s.unshift(e);
      if (s.toString()) {
        if (!i) break;
        ++u;
      } else
        this.chunks.splice(u, 1);
      if (i) return i;
    }
    return "";
  }
  shift() {
    if (!this.chunks.length) return "";
    let t = this.chunks.length - 1;
    for (; 0 <= t; ) {
      const e = this.chunks[t], u = e.shift();
      if (e.toString()) {
        if (!u) break;
        --t;
      } else
        this.chunks.splice(t, 1);
      if (u) return u;
    }
    return "";
  }
}
class T {
  constructor(t, e) {
    this.masked = t, this._log = [];
    const {
      offset: u,
      index: s
    } = t._mapPosToBlock(e) || (e < 0 ? (
      // first
      {
        index: 0,
        offset: 0
      }
    ) : (
      // last
      {
        index: this.masked._blocks.length,
        offset: 0
      }
    ));
    this.offset = u, this.index = s, this.ok = !1;
  }
  get block() {
    return this.masked._blocks[this.index];
  }
  get pos() {
    return this.masked._blockStartPos(this.index) + this.offset;
  }
  get state() {
    return {
      index: this.index,
      offset: this.offset,
      ok: this.ok
    };
  }
  set state(t) {
    Object.assign(this, t);
  }
  pushState() {
    this._log.push(this.state);
  }
  popState() {
    const t = this._log.pop();
    return t && (this.state = t), t;
  }
  bindBlock() {
    this.block || (this.index < 0 && (this.index = 0, this.offset = 0), this.index >= this.masked._blocks.length && (this.index = this.masked._blocks.length - 1, this.offset = this.block.displayValue.length));
  }
  _pushLeft(t) {
    for (this.pushState(), this.bindBlock(); 0 <= this.index; --this.index, this.offset = ((e = this.block) == null ? void 0 : e.displayValue.length) || 0) {
      var e;
      if (t()) return this.ok = !0;
    }
    return this.ok = !1;
  }
  _pushRight(t) {
    for (this.pushState(), this.bindBlock(); this.index < this.masked._blocks.length; ++this.index, this.offset = 0)
      if (t()) return this.ok = !0;
    return this.ok = !1;
  }
  pushLeftBeforeFilled() {
    return this._pushLeft(() => {
      if (!(this.block.isFixed || !this.block.value) && (this.offset = this.block.nearestInputPos(this.offset, a.FORCE_LEFT), this.offset !== 0))
        return !0;
    });
  }
  pushLeftBeforeInput() {
    return this._pushLeft(() => {
      if (!this.block.isFixed)
        return this.offset = this.block.nearestInputPos(this.offset, a.LEFT), !0;
    });
  }
  pushLeftBeforeRequired() {
    return this._pushLeft(() => {
      if (!(this.block.isFixed || this.block.isOptional && !this.block.value))
        return this.offset = this.block.nearestInputPos(this.offset, a.LEFT), !0;
    });
  }
  pushRightBeforeFilled() {
    return this._pushRight(() => {
      if (!(this.block.isFixed || !this.block.value) && (this.offset = this.block.nearestInputPos(this.offset, a.FORCE_RIGHT), this.offset !== this.block.value.length))
        return !0;
    });
  }
  pushRightBeforeInput() {
    return this._pushRight(() => {
      if (!this.block.isFixed)
        return this.offset = this.block.nearestInputPos(this.offset, a.NONE), !0;
    });
  }
  pushRightBeforeRequired() {
    return this._pushRight(() => {
      if (!(this.block.isFixed || this.block.isOptional && !this.block.value))
        return this.offset = this.block.nearestInputPos(this.offset, a.NONE), !0;
    });
  }
}
class m {
  /** */
  /** */
  /** */
  /** */
  /** */
  /** */
  constructor(t) {
    Object.assign(this, t), this._value = "", this.isFixed = !0;
  }
  get value() {
    return this._value;
  }
  get unmaskedValue() {
    return this.isUnmasking ? this.value : "";
  }
  get rawInputValue() {
    return this._isRawInput ? this.value : "";
  }
  get displayValue() {
    return this.value;
  }
  reset() {
    this._isRawInput = !1, this._value = "";
  }
  remove(t, e) {
    return t === void 0 && (t = 0), e === void 0 && (e = this._value.length), this._value = this._value.slice(0, t) + this._value.slice(e), this._value || (this._isRawInput = !1), new h();
  }
  nearestInputPos(t, e) {
    e === void 0 && (e = a.NONE);
    const u = 0, s = this._value.length;
    switch (e) {
      case a.LEFT:
      case a.FORCE_LEFT:
        return u;
      case a.NONE:
      case a.RIGHT:
      case a.FORCE_RIGHT:
      default:
        return s;
    }
  }
  totalInputPositions(t, e) {
    return t === void 0 && (t = 0), e === void 0 && (e = this._value.length), this._isRawInput ? e - t : 0;
  }
  extractInput(t, e, u) {
    return t === void 0 && (t = 0), e === void 0 && (e = this._value.length), u === void 0 && (u = {}), u.raw && this._isRawInput && this._value.slice(t, e) || "";
  }
  get isComplete() {
    return !0;
  }
  get isFilled() {
    return !!this._value;
  }
  _appendChar(t, e) {
    if (e === void 0 && (e = {}), this.isFilled) return new h();
    const u = this.eager === !0 || this.eager === "append", i = this.char === t && (this.isUnmasking || e.input || e.raw) && (!e.raw || !u) && !e.tail, n = new h({
      inserted: this.char,
      rawInserted: i ? this.char : ""
    });
    return this._value = this.char, this._isRawInput = i && (e.raw || e.input), n;
  }
  _appendEager() {
    return this._appendChar(this.char, {
      tail: !0
    });
  }
  _appendPlaceholder() {
    const t = new h();
    return this.isFilled || (this._value = t.inserted = this.char), t;
  }
  extractTail() {
    return new A("");
  }
  appendTail(t) {
    return b(t) && (t = new A(String(t))), t.appendTo(this);
  }
  append(t, e, u) {
    const s = this._appendChar(t[0], e);
    return u != null && (s.tailShift += this.appendTail(u).tailShift), s;
  }
  doCommit() {
  }
  get state() {
    return {
      _value: this._value,
      _rawInputValue: this.rawInputValue
    };
  }
  set state(t) {
    this._value = t._value, this._isRawInput = !!t._rawInputValue;
  }
  pad(t) {
    return this._appendPlaceholder();
  }
}
class B {
  /** */
  /** */
  /** */
  /** */
  /** */
  /** */
  /** */
  /** */
  constructor(t) {
    const {
      parent: e,
      isOptional: u,
      placeholderChar: s,
      displayChar: i,
      lazy: n,
      eager: l,
      ...r
    } = t;
    this.masked = v(r), Object.assign(this, {
      parent: e,
      isOptional: u,
      placeholderChar: s,
      displayChar: i,
      lazy: n,
      eager: l
    });
  }
  reset() {
    this.isFilled = !1, this.masked.reset();
  }
  remove(t, e) {
    return t === void 0 && (t = 0), e === void 0 && (e = this.value.length), t === 0 && e >= 1 ? (this.isFilled = !1, this.masked.remove(t, e)) : new h();
  }
  get value() {
    return this.masked.value || (this.isFilled && !this.isOptional ? this.placeholderChar : "");
  }
  get unmaskedValue() {
    return this.masked.unmaskedValue;
  }
  get rawInputValue() {
    return this.masked.rawInputValue;
  }
  get displayValue() {
    return this.masked.value && this.displayChar || this.value;
  }
  get isComplete() {
    return !!this.masked.value || this.isOptional;
  }
  _appendChar(t, e) {
    if (e === void 0 && (e = {}), this.isFilled) return new h();
    const u = this.masked.state;
    let s = this.masked._appendChar(t, this.currentMaskFlags(e));
    return s.inserted && this.doValidate(e) === !1 && (s = new h(), this.masked.state = u), !s.inserted && !this.isOptional && !this.lazy && !e.input && (s.inserted = this.placeholderChar), s.skip = !s.inserted && !this.isOptional, this.isFilled = !!s.inserted, s;
  }
  append(t, e, u) {
    return this.masked.append(t, this.currentMaskFlags(e), u);
  }
  _appendPlaceholder() {
    return this.isFilled || this.isOptional ? new h() : (this.isFilled = !0, new h({
      inserted: this.placeholderChar
    }));
  }
  _appendEager() {
    return new h();
  }
  extractTail(t, e) {
    return this.masked.extractTail(t, e);
  }
  appendTail(t) {
    return this.masked.appendTail(t);
  }
  extractInput(t, e, u) {
    return t === void 0 && (t = 0), e === void 0 && (e = this.value.length), this.masked.extractInput(t, e, u);
  }
  nearestInputPos(t, e) {
    e === void 0 && (e = a.NONE);
    const u = 0, s = this.value.length, i = Math.min(Math.max(t, u), s);
    switch (e) {
      case a.LEFT:
      case a.FORCE_LEFT:
        return this.isComplete ? i : u;
      case a.RIGHT:
      case a.FORCE_RIGHT:
        return this.isComplete ? i : s;
      case a.NONE:
      default:
        return i;
    }
  }
  totalInputPositions(t, e) {
    return t === void 0 && (t = 0), e === void 0 && (e = this.value.length), this.value.slice(t, e).length;
  }
  doValidate(t) {
    return this.masked.doValidate(this.currentMaskFlags(t)) && (!this.parent || this.parent.doValidate(this.currentMaskFlags(t)));
  }
  doCommit() {
    this.masked.doCommit();
  }
  get state() {
    return {
      _value: this.value,
      _rawInputValue: this.rawInputValue,
      masked: this.masked.state,
      isFilled: this.isFilled
    };
  }
  set state(t) {
    this.masked.state = t.masked, this.isFilled = t.isFilled;
  }
  currentMaskFlags(t) {
    var e;
    return {
      ...t,
      _beforeTailState: (t == null || (e = t._beforeTailState) == null ? void 0 : e.masked) || t?._beforeTailState
    };
  }
  pad(t) {
    return new h();
  }
}
B.DEFAULT_DEFINITIONS = {
  0: /\d/,
  a: /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
  // http://stackoverflow.com/a/22075070
  "*": /./
};
class p extends x {
  /** */
  /** */
  /** Single char for empty input */
  /** Single char for filled input */
  /** Show placeholder only when needed */
  /** Enable characters overwriting */
  /** */
  /** */
  /** */
  constructor(t) {
    super({
      ...p.DEFAULTS,
      ...t,
      definitions: Object.assign({}, B.DEFAULT_DEFINITIONS, t?.definitions)
    });
  }
  updateOptions(t) {
    super.updateOptions(t);
  }
  _update(t) {
    t.definitions = Object.assign({}, this.definitions, t.definitions), super._update(t), this._rebuildMask();
  }
  _rebuildMask() {
    const t = this.definitions;
    this._blocks = [], this.exposeBlock = void 0, this._stops = [], this._maskedBlocks = {};
    const e = this.mask;
    if (!e || !t) return;
    let u = !1, s = !1;
    for (let i = 0; i < e.length; ++i) {
      if (this.blocks) {
        const o = e.slice(i), g = Object.keys(this.blocks).filter((F) => o.indexOf(F) === 0);
        g.sort((F, f) => f.length - F.length);
        const d = g[0];
        if (d) {
          const {
            expose: F,
            repeat: f,
            ...I
          } = D(this.blocks[d]), _ = {
            lazy: this.lazy,
            eager: this.eager,
            placeholderChar: this.placeholderChar,
            displayChar: this.displayChar,
            overwrite: this.overwrite,
            autofix: this.autofix,
            ...I,
            repeat: f,
            parent: this
          }, k = f != null ? new C.RepeatBlock(
            _
            /* TODO */
          ) : v(_);
          k && (this._blocks.push(k), F && (this.exposeBlock = k), this._maskedBlocks[d] || (this._maskedBlocks[d] = []), this._maskedBlocks[d].push(this._blocks.length - 1)), i += d.length - 1;
          continue;
        }
      }
      let n = e[i], l = n in t;
      if (n === p.STOP_CHAR) {
        this._stops.push(this._blocks.length);
        continue;
      }
      if (n === "{" || n === "}") {
        u = !u;
        continue;
      }
      if (n === "[" || n === "]") {
        s = !s;
        continue;
      }
      if (n === p.ESCAPE_CHAR) {
        if (++i, n = e[i], !n) break;
        l = !1;
      }
      const r = l ? new B({
        isOptional: s,
        lazy: this.lazy,
        eager: this.eager,
        placeholderChar: this.placeholderChar,
        displayChar: this.displayChar,
        ...D(t[n]),
        parent: this
      }) : new m({
        char: n,
        eager: this.eager,
        isUnmasking: u
      });
      this._blocks.push(r);
    }
  }
  get state() {
    return {
      ...super.state,
      _blocks: this._blocks.map((t) => t.state)
    };
  }
  set state(t) {
    if (!t) {
      this.reset();
      return;
    }
    const {
      _blocks: e,
      ...u
    } = t;
    this._blocks.forEach((s, i) => s.state = e[i]), super.state = u;
  }
  reset() {
    super.reset(), this._blocks.forEach((t) => t.reset());
  }
  get isComplete() {
    return this.exposeBlock ? this.exposeBlock.isComplete : this._blocks.every((t) => t.isComplete);
  }
  get isFilled() {
    return this._blocks.every((t) => t.isFilled);
  }
  get isFixed() {
    return this._blocks.every((t) => t.isFixed);
  }
  get isOptional() {
    return this._blocks.every((t) => t.isOptional);
  }
  doCommit() {
    this._blocks.forEach((t) => t.doCommit()), super.doCommit();
  }
  get unmaskedValue() {
    return this.exposeBlock ? this.exposeBlock.unmaskedValue : this._blocks.reduce((t, e) => t += e.unmaskedValue, "");
  }
  set unmaskedValue(t) {
    if (this.exposeBlock) {
      const e = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.unmaskedValue = t, this.appendTail(e), this.doCommit();
    } else super.unmaskedValue = t;
  }
  get value() {
    return this.exposeBlock ? this.exposeBlock.value : (
      // TODO return _value when not in change?
      this._blocks.reduce((t, e) => t += e.value, "")
    );
  }
  set value(t) {
    if (this.exposeBlock) {
      const e = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.value = t, this.appendTail(e), this.doCommit();
    } else super.value = t;
  }
  get typedValue() {
    return this.exposeBlock ? this.exposeBlock.typedValue : super.typedValue;
  }
  set typedValue(t) {
    if (this.exposeBlock) {
      const e = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.typedValue = t, this.appendTail(e), this.doCommit();
    } else super.typedValue = t;
  }
  get displayValue() {
    return this._blocks.reduce((t, e) => t += e.displayValue, "");
  }
  appendTail(t) {
    return super.appendTail(t).aggregate(this._appendPlaceholder());
  }
  _appendEager() {
    var t;
    const e = new h();
    let u = (t = this._mapPosToBlock(this.displayValue.length)) == null ? void 0 : t.index;
    if (u == null) return e;
    this._blocks[u].isFilled && ++u;
    for (let s = u; s < this._blocks.length; ++s) {
      const i = this._blocks[s]._appendEager();
      if (!i.inserted) break;
      e.aggregate(i);
    }
    return e;
  }
  _appendCharRaw(t, e) {
    e === void 0 && (e = {});
    const u = this._mapPosToBlock(this.displayValue.length), s = new h();
    if (!u) return s;
    for (let n = u.index, l; l = this._blocks[n]; ++n) {
      var i;
      const r = l._appendChar(t, {
        ...e,
        _beforeTailState: (i = e._beforeTailState) == null || (i = i._blocks) == null ? void 0 : i[n]
      });
      if (s.aggregate(r), r.consumed) break;
    }
    return s;
  }
  extractTail(t, e) {
    t === void 0 && (t = 0), e === void 0 && (e = this.displayValue.length);
    const u = new c();
    return t === e || this._forEachBlocksInRange(t, e, (s, i, n, l) => {
      const r = s.extractTail(n, l);
      r.stop = this._findStopBefore(i), r.from = this._blockStartPos(i), r instanceof c && (r.blockIndex = i), u.extend(r);
    }), u;
  }
  extractInput(t, e, u) {
    if (t === void 0 && (t = 0), e === void 0 && (e = this.displayValue.length), u === void 0 && (u = {}), t === e) return "";
    let s = "";
    return this._forEachBlocksInRange(t, e, (i, n, l, r) => {
      s += i.extractInput(l, r, u);
    }), s;
  }
  _findStopBefore(t) {
    let e;
    for (let u = 0; u < this._stops.length; ++u) {
      const s = this._stops[u];
      if (s <= t) e = s;
      else break;
    }
    return e;
  }
  /** Appends placeholder depending on laziness */
  _appendPlaceholder(t) {
    const e = new h();
    if (this.lazy && t == null) return e;
    const u = this._mapPosToBlock(this.displayValue.length);
    if (!u) return e;
    const s = u.index, i = t ?? this._blocks.length;
    return this._blocks.slice(s, i).forEach((n) => {
      if (!n.lazy || t != null) {
        var l;
        e.aggregate(n._appendPlaceholder((l = n._blocks) == null ? void 0 : l.length));
      }
    }), e;
  }
  /** Finds block in pos */
  _mapPosToBlock(t) {
    let e = "";
    for (let u = 0; u < this._blocks.length; ++u) {
      const s = this._blocks[u], i = e.length;
      if (e += s.displayValue, t <= e.length)
        return {
          index: u,
          offset: t - i
        };
    }
  }
  _blockStartPos(t) {
    return this._blocks.slice(0, t).reduce((e, u) => e += u.displayValue.length, 0);
  }
  _forEachBlocksInRange(t, e, u) {
    e === void 0 && (e = this.displayValue.length);
    const s = this._mapPosToBlock(t);
    if (s) {
      const i = this._mapPosToBlock(e), n = i && s.index === i.index, l = s.offset, r = i && n ? i.offset : this._blocks[s.index].displayValue.length;
      if (u(this._blocks[s.index], s.index, l, r), i && !n) {
        for (let o = s.index + 1; o < i.index; ++o)
          u(this._blocks[o], o, 0, this._blocks[o].displayValue.length);
        u(this._blocks[i.index], i.index, 0, i.offset);
      }
    }
  }
  remove(t, e) {
    t === void 0 && (t = 0), e === void 0 && (e = this.displayValue.length);
    const u = super.remove(t, e);
    return this._forEachBlocksInRange(t, e, (s, i, n, l) => {
      u.aggregate(s.remove(n, l));
    }), u;
  }
  nearestInputPos(t, e) {
    if (e === void 0 && (e = a.NONE), !this._blocks.length) return 0;
    const u = new T(this, t);
    if (e === a.NONE)
      return u.pushRightBeforeInput() || (u.popState(), u.pushLeftBeforeInput()) ? u.pos : this.displayValue.length;
    if (e === a.LEFT || e === a.FORCE_LEFT) {
      if (e === a.LEFT) {
        if (u.pushRightBeforeFilled(), u.ok && u.pos === t) return t;
        u.popState();
      }
      if (u.pushLeftBeforeInput(), u.pushLeftBeforeRequired(), u.pushLeftBeforeFilled(), e === a.LEFT) {
        if (u.pushRightBeforeInput(), u.pushRightBeforeRequired(), u.ok && u.pos <= t || (u.popState(), u.ok && u.pos <= t)) return u.pos;
        u.popState();
      }
      return u.ok ? u.pos : e === a.FORCE_LEFT ? 0 : (u.popState(), u.ok || (u.popState(), u.ok) ? u.pos : 0);
    }
    return e === a.RIGHT || e === a.FORCE_RIGHT ? (u.pushRightBeforeInput(), u.pushRightBeforeRequired(), u.pushRightBeforeFilled() ? u.pos : e === a.FORCE_RIGHT ? this.displayValue.length : (u.popState(), u.ok || (u.popState(), u.ok) ? u.pos : this.nearestInputPos(t, a.LEFT))) : t;
  }
  totalInputPositions(t, e) {
    t === void 0 && (t = 0), e === void 0 && (e = this.displayValue.length);
    let u = 0;
    return this._forEachBlocksInRange(t, e, (s, i, n, l) => {
      u += s.totalInputPositions(n, l);
    }), u;
  }
  /** Get block by name */
  maskedBlock(t) {
    return this.maskedBlocks(t)[0];
  }
  /** Get all blocks by name */
  maskedBlocks(t) {
    const e = this._maskedBlocks[t];
    return e ? e.map((u) => this._blocks[u]) : [];
  }
  pad(t) {
    const e = new h();
    return this._forEachBlocksInRange(0, this.displayValue.length, (u) => e.aggregate(u.pad(t))), e;
  }
}
p.DEFAULTS = {
  ...x.DEFAULTS,
  lazy: !0,
  placeholderChar: "_"
};
p.STOP_CHAR = "`";
p.ESCAPE_CHAR = "\\";
p.InputDefinition = B;
p.FixedDefinition = m;
C.MaskedPattern = p;
export {
  p as M
};
