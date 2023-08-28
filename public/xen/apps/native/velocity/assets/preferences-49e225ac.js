import {
  c as y,
  p as S,
  D as m,
  l as p,
  u as k,
  i as n,
  e as f,
  C as _,
  t as u,
  A as h,
  f as c,
  j as C,
  F as T,
  T as A,
  L as E,
} from "./index-1fe75362.js";
const K = u(
    '<div class="flex items-center gap-2"><select class="rounded bg-[#2A2A32] px-[15px] py-[7px]"></select><label class="font-light">',
  ),
  L = u('<option class="text-white">');
function w(e) {
  const [l, a] = y(e.default);
  S(() => {
    a(m()[e.id] ?? e.default);
  }),
    p(() => {
      localStorage.setItem(
        "preferences",
        JSON.stringify(Object.assign(m(), { [e.id]: l() })),
      );
    });
  function s(t) {
    t.addEventListener("change", () => {
      a(t.value);
    });
  }
  return (() => {
    const t = K(),
      i = t.firstChild,
      r = i.nextSibling,
      d = s;
    return (
      typeof d == "function" ? k(d, i) : (s = i),
      n(i, () =>
        e.values.map((o) =>
          (() => {
            const g = L();
            return n(g, o), f(() => (g.value = o.toLowerCase())), g;
          })(),
        ),
      ),
      n(r, () => e.label),
      f(() => _(i, "id", e.id)),
      f(() => (i.value = l())),
      t
    );
  })();
}
const B = u(
  '<div class="flex items-center gap-2"><input class="hidden" type="checkbox"><label style="-moz-box-align:center;">',
);
function b(e) {
  const [l, a] = y(e.default);
  S(() => {
    a(m()[e.id] ?? e.default);
  }),
    p(() => {
      localStorage.setItem(
        "preferences",
        JSON.stringify(Object.assign(m(), { [e.id]: l() })),
      );
    });
  function s(t) {
    t.addEventListener("change", () => {
      a(t.checked);
    });
  }
  return (() => {
    const t = B(),
      i = t.firstChild,
      r = i.nextSibling,
      d = s;
    return (
      typeof d == "function" ? k(d, i) : (s = i),
      n(r, () => e.label),
      f(
        (o) => {
          const g = e.id,
            x = `flex items-center gap-[6px] font-light before:inline-block before:h-4 before:w-4 before:rounded-[2px] before:content-[s] ${
              l()
                ? "before:bg-[#0df] before:bg-[url('/icons/check.svg')] hover:before:bg-[#80EBFF]"
                : "before:bg-[#2B2A33] before:outline before:outline-1 before:outline-[#7A7A81] hover:before:bg-[#52525E]"
            } before:bg-norepeat before:bg-center`,
            $ = e.id;
          return (
            g !== o._v$ && _(i, "id", (o._v$ = g)),
            x !== o._v$2 && h(r, (o._v$2 = x)),
            $ !== o._v$3 && _(r, "for", (o._v$3 = $)),
            o
          );
        },
        { _v$: void 0, _v$2: void 0, _v$3: void 0 },
      ),
      f(() => (i.checked = l())),
      t
    );
  })();
}
const D = u(
  '<div><h1 class="text-[1.46em] font-light leading-[1.3em]">Search</h1><section><h2 class="text-lg font-semibold">Default Search Engine</h2><div class="my-2 flex flex-col gap-2"></div></section><section><h2 class="text-lg font-semibold">Default https</h2><div class="my-2 flex flex-col gap-2"></div></section><section><h2 class="text-lg font-semibold">Default Proxy</h2><div class="my-2 flex flex-col gap-2">',
);
function I(e) {
  return (() => {
    const l = D(),
      a = l.firstChild,
      s = a.nextSibling,
      t = s.firstChild,
      i = t.nextSibling,
      r = s.nextSibling,
      d = r.firstChild,
      o = d.nextSibling,
      g = r.nextSibling,
      x = g.firstChild,
      $ = x.nextSibling;
    return (
      n(
        i,
        c(w, {
          id: "search.defaults.searchEngine",
          default: "google",
          values: ["Google", "Bing", "DuckDuckGo", "Brave", "Yahoo"],
          label: "This is the default search engine used for searches.",
        }),
      ),
      n(
        o,
        c(b, {
          id: "search.defaults.useHttps",
          default: !1,
          label: "Should Velocity use https when a protocol is not present.",
        }),
      ),
      n(
        $,
        c(w, {
          id: "search.defaults.proxy",
          default: "ultraviolet",
          values: ["Ultraviolet"],
          label: "This is the default web proxy used when browsing the web.",
        }),
      ),
      f(() =>
        h(
          l,
          `flex w-full flex-col gap-5 px-7 ${
            e.id === e.active() ? "" : "hidden"
          }`,
        ),
      ),
      l
    );
  })();
}
const O = u(
  '<div><h1 class="text-[1.46em] font-light leading-[1.3em]">General</h1><section><h2 class="text-lg font-semibold">Startup</h2><div class="my-2 flex flex-col gap-2"></div></section><section><h2 class="text-lg font-semibold">Tabs</h2><div class="my-2 flex flex-col gap-2">',
);
function j(e) {
  return (() => {
    const l = O(),
      a = l.firstChild,
      s = a.nextSibling,
      t = s.firstChild,
      i = t.nextSibling,
      r = s.nextSibling,
      d = r.firstChild,
      o = d.nextSibling;
    return (
      n(
        i,
        c(b, {
          id: "general.startup.openPreviousTabs",
          default: !0,
          label: "Open previous tabs",
        }),
      ),
      n(
        o,
        c(b, {
          id: "general.tabs.openWindowLinksInTab",
          default: !0,
          label: "Open links in tabs instead of new windows",
        }),
        null,
      ),
      n(
        o,
        c(b, {
          id: "general.tabs.switchToMedia",
          default: !1,
          label:
            "When you open a link, image or media in a new tab, switch to it imediately",
        }),
        null,
      ),
      n(
        o,
        c(b, {
          id: "general.tabs.confirmBeforeClosing",
          default: !0,
          label: "Confirm before closing multiple tabs",
        }),
        null,
      ),
      f(() =>
        h(
          l,
          `flex w-full flex-col gap-5 px-7 ${
            e.id === e.active() ? "" : "hidden"
          }`,
        ),
      ),
      l
    );
  })();
}
const G = u('<div><h1 class="text-[1.46em] font-light leading-[1.3em]">Home');
function H(e) {
  return (() => {
    const l = G();
    return (
      f(() =>
        h(
          l,
          `flex w-full flex-col gap-5 px-7 ${
            e.id === e.active() ? "" : "hidden"
          }`,
        ),
      ),
      l
    );
  })();
}
const F = u(
  '<div class="flex items-center gap-2"><input type="text" class="rounded bg-[#2A2A32] px-[15px] py-[7px]"><label class="font-light">',
);
function N(e) {
  return (() => {
    const l = F(),
      a = l.firstChild,
      s = a.nextSibling;
    return (
      (a.$$keydown = (t) => {
        if (
          (t.preventDefault(),
          t.stopImmediatePropagation(),
          !(t.target instanceof HTMLInputElement) ||
            /^(control|alt|shift|meta)$/i.test(t.key))
        )
          return;
        const i = {
            id: e.value.id,
            name: e.value.name,
            description: e.value.description,
            key: t.key,
            ctrl: t.ctrlKey,
            shift: t.shiftKey,
            alt: t.altKey,
            meta: t.metaKey,
            callback: e.value.callback,
          },
          r = new window.parent.Velocity.Keybind(i);
        t.target.value = r.toString();
      }),
      n(s, () => e.value.description),
      f(() => (a.value = e.value.toString())),
      l
    );
  })();
}
C(["keydown"]);
const P = u(
  '<div><h1 class="text-[1.46em] font-light leading-[1.3em]">Keybinds</h1><section><div class="my-2 flex flex-col gap-5 overflow-auto">',
);
function M(e) {
  return (() => {
    const l = P(),
      a = l.firstChild,
      s = a.nextSibling,
      t = s.firstChild;
    return (
      n(
        t,
        c(T, {
          get each() {
            return window.parent.Velocity.getKeybinds();
          },
          children: (i) => c(N, { value: i }),
        }),
      ),
      f(() =>
        h(
          l,
          `flex w-full flex-col gap-5 px-7 ${
            e.id === e.active() ? "" : "hidden"
          }`,
        ),
      ),
      l
    );
  })();
}
const V = u('<div><i></i><span class="hidden text-base sm:block">');
function v(e) {
  return (() => {
    const l = V(),
      a = l.firstChild,
      s = a.nextSibling;
    return (
      (l.$$click = () => e.active[1](e.title.toLowerCase())),
      n(s, () => e.title),
      f(
        (t) => {
          const i = e.title,
            r = `flex h-12 w-12 cursor-default items-center justify-center gap-[9px] rounded px-[10px] transition-colors hover:bg-[color:var(--button-hover)] sm:w-[204px] sm:justify-start ${
              e.title.toLowerCase() === e.active[0]() ? "text-[#0df]" : ""
            }`,
            d = `fa-light h-6 w-6 fa-${e.icon}`;
          return (
            i !== t._v$ && _(l, "title", (t._v$ = i)),
            r !== t._v$2 && h(l, (t._v$2 = r)),
            d !== t._v$3 && h(a, (t._v$3 = d)),
            t
          );
        },
        { _v$: void 0, _v$2: void 0, _v$3: void 0 },
      ),
      l
    );
  })();
}
C(["click"]);
const J = u(`<main class="flex h-full w-full text-white"><style>
        body {
          background: #1C1B22;
        }
      </style><div class="flex h-full w-[118px] select-none flex-col items-center pt-[70px] text-2xl sm:w-[240px] sm:items-end"></div><div class="flex-1"><div class="h-[82px] w-full">`);
function z() {
  const [e, l] = y("general");
  return (() => {
    const a = J(),
      s = a.firstChild,
      t = s.nextSibling,
      i = t.nextSibling;
    return (
      i.firstChild,
      n(a, c(A, { children: "Settings" }), t),
      n(a, c(E, { rel: "icon", href: "icons/gear.svg" }), t),
      n(t, c(v, { active: [e, l], title: "General", icon: "gear" }), null),
      n(t, c(v, { active: [e, l], title: "Home", icon: "home" }), null),
      n(t, c(v, { active: [e, l], title: "Search", icon: "search" }), null),
      n(t, c(v, { active: [e, l], title: "Keybinds", icon: "keyboard" }), null),
      n(i, c(j, { id: "general", active: e }), null),
      n(i, c(H, { id: "home", active: e }), null),
      n(i, c(I, { id: "search", active: e }), null),
      n(i, c(M, { id: "keybinds", active: e }), null),
      a
    );
  })();
}
export { z as default };
