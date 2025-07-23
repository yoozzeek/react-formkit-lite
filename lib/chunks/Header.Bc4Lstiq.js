import { jsxs as q, jsx as m, Fragment as Me } from "react/jsx-runtime";
import * as Z from "react";
import xe, { memo as Ae, useRef as j, useState as re, useMemo as Q, useEffect as ce, useCallback as J, useLayoutEffect as he, useContext as Pe, createContext as He } from "react";
import { c as me } from "./clsx.OuTLNxxd.js";
import { useMediaQuery as Te } from "react-responsive";
import Ie from "simplebar-react";
function Ye() {
  return Te({
    query: "(min-width: 576px)"
  });
}
var fe = { exports: {} }, O = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var be;
function je() {
  if (be) return O;
  be = 1;
  var n = xe;
  function a(o) {
    var r = "https://react.dev/errors/" + o;
    if (1 < arguments.length) {
      r += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var s = 2; s < arguments.length; s++)
        r += "&args[]=" + encodeURIComponent(arguments[s]);
    }
    return "Minified React error #" + o + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function l() {
  }
  var i = {
    d: {
      f: l,
      r: function() {
        throw Error(a(522));
      },
      D: l,
      C: l,
      L: l,
      m: l,
      X: l,
      S: l,
      M: l
    },
    p: 0,
    findDOMNode: null
  }, d = Symbol.for("react.portal");
  function g(o, r, s) {
    var t = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: t == null ? null : "" + t,
      children: o,
      containerInfo: r,
      implementation: s
    };
  }
  var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function w(o, r) {
    if (o === "font") return "";
    if (typeof r == "string")
      return r === "use-credentials" ? r : "";
  }
  return O.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, O.createPortal = function(o, r) {
    var s = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11)
      throw Error(a(299));
    return g(o, r, null, s);
  }, O.flushSync = function(o) {
    var r = h.T, s = i.p;
    try {
      if (h.T = null, i.p = 2, o) return o();
    } finally {
      h.T = r, i.p = s, i.d.f();
    }
  }, O.preconnect = function(o, r) {
    typeof o == "string" && (r ? (r = r.crossOrigin, r = typeof r == "string" ? r === "use-credentials" ? r : "" : void 0) : r = null, i.d.C(o, r));
  }, O.prefetchDNS = function(o) {
    typeof o == "string" && i.d.D(o);
  }, O.preinit = function(o, r) {
    if (typeof o == "string" && r && typeof r.as == "string") {
      var s = r.as, t = w(s, r.crossOrigin), e = typeof r.integrity == "string" ? r.integrity : void 0, c = typeof r.fetchPriority == "string" ? r.fetchPriority : void 0;
      s === "style" ? i.d.S(
        o,
        typeof r.precedence == "string" ? r.precedence : void 0,
        {
          crossOrigin: t,
          integrity: e,
          fetchPriority: c
        }
      ) : s === "script" && i.d.X(o, {
        crossOrigin: t,
        integrity: e,
        fetchPriority: c,
        nonce: typeof r.nonce == "string" ? r.nonce : void 0
      });
    }
  }, O.preinitModule = function(o, r) {
    if (typeof o == "string")
      if (typeof r == "object" && r !== null) {
        if (r.as == null || r.as === "script") {
          var s = w(
            r.as,
            r.crossOrigin
          );
          i.d.M(o, {
            crossOrigin: s,
            integrity: typeof r.integrity == "string" ? r.integrity : void 0,
            nonce: typeof r.nonce == "string" ? r.nonce : void 0
          });
        }
      } else r == null && i.d.M(o);
  }, O.preload = function(o, r) {
    if (typeof o == "string" && typeof r == "object" && r !== null && typeof r.as == "string") {
      var s = r.as, t = w(s, r.crossOrigin);
      i.d.L(o, s, {
        crossOrigin: t,
        integrity: typeof r.integrity == "string" ? r.integrity : void 0,
        nonce: typeof r.nonce == "string" ? r.nonce : void 0,
        type: typeof r.type == "string" ? r.type : void 0,
        fetchPriority: typeof r.fetchPriority == "string" ? r.fetchPriority : void 0,
        referrerPolicy: typeof r.referrerPolicy == "string" ? r.referrerPolicy : void 0,
        imageSrcSet: typeof r.imageSrcSet == "string" ? r.imageSrcSet : void 0,
        imageSizes: typeof r.imageSizes == "string" ? r.imageSizes : void 0,
        media: typeof r.media == "string" ? r.media : void 0
      });
    }
  }, O.preloadModule = function(o, r) {
    if (typeof o == "string")
      if (r) {
        var s = w(r.as, r.crossOrigin);
        i.d.m(o, {
          as: typeof r.as == "string" && r.as !== "script" ? r.as : void 0,
          crossOrigin: s,
          integrity: typeof r.integrity == "string" ? r.integrity : void 0
        });
      } else i.d.m(o);
  }, O.requestFormReset = function(o) {
    i.d.r(o);
  }, O.unstable_batchedUpdates = function(o, r) {
    return o(r);
  }, O.useFormState = function(o, r, s) {
    return h.H.useFormState(o, r, s);
  }, O.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, O.version = "19.1.0", O;
}
var S = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var we;
function Ue() {
  return we || (we = 1, process.env.NODE_ENV !== "production" && function() {
    function n() {
    }
    function a(t) {
      return "" + t;
    }
    function l(t, e, c) {
      var _ = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      try {
        a(_);
        var T = !1;
      } catch {
        T = !0;
      }
      return T && (console.error(
        "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
        typeof Symbol == "function" && Symbol.toStringTag && _[Symbol.toStringTag] || _.constructor.name || "Object"
      ), a(_)), {
        $$typeof: r,
        key: _ == null ? null : "" + _,
        children: t,
        containerInfo: e,
        implementation: c
      };
    }
    function i(t, e) {
      if (t === "font") return "";
      if (typeof e == "string")
        return e === "use-credentials" ? e : "";
    }
    function d(t) {
      return t === null ? "`null`" : t === void 0 ? "`undefined`" : t === "" ? "an empty string" : 'something with type "' + typeof t + '"';
    }
    function g(t) {
      return t === null ? "`null`" : t === void 0 ? "`undefined`" : t === "" ? "an empty string" : typeof t == "string" ? JSON.stringify(t) : typeof t == "number" ? "`" + t + "`" : 'something with type "' + typeof t + '"';
    }
    function h() {
      var t = s.H;
      return t === null && console.error(
        `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
      ), t;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var w = xe, o = {
      d: {
        f: n,
        r: function() {
          throw Error(
            "Invalid form element. requestFormReset must be passed a form that was rendered by React."
          );
        },
        D: n,
        C: n,
        L: n,
        m: n,
        X: n,
        S: n,
        M: n
      },
      p: 0,
      findDOMNode: null
    }, r = Symbol.for("react.portal"), s = w.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error(
      "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"
    ), S.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, S.createPortal = function(t, e) {
      var c = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
        throw Error("Target container is not a DOM element.");
      return l(t, e, null, c);
    }, S.flushSync = function(t) {
      var e = s.T, c = o.p;
      try {
        if (s.T = null, o.p = 2, t)
          return t();
      } finally {
        s.T = e, o.p = c, o.d.f() && console.error(
          "flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."
        );
      }
    }, S.preconnect = function(t, e) {
      typeof t == "string" && t ? e != null && typeof e != "object" ? console.error(
        "ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",
        g(e)
      ) : e != null && typeof e.crossOrigin != "string" && console.error(
        "ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",
        d(e.crossOrigin)
      ) : console.error(
        "ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
        d(t)
      ), typeof t == "string" && (e ? (e = e.crossOrigin, e = typeof e == "string" ? e === "use-credentials" ? e : "" : void 0) : e = null, o.d.C(t, e));
    }, S.prefetchDNS = function(t) {
      if (typeof t != "string" || !t)
        console.error(
          "ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
          d(t)
        );
      else if (1 < arguments.length) {
        var e = arguments[1];
        typeof e == "object" && e.hasOwnProperty("crossOrigin") ? console.error(
          "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
          g(e)
        ) : console.error(
          "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
          g(e)
        );
      }
      typeof t == "string" && o.d.D(t);
    }, S.preinit = function(t, e) {
      if (typeof t == "string" && t ? e == null || typeof e != "object" ? console.error(
        "ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",
        g(e)
      ) : e.as !== "style" && e.as !== "script" && console.error(
        'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
        g(e.as)
      ) : console.error(
        "ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
        d(t)
      ), typeof t == "string" && e && typeof e.as == "string") {
        var c = e.as, _ = i(c, e.crossOrigin), T = typeof e.integrity == "string" ? e.integrity : void 0, y = typeof e.fetchPriority == "string" ? e.fetchPriority : void 0;
        c === "style" ? o.d.S(
          t,
          typeof e.precedence == "string" ? e.precedence : void 0,
          {
            crossOrigin: _,
            integrity: T,
            fetchPriority: y
          }
        ) : c === "script" && o.d.X(t, {
          crossOrigin: _,
          integrity: T,
          fetchPriority: y,
          nonce: typeof e.nonce == "string" ? e.nonce : void 0
        });
      }
    }, S.preinitModule = function(t, e) {
      var c = "";
      if (typeof t == "string" && t || (c += " The `href` argument encountered was " + d(t) + "."), e !== void 0 && typeof e != "object" ? c += " The `options` argument encountered was " + d(e) + "." : e && "as" in e && e.as !== "script" && (c += " The `as` option encountered was " + g(e.as) + "."), c)
        console.error(
          "ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",
          c
        );
      else
        switch (c = e && typeof e.as == "string" ? e.as : "script", c) {
          case "script":
            break;
          default:
            c = g(c), console.error(
              'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
              c,
              t
            );
        }
      typeof t == "string" && (typeof e == "object" && e !== null ? (e.as == null || e.as === "script") && (c = i(
        e.as,
        e.crossOrigin
      ), o.d.M(t, {
        crossOrigin: c,
        integrity: typeof e.integrity == "string" ? e.integrity : void 0,
        nonce: typeof e.nonce == "string" ? e.nonce : void 0
      })) : e == null && o.d.M(t));
    }, S.preload = function(t, e) {
      var c = "";
      if (typeof t == "string" && t || (c += " The `href` argument encountered was " + d(t) + "."), e == null || typeof e != "object" ? c += " The `options` argument encountered was " + d(e) + "." : typeof e.as == "string" && e.as || (c += " The `as` option encountered was " + d(e.as) + "."), c && console.error(
        'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
        c
      ), typeof t == "string" && typeof e == "object" && e !== null && typeof e.as == "string") {
        c = e.as;
        var _ = i(
          c,
          e.crossOrigin
        );
        o.d.L(t, c, {
          crossOrigin: _,
          integrity: typeof e.integrity == "string" ? e.integrity : void 0,
          nonce: typeof e.nonce == "string" ? e.nonce : void 0,
          type: typeof e.type == "string" ? e.type : void 0,
          fetchPriority: typeof e.fetchPriority == "string" ? e.fetchPriority : void 0,
          referrerPolicy: typeof e.referrerPolicy == "string" ? e.referrerPolicy : void 0,
          imageSrcSet: typeof e.imageSrcSet == "string" ? e.imageSrcSet : void 0,
          imageSizes: typeof e.imageSizes == "string" ? e.imageSizes : void 0,
          media: typeof e.media == "string" ? e.media : void 0
        });
      }
    }, S.preloadModule = function(t, e) {
      var c = "";
      typeof t == "string" && t || (c += " The `href` argument encountered was " + d(t) + "."), e !== void 0 && typeof e != "object" ? c += " The `options` argument encountered was " + d(e) + "." : e && "as" in e && typeof e.as != "string" && (c += " The `as` option encountered was " + d(e.as) + "."), c && console.error(
        'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
        c
      ), typeof t == "string" && (e ? (c = i(
        e.as,
        e.crossOrigin
      ), o.d.m(t, {
        as: typeof e.as == "string" && e.as !== "script" ? e.as : void 0,
        crossOrigin: c,
        integrity: typeof e.integrity == "string" ? e.integrity : void 0
      })) : o.d.m(t));
    }, S.requestFormReset = function(t) {
      o.d.r(t);
    }, S.unstable_batchedUpdates = function(t, e) {
      return t(e);
    }, S.useFormState = function(t, e, c) {
      return h().useFormState(t, e, c);
    }, S.useFormStatus = function() {
      return h().useHostTransitionStatus();
    }, S.version = "19.1.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), S;
}
var Ee;
function ze() {
  if (Ee) return fe.exports;
  Ee = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (n(), fe.exports = je()) : fe.exports = Ue(), fe.exports;
}
var Re = ze();
function ke(n) {
  var a, l, i = "";
  if (typeof n == "string" || typeof n == "number") i += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var d = n.length;
    for (a = 0; a < d; a++) n[a] && (l = ke(n[a])) && (i && (i += " "), i += l);
  } else for (l in n) n[l] && (i && (i += " "), i += l);
  return i;
}
function $() {
  for (var n, a, l = 0, i = "", d = arguments.length; l < d; l++) (n = arguments[l]) && (a = ke(n)) && (i && (i += " "), i += a);
  return i;
}
const Be = ({ children: n }) => {
  const a = j(document.createElement("div")), l = Q(
    () => document.querySelector("#context-modal-portal"),
    []
  );
  return ce(() => {
    const i = a.current;
    return l.appendChild(i), () => void l.removeChild(i);
  }, []), Re.createPortal(n, l);
}, Ve = "context-modal-modal__header", W = {
  modal__header: Ve,
  "modal__header--with-label": "context-modal-modal__header--with-label",
  "modal__header--no-label": "context-modal-modal__header--no-label",
  "modal__header--with-bar": "context-modal-modal__header--with-bar",
  "modal__header-title": "context-modal-modal__header-title",
  "modal__header-close": "context-modal-modal__header-close",
  "modal__header-close-icon": "context-modal-modal__header-close-icon"
}, Xe = (n) => /* @__PURE__ */ Z.createElement("svg", { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ Z.createElement("path", { d: "M14.9498 6.46443C15.3403 6.07391 15.3403 5.44074 14.9498 5.05022C14.5593 4.65969 13.9261 4.65969 13.5356 5.05022L14.9498 6.46443ZM5.05029 13.5355C4.65976 13.926 4.65976 14.5592 5.05029 14.9497C5.44081 15.3402 6.07398 15.3402 6.4645 14.9497L5.05029 13.5355ZM13.5356 5.05022L5.05029 13.5355L6.4645 14.9497L14.9498 6.46443L13.5356 5.05022Z", fill: "currentColor" }), /* @__PURE__ */ Z.createElement("path", { d: "M13.5356 14.9498C13.9261 15.3403 14.5593 15.3403 14.9498 14.9498C15.3403 14.5593 15.3403 13.9261 14.9498 13.5356L13.5356 14.9498ZM6.4645 5.05029C6.07398 4.65976 5.44081 4.65976 5.05029 5.05029C4.65976 5.44081 4.65976 6.07398 5.05029 6.4645L6.4645 5.05029ZM14.9498 13.5356L6.4645 5.05029L5.05029 6.4645L13.5356 14.9498L14.9498 13.5356Z", fill: "currentColor" })), $e = ({ label: n, onClose: a }) => /* @__PURE__ */ q(
  "header",
  {
    className: $(W.modal__header, W["modal__header--with-bar"], {
      [W["modal__header--with-label"]]: !!n,
      [W["modal__header--no-label"]]: !n
    }),
    children: [
      n && /* @__PURE__ */ m("h4", { className: W["modal__header-title"], children: n }),
      /* @__PURE__ */ m("button", { type: "button", className: W["modal__header-close"], onClick: a, children: /* @__PURE__ */ m(Xe, { className: W["modal__header-close-icon"] }) })
    ]
  }
);
function qe(n) {
  if (Array.isArray(n)) {
    for (var a = 0, l = Array(n.length); a < n.length; a++)
      l[a] = n[a];
    return l;
  } else
    return Array.from(n);
}
var pe = !1;
if (typeof window < "u") {
  var Oe = {
    get passive() {
      pe = !0;
    }
  };
  window.addEventListener("testPassive", null, Oe), window.removeEventListener("testPassive", null, Oe);
}
var _e = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1), ee = [], ye = !1, Ce = -1, ie = void 0, K = void 0, le = void 0, Le = function(n) {
  return ee.some(function(a) {
    return !!(a.options.allowTouchMove && a.options.allowTouchMove(n));
  });
}, ve = function(n) {
  var a = n || window.event;
  return Le(a.target) || a.touches.length > 1 ? !0 : (a.preventDefault && a.preventDefault(), !1);
}, Fe = function(n) {
  if (le === void 0) {
    var a = !!n && n.reserveScrollBarGap === !0, l = window.innerWidth - document.documentElement.clientWidth;
    if (a && l > 0) {
      var i = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
      le = document.body.style.paddingRight, document.body.style.paddingRight = i + l + "px";
    }
  }
  ie === void 0 && (ie = document.body.style.overflow, document.body.style.overflow = "hidden");
}, Ge = function() {
  le !== void 0 && (document.body.style.paddingRight = le, le = void 0), ie !== void 0 && (document.body.style.overflow = ie, ie = void 0);
}, We = function() {
  return window.requestAnimationFrame(function() {
    if (K === void 0) {
      K = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left
      };
      var n = window, a = n.scrollY, l = n.scrollX;
      document.body.style.position = "fixed", document.body.style.top = -a + "px", document.body.style.left = -l + "px";
    }
  });
}, Ke = function() {
  if (K !== void 0) {
    var n = -parseInt(document.body.style.top, 10), a = -parseInt(document.body.style.left, 10);
    document.body.style.position = K.position, document.body.style.top = K.top, document.body.style.left = K.left, window.scrollTo(a, n), K = void 0;
  }
}, Ze = function(n) {
  return n ? n.scrollHeight - n.scrollTop <= n.clientHeight : !1;
}, Qe = function(n, a) {
  var l = n.targetTouches[0].clientY - Ce;
  return Le(n.target) ? !1 : a && a.scrollTop === 0 && l > 0 || Ze(a) && l < 0 ? ve(n) : (n.stopPropagation(), !0);
}, Je = function(n, a) {
  if (!n) {
    console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
    return;
  }
  if (!ee.some(function(i) {
    return i.targetElement === n;
  })) {
    var l = {
      targetElement: n,
      options: a || {}
    };
    ee = [].concat(qe(ee), [l]), _e ? We() : Fe(a), _e && (n.ontouchstart = function(i) {
      i.targetTouches.length === 1 && (Ce = i.targetTouches[0].clientY);
    }, n.ontouchmove = function(i) {
      i.targetTouches.length === 1 && Qe(i, n);
    }, ye || (document.addEventListener("touchmove", ve, pe ? { passive: !1 } : void 0), ye = !0));
  }
}, et = function(n) {
  if (!n) {
    console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
    return;
  }
  ee = ee.filter(function(a) {
    return a.targetElement !== n;
  }), _e && (n.ontouchstart = null, n.ontouchmove = null, ye && ee.length === 0 && (document.removeEventListener("touchmove", ve, pe ? { passive: !1 } : void 0), ye = !1)), _e ? Ke() : Ge();
};
function tt(n, a = !0) {
  if (!n) return () => null;
  const l = window.scrollY;
  return a && document.body.style.setProperty("top", `${l * -1}px`), Je(n, {
    // @ts-ignore
    allowTouchMove: (i) => {
      for (; i && i !== document.body; ) {
        if (i.getAttribute("body-scroll-lock-ignore") !== null)
          return !0;
        i = i.parentElement;
      }
    }
  }), () => {
    if (et(n), a && (document.body.style.setProperty("top", ""), document.body.scrollTo(0, l)), !a) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
  };
}
const rt = "Escape";
function nt() {
  const n = j(/* @__PURE__ */ new Set()), [a, l] = re([]), i = Q(() => a[a.length - 1], [a]);
  ce(() => {
    let o = !1;
    if (typeof document > "u" || !i) return;
    const r = i?.containerRef.current, s = i?.modalRef.current;
    function t(_) {
      o = !!(s && !s.contains(_.target));
    }
    function e(_) {
      const T = s && !s.contains(_.target);
      o && T && i.close(), o = !1;
    }
    function c(_) {
      _.stopPropagation(), _.key == rt && (i.close(), n.current.delete(i.key));
    }
    return r?.addEventListener("mousedown", t), r?.addEventListener("touchstart", t), r?.addEventListener("mouseup", e), r?.addEventListener("touchend", e), document.addEventListener("keydown", c), () => {
      r?.removeEventListener("mousedown", t), r?.removeEventListener("touchstart", t), r?.removeEventListener("mouseup", e), r?.removeEventListener("touchend", e), document.removeEventListener("keydown", c);
    };
  }, [i]);
  const d = J(
    (o) => {
      n.current.has(o.key) || (n.current.add(o.key), l((r) => a.findIndex((s) => s.key === o.key) !== -1 ? r : (o.enableScroll = tt(
        o.scrollableContentRef.current || o.modalRef.current,
        !r.length
        // mark as first modal in stack
      ), [...r, o])));
    },
    [a]
  ), g = J((o) => {
    n.current.delete(o), l((r) => {
      const s = [...r], t = r.findIndex((e) => e.key === o);
      return t === -1 ? r : t === 0 ? (s.reverse().forEach((e) => e.enableScroll?.()), []) : (s[t].enableScroll?.(), s.splice(t, 1), s);
    });
  }, []), h = J(
    (o, r) => {
      if (!n.current.has(o)) return;
      const s = a.findIndex((t) => t.key === o);
      if (s > -1) {
        const t = [...a];
        t[s] = {
          ...t[s],
          ...r
        }, n.current.add(o), l(t);
      }
    },
    [a]
  );
  function w(o) {
    const r = a.findIndex((s) => s.key === o);
    return [r, r === a.length - 1];
  }
  return {
    lastModal: i,
    apply: d,
    remove: g,
    update: h,
    getPositionInStack: w
  };
}
const ot = He(void 0);
function at(n) {
  return Pe(ot) ?? n;
}
const it = (n) => /* @__PURE__ */ Z.createElement("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ Z.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M0 12C0 5.37258 5.37258 0 12 0C12.8284 0 13.5 0.671573 13.5 1.5C13.5 2.32843 12.8284 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.1716 21.6716 10.5 22.5 10.5C23.3284 10.5 24 11.1716 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z", fill: "currentColor" })), De = ({
  className: n,
  size: a = "md",
  text: l
}) => /* @__PURE__ */ q("div", { className: "flex h-full w-full flex-col items-center justify-center", children: [
  /* @__PURE__ */ m(
    it,
    {
      className: $("animate-spin", {
        "h-5 w-5": a === "sm",
        "h-8 w-8": a === "md",
        "h-12 w-12": a === "lg",
        "text-green-500": !n,
        [n || ""]: n
      })
    }
  ),
  l && /* @__PURE__ */ m(
    "span",
    {
      className: $("text-gray-250", {
        "py-4 text-sm": a === "sm",
        "py-6": a === "md"
      }),
      children: l
    }
  ),
  /* @__PURE__ */ m("span", { className: "sr-only", children: "Loading..." })
] });
function Se({
  fullWidth: n = !1,
  type: a = "button",
  size: l = "md",
  disabled: i = !1,
  loading: d = !1,
  loadingText: g,
  variant: h = "light",
  onClick: w,
  children: o
}) {
  return /* @__PURE__ */ m(
    "button",
    {
      className: $("btn", `btn--variant-${h}`, `btn--size-${l}`, {
        "btn--fullwidth": n,
        "btn--loading": d,
        "btn--icon": l === "icon",
        "btn--flex": d && h !== "none",
        "btn--disabled": i || d
      }),
      disabled: i || d,
      type: a || "button",
      onClick: w,
      children: d && h !== "none" ? /* @__PURE__ */ q(Me, { children: [
        /* @__PURE__ */ m(De, { className: $("btn__loader", `btn__loader--variant-${h}`) }),
        g && /* @__PURE__ */ m("span", { className: "btn__loading-text", children: g })
      ] }) : o
    }
  );
}
function lt({
  title: n,
  description: a,
  variant: l = "danger",
  isLoading: i = !1,
  onConfirm: d,
  onClose: g
}) {
  function h() {
    d(), g();
  }
  return /* @__PURE__ */ m(
    wt,
    {
      id: "confirm-action-modal",
      ariaLabel: "Aria label",
      type: "overlay-auto",
      size: "sm",
      headerRenderer: () => /* @__PURE__ */ m("h3", { className: "modal-confirm__title", children: n }),
      footerRenderer: (w) => /* @__PURE__ */ q("div", { className: "modal-confirm__footer", children: [
        /* @__PURE__ */ m(
          Se,
          {
            fullWidth: !0,
            type: "button",
            variant: l,
            loading: i,
            onClick: h,
            children: "Confirm"
          }
        ),
        /* @__PURE__ */ m(
          Se,
          {
            fullWidth: !0,
            type: "button",
            variant: "light",
            disabled: i,
            onClick: w,
            children: "Cancel"
          }
        )
      ] }),
      onClose: g,
      children: a && /* @__PURE__ */ m("p", { className: "modal-confirm__description", children: a })
    }
  );
}
function Ne() {
  return Te({
    query: "(min-width: 576px)"
  });
}
const ct = typeof document < "u" ? he : ce;
function st({
  isLoading: n = !1,
  id: a,
  type: l,
  horizontalSwipe: i,
  stackCtx: d,
  modalRef: g,
  modalHeaderRef: h,
  scrollAreaRef: w,
  onClose: o
}) {
  const r = Ne(), [s, t] = re({
    isMoving: !1,
    scrollDisabled: !1,
    transitionEnabled: !0,
    transition: "none",
    transform: "none",
    opacity: 1
  }), [e, c] = re(!1);
  ct(() => {
    const y = g.current;
    if (!y || r) return;
    const E = (l === "base" || l === "fullscreen") && i, R = h.current;
    let f = 0, A = 0, H = 0, U = 0, I = !1, x = !1, C = 0, k = !1;
    const P = (u) => {
      const M = u.changedTouches[0].clientX - H, L = u.changedTouches[0].clientY - A, z = Math.sign(M), B = Math.sign(L), G = Math.abs(M / window.innerWidth), V = Math.abs(L / window.innerHeight);
      return {
        directionX: z,
        directionY: B,
        factorX: G,
        factorY: V
      };
    }, te = (u) => {
      if (u.touches.length !== 1) return;
      const M = u.touches[0];
      H = M.clientX, A = M.clientY, I = !0, x = !1, U = (/* @__PURE__ */ new Date()).getTime(), C = (/* @__PURE__ */ new Date()).getTime();
      const { isTop: L } = _();
      k = L;
    };
    function D() {
      f = 0, A = 0, H = 0, U = 0, I = !1, x = !1, C = 0, k = !1;
    }
    function se() {
      c(!0), D(), setTimeout(() => {
        d?.remove(a), o();
      }, 150);
    }
    function ne() {
      se(), t((u) => ({
        ...u,
        transitionEnabled: !0,
        transition: "transform 0.18s, opacity 0.18s",
        transform: "translateX(100%)",
        opacity: 0
      }));
    }
    function ge() {
      t((u) => ({
        ...u,
        isMoving: !1,
        scrollDisabled: !1,
        transitionEnabled: !0,
        transition: "transform 0.15s, opacity 0.15s",
        transform: "translateX(0)",
        opacity: 1
      }));
    }
    function de() {
      se(), t((u) => ({
        ...u,
        transitionEnabled: !0,
        transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        transform: "translateY(100%)",
        opacity: 0
      }));
    }
    function N() {
      t((u) => ({
        ...u,
        transitionEnabled: !0,
        transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        transform: "translateY(0)",
        opacity: 1
      }));
    }
    function F() {
      t((u) => ({
        ...u,
        isMoving: !1,
        scrollDisabled: !0,
        transitionEnabled: !1,
        transition: "none",
        transform: "translateX(0)",
        opacity: 1
      }));
    }
    function oe() {
      t((u) => ({
        ...u,
        isMoving: !0,
        scrollDisabled: !0,
        transitionEnabled: !1,
        transition: "none",
        transform: "translateY(0)",
        opacity: 1
      }));
    }
    const Y = (u) => {
      if (u.target.closest("[horizontal-scroll-inside-modal]") || !I) return;
      const { directionY: M, factorY: L, directionX: z, factorX: B } = P(u);
      if (f = u.touches[0].clientY, E) {
        if (!x && (/* @__PURE__ */ new Date()).getTime() - C > 150) return;
        if (x = !0, z === -1) {
          F();
          return;
        }
        if (B > L) {
          const p = u.changedTouches[0].clientX - H;
          t({
            isMoving: !0,
            scrollDisabled: !0,
            transitionEnabled: !1,
            transition: "none",
            transform: `translateX(${p}px)`,
            opacity: 1
          });
          return;
        } else
          F();
        return;
      }
      if (l === "base" || l === "fullscreen") return;
      const G = R ? u.target === R || R.contains(u.target) : !1;
      if (!x && (/* @__PURE__ */ new Date()).getTime() - C > 150) return;
      if (x = !0, !k && !G) {
        oe();
        return;
      }
      if (M === -1) {
        oe();
        return;
      }
      const V = u.changedTouches[0].clientY - A;
      t((p) => ({
        ...p,
        transitionEnabled: !1,
        transform: `translateY(${V}px)`,
        transition: "none"
      }));
    }, ue = (u) => {
      const { directionX: M, factorX: L, directionY: z, factorY: B } = P(u);
      if (E) {
        M === 1 && L > 0.25 && ((/* @__PURE__ */ new Date()).getTime() - C < 250 || L > 0.8) ? ne() : ge(), D();
        return;
      }
      if (l === "base" || l === "fullscreen") return;
      if (!k) {
        const X = R ? u.target === R || R.contains(u.target) : !1;
        z === 1 && B > 0.25 && X ? de() : N(), D();
        return;
      }
      if (z === -1) {
        N(), D();
        return;
      }
      const { isScrollable: G, isTop: V } = _();
      if (G && !V) {
        N(), D();
        return;
      }
      if (A > f) {
        N(), D();
        return;
      }
      const p = (/* @__PURE__ */ new Date()).getTime() - U, ae = (f - A) / (g.current?.clientHeight || 0);
      V && ae > 0.25 && p < 250 && p < 500 || p > 500 && p < 1200 && B > 0.2 ? (de(), D()) : (N(), D());
    };
    return y.addEventListener("touchstart", te, {
      passive: !0
    }), y.addEventListener("touchmove", Y, { passive: !0 }), y.addEventListener("touchend", ue, { passive: !0 }), () => {
      y.removeEventListener("touchstart", te), y.removeEventListener("touchmove", Y), y.removeEventListener("touchend", ue);
    };
  }, [n, l, r, d?.lastModal]);
  function _() {
    let y = !1;
    const E = w.current;
    E && (y = E.scrollHeight > E.clientHeight);
    let R = !0;
    E && (R = E.scrollTop === 0);
    let f = !0;
    return E && (f = E.scrollTop + E.clientHeight === E.scrollHeight), { isScrollable: y, isTop: R, isBottom: f };
  }
  function T() {
    Re.flushSync(() => {
      c(!0), t((y) => ({
        ...y,
        transitionEnabled: !0,
        transform: "translateY(100%)",
        transition: "transform 0.12s ease-out, opacity 0.12s ease-out",
        opacity: 0
      }));
    }), setTimeout(
      () => {
        d?.remove(a), o();
      },
      r ? 0 : 200
    );
  }
  return {
    transformState: s,
    closeAnimation: e,
    handleClose: T
  };
}
const dt = "context-modal-modal__container", ut = "context-modal-modal__main", mt = "context-modal-modal__header", ft = "context-modal-modal__body", _t = "context-modal-modal__loader", yt = "context-modal-modal__footer", gt = "context-modal-slideUp90", ht = "context-modal-slideUp95", pt = "context-modal-slideRight", vt = "context-modal-modal__backdrop", b = {
  modal__container: dt,
  "modal__container--fullscreen": "context-modal-modal__container--fullscreen",
  "modal__container--menu": "context-modal-modal__container--menu",
  "modal__container--overlay-90": "context-modal-modal__container--overlay-90",
  "modal__container--overlay-95": "context-modal-modal__container--overlay-95",
  "modal__container--overlay-auto": "context-modal-modal__container--overlay-auto",
  "modal__safe-top": "context-modal-modal__safe-top",
  modal__main: ut,
  "modal__main--fullscreen": "context-modal-modal__main--fullscreen",
  "modal__main--menu": "context-modal-modal__main--menu",
  "modal__main--overlay-90": "context-modal-modal__main--overlay-90",
  "modal__main--overlay-95": "context-modal-modal__main--overlay-95",
  "modal__main--overlay-auto": "context-modal-modal__main--overlay-auto",
  "modal__main--base": "context-modal-modal__main--base",
  "modal__main--sm": "context-modal-modal__main--sm",
  "modal__main--md": "context-modal-modal__main--md",
  "modal__main--lg": "context-modal-modal__main--lg",
  "modal__main--2xl": "context-modal-modal__main--2xl",
  "modal__main--3xl": "context-modal-modal__main--3xl",
  "modal__main--opacity-0": "context-modal-modal__main--opacity-0",
  modal__header: mt,
  modal__body: ft,
  "modal__scroll-area": "context-modal-modal__scroll-area",
  modal__loader: _t,
  modal__footer: yt,
  "modal__main--animate-slide-up-90": "context-modal-modal__main--animate-slide-up-90",
  slideUp90: gt,
  "modal__main--animate-slide-up-95": "context-modal-modal__main--animate-slide-up-95",
  slideUp95: ht,
  "modal__main--animate-slide-right": "context-modal-modal__main--animate-slide-right",
  slideRight: pt,
  modal__backdrop: vt,
  "modal__backdrop--hidden": "context-modal-modal__backdrop--hidden"
};
function bt({
  id: n,
  scrollAreaId: a,
  children: l,
  ariaLabel: i,
  title: d,
  onClose: g,
  loadingText: h,
  horizontalSwipe: w = !1,
  confirmClose: o = !1,
  isLoading: r = !1,
  isPortal: s = !0,
  mobileSafeTop: t = !0,
  preventClose: e = !1,
  bgColorClass: c,
  confirmTitle: _ = "Are you sure?",
  confirmDescription: T = "Are you sure you want to close this dialog?",
  headerRenderer: y,
  footerRenderer: E,
  fallbackCtx: R,
  type: f = "base",
  size: A = "md"
}) {
  const H = at(R), U = j(null), I = j(null), x = j(null), C = j(null), k = j(null), P = j(null), te = Ne(), D = w && (f === "base" || f === "fullscreen"), [se, ne] = re(!1), [ge, de] = re(C.current?.clientHeight), { closeAnimation: N, transformState: F, handleClose: oe } = st({
    id: n,
    modalRef: I,
    modalHeaderRef: x,
    scrollAreaRef: k,
    onClose: g,
    type: f ?? "base",
    isLoading: r ?? !1,
    horizontalSwipe: w ?? !1,
    stackCtx: H
  }), Y = J(() => {
    if (!e) {
      if (o) {
        ne(!0);
        return;
      }
      oe();
    }
  }, [o]), ue = J(() => {
    ne(!1), oe();
  }, []);
  he(() => {
    const p = n;
    H?.apply({
      key: p,
      simpleBarRef: P,
      containerRef: U,
      modalRef: I,
      scrollableContentRef: k,
      close: Y
    });
  }, []), he(() => {
    if (!k.current) return;
    const p = new ResizeObserver(() => {
      de(k.current?.clientHeight);
    });
    return p.observe(k.current), () => p.disconnect();
  }, []), ce(() => {
    const p = document.querySelector('meta[name="theme-color"]');
    let ae = null, X = p;
    return p ? (ae = p.getAttribute("content"), p.setAttribute("content", "#000000")) : (X = document.createElement("meta"), X.name = "theme-color", X.content = "#000000", document.head.appendChild(X)), () => {
      ae !== null ? X?.setAttribute("content", ae) : X?.remove();
    };
  }, []);
  const u = Q(() => y ? y(Y) : null, [y, Y]), M = !r && (D || u) ? /* @__PURE__ */ m("div", { ref: x, children: u }) : /* @__PURE__ */ m("div", { ref: x, children: /* @__PURE__ */ m($e, { label: d || void 0, onClose: Y }) }), L = Q(() => E ? E(Y) : null, [E, Y]), z = !r && L ? /* @__PURE__ */ m("footer", { className: b.modal__footer, children: L }) : null, B = $(b.modal__container, {
    [b["modal__container--fullscreen"]]: f === "fullscreen",
    [b["modal__container--menu"]]: f === "menu",
    [b["modal__container--overlay-90"]]: f === "overlay-90",
    [b["modal__container--overlay-95"]]: f === "overlay-95",
    [b["modal__container--overlay-auto"]]: f === "overlay-auto",
    [b["modal__safe-top"]]: f !== "fullscreen" && t
  }), G = $(b.modal__main, b[`modal__main--${f}`], {
    [b[`modal__main--${A}`]]: f !== "fullscreen",
    [b["modal__main--opacity-0"]]: !ge,
    [b["modal__main--animate-slide-up-90"]]: !N && (f === "menu" || f === "overlay-90" || f === "overlay-auto"),
    [b["modal__main--animate-slide-up-95"]]: !N && f === "overlay-95",
    [b["modal__main--animate-slide-right"]]: !N && (f === "fullscreen" || f === "base"),
    [c]: !!c
  });
  function V(p) {
    return s ? /* @__PURE__ */ m(Be, { children: p }) : p;
  }
  return V(
    /* @__PURE__ */ q(
      "div",
      {
        id: n,
        ref: U,
        role: "dialog",
        "aria-labelledby": i || n,
        "aria-modal": "true",
        className: B,
        children: [
          /* @__PURE__ */ q(
            "div",
            {
              ref: I,
              className: G,
              style: te ? {
                // Patch for Safari browser
                maskImage: "-webkit-radial-gradient(white, black)"
              } : {
                willChange: "transform opacity",
                transition: F.transitionEnabled ? F.transition : "none",
                transform: F.transform,
                opacity: F.opacity
              },
              onClick: (p) => p.stopPropagation(),
              children: [
                M,
                /* @__PURE__ */ m("div", { className: b.modal__body, children: /* @__PURE__ */ m(
                  Ie,
                  {
                    id: a,
                    className: b["modal__scroll-area"],
                    ref: P,
                    scrollableNodeProps: { ref: k },
                    children: r ? /* @__PURE__ */ m("div", { className: b.modal__loader, children: /* @__PURE__ */ m(De, { text: h }) }) : l
                  }
                ) }),
                z
              ]
            }
          ),
          se && /* @__PURE__ */ m(
            lt,
            {
              title: _,
              description: T,
              onConfirm: ue,
              onClose: () => ne(!1)
            }
          ),
          /* @__PURE__ */ m(
            "div",
            {
              className: $(b.modal__backdrop, {
                [b["modal__backdrop--hidden"]]: N && f !== "fullscreen" || N && D
              }),
              style: {
                willChange: "opacity"
              }
            }
          )
        ]
      }
    )
  );
}
const wt = Ae(bt), Et = "formkit-lite-header", Ot = "formkit-lite-header__title", St = "formkit-lite-header__actions", xt = "formkit-lite-header__action", v = {
  header: Et,
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
  header__title: Ot,
  "header__title--serif": "formkit-lite-header__title--serif",
  "header__title--spaced": "formkit-lite-header__title--spaced",
  header__actions: St,
  header__action: xt,
  "header__action--icon": "formkit-lite-header__action--icon",
  "header__action--text": "formkit-lite-header__action--text",
  "header__action--primary": "formkit-lite-header__action--primary",
  "header__action--disabled": "formkit-lite-header__action--disabled"
}, Tt = (n) => /* @__PURE__ */ Z.createElement("svg", { viewBox: "0 0 10 7", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ Z.createElement("path", { d: "M5.81373 5.86077C5.41491 6.41912 4.58509 6.41912 4.18627 5.86077L1.12946 1.58124C0.656692 0.91937 1.12982 1.78218e-07 1.94319 2.49325e-07L8.05681 7.83795e-07C8.87018 8.54903e-07 9.34331 0.919371 8.87054 1.58124L5.81373 5.86077Z", fill: "currentColor" }));
function Nt({
  title: n,
  goBackLabel: a,
  onGoBack: l,
  serifTitle: i = !1,
  fixed: d = !1,
  titleH1: g = !1,
  transparent: h = !1,
  transparentCover: w = !0,
  parentIsModal: o = !1,
  scrollDelta: r,
  variant: s = "dark",
  action: t,
  classes: e,
  children: c
}) {
  const _ = nt(), T = j(null), [y, E] = re(r === 0), R = Ye();
  ce(() => {
    if (!d || R) return;
    const x = T.current, C = _.lastModal?.scrollableContentRef.current, k = r || x?.offsetHeight || 0, P = () => {
      const te = o && C ? _.lastModal?.scrollableContentRef.current?.scrollTop || 0 : window.scrollY;
      if (k && te > k) {
        E(!0);
        return;
      }
      E(!1);
    };
    return o && C ? (C.addEventListener("scroll", P), () => {
      C.removeEventListener("scroll", P);
    }) : (window.addEventListener("scroll", P), () => window.removeEventListener("scroll", P));
  }, [R, r, d, _.lastModal]);
  const f = J(() => l?.(), [l]), A = J(() => {
    t && !t.disabled && t.onClick && t.onClick();
  }, [t]), H = Q(
    () => t?.icon || t?.label || "Done",
    [t]
  ), U = Q(() => !!c || !!t, [c, t]), I = Q(() => {
    const x = me(
      v.header__title,
      i && v["header__title--serif"],
      l && v["header__title--spaced"]
    );
    return g ? /* @__PURE__ */ m("h1", { className: x, children: n }) : /* @__PURE__ */ m("div", { className: x, children: n });
  }, [n, g, i, l]);
  return /* @__PURE__ */ q(
    "header",
    {
      ref: T,
      className: me(v.header, {
        [v["header--fixed"]]: d,
        [v["header--scrolled"]]: d && y,
        [v["header--gradient"]]: h && w && !y,
        [v["header--dark"]]: s === "dark" || y,
        [v["header--light"]]: s === "light" && !y,
        [e]: e
      }),
      children: [
        l && (a ? /* @__PURE__ */ m("button", { className: v["header__back-button"], type: "button", onClick: f, children: /* @__PURE__ */ m("span", { className: v["header__back-text"], children: a }) }) : /* @__PURE__ */ m("button", { className: v["header__back-icon-btn"], type: "button", onClick: f, children: /* @__PURE__ */ m(
          Tt,
          {
            className: me(v["header__back-icon"], {
              [v["header__back-icon--dark"]]: s === "dark" || y,
              [v["header__back-icon--light"]]: s === "light" && !y
            })
          }
        ) })),
        n && typeof n == "string" ? I : n,
        U && /* @__PURE__ */ q("div", { className: v.header__actions, children: [
          c,
          t && /* @__PURE__ */ m(
            "span",
            {
              className: me(v.header__action, {
                [v["header__action--icon"]]: t.icon,
                [v["header__action--text"]]: !t.icon && t.label && !t.primary,
                [v["header__action--primary"]]: !t.icon && t.primary && !t.disabled,
                [v["header__action--disabled"]]: !t.icon && t.primary && t.disabled
              }),
              onClick: A,
              children: H
            }
          )
        ] })
      ]
    }
  );
}
export {
  nt as F,
  Nt as H,
  wt as c,
  Ye as u
};
