import { t as e } from "./chunks/checkbox.module.BtViRXjC.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/Checkbox/CheckboxGroup.tsx
var r = ({ label: r, children: i, error: a, ariaLabel: o = "checkbox-group" }) => /* @__PURE__ */ n("div", {
	role: "group",
	className: e["checkbox-group"],
	"aria-labelledby": o,
	children: [
		/* @__PURE__ */ t("span", {
			className: e["checkbox-group__label"],
			children: r
		}),
		/* @__PURE__ */ t("div", {
			className: e["checkbox-group__content"],
			children: i
		}),
		a && /* @__PURE__ */ t("p", {
			className: e["checkbox-group__error"],
			children: a
		})
	]
});
//#endregion
export { r as default };
