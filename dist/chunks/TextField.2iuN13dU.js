import { n as e, t } from "./hook.Dd6m0u32.js";
import { t as n } from "./regexp.BJs0YnOh.js";
import { t as r } from "./dynamic.CM01WaG6.js";
import { memo as i, useEffect as a, useMemo as o, useRef as s, useState as ee } from "react";
import { clsx as c } from "clsx";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/Text/text.module.css
var d = {
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
	"text-field__reset-button--date": "formkit-lite-text-field__reset-button--date",
	"text-field__reset-button--right-icon": "formkit-lite-text-field__reset-button--right-icon",
	"text-field__reset-button--right-icon-custom": "formkit-lite-text-field__reset-button--right-icon-custom",
	"text-field__reset-icon": "formkit-lite-text-field__reset-icon",
	"text-field__error": "formkit-lite-text-field__error",
	"text-field__help": "formkit-lite-text-field__help"
};
//#endregion
//#region src/utils/textAreaAutoHeight.ts
function f(e) {
	e.currentTarget.style.height = "6px", e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
}
//#endregion
//#region src/components/Text/TextField.tsx
function p(e) {
	return new r({ mask: Array.isArray(e) ? e : e ? [e] : [{ mask: new n({ mask: /.*/ }) }] });
}
var m = i(({ id: n, label: r, ariaLabel: i, value: m, name: h, error: g, initialValue: _, placeholder: v, leftIcon: y, rightIcon: b, autoCorrect: x, autoComplete: S, spellCheck: C, pattern: w, inputMode: T, min: E, max: D, isPrimary: O = !1, resetDisabled: k = !1, textareaAutoHeight: A = !1, customIconContainer: j = !1, type: M = "text", rows: N = 3, mask: P, helpText: F, required: I = !1, disabled: L = !1, textarea: R = !1, secure: z = !1, fullWidth: B = !1, iconCompact: V = !1, onReset: H, onChange: U, onComplete: te, onFocus: ne, onBlur: re }) => {
	let [W, G] = ee(!1), K = o(() => !!m && W && !k, [
		m,
		W,
		k
	]), q = o(() => ({ mask: p(P) }), [P]), J = s(null), { setValue: Y, setUnmaskedValue: X } = t(q, {
		ref: J,
		onAccept: (e, t) => {
			U?.({ target: {
				value: t.unmaskedValue,
				name: h
			} });
		},
		onComplete: (e, t) => {
			te?.(t.unmaskedValue);
		}
	});
	a(() => {
		X(`${_}`);
	}, [_]), a(() => {
		X(`${m}`);
	}, [m]);
	let ie = c(d["text-field__wrapper"], {
		[d["text-field__wrapper--error"]]: !!g,
		[d["text-field__wrapper--primary"]]: O,
		[d["text-field__wrapper--disabled"]]: L
	}), Z = c(R ? d["text-field__textarea"] : d["text-field__input"]), ae = r && /* @__PURE__ */ u("label", {
		htmlFor: n,
		className: d["text-field__label"],
		children: [r, I && /* @__PURE__ */ l("span", {
			className: d["text-field__required"],
			children: "*"
		})]
	}), Q = r ? void 0 : i;
	function $(e) {
		if (G(!0), ne?.(), A && R) {
			let t = e.target;
			t.style.height = "auto";
			let n = t.scrollHeight > 135 ? t.scrollHeight : 135;
			t.style.height = `${n}px`;
		}
	}
	function oe(e) {
		if (e.stopPropagation(), G(!1), re?.(), A && R) {
			let t = e.target;
			t.style.height = "100%";
		}
	}
	function se(e) {
		e.stopPropagation(), M === "number" || M === "date" ? U?.({ target: {
			value: "",
			name: h,
			type: M
		} }) : Y(""), H?.(n, "", !0);
	}
	let ce = o(() => {
		if (R) {
			let e = {};
			return A && (e.onInput = f), /* @__PURE__ */ l("textarea", {
				...e,
				id: n,
				name: h,
				"aria-label": Q,
				value: m,
				rows: N,
				disabled: L,
				placeholder: v || void 0,
				className: Z,
				style: {
					minHeight: A ? N * 1.5 + "rem" : "auto",
					maxHeight: A ? "360px" : "auto"
				},
				onChange: U,
				onFocus: $,
				onBlur: oe
			});
		}
		return M === "number" || M === "date" ? /* @__PURE__ */ l("input", {
			id: n,
			name: h,
			"aria-label": Q,
			value: m,
			type: M,
			min: E,
			max: D,
			disabled: L,
			autoComplete: S,
			placeholder: v || void 0,
			className: Z,
			onChange: U,
			onFocus: $
		}) : /* @__PURE__ */ l("input", {
			ref: J,
			id: n,
			name: h,
			"aria-label": Q,
			autoComplete: S,
			autoCorrect: x,
			spellCheck: C,
			pattern: w,
			disabled: L,
			className: Z,
			inputMode: T,
			type: z ? "password" : M,
			placeholder: v || void 0,
			defaultValue: _,
			onFocus: $
		});
	}, [
		R,
		A,
		n,
		h,
		Q,
		m,
		N,
		L,
		v,
		B,
		O,
		y,
		V,
		b,
		g,
		K,
		M,
		J,
		S,
		x,
		C,
		w,
		T,
		E,
		D,
		z,
		_,
		U
	]);
	return /* @__PURE__ */ u("div", {
		className: c(d["text-field"], { [d["text-field--full"]]: B }),
		children: [
			ae,
			/* @__PURE__ */ u("div", {
				className: ie,
				children: [
					y && !j && /* @__PURE__ */ l("span", {
						className: c(d["text-field__icon-left"], { [d["text-field__icon--compact"]]: V }),
						children: V ? /* @__PURE__ */ l("span", {
							className: d["text-field__icon-inner"],
							children: y
						}) : y
					}),
					y && j && y,
					ce,
					b && !j && /* @__PURE__ */ l("span", {
						className: c(d["text-field__icon-right"], { [d["text-field__icon--compact"]]: V }),
						children: V ? /* @__PURE__ */ l("span", {
							className: d["text-field__icon-inner"],
							children: b
						}) : b
					}),
					b && j && b,
					K && /* @__PURE__ */ l("button", {
						type: "button",
						tabIndex: -1,
						onClick: se,
						className: c(d["text-field__reset-button"], {
							[d["text-field__reset-button--right"]]: !b && M !== "date",
							[d["text-field__reset-button--date"]]: !b && M === "date",
							[d["text-field__reset-button--right-icon"]]: b && !j,
							[d["text-field__reset-button--right-icon-custom"]]: b && j
						}),
						children: /* @__PURE__ */ l(e, { className: d["text-field__reset-icon"] })
					})
				]
			}),
			g && /* @__PURE__ */ l("span", {
				className: d["text-field__error"],
				children: g
			}),
			F && /* @__PURE__ */ l("span", {
				className: d["text-field__help"],
				children: F
			})
		]
	});
});
//#endregion
export { m as t };
