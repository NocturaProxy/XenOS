import {
  $ as X,
  a as Oe,
  g as je,
  b as z,
  c as Y,
  s as et,
  d as tt,
  e as V,
  o as Z,
  u as $e,
  i as p,
  f as _,
  h as U,
  t as D,
  j as G,
  m as rt,
  k as Re,
  l as R,
  n as L,
  p as ee,
  q as Le,
  r as xe,
  v as Ne,
  w as ne,
  F as ae,
  S as oe,
  x as nt,
  y as Te,
  z as P,
  A as F,
  B as at,
  C as se,
  _ as de,
  D as Be,
  E as ot,
  G as fe,
  H as st,
  I as lt,
  T as it,
} from "./index-1fe75362.js";
import { F as He } from "./Favicon-94b6bc56.js";
import {
  C as B,
  r as Ae,
  a as ct,
  T as K,
  V as ut,
  k as dt,
  b as ft,
} from "./index-37963400.js";
import { n as gt } from "./url-4d36b2c8.js";
const ye = Symbol("store-raw"),
  ie = Symbol("store-node");
function Ve(e) {
  let r = e[X];
  if (
    !r &&
    (Object.defineProperty(e, X, { value: (r = new Proxy(e, vt)) }),
    !Array.isArray(e))
  ) {
    const t = Object.keys(e),
      n = Object.getOwnPropertyDescriptors(e);
    for (let a = 0, o = t.length; a < o; a++) {
      const i = t[a];
      n[i].get &&
        Object.defineProperty(e, i, {
          enumerable: n[i].enumerable,
          get: n[i].get.bind(r),
        });
    }
  }
  return r;
}
function ge(e) {
  let r;
  return (
    e != null &&
    typeof e == "object" &&
    (e[X] ||
      !(r = Object.getPrototypeOf(e)) ||
      r === Object.prototype ||
      Array.isArray(e))
  );
}
function ce(e, r = new Set()) {
  let t, n, a, o;
  if ((t = e != null && e[ye])) return t;
  if (!ge(e) || r.has(e)) return e;
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? (e = e.slice(0)) : r.add(e);
    for (let i = 0, l = e.length; i < l; i++)
      (a = e[i]), (n = ce(a, r)) !== a && (e[i] = n);
  } else {
    Object.isFrozen(e) ? (e = Object.assign({}, e)) : r.add(e);
    const i = Object.keys(e),
      l = Object.getOwnPropertyDescriptors(e);
    for (let c = 0, m = i.length; c < m; c++)
      (o = i[c]), !l[o].get && ((a = e[o]), (n = ce(a, r)) !== a && (e[o] = n));
  }
  return e;
}
function _e(e) {
  let r = e[ie];
  return (
    r || Object.defineProperty(e, ie, { value: (r = Object.create(null)) }), r
  );
}
function we(e, r, t) {
  return e[r] || (e[r] = Fe(t));
}
function bt(e, r) {
  const t = Reflect.getOwnPropertyDescriptor(e, r);
  return (
    !t ||
      t.get ||
      !t.configurable ||
      r === X ||
      r === ie ||
      (delete t.value, delete t.writable, (t.get = () => e[X][r])),
    t
  );
}
function ze(e) {
  if (je()) {
    const r = _e(e);
    (r._ || (r._ = Fe()))();
  }
}
function pt(e) {
  return ze(e), Reflect.ownKeys(e);
}
function Fe(e) {
  const [r, t] = Y(e, { equals: !1, internal: !0 });
  return (r.$ = t), r;
}
const vt = {
  get(e, r, t) {
    if (r === ye) return e;
    if (r === X) return t;
    if (r === Oe) return ze(e), t;
    const n = _e(e),
      a = n[r];
    let o = a ? a() : e[r];
    if (r === ie || r === "__proto__") return o;
    if (!a) {
      const i = Object.getOwnPropertyDescriptor(e, r);
      je() &&
        (typeof o != "function" || e.hasOwnProperty(r)) &&
        !(i && i.get) &&
        (o = we(n, r, o)());
    }
    return ge(o) ? Ve(o) : o;
  },
  has(e, r) {
    return r === ye || r === X || r === Oe || r === ie || r === "__proto__"
      ? !0
      : (this.get(e, r, e), r in e);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: pt,
  getOwnPropertyDescriptor: bt,
};
function be(e, r, t, n = !1) {
  if (!n && e[r] === t) return;
  const a = e[r],
    o = e.length;
  t === void 0 ? delete e[r] : (e[r] = t);
  let i = _e(e),
    l;
  if (((l = we(i, r, a)) && l.$(() => t), Array.isArray(e) && e.length !== o)) {
    for (let c = e.length; c < o; c++) (l = i[c]) && l.$();
    (l = we(i, "length", o)) && l.$(e.length);
  }
  (l = i._) && l.$();
}
function Ke(e, r) {
  const t = Object.keys(r);
  for (let n = 0; n < t.length; n += 1) {
    const a = t[n];
    be(e, a, r[a]);
  }
}
function mt(e, r) {
  if ((typeof r == "function" && (r = r(e)), (r = ce(r)), Array.isArray(r))) {
    if (e === r) return;
    let t = 0,
      n = r.length;
    for (; t < n; t++) {
      const a = r[t];
      e[t] !== a && be(e, t, a);
    }
    be(e, "length", n);
  } else Ke(e, r);
}
function re(e, r, t = []) {
  let n,
    a = e;
  if (r.length > 1) {
    n = r.shift();
    const i = typeof n,
      l = Array.isArray(e);
    if (Array.isArray(n)) {
      for (let c = 0; c < n.length; c++) re(e, [n[c]].concat(r), t);
      return;
    } else if (l && i === "function") {
      for (let c = 0; c < e.length; c++) n(e[c], c) && re(e, [c].concat(r), t);
      return;
    } else if (l && i === "object") {
      const { from: c = 0, to: m = e.length - 1, by: w = 1 } = n;
      for (let u = c; u <= m; u += w) re(e, [u].concat(r), t);
      return;
    } else if (r.length > 1) {
      re(e[n], r, [n].concat(t));
      return;
    }
    (a = e[n]), (t = [n].concat(t));
  }
  let o = r[0];
  (typeof o == "function" && ((o = o(a, t)), o === a)) ||
    (n === void 0 && o == null) ||
    ((o = ce(o)),
    n === void 0 || (ge(a) && ge(o) && !Array.isArray(o))
      ? Ke(a, o)
      : be(e, n, o));
}
function We(...[e, r]) {
  const t = ce(e || {}),
    n = Array.isArray(t),
    a = Ve(t);
  function o(...i) {
    z(() => {
      n && i.length === 1 ? mt(t, i[0]) : re(t, i);
    });
  }
  return [a, o];
}
var ht = ["src"];
function xt(e) {
  const r = document.createElement("script"),
    [t, n] = et(e, ht);
  return (
    tt(r, n, !1, !0),
    V(() => {
      const a = typeof t.src == "string" ? t.src : t.src(),
        o = /^(https?:|\w[\.\w-_%]+|)\//.test(a) ? "src" : "textContent";
      r[o] !== a && ((r[o] = a), document.head.appendChild(r));
    }),
    Z(() => document.head.contains(r) && document.head.removeChild(r)),
    r
  );
}
const yt = D(
  '<div class="toolbarbutton-1 flex h-6 cursor-default select-none items-center gap-1 rounded px-1"><div class="h-[15px] w-[15px]">',
);
function wt(e) {
  const { sortable: r, bookmark: t } = e;
  function n(a) {
    Ae(t, a);
  }
  return (() => {
    const a = yt(),
      o = a.firstChild;
    return (
      (a.$$contextmenu = (i) => {
        i.data = [
          new B({
            text: "Open in new tab",
            onClick(l) {
              Ae(t, l, !0);
            },
          }),
          new B({ separator: !0 }),
          new B({
            text: "Delete",
            onClick: () => {
              ct(t);
            },
          }),
          new B({ separator: !0 }),
        ];
      }),
      (a.$$click = n),
      $e(r, a, () => !0),
      p(
        o,
        _(He, {
          get src() {
            return Y(t.icon || "about:newTab")[0];
          },
        }),
      ),
      p(
        a,
        (() => {
          const i = U(() => t.title.length > 20);
          return () => (i() ? t.title.substring(0, 18) + "..." : t.title);
        })(),
        null,
      ),
      a
    );
  })();
}
G(["click", "contextmenu"]);
var pe = class {
    x;
    y;
    width;
    height;
    constructor(e) {
      (this.x = Math.floor(e.x)),
        (this.y = Math.floor(e.y)),
        (this.width = Math.floor(e.width)),
        (this.height = Math.floor(e.height));
    }
    get rect() {
      return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
    get left() {
      return this.x;
    }
    get top() {
      return this.y;
    }
    get right() {
      return this.x + this.width;
    }
    get bottom() {
      return this.y + this.height;
    }
    get center() {
      return { x: this.x + this.width * 0.5, y: this.y + this.height * 0.5 };
    }
    get corners() {
      return {
        topLeft: { x: this.left, y: this.top },
        topRight: { x: this.right, y: this.top },
        bottomRight: { x: this.left, y: this.bottom },
        bottomLeft: { x: this.right, y: this.bottom },
      };
    }
  },
  le = (e) => {
    let r = new pe(e.getBoundingClientRect());
    const { transform: t } = getComputedStyle(e);
    return t && (r = $t(r, t)), r;
  },
  $t = (e, r) => {
    let t, n;
    if (r.startsWith("matrix3d(")) {
      const a = r.slice(9, -1).split(/, /);
      (t = +a[12]), (n = +a[13]);
    } else if (r.startsWith("matrix(")) {
      const a = r.slice(7, -1).split(/, /);
      (t = +a[4]), (n = +a[5]);
    } else (t = 0), (n = 0);
    return new pe({ ...e, x: e.x - t, y: e.y - n });
  },
  H = () => ({ x: 0, y: 0 }),
  ke = (e, r) => e.x === r.x && e.y === r.y,
  me = (e, r) => new pe({ ...e, x: e.x + r.x, y: e.y + r.y }),
  _t = (e, r) => Math.sqrt(Math.pow(e.x - r.x, 2) + Math.pow(e.y - r.y, 2)),
  kt = (e, r) => {
    const t = Math.max(e.top, r.top),
      n = Math.max(e.left, r.left),
      a = Math.min(e.right, r.right),
      o = Math.min(e.bottom, r.bottom),
      i = a - n,
      l = o - t;
    if (n < a && t < o) {
      const c = e.width * e.height,
        m = r.width * r.height,
        w = i * l;
      return w / (c + m - w);
    }
    return 0;
  },
  he = (e, r) =>
    e.x === r.x && e.y === r.y && e.width === r.width && e.height === r.height,
  qe = (e, r, t) => {
    const n = e.transformed.center,
      a = { distance: 1 / 0, droppable: null };
    for (const o of r) {
      const i = _t(n, o.layout.center);
      i < a.distance
        ? ((a.distance = i), (a.droppable = o))
        : i === a.distance && o.id === t.activeDroppableId && (a.droppable = o);
    }
    return a.droppable;
  },
  It = (e, r, t) => {
    const n = e.transformed,
      a = { ratio: 0, droppable: null };
    for (const o of r) {
      const i = kt(n, o.layout);
      i > a.ratio
        ? ((a.ratio = i), (a.droppable = o))
        : i > 0 &&
          i === a.ratio &&
          o.id === t.activeDroppableId &&
          (a.droppable = o);
    }
    return a.droppable;
  },
  Ue = Le(),
  Xe = (e) => {
    const r = rt({ collisionDetector: It }, e),
      [t, n] = We({
        draggables: {},
        droppables: {},
        sensors: {},
        active: {
          draggableId: null,
          get draggable() {
            return t.active.draggableId !== null
              ? t.draggables[t.active.draggableId]
              : null;
          },
          droppableId: null,
          get droppable() {
            return t.active.droppableId !== null
              ? t.droppables[t.active.droppableId]
              : null;
          },
          sensorId: null,
          get sensor() {
            return t.active.sensorId !== null
              ? t.sensors[t.active.sensorId]
              : null;
          },
          overlay: null,
        },
      }),
      a = (s, d, b) => {
        s.substring(0, s.length - 1),
          L(() => t[s][d]) && n(s, d, "transformers", b.id, b);
      },
      o = (s, d, b) => {
        s.substring(0, s.length - 1),
          L(() => t[s][d]) &&
            L(() => t[s][d].transformers[b]) &&
            n(s, d, "transformers", b, void 0);
      },
      i = ({ id: s, node: d, layout: b, data: T }) => {
        const y = t.draggables[s],
          x = { id: s, node: d, layout: b, data: T, _pendingCleanup: !1 };
        let S;
        if (!y)
          Object.defineProperties(x, {
            transformers: {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: {},
            },
            transform: {
              enumerable: !0,
              configurable: !0,
              get: () => {
                if (t.active.overlay) return H();
                const M = Object.values(t.draggables[s].transformers);
                return (
                  M.sort((N, Q) => N.order - Q.order),
                  M.reduce((N, Q) => Q.callback(N), H())
                );
              },
            },
            transformed: {
              enumerable: !0,
              configurable: !0,
              get: () => me(t.draggables[s].layout, t.draggables[s].transform),
            },
          });
        else if (t.active.draggableId === s && !t.active.overlay) {
          const M = { x: y.layout.x - b.x, y: y.layout.y - b.y },
            N = "addDraggable-existing-offset",
            Q = y.transformers[N],
            Se = Q ? Q.callback(M) : M;
          (S = {
            id: N,
            order: 100,
            callback: (Ce) => ({ x: Ce.x + Se.x, y: Ce.y + Se.y }),
          }),
            q(() => o("draggables", s, N));
        }
        z(() => {
          n("draggables", s, x), S && a("draggables", s, S);
        }),
          t.active.draggable && h();
      },
      l = (s) => {
        L(() => t.draggables[s]) &&
          (n("draggables", s, "_pendingCleanup", !0),
          queueMicrotask(() => c(s)));
      },
      c = (s) => {
        if (t.draggables[s]?._pendingCleanup) {
          const d = t.active.draggableId === s;
          z(() => {
            d && n("active", "draggableId", null), n("draggables", s, void 0);
          });
        }
      },
      m = ({ id: s, node: d, layout: b, data: T }) => {
        const y = t.droppables[s],
          x = { id: s, node: d, layout: b, data: T, _pendingCleanup: !1 };
        y ||
          Object.defineProperties(x, {
            transformers: {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: {},
            },
            transform: {
              enumerable: !0,
              configurable: !0,
              get: () => {
                const S = Object.values(t.droppables[s].transformers);
                return (
                  S.sort((M, N) => M.order - N.order),
                  S.reduce((M, N) => N.callback(M), H())
                );
              },
            },
            transformed: {
              enumerable: !0,
              configurable: !0,
              get: () => me(t.droppables[s].layout, t.droppables[s].transform),
            },
          }),
          n("droppables", s, x),
          t.active.draggable && h();
      },
      w = (s) => {
        L(() => t.droppables[s]) &&
          (n("droppables", s, "_pendingCleanup", !0),
          queueMicrotask(() => u(s)));
      },
      u = (s) => {
        if (t.droppables[s]?._pendingCleanup) {
          const d = t.active.droppableId === s;
          z(() => {
            d && n("active", "droppableId", null), n("droppables", s, void 0);
          });
        }
      },
      f = ({ id: s, activators: d }) => {
        n("sensors", s, {
          id: s,
          activators: d,
          coordinates: {
            origin: { x: 0, y: 0 },
            current: { x: 0, y: 0 },
            get delta() {
              return {
                x:
                  t.sensors[s].coordinates.current.x -
                  t.sensors[s].coordinates.origin.x,
                y:
                  t.sensors[s].coordinates.current.y -
                  t.sensors[s].coordinates.origin.y,
              };
            },
          },
        });
      },
      v = (s) => {
        if (!L(() => t.sensors[s])) return;
        const d = t.active.sensorId === s;
        z(() => {
          d && n("active", "sensorId", null), n("sensors", s, void 0);
        });
      },
      g = ({ node: s, layout: d }) => {
        const b = t.active.overlay,
          T = { node: s, layout: d };
        b ||
          Object.defineProperties(T, {
            id: {
              enumerable: !0,
              configurable: !0,
              get: () => t.active.draggable?.id,
            },
            data: {
              enumerable: !0,
              configurable: !0,
              get: () => t.active.draggable?.data,
            },
            transformers: {
              enumerable: !0,
              configurable: !0,
              get: () =>
                Object.fromEntries(
                  Object.entries(
                    t.active.draggable ? t.active.draggable.transformers : {},
                  ).filter(([y]) => y !== "addDraggable-existing-offset"),
                ),
            },
            transform: {
              enumerable: !0,
              configurable: !0,
              get: () => {
                const y = Object.values(
                  t.active.overlay ? t.active.overlay.transformers : [],
                );
                return (
                  y.sort((x, S) => x.order - S.order),
                  y.reduce((x, S) => S.callback(x), H())
                );
              },
            },
            transformed: {
              enumerable: !0,
              configurable: !0,
              get: () =>
                t.active.overlay
                  ? me(t.active.overlay.layout, t.active.overlay.transform)
                  : new pe({ x: 0, y: 0, width: 0, height: 0 }),
            },
          }),
          n("active", "overlay", T);
      },
      A = () => n("active", "overlay", null),
      $ = (s, d) => {
        z(() => {
          n("sensors", s, "coordinates", {
            origin: { ...d },
            current: { ...d },
          }),
            n("active", "sensorId", s);
        });
      },
      C = (s) => {
        const d = t.active.sensorId;
        d && n("sensors", d, "coordinates", "current", { ...s });
      },
      j = () => n("active", "sensorId", null),
      k = (s, d) => {
        const b = {};
        for (const y of Object.values(t.sensors))
          if (y)
            for (const [x, S] of Object.entries(y.activators))
              (b[x] ??= []), b[x].push({ sensor: y, activator: S });
        const T = {};
        for (const y in b) {
          let x = y;
          d && (x = `on${y}`),
            (T[x] = (S) => {
              for (const { activator: M } of b[y]) {
                if (t.active.sensor) break;
                M(S, s);
              }
            });
        }
        return T;
      },
      h = () => {
        let s = !1;
        const d = Object.values(t.draggables),
          b = Object.values(t.droppables),
          T = t.active.overlay;
        return (
          z(() => {
            const y = new WeakMap();
            for (const x of d)
              if (x) {
                const S = x.layout;
                y.has(x.node) || y.set(x.node, le(x.node));
                const M = y.get(x.node);
                he(S, M) || (n("draggables", x.id, "layout", M), (s = !0));
              }
            for (const x of b)
              if (x) {
                const S = x.layout;
                y.has(x.node) || y.set(x.node, le(x.node));
                const M = y.get(x.node);
                he(S, M) || (n("droppables", x.id, "layout", M), (s = !0));
              }
            if (T) {
              const x = T.layout,
                S = le(T.node);
              he(x, S) || (n("active", "overlay", "layout", S), (s = !0));
            }
          }),
          s
        );
      },
      I = () => {
        const s = t.active.overlay ?? t.active.draggable;
        if (s) {
          const d = r.collisionDetector(s, Object.values(t.droppables), {
              activeDroppableId: t.active.droppableId,
            }),
            b = d ? d.id : null;
          t.active.droppableId !== b && n("active", "droppableId", b);
        }
      },
      O = (s) => {
        const d = {
          id: "sensorMove",
          order: 0,
          callback: (b) =>
            t.active.sensor
              ? {
                  x: b.x + t.active.sensor.coordinates.delta.x,
                  y: b.y + t.active.sensor.coordinates.delta.y,
                }
              : b,
        };
        h(),
          z(() => {
            n("active", "draggableId", s), a("draggables", s, d);
          }),
          I();
      },
      E = () => {
        const s = L(() => t.active.draggableId);
        z(() => {
          s !== null && o("draggables", s, "sensorMove"),
            n("active", ["draggableId", "droppableId"], null);
        }),
          h();
      },
      W = (s) => {
        R(() => {
          const d = t.active.draggable;
          d && L(() => s({ draggable: d }));
        });
      },
      J = (s) => {
        R(() => {
          const d = t.active.draggable;
          if (d) {
            const b = L(() => t.active.overlay);
            Object.values(b ? b.transform : d.transform),
              L(() => s({ draggable: d, overlay: b }));
          }
        });
      },
      ue = (s) => {
        R(() => {
          const d = t.active.draggable,
            b = t.active.droppable;
          d &&
            L(() =>
              s({ draggable: d, droppable: b, overlay: t.active.overlay }),
            );
        });
      },
      q = (s) => {
        R(
          ({
            previousDraggable: d,
            previousDroppable: b,
            previousOverlay: T,
          }) => {
            const y = t.active.draggable,
              x = y ? t.active.droppable : null,
              S = y ? t.active.overlay : null;
            return (
              !y && d && L(() => s({ draggable: d, droppable: b, overlay: T })),
              { previousDraggable: y, previousDroppable: x, previousOverlay: S }
            );
          },
          {
            previousDraggable: null,
            previousDroppable: null,
            previousOverlay: null,
          },
        );
      };
    J(() => I()),
      r.onDragStart && W(r.onDragStart),
      r.onDragMove && J(r.onDragMove),
      r.onDragOver && ue(r.onDragOver),
      r.onDragEnd && q(r.onDragEnd);
    const ve = [
      t,
      {
        addTransformer: a,
        removeTransformer: o,
        addDraggable: i,
        removeDraggable: l,
        addDroppable: m,
        removeDroppable: w,
        addSensor: f,
        removeSensor: v,
        setOverlay: g,
        clearOverlay: A,
        recomputeLayouts: h,
        detectCollisions: I,
        draggableActivators: k,
        sensorStart: $,
        sensorMove: C,
        sensorEnd: j,
        dragStart: O,
        dragEnd: E,
        onDragStart: W,
        onDragMove: J,
        onDragOver: ue,
        onDragEnd: q,
      },
    ];
    return _(Ue.Provider, {
      value: ve,
      get children() {
        return r.children;
      },
    });
  },
  te = () => Re(Ue) || null,
  Dt = (e = "pointer-sensor") => {
    const [
        r,
        {
          addSensor: t,
          removeSensor: n,
          sensorStart: a,
          sensorMove: o,
          sensorEnd: i,
          dragStart: l,
          dragEnd: c,
        },
      ] = te(),
      m = 250,
      w = 10;
    ee(() => {
      t({ id: e, activators: { pointerdown: A } });
    }),
      Z(() => {
        n(e);
      });
    const u = () => r.active.sensorId === e,
      f = { x: 0, y: 0 };
    let v = null,
      g = null;
    const A = (I, O) => {
        I.button === 0 &&
          (document.addEventListener("pointermove", j),
          document.addEventListener("pointerup", k),
          (g = O),
          (f.x = I.clientX),
          (f.y = I.clientY),
          (v = window.setTimeout(C, m)));
      },
      $ = () => {
        v && (clearTimeout(v), (v = null)),
          document.removeEventListener("pointermove", j),
          document.removeEventListener("pointerup", k),
          document.removeEventListener("selectionchange", h);
      },
      C = () => {
        r.active.sensor
          ? u() || $()
          : (a(e, f),
            l(g),
            h(),
            document.addEventListener("selectionchange", h));
      },
      j = (I) => {
        const O = { x: I.clientX, y: I.clientY };
        if (!r.active.sensor) {
          const E = { x: O.x - f.x, y: O.y - f.y };
          Math.sqrt(E.x ** 2 + E.y ** 2) > w && C();
        }
        u() && (I.preventDefault(), o(O));
      },
      k = (I) => {
        $(), u() && (I.preventDefault(), c(), i());
      },
      h = () => {
        window.getSelection()?.removeAllRanges();
      };
  },
  Ye = (e) => (Dt(), U(() => e.children)),
  Ie = (e) => ({ transform: `translate3d(${e.x}px, ${e.y}px, 0)` }),
  St = (e, r = {}) => {
    const [t, { addDraggable: n, removeDraggable: a, draggableActivators: o }] =
        te(),
      [i, l] = Y(null);
    ee(() => {
      const u = i();
      u && n({ id: e, node: u, layout: le(u), data: r });
    }),
      Z(() => a(e));
    const c = () => t.active.draggableId === e,
      m = () => t.draggables[e]?.transform || H();
    return Object.defineProperties(
      (u, f) => {
        const v = f ? f() : {};
        R(() => {
          const g = i(),
            A = o(e);
          if (g) for (const $ in A) g.addEventListener($, A[$]);
          Z(() => {
            if (g) for (const $ in A) g.removeEventListener($, A[$]);
          });
        }),
          l(u),
          v.skipTransform ||
            R(() => {
              const g = m();
              if (ke(g, H())) u.style.removeProperty("transform");
              else {
                const A = Ie(m());
                u.style.setProperty("transform", A.transform ?? null);
              }
            });
      },
      {
        ref: { enumerable: !0, value: l },
        isActiveDraggable: { enumerable: !0, get: c },
        dragActivators: { enumerable: !0, get: () => o(e, !0) },
        transform: { enumerable: !0, get: m },
      },
    );
  },
  Ct = (e, r = {}) => {
    const [t, { addDroppable: n, removeDroppable: a }] = te(),
      [o, i] = Y(null);
    ee(() => {
      const w = o();
      w && n({ id: e, node: w, layout: le(w), data: r });
    }),
      Z(() => a(e));
    const l = () => t.active.droppableId === e,
      c = () => t.droppables[e]?.transform || H();
    return Object.defineProperties(
      (w, u) => {
        const f = u ? u() : {};
        i(w),
          f.skipTransform ||
            R(() => {
              const v = c();
              if (ke(v, H())) w.style.removeProperty("transform");
              else {
                const g = Ie(c());
                w.style.setProperty("transform", g.transform ?? null);
              }
            });
      },
      {
        ref: { enumerable: !0, value: i },
        isActiveDroppable: { enumerable: !0, get: l },
        transform: { enumerable: !0, get: c },
      },
    );
  },
  Ot = (e, r, t) => {
    const n = e.slice();
    return n.splice(t, 0, ...n.splice(r, 1)), n;
  },
  Ge = Le(),
  Je = (e) => {
    const [r] = te(),
      [t, n] = We({ initialIds: [], sortedIds: [] }),
      a = (l) => l >= 0 && l < t.initialIds.length;
    R(() => {
      n("initialIds", [...e.ids]), n("sortedIds", [...e.ids]);
    }),
      R(() => {
        r.active.draggableId && r.active.droppableId
          ? L(() => {
              const l = t.sortedIds.indexOf(r.active.draggableId),
                c = t.initialIds.indexOf(r.active.droppableId);
              if (!a(l) || !a(c)) n("sortedIds", [...e.ids]);
              else if (l !== c) {
                const m = Ot(t.sortedIds, l, c);
                n("sortedIds", m);
              }
            })
          : n("sortedIds", [...e.ids]);
      });
    const i = [t, {}];
    return _(Ge.Provider, {
      value: i,
      get children() {
        return e.children;
      },
    });
  },
  Tt = () => Re(Ge) || null,
  At = (e, r) => (t) => {
    e(t), r(t);
  },
  Qe = (e, r = {}) => {
    const [t, { addTransformer: n, removeTransformer: a }] = te(),
      [o] = Tt(),
      i = St(e, r),
      l = Ct(e, r),
      c = At(i.ref, l.ref),
      m = () => o.initialIds.indexOf(e),
      w = () => o.sortedIds.indexOf(e),
      u = ($) => t.droppables[$]?.layout || null,
      f = () => {
        const $ = H(),
          C = m(),
          j = w();
        if (j !== C) {
          const k = u(e),
            h = u(o.initialIds[j]);
          k && h && (($.x = h.x - k.x), ($.y = h.y - k.y));
        }
        return $;
      },
      v = {
        id: "sortableOffset",
        order: 100,
        callback: ($) => {
          const C = f();
          return { x: $.x + C.x, y: $.y + C.y };
        },
      };
    ee(() => n("droppables", e, v)), Z(() => a("droppables", e, v.id));
    const g = () =>
      (e === t.active.draggableId && !t.active.overlay
        ? t.draggables[e]?.transform
        : t.droppables[e]?.transform) || H();
    return Object.defineProperties(
      ($) => {
        i($, () => ({ skipTransform: !0 })),
          l($, () => ({ skipTransform: !0 })),
          R(() => {
            const C = g();
            if (ke(C, H())) $.style.removeProperty("transform");
            else {
              const j = Ie(g());
              $.style.setProperty("transform", j.transform ?? null);
            }
          });
      },
      {
        ref: { enumerable: !0, value: c },
        transform: { enumerable: !0, get: g },
        isActiveDraggable: { enumerable: !0, get: () => i.isActiveDraggable },
        dragActivators: { enumerable: !0, get: () => i.dragActivators },
        isActiveDroppable: { enumerable: !0, get: () => l.isActiveDroppable },
      },
    );
  };
function Ze() {
  const [
      ,
      { onDragStart: e, onDragEnd: r, addTransformer: t, removeTransformer: n },
    ] = te(),
    a = {
      id: "constrain-y-axis",
      order: 100,
      callback: (o) => ({ ...o, y: 0 }),
    };
  return (
    e(({ draggable: o }) => {
      t("draggables", o.id, a);
    }),
    r(({ draggable: o }) => {
      n("draggables", o.id, a.id);
    }),
    []
  );
}
const Et = D(
  '<div id="PersonalToolbar" class="flex h-7 w-full items-center gap-2 px-2 text-[11px]">',
);
function Pt() {
  const e = ({ draggable: t, droppable: n }) => {
      if ((t.node.classList.remove("z-20"), t && n)) {
        const a = ne(),
          o = a.findIndex((l) => l.id === t.id),
          i = a.findIndex((l) => l.id === n.id);
        if (o !== i) {
          const l = a.slice();
          l.splice(i, 0, ...l.splice(o, 1)), nt(l);
        }
      }
    },
    r = ({ draggable: t }) => t.node.classList.add("z-20");
  return _(oe, {
    get when() {
      return xe();
    },
    get children() {
      const t = Et();
      return (
        (t.$$contextmenu = (n) => {
          n.data || (n.data = []),
            n.data.push(
              new B({
                text: "Hide bookmarks",
                onClick: () => {
                  Ne(!1);
                },
              }),
            );
        }),
        p(
          t,
          _(Xe, {
            onDragEnd: e,
            onDragStart: r,
            collisionDetector: qe,
            get children() {
              return [
                _(Ze, {}),
                _(Ye, {}),
                _(Je, {
                  get ids() {
                    return ne().map((n) => n.id);
                  },
                  get children() {
                    return _(ae, {
                      get each() {
                        return ne();
                      },
                      children: (n) => {
                        const a = Qe(n.id);
                        return _(wt, { sortable: a, bookmark: n });
                      },
                    });
                  },
                }),
              ];
            },
          }),
        ),
        t
      );
    },
  });
}
G(["contextmenu"]);
const Mt = D("<div>"),
  jt = D(
    '<div class="flex h-full w-full items-center justify-center"><div class="top-50 left-50 relative min-w-[408px] flex-none rounded-lg bg-[#42414d] px-3 py-4 text-[#fbfbfe]"><div class="mb-2 select-none font-semibold"><i class="fa-light fa-globe mr-2"></i><span></span></div><div class="flex justify-end">',
  ),
  Rt = D('<p class="">'),
  Lt = D("<button>");
function Nt() {
  return (() => {
    const e = Mt();
    return (
      p(
        e,
        _(ae, {
          get each() {
            return Te();
          },
          children: (r) =>
            _(oe, {
              get when() {
                return r.linkedTab === P();
              },
              get children() {
                const t = jt(),
                  n = t.firstChild,
                  a = n.firstChild,
                  o = a.firstChild,
                  i = o.nextSibling,
                  l = a.nextSibling;
                return (
                  p(
                    i,
                    () =>
                      r.linkedTab
                        .url()
                        .replace(/^https?:\/\/.*?\/(.*)$/, (c, m) =>
                          c.replace(m, ""),
                        ) || "about:newTab",
                  ),
                  p(
                    n,
                    _(ae, {
                      get each() {
                        return r.components.filter((c) => c.type === "text");
                      },
                      children: (c) =>
                        (() => {
                          const m = Rt();
                          return p(m, () => c.content), m;
                        })(),
                    }),
                    l,
                  ),
                  p(
                    l,
                    _(ae, {
                      get each() {
                        return r.components.filter((c) => c.type === "button");
                      },
                      children: (c) =>
                        (() => {
                          const m = Lt();
                          return (
                            (m.$$click = () => {
                              r.close(), r.emit(c.id);
                            }),
                            p(m, () => c.text),
                            V(() =>
                              F(
                                m,
                                `m-1 rounded  px-[15px] py-[7px] font-semibold focus:outline focus:outline-[1.6px] focus:outline-offset-2 focus:outline-[#00ddff] ${
                                  c.style === 0
                                    ? "bg-[#00ddff] text-[#2b2a33]"
                                    : "bg-[rgba(251,251,254,0.07)]"
                                }`,
                              ),
                            ),
                            m
                          );
                        })(),
                    }),
                  ),
                  t
                );
              },
            }),
        }),
      ),
      V(() =>
        F(
          e,
          `absolute left-0 top-0 z-20 h-full w-full bg-[rgba(28,27,34,0.45)] text-[12px] ${
            Te().filter((r) => r.linkedTab === P()).length ? "" : "hidden"
          }`,
        ),
      ),
      e
    );
  })();
}
G(["click"]);
const Bt = D(
    '<div class="h-4 w-4 overflow-hidden"><div id="tab-throbber" class="h-4 w-[960px]">',
  ),
  Ht = D("<div>"),
  Vt = D('<i class="fa-regular fa-volume mt-[2px] text-[10px]">'),
  zt = D(
    '<div id="tab-background"><div class="h-4 w-4"></div><div><p class="w-full text-clip whitespace-nowrap text-xs font-light" style="-webkit-mask-image:linear-gradient(90deg, #000 0%, #000 calc(100% - 24px), transparent);mask-image:linear-gradient(90deg, #000 0%, #000 calc(100% - 24px), transparent);"></p></div><div><i class="fa-light fa-xmark mt-[2px] text-[10px]">',
  );
function Ft(e) {
  const { sortable: r } = e;
  return (() => {
    const t = zt(),
      n = t.firstChild,
      a = n.nextSibling,
      o = a.firstChild,
      i = a.nextSibling;
    return (
      (t.$$contextmenu = (l) => {
        l.data = [
          new B({
            text: "New tab",
            onClick: () => {
              new K("about:newTab", !0);
            },
          }),
          new B({ separator: !0 }),
          new B({
            text: "Reload",
            onClick: () => {
              e.tab.reload();
            },
          }),
          new B({
            text: "Duplicate",
            onClick: () => {
              new K(e.tab.url(), !0);
            },
          }),
          new B({ separator: !0 }),
          new B({
            text: "Close",
            onClick: () => {
              e.tab.close();
            },
          }),
        ];
      }),
      (t.$$mousedown = (l) => {
        l.button === 0 && (e.tab.focus = !0);
      }),
      $e(r, t, () => !0),
      p(
        n,
        _(oe, {
          get when() {
            return e.tab.loading();
          },
          get children() {
            return Bt();
          },
        }),
        null,
      ),
      p(
        n,
        _(oe, {
          get when() {
            return !e.tab.loading();
          },
          get children() {
            const l = Ht();
            return (
              p(
                l,
                _(He, {
                  get src() {
                    return e.tab.icon;
                  },
                }),
              ),
              V(() =>
                F(
                  l,
                  `h-full w-full ${
                    e.tab.small() && e.tab.focus() ? "hidden" : ""
                  }`,
                ),
              ),
              l
            );
          },
        }),
        null,
      ),
      p(
        t,
        _(oe, {
          get when() {
            return e.tab.playing();
          },
          get children() {
            return Vt();
          },
        }),
        a,
      ),
      p(o, () => e.tab.title()),
      (i.$$mousedown = (l) => l.stopPropagation()),
      at(i, "click", e.tab.close.bind(e.tab), !0),
      V(
        (l) => {
          const c = `h-9 ${
              e.tab.pinned() || e.tab.small() ? "" : "w-48"
            } shadow-inner-lg  flex items-center gap-[5px] overflow-hidden rounded p-2 pr-1 text-sm`,
            m = e.tab.focus(),
            w = `flex-1 overflow-hidden ${
              e.tab.small() || e.tab.pinned() ? "hidden" : ""
            }`,
            u = `close-icon flex h-6 w-6 items-center justify-center rounded hover:bg-opacity-50 ${
              (e.tab.small() && !e.tab.focus()) || e.tab.pinned()
                ? "hidden"
                : ""
            }`;
          return (
            c !== l._v$ && F(t, (l._v$ = c)),
            m !== l._v$2 && se(t, "data-active", (l._v$2 = m)),
            w !== l._v$3 && F(a, (l._v$3 = w)),
            u !== l._v$4 && F(i, (l._v$4 = u)),
            l
          );
        },
        { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 },
      ),
      t
    );
  })();
}
G(["mousedown", "contextmenu", "click"]);
const Kt = D(
  '<div class="flex" id="tabs" style="width:env(titlebar-area-width, 100%);min-height:env(titlebar-area-height, auto);margin-left:env(titlebar-area-x, 0);"><div class="flex h-11 w-full cursor-default select-none items-center gap-1 overflow-hidden px-[2px]"><div class="flex items-center justify-center" id="opentab"><div class="toolbarbutton-1 flex h-9 w-9 items-center justify-center rounded"><i class="fa-regular fa-plus mt-[2px] text-xs">',
);
function Wt() {
  const e = ({ draggable: n, droppable: a }) => {
      if ((n.node.classList.remove("z-20"), n && a)) {
        const o = fe(),
          i = o.findIndex((c) => c.id === n.id),
          l = o.findIndex((c) => c.id === a.id);
        if (i !== l) {
          const c = o.slice();
          c.splice(l, 0, ...c.splice(i, 1)), st(c);
        }
      }
    },
    r = ({ draggable: n }) => n.node.classList.add("z-20");
  ee(async () => {
    await de(
      () => import("./registerProtocols-cf7182ec.js"),
      [
        "assets/registerProtocols-cf7182ec.js",
        "assets/index-37963400.js",
        "assets/index-1fe75362.js",
        "assets/index-245ee21e.css",
        "assets/url-4d36b2c8.js",
      ],
    );
    const a = new URLSearchParams(window.location.search).get("url"),
      o = JSON.parse(localStorage.getItem("tabs") || "[]");
    if (a) new K(a, !0), window.history.replaceState({}, document.title, "/");
    else if (o.length && Be()["general.startup.openPreviousTabs"]) {
      const i = parseInt(localStorage.getItem("activeTab") || "0");
      o.forEach((c) => {
        new K(c, !1);
      });
      const l = Array.from(ot())[i];
      l && (l.focus = !0);
    } else new K("about:newTab", !0);
  });
  function t() {
    new K("about:newTab", !0);
  }
  return (() => {
    const n = Kt(),
      a = n.firstChild,
      o = a.firstChild,
      i = o.firstChild;
    return (
      p(
        a,
        _(Xe, {
          onDragEnd: e,
          onDragStart: r,
          collisionDetector: qe,
          get children() {
            return [
              _(Ze, {}),
              _(Ye, {}),
              _(Je, {
                get ids() {
                  return fe().map((l) => l.id);
                },
                get children() {
                  return _(ae, {
                    get each() {
                      return fe();
                    },
                    children: (l) => {
                      const c = Qe(l.id);
                      return _(Ft, { sortable: c, tab: l });
                    },
                  });
                },
              }),
            ];
          },
        }),
        o,
      ),
      (i.$$click = t),
      n
    );
  })();
}
G(["click"]);
const qt = D('<div><div class="flex grow flex-row items-center"></div><div>'),
  Ut = D('<i class="fa-light fa-chevron-right">'),
  Xt = D('<hr class="my-1">'),
  Yt = D('<div class="appmenu-separator-title my-1 select-none px-2 text-xs">'),
  Gt = D("<div>"),
  Jt = D(
    '<div class="relative bottom-0.5 flex h-10 cursor-default select-none flex-row items-center justify-center"><div class="absolute left-0 flex h-full w-8 items-center"><div class="popup-button flex h-8 w-8 items-center justify-center rounded"><i class="fa-light fa-chevron-left"></i></div></div><div class="flex h-full flex-row items-center"><div class="flex h-full flex-row items-center justify-center font-bold"></div></div> ',
  ),
  Qt = D(
    '<div class="popup absolute right-0.5 top-9 z-30 grid w-72 grid-cols-[1fr] rounded-lg border px-2 py-2 text-[0.9rem]">',
  ),
  Zt = D('<div class="fixed left-0 top-0 h-full w-full">');
function er(e) {
  let r = Y(null),
    t = [],
    n = (f, v, g, A = () => {}, $ = "") =>
      (() => {
        const C = qt(),
          j = C.firstChild,
          k = j.nextSibling;
        return (
          (C.$$click = (h) => {
            f && (A(h) ?? !0) && w();
          }),
          F(
            C,
            `popup-button flex h-8 w-full cursor-default select-none flex-row items-center rounded px-2 pt-[0.15rem] text-[12px] ${$}`,
          ),
          se(C, "data-disabled", !f),
          p(j, v),
          p(k, g),
          C
        );
      })(),
    a = Object.fromEntries(e.map((f) => [f, Y(null)])),
    o = (f, v, g) => n(f, v, Ut(), () => (t.push(g), r[1](g), !1)),
    i = (f, v, g) =>
      n(f, v, Velocity.getKeybind(g)?.toString(), () => {
        w(), Velocity.getKeybind(g)?.callback();
      }),
    l = (f = null) => [
      Xt(),
      f !== null
        ? (() => {
            const v = Yt();
            return p(v, f), v;
          })()
        : [],
    ],
    c = (f, ...v) =>
      (() => {
        const g = Gt();
        return (
          p(g, v),
          V(() =>
            F(
              g,
              `col-start-1 row-start-1 flex h-full w-full flex-col ${
                r[0]() === f ? "" : "hidden"
              }`,
            ),
          ),
          g
        );
      })(),
    m = (f) => [
      (() => {
        const v = Jt(),
          g = v.firstChild,
          A = g.firstChild,
          $ = g.nextSibling,
          C = $.firstChild;
        return (
          (A.$$click = () => {
            t.pop(), r[1](t[t.length - 1]);
          }),
          p(C, f),
          v
        );
      })(),
      U(l),
    ];
  function w() {
    r[1](null), (t = ["main"]);
  }
  let u = (() => {
    const f = Qt();
    return p(f, () => Object.values(a).map((v) => v[0]())), f;
  })();
  return {
    container: u,
    element: U(
      (() => {
        const f = U(() => r[0]() !== null);
        return () =>
          f()
            ? [
                (() => {
                  const v = Zt();
                  return (v.$$pointerdown = () => w()), v;
                })(),
                u,
              ]
            : null;
      })(),
    ),
    close: w,
    current: r,
    stack: t,
    submenus: a,
    Menu: c,
    MenuItem: n,
    KeybindMenuItem: i,
    SubmenuMenuItem: o,
    MenuSeparator: l,
    SubmenuHeader: m,
  };
}
G(["click", "pointerdown"]);
const Ee = D('<div class="grow"><div class="h-full w-full">'),
  Pe = D('<div class="mb-0.5 mr-2 flex h-4 w-4 flex-row items-center"><img>'),
  Me = D("<div>"),
  tr = D(
    '<div class="flex h-10 w-full items-center gap-2 p-2" id="browser-toolbar"><div class="flex items-center gap-1"><div class="toolbarbutton-1 flex h-8 w-8 items-center justify-center rounded"><i class="fa-light fa-arrow-left mt-[2px]"></i></div><div class="toolbarbutton-1 flex h-8 w-8 items-center justify-center rounded"><i class="fa-light fa-arrow-right mt-[2px]"></i></div><div class="toolbarbutton-1 flex h-8 w-8 items-center justify-center rounded"><i></i></div></div><div class="flex h-[32px] flex-1 items-center rounded text-sm" id="urlbar"><div class="mx-[2px] flex h-8 w-8 items-center justify-center rounded"><i class="fa-light fa-magnifying-glass mt-[2px]"></i></div><input id="url_bar" autocomplete="off" class="flex h-full flex-1 items-center rounded bg-transparent text-sm leading-8 focus:outline-none"></div><div class="flex items-center gap-1"><a target="_blank" aria-label="View source code on GitHub." href="https://github.com/cohenerickson/Velocity" class="cursor-default"><div class="toolbarbutton-1 flex h-8 w-8 items-center justify-center rounded"><i class="fa-brands fa-github mt-[2px] text-sm"></i></div></a><div class="toolbarbutton-1 relative flex h-8 w-8 items-center justify-center rounded"><i class="fa-light fa-bars mt-[2px] text-sm">',
  );
function rr() {
  function e() {
    P()?.loading() ? P()?.stop() : ((P().search = !1), P()?.reload());
  }
  function r() {
    (P().search = !1), P()?.goForward();
  }
  function t() {
    (P().search = !1), P()?.goBack();
  }
  function n(k) {
    k.addEventListener("keydown", (h) => {
      h.key === "Enter"
        ? (h.preventDefault(),
          k.value && (P()?.navigate(k.value), (P().search = !1), k.blur()))
        : h.key === "Escape"
        ? ((P().search = !1), k.blur())
        : setTimeout(() => (P().search = k.value), 0);
    });
  }
  let {
    element: a,
    container: o,
    close: i,
    current: l,
    stack: c,
    submenus: m,
    Menu: w,
    MenuItem: u,
    KeybindMenuItem: f,
    SubmenuMenuItem: v,
    MenuSeparator: g,
    SubmenuHeader: A,
  } = er([
    "main",
    "bookmarks",
    "history",
    "tools",
    "help",
    "recentTabs",
    "recentWindows",
  ]);
  R(() => {
    m.main[1](
      w(
        "main",
        f(!0, "New tab", { alias: "new_tab" }),
        f(!1, "New window", { alias: "new_window" }),
        g(),
        v(!0, "Bookmarks", "bookmarks"),
        v(!0, "History", "history"),
        f(!1, "Downloads", { alias: "open_downloads" }),
        u(!1, "Passwords", null, () => {}),
        f(!1, "Add-ons and themes", { alias: "open_addons" }),
        g(),
        f(!1, "Print...", { alias: "print_page" }),
        f(!1, "Save page as...", { alias: "save_page" }),
        f(!1, "Find in page...", { alias: "search_page" }),
        u(!1, "Zoom", null, () => {}),
        g(),
        u(!0, "Settings", null, () => new K("about:preferences", !0)),
        v(!0, "More tools", "tools"),
        v(!1, "Help", "help"),
        g(),
        u(!1, "Quit", null, () => {}),
      ),
    );
  }),
    R(() => {
      m.bookmarks[1](
        w(
          "bookmarks",
          A("Bookmarks"),
          (() => {
            const k = Ee(),
              h = k.firstChild;
            return (
              p(
                h,
                () => f(!0, "Bookmark current tab", { alias: "bookmark_tab" }),
                null,
              ),
              p(h, () => u(!1, "Search bookmarks", null, () => {}), null),
              p(
                h,
                () =>
                  u(
                    !0,
                    U(() =>
                      xe()
                        ? "Hide bookmarks toolbar"
                        : "Show bookmarks toolbar",
                    ),
                    null,
                    () => {
                      Ne(!xe());
                    },
                  ),
                null,
              ),
              p(h, () => g("Recent Bookmarks"), null),
              p(
                h,
                (() => {
                  const I = U(() => ne().length > 0);
                  return () =>
                    I()
                      ? ne().map((O) =>
                          u(
                            !0,
                            [
                              (() => {
                                const E = Pe(),
                                  W = E.firstChild;
                                return V(() => se(W, "src", O.icon)), E;
                              })(),
                              (() => {
                                const E = Me();
                                return p(E, () => O.title), E;
                              })(),
                            ],
                            null,
                            () => new window.parent.Velocity.Tab(O.url, !0),
                          ),
                        )
                      : u(!1, "(Empty)", null, () => {}, "pointer-events-none");
                })(),
                null,
              ),
              k
            );
          })(),
          g(),
          u(!0, "Manage Bookmarks", null, () => new K("about:bookmarks", !0)),
        ),
      );
    });
  const $ = 864e5,
    C = 10;
  let j = Y([]);
  return (
    R(() => {
      l[0]() === "history" &&
        ut.history.get().then((k) => {
          let h = Date.now();
          j[1](
            k
              .filter((I) => Math.abs(h - I.timestamp) <= $)
              .sort((I, O) => O.timestamp - I.timestamp)
              .slice(0, C),
          );
        }),
        m.history[1](
          w(
            "history",
            A("History"),
            (() => {
              const k = Ee(),
                h = k.firstChild;
              return (
                p(h, () => v(!1, "Recently closed tabs", "recentTabs"), null),
                p(
                  h,
                  () => v(!1, "Recently closed windows", "recentWindows"),
                  null,
                ),
                p(
                  h,
                  () => u(!1, "Restore previous session", null, () => {}),
                  null,
                ),
                p(h, g, null),
                p(h, () => u(!1, "Clear Recent History", null, () => {}), null),
                p(h, () => g("Recent History"), null),
                p(
                  h,
                  (() => {
                    const I = U(() => j[0]().length > 0);
                    return () =>
                      I()
                        ? j[0]().map((O) =>
                            u(
                              !0,
                              [
                                (() => {
                                  const E = Pe(),
                                    W = E.firstChild;
                                  return V(() => se(W, "src", O.favicon)), E;
                                })(),
                                (() => {
                                  const E = Me();
                                  return p(E, () => O.title), E;
                                })(),
                              ],
                              null,
                              () => new window.parent.Velocity.Tab(O.url, !0),
                            ),
                          )
                        : u(
                            !1,
                            "(Empty)",
                            null,
                            () => {},
                            "pointer-events-none",
                          );
                  })(),
                  null,
                ),
                k
              );
            })(),
            g(),
            u(!0, "Manage History", null, () => new K("about:history", !0)),
          ),
        );
    }),
    R(() => {
      m.tools[1](
        w(
          "tools",
          A("More Tools"),
          u(!1, "Customize toolbar...", null, () => {}),
          g("Browser tools"),
          f(!0, "Web Developer Tools", { alias: "open_devtools" }),
          u(!1, "Task Manager", null, () => {}),
          u(!1, "Remote Debugging", null, () => {}),
          u(!1, "Browser Console", null, () => {}),
          u(!1, "Responsive Debugging", null, () => {}),
          u(!1, "Eyedropper", null, () => {}),
          f(!0, "Page Source", { alias: "view_source" }),
          u(!1, "Extensions for developers", null, () => {}),
        ),
      );
    }),
    (() => {
      const k = tr(),
        h = k.firstChild,
        I = h.firstChild,
        O = I.nextSibling,
        E = O.nextSibling,
        W = E.firstChild,
        J = h.nextSibling,
        ue = J.firstChild,
        q = ue.nextSibling,
        De = J.nextSibling,
        ve = De.firstChild,
        s = ve.nextSibling;
      s.firstChild, (I.$$click = t), (O.$$click = r), (E.$$click = e);
      const d = n;
      return (
        typeof d == "function" ? $e(d, q) : (n = q),
        (s.$$click = (b) => {
          o.contains(b.target) ||
            (l[1]((T) => (T === null ? "main" : null)), c.push("main"));
        }),
        p(s, a, null),
        V(
          (b) => {
            const T = `fa-light ${
                P()?.loading() ? "fa-xmark" : "fa-rotate-right"
              } mt-[2px]`,
              y = `Search with ${
                lt[Be()["search.defaults.searchEngine"] || "google"].name
              } or enter address`;
            return (
              T !== b._v$ && F(W, (b._v$ = T)),
              y !== b._v$2 && se(q, "placeholder", (b._v$2 = y)),
              b
            );
          },
          { _v$: void 0, _v$2: void 0 },
        ),
        V(
          () =>
            (q.value =
              P()?.search() !== !1 ? P()?.search() : gt(P()?.url() || "")),
        ),
        k
      );
    })()
  );
}
G(["click"]);
const nr = D(
  '<main class="flex h-full flex-col overflow-hidden"><div id="navigator-toolbox-background"><div id="navigator-toolbox"></div></div><main id="content" class="relative w-full flex-1 bg-white">',
);
function ir() {
  return (
    ee(async () => {
        await de(
          () => import("./registerKeybinds-f3c15b5f.js"),
          [
            "assets/registerKeybinds-f3c15b5f.js",
            "assets/index-1fe75362.js",
            "assets/index-245ee21e.css",
            "assets/index-37963400.js",
            "assets/url-4d36b2c8.js",
          ],
        ),
        await de(
          () => import("./addonStoreModifier-53a0594b.js"),
          [
            "assets/addonStoreModifier-53a0594b.js",
            "assets/index-37963400.js",
            "assets/index-1fe75362.js",
            "assets/index-245ee21e.css",
            "assets/url-4d36b2c8.js",
          ],
        ),
        await de(
          () => import("./index-37963400.js").then((e) => e.i),
          [
            "assets/index-37963400.js",
            "assets/index-1fe75362.js",
            "assets/index-245ee21e.css",
            "assets/url-4d36b2c8.js",
          ],
        ),
        window.addEventListener("keydown", dt),
        addEventListener(
          "beforeunload",
          (e) => {
            const r = JSON.parse(localStorage.getItem("preferences") || "{}");
            if (fe().length > 1 && r["general.tabs.confirmBeforeClosing"])
              return (
                e.preventDefault(),
                (e.returnValue = "Confirm before closing multiple tabs")
              );
          },
          { capture: !0 },
        );
    }),
    (() => {
      const e = nr(),
        r = e.firstChild,
        t = r.firstChild,
        n = r.nextSibling;
      return (
        p(e, _(it, { children: "Velocity" }), r),
        p(t, _(Wt, {}), null),
        p(t, _(rr, {}), null),
        p(t, _(Pt, {}), null),
        p(e, _(ft, {}), n),
        p(n, _(Nt, {})),
        e
      );
    })()
  );
}
export { ir as default };
