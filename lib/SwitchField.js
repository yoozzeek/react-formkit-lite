import { jsxs as _, jsx as i } from "react/jsx-runtime";
const r = "formkit-lite-switch__info", a = "formkit-lite-switch__label", m = "formkit-lite-switch__help", d = "formkit-lite-switch__control", f = "formkit-lite-switch__input", p = "formkit-lite-switch__slider", t = {
  switch: "formkit-lite-switch",
  switch__info: r,
  switch__label: a,
  switch__help: m,
  switch__control: d,
  switch__input: f,
  switch__slider: p
}, u = ({ id: h, name: e, label: s, helpText: c, value: l, onFocus: o, onChange: n }) => /* @__PURE__ */ _("div", { className: t.switch, children: [
  (!!s || !!c) && /* @__PURE__ */ _("div", { className: t.switch__info, children: [
    !!s && /* @__PURE__ */ i("span", { className: t.switch__label, children: s }),
    !!c && /* @__PURE__ */ i("p", { className: t.switch__help, children: c })
  ] }),
  /* @__PURE__ */ _("label", { htmlFor: h, className: t.switch__control, children: [
    /* @__PURE__ */ i(
      "input",
      {
        id: h,
        name: e,
        checked: l,
        type: "checkbox",
        className: t.switch__input,
        onChange: (w) => n(w.target.checked),
        onFocus: o
      }
    ),
    /* @__PURE__ */ i("span", { className: t.switch__slider })
  ] })
] });
export {
  u as default
};
