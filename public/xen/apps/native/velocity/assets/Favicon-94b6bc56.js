import {
  c as l,
  l as g,
  J as i,
  K as b,
  M as f,
  o as u,
  e as w,
  N as d,
  t as h,
} from "./index-1fe75362.js";
const v = h('<div class="h-full w-full bg-cover bg-no-repeat">');
function R(t) {
  const [s, e] = l(/^data:/.test(t.src()) ? void 0 : t.src());
  return (
    g(() => {
      const n = new AbortController();
      if (/^data:/.test(t.src())) return e(t.src());
      try {
        new URL(t.src());
      } catch {
        return;
      }
      if (new URL(t.src()).origin === location.origin) return e(t.src());
      if (!i()) {
        const a =
          typeof window.__uv$config.bare == "string"
            ? window.__uv$config.bare
            : window.__uv$config.bare[
                Math.floor(Math.random() * window.__uv$config.bare.length)
              ];
        b(new f(new URL(a, location.toString())));
      }
      const r = (async () => {
        try {
          const o = await (
            await i().fetch(t.src(), { signal: n.signal })
          ).blob();
          if (!/image/.test(o.type)) e("/icons/earth.svg");
          else {
            const c = URL.createObjectURL(o);
            return e(c), c;
          }
        } catch {
          try {
            const o = await (
              await i().fetch(
                `https://www.google.com/s2/favicons?domain=${t.src()}&sz=64`,
                { signal: n.signal },
              )
            ).blob();
            if (!/image/.test(o.type)) e("/icons/earth.svg");
            else {
              const c = URL.createObjectURL(o);
              return e(c), c;
            }
          } catch {}
        }
      })();
      u(() => {
        n.abort(), r?.then((a) => (a ? URL.revokeObjectURL(a) : null));
      });
    }),
    (() => {
      const n = v();
      return w((r) => d(n, `background-image: url("${s()}")`, r)), n;
    })()
  );
}
export { R as F };
