import "react";
import { clsx as e } from "clsx";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/assets/icons/loader.svg?react
var r = (e) => /* @__PURE__ */ t("svg", {
	viewBox: "0 0 24 24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	...e,
	children: /* @__PURE__ */ t("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M0 12C0 5.37258 5.37258 0 12 0C12.8284 0 13.5 0.671573 13.5 1.5C13.5 2.32843 12.8284 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.1716 21.6716 10.5 22.5 10.5C23.3284 10.5 24 11.1716 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z",
		fill: "currentColor"
	})
}), i = {
	loader: "formkit-lite-loader",
	loader__icon: "formkit-lite-loader__icon",
	spin: "formkit-lite-spin",
	"loader__icon--sm": "formkit-lite-loader__icon--sm",
	"loader__icon--md": "formkit-lite-loader__icon--md",
	"loader__icon--lg": "formkit-lite-loader__icon--lg",
	loader__text: "formkit-lite-loader__text",
	"loader__text--sm": "formkit-lite-loader__text--sm",
	"loader__text--md": "formkit-lite-loader__text--md",
	"loader__sr-only": "formkit-lite-loader__sr-only"
}, a = ({ className: a, size: o = "md", text: s }) => {
	let c = {
		sm: i["loader__icon--sm"],
		md: i["loader__icon--md"],
		lg: i["loader__icon--lg"]
	}[o], l = {
		sm: i["loader__text--sm"],
		md: i["loader__text--md"],
		lg: i["loader__text--md"]
	}[o];
	return /* @__PURE__ */ n("div", {
		className: i.loader,
		children: [
			/* @__PURE__ */ t(r, { className: e(i.loader__icon, c, a) }),
			s && /* @__PURE__ */ t("span", {
				className: e(i.loader__text, l),
				children: s
			}),
			/* @__PURE__ */ t("span", {
				className: i["loader__sr-only"],
				children: "Loading..."
			})
		]
	});
};
//#endregion
export { a as t };
