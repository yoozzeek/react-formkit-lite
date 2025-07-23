import { jsxs as u, jsx as l } from "react/jsx-runtime";
import * as i from "react";
import { useState as p } from "react";
import { c as r } from "./clsx.OuTLNxxd.js";
import _ from "../Loader.js";
const t = {
  "multiple-upload": "formkit-lite-multiple-upload",
  "multiple-upload__label": "formkit-lite-multiple-upload__label",
  "multiple-upload__icon": "formkit-lite-multiple-upload__icon",
  "multiple-upload__help": "formkit-lite-multiple-upload__help",
  "multiple-upload__input": "formkit-lite-multiple-upload__input",
  "multiple-upload-files": "formkit-lite-multiple-upload-files",
  "multiple-upload-files__header": "formkit-lite-multiple-upload-files__header",
  "multiple-upload-files__title": "formkit-lite-multiple-upload-files__title",
  "multiple-upload-files__delete": "formkit-lite-multiple-upload-files__delete",
  "multiple-upload-files__list": "formkit-lite-multiple-upload-files__list",
  "multiple-upload__addBox": "formkit-lite-multiple-upload__addBox",
  "multiple-upload__add": "formkit-lite-multiple-upload__add",
  "multiple-upload__addIcon": "formkit-lite-multiple-upload__addIcon"
}, s = (e) => /* @__PURE__ */ i.createElement("svg", { viewBox: "0 0 25 25", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { d: "M12.625 0.625C5.99615 0.625 0.625 5.99615 0.625 12.625C0.625 19.2538 5.99615 24.625 12.625 24.625C19.2538 24.625 24.625 19.2538 24.625 12.625C24.625 5.99615 19.2538 0.625 12.625 0.625ZM18.7692 9.30769L11.0558 17.0558H11.05C10.9519 17.1538 10.6865 17.3731 10.3808 17.3731C10.1615 17.3731 9.91346 17.2519 9.70577 17.0442L6.475 13.8135C6.38269 13.7212 6.38269 13.5769 6.475 13.4846L7.50192 12.4577C7.54808 12.4115 7.60577 12.3885 7.66346 12.3885C7.72115 12.3885 7.77885 12.4115 7.825 12.4577L10.3865 15.0192L17.425 7.92885C17.4712 7.88269 17.5288 7.85961 17.5865 7.85961C17.65 7.85961 17.7077 7.88269 17.7481 7.92885L18.7577 8.97308C18.8615 9.07115 18.8615 9.21538 18.7692 9.30769Z", fill: "currentColor" })), n = (e) => /* @__PURE__ */ i.createElement("svg", { viewBox: "0 0 16 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, /* @__PURE__ */ i.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2.97088 0C1.98059 0 1.23978e-05 0.595559 1.23978e-05 2.9778L0 17.0222C0 19.4044 1.98058 20 2.97087 20H13.0291C14.0194 20 16 19.4044 16 17.0222L16 6.69429C16 6.55835 16 6.45189 15.835 6.28646L10.2233 0.661733C10.2233 0.661733 10.2233 0.661733 10.2233 0.661733C10.2233 0.661731 9.56311 0 9.23302 0H2.97088ZM13.7108 6.47346L9.70829 2.46158C9.28946 2.04177 8.57282 2.33879 8.57282 2.93218V6.94406C8.57282 7.31181 8.87055 7.60993 9.23782 7.60993H13.2404C13.8327 7.60993 14.1294 6.89303 13.7108 6.47346Z", fill: "currentColor" })), k = (e) => {
  const [o, a] = p(e.mediaItem.type !== "image");
  function m() {
    e.onSelect?.(e.mediaItem);
  }
  function d() {
    return !o && e.mediaItem.isPlaceholder ? /* @__PURE__ */ l(_, { size: "sm" }) : e.mediaItem.type === "image" ? /* @__PURE__ */ l(
      "img",
      {
        width: 60,
        height: 60,
        alt: "Media file",
        src: e.mediaItem.url,
        onLoad: () => a(!0),
        style: {
          width: 60,
          height: 60,
          objectFit: "cover",
          objectPosition: "center center"
        }
      }
    ) : /* @__PURE__ */ l(n, { className: t.file__icon });
  }
  return /* @__PURE__ */ u(
    "li",
    {
      className: r(t.file, e.selected && t["file--selected"]),
      onClick: m,
      children: [
        d(),
        e.selected && /* @__PURE__ */ l("div", { className: t.file__overlay, children: /* @__PURE__ */ l(s, { className: t.file__check }) })
      ]
    }
  );
};
export {
  k as M,
  t as s
};
