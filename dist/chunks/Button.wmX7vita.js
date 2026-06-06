import { t as e } from "./Loader.DI5rvy7C.js";
import { clsx as t } from "clsx";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
var a = {
	button: "formkit-lite-button",
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
	spin: "formkit-lite-spin",
	"button__loading-text": "formkit-lite-button__loading-text",
	"button__loading-icon--white": "formkit-lite-button__loading-icon--white",
	"button__loading-icon--dark": "formkit-lite-button__loading-icon--dark",
	"button__loading-icon--green": "formkit-lite-button__loading-icon--green",
	"button__loading-icon--warning": "formkit-lite-button__loading-icon--warning"
};
//#endregion
//#region src/components/Button/Button.tsx
function o({ fullWidth: o = !1, type: s = "button", size: c = "md", disabled: l = !1, loading: u = !1, loadingText: d, variant: f = "light", onClick: p, children: m }) {
	let h = a[`button--${f}`], g = a[`button--${c}`], _ = t(a["button__loading-icon"], {
		[a["button__loading-icon--white"]]: [
			"success",
			"danger",
			"warning",
			"outline-light"
		].includes(f),
		[a["button__loading-icon--dark"]]: f === "light",
		[a["button__loading-icon--green"]]: f === "outline-green",
		[a["button__loading-icon--warning"]]: f === "outline-warning"
	});
	return /* @__PURE__ */ r("button", {
		type: s,
		onClick: p,
		disabled: l || u,
		className: t(a.button, h, g, {
			[a["button--full-width"]]: o,
			[a["button--loading"]]: u
		}),
		children: u && f !== "none" ? /* @__PURE__ */ i(n, { children: [/* @__PURE__ */ r(e, { className: _ }), d && /* @__PURE__ */ r("span", {
			className: a["button__loading-text"],
			children: d
		})] }) : m
	});
}
//#endregion
export { o as t };
