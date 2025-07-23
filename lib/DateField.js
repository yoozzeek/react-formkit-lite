import { jsxs as d, jsx as l } from "react/jsx-runtime";
import { memo as m, useRef as s, useState as c } from "react";
import { u as h, S as k } from "./chunks/hook.B-4Upmdx.js";
import { c as a } from "./chunks/clsx.OuTLNxxd.js";
import { dateMask as b } from "./dateMask.js";
const t = {
  "date-field": "formkit-lite-date-field",
  "date-field--full": "formkit-lite-date-field--full",
  "date-field__label": "formkit-lite-date-field__label",
  "date-field__required": "formkit-lite-date-field__required",
  "date-field__wrapper": "formkit-lite-date-field__wrapper",
  "date-field__input": "formkit-lite-date-field__input",
  "date-field__input--error": "formkit-lite-date-field__input--error",
  "date-field__input--valid": "formkit-lite-date-field__input--valid",
  "date-field__reset-button": "formkit-lite-date-field__reset-button",
  "date-field__reset-icon": "formkit-lite-date-field__reset-icon",
  "date-field__error": "formkit-lite-date-field__error",
  "date-field__help": "formkit-lite-date-field__help"
}, v = (e) => {
  const r = s(null), [f, _] = c(!1), n = h(
    {
      mask: b
    },
    {
      ref: r,
      onComplete: (i) => {
        e.onChange?.(e.id, i, !0);
      }
    }
  );
  function o(i) {
    i.stopPropagation(), e.onReset?.(e.id, "", !0);
  }
  function u(i) {
    _(!0), e.onFocus?.(i);
  }
  return /* @__PURE__ */ d(
    "div",
    {
      className: a(t["date-field"], {
        [t["date-field--full"]]: e.fullWidth
      }),
      children: [
        e.label && /* @__PURE__ */ d("label", { htmlFor: e.id, className: t["date-field__label"], children: [
          e.label,
          e.required && /* @__PURE__ */ l("span", { className: t["date-field__required"], children: "*" })
        ] }),
        /* @__PURE__ */ d("div", { className: t["date-field__wrapper"], children: [
          /* @__PURE__ */ l(
            "input",
            {
              ref: n.ref,
              className: a(t["date-field__input"], {
                [t["date-field__input--error"]]: e.error,
                [t["date-field__input--valid"]]: !e.error
              }),
              type: "text",
              id: e.id,
              name: e.name,
              placeholder: e.placeholder || "MM-DD-YYYY",
              defaultValue: e.value,
              onFocus: u
            }
          ),
          e.value && f && /* @__PURE__ */ l(
            "button",
            {
              className: t["date-field__reset-button"],
              role: "button",
              onClick: o,
              children: /* @__PURE__ */ l(k, { className: t["date-field__reset-icon"] })
            }
          )
        ] }),
        e.error && /* @__PURE__ */ l("span", { className: t["date-field__error"], children: e.error }),
        e.helpText && /* @__PURE__ */ l("span", { className: t["date-field__help"], children: e.helpText })
      ]
    }
  );
}, D = m(v);
export {
  D as default
};
