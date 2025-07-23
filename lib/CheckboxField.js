import { jsxs as m, jsx as c } from "react/jsx-runtime";
import { memo as u, useState as k } from "react";
import { c as o } from "./chunks/clsx.OuTLNxxd.js";
import { S as p } from "./chunks/check.CVlx_FHE.js";
import { s as e } from "./chunks/checkbox.module.OHeevofR.js";
const N = ({
  id: h,
  name: n,
  label: d,
  value: s,
  isGroup: x,
  rightSideLabel: f,
  disabled: l,
  onClick: _,
  onFocus: b
}) => {
  const [r, a] = k(!1), [i, t] = k(!1);
  return /* @__PURE__ */ m(
    "div",
    {
      className: o(e["checkbox-field"], {
        [e["checkbox-field--group"]]: x,
        [e["checkbox-field--right-label"]]: f,
        [e["checkbox-field--disabled"]]: l
      }),
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ c(
          "input",
          {
            id: h,
            name: n,
            className: e["checkbox-field__input"],
            type: "checkbox",
            checked: s,
            disabled: l,
            onFocus: () => {
              t(!0), b?.();
            },
            onBlur: () => t(!1),
            onChange: () => {
              _?.(!s);
            }
          }
        ),
        d && /* @__PURE__ */ c(
          "label",
          {
            htmlFor: h,
            className: o(
              e["checkbox-field__label"],
              f ? e["checkbox-field__label--right"] : e["checkbox-field__label--left"]
            ),
            children: d
          }
        ),
        s ? /* @__PURE__ */ c(
          "span",
          {
            className: o(e["checkbox-field__checked"], {
              [e["checkbox-field__checked--hovered"]]: r && !l
            }),
            children: /* @__PURE__ */ c(p, { className: e["checkbox-field__check-icon"] })
          }
        ) : /* @__PURE__ */ c(
          "span",
          {
            className: o(e["checkbox-field__unchecked"], {
              [e["checkbox-field__unchecked--hovered"]]: r && !i,
              [e["checkbox-field__unchecked--focused"]]: i
            })
          }
        )
      ]
    }
  );
}, y = u(N);
export {
  y as default
};
