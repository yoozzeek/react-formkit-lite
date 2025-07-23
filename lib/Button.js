import { jsx as i, jsxs as f, Fragment as _ } from "react/jsx-runtime";
import { c as u } from "./chunks/clsx.OuTLNxxd.js";
import k from "./Loader.js";
const h = "formkit-lite-button", w = "formkit-lite-spin", t = {
  button: h,
  "button--full-width": "formkit-lite-button--full-width",
  "button--loading": "formkit-lite-button--loading",
  "button--xxs": "formkit-lite-button--xxs",
  "button--xs": "formkit-lite-button--xs",
  "button--sm": "formkit-lite-button--sm",
  "button--md": "formkit-lite-button--md",
  "button--lg": "formkit-lite-button--lg",
  "button--xl": "formkit-lite-button--xl",
  "button--icon": "formkit-lite-button--icon",
  "button--success": "formkit-lite-button--success",
  "button--light": "formkit-lite-button--light",
  "button--outline-light": "formkit-lite-button--outline-light",
  "button--outline-green": "formkit-lite-button--outline-green",
  "button--outline-warning": "formkit-lite-button--outline-warning",
  "button--danger": "formkit-lite-button--danger",
  "button--warning": "formkit-lite-button--warning",
  "button--dark": "formkit-lite-button--dark",
  "button--gray": "formkit-lite-button--gray",
  "button--none": "formkit-lite-button--none",
  "button__loading-icon": "formkit-lite-button__loading-icon",
  spin: w,
  "button__loading-text": "formkit-lite-button__loading-text",
  "button__loading-icon--white": "formkit-lite-button__loading-icon--white",
  "button__loading-icon--dark": "formkit-lite-button__loading-icon--dark",
  "button__loading-icon--green": "formkit-lite-button__loading-icon--green",
  "button__loading-icon--warning": "formkit-lite-button__loading-icon--warning"
};
function C({
  fullWidth: e = !1,
  type: b = "button",
  size: r = "md",
  disabled: s = !1,
  loading: o = !1,
  loadingText: l,
  variant: n = "light",
  onClick: a,
  children: g
}) {
  const m = t[`button--${n}`], d = t[`button--${r}`], c = u(t["button__loading-icon"], {
    [t["button__loading-icon--white"]]: [
      "success",
      "danger",
      "warning",
      "outline-light"
    ].includes(n),
    [t["button__loading-icon--dark"]]: n === "light",
    [t["button__loading-icon--green"]]: n === "outline-green",
    [t["button__loading-icon--warning"]]: n === "outline-warning"
  });
  return /* @__PURE__ */ i(
    "button",
    {
      type: b,
      onClick: a,
      disabled: s || o,
      className: u(t.button, m, d, {
        [t["button--full-width"]]: e,
        [t["button--loading"]]: o
      }),
      children: o && n !== "none" ? /* @__PURE__ */ f(_, { children: [
        /* @__PURE__ */ i(k, { className: c }),
        l && /* @__PURE__ */ i("span", { className: t["button__loading-text"], children: l })
      ] }) : g
    }
  );
}
export {
  C as default
};
