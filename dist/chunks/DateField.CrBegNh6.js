import { n as e, t } from "./hook.f8WWHSBG.js";
import { n } from "./dateMask.C2ma3Lon.js";
import { memo as r, useRef as i, useState as a } from "react";
import { clsx as o } from "clsx";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/Date/date.module.css
var l = {
	"date-field": "formkit-lite-date-field",
	"date-field--full": "formkit-lite-date-field--full",
	"date-field__label": "formkit-lite-date-field__label",
	"date-field__required": "formkit-lite-date-field__required",
	"date-field__wrapper": "formkit-lite-date-field__wrapper",
	"date-field__input": "formkit-lite-date-field__input",
	"date-field__input--error": "formkit-lite-date-field__input--error",
	"date-field__input--valid": "formkit-lite-date-field__input--valid",
	"date-field__reset-button": "formkit-lite-date-field__reset-button",
	"date-field__reset-icon": "formkit-lite-date-field__reset-icon",
	"date-field__error": "formkit-lite-date-field__error",
	"date-field__help": "formkit-lite-date-field__help"
}, u = r((r) => {
	let u = i(null), [d, f] = a(!1), p = t({ mask: n }, {
		ref: u,
		onComplete: (e) => {
			r.onChange?.(r.id, e, !0);
		}
	});
	function m(e) {
		e.stopPropagation(), r.onReset?.(r.id, "", !0);
	}
	function h(e) {
		f(!0), r.onFocus?.(e);
	}
	return /* @__PURE__ */ c("div", {
		className: o(l["date-field"], { [l["date-field--full"]]: r.fullWidth }),
		children: [
			r.label && /* @__PURE__ */ c("label", {
				htmlFor: r.id,
				className: l["date-field__label"],
				children: [r.label, r.required && /* @__PURE__ */ s("span", {
					className: l["date-field__required"],
					children: "*"
				})]
			}),
			/* @__PURE__ */ c("div", {
				className: l["date-field__wrapper"],
				children: [/* @__PURE__ */ s("input", {
					ref: p.ref,
					className: o(l["date-field__input"], {
						[l["date-field__input--error"]]: r.error,
						[l["date-field__input--valid"]]: !r.error
					}),
					type: "text",
					id: r.id,
					name: r.name,
					disabled: r.disabled,
					placeholder: r.placeholder || "DD-MM-YYYY",
					defaultValue: r.value,
					onFocus: h
				}), r.value && d && /* @__PURE__ */ s("button", {
					className: l["date-field__reset-button"],
					role: "button",
					onClick: m,
					children: /* @__PURE__ */ s(e, { className: l["date-field__reset-icon"] })
				})]
			}),
			r.error && /* @__PURE__ */ s("span", {
				className: l["date-field__error"],
				children: r.error
			}),
			r.helpText && /* @__PURE__ */ s("span", {
				className: l["date-field__help"],
				children: r.helpText
			})
		]
	});
});
//#endregion
export { u as t };
