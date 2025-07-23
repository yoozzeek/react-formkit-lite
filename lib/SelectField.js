import { jsx as n, Fragment as ae, jsxs as v } from "react/jsx-runtime";
import { s as l } from "./chunks/select.module.BEKfY6EC.js";
import * as W from "react";
import { useState as q, useEffect as R, memo as ie, useRef as A, useCallback as L, useMemo as fe } from "react";
import { c as O } from "./chunks/clsx.OuTLNxxd.js";
import ue from "./Button.js";
import oe from "./Badge.js";
import { u as de } from "./chunks/Header.Bc4Lstiq.js";
import { S as me } from "./chunks/plus.DFiVon3D.js";
import he from "./SelectOption.js";
import _e from "./SelectMultipleOption.js";
import ge from "./SelectDropdown.js";
function Se(i, p = !1, w = !1, b = !1) {
  const [h, d] = q(p);
  return R(() => {
    function _(m) {
      if (!b) {
        if (i.current && !i.current.contains(m.target)) {
          d(!1);
          return;
        }
        w || d(!0);
      }
    }
    return document.addEventListener("mousedown", _), () => {
      document.removeEventListener("mousedown", _);
    };
  }, [b, w]), [h, d];
}
const ve = (i) => /* @__PURE__ */ W.createElement("svg", { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...i }, /* @__PURE__ */ W.createElement("path", { d: "M5.27325 7.30685C5.64913 6.9133 6.17242 6.88242 6.63192 7.30685L10.001 10.6131L13.3701 7.30685C13.8296 6.88242 14.3538 6.9133 14.7271 7.30685C15.1029 7.69951 15.0788 8.36306 14.7271 8.7319C14.3771 9.10074 10.6795 12.7044 10.6795 12.7044C10.4924 12.9012 10.2467 13 10.001 13C9.75532 13 9.50962 12.9012 9.32082 12.7044C9.32082 12.7044 5.62499 9.10074 5.27325 8.7319C4.92065 8.36306 4.89737 7.69951 5.27325 7.30685Z", fill: "currentColor" }));
function we({
  id: i,
  label: p,
  popupLabel: w,
  dpWidth: b,
  placeholder: h = "Select value",
  max: d = 10,
  min: _ = 0,
  options: m,
  error: y,
  helpText: N,
  value: c,
  valueGetter: z,
  valueRender: E,
  searchTerm: F,
  required: P = !1,
  multiple: r = !1,
  dpFullscreen: Z = !0,
  dpPosition: G = "left",
  isLoading: H = !1,
  formikHandler: J = !0,
  fullWidth: K = !1,
  disabled: g = !1,
  onLoadMore: Q,
  onFocus: C,
  onSearch: D,
  onChange: B,
  onReset: U
}) {
  const M = A(null), f = A(/* @__PURE__ */ new Set()), X = de(), [Y, I] = Se(M, !1, !0, !X), T = A(!1), [u, a] = q([]);
  R(() => {
    if (!(typeof c == "number" && c <= 0) && !(typeof c == "string" && c.length === 0) && !(Array.isArray(c) && c.length === 0) && !T.current) {
      if (T.current = !0, r && Array.isArray(c))
        c.forEach((e) => f.current.add(e)), a(m.filter((e) => f.current.has(x(e))));
      else if (!r) {
        const e = m.find((t) => x(t) === c);
        e && (a([e]), f.current.add(e.value));
      }
    }
  }, [m]);
  const $ = L(
    (e) => {
      const t = f.current;
      if (t.has(e.value)) {
        if (t.delete(e.value), r) {
          let s = [];
          a((S) => (s = S.filter((V) => V.value !== e.value), s)), k(s);
          return;
        }
        a([]), o("");
        return;
      }
      if (!(t.size >= d)) {
        if (r) {
          let s = [];
          t.add(e.value), a((S) => (s = [...S, e], s)), k(s);
          return;
        }
        t.clear(), t.add(e.value), a([e]), o(e.value), j();
      }
    },
    [r, a]
  );
  function ee() {
    f.current.clear(), a([]), o(r ? [] : "");
  }
  R(() => {
    c || ee();
  }, [c]);
  function x(e) {
    return e ? z && e.rawData !== void 0 && e.rawData !== null ? z(e.rawData) : e.value : "";
  }
  function o(e) {
    J ? B(i, e, !0) : B(e);
  }
  function k(e = []) {
    const t = e.map((s) => s.value);
    t.length ? (t[0], o(t)) : o(r ? [] : "");
  }
  const te = L(
    (e) => {
      const t = f.current;
      if (t.has(e)) {
        if (t.delete(e), C && C({
          target: {
            id: i
          }
        }), r) {
          let s = [];
          a((S) => (s = S.filter((V) => V.value !== e), s)), k(s);
          return;
        }
        a([]), o("");
      }
    },
    [r, a]
  );
  function re() {
    g || (I(!0), C && C({
      target: {
        id: i
      }
    }));
  }
  function le() {
    I(!1), D?.("");
  }
  function j() {
    I(!1), D?.("");
  }
  const se = L(() => r ? /* @__PURE__ */ v(
    ue,
    {
      fullWidth: !0,
      type: "button",
      variant: "success",
      disabled: u.length < _,
      onClick: le,
      children: [
        "Selected ",
        u.length > 0 && `(${u.length})`
      ]
    }
  ) : /* @__PURE__ */ n(ae, {}), [u.length, _, r]), ne = fe(() => {
    if (!r) {
      const e = u[0];
      if (E && e)
        return /* @__PURE__ */ n("div", { className: "flex-1", children: E(e) });
      const t = e ? e.label : h;
      return /* @__PURE__ */ n(
        "span",
        {
          className: O("flex-1 truncate text-sm", {
            "text-gray-800": e,
            "text-gray-250": !e
          }),
          children: t
        }
      );
    }
    return u.length ? u.map((e) => {
      const t = x(e);
      return E ? E(e) : /* @__PURE__ */ n(
        oe,
        {
          id: `${t}`,
          icon: e.badgeIconEl || e.iconEl,
          onRemove: te,
          children: e.label
        },
        t
      );
    }) : /* @__PURE__ */ v(
      "span",
      {
        className: O(l["select__multiple-placeholder"], {
          [l["select__multiple-placeholder--disabled"]]: g
        }),
        children: [
          /* @__PURE__ */ n(me, { className: l["select__multiple-placeholder-icon"] }),
          /* @__PURE__ */ n("span", { className: l["select__multiple-placeholder-text"], children: h })
        ]
      }
    );
  }, [u, g, h, r]);
  function ce(e) {
    const t = x(e);
    return r ? /* @__PURE__ */ n(
      _e,
      {
        value: t,
        label: e.label,
        classes: e.classes,
        helpText: e.helpText,
        rawData: e.rawData,
        iconEl: e.iconEl,
        badgeIconEl: e.badgeIconEl,
        disabled: f.current.size >= d,
        selected: f.current.has(t),
        onSelect: $
      },
      e.value
    ) : /* @__PURE__ */ n(
      he,
      {
        value: t,
        label: e.label,
        classes: e.classes,
        helpText: e.helpText,
        rawData: e.rawData,
        iconEl: e.iconEl,
        badgeIconEl: e.badgeIconEl,
        selected: f.current.has(t),
        onSelect: $
      },
      e.value
    );
  }
  return /* @__PURE__ */ v("div", { className: "relative", children: [
    /* @__PURE__ */ v("div", { className: l.select__label, children: [
      p,
      P && /* @__PURE__ */ n("span", { className: l.select__required, children: "*" })
    ] }),
    /* @__PURE__ */ v(
      "div",
      {
        ref: M,
        tabIndex: 0,
        className: O(l.select__control, {
          [l["select__control--full"]]: K,
          [l["select__control--error"]]: y,
          [l["select__control--disabled"]]: g,
          [l["select__control--multiple"]]: r,
          [l["select__control--single"]]: !r
        }),
        onClick: re,
        children: [
          ne,
          /* @__PURE__ */ n(
            ve,
            {
              className: O(l.select__icon, {
                [l["select__icon--disabled"]]: g
              })
            }
          ),
          Y && /* @__PURE__ */ n(
            ge,
            {
              id: i,
              label: w,
              options: m,
              helpText: N,
              isLoading: H,
              searchTerm: F,
              fullscreen: Z,
              position: G,
              minWidth: b,
              onLoadMore: Q,
              optionRenderer: ce,
              footerRenderer: se,
              onClose: j,
              onReset: U,
              onSearch: D
            }
          )
        ]
      }
    ),
    y && /* @__PURE__ */ n("span", { className: l.select__error, children: y }),
    N && /* @__PURE__ */ n("span", { className: l.select__help, children: N })
  ] });
}
const Ve = ie(we);
export {
  Ve as default
};
