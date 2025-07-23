import * as T from "react";
import { useRef as O, useState as k, useCallback as E, useEffect as g } from "react";
import { D as p, I as d, c as x, m as N } from "./regexp.BA-GGPSE.js";
const B = (r) => /* @__PURE__ */ T.createElement("svg", { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...r }, /* @__PURE__ */ T.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M13.707 12.2933C14.098 12.6842 14.098 13.3162 13.707 13.7073C13.512 13.9023 13.256 14.0002 13 14.0002C12.744 14.0002 12.488 13.9023 12.293 13.7073L10 11.4142L7.70701 13.7073C7.51201 13.9023 7.25601 14.0002 7.00001 14.0002C6.74401 14.0002 6.48801 13.9023 6.29301 13.7073C5.90201 13.3162 5.90201 12.6842 6.29301 12.2933L8.58601 10.0002L6.29301 7.70725C5.90201 7.31625 5.90201 6.68425 6.29301 6.29325C6.68401 5.90225 7.31601 5.90225 7.70701 6.29325L10 8.58625L12.293 6.29325C12.684 5.90225 13.316 5.90225 13.707 6.29325C14.098 6.68425 14.098 7.31625 13.707 7.70725L11.414 10.0002L13.707 12.2933ZM10 2C5.582 2 2 5.582 2 10C2 14.418 5.582 18 10 18C14.418 18 18 14.418 18 10C18 5.582 14.418 2 10 2Z", fill: "currentColor" }));
class U {
  /** Current input value */
  /** Current cursor position */
  /** Old input value */
  /** Old selection */
  constructor(t) {
    for (Object.assign(this, t); this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos); )
      --this.oldSelection.start;
    if (this.insertedCount)
      for (; this.value.slice(this.cursorPos) !== this.oldValue.slice(this.oldSelection.end); )
        this.value.length - this.cursorPos < this.oldValue.length - this.oldSelection.end ? ++this.oldSelection.end : ++this.cursorPos;
  }
  /** Start changing position */
  get startChangePos() {
    return Math.min(this.cursorPos, this.oldSelection.start);
  }
  /** Inserted symbols count */
  get insertedCount() {
    return this.cursorPos - this.startChangePos;
  }
  /** Inserted symbols */
  get inserted() {
    return this.value.substr(this.startChangePos, this.insertedCount);
  }
  /** Removed symbols count */
  get removedCount() {
    return Math.max(this.oldSelection.end - this.startChangePos || // for Delete
    this.oldValue.length - this.value.length, 0);
  }
  /** Removed symbols */
  get removed() {
    return this.oldValue.substr(this.startChangePos, this.removedCount);
  }
  /** Unchanged head symbols */
  get head() {
    return this.value.substring(0, this.startChangePos);
  }
  /** Unchanged tail symbols */
  get tail() {
    return this.value.substring(this.startChangePos + this.insertedCount);
  }
  /** Remove direction */
  get removeDirection() {
    return !this.removedCount || this.insertedCount ? p.NONE : (this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos) && // if not range removed (event with backspace)
    this.oldSelection.end === this.oldSelection.start ? p.RIGHT : p.LEFT;
  }
}
class L {
  /** */
  /** */
  /** */
  /** Safely returns selection start */
  get selectionStart() {
    let t;
    try {
      t = this._unsafeSelectionStart;
    } catch {
    }
    return t ?? this.value.length;
  }
  /** Safely returns selection end */
  get selectionEnd() {
    let t;
    try {
      t = this._unsafeSelectionEnd;
    } catch {
    }
    return t ?? this.value.length;
  }
  /** Safely sets element selection */
  select(t, e) {
    if (!(t == null || e == null || t === this.selectionStart && e === this.selectionEnd))
      try {
        this._unsafeSelect(t, e);
      } catch {
      }
  }
  /** */
  get isActive() {
    return !1;
  }
  /** */
  /** */
  /** */
}
d.MaskElement = L;
const A = 90, K = 89;
class V extends L {
  /** HTMLElement to use mask on */
  constructor(t) {
    super(), this.input = t, this._onKeydown = this._onKeydown.bind(this), this._onInput = this._onInput.bind(this), this._onBeforeinput = this._onBeforeinput.bind(this), this._onCompositionEnd = this._onCompositionEnd.bind(this);
  }
  get rootElement() {
    var t, e, s;
    return (t = (e = (s = this.input).getRootNode) == null ? void 0 : e.call(s)) != null ? t : document;
  }
  /** Is element in focus */
  get isActive() {
    return this.input === this.rootElement.activeElement;
  }
  /** Binds HTMLElement events to mask internal events */
  bindEvents(t) {
    this.input.addEventListener("keydown", this._onKeydown), this.input.addEventListener("input", this._onInput), this.input.addEventListener("beforeinput", this._onBeforeinput), this.input.addEventListener("compositionend", this._onCompositionEnd), this.input.addEventListener("drop", t.drop), this.input.addEventListener("click", t.click), this.input.addEventListener("focus", t.focus), this.input.addEventListener("blur", t.commit), this._handlers = t;
  }
  _onKeydown(t) {
    if (this._handlers.redo && (t.keyCode === A && t.shiftKey && (t.metaKey || t.ctrlKey) || t.keyCode === K && t.ctrlKey))
      return t.preventDefault(), this._handlers.redo(t);
    if (this._handlers.undo && t.keyCode === A && (t.metaKey || t.ctrlKey))
      return t.preventDefault(), this._handlers.undo(t);
    t.isComposing || this._handlers.selectionChange(t);
  }
  _onBeforeinput(t) {
    if (t.inputType === "historyUndo" && this._handlers.undo)
      return t.preventDefault(), this._handlers.undo(t);
    if (t.inputType === "historyRedo" && this._handlers.redo)
      return t.preventDefault(), this._handlers.redo(t);
  }
  _onCompositionEnd(t) {
    this._handlers.input(t);
  }
  _onInput(t) {
    t.isComposing || this._handlers.input(t);
  }
  /** Unbinds HTMLElement events to mask internal events */
  unbindEvents() {
    this.input.removeEventListener("keydown", this._onKeydown), this.input.removeEventListener("input", this._onInput), this.input.removeEventListener("beforeinput", this._onBeforeinput), this.input.removeEventListener("compositionend", this._onCompositionEnd), this.input.removeEventListener("drop", this._handlers.drop), this.input.removeEventListener("click", this._handlers.click), this.input.removeEventListener("focus", this._handlers.focus), this.input.removeEventListener("blur", this._handlers.commit), this._handlers = {};
  }
}
d.HTMLMaskElement = V;
class H extends V {
  /** InputElement to use mask on */
  constructor(t) {
    super(t), this.input = t;
  }
  /** Returns InputElement selection start */
  get _unsafeSelectionStart() {
    return this.input.selectionStart != null ? this.input.selectionStart : this.value.length;
  }
  /** Returns InputElement selection end */
  get _unsafeSelectionEnd() {
    return this.input.selectionEnd;
  }
  /** Sets InputElement selection */
  _unsafeSelect(t, e) {
    this.input.setSelectionRange(t, e);
  }
  get value() {
    return this.input.value;
  }
  set value(t) {
    this.input.value = t;
  }
}
d.HTMLMaskElement = V;
class D extends V {
  /** Returns HTMLElement selection start */
  get _unsafeSelectionStart() {
    const t = this.rootElement, e = t.getSelection && t.getSelection(), s = e && e.anchorOffset, i = e && e.focusOffset;
    return i == null || s == null || s < i ? s : i;
  }
  /** Returns HTMLElement selection end */
  get _unsafeSelectionEnd() {
    const t = this.rootElement, e = t.getSelection && t.getSelection(), s = e && e.anchorOffset, i = e && e.focusOffset;
    return i == null || s == null || s > i ? s : i;
  }
  /** Sets HTMLElement selection */
  _unsafeSelect(t, e) {
    if (!this.rootElement.createRange) return;
    const s = this.rootElement.createRange();
    s.setStart(this.input.firstChild || this.input, t), s.setEnd(this.input.lastChild || this.input, e);
    const i = this.rootElement, o = i.getSelection && i.getSelection();
    o && (o.removeAllRanges(), o.addRange(s));
  }
  /** HTMLElement value */
  get value() {
    return this.input.textContent || "";
  }
  set value(t) {
    this.input.textContent = t;
  }
}
d.HTMLContenteditableMaskElement = D;
class y {
  constructor() {
    this.states = [], this.currentIndex = 0;
  }
  get currentState() {
    return this.states[this.currentIndex];
  }
  get isEmpty() {
    return this.states.length === 0;
  }
  push(t) {
    this.currentIndex < this.states.length - 1 && (this.states.length = this.currentIndex + 1), this.states.push(t), this.states.length > y.MAX_LENGTH && this.states.shift(), this.currentIndex = this.states.length - 1;
  }
  go(t) {
    return this.currentIndex = Math.min(Math.max(this.currentIndex + t, 0), this.states.length - 1), this.currentState;
  }
  undo() {
    return this.go(-1);
  }
  redo() {
    return this.go(1);
  }
  clear() {
    this.states.length = 0, this.currentIndex = 0;
  }
}
y.MAX_LENGTH = 100;
class F {
  /**
    View element
  */
  /** Internal {@link Masked} model */
  constructor(t, e) {
    this.el = t instanceof L ? t : t.isContentEditable && t.tagName !== "INPUT" && t.tagName !== "TEXTAREA" ? new D(t) : new H(t), this.masked = x(e), this._listeners = {}, this._value = "", this._unmaskedValue = "", this._rawInputValue = "", this.history = new y(), this._saveSelection = this._saveSelection.bind(this), this._onInput = this._onInput.bind(this), this._onChange = this._onChange.bind(this), this._onDrop = this._onDrop.bind(this), this._onFocus = this._onFocus.bind(this), this._onClick = this._onClick.bind(this), this._onUndo = this._onUndo.bind(this), this._onRedo = this._onRedo.bind(this), this.alignCursor = this.alignCursor.bind(this), this.alignCursorFriendly = this.alignCursorFriendly.bind(this), this._bindEvents(), this.updateValue(), this._onChange();
  }
  maskEquals(t) {
    var e;
    return t == null || ((e = this.masked) == null ? void 0 : e.maskEquals(t));
  }
  /** Masked */
  get mask() {
    return this.masked.mask;
  }
  set mask(t) {
    if (this.maskEquals(t)) return;
    if (!(t instanceof d.Masked) && this.masked.constructor === N(t)) {
      this.masked.updateOptions({
        mask: t
      });
      return;
    }
    const e = t instanceof d.Masked ? t : x({
      mask: t
    });
    e.unmaskedValue = this.masked.unmaskedValue, this.masked = e;
  }
  /** Raw value */
  get value() {
    return this._value;
  }
  set value(t) {
    this.value !== t && (this.masked.value = t, this.updateControl("auto"));
  }
  /** Unmasked value */
  get unmaskedValue() {
    return this._unmaskedValue;
  }
  set unmaskedValue(t) {
    this.unmaskedValue !== t && (this.masked.unmaskedValue = t, this.updateControl("auto"));
  }
  /** Raw input value */
  get rawInputValue() {
    return this._rawInputValue;
  }
  set rawInputValue(t) {
    this.rawInputValue !== t && (this.masked.rawInputValue = t, this.updateControl(), this.alignCursor());
  }
  /** Typed unmasked value */
  get typedValue() {
    return this.masked.typedValue;
  }
  set typedValue(t) {
    this.masked.typedValueEquals(t) || (this.masked.typedValue = t, this.updateControl("auto"));
  }
  /** Display value */
  get displayValue() {
    return this.masked.displayValue;
  }
  /** Starts listening to element events */
  _bindEvents() {
    this.el.bindEvents({
      selectionChange: this._saveSelection,
      input: this._onInput,
      drop: this._onDrop,
      click: this._onClick,
      focus: this._onFocus,
      commit: this._onChange,
      undo: this._onUndo,
      redo: this._onRedo
    });
  }
  /** Stops listening to element events */
  _unbindEvents() {
    this.el && this.el.unbindEvents();
  }
  /** Fires custom event */
  _fireEvent(t, e) {
    const s = this._listeners[t];
    s && s.forEach((i) => i(e));
  }
  /** Current selection start */
  get selectionStart() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
  }
  /** Current cursor position */
  get cursorPos() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
  }
  set cursorPos(t) {
    !this.el || !this.el.isActive || (this.el.select(t, t), this._saveSelection());
  }
  /** Stores current selection */
  _saveSelection() {
    this.displayValue !== this.el.value && console.warn("Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly."), this._selection = {
      start: this.selectionStart,
      end: this.cursorPos
    };
  }
  /** Syncronizes model value from view */
  updateValue() {
    this.masked.value = this.el.value, this._value = this.masked.value, this._unmaskedValue = this.masked.unmaskedValue, this._rawInputValue = this.masked.rawInputValue;
  }
  /** Syncronizes view from model value, fires change events */
  updateControl(t) {
    const e = this.masked.unmaskedValue, s = this.masked.value, i = this.masked.rawInputValue, o = this.displayValue, h = this.unmaskedValue !== e || this.value !== s || this._rawInputValue !== i;
    this._unmaskedValue = e, this._value = s, this._rawInputValue = i, this.el.value !== o && (this.el.value = o), t === "auto" ? this.alignCursor() : t != null && (this.cursorPos = t), h && this._fireChangeEvents(), !this._historyChanging && (h || this.history.isEmpty) && this.history.push({
      unmaskedValue: e,
      selection: {
        start: this.selectionStart,
        end: this.cursorPos
      }
    });
  }
  /** Updates options with deep equal check, recreates {@link Masked} model if mask type changes */
  updateOptions(t) {
    const {
      mask: e,
      ...s
    } = t, i = !this.maskEquals(e), o = this.masked.optionsIsChanged(s);
    i && (this.mask = e), o && this.masked.updateOptions(s), (i || o) && this.updateControl();
  }
  /** Updates cursor */
  updateCursor(t) {
    t != null && (this.cursorPos = t, this._delayUpdateCursor(t));
  }
  /** Delays cursor update to support mobile browsers */
  _delayUpdateCursor(t) {
    this._abortUpdateCursor(), this._changingCursorPos = t, this._cursorChanging = setTimeout(() => {
      this.el && (this.cursorPos = this._changingCursorPos, this._abortUpdateCursor());
    }, 10);
  }
  /** Fires custom events */
  _fireChangeEvents() {
    this._fireEvent("accept", this._inputEvent), this.masked.isComplete && this._fireEvent("complete", this._inputEvent);
  }
  /** Aborts delayed cursor update */
  _abortUpdateCursor() {
    this._cursorChanging && (clearTimeout(this._cursorChanging), delete this._cursorChanging);
  }
  /** Aligns cursor to nearest available position */
  alignCursor() {
    this.cursorPos = this.masked.nearestInputPos(this.masked.nearestInputPos(this.cursorPos, p.LEFT));
  }
  /** Aligns cursor only if selection is empty */
  alignCursorFriendly() {
    this.selectionStart === this.cursorPos && this.alignCursor();
  }
  /** Adds listener on custom event */
  on(t, e) {
    return this._listeners[t] || (this._listeners[t] = []), this._listeners[t].push(e), this;
  }
  /** Removes custom event listener */
  off(t, e) {
    if (!this._listeners[t]) return this;
    if (!e)
      return delete this._listeners[t], this;
    const s = this._listeners[t].indexOf(e);
    return s >= 0 && this._listeners[t].splice(s, 1), this;
  }
  /** Handles view input event */
  _onInput(t) {
    this._inputEvent = t, this._abortUpdateCursor();
    const e = new U({
      // new state
      value: this.el.value,
      cursorPos: this.cursorPos,
      // old state
      oldValue: this.displayValue,
      oldSelection: this._selection
    }), s = this.masked.rawInputValue, i = this.masked.splice(e.startChangePos, e.removed.length, e.inserted, e.removeDirection, {
      input: !0,
      raw: !0
    }).offset, o = s === this.masked.rawInputValue ? e.removeDirection : p.NONE;
    let h = this.masked.nearestInputPos(e.startChangePos + i, o);
    o !== p.NONE && (h = this.masked.nearestInputPos(h, p.NONE)), this.updateControl(h), delete this._inputEvent;
  }
  /** Handles view change event and commits model value */
  _onChange() {
    this.displayValue !== this.el.value && this.updateValue(), this.masked.doCommit(), this.updateControl(), this._saveSelection();
  }
  /** Handles view drop event, prevents by default */
  _onDrop(t) {
    t.preventDefault(), t.stopPropagation();
  }
  /** Restore last selection on focus */
  _onFocus(t) {
    this.alignCursorFriendly();
  }
  /** Restore last selection on focus */
  _onClick(t) {
    this.alignCursorFriendly();
  }
  _onUndo() {
    this._applyHistoryState(this.history.undo());
  }
  _onRedo() {
    this._applyHistoryState(this.history.redo());
  }
  _applyHistoryState(t) {
    t && (this._historyChanging = !0, this.unmaskedValue = t.unmaskedValue, this.el.select(t.selection.start, t.selection.end), this._saveSelection(), this._historyChanging = !1);
  }
  /** Unbind view events and removes element reference */
  destroy() {
    this._unbindEvents(), this._listeners.length = 0, delete this.el;
  }
}
d.InputMask = F;
function G(r, t) {
  let {
    onAccept: e,
    onComplete: s,
    ref: i = O(null),
    defaultValue: o,
    defaultUnmaskedValue: h,
    defaultTypedValue: M
  } = t === void 0 ? {} : t;
  const a = O(null), [S, v] = k({}), [m, I] = k(""), [f, w] = k(""), [_, b] = k(), C = E(() => {
    var n;
    (n = a.current) == null || n.destroy(), a.current = null;
  }, []), R = E(() => {
    const n = a.current;
    n && (v({
      value: n.value,
      unmaskedValue: n.unmaskedValue,
      typedValue: n.typedValue
    }), b(n.typedValue), w(n.unmaskedValue), I(n.value));
  }, []), c = E((n) => {
    const u = a.current;
    u && (R(), e?.(u.value, u, n));
  }, [e]), P = E((n) => a.current && s?.(a.current.value, a.current, n), [s]);
  return g(() => {
    const {
      value: n,
      ...u
    } = S, l = a.current;
    !l || m === void 0 || (n !== m && (l.value = m, l.value !== m && c()), v(u));
  }, [m]), g(() => {
    const {
      unmaskedValue: n,
      ...u
    } = S, l = a.current;
    !l || f === void 0 || (n !== f && (l.unmaskedValue = f, l.unmaskedValue !== f && c()), v(u));
  }, [f]), g(() => {
    const {
      typedValue: n,
      ...u
    } = S, l = a.current;
    !l || _ === void 0 || (n !== _ && (l.typedValue = _, l.masked.typedValueEquals(_) || c()), v(u));
  }, [_]), g(() => {
    const n = i.current;
    if (!n || !(r != null && r.mask)) return C();
    const u = a.current;
    u ? u?.updateOptions(r) : n && r != null && r.mask && (a.current = d(n, r), R(), o !== void 0 && I(o), h !== void 0 && w(h), M !== void 0 && b(M));
  }, [r, C, c]), g(() => {
    if (!a.current) return;
    const n = a.current;
    return n.on("accept", c), n.on("complete", P), () => {
      n.off("accept", c), n.off("complete", P);
    };
  }, [c, P]), g(() => C, [C]), {
    ref: i,
    maskRef: a,
    value: m,
    setValue: I,
    unmaskedValue: f,
    setUnmaskedValue: w,
    typedValue: _,
    setTypedValue: b
  };
}
export {
  B as S,
  G as u
};
