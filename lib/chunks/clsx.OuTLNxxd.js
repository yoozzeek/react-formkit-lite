function a(r) {
  var f, n, t = "";
  if (typeof r == "string" || typeof r == "number") t += r;
  else if (typeof r == "object") if (Array.isArray(r)) {
    var o = r.length;
    for (f = 0; f < o; f++) r[f] && (n = a(r[f])) && (t && (t += " "), t += n);
  } else for (n in r) r[n] && (t && (t += " "), t += n);
  return t;
}
function i() {
  for (var r, f, n = 0, t = "", o = arguments.length; n < o; n++) (r = arguments[n]) && (f = a(r)) && (t && (t += " "), t += f);
  return t;
}
export {
  i as c
};
