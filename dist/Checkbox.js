import { t as e } from "./chunks/check._Bvx9p5F.js";
import { t } from "./chunks/checkbox.module.BtViRXjC.js";
import { memo as n, useState as r } from "react";
import { clsx as i } from "clsx";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
var s = n(({ id: n, name: s, label: c, value: l, isGroup: u, leftLabel: d = !0, disabled: f, onClick: p, onFocus: m }) => {
	let [h, g] = r(!1), [_, v] = r(!1);
	return /* @__PURE__ */ o("div", {
		className: i(t["checkbox-field"], {
			[t["checkbox-field--group"]]: u,
			[t["checkbox-field--right-label"]]: d,
			[t["checkbox-field--disabled"]]: f
		}),
		onMouseEnter: () => g(!0),
		onMouseLeave: () => g(!1),
		children: [
			/* @__PURE__ */ a("input", {
				id: n,
				name: s,
				className: t["checkbox-field__input"],
				type: "checkbox",
				checked: l,
				disabled: f,
				onFocus: () => {
					v(!0), m?.();
				},
				onBlur: () => v(!1),
				onChange: () => {
					p?.(!l);
				}
			}),
			c && /* @__PURE__ */ a("label", {
				htmlFor: n,
				className: i(t["checkbox-field__label"], d ? t["checkbox-field__label--right"] : t["checkbox-field__label--left"]),
				children: c
			}),
			l ? /* @__PURE__ */ a("span", {
				className: i(t["checkbox-field__checked"], { [t["checkbox-field__checked--hovered"]]: h && !f }),
				children: /* @__PURE__ */ a(e, { className: t["checkbox-field__check-icon"] })
			}) : /* @__PURE__ */ a("span", { className: i(t["checkbox-field__unchecked"], {
				[t["checkbox-field__unchecked--hovered"]]: h && !_,
				[t["checkbox-field__unchecked--focused"]]: _
			}) })
		]
	});
});
//#endregion
export { s as default };
