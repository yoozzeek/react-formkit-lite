import { t as e } from "./Loader.DI5rvy7C.js";
import { t } from "./plus.Bn80kaIC.js";
import { useCallback as n, useEffect as r, useMemo as i, useState as a } from "react";
import { clsx as o } from "clsx";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import l from "simplebar-react";
//#region src/components/UploadMultipleFiles/multiple_files.module.css
var u = {
	"multiple-upload": "formkit-lite-multiple-upload",
	"multiple-upload--disabled": "formkit-lite-multiple-upload--disabled",
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
	"multiple-upload__add--disabled": "formkit-lite-multiple-upload__add--disabled",
	"multiple-upload__addIcon": "formkit-lite-multiple-upload__addIcon",
	"multiple-upload-file": "formkit-lite-multiple-upload-file",
	"multiple-upload-file--selected": "formkit-lite-multiple-upload-file--selected",
	"multiple-upload-file__overlay": "formkit-lite-multiple-upload-file__overlay",
	"multiple-upload-file__check": "formkit-lite-multiple-upload-file__check",
	"multiple-upload-file__icon": "formkit-lite-multiple-upload-file__icon"
}, d = (e) => /* @__PURE__ */ s("svg", {
	viewBox: "0 0 24 24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	...e,
	children: /* @__PURE__ */ s("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M6.96893 20.9954C7.67222 21.0371 8.46085 20.7986 9.21598 20.0371L17.4175 11.7718C17.4176 11.7717 17.4174 11.7719 17.4175 11.7718C18.6458 10.5331 19.0637 9.19651 18.9923 7.97188C18.9194 6.72314 18.332 5.51436 17.4175 4.59223C16.5029 3.66995 15.3073 3.08075 14.0762 3.00772C12.871 2.93624 11.5512 3.35308 10.3236 4.58956C10.3227 4.59045 10.3219 4.59134 10.321 4.59223L3.9781 11.0858C3.59218 11.4809 2.95906 11.4884 2.56398 11.1024C2.1689 10.7165 2.16147 10.0834 2.54738 9.68833L8.90087 3.1839C10.5115 1.55983 12.3843 0.903851 14.1946 1.01123C15.9798 1.11712 17.6231 1.95923 18.8376 3.18392C20.0523 4.40877 20.8843 6.06261 20.9889 7.85541C21.0949 9.67225 20.448 11.5562 18.8376 13.1801L10.6361 21.4454C10.636 21.4455 10.6361 21.4453 10.6361 21.4454C9.49867 22.5922 8.15802 23.0695 6.85051 22.9919C5.56805 22.9158 4.39789 22.3123 3.53823 21.4454C2.6784 20.5784 2.08297 19.4017 2.00796 18.1158C1.93155 16.8059 2.40096 15.4586 3.53823 14.3119L11.7486 6.03769C12.4195 5.37778 13.232 5.10324 14.0346 5.16769C14.8084 5.22984 15.4987 5.59912 16.0099 6.09118C16.9948 7.03928 17.607 8.82358 16.3606 10.2669L16.3406 10.2901L8.47371 18.3439C8.0878 18.739 7.45467 18.7464 7.05959 18.3605C6.66451 17.9746 6.65708 17.3415 7.04299 16.9464L14.863 8.94065C15.1598 8.57642 15.1265 8.01688 14.6228 7.53207C14.3853 7.3034 14.1119 7.18035 13.8745 7.16128C13.6667 7.14459 13.4216 7.19931 13.1548 7.45991L4.95832 15.7202C4.95825 15.7202 4.95839 15.7201 4.95832 15.7202C4.20316 16.4817 3.9627 17.2816 4.00457 17.9993C4.04784 18.7411 4.3987 19.4728 4.95832 20.0371C5.51809 20.6016 6.24052 20.9522 6.96893 20.9954Z",
		fill: "currentColor"
	})
}), f = (e) => /* @__PURE__ */ s("svg", {
	viewBox: "0 0 25 25",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	...e,
	children: /* @__PURE__ */ s("path", {
		d: "M12.625 0.625C5.99615 0.625 0.625 5.99615 0.625 12.625C0.625 19.2538 5.99615 24.625 12.625 24.625C19.2538 24.625 24.625 19.2538 24.625 12.625C24.625 5.99615 19.2538 0.625 12.625 0.625ZM18.7692 9.30769L11.0558 17.0558H11.05C10.9519 17.1538 10.6865 17.3731 10.3808 17.3731C10.1615 17.3731 9.91346 17.2519 9.70577 17.0442L6.475 13.8135C6.38269 13.7212 6.38269 13.5769 6.475 13.4846L7.50192 12.4577C7.54808 12.4115 7.60577 12.3885 7.66346 12.3885C7.72115 12.3885 7.77885 12.4115 7.825 12.4577L10.3865 15.0192L17.425 7.92885C17.4712 7.88269 17.5288 7.85961 17.5865 7.85961C17.65 7.85961 17.7077 7.88269 17.7481 7.92885L18.7577 8.97308C18.8615 9.07115 18.8615 9.21538 18.7692 9.30769Z",
		fill: "currentColor"
	})
}), p = (e) => /* @__PURE__ */ s("svg", {
	viewBox: "0 0 16 20",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	...e,
	children: /* @__PURE__ */ s("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M2.97088 0C1.98059 0 1.23978e-05 0.595559 1.23978e-05 2.9778L0 17.0222C0 19.4044 1.98058 20 2.97087 20H13.0291C14.0194 20 16 19.4044 16 17.0222L16 6.69429C16 6.55835 16 6.45189 15.835 6.28646L10.2233 0.661733C10.2233 0.661733 10.2233 0.661733 10.2233 0.661733C10.2233 0.661731 9.56311 0 9.23302 0H2.97088ZM13.7108 6.47346L9.70829 2.46158C9.28946 2.04177 8.57282 2.33879 8.57282 2.93218V6.94406C8.57282 7.31181 8.87055 7.60993 9.23782 7.60993H13.2404C13.8327 7.60993 14.1294 6.89303 13.7108 6.47346Z",
		fill: "currentColor"
	})
}), m = (t) => {
	let [n, r] = a(t.mediaItem.type !== "image");
	function i() {
		t.onSelect?.(t.mediaItem);
	}
	function l() {
		return !n && t.mediaItem.isPlaceholder ? /* @__PURE__ */ s(e, { size: "sm" }) : t.mediaItem.type === "image" ? /* @__PURE__ */ s("img", {
			width: 60,
			height: 60,
			alt: "Media file",
			src: t.mediaItem.url,
			onLoad: () => r(!0),
			style: {
				width: 60,
				height: 60,
				objectFit: "cover",
				objectPosition: "center center"
			}
		}) : /* @__PURE__ */ s(p, { className: u.file__icon });
	}
	return /* @__PURE__ */ c("li", {
		className: o(u.file, t.selected && u["file--selected"]),
		onClick: i,
		children: [l(), t.selected && /* @__PURE__ */ s("div", {
			className: u.file__overlay,
			children: /* @__PURE__ */ s(f, { className: u.file__check })
		})]
	});
}, h = "image/png,image/jpeg";
function g(e) {
	return e.split("/").pop() || e;
}
function _(e) {
	let t = e.url.match(/\.(jpeg|jpg|gif|png)$/) != null;
	return {
		url: e.url,
		name: g(e.url),
		type: t ? "image" : "pdf"
	};
}
var v = ({ max: e = 10, label: f, helpText: p, name: g, files: v = [], interactiveMode: y = !1, disabled: b = !1, loading: x = !1, onFilesAdded: S, onFilesRemoved: C }) => {
	let [w, T] = a(v), [E, D] = a({}), O = i(() => Object.values(E).length, [E]), k = n(function(e) {
		let t = e.target.files;
		if (!t) return;
		let n = [], r = [];
		for (let e = 0; e < t.length; e++) {
			let i = t[e].name.replace(/ /g, "_").toLowerCase();
			i = `${w.length}_${i}`;
			let a = new File([t[e]], i, { type: t[e].type }), o = a.type.split("/")[0];
			r.push(a), n.push({
				type: o,
				url: (URL || webkitURL).createObjectURL(a),
				name: i
			});
		}
		T(y ? (e) => [...e, ...n.map((e) => ({
			...e,
			isPlaceholder: !0
		}))] : (e) => [...e, ...n]), r.length && S(r);
	}, [w, y]), [A, j] = a(v);
	v !== A && (j(v), D({}), T(v.map(_))), r(() => {
		if (!y) return () => {
			w.forEach((e) => {
				e.url.includes("blob:") && (URL || webkitURL).revokeObjectURL(e.url);
			});
		};
	}, []);
	let M = n((e) => {
		b || D((t) => {
			let n = { ...t };
			return n[e.name] ? delete n[e.name] : n[e.name] = !0, n;
		});
	}, [b]), N = n(() => {
		let e = (e) => {
			e.url.includes("blob:") && (URL || webkitURL).revokeObjectURL(e.url);
		};
		if (!O) {
			y || (w.forEach(e), T([]), D({})), C(w.map((e) => e.name));
			return;
		}
		y || (w.filter((e) => E[e.name]).forEach(e), T((e) => e.filter((e) => !E[e.name])), D({})), C(w.filter((e) => E[e.name]).map((e) => e.name));
	}, [
		w,
		y,
		O,
		E
	]);
	return w.length ? /* @__PURE__ */ c("div", {
		className: u["multiple-upload-files"],
		children: [
			/* @__PURE__ */ c("header", {
				className: u["multiple-upload-files__header"],
				children: [/* @__PURE__ */ s("span", {
					className: u["multiple-upload-files__title"],
					children: O > 0 ? `Selected (${O})` : "Select files"
				}), /* @__PURE__ */ s("button", {
					className: u["multiple-upload-files__delete"],
					type: "button",
					disabled: b || x,
					onClick: N,
					children: O > 0 ? "Delete selected" : "Delete all"
				})]
			}),
			/* @__PURE__ */ s(l, {
				autoHide: !0,
				children: /* @__PURE__ */ s("ul", {
					className: u["multiple-upload-files__list"],
					children: w.map((e) => /* @__PURE__ */ s(m, {
						mediaItem: e,
						selected: E[e.name],
						onSelect: M
					}, e.name))
				})
			}),
			!b && /* @__PURE__ */ s("div", {
				className: u["multiple-upload__addBox"],
				children: /* @__PURE__ */ c("label", {
					htmlFor: g,
					className: o(u["multiple-upload__add"], w.length >= e && u["upload__add--disabled"]),
					children: [
						/* @__PURE__ */ s(t, { className: u["multiple-upload__addIcon"] }),
						f,
						/* @__PURE__ */ s("input", {
							multiple: !0,
							id: g,
							name: g,
							type: "file",
							className: u["multiple-upload__input"],
							accept: h,
							disabled: b || w.length > e,
							onChange: k
						})
					]
				})
			})
		]
	}) : /* @__PURE__ */ c("div", {
		className: o(u["multiple-upload"], b && u["upload--disabled"]),
		children: [
			/* @__PURE__ */ c("label", {
				htmlFor: g,
				className: u["multiple-upload__label"],
				children: [/* @__PURE__ */ s(d, { className: u["multiple-upload__icon"] }), f]
			}),
			p && /* @__PURE__ */ s("p", {
				className: u["multiple-upload__help"],
				children: p
			}),
			/* @__PURE__ */ s("input", {
				multiple: !0,
				id: g,
				name: g,
				type: "file",
				className: u["multiple-upload__input"],
				disabled: b,
				accept: h,
				onChange: k
			})
		]
	});
};
//#endregion
export { v as t };
