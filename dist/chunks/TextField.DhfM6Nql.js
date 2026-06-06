import { n as e, t } from "./hook.f8WWHSBG.js";
import { t as n } from "./regexp.BJs0YnOh.js";
import { t as r } from "./dynamic.CM01WaG6.js";
import { memo as i, useEffect as a, useMemo as o, useRef as s, useState as c } from "react";
import { clsx as l } from "clsx";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/components/Text/text.module.css
var f = {
	"text-field": "formkit-lite-text-field",
	"text-field--full": "formkit-lite-text-field--full",
	"text-field__label": "formkit-lite-text-field__label",
	"text-field__required": "formkit-lite-text-field__required",
	"text-field__wrapper": "formkit-lite-text-field__wrapper",
	"text-field__wrapper--error": "formkit-lite-text-field__wrapper--error",
	"text-field__wrapper--disabled": "formkit-lite-text-field__wrapper--disabled",
	"text-field__wrapper--primary": "formkit-lite-text-field__wrapper--primary",
	"text-field__input": "formkit-lite-text-field__input",
	"text-field__textarea": "formkit-lite-text-field__textarea",
	"text-field__input--error": "formkit-lite-text-field__input--error",
	"text-field__textarea--error": "formkit-lite-text-field__textarea--error",
	"text-field__input--valid": "formkit-lite-text-field__input--valid",
	"text-field__textarea--valid": "formkit-lite-text-field__textarea--valid",
	"text-field__icon-left": "formkit-lite-text-field__icon-left",
	"text-field__icon-right": "formkit-lite-text-field__icon-right",
	"text-field__icon--compact": "formkit-lite-text-field__icon--compact",
	"text-field__icon-inner": "formkit-lite-text-field__icon-inner",
	"text-field__reset-button": "formkit-lite-text-field__reset-button",
	"text-field__reset-button--right": "formkit-lite-text-field__reset-button--right",
	"text-field__reset-button--right-icon": "formkit-lite-text-field__reset-button--right-icon",
	"text-field__reset-button--right-icon-custom": "formkit-lite-text-field__reset-button--right-icon-custom",
	"text-field__reset-icon": "formkit-lite-text-field__reset-icon",
	"text-field__error": "formkit-lite-text-field__error",
	"text-field__help": "formkit-lite-text-field__help"
};
//#endregion
//#region src/utils/textAreaAutoHeight.ts
function p(e) {
	e.currentTarget.style.height = "6px", e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
}
var m = i(({ id: i, label: m, value: h, name: g, error: _, initialValue: v, placeholder: y, leftIcon: b, rightIcon: x, autoCorrect: S, autoComplete: C, spellCheck: w, pattern: T, inputMode: E, isPrimary: D = !1, resetDisabled: O = !1, textareaAutoHeight: k = !1, customIconContainer: A = !1, type: j = "text", rows: M = 3, mask: N, helpText: P, required: F = !1, disabled: I = !1, textarea: L = !1, secure: R = !1, fullWidth: z = !1, iconCompact: B = !1, onReset: V, onChange: H, onComplete: U, onFocus: W, onBlur: G }) => {
	let [K, q] = c(!1), J = o(() => !!h && K && !O, [
		h,
		K,
		O
	]);
	function Y(e) {
		return new r({ mask: Array.isArray(e) ? e : e ? [e] : [{ mask: new n({ mask: /.*/ }) }] });
	}
	let [ee, te] = c({ mask: Y(N) });
	a(() => {
		te({ mask: Y(N) });
	}, [N]);
	let X = s(null), { setValue: ne, setUnmaskedValue: Z } = t(ee, {
		ref: X,
		onAccept: (e, t) => {
			H?.({ target: {
				value: t.unmaskedValue,
				name: g
			} });
		},
		onComplete: (e, t) => {
			U?.(t.unmaskedValue);
		}
	});
	a(() => {
		Z(`${v}`);
	}, [v]), a(() => {
		Z(`${h}`);
	}, [h]);
	let re = l(f["text-field__wrapper"], {
		[f["text-field__wrapper--error"]]: !!_,
		[f["text-field__wrapper--primary"]]: D,
		[f["text-field__wrapper--disabled"]]: I
	}), Q = l(L ? f["text-field__textarea"] : f["text-field__input"]), ie = m && /* @__PURE__ */ d("label", {
		htmlFor: i,
		className: f["text-field__label"],
		children: [m, F && /* @__PURE__ */ u("span", {
			className: f["text-field__required"],
			children: "*"
		})]
	});
	function $(e) {
		if (q(!0), W?.(), k && L) {
			let t = e.target;
			t.style.height = "auto";
			let n = t.scrollHeight > 135 ? t.scrollHeight : 135;
			t.style.height = `${n}px`;
		}
	}
	function ae(e) {
		if (e.stopPropagation(), q(!1), G?.(), k && L) {
			let t = e.target;
			t.style.height = "100%";
		}
	}
	function oe(e) {
		e.stopPropagation(), ne(""), V?.(i, "", !0);
	}
	let se = o(() => {
		if (L) {
			let e = {};
			return k && (e.onInput = p), /* @__PURE__ */ u("textarea", {
				...e,
				id: i,
				name: g,
				value: h,
				rows: M,
				disabled: I,
				placeholder: y || void 0,
				className: Q,
				style: {
					minHeight: k ? M * 1.5 + "rem" : "auto",
					maxHeight: k ? "360px" : "auto"
				},
				onChange: H,
				onFocus: $,
				onBlur: ae
			});
		}
		return j === "number" ? /* @__PURE__ */ u("input", {
			id: i,
			name: g,
			value: h,
			type: j,
			disabled: I,
			autoComplete: C,
			placeholder: y || void 0,
			className: Q,
			onChange: H,
			onFocus: $
		}) : /* @__PURE__ */ u("input", {
			ref: X,
			id: i,
			name: g,
			autoComplete: C,
			autoCorrect: S,
			spellCheck: w,
			pattern: T,
			disabled: I,
			className: Q,
			inputMode: E,
			type: R ? "password" : j,
			placeholder: y || void 0,
			defaultValue: v,
			onFocus: $
		});
	}, [
		L,
		k,
		i,
		g,
		h,
		M,
		I,
		y,
		z,
		D,
		b,
		B,
		x,
		_,
		J,
		j,
		X,
		C,
		S,
		w,
		T,
		E,
		R,
		v,
		H
	]);
	return /* @__PURE__ */ d("div", {
		className: l(f["text-field"], { [f["text-field--full"]]: z }),
		children: [
			ie,
			/* @__PURE__ */ d("div", {
				className: re,
				children: [
					b && !A && /* @__PURE__ */ u("span", {
						className: l(f["text-field__icon-left"], { [f["text-field__icon--compact"]]: B }),
						children: B ? /* @__PURE__ */ u("span", {
							className: f["text-field__icon-inner"],
							children: b
						}) : b
					}),
					b && A && b,
					se,
					x && !A && /* @__PURE__ */ u("span", {
						className: l(f["text-field__icon-right"], { [f["text-field__icon--compact"]]: B }),
						children: B ? /* @__PURE__ */ u("span", {
							className: f["text-field__icon-inner"],
							children: x
						}) : x
					}),
					x && A && x,
					J && /* @__PURE__ */ u("button", {
						type: "button",
						tabIndex: -1,
						onClick: oe,
						className: l(f["text-field__reset-button"], {
							[f["text-field__reset-button--right"]]: !x,
							[f["text-field__reset-button--right-icon"]]: x && !A,
							[f["text-field__reset-button--right-icon-custom"]]: x && A
						}),
						children: /* @__PURE__ */ u(e, { className: f["text-field__reset-icon"] })
					})
				]
			}),
			_ && /* @__PURE__ */ u("span", {
				className: f["text-field__error"],
				children: _
			}),
			P && /* @__PURE__ */ u("span", {
				className: f["text-field__help"],
				children: P
			})
		]
	});
});
//#endregion
export { m as t };
