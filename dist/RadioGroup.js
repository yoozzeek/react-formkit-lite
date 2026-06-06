import { t as e } from "./chunks/radio.module.DH2wEG-M.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/Radio/RadioGroup.tsx
var r = ({ ariaLabel: r = "radio-group", label: i, error: a, children: o }) => /* @__PURE__ */ n("div", {
	role: "group",
	"aria-labelledby": r,
	children: [
		/* @__PURE__ */ t("span", {
			className: e["radio-group__label"],
			children: i
		}),
		/* @__PURE__ */ t("div", {
			className: e["radio-group__content"],
			children: o
		}),
		a && /* @__PURE__ */ t("p", {
			className: e["radio-group__error"],
			children: a
		})
	]
});
//#endregion
export { r as default };
