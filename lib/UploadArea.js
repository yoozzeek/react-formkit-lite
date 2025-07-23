import { jsxs as k, jsx as d } from "react/jsx-runtime";
import m, { useRef as h } from "react";
import { c as e } from "./chunks/clsx.OuTLNxxd.js";
const D = "formkit-lite-upload", H = "formkit-lite-upload__icon", N = "formkit-lite-upload__title", x = "formkit-lite-upload__description", v = "formkit-lite-upload__input", l = {
  upload: D,
  "upload--light": "formkit-lite-upload--light",
  "upload--dark": "formkit-lite-upload--dark",
  "upload--drag-light": "formkit-lite-upload--drag-light",
  "upload--drag-dark": "formkit-lite-upload--drag-dark",
  upload__icon: H,
  upload__title: N,
  "upload__title--light": "formkit-lite-upload__title--light",
  "upload__title--dark": "formkit-lite-upload__title--dark",
  upload__description: x,
  "upload__description--light": "formkit-lite-upload__description--light",
  "upload__description--dark": "formkit-lite-upload__description--dark",
  upload__input: v
}, C = ({
  title: s = "Drop video to upload, or browse",
  icon: r,
  accept: n = "image/*",
  variant: t = "light",
  description: p,
  onSelectFile: u
}) => {
  const _ = h(null), [a, i] = m.useState(!1);
  function c(o) {
    o.preventDefault(), u(o.dataTransfer.files), i(!1);
  }
  function f(o) {
    o.preventDefault(), a || i(!0);
  }
  function g(o) {
    o.preventDefault(), a && i(!1);
  }
  return /* @__PURE__ */ k(
    "div",
    {
      className: e(
        l.upload,
        t === "light" && !a && l["upload--light"],
        t === "dark" && !a && l["upload--dark"],
        a && t === "light" && l["upload--drag-light"],
        a && t === "dark" && l["upload--drag-dark"]
      ),
      onDrop: c,
      onDragOver: f,
      onDragLeave: g,
      onClick: () => {
        _.current?.click();
      },
      children: [
        r && /* @__PURE__ */ d("span", { className: l.upload__icon, children: r }),
        /* @__PURE__ */ d(
          "h5",
          {
            className: e(
              l.upload__title,
              t === "light" && l["upload__title--light"],
              t === "dark" && l["upload__title--dark"]
            ),
            children: s
          }
        ),
        p && /* @__PURE__ */ d(
          "p",
          {
            className: e(
              l.upload__description,
              t === "light" && l["upload__description--light"],
              t === "dark" && l["upload__description--dark"]
            ),
            children: p
          }
        ),
        /* @__PURE__ */ d(
          "input",
          {
            ref: _,
            className: l.upload__input,
            type: "file",
            accept: n,
            onChange: (o) => u(o.target.files)
          }
        )
      ]
    }
  );
};
export {
  C as default
};
