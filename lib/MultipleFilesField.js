import { jsxs as C, jsx as n } from "react/jsx-runtime";
import { s as l, M as P } from "./chunks/UploadedFilesItem.BieVvuaH.js";
import * as R from "react";
import { useState as S, useMemo as $, useCallback as b, useEffect as E } from "react";
import B from "simplebar-react";
import { c as j } from "./chunks/clsx.OuTLNxxd.js";
import { S as M } from "./chunks/plus.DFiVon3D.js";
const A = (i) => /* @__PURE__ */ R.createElement("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...i }, /* @__PURE__ */ R.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.96893 20.9954C7.67222 21.0371 8.46085 20.7986 9.21598 20.0371L17.4175 11.7718C17.4176 11.7717 17.4174 11.7719 17.4175 11.7718C18.6458 10.5331 19.0637 9.19651 18.9923 7.97188C18.9194 6.72314 18.332 5.51436 17.4175 4.59223C16.5029 3.66995 15.3073 3.08075 14.0762 3.00772C12.871 2.93624 11.5512 3.35308 10.3236 4.58956C10.3227 4.59045 10.3219 4.59134 10.321 4.59223L3.9781 11.0858C3.59218 11.4809 2.95906 11.4884 2.56398 11.1024C2.1689 10.7165 2.16147 10.0834 2.54738 9.68833L8.90087 3.1839C10.5115 1.55983 12.3843 0.903851 14.1946 1.01123C15.9798 1.11712 17.6231 1.95923 18.8376 3.18392C20.0523 4.40877 20.8843 6.06261 20.9889 7.85541C21.0949 9.67225 20.448 11.5562 18.8376 13.1801L10.6361 21.4454C10.636 21.4455 10.6361 21.4453 10.6361 21.4454C9.49867 22.5922 8.15802 23.0695 6.85051 22.9919C5.56805 22.9158 4.39789 22.3123 3.53823 21.4454C2.6784 20.5784 2.08297 19.4017 2.00796 18.1158C1.93155 16.8059 2.40096 15.4586 3.53823 14.3119L11.7486 6.03769C12.4195 5.37778 13.232 5.10324 14.0346 5.16769C14.8084 5.22984 15.4987 5.59912 16.0099 6.09118C16.9948 7.03928 17.607 8.82358 16.3606 10.2669L16.3406 10.2901L8.47371 18.3439C8.0878 18.739 7.45467 18.7464 7.05959 18.3605C6.66451 17.9746 6.65708 17.3415 7.04299 16.9464L14.863 8.94065C15.1598 8.57642 15.1265 8.01688 14.6228 7.53207C14.3853 7.3034 14.1119 7.18035 13.8745 7.16128C13.6667 7.14459 13.4216 7.19931 13.1548 7.45991L4.95832 15.7202C4.95825 15.7202 4.95839 15.7201 4.95832 15.7202C4.20316 16.4817 3.9627 17.2816 4.00457 17.9993C4.04784 18.7411 4.3987 19.4728 4.95832 20.0371C5.51809 20.6016 6.24052 20.9522 6.96893 20.9954Z", fill: "currentColor" })), k = "image/png,image/jpeg";
function T(i) {
  return i.split("/").pop() || i;
}
function H(i) {
  const h = i.url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  return {
    url: i.url,
    // Take last part of URL with extension as a file name
    name: T(i.url),
    type: h ? "image" : "pdf"
  };
}
const K = ({
  max: i = 10,
  label: h,
  helpText: y,
  name: u,
  files: g = [],
  interactiveMode: c = !1,
  disabled: o = !1,
  loading: v = !1,
  onFilesAdded: x,
  onFilesRemoved: U
}) => {
  const [a, d] = S(g), [r, _] = S({}), f = $(() => Object.values(r).length, [r]), w = b(
    function(e) {
      const s = e.target.files;
      if (!s) return;
      const L = [], F = [];
      for (let p = 0; p < s.length; p++) {
        let m = s[p].name.replace(/ /g, "_").toLowerCase();
        m = `${a.length}_${m}`;
        const N = new File([s[p]], m, {
          type: s[p].type
        }), O = N.type.split("/")[0];
        F.push(N), L.push({
          type: O,
          // eslint-disable-next-line no-undef
          url: (URL || webkitURL).createObjectURL(N),
          name: m
        });
      }
      d(c ? (p) => [
        ...p,
        ...L.map((m) => ({ ...m, isPlaceholder: !0 }))
      ] : (p) => [...p, ...L]), F.length && x(F);
    },
    [a, c]
  );
  E(() => {
    _({}), d(g.map(H));
  }, [g]), E(() => {
    if (!c)
      return () => {
        a.forEach((t) => {
          t.url.includes("blob:") && (URL || webkitURL).revokeObjectURL(t.url);
        });
      };
  }, []);
  const I = b(
    (t) => {
      o || _((e) => {
        const s = { ...e };
        return s[t.name] ? delete s[t.name] : s[t.name] = !0, s;
      });
    },
    [o]
  ), D = b(() => {
    const t = (e) => {
      e.url.includes("blob:") && (URL || webkitURL).revokeObjectURL(e.url);
    };
    if (!f) {
      c || (a.forEach(t), d([]), _({})), U(a.map((e) => e.name));
      return;
    }
    c || (a.filter((e) => r[e.name]).forEach(t), d((e) => e.filter((s) => !r[s.name])), _({})), U(a.filter((e) => r[e.name]).map((e) => e.name));
  }, [a, c, f, r]);
  return a.length ? /* @__PURE__ */ C("div", { className: l["multiple-upload-files"], children: [
    /* @__PURE__ */ C("header", { className: l["multiple-upload-files__header"], children: [
      /* @__PURE__ */ n("span", { className: l["multiple-upload-files__title"], children: f > 0 ? `Selected (${f})` : "Select files" }),
      /* @__PURE__ */ n(
        "button",
        {
          className: l["multiple-upload-files__delete"],
          type: "button",
          disabled: o || v,
          onClick: D,
          children: f > 0 ? "Delete selected" : "Delete all"
        }
      )
    ] }),
    /* @__PURE__ */ n(B, { autoHide: !0, children: /* @__PURE__ */ n("ul", { className: l["multiple-upload-files__list"], children: a.map((t) => /* @__PURE__ */ n(
      P,
      {
        mediaItem: t,
        selected: r[t.name],
        onSelect: I
      },
      t.name
    )) }) }),
    !o && /* @__PURE__ */ n("div", { className: l["multiple-upload__addBox"], children: /* @__PURE__ */ C(
      "label",
      {
        htmlFor: u,
        className: j(
          l["multiple-upload__add"],
          a.length >= i && l["upload__add--disabled"]
        ),
        children: [
          /* @__PURE__ */ n(M, { className: l["multiple-upload__addIcon"] }),
          h,
          /* @__PURE__ */ n(
            "input",
            {
              multiple: !0,
              id: u,
              name: u,
              type: "file",
              className: l["multiple-upload__input"],
              accept: k,
              disabled: o || a.length > i,
              onChange: w
            }
          )
        ]
      }
    ) })
  ] }) : /* @__PURE__ */ C("div", { className: j(l["multiple-upload"], o && l["upload--disabled"]), children: [
    /* @__PURE__ */ C("label", { htmlFor: u, className: l["multiple-upload__label"], children: [
      /* @__PURE__ */ n(A, { className: l["multiple-upload__icon"] }),
      h
    ] }),
    y && /* @__PURE__ */ n("p", { className: l["multiple-upload__help"], children: y }),
    /* @__PURE__ */ n(
      "input",
      {
        multiple: !0,
        id: u,
        name: u,
        type: "file",
        className: l["multiple-upload__input"],
        disabled: o,
        accept: k,
        onChange: w
      }
    )
  ] });
};
export {
  K as default
};
