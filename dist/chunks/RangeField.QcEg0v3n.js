import { useEffect as e, useState as t } from "react";
import { clsx as n } from "clsx";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
var a = {
	range: "formkit-lite-range",
	"range--disabled": "formkit-lite-range--disabled",
	range__label: "formkit-lite-range__label",
	range__placeholder: "formkit-lite-range__placeholder",
	"range__placeholder--left": "formkit-lite-range__placeholder--left",
	"range__placeholder--right": "formkit-lite-range__placeholder--right",
	range__input: "formkit-lite-range__input"
};
//#endregion
//#region src/hooks/useDebounce.ts
function o(n, r) {
	let [i, a] = t(n);
	return e(() => {
		let e = setTimeout(() => {
			a(n);
		}, r || 600);
		return () => {
			clearTimeout(e);
		};
	}, [n, r]), i;
}
//#endregion
//#region src/components/Range/RangeField.tsx
var s = ({ id: s, name: c, min: l = 0, max: u = 100, minPlaceholder: d, maxPlaceholder: f, step: p = 1, label: m, disabled: h = !1, value: g, onValueChange: _, onFocus: v }) => {
	let [y, b] = t(g), x = o(y, 50);
	e(() => {
		b(g);
	}, [g]), e(() => {
		_?.(x);
	}, [x]);
	function S(e) {
		let { value: t } = e.target;
		b(Number(t));
	}
	function C(e) {
		v?.(e);
	}
	return /* @__PURE__ */ i("div", { children: [!!m && /* @__PURE__ */ r("label", {
		htmlFor: s,
		className: a.range__label,
		children: m
	}), /* @__PURE__ */ i("div", {
		className: n(a.range, { [a["range--disabled"]]: h }),
		children: [
			d && /* @__PURE__ */ r("span", {
				className: n(a.range__placeholder, a["range__placeholder--left"]),
				children: d
			}),
			/* @__PURE__ */ r("input", {
				id: s,
				name: c,
				type: "range",
				value: y,
				min: l,
				max: u,
				step: p,
				disabled: h,
				onChange: S,
				onFocus: C,
				className: a.range__input
			}),
			f && /* @__PURE__ */ r("span", {
				className: n(a.range__placeholder, a["range__placeholder--right"]),
				children: f
			})
		]
	})] });
};
//#endregion
export { s as t };
