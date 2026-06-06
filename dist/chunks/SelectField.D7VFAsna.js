import { t as e } from "./Loader.DI5rvy7C.js";
import { t } from "./Button.wmX7vita.js";
import { t as n } from "./Badge.BfJadn6o.js";
import { n as r, t as i } from "./Header.BnO5-rLB.js";
import { t as a } from "./plus.Bn80kaIC.js";
import { t as o } from "./TextField.1oilo5Dc.js";
import { t as s } from "./check._Bvx9p5F.js";
import { useCallback as c, useEffect as l, useMemo as u, useRef as d, useState as f } from "react";
import { clsx as p } from "clsx";
import { Fragment as m, jsx as h, jsxs as g } from "react/jsx-runtime";
import { Modal as _, useModalStackCtx as v } from "@yoozzeek/react-context-modal";
import y from "simplebar-react";
import { ViewportList as b } from "react-viewport-list";
var x = {
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
	"select__dropdown--left": "formkit-lite-select__dropdown--left",
	"select__dropdown--right": "formkit-lite-select__dropdown--right",
	select__search: "formkit-lite-select__search",
	"select__loading-block": "formkit-lite-select__loading-block",
	"select__scrollable-simplebar": "formkit-lite-select__scrollable-simplebar",
	select__scrollable: "formkit-lite-select__scrollable",
	"select__no-results": "formkit-lite-select__no-results",
	select__error: "formkit-lite-select__error",
	select__help: "formkit-lite-select__help",
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
function S(e, t = !1, n = !1, r = !1) {
	let [i, a] = f(t);
	return l(() => {
		function t(t) {
			if (!r) {
				if (e.current && !e.current.contains(t.target)) {
					a(!1);
					return;
				}
				n || a(!0);
			}
		}
		return document.addEventListener("mousedown", t), () => {
			document.removeEventListener("mousedown", t);
		};
	}, [r, n]), [i, a];
}
//#endregion
//#region src/assets/icons/chevron-down.svg?react
var C = (e) => /* @__PURE__ */ h("svg", {
	viewBox: "0 0 20 20",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	...e,
	children: /* @__PURE__ */ h("path", {
		d: "M5.27325 7.30685C5.64913 6.9133 6.17242 6.88242 6.63192 7.30685L10.001 10.6131L13.3701 7.30685C13.8296 6.88242 14.3538 6.9133 14.7271 7.30685C15.1029 7.69951 15.0788 8.36306 14.7271 8.7319C14.3771 9.10074 10.6795 12.7044 10.6795 12.7044C10.4924 12.9012 10.2467 13 10.001 13C9.75532 13 9.50962 12.9012 9.32082 12.7044C9.32082 12.7044 5.62499 9.10074 5.27325 8.7319C4.92065 8.36306 4.89737 7.69951 5.27325 7.30685Z",
		fill: "currentColor"
	})
});
//#endregion
//#region src/utils/isInViewport.ts
function w(e) {
	if (!e) return !1;
	let t = e.getBoundingClientRect();
	return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth);
}
//#endregion
//#region src/components/Select/LoadMoreElement.tsx
var T = ({ threshold: e = 1, loadMore: t }) => {
	let n = d(null), r = d(null);
	return l(() => (n.current = new IntersectionObserver((e) => {
		e.forEach((e) => {
			e.isIntersecting && r?.current && w(r.current) && t();
		});
	}, { threshold: e }), r?.current && n.current.observe(r.current), () => {
		n.current?.disconnect();
	}), [t]), /* @__PURE__ */ h("div", {
		ref: r,
		className: "relative -z-10 h-[1px] w-[1px] opacity-0",
		children: /* @__PURE__ */ h("span", {
			className: "sr-only",
			children: "Show more"
		})
	});
};
//#endregion
//#region src/components/Select/SelectMultipleOption.tsx
function E({ label: e, value: t, classes: n, helpText: r, iconEl: i, badgeIconEl: a, rawData: o, disabled: c = !1, selected: l = !1, onSelect: u }) {
	let [d, m] = f(!1);
	function _(s) {
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
	return /* @__PURE__ */ g("div", {
		className: p(x["select-option"], {
			"cursor-pointer": !c,
			[x["select-option--disabled"]]: c && !l,
			[n || ""]: !!n
		}),
		onClick: _,
		onMouseEnter: () => m(!0),
		onMouseLeave: () => m(!1),
		children: [
			/* @__PURE__ */ g("div", {
				className: "flex flex-1 items-center",
				children: [i && /* @__PURE__ */ h("span", {
					className: x["select-option__icon"],
					children: i
				}), e]
			}),
			r && /* @__PURE__ */ h("span", {
				className: x["select-option__help"],
				children: r
			}),
			/* @__PURE__ */ h("span", {
				className: p(x["select-option__checkbox"], {
					[x["select-option__checkbox--selected"]]: l && !d,
					[x["select-option__checkbox--hovered"]]: l && d,
					[x["select-option__checkbox--unselected"]]: !l
				}),
				children: l && /* @__PURE__ */ h(s, { className: x["select-option__check-icon"] })
			})
		]
	});
}
//#endregion
//#region src/components/Select/SelectOption.tsx
function D({ label: e, value: t, classes: n, helpText: r, iconEl: i, badgeIconEl: a, rawData: o, selected: s = !1, onSelect: c }) {
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
	return /* @__PURE__ */ g("div", {
		className: p(x["select-option"], {
			[x["select-option--single-selected"]]: s,
			[n || ""]: !!n
		}),
		onClick: l,
		children: [/* @__PURE__ */ g("div", {
			className: "flex flex-1 items-center",
			children: [i && /* @__PURE__ */ h("span", {
				className: x["select-option__icon"],
				children: i
			}), e]
		}), r && /* @__PURE__ */ h("span", {
			className: x["select-option__help"],
			children: r
		})]
	});
}
//#endregion
//#region src/components/Select/SelectDropdown.tsx
function O({ option: e, multiple: t, max: n = 3, selectedValues: r, handleSelect: i, getValue: a, onClose: o }) {
	let s = a(e);
	function c() {
		i(e), o?.();
	}
	return t ? /* @__PURE__ */ h(E, {
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
	}) : /* @__PURE__ */ h(D, {
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
function k({ id: t, label: n = "Select option", position: a = "left", helpText: s, multiple: l, max: f = 3, selectedValues: S, options: C = [], isLoading: w = !1, fullscreen: E = !0, minWidth: D, searchTerm: k = "", footerRenderer: A, getValue: j, onLoadMore: M, handleSelect: N, onSearch: P, onReset: F, onClose: I }) {
	let L = d(null), R = v(), z = r(), B = (e) => P && P(e.target.value), V = c((e) => z ? /* @__PURE__ */ h(y, {
		scrollableNodeProps: { ref: L },
		className: x["select__scrollable-simplebar"],
		children: e
	}) : /* @__PURE__ */ h("div", {
		ref: L,
		className: x.select__scrollable,
		children: e
	}), [z]), H = u(() => w ? /* @__PURE__ */ h("div", {
		className: x["select__loading-block"],
		children: /* @__PURE__ */ h(e, { size: "sm" })
	}) : M ? /* @__PURE__ */ h(T, { loadMore: M }) : null, [w, M]), U = c((n) => /* @__PURE__ */ g(m, { children: [
		P && /* @__PURE__ */ h("div", {
			className: x.select__search,
			children: /* @__PURE__ */ h(o, {
				fullWidth: !0,
				id: `${t}-search`,
				placeholder: "Search...",
				value: k || "",
				onChange: B,
				onReset: F
			})
		}),
		!z && s && /* @__PURE__ */ h("p", {
			className: x.select__help,
			children: s
		}),
		C.length ? V(/* @__PURE__ */ g(m, { children: [/* @__PURE__ */ h(b, {
			viewportRef: z ? L : R?.lastModal?.scrollableContentRef,
			items: C,
			children: (e) => /* @__PURE__ */ h(O, {
				max: f,
				option: e,
				multiple: l,
				selectedValues: S,
				getValue: j,
				handleSelect: N,
				onClose: n
			}, `${e.value}`)
		}), H] })) : w ? /* @__PURE__ */ h("div", {
			className: x["select__loading-block"],
			children: /* @__PURE__ */ h(e, { size: "sm" })
		}) : /* @__PURE__ */ h("p", {
			className: x["select__no-results"],
			children: "No results"
		})
	] }), [
		t,
		C,
		s,
		w,
		z,
		H,
		V,
		k
	]);
	return z ? /* @__PURE__ */ h("div", {
		className: p(x.select__dropdown, {
			[x["select__dropdown--left"]]: a === "left",
			[x["select__dropdown--right"]]: a === "right"
		}),
		role: "combobox",
		"aria-controls": "listbox",
		"aria-expanded": "true",
		style: { ...D && z ? { minWidth: D } : {} },
		children: U()
	}) : /* @__PURE__ */ h(_, {
		id: "select-field-modal",
		title: n,
		type: E ? "fullscreen" : "overlay-90",
		fallbackCtx: R,
		headerRenderer: (e) => E ? /* @__PURE__ */ h(i, {
			fixed: !0,
			parentIsModal: !0,
			classes: "safe-top",
			title: n,
			onGoBack: e
		}) : /* @__PURE__ */ h(m, {}),
		footerRenderer: A,
		onClose: I,
		children: (e) => /* @__PURE__ */ h("div", {
			className: "mt-16",
			children: U(e)
		})
	});
}
//#endregion
//#region src/components/Select/SelectField.tsx
function A({ id: e, label: i, popupLabel: o, dpWidth: s, placeholder: _ = "Select value", max: v = 10, min: y = 0, options: b, error: w, helpText: T, value: E, valueGetter: D, valueRender: O, searchTerm: A, required: j = !1, multiple: M = !1, dpFullscreen: N = !0, dpPosition: P = "left", isLoading: F = !1, formikHandler: I = !1, fullWidth: L = !1, disabled: R = !1, onLoadMore: z, onFocus: B, onSearch: V, onChange: H, onReset: U }) {
	let W = d(null), G = d(/* @__PURE__ */ new Set()), [ee, K] = S(W, !1, !0, !r()), q = d(!1), [J, Y] = f([]), X = d([]);
	l(() => {
		X.current = J;
	}, [J]), l(() => {
		if (!(typeof E == "number" && E <= 0) && !(typeof E == "string" && E.length === 0) && !(Array.isArray(E) && E.length === 0) && !q.current) {
			if (q.current = !0, M && Array.isArray(E)) E.forEach((e) => G.current.add(e)), Y(b.filter((e) => G.current.has(Z(e))));
			else if (!M) {
				let e = b.find((e) => Z(e) === E);
				e && (Y([e]), G.current.add(e.value));
			}
		}
	}, [b]);
	let te = c((e) => {
		let t = G.current;
		if (t.has(e.value)) {
			if (t.delete(e.value), M) {
				let t = X.current.filter((t) => t.value !== e.value);
				Y(t), $(t);
				return;
			}
			Y([]), Q("");
			return;
		}
		if (!(t.size >= v)) {
			if (M) {
				t.add(e.value);
				let n = [...X.current, e];
				Y(n), $(n);
				return;
			}
			t.clear(), t.add(e.value), Y([e]), Q(e.value), oe();
		}
	}, [M]);
	function ne() {
		G.current.clear(), Y([]), Q(M ? [] : "");
	}
	l(() => {
		E || ne();
	}, [E]);
	function Z(e) {
		return D && e.rawData !== void 0 && e.rawData !== null ? D(e.rawData) : e.value;
	}
	function Q(t) {
		I ? H(e, t, !0) : H(t);
	}
	function $(e = []) {
		let t = e.map((e) => e.value);
		t.length ? (t[0], Q(t)) : Q(M ? [] : "");
	}
	let re = c((t) => {
		let n = G.current;
		if (n.has(t)) {
			if (n.delete(t), B && B({ target: { id: e } }), M) {
				let e = [];
				Y((n) => (e = n.filter((e) => e.value !== t), e)), $(e);
				return;
			}
			Y([]), Q("");
		}
	}, [M, Y]);
	function ie() {
		R || (K(!0), B && B({ target: { id: e } }));
	}
	function ae() {
		K(!1), V?.("");
	}
	function oe() {
		V?.(""), K(!1);
	}
	let se = c((e) => {
		function n() {
			ae(), e();
		}
		return M ? /* @__PURE__ */ g(t, {
			fullWidth: !0,
			type: "button",
			variant: "success",
			disabled: J.length < y,
			onClick: n,
			children: ["Selected ", J.length > 0 && `(${J.length})`]
		}) : /* @__PURE__ */ h(m, {});
	}, [
		J.length,
		y,
		M
	]), ce = u(() => {
		if (!M) {
			let e = J[0];
			if (O && e) return /* @__PURE__ */ h("div", {
				className: "flex-1",
				children: O(e)
			});
			let t = e ? e.label : _;
			return /* @__PURE__ */ h("span", {
				className: p("flex-1 truncate text-sm", {
					"text-gray-800": e,
					"text-gray-250": !e
				}),
				children: t
			});
		}
		return J.length ? J.map((e) => {
			let t = Z(e), r = `${t}`;
			return O ? O(e) : /* @__PURE__ */ h(n, {
				id: t,
				icon: e.badgeIconEl || e.iconEl,
				onRemove: re,
				children: e.label
			}, r);
		}) : /* @__PURE__ */ g("span", {
			className: p(x["select__multiple-placeholder"], { [x["select__multiple-placeholder--disabled"]]: R }),
			children: [/* @__PURE__ */ h(a, { className: x["select__multiple-placeholder-icon"] }), /* @__PURE__ */ h("span", {
				className: x["select__multiple-placeholder-text"],
				children: _
			})]
		});
	}, [
		J,
		R,
		_,
		M
	]);
	return /* @__PURE__ */ g("div", {
		className: "relative",
		children: [
			/* @__PURE__ */ g("div", {
				className: x.select__label,
				children: [i, j && /* @__PURE__ */ h("span", {
					className: x.select__required,
					children: "*"
				})]
			}),
			/* @__PURE__ */ g("div", {
				ref: W,
				tabIndex: 0,
				className: p(x.select__control, {
					[x["select__control--full"]]: L,
					[x["select__control--error"]]: w,
					[x["select__control--disabled"]]: R,
					[x["select__control--multiple"]]: M,
					[x["select__control--single"]]: !M
				}),
				onClick: ie,
				children: [
					ce,
					/* @__PURE__ */ h(C, { className: p(x.select__icon, { [x["select__icon--disabled"]]: R }) }),
					ee && /* @__PURE__ */ h(k, {
						id: e,
						max: v,
						multiple: M,
						label: o,
						options: b,
						helpText: T,
						isLoading: F,
						searchTerm: A,
						fullscreen: N,
						selectedValues: G,
						position: P,
						minWidth: s,
						onLoadMore: z,
						footerRenderer: se,
						getValue: Z,
						onClose: oe,
						onReset: U,
						onSearch: V,
						handleSelect: te
					})
				]
			}),
			w && /* @__PURE__ */ h("span", {
				className: x.select__error,
				children: w
			}),
			T && /* @__PURE__ */ h("span", {
				className: x.select__help,
				children: T
			})
		]
	});
}
//#endregion
export { A as t };
