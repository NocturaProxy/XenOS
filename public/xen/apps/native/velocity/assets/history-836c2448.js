import {
  c as w,
  p as b,
  _ as C,
  i as t,
  f as a,
  T as S,
  L as V,
  e as k,
  C as E,
  F as D,
  t as m,
  j as H,
} from "./index-1fe75362.js";
import { F as j } from "./Favicon-94b6bc56.js";
const F = m(
    '<main class="flex h-full w-full bg-[#1C1B22] text-white"><div class="flex h-full w-[118px] select-none flex-col items-center pt-[70px] text-2xl sm:w-[240px] sm:items-end"><div class="flex h-12 w-12 cursor-pointer items-center justify-center gap-[9px] rounded px-[10px] transition-colors hover:bg-[#52525E] sm:w-[204px] sm:justify-start"><i class="fa-light fa-trash h-6 w-6"></i><span class="hidden text-base sm:block">Clear Browsing Data</span></div></div><div class="mx-24 my-16 flex flex-1 flex-col"><h1 class="mb-5 text-2xl">History',
  ),
  M = m(
    '<div class="flex items-center justify-between border-b border-white px-5 py-2"><div class="flex flex-1 gap-5"><i class="fa-light fa-trash mt-[2px]"></i><span class="text-sm opacity-50">:<!> </span><a class="flex items-center gap-2"><div class="mt-[2px] h-4 w-4"></div><span class="text-sm"></span></a></div><div class="hidden flex-1 justify-end lg:flex"><span class="text-sm opacity-50">',
  );
function L() {
  const [u, n] = w([]);
  return (
    b(async () => {
      await C(
        () => import("./index-37963400.js").then((i) => i.i),
        [
          "assets/index-37963400.js",
          "assets/index-1fe75362.js",
          "assets/index-245ee21e.css",
          "assets/url-4d36b2c8.js",
        ],
      ),
        window.Velocity.history.on("ready", async () => {
          n(await window.Velocity.history.get());
        });
    }),
    (() => {
      const i = F(),
        l = i.firstChild,
        g = l.firstChild,
        c = l.nextSibling;
      return (
        c.firstChild,
        t(i, a(S, { children: "History" }), l),
        t(i, a(V, { rel: "icon", href: "/icons/clock.svg" }), l),
        (g.$$click = async () => {
          await window.Velocity.history.clear(),
            n(await window.Velocity.history.get());
        }),
        t(
          c,
          a(D, {
            get each() {
              return u();
            },
            children: (e) =>
              (() => {
                const o = M(),
                  d = o.firstChild,
                  f = d.firstChild,
                  s = f.nextSibling,
                  p = s.firstChild,
                  x = p.nextSibling;
                x.nextSibling;
                const r = s.nextSibling,
                  h = r.firstChild,
                  _ = h.nextSibling,
                  y = d.nextSibling,
                  $ = y.firstChild;
                return (
                  (f.$$click = async () => {
                    window.Velocity.history.delete(e.id),
                      n(await window.Velocity.history.get());
                  }),
                  t(s, () => new Date(e.timestamp).getHours() % 12, p),
                  t(s, () => new Date(e.timestamp).getMinutes(), x),
                  t(
                    s,
                    () =>
                      new Date(e.timestamp).getHours() >= 12 ? "PM" : "AM",
                    null,
                  ),
                  (r.$$click = (v) => {
                    v.preventDefault(),
                      new window.parent.Velocity.Tab(e.url, !0);
                  }),
                  t(
                    h,
                    a(j, {
                      get src() {
                        return w(e.favicon)[0];
                      },
                    }),
                  ),
                  t(_, () => e.title),
                  t($, () => e.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")),
                  k(() => E(r, "href", e.url)),
                  o
                );
              })(),
          }),
          null,
        ),
        i
      );
    })()
  );
}
H(["click"]);
export { L as default };
