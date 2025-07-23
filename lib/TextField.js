import { jsx as i, jsxs as R } from "react/jsx-runtime";
import { memo as se, useState as G, useMemo as J, useEffect as T, useRef as fe } from "react";
import { u as _e, S as de } from "./chunks/hook.B-4Upmdx.js";
import { M as oe } from "./chunks/dynamic.BOxkNYSY.js";
import { a as ne } from "./chunks/regexp.BA-GGPSE.js";
import { c as n } from "./chunks/clsx.OuTLNxxd.js";
const e = {
  "text-field": "formkit-lite-text-field",
  "text-field--full": "formkit-lite-text-field--full",
  "text-field__label": "formkit-lite-text-field__label",
  "text-field__required": "formkit-lite-text-field__required",
  "text-field__wrapper": "formkit-lite-text-field__wrapper",
  "text-field__wrapper--error": "formkit-lite-text-field__wrapper--error",
  "text-field__wrapper--disabled": "formkit-lite-text-field__wrapper--disabled",
  "text-field__wrapper--primary": "formkit-lite-text-field__wrapper--primary",
  "text-field__input": "formkit-lite-text-field__input",
  "text-field__textarea": "formkit-lite-text-field__textarea",
  "text-field__icon-left": "formkit-lite-text-field__icon-left",
  "text-field__icon-right": "formkit-lite-text-field__icon-right",
  "text-field__icon--compact": "formkit-lite-text-field__icon--compact",
  "text-field__icon-inner": "formkit-lite-text-field__icon-inner",
  "text-field__reset-button": "formkit-lite-text-field__reset-button",
  "text-field__reset-button--right": "formkit-lite-text-field__reset-button--right",
  "text-field__reset-button--right-icon": "formkit-lite-text-field__reset-button--right-icon",
  "text-field__reset-button--right-icon-custom": "formkit-lite-text-field__reset-button--right-icon-custom",
  "text-field__reset-icon": "formkit-lite-text-field__reset-icon",
  "text-field__error": "formkit-lite-text-field__error",
  "text-field__help": "formkit-lite-text-field__help"
};
function ae(l) {
  l.currentTarget.style.height = "6px", l.currentTarget.style.height = l.currentTarget.scrollHeight + "px";
}
const xe = ({
  id: l,
  label: $,
  value: f,
  name: a,
  error: m,
  initialValue: u,
  placeholder: k,
  leftIcon: _,
  rightIcon: s,
  autoCorrect: q,
  autoComplete: g,
  spellCheck: B,
  pattern: E,
  inputMode: S,
  isPrimary: V = !1,
  resetDisabled: j = !1,
  textareaAutoHeight: d = !1,
  customIconContainer: o = !1,
  type: h = "text",
  rows: N = 3,
  mask: w,
  helpText: O,
  required: K = !1,
  disabled: x = !1,
  textarea: c = !1,
  secure: P = !1,
  fullWidth: H = !1,
  iconCompact: p = !1,
  onReset: L,
  onChange: b,
  onComplete: Q,
  onFocus: X,
  onBlur: Y
}) => {
  const [U, v] = G(!1), z = J(
    () => !!f && U && !j,
    [f, U, j]
  );
  function A(t) {
    return new oe({
      mask: Array.isArray(t) ? t : t ? [t] : [
        {
          mask: new ne({
            mask: /.*/
          })
        }
      ]
    });
  }
  const [Z, W] = G({
    mask: A(w)
  });
  T(() => {
    W({
      mask: A(w)
    });
  }, [w]);
  const y = fe(null), { setValue: C, setUnmaskedValue: D } = _e(Z, {
    ref: y,
    onAccept: (t, r) => {
      b?.({
        target: { value: r.unmaskedValue, name: a }
      });
    },
    onComplete: (t, r) => {
      Q?.(r.unmaskedValue);
    }
  });
  T(() => {
    D(`${u}`);
  }, [u]), T(() => {
    D(`${f}`);
  }, [f]);
  const I = n(e["text-field__wrapper"], {
    [e["text-field__wrapper--error"]]: !!m,
    [e["text-field__wrapper--primary"]]: V,
    [e["text-field__wrapper--disabled"]]: x
  }), F = n(c ? e["text-field__textarea"] : e["text-field__input"]), ee = $ && /* @__PURE__ */ R("label", { htmlFor: l, className: e["text-field__label"], children: [
    $,
    K && /* @__PURE__ */ i("span", { className: e["text-field__required"], children: "*" })
  ] });
  function M(t) {
    if (v(!0), X?.(), d && c) {
      const r = t.target;
      r.style.height = "auto";
      const re = r.scrollHeight > 135 ? r.scrollHeight : 135;
      r.style.height = `${re}px`;
    }
  }
  function te(t) {
    if (t.stopPropagation(), v(!1), Y?.(), d && c) {
      const r = t.target;
      r.style.height = "100%";
    }
  }
  function ie(t) {
    t.stopPropagation(), C(""), L?.(l, "", !0);
  }
  const le = J(() => {
    if (c) {
      const t = {};
      return d && (t.onInput = ae), /* @__PURE__ */ i(
        "textarea",
        {
          ...t,
          id: l,
          name: a,
          value: f,
          rows: N,
          disabled: x,
          placeholder: k || void 0,
          className: F,
          style: {
            minHeight: d ? N * 1.5 + "rem" : "auto",
            maxHeight: d ? "360px" : "auto"
          },
          onChange: b,
          onFocus: M,
          onBlur: te
        }
      );
    }
    return h === "number" ? /* @__PURE__ */ i(
      "input",
      {
        id: l,
        name: a,
        value: f,
        type: h,
        disabled: x,
        autoComplete: g,
        placeholder: k || void 0,
        className: F,
        onChange: b,
        onFocus: M
      }
    ) : /* @__PURE__ */ i(
      "input",
      {
        ref: y,
        id: l,
        name: a,
        autoComplete: g,
        autoCorrect: q,
        spellCheck: B,
        pattern: E,
        disabled: x,
        className: F,
        inputMode: S,
        type: P ? "password" : h,
        placeholder: k || void 0,
        defaultValue: u,
        onFocus: M
      }
    );
  }, [
    c,
    d,
    l,
    a,
    f,
    N,
    x,
    k,
    H,
    V,
    _,
    p,
    s,
    m,
    z,
    h,
    y,
    g,
    q,
    B,
    E,
    S,
    P,
    u,
    b
  ]);
  return /* @__PURE__ */ R("div", { className: n(e["text-field"], { [e["text-field--full"]]: H }), children: [
    ee,
    /* @__PURE__ */ R("div", { className: I, children: [
      _ && !o && /* @__PURE__ */ i(
        "span",
        {
          className: n(e["text-field__icon-left"], {
            [e["text-field__icon--compact"]]: p
          }),
          children: p ? /* @__PURE__ */ i("span", { className: e["text-field__icon-inner"], children: _ }) : _
        }
      ),
      _ && o && _,
      le,
      s && !o && /* @__PURE__ */ i(
        "span",
        {
          className: n(e["text-field__icon-right"], {
            [e["text-field__icon--compact"]]: p
          }),
          children: p ? /* @__PURE__ */ i("span", { className: e["text-field__icon-inner"], children: s }) : s
        }
      ),
      s && o && s,
      z && /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          tabIndex: -1,
          onClick: ie,
          className: n(e["text-field__reset-button"], {
            [e["text-field__reset-button--right"]]: !s,
            [e["text-field__reset-button--right-icon"]]: s && !o,
            [e["text-field__reset-button--right-icon-custom"]]: s && o
          }),
          children: /* @__PURE__ */ i(de, { className: e["text-field__reset-icon"] })
        }
      )
    ] }),
    m && /* @__PURE__ */ i("span", { className: e["text-field__error"], children: m }),
    O && /* @__PURE__ */ i("span", { className: e["text-field__help"], children: O })
  ] });
}, be = se(xe);
export {
  be as default
};
