import { jsxs as n, jsx as f } from "react/jsx-runtime";
import { s as o } from "./chunks/radio.module.CWgpSq2v.js";
import { memo as _, useMemo as l } from "react";
import { c as t } from "./chunks/clsx.OuTLNxxd.js";
const u = ({
  name: m,
  value: i,
  label: s,
  disabled: a = !1,
  lightVariant: e = !1,
  checkedValue: r,
  onChange: p,
  onFocus: c
}) => {
  const d = l(
    () => r ? r === i : !1,
    [r, i]
  );
  return /* @__PURE__ */ n(
    "label",
    {
      className: t(o.radio, {
        [o["radio--disabled"]]: a,
        [o["radio--checked"]]: d,
        [o["radio--unchecked"]]: !d
      }),
      children: [
        /* @__PURE__ */ f(
          "input",
          {
            className: t(o.radio__input, {
              [o["radio__input--spaced"]]: s,
              [o["radio__input--primary"]]: !e,
              [o["radio__input--light"]]: e
            }),
            disabled: a,
            checked: d,
            type: "radio",
            name: m,
            value: i,
            onChange: p,
            onFocus: c
          }
        ),
        s && s
      ]
    }
  );
}, k = _(u);
export {
  k as default
};
