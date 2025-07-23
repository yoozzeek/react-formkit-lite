import { jsxs as s, jsx as l } from "react/jsx-runtime";
import * as a from "react";
import { c as d } from "./chunks/clsx.OuTLNxxd.js";
const m = (o) => /* @__PURE__ */ a.createElement("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...o }, /* @__PURE__ */ a.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M0 12C0 5.37258 5.37258 0 12 0C12.8284 0 13.5 0.671573 13.5 1.5C13.5 2.32843 12.8284 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.1716 21.6716 10.5 22.5 10.5C23.3284 10.5 24 11.1716 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z", fill: "currentColor" })), n = "formkit-lite-loader", c = "formkit-lite-loader__icon", x = "formkit-lite-loader__text", e = {
  loader: n,
  loader__icon: c,
  "loader__icon--sm": "formkit-lite-loader__icon--sm",
  "loader__icon--md": "formkit-lite-loader__icon--md",
  "loader__icon--lg": "formkit-lite-loader__icon--lg",
  loader__text: x,
  "loader__text--sm": "formkit-lite-loader__text--sm",
  "loader__text--md": "formkit-lite-loader__text--md",
  "loader__sr-only": "formkit-lite-loader__sr-only"
}, g = ({
  className: o,
  size: t = "md",
  text: r
}) => {
  const _ = {
    sm: e["loader__icon--sm"],
    md: e["loader__icon--md"],
    lg: e["loader__icon--lg"]
  }[t], i = {
    sm: e["loader__text--sm"],
    md: e["loader__text--md"],
    lg: e["loader__text--md"]
  }[t];
  return /* @__PURE__ */ s("div", { className: e.loader, children: [
    /* @__PURE__ */ l(m, { className: d(e.loader__icon, _, o) }),
    r && /* @__PURE__ */ l("span", { className: d(e.loader__text, i), children: r }),
    /* @__PURE__ */ l("span", { className: e["loader__sr-only"], children: "Loading..." })
  ] });
};
export {
  g as default
};
