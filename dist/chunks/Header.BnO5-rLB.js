import { useCallback as e, useEffect as t, useMemo as n, useRef as r, useState as i } from "react";
import { clsx as a } from "clsx";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { useModal as c } from "@yoozzeek/react-context-modal";
//#region src/hooks/useIsTabletOrDesktop.ts
function l(e = "576px") {
	let [n, r] = i(o);
	t(() => {
		let e = a(), t = () => {
			r(o);
		};
		return e.addEventListener ? e.addEventListener("change", t) : e.addListener(t), r(o), () => {
			e.removeEventListener ? e.removeEventListener("change", t) : e.removeListener(t);
		};
	}, []);
	function a() {
		return window.matchMedia(`(min-width: ${e})`);
	}
	function o() {
		return a().matches;
	}
	return n;
}
var u = {
	header: "formkit-lite-header",
	"header--fixed": "formkit-lite-header--fixed",
	"header--scrolled": "formkit-lite-header--scrolled",
	"header--dark": "formkit-lite-header--dark",
	"header--light": "formkit-lite-header--light",
	"header--gradient": "formkit-lite-header--gradient",
	"header__back-button": "formkit-lite-header__back-button",
	"header__back-text": "formkit-lite-header__back-text",
	"header__back-icon-btn": "formkit-lite-header__back-icon-btn",
	"header__back-icon": "formkit-lite-header__back-icon",
	"header__back-icon--dark": "formkit-lite-header__back-icon--dark",
	"header__back-icon--light": "formkit-lite-header__back-icon--light",
	header__title: "formkit-lite-header__title",
	"header__title--spaced": "formkit-lite-header__title--spaced",
	header__actions: "formkit-lite-header__actions",
	header__action: "formkit-lite-header__action",
	"header__action--icon": "formkit-lite-header__action--icon",
	"header__action--text": "formkit-lite-header__action--text",
	"header__action--primary": "formkit-lite-header__action--primary",
	"header__action--disabled": "formkit-lite-header__action--disabled"
}, d = (e) => /* @__PURE__ */ o("svg", {
	viewBox: "0 0 10 7",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	...e,
	children: /* @__PURE__ */ o("path", {
		d: "M5.81373 5.86077C5.41491 6.41912 4.58509 6.41912 4.18627 5.86077L1.12946 1.58124C0.656692 0.91937 1.12982 1.78218e-07 1.94319 2.49325e-07L8.05681 7.83795e-07C8.87018 8.54903e-07 9.34331 0.919371 8.87054 1.58124L5.81373 5.86077Z",
		fill: "currentColor"
	})
});
//#endregion
//#region src/components/Header/Header.tsx
function f({ title: f, goBackLabel: p, onGoBack: m, serifTitle: h = !1, fixed: g = !1, titleH1: _ = !1, transparent: v = !1, transparentCover: y = !0, parentIsModal: b = !1, scrollDelta: x, variant: S = "dark", action: C, classes: w, children: T }) {
	let E = c(), D = r(null), [O, k] = i(x === 0), A = l();
	t(() => {
		if (!g || A) return;
		let e = D.current, t = E?.lastModal?.scrollableContentRef.current, n = x || e?.offsetHeight || 0, r = () => {
			let e = b && t ? E.lastModal?.scrollableContentRef.current?.scrollTop || 0 : window.scrollY;
			if (n && e > n) {
				k(!0);
				return;
			}
			k(!1);
		};
		return b && t ? (t.addEventListener("scroll", r), () => {
			t.removeEventListener("scroll", r);
		}) : (window.addEventListener("scroll", r), () => window.removeEventListener("scroll", r));
	}, [
		b,
		A,
		x,
		g,
		E?.lastModal
	]);
	let j = e(() => m?.(), [m]), M = e(() => {
		C && !C.disabled && C.onClick && C.onClick();
	}, [C]), N = n(() => C?.icon || C?.label || "Done", [C]), P = n(() => !!T || !!C, [T, C]), F = n(() => {
		let e = a(u.header__title, h && u["header__title--serif"], m && u["header__title--spaced"]);
		return o(_ ? "h1" : "div", {
			className: e,
			children: f
		});
	}, [
		f,
		_,
		h,
		m
	]);
	return /* @__PURE__ */ s("header", {
		ref: D,
		className: a(u.header, {
			[u["header--fixed"]]: g,
			[u["header--scrolled"]]: g && O,
			[u["header--gradient"]]: v && y && !O,
			[u["header--dark"]]: S === "dark" || O,
			[u["header--light"]]: S === "light" && !O,
			[w]: w
		}),
		children: [
			m && (p ? /* @__PURE__ */ o("button", {
				className: u["header__back-button"],
				type: "button",
				onClick: j,
				children: /* @__PURE__ */ o("span", {
					className: u["header__back-text"],
					children: p
				})
			}) : /* @__PURE__ */ o("button", {
				className: u["header__back-icon-btn"],
				type: "button",
				onClick: j,
				children: /* @__PURE__ */ o(d, { className: a(u["header__back-icon"], {
					[u["header__back-icon--dark"]]: S === "dark" || O,
					[u["header__back-icon--light"]]: S === "light" && !O
				}) })
			})),
			f && typeof f == "string" ? F : f,
			P && /* @__PURE__ */ s("div", {
				className: u.header__actions,
				children: [T, C && /* @__PURE__ */ o("span", {
					className: a(u.header__action, {
						[u["header__action--icon"]]: C.icon,
						[u["header__action--text"]]: !C.icon && C.label && !C.primary,
						[u["header__action--primary"]]: !C.icon && C.primary && !C.disabled,
						[u["header__action--disabled"]]: !C.icon && C.primary && C.disabled
					}),
					onClick: M,
					children: N
				})]
			})
		]
	});
}
//#endregion
export { l as n, f as t };
