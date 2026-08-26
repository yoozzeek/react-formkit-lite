import { t as e } from "./Loader.DI5rvy7C.js";
import { t } from "./Button.wmX7vita.js";
import { t as n } from "./Badge.BfJadn6o.js";
import { n as r, t as i } from "./Header.Cl75fS8C.js";
import { t as a } from "./plus.Bn80kaIC.js";
import { t as o } from "./TextField.CuKFKBis.js";
import { t as s } from "./check._Bvx9p5F.js";
import { useCallback as c, useEffect as l, useLayoutEffect as u, useMemo as d, useRef as f, useState as p } from "react";
import { clsx as m } from "clsx";
import { Fragment as h, jsx as g, jsxs as _ } from "react/jsx-runtime";
import { createPortal as v } from "react-dom";
import { Modal as y, useModalStackCtx as b } from "@yoozzeek/react-context-modal";
import x from "simplebar-react";
import { ViewportList as S } from "react-viewport-list";
var C = {
	select: "formkit-lite-select",
	select__label: "formkit-lite-select__label",
	select__required: "formkit-lite-select__required",
	select__control: "formkit-lite-select__control",
	"select__control--error": "formkit-lite-select__control--error",
	"select__control--disabled": "formkit-lite-select__control--disabled",
	"select__control--full": "formkit-lite-select__control--full",
	"select__control--multiple": "formkit-lite-select__control--multiple",
	"select__control--single": "formkit-lite-select__control--single",
	"select__multiple-placeholder": "formkit-lite-select__multiple-placeholder",
	"select__multiple-placeholder--disabled": "formkit-lite-select__multiple-placeholder--disabled",
	"select__multiple-placeholder-icon": "formkit-lite-select__multiple-placeholder-icon",
	"select__multiple-placeholder-text": "formkit-lite-select__multiple-placeholder-text",
	select__value: "formkit-lite-select__value",
	"select__value--placeholder": "formkit-lite-select__value--placeholder",
	"select__value--single": "formkit-lite-select__value--single",
	select__icon: "formkit-lite-select__icon",
	"select__icon--disabled": "formkit-lite-select__icon--disabled",
	select__dropdown: "formkit-lite-select__dropdown",
	"select__modal-content": "formkit-lite-select__modal-content",
	"select__safe-top": "formkit-lite-select__safe-top",
	select__search: "formkit-lite-select__search",
	"select__loading-block": "formkit-lite-select__loading-block",
	"select__scrollable-simplebar": "formkit-lite-select__scrollable-simplebar",
	select__scrollable: "formkit-lite-select__scrollable",
	"select__no-results": "formkit-lite-select__no-results",
	select__error: "formkit-lite-select__error",
	select__help: "formkit-lite-select__help",
	"select__modal-help": "formkit-lite-select__modal-help",
	"select-option": "formkit-lite-select-option",
	"select-option__icon": "formkit-lite-select-option__icon",
	"select-option__help": "formkit-lite-select-option__help",
	"select-option--single-selected": "formkit-lite-select-option--single-selected",
	"select-option--disabled": "formkit-lite-select-option--disabled",
	"select-option__checkbox": "formkit-lite-select-option__checkbox",
	"select-option__checkbox--selected": "formkit-lite-select-option__checkbox--selected",
	"select-option__checkbox--hovered": "formkit-lite-select-option__checkbox--hovered",
	"select-option__checkbox--unselected": "formkit-lite-select-option__checkbox--unselected",
	"select-option__check-icon": "formkit-lite-select-option__check-icon"
};
//#endregion
//#region src/hooks/useClickOutside.ts
function ee(e, t = !1, n = !1, r = !1, i) {
	let [a, o] = p(t);
	return l(() => {
		function t(t) {
			if (r) return;
			let a = t.target;
			if (!i?.current?.contains(a)) {
				if (e.current && !e.current.contains(a)) {
					o(!1);
					return;
				}
				n || o(!0);
			}
		}
		return document.addEventListener("mousedown", t), () => {
			document.removeEventListener("mousedown", t);
		};
	}, [
		r,
		n,
		e,
		i
	]), [a, o];
}
//#endregion
//#region src/assets/icons/chevron-down.svg?react
var w = (e) => /* @__PURE__ */ g("svg", {
	viewBox: "0 0 20 20",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	...e,
	children: /* @__PURE__ */ g("path", {
		d: "M5.27325 7.30685C5.64913 6.9133 6.17242 6.88242 6.63192 7.30685L10.001 10.6131L13.3701 7.30685C13.8296 6.88242 14.3538 6.9133 14.7271 7.30685C15.1029 7.69951 15.0788 8.36306 14.7271 8.7319C14.3771 9.10074 10.6795 12.7044 10.6795 12.7044C10.4924 12.9012 10.2467 13 10.001 13C9.75532 13 9.50962 12.9012 9.32082 12.7044C9.32082 12.7044 5.62499 9.10074 5.27325 8.7319C4.92065 8.36306 4.89737 7.69951 5.27325 7.30685Z",
		fill: "currentColor"
	})
}), T = 6, E = 8, D = .02, O = 320, k = 120, A = {
	visibility: "hidden",
	pointerEvents: "none"
};
function j(e, t, n) {
	return Math.max(t, Math.min(e, n));
}
function M(e, t, n) {
	return e.bottom <= 0 || e.top >= n || e.right <= 0 || e.left >= t;
}
function N(e, t, n) {
	let r = e.getBoundingClientRect(), i = window.innerWidth, a = window.innerHeight;
	if (M(r, i, a)) return A;
	let o = r.width * D, s = a - r.bottom - T - E, c = r.top - T - E, l = s < O && c > s, u = j(l ? c : s, k, Math.min(O, a - E * 2)), d = j(Math.max(r.width + o * 2, n ?? 0), 0, i - E * 2), f = t === "right" ? r.right + o - d : r.left - o, p = l ? a - r.top + T : r.bottom + T, m = a - u - E, h = {
		width: d,
		maxHeight: u,
		left: j(f, E, i - d - E)
	};
	return l ? h.bottom = j(p, E, m) : h.top = j(p, E, m), h;
}
function P(e, t) {
	let n = Object.keys(e);
	return n.length === Object.keys(t).length && n.every((n) => e[n] === t[n]);
}
function F(e, t, n, r) {
	let [i, a] = p(null), o = f(0);
	return u(() => {
		let i = e.current;
		if (!r || !i) return;
		function s() {
			let e = N(i, t, n);
			a((t) => t && P(t, e) ? t : e);
		}
		function c() {
			cancelAnimationFrame(o.current), o.current = requestAnimationFrame(s);
		}
		s(), window.addEventListener("resize", c), window.addEventListener("scroll", c, {
			capture: !0,
			passive: !0
		});
		let l = new ResizeObserver(c);
		return l.observe(i), () => {
			cancelAnimationFrame(o.current), window.removeEventListener("resize", c), window.removeEventListener("scroll", c, { capture: !0 }), l.disconnect();
		};
	}, [
		e,
		t,
		n,
		r
	]), r ? i : null;
}
//#endregion
//#region src/utils/isInViewport.ts
function I(e) {
	if (!e) return !1;
	let t = e.getBoundingClientRect();
	return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth);
}
//#endregion
//#region src/components/Select/LoadMoreElement.tsx
var L = ({ threshold: e = 1, loadMore: t }) => {
	let n = f(null), r = f(null);
	return l(() => (n.current = new IntersectionObserver((e) => {
		e.forEach((e) => {
			e.isIntersecting && r?.current && I(r.current) && t();
		});
	}, { threshold: e }), r?.current && n.current.observe(r.current), () => {
		n.current?.disconnect();
	}), [t]), /* @__PURE__ */ g("div", {
		ref: r,
		className: "relative -z-10 h-[1px] w-[1px] opacity-0",
		children: /* @__PURE__ */ g("span", {
			className: "sr-only",
			children: "Show more"
		})
	});
};
//#endregion
//#region src/components/Select/SelectMultipleOption.tsx
function R({ label: e, value: t, classes: n, helpText: r, iconEl: i, badgeIconEl: a, rawData: o, disabled: c = !1, selected: l = !1, onSelect: u }) {
	let [d, f] = p(!1);
	function h(s) {
		s.stopPropagation(), u({
			label: e,
			value: t,
			classes: n,
			helpText: r,
			iconEl: i,
			badgeIconEl: a,
			rawData: o,
			selected: !l
		});
	}
	return /* @__PURE__ */ _("div", {
		className: m(C["select-option"], {
			"cursor-pointer": !c,
			[C["select-option--disabled"]]: c && !l,
			[n || ""]: !!n
		}),
		onClick: h,
		onMouseEnter: () => f(!0),
		onMouseLeave: () => f(!1),
		children: [
			/* @__PURE__ */ _("div", {
				className: "flex flex-1 items-center",
				children: [i && /* @__PURE__ */ g("span", {
					className: C["select-option__icon"],
					children: i
				}), e]
			}),
			r && /* @__PURE__ */ g("span", {
				className: C["select-option__help"],
				children: r
			}),
			/* @__PURE__ */ g("span", {
				className: m(C["select-option__checkbox"], {
					[C["select-option__checkbox--selected"]]: l && !d,
					[C["select-option__checkbox--hovered"]]: l && d,
					[C["select-option__checkbox--unselected"]]: !l
				}),
				children: l && /* @__PURE__ */ g(s, { className: C["select-option__check-icon"] })
			})
		]
	});
}
//#endregion
//#region src/components/Select/SelectOption.tsx
function z({ label: e, value: t, classes: n, helpText: r, iconEl: i, badgeIconEl: a, rawData: o, selected: s = !1, onSelect: c }) {
	function l(l) {
		l.stopPropagation(), c({
			label: e,
			value: t,
			classes: n,
			helpText: r,
			iconEl: i,
			badgeIconEl: a,
			rawData: o,
			selected: !s
		});
	}
	return /* @__PURE__ */ _("div", {
		className: m(C["select-option"], {
			[C["select-option--single-selected"]]: s,
			[n || ""]: !!n
		}),
		onClick: l,
		children: [/* @__PURE__ */ _("div", {
			className: "flex flex-1 items-center",
			children: [i && /* @__PURE__ */ g("span", {
				className: C["select-option__icon"],
				children: i
			}), e]
		}), r && /* @__PURE__ */ g("span", {
			className: C["select-option__help"],
			children: r
		})]
	});
}
//#endregion
//#region src/components/Select/SelectDropdown.tsx
function B({ option: e, multiple: t, max: n = 3, selectedValues: r, handleSelect: i, getValue: a, onClose: o }) {
	let s = a(e);
	function c() {
		i(e), o?.();
	}
	return t ? /* @__PURE__ */ g(R, {
		value: s,
		label: e.label,
		classes: e.classes,
		helpText: e.helpText,
		rawData: e.rawData,
		iconEl: e.iconEl,
		badgeIconEl: e.badgeIconEl,
		disabled: r.current.size >= n,
		selected: r.current.has(s),
		onSelect: i
	}) : /* @__PURE__ */ g(z, {
		value: s,
		label: e.label,
		classes: e.classes,
		helpText: e.helpText,
		rawData: e.rawData,
		iconEl: e.iconEl,
		badgeIconEl: e.badgeIconEl,
		selected: r.current.has(s),
		onSelect: c
	});
}
function V({ id: t, label: n = "Select option", position: a = "left", helpText: s, multiple: l, max: u = 3, anchorRef: p, dropdownRef: m, selectedValues: ee, options: w = [], isLoading: T = !1, fullscreen: E = !0, minWidth: D, searchTerm: O = "", footerRenderer: k, getValue: A, onLoadMore: j, handleSelect: M, onSearch: N, onReset: P, onClose: I }) {
	let R = f(null), z = b(), V = r(), H = F(p, a, D, V), U = (e) => N && N(e.target.value), W = c((e) => V ? /* @__PURE__ */ g(x, {
		scrollableNodeProps: { ref: R },
		className: C["select__scrollable-simplebar"],
		children: e
	}) : /* @__PURE__ */ g("div", {
		ref: R,
		className: C.select__scrollable,
		children: e
	}), [V]), G = d(() => T ? /* @__PURE__ */ g("div", {
		className: C["select__loading-block"],
		children: /* @__PURE__ */ g(e, { size: "sm" })
	}) : j ? /* @__PURE__ */ g(L, { loadMore: j }) : null, [T, j]), K = c((n) => /* @__PURE__ */ _(h, { children: [
		N && /* @__PURE__ */ g("div", {
			className: C.select__search,
			children: /* @__PURE__ */ g(o, {
				fullWidth: !0,
				id: `${t}-search`,
				placeholder: "Search...",
				value: O || "",
				onChange: U,
				onReset: P
			})
		}),
		!V && s && /* @__PURE__ */ g("p", {
			className: C["select__modal-help"],
			children: s
		}),
		w.length ? W(/* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(S, {
			viewportRef: V ? R : z?.lastModal?.scrollableContentRef,
			items: w,
			children: (e) => /* @__PURE__ */ g(B, {
				max: u,
				option: e,
				multiple: l,
				selectedValues: ee,
				getValue: A,
				handleSelect: M,
				onClose: n
			}, `${e.value}`)
		}), G] })) : T ? /* @__PURE__ */ g("div", {
			className: C["select__loading-block"],
			children: /* @__PURE__ */ g(e, { size: "sm" })
		}) : /* @__PURE__ */ g("p", {
			className: C["select__no-results"],
			children: "No results"
		})
	] }), [
		t,
		w,
		s,
		T,
		V,
		G,
		W,
		O
	]);
	return V ? H ? v(/* @__PURE__ */ g("div", {
		ref: m,
		id: `${t}-dropdown`,
		className: C.select__dropdown,
		style: H,
		children: K()
	}), document.body) : /* @__PURE__ */ g(h, {}) : /* @__PURE__ */ g(y, {
		id: "select-field-modal",
		title: n,
		type: E ? "fullscreen" : "overlay-90",
		fallbackCtx: z,
		headerRenderer: (e) => E ? /* @__PURE__ */ g(i, {
			fixed: !0,
			parentIsModal: !0,
			classes: C["select__safe-top"],
			title: n,
			onGoBack: e
		}) : /* @__PURE__ */ g(h, {}),
		footerRenderer: k,
		onClose: I,
		children: (e) => /* @__PURE__ */ g("div", {
			className: C["select__modal-content"],
			children: K(e)
		})
	});
}
//#endregion
//#region src/components/Select/SelectField.tsx
function H({ id: e, label: i, popupLabel: o, dpWidth: s, placeholder: u = "Select value", max: v = 10, min: y = 0, options: b, error: x, helpText: S, value: T, valueGetter: E, valueRender: D, searchTerm: O, required: k = !1, multiple: A = !1, dpFullscreen: j = !0, dpPosition: M = "left", isLoading: N = !1, formikHandler: P = !1, fullWidth: F = !1, disabled: I = !1, onLoadMore: L, onFocus: R, onSearch: z, onChange: B, onReset: H }) {
	let U = f(null), W = f(null), G = f(/* @__PURE__ */ new Set()), K = r(), [te, q] = ee(U, !1, !0, !K, W), ne = f(!1), [J, Y] = p([]), X = f([]);
	l(() => {
		X.current = J;
	}, [J]), l(() => {
		if (!(typeof T == "number" && T <= 0) && !(typeof T == "string" && T.length === 0) && !(Array.isArray(T) && T.length === 0) && !ne.current) {
			if (ne.current = !0, A && Array.isArray(T)) T.forEach((e) => G.current.add(e)), Y(b.filter((e) => G.current.has(Z(e))));
			else if (!A) {
				let e = b.find((e) => Z(e) === T);
				e && (Y([e]), G.current.add(e.value));
			}
		}
	}, [b]);
	let re = c((e) => {
		let t = G.current;
		if (t.has(e.value)) {
			if (t.delete(e.value), A) {
				let t = X.current.filter((t) => t.value !== e.value);
				Y(t), $(t);
				return;
			}
			Y([]), Q("");
			return;
		}
		if (!(t.size >= v)) {
			if (A) {
				t.add(e.value);
				let n = [...X.current, e];
				Y(n), $(n);
				return;
			}
			t.clear(), t.add(e.value), Y([e]), Q(e.value), le();
		}
	}, [A]), [ie, ae] = p(T);
	T !== ie && (ae(T), T || Y([])), l(() => {
		T || (G.current.clear(), Q(A ? [] : ""));
	}, [T]);
	function Z(e) {
		return E && e.rawData !== void 0 && e.rawData !== null ? E(e.rawData) : e.value;
	}
	function Q(t) {
		P ? B(e, t, !0) : B(t);
	}
	function $(e = []) {
		let t = e.map((e) => e.value);
		t.length ? (t[0], Q(t)) : Q(A ? [] : "");
	}
	let oe = c((t) => {
		let n = G.current;
		if (n.has(t)) {
			if (n.delete(t), R && R({ target: { id: e } }), A) {
				let e = [];
				Y((n) => (e = n.filter((e) => e.value !== t), e)), $(e);
				return;
			}
			Y([]), Q("");
		}
	}, [A, Y]);
	function se() {
		I || (q(!0), R && R({ target: { id: e } }));
	}
	function ce() {
		q(!1), z?.("");
	}
	function le() {
		z?.(""), q(!1);
	}
	let ue = c((e) => {
		function n() {
			ce(), e();
		}
		return A ? /* @__PURE__ */ _(t, {
			fullWidth: !0,
			type: "button",
			variant: "success",
			disabled: J.length < y,
			onClick: n,
			children: ["Selected ", J.length > 0 && `(${J.length})`]
		}) : /* @__PURE__ */ g(h, {});
	}, [
		J.length,
		y,
		A
	]), de = d(() => {
		if (!A) {
			let e = J[0];
			if (D && e) return /* @__PURE__ */ g("div", {
				className: "flex-1",
				children: D(e)
			});
			let t = e ? e.label : u;
			return /* @__PURE__ */ g("span", {
				className: m("flex-1 truncate text-sm", {
					"text-gray-800": e,
					"text-gray-250": !e
				}),
				children: t
			});
		}
		return J.length ? J.map((e) => {
			let t = Z(e), r = `${t}`;
			return D ? D(e) : /* @__PURE__ */ g(n, {
				id: t,
				icon: e.badgeIconEl || e.iconEl,
				onRemove: oe,
				children: e.label
			}, r);
		}) : /* @__PURE__ */ _("span", {
			className: m(C["select__multiple-placeholder"], { [C["select__multiple-placeholder--disabled"]]: I }),
			children: [/* @__PURE__ */ g(a, { className: C["select__multiple-placeholder-icon"] }), /* @__PURE__ */ g("span", {
				className: C["select__multiple-placeholder-text"],
				children: u
			})]
		});
	}, [
		J,
		I,
		u,
		A
	]);
	return /* @__PURE__ */ _("div", {
		className: "relative",
		children: [
			/* @__PURE__ */ _("div", {
				className: C.select__label,
				children: [i, k && /* @__PURE__ */ g("span", {
					className: C.select__required,
					children: "*"
				})]
			}),
			/* @__PURE__ */ _("div", {
				ref: U,
				tabIndex: 0,
				"aria-owns": te && K ? `${e}-dropdown` : void 0,
				className: m(C.select__control, {
					[C["select__control--full"]]: F,
					[C["select__control--error"]]: x,
					[C["select__control--disabled"]]: I,
					[C["select__control--multiple"]]: A,
					[C["select__control--single"]]: !A
				}),
				onClick: se,
				children: [de, /* @__PURE__ */ g(w, { className: m(C.select__icon, { [C["select__icon--disabled"]]: I }) })]
			}),
			te && /* @__PURE__ */ g(V, {
				id: e,
				max: v,
				multiple: A,
				label: o,
				options: b,
				helpText: S,
				isLoading: N,
				searchTerm: O,
				fullscreen: j,
				anchorRef: U,
				dropdownRef: W,
				selectedValues: G,
				position: M,
				minWidth: s,
				onLoadMore: L,
				footerRenderer: ue,
				getValue: Z,
				onClose: le,
				onReset: H,
				onSearch: z,
				handleSelect: re
			}),
			x && /* @__PURE__ */ g("span", {
				className: C.select__error,
				children: x
			}),
			S && /* @__PURE__ */ g("span", {
				className: C.select__help,
				children: S
			})
		]
	});
}
//#endregion
export { H as t };
