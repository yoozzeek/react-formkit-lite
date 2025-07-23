import { jsxs as p, jsx as t } from "react/jsx-runtime";
import { s as e } from "./chunks/select.module.BEKfY6EC.js";
import { memo as x, useState as v } from "react";
import { c as m } from "./chunks/clsx.OuTLNxxd.js";
import { S as N } from "./chunks/check.CVlx_FHE.js";
function S({
  label: i,
  value: f,
  classes: s,
  helpText: c,
  iconEl: n,
  badgeIconEl: _,
  rawData: h,
  disabled: l = !1,
  selected: o = !1,
  onSelect: u
}) {
  const [r, a] = v(!1);
  function d(k) {
    k.stopPropagation(), u({
      label: i,
      value: f,
      classes: s,
      helpText: c,
      iconEl: n,
      badgeIconEl: _,
      rawData: h,
      selected: !o
    });
  }
  return /* @__PURE__ */ p(
    "div",
    {
      className: m(e["select-option"], {
        "cursor-pointer": !l,
        [e["select-option--disabled"]]: l && !o,
        [s || ""]: !!s
      }),
      onClick: d,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      children: [
        /* @__PURE__ */ p("div", { className: "flex flex-1 items-center", children: [
          n && /* @__PURE__ */ t("span", { className: e["select-option__icon"], children: n }),
          i
        ] }),
        c && /* @__PURE__ */ t("span", { className: e["select-option__help"], children: c }),
        /* @__PURE__ */ t(
          "span",
          {
            className: m(e["select-option__checkbox"], {
              [e["select-option__checkbox--selected"]]: o && !r,
              [e["select-option__checkbox--hovered"]]: o && r,
              [e["select-option__checkbox--unselected"]]: !o
            }),
            children: o && /* @__PURE__ */ t(N, { className: e["select-option__check-icon"] })
          }
        )
      ]
    }
  );
}
const O = x(S);
export {
  O as default
};
