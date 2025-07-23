import Qe, { jsx as f, Fragment as ge, jsxs as Pe } from "react/jsx-runtime";
import { s as O } from "./chunks/select.module.BEKfY6EC.js";
import Ze, { useRef as et, useCallback as Ve, useMemo as tt } from "react";
import { F as ot, u as rt, c as nt, H as ct } from "./chunks/Header.Bc4Lstiq.js";
import { c as lt } from "./chunks/clsx.OuTLNxxd.js";
import st from "./LoadMoreElement.js";
import it from "simplebar-react";
import ut from "./TextField.js";
import Ce from "./Loader.js";
var ne = {}, De;
function mt() {
  if (De) return ne;
  De = 1, Object.defineProperty(ne, "__esModule", { value: !0 }), ne.ViewportList = void 0;
  const ce = Qe, n = Ze, k = typeof window > "u", U = !k && (() => {
    try {
      return "ontouchstart" in window || navigator.maxTouchPoints;
    } catch {
      return !1;
    }
  })(), J = !k && (() => {
    try {
      return window.CSS.supports("overflow-anchor: auto");
    } catch {
      return !1;
    }
  })(), K = U && !J, le = {
    top: "top",
    bottom: "bottom",
    clientHeight: "clientHeight",
    scrollHeight: "scrollHeight",
    scrollTop: "scrollTop",
    overflowY: "overflowY",
    height: "height",
    minHeight: "minHeight",
    maxHeight: "maxHeight",
    marginTop: "marginTop"
  }, se = {
    top: "left",
    bottom: "right",
    scrollHeight: "scrollWidth",
    clientHeight: "clientWidth",
    scrollTop: "scrollLeft",
    overflowY: "overflowX",
    minHeight: "minWidth",
    height: "width",
    maxHeight: "maxWidth",
    marginTop: "marginLeft"
  }, E = (o, l, p = 1 / 0) => Math.max(Math.min(l, p), o), A = (o, l, p) => Math.ceil(Math.abs(o - l) / p), C = k ? n.useEffect : n.useLayoutEffect, xe = (o, l, p) => {
    const I = [];
    for (let L = o; L < l; L++)
      I.push(p(L));
    return I;
  }, S = ({ fromElement: o, toElement: l, fromIndex: p, asc: I = !0, compare: L }) => {
    let h = p, v = o;
    for (; v && v !== l; ) {
      if (L(v, h))
        return [v, h];
      I ? (h++, v = v.nextSibling) : (h--, v = v.previousSibling);
    }
    return [null, -1];
  }, ie = /auto|scroll/gi, ue = (o, l) => {
    if (!l || l === document.body || l === document.documentElement)
      return document.documentElement;
    const p = window.getComputedStyle(l);
    return ie.test(p[o.overflowY]) || ie.test(p.overflow) ? l : ue(o, l.parentNode);
  }, X = (o, l, p = 0) => ({
    padding: 0,
    margin: 0,
    border: "none",
    visibility: "hidden",
    overflowAnchor: "none",
    [o.minHeight]: l,
    [o.height]: l,
    [o.maxHeight]: l,
    [o.marginTop]: p
  }), me = ({ items: o = [], count: l, children: p, viewportRef: I, itemSize: L = 0, itemMargin: h = -1, overscan: v = 1, axis: We = "y", initialIndex: ae = -1, initialAlignToTop: Ye = !0, initialOffset: Be = 0, initialDelay: je = -1, initialPrerender: Ee = 0, onViewportIndexesChange: we, overflowAnchor: ke = "auto", withCache: q = !0, scrollThreshold: ye = 0, renderSpacer: Ie = ({ ref: e, style: pe }) => (0, ce.jsx)("div", { ref: e, style: pe }), indexesShift: fe = 0, getItemBoundingClientRect: T = (e) => e.getBoundingClientRect() }, Xe) => {
    const e = We === "y" ? le : se, pe = typeof l == "number", w = (pe ? l : o.length) - 1, [[H, de], qe] = (0, n.useState)(() => [
      E(0, L),
      E(-1, h)
    ]), D = E(0, H + de), He = E(0, Math.ceil(v * D)), [R, Me] = (0, n.useState)([ae - Ee, ae + Ee]), W = (0, n.useRef)(null), z = (0, n.useRef)(-1), Y = (0, n.useRef)(null), he = (0, n.useRef)(null), Se = (0, n.useRef)(!1), Oe = (0, n.useRef)(fe), Q = (0, n.useRef)([]), P = (0, n.useRef)(ae >= 0 ? {
      index: ae,
      alignToTop: Ye,
      offset: Be,
      delay: je,
      prerender: Ee
    } : null), Z = (0, n.useRef)(null), N = (0, n.useRef)(0), be = (0, n.useRef)([-1, -1]), ee = (0, n.useRef)(null), [s, b] = (0, n.useMemo)(() => {
      R[0] = E(0, R[0], w), R[1] = E(R[0], R[1], w);
      const t = fe - Oe.current;
      Oe.current = fe;
      const r = Y.current;
      return r && t && (R[0] = E(0, R[0] + t, w), R[1] = E(R[0], R[1] + t, w), W.current = r.nextSibling, z.current = R[0], Se.current = !0), R;
    }, [fe, R, w]), ze = (0, n.useMemo)(() => X(e, (q ? Q.current : []).slice(0, s).reduce((t, r) => t + (r - H), s * D), N.current), [e, q, s, D, H]), $e = (0, n.useMemo)(() => X(e, (q ? Q.current : []).slice(b + 1, w + 1).reduce((t, r) => t + (r - H), D * (w - b))), [e, q, b, w, D, H]), $ = (0, n.useMemo)(() => {
      let t = null;
      return () => {
        if (I)
          return I.current === document.body ? document.documentElement : I.current;
        if (t && t.isConnected)
          return t;
        const r = Y.current;
        return r ? (t = ue(e, r.parentNode), t) : null;
      };
    }, [e, I]), Re = (0, n.useRef)(() => {
    }), Ae = (0, n.useRef)(() => ({ index: -1, offset: 0 }));
    C(() => {
      Re.current = () => {
        const t = $(), r = Y.current, i = he.current;
        if (!t || !r || !i)
          return;
        const m = r.nextSibling, x = i.previousSibling, M = t.getBoundingClientRect(), d = r.getBoundingClientRect(), a = i.getBoundingClientRect(), _ = {
          [e.top]: t === document.documentElement ? 0 : M[e.top],
          [e.bottom]: t === document.documentElement ? document.documentElement[e.clientHeight] : M[e.bottom]
        }, u = {
          [e.top]: _[e.top] - He,
          [e.bottom]: _[e.bottom] + He
        };
        if (N.current < 0 && d[e.top] - N.current >= u[e.top] || N.current > 0 && d[e.top] >= u[e.top] || N.current && P.current) {
          r.style[e.marginTop] = "0px", t.style[e.overflowY] = "hidden", t[e.scrollTop] += -N.current, t.style[e.overflowY] = "", N.current = 0;
          return;
        }
        if (H === 0 || de === -1) {
          let c = 0;
          if (S({
            fromElement: m,
            toElement: i,
            fromIndex: s,
            compare: (j) => (c += T(j)[e.height], !1)
          }), !c)
            return;
          const g = b - s + 1, F = H === 0 ? Math.ceil(c / g) : H, B = de === -1 ? Math.ceil((a[e.top] - d[e.bottom] - c) / g) : de;
          qe([F, B]);
          return;
        }
        if (Z.current)
          return;
        if (P.current) {
          const c = E(0, P.current.index, w);
          if (c < s || c > b) {
            Me([
              c - P.current.prerender,
              c + P.current.prerender
            ]);
            return;
          }
          const [g] = S({
            fromElement: m,
            toElement: i,
            fromIndex: s,
            compare: (ve, Te) => Te === c
          });
          if (!g)
            return;
          const { alignToTop: F, offset: B, delay: j } = P.current;
          P.current = null;
          const Ne = () => {
            const ve = T(g), Te = F ? ve[e.top] - _[e.top] + B : ve[e.bottom] - _[e.top] - t[e.clientHeight] + B;
            t[e.scrollTop] += Te, Z.current = null;
          }, Fe = j < 0 && K ? 30 : j;
          if (Fe > 0) {
            Z.current = setTimeout(Ne, Fe);
            return;
          }
          Ne();
          return;
        }
        if (ee.current === null)
          ee.current = t.scrollTop;
        else if (ee.current !== t.scrollTop) {
          const c = Math.abs(t.scrollTop - ee.current);
          if (ee.current = t.scrollTop, ye > 0 && c > ye)
            return;
        }
        const te = m === i ? i : m.nextSibling, Le = x === r ? r : x.previousSibling, G = Math.ceil((a[e.top] - d[e.bottom]) / (b + 1 - s)), oe = d[e.bottom] > u[e.bottom], re = a[e.top] < u[e.top], Ge = !oe && !re && d[e.bottom] > u[e.top], Ue = !oe && !re && a[e.top] < u[e.bottom], Je = !oe && !re && (Le === r ? d : T(Le))[e.bottom] > u[e.bottom], Ke = !oe && !re && (te === i ? a : T(te))[e.top] < u[e.top];
        let y = s, V = b;
        if (oe && (y -= A(d[e.bottom], u[e.top], G), V -= A(a[e.top], u[e.bottom], G)), re && (V += A(a[e.top], u[e.bottom], G), y += A(d[e.bottom], u[e.top], G)), Ge && (y -= A(d[e.bottom], u[e.top], G)), Ue && (V += A(a[e.top], u[e.bottom], G)), Je) {
          const [, c] = S({
            fromElement: x,
            toElement: r,
            fromIndex: b,
            asc: !1,
            compare: (g) => T(g)[e.bottom] <= u[e.bottom]
          });
          c !== -1 && (V = c + 1);
        }
        if (Ke) {
          const [, c] = S({
            fromElement: m,
            toElement: i,
            fromIndex: s,
            compare: (g) => T(g)[e.top] >= u[e.top]
          });
          c !== -1 && (y = c - 1);
        }
        if (we) {
          let [, c] = S({
            fromElement: m,
            toElement: i,
            fromIndex: s,
            compare: (F) => T(F)[e.bottom] > _[e.top]
          });
          c === -1 && (c = s);
          let [, g] = S({
            fromElement: x,
            toElement: r,
            fromIndex: b,
            asc: !1,
            compare: (F) => T(F)[e.top] < _[e.bottom]
          });
          g === -1 && (g = b), (c !== be.current[0] || g !== be.current[1]) && (be.current = [c, g], we(be.current));
        }
        if (y = E(0, y, w), V = E(y, V, w), !(y === s && V === b)) {
          if (y !== s)
            if (s >= y)
              W.current = m, z.current = s;
            else {
              const [c, g] = S({
                fromElement: m,
                toElement: i,
                fromIndex: s,
                compare: (F, B) => {
                  if (B === y)
                    return !0;
                  const j = T(F);
                  return j[e.height] !== H && (Q.current[B] = j[e.height]), !1;
                }
              });
              c ? (W.current = c, z.current = g) : (W.current = x, z.current = b);
            }
          Me([y, V]);
        }
      }, Ae.current = () => {
        const t = $(), r = Y.current, i = he.current;
        let m = -1, x = 0;
        if (!t || !r || !i)
          return { index: m, offset: x };
        const M = r.nextSibling, d = t.getBoundingClientRect(), a = {
          [e.top]: t === document.documentElement ? 0 : d[e.top],
          [e.bottom]: t === document.documentElement ? document.documentElement[e.clientHeight] : d[e.bottom]
        };
        return S({
          fromElement: M,
          toElement: i,
          fromIndex: s,
          compare: (_, u) => {
            const te = T(_);
            return m = u, x = a[e.top] - te[e.top], te[e.bottom] > a[e.top];
          }
        }), { index: m, offset: x };
      };
    });
    let _e;
    return W.current && $() && Y.current && (_e = T(W.current)[e.top] - ($() === document.documentElement ? 0 : $().getBoundingClientRect()[e.top])), C(() => {
      W.current = null;
      const t = z.current, r = Se.current;
      z.current = -1, Se.current = !1;
      const i = $(), m = Y.current, x = he.current;
      if (t === -1 || !i || !m || !x || _e === void 0 || J && ke !== "none" && !r)
        return;
      let M = null;
      if (t >= s && t <= b) {
        const [a] = S({
          fromElement: m.nextSibling,
          toElement: x,
          fromIndex: s,
          compare: (_, u) => u === t
        });
        a && (M = T(a)[e.top]);
      } else
        t < s ? M = m.getBoundingClientRect()[e.top] + (q ? Q.current : []).slice(0, t).reduce((a, _) => a + (_ - H), t * D) : t <= w && (M = x.getBoundingClientRect()[e.top] + (q ? Q.current : []).slice(b + 1, t).reduce((a, _) => a + (_ - H), D * (t - 1 - b)));
      if (M === null)
        return;
      const d = M - (i === document.documentElement ? 0 : i.getBoundingClientRect()[e.top]) - _e;
      if (d) {
        if (U) {
          N.current -= d, m.style[e.marginTop] = `${N.current}px`;
          return;
        }
        i[e.scrollTop] += d;
      }
    }, [s]), C(() => {
      let t;
      const r = () => {
        t = requestAnimationFrame(r), Re.current();
      };
      return r(), () => {
        cancelAnimationFrame(t), Z.current && clearTimeout(Z.current);
      };
    }, []), (0, n.useImperativeHandle)(Xe, () => ({
      scrollToIndex: ({ index: t = -1, alignToTop: r = !0, offset: i = 0, delay: m = -1, prerender: x = 0 }) => {
        P.current = { index: t, alignToTop: r, offset: i, delay: m, prerender: x }, Re.current();
      },
      getScrollPosition: () => Ae.current()
    }), []), (0, ce.jsxs)(n.Fragment, { children: [Ie({ ref: Y, style: ze, type: "top" }), (!!l || !!o.length) && xe(s, b + 1, pe ? p : (t) => p(o[t], t, o)), Ie({ ref: he, style: $e, type: "bottom" })] });
  };
  return ne.ViewportList = (0, n.forwardRef)(me), ne;
}
var at = mt();
function Rt({
  id: ce,
  label: n = "Select option",
  position: k = "left",
  helpText: U,
  options: J = [],
  isLoading: K = !1,
  fullscreen: le = !0,
  minWidth: se,
  searchTerm: E = "",
  footerRenderer: A,
  onLoadMore: C,
  optionRenderer: xe,
  onSearch: S,
  onReset: ie,
  onClose: ue
}) {
  const X = et(null), me = ot(), o = rt(), l = (h) => S && S(h.target.value), p = Ve(
    (h) => o ? /* @__PURE__ */ f(
      "div",
      {
        className: lt(O.select__dropdown, {
          [O["select__dropdown--left"]]: k === "left",
          [O["select__dropdown--right"]]: k === "right"
        }),
        role: "combobox",
        "aria-controls": "listbox",
        "aria-expanded": "true",
        style: {
          ...se && o ? { minWidth: se } : {}
        },
        children: h
      }
    ) : /* @__PURE__ */ f(
      nt,
      {
        id: "select-field-modal",
        title: n,
        type: le ? "fullscreen" : "overlay-90",
        fallbackCtx: me,
        headerRenderer: (v) => le ? /* @__PURE__ */ f(
          ct,
          {
            fixed: !0,
            parentIsModal: !0,
            classes: "safe-top",
            title: n,
            onGoBack: v
          }
        ) : /* @__PURE__ */ f(ge, {}),
        footerRenderer: A,
        onClose: ue,
        children: /* @__PURE__ */ f("div", { className: "mt-16", children: h })
      }
    ),
    [o, A]
  ), I = tt(() => K ? /* @__PURE__ */ f("div", { className: O["select__loading-block"], children: /* @__PURE__ */ f(Ce, { size: "sm" }) }) : C ? /* @__PURE__ */ f(st, { loadMore: C }) : null, [K, C]), L = Ve(
    (h) => o ? /* @__PURE__ */ f(
      it,
      {
        scrollableNodeProps: { ref: X },
        className: O["select__scrollable-simplebar"],
        children: h
      }
    ) : /* @__PURE__ */ f("div", { ref: X, className: O.select__scrollable, children: h }),
    [o]
  );
  return /* @__PURE__ */ f(ge, { children: p(
    /* @__PURE__ */ Pe(ge, { children: [
      S && /* @__PURE__ */ f("div", { className: O.select__search, children: /* @__PURE__ */ f(
        ut,
        {
          fullWidth: !0,
          id: `${ce}-search`,
          placeholder: "Search...",
          value: E || "",
          onChange: l,
          onReset: ie
        }
      ) }),
      !o && U && /* @__PURE__ */ f("p", { className: O.select__help, children: U }),
      J.length ? L(
        /* @__PURE__ */ Pe(ge, { children: [
          /* @__PURE__ */ f(
            at.ViewportList,
            {
              viewportRef: o ? X : me?.lastModal?.scrollableContentRef,
              items: J,
              children: (h) => xe(h)
            }
          ),
          I
        ] })
      ) : K ? /* @__PURE__ */ f("div", { className: O["select__loading-block"], children: /* @__PURE__ */ f(Ce, { size: "sm" }) }) : /* @__PURE__ */ f("p", { className: O["select__no-results"], children: "No results" })
    ] })
  ) });
}
export {
  Rt as default
};
