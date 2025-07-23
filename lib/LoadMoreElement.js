import { jsx as i } from "react/jsx-runtime";
import { useRef as o, useEffect as u } from "react";
function l(t) {
  if (!t)
    return !1;
  const e = t.getBoundingClientRect();
  return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth);
}
const m = ({
  threshold: t = 1,
  loadMore: e
}) => {
  const r = o(null), n = o(null);
  return u(() => (r.current = new IntersectionObserver(
    (c) => {
      c.forEach((s) => {
        s.isIntersecting && n?.current && l(n.current) && e();
      });
    },
    {
      threshold: t
    }
  ), n?.current && r.current.observe(n.current), () => {
    r.current?.disconnect();
  }), [e]), /* @__PURE__ */ i("div", { ref: n, className: "relative -z-10 h-[1px] w-[1px] opacity-0", children: /* @__PURE__ */ i("span", { className: "sr-only", children: "Show more" }) });
};
export {
  m as default
};
