import "react";
import { clsx as e } from "clsx";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/assets/icons/close.svg?react
var r = (e) => /* @__PURE__ */ n("svg", {
	viewBox: "0 0 20 20",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	...e,
	children: [/* @__PURE__ */ t("path", {
		d: "M14.9498 6.46443C15.3403 6.07391 15.3403 5.44074 14.9498 5.05022C14.5593 4.65969 13.9261 4.65969 13.5356 5.05022L14.9498 6.46443ZM5.05029 13.5355C4.65976 13.926 4.65976 14.5592 5.05029 14.9497C5.44081 15.3402 6.07398 15.3402 6.4645 14.9497L5.05029 13.5355ZM13.5356 5.05022L5.05029 13.5355L6.4645 14.9497L14.9498 6.46443L13.5356 5.05022Z",
		fill: "currentColor"
	}), /* @__PURE__ */ t("path", {
		d: "M13.5356 14.9498C13.9261 15.3403 14.5593 15.3403 14.9498 14.9498C15.3403 14.5593 15.3403 13.9261 14.9498 13.5356L13.5356 14.9498ZM6.4645 5.05029C6.07398 4.65976 5.44081 4.65976 5.05029 5.05029C4.65976 5.44081 4.65976 6.07398 5.05029 6.4645L6.4645 5.05029ZM14.9498 13.5356L6.4645 5.05029L5.05029 6.4645L13.5356 14.9498L14.9498 13.5356Z",
		fill: "currentColor"
	})]
}), i = {
	badge: "formkit-lite-badge",
	"badge--clickable": "formkit-lite-badge--clickable",
	badge__icon: "formkit-lite-badge__icon",
	badge__remove: "formkit-lite-badge__remove",
	"badge__remove-icon": "formkit-lite-badge__remove-icon",
	"badge--light": "formkit-lite-badge--light",
	"badge--dark": "formkit-lite-badge--dark",
	"badge--selected": "formkit-lite-badge--selected",
	"badge--success": "formkit-lite-badge--success",
	"badge--danger": "formkit-lite-badge--danger",
	"badge--warning": "formkit-lite-badge--warning",
	"badge--info": "formkit-lite-badge--info",
	"badge--primary": "formkit-lite-badge--primary",
	"badge--black": "formkit-lite-badge--black",
	"badge__remove--light": "formkit-lite-badge__remove--light",
	"badge__remove--dark": "formkit-lite-badge__remove--dark"
};
//#endregion
//#region src/components/Badge/Badge.tsx
function a({ id: a, icon: o, variant: s = "light", onClick: c, onRemove: l, selected: u = !1, children: d }) {
	function f(e) {
		e.stopPropagation(), a && c?.(a);
	}
	function p() {
		a && l?.(a);
	}
	let m = e(i.badge, i[`badge--${s}`], {
		[i["badge--selected"]]: u && s === "light",
		[i["badge--clickable"]]: !!c
	}), h = e(i.badge__remove, {
		[i["badge__remove--light"]]: !u,
		[i["badge__remove--dark"]]: u
	});
	return /* @__PURE__ */ n("span", {
		className: m,
		onClick: f,
		children: [
			o && /* @__PURE__ */ t("span", {
				className: i.badge__icon,
				children: o
			}),
			d,
			l && /* @__PURE__ */ t("button", {
				type: "button",
				className: h,
				onClick: p,
				children: /* @__PURE__ */ t(r, { className: i["badge__remove-icon"] })
			})
		]
	});
}
//#endregion
export { a as t };
