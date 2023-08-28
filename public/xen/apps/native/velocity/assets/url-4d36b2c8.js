import { ac as r, ad as c, D as s, I as a } from "./index-1fe75362.js";
const i = {
  find: (e) => {
    for (const n of r())
      if (n.match.test(e)) {
        const o = e.replace(n.match, "");
        return n.find(o);
      }
  },
  reverse: (e) => {
    for (const n of r()) if (n.reverse(e)) return n.reverse(e);
  },
};
function w(e) {
  if (!("location" in globalThis)) return e;
  const n = i.reverse(e);
  return (
    i.find(e) ||
      (n
        ? (e = n)
        : e.startsWith(location.origin + window.__uv$config.prefix) &&
          ((e = e.replace(location.origin + window.__uv$config.prefix, "")),
          (e = c.decode(e))),
      e === "about:newTab" && (e = "")),
    e
  );
}
function p(e) {
  let n;
  return (
    window.__uv$config || window.location.reload(),
    i.find(e) || i.reverse(e)
      ? (n = i.find(e) || "internal/newTab")
      : /^https?:\/\/([^\s]+\.)+[^\s]+(:[0-65536])?$/.test(e)
      ? (n = window.__uv$config.prefix + window.__uv$config.encodeUrl(e))
      : /^([^\s]+\.)+[^\s]+(:[0-65536])?$/.test(e)
      ? (n =
          window.__uv$config.prefix +
          window.__uv$config.encodeUrl(
            "http" + (s()["search.defaults.useHttps"] ? "s" : "") + "://" + e,
          ))
      : (n = window.__uv$config.prefix + window.__uv$config.encodeUrl(f(e))),
    n
  );
}
function f(e) {
  return a[s()["search.defaults.searchEngine"] || "google"].searchStr.replace(
    "%s",
    encodeURIComponent(e),
  );
}
function g(e, n) {
  try {
    const o = new URL(e),
      t = new URL(n);
    return (
      o.origin === t.origin &&
      o.pathname === t.pathname &&
      o.search === t.search
    );
  } catch {
    return !1;
  }
}
export { g as a, p as g, w as n, i as p };
