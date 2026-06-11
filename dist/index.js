import { t as e } from "./chunks/SelectField.C0nIhaVk.js";
import { t } from "./chunks/Loader.DI5rvy7C.js";
import { t as n } from "./chunks/Button.wmX7vita.js";
import { t as r } from "./chunks/Badge.BfJadn6o.js";
import { t as i } from "./chunks/Header.Ct3D9pIR.js";
import { t as a } from "./chunks/TextField.2iuN13dU.js";
import { t as o } from "./chunks/RangeField.jPuocTGs.js";
import { t as s } from "./chunks/DateField.Dl5Wfdyv.js";
import c from "./Checkbox.js";
import l from "./CheckboxGroup.js";
import u from "./Radio.js";
import d from "./RadioGroup.js";
import { t as f } from "./chunks/SwitchField.CHcah0YD.js";
import { t as p } from "./chunks/UploadMultipleFiles.BC91fFQB.js";
import { t as m } from "./chunks/UploadArea.DfzHPBjQ.js";
import { useCallback as h } from "react";
//#region src/hooks/useCenterOnHorizontalScroll.ts
function g(e) {
	let t = e.parentElement;
	for (; t;) {
		let e = window.getComputedStyle(t), n = e.overflowX === "auto" || e.overflowX === "scroll" || e.overflowX === "overlay";
		if (t.scrollWidth > t.clientWidth && n) return t;
		if (t.classList.contains("simplebar-content")) {
			let e = t.closest(".simplebar-content-wrapper");
			if (e) return e;
		}
		t = t.parentElement;
	}
	return null;
}
function _(e, t) {
	let n = e.getBoundingClientRect().left, r = t.getBoundingClientRect().left, i = e.scrollLeft + (r - n + t.offsetWidth / 2) - e.clientWidth / 2, a = e.scrollWidth - e.clientWidth, o = Math.max(0, Math.min(a, i)), s = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	e.scrollTo({
		left: o,
		behavior: s ? "auto" : "smooth"
	});
}
function v(e) {
	return h((t) => {
		let n = t.currentTarget, r = e?.container || n.closest(".simplebar-content-wrapper") || g(n);
		r && _(r, n);
	}, [e?.container]);
}
//#endregion
export { r as Badge, n as Button, c as CheckboxField, l as CheckboxGroup, s as DateField, i as Header, t as Loader, p as MultipleFilesField, u as RadioField, d as RadioGroup, o as RangeField, e as SelectField, f as SwitchField, a as TextField, m as UploadArea, v as useCenterOnHorizontalScroll };
