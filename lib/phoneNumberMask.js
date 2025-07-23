import { M as n } from "./chunks/dynamic.BOxkNYSY.js";
import "./chunks/pattern.KyQgdgMN.js";
const r = [
  {
    mask: "+0 000 000-0000",
    startsWith: "1",
    lazy: !1,
    country: "United States"
  },
  {
    mask: "+00 {21} 0-000-0000",
    startsWith: "30",
    lazy: !1,
    country: "Greece"
  },
  {
    mask: "+0 000 000-00-00",
    startsWith: "7",
    lazy: !1,
    country: "Russia"
  },
  {
    mask: "+00-0000-000000",
    startsWith: "91",
    lazy: !1,
    country: "India"
  },
  {
    mask: "+00 000 000-0000",
    startsWith: "63",
    lazy: !1,
    country: "Philippines"
  },
  {
    mask: "+00 000-000000[0]",
    startsWith: "84",
    lazy: !1,
    country: "Vietnam"
  },
  {
    mask: "+00-000-0000-0000",
    startsWith: "62",
    lazy: !1,
    country: "Indonesia"
  },
  {
    mask: "00000000000",
    startsWith: "",
    country: "unknown",
    lazy: !1
  }
], l = new n({
  mask: r,
  dispatch: function(t, s) {
    const a = (s.value + t).replace(/\D/g, "");
    return s.compiledMasks.find((e) => a.indexOf(e.startsWith) === 0);
  }
});
export {
  l as phoneNumberWithCodeMask
};
