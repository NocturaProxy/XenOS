import {
  c as o,
  p as r,
  I as i,
  D as c,
  i as d,
  f,
  T as m,
  e as u,
  C as g,
  t as h,
  j as p,
} from "./index-1fe75362.js";
import { g as w } from "./url-4d36b2c8.js";
const x = h(
  '<main class="flex h-full w-full flex-col items-center" id="ntp"><div class="m-5 mt-32 flex items-center gap-5"><div class="h-20 w-20" id="logo"></div><h1 class="text-4xl font-semibold">Velocity</h1></div><input class="m-5 rounded-md px-5 py-4 text-sm shadow-lg focus:shadow-2xl focus:outline-none focus:ring-0 md:w-1/2">',
);
function v() {
  const [s, a] = o("Google");
  function l(e) {
    if (e.key === "Enter") {
      const t = e.target.value;
      location.href = w(t);
    }
  }
  return (
    r(() => {
      setInterval(() => {
        a(i[c()["search.defaults.searchEngine"] || "google"].name);
      }, 100);
    }),
    (() => {
      const e = x(),
        n = e.firstChild,
        t = n.nextSibling;
      return (
        d(e, f(m, { children: "New Tab" }), n),
        (t.$$keydown = l),
        u(() => g(t, "placeholder", `Search with ${s()} or enter address`)),
        e
      );
    })()
  );
}
p(["keydown"]);
export { v as default };
