import { jsxs as f, jsx as i } from "react/jsx-runtime";
import * as o from "react";
import { c as b } from "./chunks/clsx.OuTLNxxd.js";
const k = (a) => /* @__PURE__ */ o.createElement("svg", { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ o.createElement("path", { d: "M14.9498 6.46443C15.3403 6.07391 15.3403 5.44074 14.9498 5.05022C14.5593 4.65969 13.9261 4.65969 13.5356 5.05022L14.9498 6.46443ZM5.05029 13.5355C4.65976 13.926 4.65976 14.5592 5.05029 14.9497C5.44081 15.3402 6.07398 15.3402 6.4645 14.9497L5.05029 13.5355ZM13.5356 5.05022L5.05029 13.5355L6.4645 14.9497L14.9498 6.46443L13.5356 5.05022Z", fill: "currentColor" }), /* @__PURE__ */ o.createElement("path", { d: "M13.5356 14.9498C13.9261 15.3403 14.5593 15.3403 14.9498 14.9498C15.3403 14.5593 15.3403 13.9261 14.9498 13.5356L13.5356 14.9498ZM6.4645 5.05029C6.07398 4.65976 5.44081 4.65976 5.05029 5.05029C4.65976 5.44081 4.65976 6.07398 5.05029 6.4645L6.4645 5.05029ZM14.9498 13.5356L6.4645 5.05029L5.05029 6.4645L13.5356 14.9498L14.9498 13.5356Z", fill: "currentColor" })), v = "formkit-lite-badge", h = "formkit-lite-badge__icon", C = "formkit-lite-badge__remove", e = {
  badge: v,
  "badge--clickable": "formkit-lite-badge--clickable",
  badge__icon: h,
  badge__remove: C,
  "badge__remove-icon": "formkit-lite-badge__remove-icon",
  "badge--light": "formkit-lite-badge--light",
  "badge--dark": "formkit-lite-badge--dark",
  "badge--selected": "formkit-lite-badge--selected",
  "badge--success": "formkit-lite-badge--success",
  "badge--danger": "formkit-lite-badge--danger",
  "badge--warning": "formkit-lite-badge--warning",
  "badge--info": "formkit-lite-badge--info",
  "badge--primary": "formkit-lite-badge--primary",
  "badge--black": "formkit-lite-badge--black",
  "badge__remove--light": "formkit-lite-badge__remove--light",
  "badge__remove--dark": "formkit-lite-badge__remove--dark"
};
function u({
  id: a,
  icon: r,
  variant: l = "light",
  onClick: g,
  onRemove: d,
  selected: t = !1,
  children: c
}) {
  function m() {
    a && g?.(a);
  }
  function n() {
    a && d?.(a);
  }
  const s = b(e.badge, e[`badge--${l}`], {
    [e["badge--selected"]]: t && l === "light",
    [e["badge--clickable"]]: !!g
  }), _ = b(e.badge__remove, {
    [e["badge__remove--light"]]: !t,
    [e["badge__remove--dark"]]: t
  });
  return /* @__PURE__ */ f("span", { className: s, onClick: m, children: [
    r && /* @__PURE__ */ i("span", { className: e.badge__icon, children: r }),
    c,
    d && /* @__PURE__ */ i("button", { type: "button", className: _, onClick: n, children: /* @__PURE__ */ i(k, { className: e["badge__remove-icon"] }) })
  ] });
}
export {
  u as default
};
