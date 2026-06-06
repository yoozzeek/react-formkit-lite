import { jsx as e, jsxs as t } from "react/jsx-runtime";
var n = {
	switch: "formkit-lite-switch",
	switch__info: "formkit-lite-switch__info",
	switch__label: "formkit-lite-switch__label",
	switch__help: "formkit-lite-switch__help",
	switch__control: "formkit-lite-switch__control",
	switch__input: "formkit-lite-switch__input",
	switch__slider: "formkit-lite-switch__slider"
}, r = ({ id: r, name: i, label: a, helpText: o, value: s, onFocus: c, onChange: l }) => /* @__PURE__ */ t("div", {
	className: n.switch,
	children: [(!!a || !!o) && /* @__PURE__ */ t("div", {
		className: n.switch__info,
		children: [!!a && /* @__PURE__ */ e("span", {
			className: n.switch__label,
			children: a
		}), !!o && /* @__PURE__ */ e("p", {
			className: n.switch__help,
			children: o
		})]
	}), /* @__PURE__ */ t("label", {
		htmlFor: r,
		className: n.switch__control,
		children: [/* @__PURE__ */ e("input", {
			id: r,
			name: i,
			checked: s,
			type: "checkbox",
			className: n.switch__input,
			onChange: (e) => l(e.target.checked),
			onFocus: c
		}), /* @__PURE__ */ e("span", { className: n.switch__slider })]
	})]
});
//#endregion
export { r as t };
