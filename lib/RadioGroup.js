import { jsxs as l, jsx as r } from "react/jsx-runtime";
import { s as o } from "./chunks/radio.module.CWgpSq2v.js";
const t = ({ ariaLabel: s = "radio-group", label: e, error: a, children: i }) => /* @__PURE__ */ l("div", { role: "group", "aria-labelledby": s || "radio-group", children: [
  /* @__PURE__ */ r("span", { className: o["radio-group__label"], children: e }),
  /* @__PURE__ */ r("div", { className: o["radio-group__content"], children: i }),
  a && /* @__PURE__ */ r("p", { className: o["radio-group__error"], children: a })
] });
export {
  t as default
};
