import { t as e } from "./chunks/dynamic.CM01WaG6.js";
import "./chunks/pattern.o_LM6fbU.js";
var t = new e({
	mask: [
		{
			mask: ["+0 000 000-0000"],
			startsWith: "1",
			lazy: !0,
			country: "United States"
		},
		{
			mask: ["+00 {21} 0-000-0000"],
			startsWith: "30",
			lazy: !0,
			country: "Greece"
		},
		{
			mask: ["+0 000 000-00-00"],
			startsWith: "7",
			lazy: !0,
			country: "Russia"
		},
		{
			mask: ["+00-0000-000000"],
			startsWith: "91",
			lazy: !0,
			country: "India"
		},
		{
			mask: ["+00 000 000-0000"],
			startsWith: "63",
			lazy: !0,
			country: "Philippines"
		},
		{
			mask: ["+00 000-000000[0]"],
			startsWith: "84",
			lazy: !0,
			country: "Vietnam"
		},
		{
			mask: ["+00-000-0000-0000"],
			startsWith: "62",
			lazy: !0,
			country: "Indonesia"
		},
		{
			mask: ["00000000000"],
			startsWith: "",
			country: "unknown",
			lazy: !0
		}
	],
	dispatch: function(e, t) {
		let n = (t.value + e).replace(/\D/g, "");
		return t.compiledMasks.find((e) => n.indexOf(e.startsWith) === 0);
	}
});
//#endregion
export { t as phoneNumberWithCodeMask };
