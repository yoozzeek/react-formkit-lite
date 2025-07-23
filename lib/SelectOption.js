import { jsxs as c, jsx as l } from "react/jsx-runtime";
import { s as e } from "./chunks/select.module.BEKfY6EC.js";
import { memo as S } from "react";
import { c as g } from "./chunks/clsx.OuTLNxxd.js";
function h({
  label: s,
  value: r,
  classes: t,
  helpText: o,
  iconEl: n,
  badgeIconEl: a,
  rawData: m,
  selected: i = !1,
  onSelect: p
}) {
  function f(d) {
    d.stopPropagation(), p({
      label: s,
      value: r,
      classes: t,
      helpText: o,
      iconEl: n,
      badgeIconEl: a,
      rawData: m,
      selected: !i
    });
  }
  return /* @__PURE__ */ c(
    "div",
    {
      className: g(e["select-option"], {
        [e["select-option--single-selected"]]: i,
        [t || ""]: !!t
      }),
      onClick: f,
      children: [
        /* @__PURE__ */ c("div", { className: "flex flex-1 items-center", children: [
          n && /* @__PURE__ */ l("span", { className: e["select-option__icon"], children: n }),
          s
        ] }),
        o && /* @__PURE__ */ l("span", { className: e["select-option__help"], children: o })
      ]
    }
  );
}
const j = S(h);
export {
  j as default
};
