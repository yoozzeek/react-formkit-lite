import e, { useRef as t } from "react";
import { clsx as n } from "clsx";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
var a = {
	upload: "formkit-lite-upload",
	"upload--light": "formkit-lite-upload--light",
	"upload--dark": "formkit-lite-upload--dark",
	"upload--drag-light": "formkit-lite-upload--drag-light",
	"upload--drag-dark": "formkit-lite-upload--drag-dark",
	upload__icon: "formkit-lite-upload__icon",
	upload__title: "formkit-lite-upload__title",
	"upload__title--light": "formkit-lite-upload__title--light",
	"upload__title--dark": "formkit-lite-upload__title--dark",
	upload__description: "formkit-lite-upload__description",
	"upload__description--light": "formkit-lite-upload__description--light",
	"upload__description--dark": "formkit-lite-upload__description--dark",
	upload__input: "formkit-lite-upload__input"
}, o = ({ title: o = "Drop video to upload, or browse", icon: s, accept: c = "image/*", variant: l = "light", description: u, onSelectFile: d }) => {
	let f = t(null), [p, m] = e.useState(!1);
	function h(e) {
		e.preventDefault(), d(e.dataTransfer.files), m(!1);
	}
	function g(e) {
		e.preventDefault(), p || m(!0);
	}
	function _(e) {
		e.preventDefault(), p && m(!1);
	}
	return /* @__PURE__ */ i("div", {
		className: n(a.upload, l === "light" && !p && a["upload--light"], l === "dark" && !p && a["upload--dark"], p && l === "light" && a["upload--drag-light"], p && l === "dark" && a["upload--drag-dark"]),
		onDrop: h,
		onDragOver: g,
		onDragLeave: _,
		onClick: () => {
			f.current?.click();
		},
		children: [
			s && /* @__PURE__ */ r("span", {
				className: a.upload__icon,
				children: s
			}),
			/* @__PURE__ */ r("h5", {
				className: n(a.upload__title, l === "light" && a["upload__title--light"], l === "dark" && a["upload__title--dark"]),
				children: o
			}),
			u && /* @__PURE__ */ r("p", {
				className: n(a.upload__description, l === "light" && a["upload__description--light"], l === "dark" && a["upload__description--dark"]),
				children: u
			}),
			/* @__PURE__ */ r("input", {
				ref: f,
				className: a.upload__input,
				type: "file",
				accept: c,
				onChange: (e) => d(e.target.files)
			})
		]
	});
};
//#endregion
export { o as t };
