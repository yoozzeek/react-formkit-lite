import { useEffect as e, useRef as t } from "react";
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
}, o = ({ id: o, name: s, min: c = 0, max: l = 100, minPlaceholder: u, maxPlaceholder: d, step: f = 1, label: p, disabled: m = !1, value: h, onValueChange: g, onFocus: _ }) => {
	let v = t(null), y = t(null), b = t(h);
	e(() => {
		let e = v.current;
		e && Number(e.value) !== h && (e.value = String(h)), b.current = h;
	}, [h]), e(() => () => {
		y.current !== null && cancelAnimationFrame(y.current);
	}, []);
	function x() {
		y.current = null, g?.(b.current);
	}
	function S(e) {
		b.current = Number(e.currentTarget.value), y.current === null && (y.current = requestAnimationFrame(x));
	}
	return /* @__PURE__ */ i("div", { children: [!!p && /* @__PURE__ */ r("label", {
		htmlFor: o,
		className: a.range__label,
		children: p
	}), /* @__PURE__ */ i("div", {
		className: n(a.range, { [a["range--disabled"]]: m }),
		children: [
			u && /* @__PURE__ */ r("span", {
				className: n(a.range__placeholder, a["range__placeholder--left"]),
				children: u
			}),
			/* @__PURE__ */ r("input", {
				ref: v,
				id: o,
				name: s,
				type: "range",
				defaultValue: h,
				min: c,
				max: l,
				step: f,
				disabled: m,
				onChange: S,
				onFocus: _,
				className: a.range__input
			}),
			d && /* @__PURE__ */ r("span", {
				className: n(a.range__placeholder, a["range__placeholder--right"]),
				children: d
			})
		]
	})] });
};
//#endregion
export { o as t };
