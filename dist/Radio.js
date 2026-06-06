import { t as e } from "./chunks/radio.module.DH2wEG-M.js";
import { memo as t, useMemo as n } from "react";
import { clsx as r } from "clsx";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
var o = t(({ name: t, value: o, label: s, disabled: c = !1, lightVariant: l = !1, checkedValue: u, onChange: d, onFocus: f }) => {
	let p = n(() => u ? u === o : !1, [u, o]);
	return /* @__PURE__ */ a("label", {
		className: r(e.radio, {
			[e["radio--disabled"]]: c,
			[e["radio--checked"]]: p,
			[e["radio--unchecked"]]: !p
		}),
		children: [/* @__PURE__ */ i("input", {
			className: r(e.radio__input, {
				[e["radio__input--spaced"]]: s,
				[e["radio__input--primary"]]: !l,
				[e["radio__input--light"]]: l
			}),
			disabled: c,
			checked: p,
			type: "radio",
			name: t,
			value: o,
			onChange: d,
			onFocus: f
		}), s && s]
	});
});
//#endregion
export { o as default };
