import { jsxs as m, jsx as l } from "react/jsx-runtime";
import { useState as b, useEffect as _ } from "react";
import { c as i } from "./chunks/clsx.OuTLNxxd.js";
const C = "formkit-lite-range", D = "formkit-lite-range__label", T = "formkit-lite-range__placeholder", v = "formkit-lite-range__input", e = {
  range: C,
  "range--disabled": "formkit-lite-range--disabled",
  range__label: D,
  range__placeholder: T,
  "range__placeholder--left": "formkit-lite-range__placeholder--left",
  "range__placeholder--right": "formkit-lite-range__placeholder--right",
  range__input: v
};
function y(n, a) {
  const [t, o] = b(n);
  return _(() => {
    const r = setTimeout(() => {
      o(n);
    }, a);
    return () => {
      clearTimeout(r);
    };
  }, [n, a]), t;
}
const S = ({
  id: n,
  name: a,
  min: t = 0,
  max: o = 100,
  minPlaceholder: r,
  maxPlaceholder: g,
  step: k = 1,
  label: d,
  disabled: u = !1,
  value: c,
  onValueChange: N,
  onFocus: V
}) => {
  const [h, p] = b(c), f = y(h, 50);
  _(() => {
    p(c);
  }, [c]), _(() => {
    N?.(f);
  }, [f]);
  function F(s) {
    const { value: j } = s.target;
    p(Number(j));
  }
  function x(s) {
    V?.(s);
  }
  return /* @__PURE__ */ m("div", { children: [
    !!d && /* @__PURE__ */ l("label", { htmlFor: n, className: e.range__label, children: d }),
    /* @__PURE__ */ m(
      "div",
      {
        className: i(e.range, {
          [e["range--disabled"]]: u
        }),
        children: [
          r && /* @__PURE__ */ l("span", { className: i(e.range__placeholder, e["range__placeholder--left"]), children: r }),
          /* @__PURE__ */ l(
            "input",
            {
              id: n,
              name: a,
              type: "range",
              value: h,
              min: t,
              max: o,
              step: k,
              disabled: u,
              onChange: F,
              onFocus: x,
              className: e.range__input
            }
          ),
          g && /* @__PURE__ */ l("span", { className: i(e.range__placeholder, e["range__placeholder--right"]), children: g })
        ]
      }
    )
  ] });
};
export {
  S as default
};
