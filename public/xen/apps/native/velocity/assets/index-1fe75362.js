(function () {
  const a = document.createElement("link").relList;
  if (a && a.supports && a.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === "childList")
        for (const t of o.addedNodes)
          t.tagName === "LINK" && t.rel === "modulepreload" && i(t);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function i(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = n(s);
    fetch(s.href, o);
  }
})();
const S = { context: void 0, registry: void 0 };
function ye(e) {
  S.context = e;
}
const Wi = (e, a) => e === a,
  ga = Symbol("solid-proxy"),
  Ki = Symbol("solid-track"),
  wa = { equals: Wi };
let Qe = null,
  Hn = Qn;
const de = 1,
  aa = 2,
  Vn = { owned: null, cleanups: null, context: null, owner: null },
  La = {};
var U = null;
let w = null,
  B = null,
  se = null,
  X = null,
  Fa = 0;
const [nr, yn] = P(!1);
function Ve(e, a) {
  const n = B,
    i = U,
    s = e.length === 0,
    o = s
      ? Vn
      : {
          owned: null,
          cleanups: null,
          context: null,
          owner: a === void 0 ? i : a,
        },
    t = s ? e : () => e(() => Q(() => Me(o)));
  (U = o), (B = null);
  try {
    return le(t, !0);
  } finally {
    (B = n), (U = i);
  }
}
function P(e, a) {
  a = a ? Object.assign({}, wa, a) : wa;
  const n = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: a.equals || void 0,
    },
    i = (s) => (
      typeof s == "function" &&
        (w && w.running && w.sources.has(n)
          ? (s = s(n.tValue))
          : (s = s(n.value))),
      Yn(n, s)
    );
  return [Xn.bind(n), i];
}
function kn(e, a, n) {
  const i = oa(e, a, !0, de);
  Ye(i);
}
function Ee(e, a, n) {
  const i = oa(e, a, !1, de);
  Ye(i);
}
function Wn(e, a, n) {
  Hn = ns;
  const i = oa(e, a, !1, de),
    s = qe && ra(U, qe.id);
  s && (i.suspense = s),
    (!n || !n.render) && (i.user = !0),
    X ? X.push(i) : Ye(i);
}
function N(e, a, n) {
  n = n ? Object.assign({}, wa, n) : wa;
  const i = oa(e, a, !0, 0);
  return (
    (i.observers = null),
    (i.observerSlots = null),
    (i.comparator = n.equals || void 0),
    Ye(i),
    Xn.bind(i)
  );
}
function Gi(e, a, n) {
  let i, s, o;
  (arguments.length === 2 && typeof a == "object") || arguments.length === 1
    ? ((i = !0), (s = e), (o = a || {}))
    : ((i = e), (s = a), (o = n || {}));
  let t = null,
    r = La,
    p = null,
    f = !1,
    m = !1,
    x = "initialValue" in o,
    v = typeof i == "function" && N(i);
  const y = new Set(),
    [j, E] = (o.storage || P)(o.initialValue),
    [T, F] = P(void 0),
    [M, q] = P(void 0, { equals: !1 }),
    [D, _] = P(x ? "ready" : "unresolved");
  if (S.context) {
    p = `${S.context.id}${S.context.count++}`;
    let A;
    o.ssrLoadFrom === "initial"
      ? (r = o.initialValue)
      : S.load && (A = S.load(p)) && (r = A[0]);
  }
  function pe(A, z, O, te) {
    return (
      t === A &&
        ((t = null),
        te !== void 0 && (x = !0),
        (A === r || z === r) &&
          o.onHydrated &&
          queueMicrotask(() => o.onHydrated(te, { value: z })),
        (r = La),
        w && A && f
          ? (w.promises.delete(A),
            (f = !1),
            le(() => {
              (w.running = !0), Se(z, O);
            }, !1))
          : Se(z, O)),
      z
    );
  }
  function Se(A, z) {
    le(() => {
      z === void 0 && E(() => A),
        _(z !== void 0 ? "errored" : x ? "ready" : "unresolved"),
        F(z);
      for (const O of y.keys()) O.decrement();
      y.clear();
    }, !1);
  }
  function ze() {
    const A = qe && ra(U, qe.id),
      z = j(),
      O = T();
    if (O !== void 0 && !t) throw O;
    return (
      B &&
        !B.user &&
        A &&
        kn(() => {
          M(),
            t &&
              (A.resolved && w && f
                ? w.promises.add(t)
                : y.has(A) || (A.increment(), y.add(A)));
        }),
      z
    );
  }
  function R(A = !0) {
    if (A !== !1 && m) return;
    m = !1;
    const z = v ? v() : i;
    if (((f = w && w.running), z == null || z === !1)) {
      pe(t, Q(j));
      return;
    }
    w && t && w.promises.delete(t);
    const O = r !== La ? r : Q(() => s(z, { value: j(), refetching: A }));
    return typeof O != "object" || !(O && "then" in O)
      ? (pe(t, O, void 0, z), O)
      : ((t = O),
        (m = !0),
        queueMicrotask(() => (m = !1)),
        le(() => {
          _(x ? "refreshing" : "pending"), q();
        }, !1),
        O.then(
          (te) => pe(O, te, void 0, z),
          (te) => pe(O, void 0, ai(te), z),
        ));
  }
  return (
    Object.defineProperties(ze, {
      state: { get: () => D() },
      error: { get: () => T() },
      loading: {
        get() {
          const A = D();
          return A === "pending" || A === "refreshing";
        },
      },
      latest: {
        get() {
          if (!x) return ze();
          const A = T();
          if (A && !t) throw A;
          return j();
        },
      },
    }),
    v ? kn(() => R(!1)) : R(!1),
    [ze, { refetch: R, mutate: E }]
  );
}
function ir(e) {
  return le(e, !1);
}
function Q(e) {
  if (B === null) return e();
  const a = B;
  B = null;
  try {
    return e();
  } finally {
    B = a;
  }
}
function Kn(e, a, n) {
  const i = Array.isArray(e);
  let s,
    o = n && n.defer;
  return (t) => {
    let r;
    if (i) {
      r = Array(e.length);
      for (let f = 0; f < e.length; f++) r[f] = e[f]();
    } else r = e();
    if (o) {
      o = !1;
      return;
    }
    const p = Q(() => a(r, s, t));
    return (s = r), p;
  };
}
function Ji(e) {
  Wn(() => Q(e));
}
function Je(e) {
  return (
    U === null ||
      (U.cleanups === null ? (U.cleanups = [e]) : U.cleanups.push(e)),
    e
  );
}
function Xi(e, a) {
  Qe || (Qe = Symbol("error")),
    (U = oa(void 0, void 0, !0)),
    (U.context = { [Qe]: [a] }),
    w && w.running && w.sources.add(U);
  try {
    return e();
  } catch (n) {
    ta(n);
  } finally {
    U = U.owner;
  }
}
function sr() {
  return B;
}
function Gn() {
  return U;
}
function Yi(e, a) {
  const n = U,
    i = B;
  (U = e), (B = null);
  try {
    return le(a, !0);
  } catch (s) {
    ta(s);
  } finally {
    (U = n), (B = i);
  }
}
function Qi(e) {
  if (w && w.running) return e(), w.done;
  const a = B,
    n = U;
  return Promise.resolve().then(() => {
    (B = a), (U = n);
    let i;
    return (
      qe &&
        ((i =
          w ||
          (w = {
            sources: new Set(),
            effects: [],
            promises: new Set(),
            disposed: new Set(),
            queue: new Set(),
            running: !0,
          })),
        i.done || (i.done = new Promise((s) => (i.resolve = s))),
        (i.running = !0)),
      le(e, !1),
      (B = U = null),
      i ? i.done : void 0
    );
  });
}
function Zi(e) {
  X.push.apply(X, e), (e.length = 0);
}
function Xe(e, a) {
  const n = Symbol("context");
  return { id: n, Provider: is(n), defaultValue: e };
}
function Pe(e) {
  let a;
  return (a = ra(U, e.id)) !== void 0 ? a : e.defaultValue;
}
function Jn(e) {
  const a = N(e),
    n = N(() => Wa(a()));
  return (
    (n.toArray = () => {
      const i = n();
      return Array.isArray(i) ? i : i != null ? [i] : [];
    }),
    n
  );
}
let qe;
function es() {
  return qe || (qe = Xe({}));
}
function Xn() {
  const e = w && w.running;
  if (this.sources && (e ? this.tState : this.state))
    if ((e ? this.tState : this.state) === de) Ye(this);
    else {
      const a = se;
      (se = null), le(() => ka(this), !1), (se = a);
    }
  if (B) {
    const a = this.observers ? this.observers.length : 0;
    B.sources
      ? (B.sources.push(this), B.sourceSlots.push(a))
      : ((B.sources = [this]), (B.sourceSlots = [a])),
      this.observers
        ? (this.observers.push(B),
          this.observerSlots.push(B.sources.length - 1))
        : ((this.observers = [B]),
          (this.observerSlots = [B.sources.length - 1]));
  }
  return e && w.sources.has(this) ? this.tValue : this.value;
}
function Yn(e, a, n) {
  let i = w && w.running && w.sources.has(e) ? e.tValue : e.value;
  if (!e.comparator || !e.comparator(i, a)) {
    if (w) {
      const s = w.running;
      (s || (!n && w.sources.has(e))) && (w.sources.add(e), (e.tValue = a)),
        s || (e.value = a);
    } else e.value = a;
    e.observers &&
      e.observers.length &&
      le(() => {
        for (let s = 0; s < e.observers.length; s += 1) {
          const o = e.observers[s],
            t = w && w.running;
          (t && w.disposed.has(o)) ||
            ((t ? !o.tState : !o.state) &&
              (o.pure ? se.push(o) : X.push(o), o.observers && Zn(o)),
            t ? (o.tState = de) : (o.state = de));
        }
        if (se.length > 1e6) throw ((se = []), new Error());
      }, !1);
  }
  return a;
}
function Ye(e) {
  if (!e.fn) return;
  Me(e);
  const a = U,
    n = B,
    i = Fa;
  (B = U = e),
    jn(e, w && w.running && w.sources.has(e) ? e.tValue : e.value, i),
    w &&
      !w.running &&
      w.sources.has(e) &&
      queueMicrotask(() => {
        le(() => {
          w && (w.running = !0),
            (B = U = e),
            jn(e, e.tValue, i),
            (B = U = null);
        }, !1);
      }),
    (B = n),
    (U = a);
}
function jn(e, a, n) {
  let i;
  try {
    i = e.fn(a);
  } catch (s) {
    return (
      e.pure &&
        (w && w.running
          ? ((e.tState = de),
            e.tOwned && e.tOwned.forEach(Me),
            (e.tOwned = void 0))
          : ((e.state = de), e.owned && e.owned.forEach(Me), (e.owned = null))),
      (e.updatedAt = n + 1),
      ta(s)
    );
  }
  (!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && "observers" in e
      ? Yn(e, i, !0)
      : w && w.running && e.pure
      ? (w.sources.add(e), (e.tValue = i))
      : (e.value = i),
    (e.updatedAt = n));
}
function oa(e, a, n, i = de, s) {
  const o = {
    fn: e,
    state: i,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: a,
    owner: U,
    context: null,
    pure: n,
  };
  return (
    w && w.running && ((o.state = 0), (o.tState = i)),
    U === null ||
      (U !== Vn &&
        (w && w.running && U.pure
          ? U.tOwned
            ? U.tOwned.push(o)
            : (U.tOwned = [o])
          : U.owned
          ? U.owned.push(o)
          : (U.owned = [o]))),
    o
  );
}
function ya(e) {
  const a = w && w.running;
  if ((a ? e.tState : e.state) === 0) return;
  if ((a ? e.tState : e.state) === aa) return ka(e);
  if (e.suspense && Q(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Fa); ) {
    if (a && w.disposed.has(e)) return;
    (a ? e.tState : e.state) && n.push(e);
  }
  for (let i = n.length - 1; i >= 0; i--) {
    if (((e = n[i]), a)) {
      let s = e,
        o = n[i + 1];
      for (; (s = s.owner) && s !== o; ) if (w.disposed.has(s)) return;
    }
    if ((a ? e.tState : e.state) === de) Ye(e);
    else if ((a ? e.tState : e.state) === aa) {
      const s = se;
      (se = null), le(() => ka(e, n[0]), !1), (se = s);
    }
  }
}
function le(e, a) {
  if (se) return e();
  let n = !1;
  a || (se = []), X ? (n = !0) : (X = []), Fa++;
  try {
    const i = e();
    return as(n), i;
  } catch (i) {
    n || (X = null), (se = null), ta(i);
  }
}
function as(e) {
  if ((se && (Qn(se), (se = null)), e)) return;
  let a;
  if (w) {
    if (!w.promises.size && !w.queue.size) {
      const i = w.sources,
        s = w.disposed;
      X.push.apply(X, w.effects), (a = w.resolve);
      for (const o of X) "tState" in o && (o.state = o.tState), delete o.tState;
      (w = null),
        le(() => {
          for (const o of s) Me(o);
          for (const o of i) {
            if (((o.value = o.tValue), o.owned))
              for (let t = 0, r = o.owned.length; t < r; t++) Me(o.owned[t]);
            o.tOwned && (o.owned = o.tOwned),
              delete o.tValue,
              delete o.tOwned,
              (o.tState = 0);
          }
          yn(!1);
        }, !1);
    } else if (w.running) {
      (w.running = !1), w.effects.push.apply(w.effects, X), (X = null), yn(!0);
      return;
    }
  }
  const n = X;
  (X = null), n.length && le(() => Hn(n), !1), a && a();
}
function Qn(e) {
  for (let a = 0; a < e.length; a++) ya(e[a]);
}
function ns(e) {
  let a,
    n = 0;
  for (a = 0; a < e.length; a++) {
    const i = e[a];
    i.user ? (e[n++] = i) : ya(i);
  }
  if (S.context) {
    if (S.count) {
      S.effects || (S.effects = []), S.effects.push(...e.slice(0, n));
      return;
    } else
      S.effects &&
        ((e = [...S.effects, ...e]), (n += S.effects.length), delete S.effects);
    ye();
  }
  for (a = 0; a < n; a++) ya(e[a]);
}
function ka(e, a) {
  const n = w && w.running;
  n ? (e.tState = 0) : (e.state = 0);
  for (let i = 0; i < e.sources.length; i += 1) {
    const s = e.sources[i];
    if (s.sources) {
      const o = n ? s.tState : s.state;
      o === de
        ? s !== a && (!s.updatedAt || s.updatedAt < Fa) && ya(s)
        : o === aa && ka(s, a);
    }
  }
}
function Zn(e) {
  const a = w && w.running;
  for (let n = 0; n < e.observers.length; n += 1) {
    const i = e.observers[n];
    (a ? !i.tState : !i.state) &&
      (a ? (i.tState = aa) : (i.state = aa),
      i.pure ? se.push(i) : X.push(i),
      i.observers && Zn(i));
  }
}
function Me(e) {
  let a;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(),
        i = e.sourceSlots.pop(),
        s = n.observers;
      if (s && s.length) {
        const o = s.pop(),
          t = n.observerSlots.pop();
        i < s.length &&
          ((o.sourceSlots[t] = i), (s[i] = o), (n.observerSlots[i] = t));
      }
    }
  if (w && w.running && e.pure) {
    if (e.tOwned) {
      for (a = e.tOwned.length - 1; a >= 0; a--) Me(e.tOwned[a]);
      delete e.tOwned;
    }
    ei(e, !0);
  } else if (e.owned) {
    for (a = e.owned.length - 1; a >= 0; a--) Me(e.owned[a]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (a = e.cleanups.length - 1; a >= 0; a--) e.cleanups[a]();
    e.cleanups = null;
  }
  w && w.running ? (e.tState = 0) : (e.state = 0), (e.context = null);
}
function ei(e, a) {
  if ((a || ((e.tState = 0), w.disposed.add(e)), e.owned))
    for (let n = 0; n < e.owned.length; n++) ei(e.owned[n]);
}
function ai(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function En(e, a, n) {
  try {
    for (const i of a) i(e);
  } catch (i) {
    ta(i, (n && n.owner) || null);
  }
}
function ta(e, a = U) {
  const n = Qe && ra(a, Qe),
    i = ai(e);
  if (!n) throw i;
  X
    ? X.push({
        fn() {
          En(i, n, a);
        },
        state: de,
      })
    : En(i, n, a);
}
function ra(e, a) {
  return e
    ? e.context && e.context[a] !== void 0
      ? e.context[a]
      : ra(e.owner, a)
    : void 0;
}
function Wa(e) {
  if (typeof e == "function" && !e.length) return Wa(e());
  if (Array.isArray(e)) {
    const a = [];
    for (let n = 0; n < e.length; n++) {
      const i = Wa(e[n]);
      Array.isArray(i) ? a.push.apply(a, i) : a.push(i);
    }
    return a;
  }
  return e;
}
function is(e, a) {
  return function (i) {
    let s;
    return (
      Ee(
        () =>
          (s = Q(() => ((U.context = { [e]: i.value }), Jn(() => i.children)))),
        void 0,
      ),
      s
    );
  };
}
const ss = Symbol("fallback");
function An(e) {
  for (let a = 0; a < e.length; a++) e[a]();
}
function os(e, a, n = {}) {
  let i = [],
    s = [],
    o = [],
    t = 0,
    r = a.length > 1 ? [] : null;
  return (
    Je(() => An(o)),
    () => {
      let p = e() || [],
        f,
        m;
      return (
        p[Ki],
        Q(() => {
          let v = p.length,
            y,
            j,
            E,
            T,
            F,
            M,
            q,
            D,
            _;
          if (v === 0)
            t !== 0 &&
              (An(o), (o = []), (i = []), (s = []), (t = 0), r && (r = [])),
              n.fallback &&
                ((i = [ss]),
                (s[0] = Ve((pe) => ((o[0] = pe), n.fallback()))),
                (t = 1));
          else if (t === 0) {
            for (s = new Array(v), m = 0; m < v; m++)
              (i[m] = p[m]), (s[m] = Ve(x));
            t = v;
          } else {
            for (
              E = new Array(v),
                T = new Array(v),
                r && (F = new Array(v)),
                M = 0,
                q = Math.min(t, v);
              M < q && i[M] === p[M];
              M++
            );
            for (
              q = t - 1, D = v - 1;
              q >= M && D >= M && i[q] === p[D];
              q--, D--
            )
              (E[D] = s[q]), (T[D] = o[q]), r && (F[D] = r[q]);
            for (y = new Map(), j = new Array(D + 1), m = D; m >= M; m--)
              (_ = p[m]),
                (f = y.get(_)),
                (j[m] = f === void 0 ? -1 : f),
                y.set(_, m);
            for (f = M; f <= q; f++)
              (_ = i[f]),
                (m = y.get(_)),
                m !== void 0 && m !== -1
                  ? ((E[m] = s[f]),
                    (T[m] = o[f]),
                    r && (F[m] = r[f]),
                    (m = j[m]),
                    y.set(_, m))
                  : o[f]();
            for (m = M; m < v; m++)
              m in E
                ? ((s[m] = E[m]), (o[m] = T[m]), r && ((r[m] = F[m]), r[m](m)))
                : (s[m] = Ve(x));
            (s = s.slice(0, (t = v))), (i = p.slice(0));
          }
          return s;
        })
      );
      function x(v) {
        if (((o[m] = v), r)) {
          const [y, j] = P(m);
          return (r[m] = j), a(p[m], y);
        }
        return a(p[m]);
      }
    }
  );
}
function C(e, a) {
  return Q(() => e(a || {}));
}
function ua() {
  return !0;
}
const Ka = {
  get(e, a, n) {
    return a === ga ? n : e.get(a);
  },
  has(e, a) {
    return a === ga ? !0 : e.has(a);
  },
  set: ua,
  deleteProperty: ua,
  getOwnPropertyDescriptor(e, a) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(a);
      },
      set: ua,
      deleteProperty: ua,
    };
  },
  ownKeys(e) {
    return e.keys();
  },
};
function qa(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function ts() {
  for (let e = 0, a = this.length; e < a; ++e) {
    const n = this[e]();
    if (n !== void 0) return n;
  }
}
function or(...e) {
  let a = !1;
  for (let o = 0; o < e.length; o++) {
    const t = e[o];
    (a = a || (!!t && ga in t)),
      (e[o] = typeof t == "function" ? ((a = !0), N(t)) : t);
  }
  if (a)
    return new Proxy(
      {
        get(o) {
          for (let t = e.length - 1; t >= 0; t--) {
            const r = qa(e[t])[o];
            if (r !== void 0) return r;
          }
        },
        has(o) {
          for (let t = e.length - 1; t >= 0; t--) if (o in qa(e[t])) return !0;
          return !1;
        },
        keys() {
          const o = [];
          for (let t = 0; t < e.length; t++) o.push(...Object.keys(qa(e[t])));
          return [...new Set(o)];
        },
      },
      Ka,
    );
  const n = {},
    i = {},
    s = new Set();
  for (let o = e.length - 1; o >= 0; o--) {
    const t = e[o];
    if (!t) continue;
    const r = Object.getOwnPropertyNames(t);
    for (let p = 0, f = r.length; p < f; p++) {
      const m = r[p];
      if (m === "__proto__" || m === "constructor") continue;
      const x = Object.getOwnPropertyDescriptor(t, m);
      if (!s.has(m))
        x.get
          ? (s.add(m),
            Object.defineProperty(n, m, {
              enumerable: !0,
              configurable: !0,
              get: ts.bind((i[m] = [x.get.bind(t)])),
            }))
          : (x.value !== void 0 && s.add(m), (n[m] = x.value));
      else {
        const v = i[m];
        v
          ? x.get
            ? v.push(x.get.bind(t))
            : x.value !== void 0 && v.push(() => x.value)
          : n[m] === void 0 && (n[m] = x.value);
      }
    }
  }
  return n;
}
function tr(e, ...a) {
  if (ga in e) {
    const s = new Set(a.length > 1 ? a.flat() : a[0]),
      o = a.map(
        (t) =>
          new Proxy(
            {
              get(r) {
                return t.includes(r) ? e[r] : void 0;
              },
              has(r) {
                return t.includes(r) && r in e;
              },
              keys() {
                return t.filter((r) => r in e);
              },
            },
            Ka,
          ),
      );
    return (
      o.push(
        new Proxy(
          {
            get(t) {
              return s.has(t) ? void 0 : e[t];
            },
            has(t) {
              return s.has(t) ? !1 : t in e;
            },
            keys() {
              return Object.keys(e).filter((t) => !s.has(t));
            },
          },
          Ka,
        ),
      ),
      o
    );
  }
  const n = {},
    i = a.map(() => ({}));
  for (const s of Object.getOwnPropertyNames(e)) {
    const o = Object.getOwnPropertyDescriptor(e, s),
      t = !o.get && !o.set && o.enumerable && o.writable && o.configurable;
    let r = !1,
      p = 0;
    for (const f of a)
      f.includes(s) &&
        ((r = !0), t ? (i[p][s] = o.value) : Object.defineProperty(i[p], s, o)),
        ++p;
    r || (t ? (n[s] = o.value) : Object.defineProperty(n, s, o));
  }
  return [...i, n];
}
function _e(e) {
  let a, n;
  const i = (s) => {
    const o = S.context;
    if (o) {
      const [r, p] = P();
      S.count || (S.count = 0),
        S.count++,
        (n || (n = e())).then((f) => {
          ye(o), S.count--, p(() => f.default), ye();
        }),
        (a = r);
    } else if (!a) {
      const [r] = Gi(() => (n || (n = e())).then((p) => p.default));
      a = r;
    }
    let t;
    return N(
      () =>
        (t = a()) &&
        Q(() => {
          if (!o) return t(s);
          const r = S.context;
          ye(o);
          const p = t(s);
          return ye(r), p;
        }),
    );
  };
  return (
    (i.preload = () => n || ((n = e()).then((s) => (a = () => s.default)), n)),
    i
  );
}
let rs = 0;
function cs() {
  const e = S.context;
  return e ? `${e.id}${e.count++}` : `cl-${rs++}`;
}
const ls = (e) => `Stale read from <${e}>.`;
function rr(e) {
  const a = "fallback" in e && { fallback: () => e.fallback };
  return N(os(() => e.each, e.children, a || void 0));
}
function rn(e) {
  const a = e.keyed,
    n = N(() => e.when, void 0, { equals: (i, s) => (a ? i === s : !i == !s) });
  return N(
    () => {
      const i = n();
      if (i) {
        const s = e.children;
        return typeof s == "function" && s.length > 0
          ? Q(() =>
              s(
                a
                  ? i
                  : () => {
                      if (!Q(n)) throw ls("Show");
                      return e.when;
                    },
              ),
            )
          : s;
      }
      return e.fallback;
    },
    void 0,
    void 0,
  );
}
let He;
function ni() {
  He && [...He].forEach((e) => e());
}
function ps(e) {
  let a, n;
  S.context &&
    S.load &&
    (n = S.load(S.context.id + S.context.count)) &&
    (a = n[0]);
  const [i, s] = P(a, void 0);
  return (
    He || (He = new Set()),
    He.add(s),
    Je(() => He.delete(s)),
    N(
      () => {
        let o;
        if ((o = i())) {
          const t = e.fallback;
          return typeof t == "function" && t.length
            ? Q(() => t(o, () => s()))
            : t;
        }
        return Xi(() => e.children, s);
      },
      void 0,
      void 0,
    )
  );
}
const us = Xe();
function ds(e) {
  let a = 0,
    n,
    i,
    s,
    o,
    t;
  const [r, p] = P(!1),
    f = es(),
    m = {
      increment: () => {
        ++a === 1 && p(!0);
      },
      decrement: () => {
        --a === 0 && p(!1);
      },
      inFallback: r,
      effects: [],
      resolved: !1,
    },
    x = Gn();
  if (S.context && S.load) {
    const j = S.context.id + S.context.count;
    let E = S.load(j);
    if (E && (s = E[0]) && s !== "$$f") {
      (typeof s != "object" || !("then" in s)) && (s = Promise.resolve(s));
      const [T, F] = P(void 0, { equals: !1 });
      (o = T),
        s.then((M) => {
          if (M || S.done) return M && (t = M), F();
          S.gather(j), ye(i), F(), ye();
        });
    }
  }
  const v = Pe(us);
  v && (n = v.register(m.inFallback));
  let y;
  return (
    Je(() => y && y()),
    C(f.Provider, {
      value: m,
      get children() {
        return N(() => {
          if (t) throw t;
          if (((i = S.context), o)) return o(), (o = void 0);
          i && s === "$$f" && ye();
          const j = N(() => e.children);
          return N((E) => {
            const T = m.inFallback(),
              { showContent: F = !0, showFallback: M = !0 } = n ? n() : {};
            if ((!T || (s && s !== "$$f")) && F)
              return (
                (m.resolved = !0),
                y && y(),
                (y = i = s = void 0),
                Zi(m.effects),
                j()
              );
            if (M)
              return y
                ? E
                : Ve(
                    (q) => (
                      (y = q),
                      i && (ye({ id: i.id + "f", count: 0 }), (i = void 0)),
                      e.fallback
                    ),
                    x,
                  );
          });
        });
      },
    })
  );
}
const ms = [
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "disabled",
    "formnovalidate",
    "hidden",
    "indeterminate",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "seamless",
    "selected",
  ],
  fs = new Set([
    "className",
    "value",
    "readOnly",
    "formNoValidate",
    "isMap",
    "noModule",
    "playsInline",
    ...ms,
  ]),
  xs = new Set(["innerHTML", "textContent", "innerText", "children"]),
  hs = Object.assign(Object.create(null), {
    className: "class",
    htmlFor: "for",
  }),
  vs = Object.assign(Object.create(null), {
    class: "className",
    formnovalidate: { $: "formNoValidate", BUTTON: 1, INPUT: 1 },
    ismap: { $: "isMap", IMG: 1 },
    nomodule: { $: "noModule", SCRIPT: 1 },
    playsinline: { $: "playsInline", VIDEO: 1 },
    readonly: { $: "readOnly", INPUT: 1, TEXTAREA: 1 },
  });
function bs(e, a) {
  const n = vs[e];
  return typeof n == "object" ? (n[a] ? n.$ : void 0) : n;
}
const gs = new Set([
    "beforeinput",
    "click",
    "dblclick",
    "contextmenu",
    "focusin",
    "focusout",
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "pointerdown",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointerup",
    "touchend",
    "touchmove",
    "touchstart",
  ]),
  ws = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
  };
function ys(e, a, n) {
  let i = n.length,
    s = a.length,
    o = i,
    t = 0,
    r = 0,
    p = a[s - 1].nextSibling,
    f = null;
  for (; t < s || r < o; ) {
    if (a[t] === n[r]) {
      t++, r++;
      continue;
    }
    for (; a[s - 1] === n[o - 1]; ) s--, o--;
    if (s === t) {
      const m = o < i ? (r ? n[r - 1].nextSibling : n[o - r]) : p;
      for (; r < o; ) e.insertBefore(n[r++], m);
    } else if (o === r)
      for (; t < s; ) (!f || !f.has(a[t])) && a[t].remove(), t++;
    else if (a[t] === n[o - 1] && n[r] === a[s - 1]) {
      const m = a[--s].nextSibling;
      e.insertBefore(n[r++], a[t++].nextSibling),
        e.insertBefore(n[--o], m),
        (a[s] = n[o]);
    } else {
      if (!f) {
        f = new Map();
        let x = r;
        for (; x < o; ) f.set(n[x], x++);
      }
      const m = f.get(a[t]);
      if (m != null)
        if (r < m && m < o) {
          let x = t,
            v = 1,
            y;
          for (
            ;
            ++x < s && x < o && !((y = f.get(a[x])) == null || y !== m + v);

          )
            v++;
          if (v > m - r) {
            const j = a[t];
            for (; r < m; ) e.insertBefore(n[r++], j);
          } else e.replaceChild(n[r++], a[t++]);
        } else t++;
      else a[t++].remove();
    }
  }
}
const Sn = "_$DX_DELEGATE";
function ks(e, a, n, i = {}) {
  let s;
  return (
    Ve((o) => {
      (s = o),
        a === document ? e() : Ja(a, e(), a.firstChild ? null : void 0, n);
    }, i.owner),
    () => {
      s(), (a.textContent = "");
    }
  );
}
function js(e, a, n) {
  let i;
  const s = () => {
      const t = document.createElement("template");
      return (
        (t.innerHTML = e),
        n ? t.content.firstChild.firstChild : t.content.firstChild
      );
    },
    o = a
      ? () => Q(() => document.importNode(i || (i = s()), !0))
      : () => (i || (i = s())).cloneNode(!0);
  return (o.cloneNode = o), o;
}
function cn(e, a = window.document) {
  const n = a[Sn] || (a[Sn] = new Set());
  for (let i = 0, s = e.length; i < s; i++) {
    const o = e[i];
    n.has(o) || (n.add(o), a.addEventListener(o, Us));
  }
}
function Ga(e, a, n) {
  n == null ? e.removeAttribute(a) : e.setAttribute(a, n);
}
function Es(e, a, n, i) {
  i == null ? e.removeAttributeNS(a, n) : e.setAttributeNS(a, n, i);
}
function As(e, a) {
  a == null ? e.removeAttribute("class") : (e.className = a);
}
function ii(e, a, n, i) {
  if (i)
    Array.isArray(n)
      ? ((e[`$$${a}`] = n[0]), (e[`$$${a}Data`] = n[1]))
      : (e[`$$${a}`] = n);
  else if (Array.isArray(n)) {
    const s = n[0];
    e.addEventListener(a, (n[0] = (o) => s.call(e, n[1], o)));
  } else e.addEventListener(a, n);
}
function Ss(e, a, n = {}) {
  const i = Object.keys(a || {}),
    s = Object.keys(n);
  let o, t;
  for (o = 0, t = s.length; o < t; o++) {
    const r = s[o];
    !r || r === "undefined" || a[r] || (Tn(e, r, !1), delete n[r]);
  }
  for (o = 0, t = i.length; o < t; o++) {
    const r = i[o],
      p = !!a[r];
    !r || r === "undefined" || n[r] === p || !p || (Tn(e, r, !0), (n[r] = p));
  }
  return n;
}
function Ts(e, a, n) {
  if (!a) return n ? Ga(e, "style") : a;
  const i = e.style;
  if (typeof a == "string") return (i.cssText = a);
  typeof n == "string" && (i.cssText = n = void 0),
    n || (n = {}),
    a || (a = {});
  let s, o;
  for (o in n) a[o] == null && i.removeProperty(o), delete n[o];
  for (o in a) (s = a[o]), s !== n[o] && (i.setProperty(o, s), (n[o] = s));
  return n;
}
function na(e, a = {}, n, i) {
  const s = {};
  return (
    i || Ee(() => (s.children = Ge(e, a.children, s.children))),
    Ee(() => a.ref && a.ref(e)),
    Ee(() => Fs(e, a, n, !0, s, !0)),
    s
  );
}
function cr(e, a, n) {
  return Q(() => e(a, n));
}
function Ja(e, a, n, i) {
  if ((n !== void 0 && !i && (i = []), typeof a != "function"))
    return Ge(e, a, i, n);
  Ee((s) => Ge(e, a(), s, n), i);
}
function Fs(e, a, n, i, s = {}, o = !1) {
  a || (a = {});
  for (const t in s)
    if (!(t in a)) {
      if (t === "children") continue;
      s[t] = Fn(e, t, null, s[t], n, o);
    }
  for (const t in a) {
    if (t === "children") {
      i || Ge(e, a.children);
      continue;
    }
    const r = a[t];
    s[t] = Fn(e, t, r, s[t], n, o);
  }
}
function Cs(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (a, n) => n.toUpperCase());
}
function Tn(e, a, n) {
  const i = a.trim().split(/\s+/);
  for (let s = 0, o = i.length; s < o; s++) e.classList.toggle(i[s], n);
}
function Fn(e, a, n, i, s, o) {
  let t, r, p, f, m;
  if (a === "style") return Ts(e, n, i);
  if (a === "classList") return Ss(e, n, i);
  if (n === i) return i;
  if (a === "ref") o || n(e);
  else if (a.slice(0, 3) === "on:") {
    const x = a.slice(3);
    i && e.removeEventListener(x, i), n && e.addEventListener(x, n);
  } else if (a.slice(0, 10) === "oncapture:") {
    const x = a.slice(10);
    i && e.removeEventListener(x, i, !0), n && e.addEventListener(x, n, !0);
  } else if (a.slice(0, 2) === "on") {
    const x = a.slice(2).toLowerCase(),
      v = gs.has(x);
    if (!v && i) {
      const y = Array.isArray(i) ? i[0] : i;
      e.removeEventListener(x, y);
    }
    (v || n) && (ii(e, x, n, v), v && cn([x]));
  } else if (a.slice(0, 5) === "attr:") Ga(e, a.slice(5), n);
  else if (
    (m = a.slice(0, 5) === "prop:") ||
    (p = xs.has(a)) ||
    (!s && ((f = bs(a, e.tagName)) || (r = fs.has(a)))) ||
    (t = e.nodeName.includes("-"))
  )
    m && ((a = a.slice(5)), (r = !0)),
      a === "class" || a === "className"
        ? As(e, n)
        : t && !r && !p
        ? (e[Cs(a)] = n)
        : (e[f || a] = n);
  else {
    const x = s && a.indexOf(":") > -1 && ws[a.split(":")[0]];
    x ? Es(e, x, a, n) : Ga(e, hs[a] || a, n);
  }
  return n;
}
function Us(e) {
  const a = `$$${e.type}`;
  let n = (e.composedPath && e.composedPath()[0]) || e.target;
  for (
    e.target !== n &&
      Object.defineProperty(e, "target", { configurable: !0, value: n }),
      Object.defineProperty(e, "currentTarget", {
        configurable: !0,
        get() {
          return n || document;
        },
      }),
      S.registry && !S.done && (S.done = _$HY.done = !0);
    n;

  ) {
    const i = n[a];
    if (i && !n.disabled) {
      const s = n[`${a}Data`];
      if ((s !== void 0 ? i.call(n, s, e) : i.call(n, e), e.cancelBubble))
        return;
    }
    n = n._$host || n.parentNode || n.host;
  }
}
function Ge(e, a, n, i, s) {
  if (S.context) {
    !n && (n = [...e.childNodes]);
    let r = [];
    for (let p = 0; p < n.length; p++) {
      const f = n[p];
      f.nodeType === 8 && f.data.slice(0, 2) === "!$" ? f.remove() : r.push(f);
    }
    n = r;
  }
  for (; typeof n == "function"; ) n = n();
  if (a === n) return n;
  const o = typeof a,
    t = i !== void 0;
  if (
    ((e = (t && n[0] && n[0].parentNode) || e),
    o === "string" || o === "number")
  ) {
    if (S.context) return n;
    if ((o === "number" && (a = a.toString()), t)) {
      let r = n[0];
      r && r.nodeType === 3 ? (r.data = a) : (r = document.createTextNode(a)),
        (n = Oe(e, n, i, r));
    } else
      n !== "" && typeof n == "string"
        ? (n = e.firstChild.data = a)
        : (n = e.textContent = a);
  } else if (a == null || o === "boolean") {
    if (S.context) return n;
    n = Oe(e, n, i);
  } else {
    if (o === "function")
      return (
        Ee(() => {
          let r = a();
          for (; typeof r == "function"; ) r = r();
          n = Ge(e, r, n, i);
        }),
        () => n
      );
    if (Array.isArray(a)) {
      const r = [],
        p = n && Array.isArray(n);
      if (Xa(r, a, n, s)) return Ee(() => (n = Ge(e, r, n, i, !0))), () => n;
      if (S.context) {
        if (!r.length) return n;
        for (let f = 0; f < r.length; f++) if (r[f].parentNode) return (n = r);
      }
      if (r.length === 0) {
        if (((n = Oe(e, n, i)), t)) return n;
      } else
        p
          ? n.length === 0
            ? Cn(e, r, i)
            : ys(e, n, r)
          : (n && Oe(e), Cn(e, r));
      n = r;
    } else if (a.nodeType) {
      if (S.context && a.parentNode) return (n = t ? [a] : a);
      if (Array.isArray(n)) {
        if (t) return (n = Oe(e, n, i, a));
        Oe(e, n, null, a);
      } else
        n == null || n === "" || !e.firstChild
          ? e.appendChild(a)
          : e.replaceChild(a, e.firstChild);
      n = a;
    } else console.warn("Unrecognized value. Skipped inserting", a);
  }
  return n;
}
function Xa(e, a, n, i) {
  let s = !1;
  for (let o = 0, t = a.length; o < t; o++) {
    let r = a[o],
      p = n && n[o],
      f;
    if (!(r == null || r === !0 || r === !1))
      if ((f = typeof r) == "object" && r.nodeType) e.push(r);
      else if (Array.isArray(r)) s = Xa(e, r, p) || s;
      else if (f === "function")
        if (i) {
          for (; typeof r == "function"; ) r = r();
          s =
            Xa(e, Array.isArray(r) ? r : [r], Array.isArray(p) ? p : [p]) || s;
        } else e.push(r), (s = !0);
      else {
        const m = String(r);
        p && p.nodeType === 3 && p.data === m
          ? e.push(p)
          : e.push(document.createTextNode(m));
      }
  }
  return s;
}
function Cn(e, a, n = null) {
  for (let i = 0, s = a.length; i < s; i++) e.insertBefore(a[i], n);
}
function Oe(e, a, n, i) {
  if (n === void 0) return (e.textContent = "");
  const s = i || document.createTextNode("");
  if (a.length) {
    let o = !1;
    for (let t = a.length - 1; t >= 0; t--) {
      const r = a[t];
      if (s !== r) {
        const p = r.parentNode === e;
        !o && !t
          ? p
            ? e.replaceChild(s, r)
            : e.insertBefore(s, n)
          : p && r.remove();
      } else o = !0;
    }
  } else e.insertBefore(s, n);
  return [s];
}
function Ms(e) {
  return S.context ? void 0 : e.children;
}
const si = !1,
  zs = "modulepreload",
  Is = function (e) {
    return e;
  },
  Un = {},
  Be = function (a, n, i) {
    if (!n || n.length === 0) return a();
    const s = document.getElementsByTagName("link");
    return Promise.all(
      n.map((o) => {
        if (((o = Is(o)), o in Un)) return;
        Un[o] = !0;
        const t = o.endsWith(".css"),
          r = t ? '[rel="stylesheet"]' : "";
        if (!!i)
          for (let m = s.length - 1; m >= 0; m--) {
            const x = s[m];
            if (x.href === o && (!t || x.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${o}"]${r}`)) return;
        const f = document.createElement("link");
        if (
          ((f.rel = t ? "stylesheet" : zs),
          t || ((f.as = "script"), (f.crossOrigin = "")),
          (f.href = o),
          document.head.appendChild(f),
          t)
        )
          return new Promise((m, x) => {
            f.addEventListener("load", m),
              f.addEventListener("error", () =>
                x(new Error(`Unable to preload CSS for ${o}`)),
              );
          });
      }),
    )
      .then(() => a())
      .catch((o) => {
        const t = new Event("vite:preloadError", { cancelable: !0 });
        if (((t.payload = o), window.dispatchEvent(t), !t.defaultPrevented))
          throw o;
      });
  };
function Bs(e, a) {
  e && a && ks(e, a === document ? a.body : a);
}
const ln = Xe(),
  Rs = ["title", "meta"],
  Mn = (e) => e.tag + (e.name ? `.${e.name}"` : ""),
  Ls = (e) => {
    if (!S.context) {
      const s = document.head.querySelectorAll("[data-sm]");
      Array.prototype.forEach.call(s, (o) => o.parentNode.removeChild(o));
    }
    const a = new Map();
    function n(s) {
      if (s.ref) return s.ref;
      let o = document.querySelector(`[data-sm="${s.id}"]`);
      return (
        o
          ? (o.tagName.toLowerCase() !== s.tag &&
              (o.parentNode && o.parentNode.removeChild(o),
              (o = document.createElement(s.tag))),
            o.removeAttribute("data-sm"))
          : (o = document.createElement(s.tag)),
        o
      );
    }
    const i = {
      addClientTag: (s) => {
        let o = Mn(s);
        if (Rs.indexOf(s.tag) !== -1) {
          a.has(o) || a.set(o, []);
          let r = a.get(o),
            p = r.length;
          (r = [...r, s]), a.set(o, r);
          {
            let f = n(s);
            (s.ref = f), na(f, s.props);
            let m = null;
            for (var t = p - 1; t >= 0; t--)
              if (r[t] != null) {
                m = r[t];
                break;
              }
            f.parentNode != document.head && document.head.appendChild(f),
              m && m.ref && document.head.removeChild(m.ref);
          }
          return p;
        }
        {
          let r = n(s);
          (s.ref = r),
            na(r, s.props),
            r.parentNode != document.head && document.head.appendChild(r);
        }
        return -1;
      },
      removeClientTag: (s, o) => {
        const t = Mn(s);
        if (s.ref) {
          const r = a.get(t);
          if (r) {
            if (s.ref.parentNode) {
              s.ref.parentNode.removeChild(s.ref);
              for (let p = o - 1; p >= 0; p--)
                r[p] != null && document.head.appendChild(r[p].ref);
            }
            (r[o] = null), a.set(t, r);
          } else s.ref.parentNode && s.ref.parentNode.removeChild(s.ref);
        }
      },
    };
    return C(ln.Provider, {
      value: i,
      get children() {
        return e.children;
      },
    });
  },
  pn = (e, a, n) => {
    const i = cs();
    if (!Pe(ln)) throw new Error("<MetaProvider /> should be in the tree");
    return (
      qs({
        tag: e,
        props: a,
        setting: n,
        id: i,
        get name() {
          return a.name || a.property;
        },
      }),
      null
    );
  };
function qs(e) {
  const { addClientTag: a, removeClientTag: n, addServerTag: i } = Pe(ln);
  Ee(() => {
    {
      let s = a(e);
      Je(() => n(e, s));
    }
  });
}
const Ps = (e) => pn("title", e, { escape: !0 }),
  we = (e) => pn("meta", e, { escape: !0 }),
  Pa = (e) => pn("link", e);
function _s(e, a, n) {
  return e.addEventListener(a, n), () => e.removeEventListener(a, n);
}
function Os([e, a], n, i) {
  return [n ? () => n(e()) : e, i ? (s) => a(i(s)) : a];
}
function $s(e) {
  try {
    return document.querySelector(e);
  } catch {
    return null;
  }
}
function Ds(e, a) {
  const n = $s(`#${e}`);
  n ? n.scrollIntoView() : a && window.scrollTo(0, 0);
}
function Ns(e, a, n, i) {
  let s = !1;
  const o = (r) => (typeof r == "string" ? { value: r } : r),
    t = Os(
      P(o(e()), { equals: (r, p) => r.value === p.value }),
      void 0,
      (r) => (!s && a(r), r),
    );
  return (
    n &&
      Je(
        n((r = e()) => {
          (s = !0), t[1](o(r)), (s = !1);
        }),
      ),
    { signal: t, utils: i }
  );
}
function Hs(e) {
  if (e) {
    if (Array.isArray(e)) return { signal: e };
  } else return { signal: P({ value: "" }) };
  return e;
}
function Vs() {
  return Ns(
    () => ({
      value:
        window.location.pathname +
        window.location.search +
        window.location.hash,
      state: history.state,
    }),
    ({ value: e, replace: a, scroll: n, state: i }) => {
      a
        ? window.history.replaceState(i, "", e)
        : window.history.pushState(i, "", e),
        Ds(window.location.hash.slice(1), n);
    },
    (e) => _s(window, "popstate", () => e()),
    { go: (e) => window.history.go(e) },
  );
}
function Ws() {
  let e = new Set();
  function a(s) {
    return e.add(s), () => e.delete(s);
  }
  let n = !1;
  function i(s, o) {
    if (n) return !(n = !1);
    const t = {
      to: s,
      options: o,
      defaultPrevented: !1,
      preventDefault: () => (t.defaultPrevented = !0),
    };
    for (const r of e)
      r.listener({
        ...t,
        from: r.location,
        retry: (p) => {
          p && (n = !0), r.navigate(s, o);
        },
      });
    return !t.defaultPrevented;
  }
  return { subscribe: a, confirm: i };
}
const Ks = /^(?:[a-z0-9]+:)?\/\//i,
  Gs = /^\/+|(\/)\/+$/g;
function Ze(e, a = !1) {
  const n = e.replace(Gs, "$1");
  return n ? (a || /^[?#]/.test(n) ? n : "/" + n) : "";
}
function xa(e, a, n) {
  if (Ks.test(a)) return;
  const i = Ze(e),
    s = n && Ze(n);
  let o = "";
  return (
    !s || a.startsWith("/")
      ? (o = i)
      : s.toLowerCase().indexOf(i.toLowerCase()) !== 0
      ? (o = i + s)
      : (o = s),
    (o || "/") + Ze(a, !o)
  );
}
function Js(e, a) {
  if (e == null) throw new Error(a);
  return e;
}
function oi(e, a) {
  return Ze(e).replace(/\/*(\*.*)?$/g, "") + Ze(a);
}
function Xs(e) {
  const a = {};
  return (
    e.searchParams.forEach((n, i) => {
      a[i] = n;
    }),
    a
  );
}
function Ys(e, a, n) {
  const [i, s] = e.split("/*", 2),
    o = i.split("/").filter(Boolean),
    t = o.length;
  return (r) => {
    const p = r.split("/").filter(Boolean),
      f = p.length - t;
    if (f < 0 || (f > 0 && s === void 0 && !a)) return null;
    const m = { path: t ? "" : "/", params: {} },
      x = (v) => (n === void 0 ? void 0 : n[v]);
    for (let v = 0; v < t; v++) {
      const y = o[v],
        j = p[v],
        E = y[0] === ":",
        T = E ? y.slice(1) : y;
      if (E && _a(j, x(T))) m.params[T] = j;
      else if (E || !_a(j, y)) return null;
      m.path += `/${j}`;
    }
    if (s) {
      const v = f ? p.slice(-f).join("/") : "";
      if (_a(v, x(s))) m.params[s] = v;
      else return null;
    }
    return m;
  };
}
function _a(e, a) {
  const n = (i) => i.localeCompare(e, void 0, { sensitivity: "base" }) === 0;
  return a === void 0
    ? !0
    : typeof a == "string"
    ? n(a)
    : typeof a == "function"
    ? a(e)
    : Array.isArray(a)
    ? a.some(n)
    : a instanceof RegExp
    ? a.test(e)
    : !1;
}
function Qs(e) {
  const [a, n] = e.pattern.split("/*", 2),
    i = a.split("/").filter(Boolean);
  return i.reduce(
    (s, o) => s + (o.startsWith(":") ? 2 : 3),
    i.length - (n === void 0 ? 0 : 1),
  );
}
function ti(e) {
  const a = new Map(),
    n = Gn();
  return new Proxy(
    {},
    {
      get(i, s) {
        return (
          a.has(s) ||
            Yi(n, () =>
              a.set(
                s,
                N(() => e()[s]),
              ),
            ),
          a.get(s)()
        );
      },
      getOwnPropertyDescriptor() {
        return { enumerable: !0, configurable: !0 };
      },
      ownKeys() {
        return Reflect.ownKeys(e());
      },
    },
  );
}
function ri(e) {
  let a = /(\/?\:[^\/]+)\?/.exec(e);
  if (!a) return [e];
  let n = e.slice(0, a.index),
    i = e.slice(a.index + a[0].length);
  const s = [n, (n += a[1])];
  for (; (a = /^(\/\:[^\/]+)\?/.exec(i)); )
    s.push((n += a[1])), (i = i.slice(a[0].length));
  return ri(i).reduce((o, t) => [...o, ...s.map((r) => r + t)], []);
}
const Zs = 100,
  ci = Xe(),
  Ca = Xe(),
  li = () => Js(Pe(ci), "Make sure your app is wrapped in a <Router />");
let ia;
const pi = () => ia || Pe(Ca) || li().base;
function eo(e, a = "", n) {
  const { component: i, data: s, children: o } = e,
    t = !o || (Array.isArray(o) && !o.length),
    r = {
      key: e,
      element: i
        ? () => C(i, {})
        : () => {
            const { element: p } = e;
            return p === void 0 && n ? C(n, {}) : p;
          },
      preload: e.component ? i.preload : e.preload,
      data: s,
    };
  return ui(e.path).reduce((p, f) => {
    for (const m of ri(f)) {
      const x = oi(a, m),
        v = t ? x : x.split("/*", 1)[0];
      p.push({
        ...r,
        originalPath: m,
        pattern: v,
        matcher: Ys(v, !t, e.matchFilters),
      });
    }
    return p;
  }, []);
}
function ao(e, a = 0) {
  return {
    routes: e,
    score: Qs(e[e.length - 1]) * 1e4 - a,
    matcher(n) {
      const i = [];
      for (let s = e.length - 1; s >= 0; s--) {
        const o = e[s],
          t = o.matcher(n);
        if (!t) return null;
        i.unshift({ ...t, route: o });
      }
      return i;
    },
  };
}
function ui(e) {
  return Array.isArray(e) ? e : [e];
}
function di(e, a = "", n, i = [], s = []) {
  const o = ui(e);
  for (let t = 0, r = o.length; t < r; t++) {
    const p = o[t];
    if (p && typeof p == "object" && p.hasOwnProperty("path")) {
      const f = eo(p, a, n);
      for (const m of f) {
        i.push(m);
        const x = Array.isArray(p.children) && p.children.length === 0;
        if (p.children && !x) di(p.children, m.pattern, n, i, s);
        else {
          const v = ao([...i], s.length);
          s.push(v);
        }
        i.pop();
      }
    }
  }
  return i.length ? s : s.sort((t, r) => r.score - t.score);
}
function no(e, a) {
  for (let n = 0, i = e.length; n < i; n++) {
    const s = e[n].matcher(a);
    if (s) return s;
  }
  return [];
}
function io(e, a) {
  const n = new URL("http://sar"),
    i = N(
      (p) => {
        const f = e();
        try {
          return new URL(f, n);
        } catch {
          return console.error(`Invalid path ${f}`), p;
        }
      },
      n,
      { equals: (p, f) => p.href === f.href },
    ),
    s = N(() => i().pathname),
    o = N(() => i().search, !0),
    t = N(() => i().hash),
    r = N(() => "");
  return {
    get pathname() {
      return s();
    },
    get search() {
      return o();
    },
    get hash() {
      return t();
    },
    get state() {
      return a();
    },
    get key() {
      return r();
    },
    query: ti(Kn(o, () => Xs(i()))),
  };
}
function so(e, a = "", n, i) {
  const {
      signal: [s, o],
      utils: t = {},
    } = Hs(e),
    r = t.parsePath || ((R) => R),
    p = t.renderPath || ((R) => R),
    f = t.beforeLeave || Ws(),
    m = xa("", a),
    x = void 0;
  if (m === void 0) throw new Error(`${m} is not a valid base path`);
  m && !s().value && o({ value: m, replace: !0, scroll: !1 });
  const [v, y] = P(!1),
    j = async (R) => {
      y(!0);
      try {
        await Qi(R);
      } finally {
        y(!1);
      }
    },
    [E, T] = P(s().value),
    [F, M] = P(s().state),
    q = io(E, F),
    D = [],
    _ = {
      pattern: m,
      params: {},
      path: () => m,
      outlet: () => null,
      resolvePath(R) {
        return xa(m, R);
      },
    };
  if (n)
    try {
      (ia = _),
        (_.data = n({
          data: void 0,
          params: {},
          location: q,
          navigate: Se(_),
        }));
    } finally {
      ia = void 0;
    }
  function pe(R, A, z) {
    Q(() => {
      if (typeof A == "number") {
        A &&
          (t.go
            ? f.confirm(A, z) && t.go(A)
            : console.warn(
                "Router integration does not support relative routing",
              ));
        return;
      }
      const {
          replace: O,
          resolve: te,
          scroll: me,
          state: Te,
        } = { replace: !1, resolve: !0, scroll: !0, ...z },
        fe = te ? R.resolvePath(A) : xa("", A);
      if (fe === void 0) throw new Error(`Path '${A}' is not a routable path`);
      if (D.length >= Zs) throw new Error("Too many redirects");
      const Ie = E();
      if ((fe !== Ie || Te !== F()) && !si) {
        if (f.confirm(fe, z)) {
          const Ia = D.push({ value: Ie, replace: O, scroll: me, state: F() });
          j(() => {
            T(fe), M(Te), ni();
          }).then(() => {
            D.length === Ia && ze({ value: fe, state: Te });
          });
        }
      }
    });
  }
  function Se(R) {
    return (R = R || Pe(Ca) || _), (A, z) => pe(R, A, z);
  }
  function ze(R) {
    const A = D[0];
    A &&
      ((R.value !== A.value || R.state !== A.state) &&
        o({ ...R, replace: A.replace, scroll: A.scroll }),
      (D.length = 0));
  }
  Ee(() => {
    const { value: R, state: A } = s();
    Q(() => {
      R !== E() &&
        j(() => {
          T(R), M(A);
        });
    });
  });
  {
    let R = function (A) {
      if (
        A.defaultPrevented ||
        A.button !== 0 ||
        A.metaKey ||
        A.altKey ||
        A.ctrlKey ||
        A.shiftKey
      )
        return;
      const z = A.composedPath().find(
        (Ie) => Ie instanceof Node && Ie.nodeName.toUpperCase() === "A",
      );
      if (!z || !z.hasAttribute("link")) return;
      const O = z.href;
      if (z.target || (!O && !z.hasAttribute("state"))) return;
      const te = (z.getAttribute("rel") || "").split(/\s+/);
      if (z.hasAttribute("download") || (te && te.includes("external"))) return;
      const me = new URL(O);
      if (
        me.origin !== window.location.origin ||
        (m &&
          me.pathname &&
          !me.pathname.toLowerCase().startsWith(m.toLowerCase()))
      )
        return;
      const Te = r(me.pathname + me.search + me.hash),
        fe = z.getAttribute("state");
      A.preventDefault(),
        pe(_, Te, {
          resolve: !1,
          replace: z.hasAttribute("replace"),
          scroll: !z.hasAttribute("noscroll"),
          state: fe && JSON.parse(fe),
        });
    };
    cn(["click"]),
      document.addEventListener("click", R),
      Je(() => document.removeEventListener("click", R));
  }
  return {
    base: _,
    out: x,
    location: q,
    isRouting: v,
    renderPath: p,
    parsePath: r,
    navigatorFactory: Se,
    beforeLeave: f,
  };
}
function oo(e, a, n, i, s) {
  const { base: o, location: t, navigatorFactory: r } = e,
    { pattern: p, element: f, preload: m, data: x } = i().route,
    v = N(() => i().path);
  m && m();
  const y = {
    parent: a,
    pattern: p,
    get child() {
      return n();
    },
    path: v,
    params: s,
    data: a.data,
    outlet: f,
    resolvePath(j) {
      return xa(o.path(), j, v());
    },
  };
  if (x)
    try {
      (ia = y),
        (y.data = x({ data: a.data, params: s, location: t, navigate: r(y) }));
    } finally {
      ia = void 0;
    }
  return y;
}
const to = (e) => {
    const { source: a, url: n, base: i, data: s, out: o } = e,
      t = a || Vs(),
      r = so(t, i, s);
    return C(ci.Provider, {
      value: r,
      get children() {
        return e.children;
      },
    });
  },
  ro = (e) => {
    const a = li(),
      n = pi(),
      i = Jn(() => e.children),
      s = N(() => di(i(), oi(n.pattern, e.base || ""), co)),
      o = N(() => no(s(), a.location.pathname)),
      t = ti(() => {
        const m = o(),
          x = {};
        for (let v = 0; v < m.length; v++) Object.assign(x, m[v].params);
        return x;
      });
    a.out &&
      a.out.matches.push(
        o().map(({ route: m, path: x, params: v }) => ({
          originalPath: m.originalPath,
          pattern: m.pattern,
          path: x,
          params: v,
        })),
      );
    const r = [];
    let p;
    const f = N(
      Kn(o, (m, x, v) => {
        let y = x && m.length === x.length;
        const j = [];
        for (let E = 0, T = m.length; E < T; E++) {
          const F = x && x[E],
            M = m[E];
          v && F && M.route.key === F.route.key
            ? (j[E] = v[E])
            : ((y = !1),
              r[E] && r[E](),
              Ve((q) => {
                (r[E] = q),
                  (j[E] = oo(
                    a,
                    j[E - 1] || n,
                    () => f()[E + 1],
                    () => o()[E],
                    t,
                  ));
              }));
        }
        return (
          r.splice(m.length).forEach((E) => E()), v && y ? v : ((p = j[0]), j)
        );
      }),
    );
    return C(rn, {
      get when() {
        return f() && p;
      },
      keyed: !0,
      children: (m) =>
        C(Ca.Provider, {
          value: m,
          get children() {
            return m.outlet();
          },
        }),
    });
  },
  co = () => {
    const e = pi();
    return C(rn, {
      get when() {
        return e.child;
      },
      keyed: !0,
      children: (a) =>
        C(Ca.Provider, {
          value: a,
          get children() {
            return a.outlet();
          },
        }),
    });
  };
const mi = Xe({}),
  lo = ro,
  po = "$FETCH",
  uo = js(
    '<div><div><p id="error-message"></p><button id="reset-errors">Clear errors and retry</button><pre>',
  );
function mo(e) {
  return C(ps, {
    fallback: (a, n) =>
      C(rn, {
        get when() {
          return !e.fallback;
        },
        get fallback() {
          return N(() => !!e.fallback)() && e.fallback(a, n);
        },
        get children() {
          return C(fo, { error: a });
        },
      }),
    get children() {
      return e.children;
    },
  });
}
function fo(e) {
  return (
    Wn(() => console.error(e.error)),
    (() => {
      const a = uo(),
        n = a.firstChild,
        i = n.firstChild,
        s = i.nextSibling,
        o = s.nextSibling;
      return (
        a.style.setProperty("padding", "16px"),
        n.style.setProperty("background-color", "rgba(252, 165, 165)"),
        n.style.setProperty("color", "rgb(153, 27, 27)"),
        n.style.setProperty("border-radius", "5px"),
        n.style.setProperty("overflow", "scroll"),
        n.style.setProperty("padding", "16px"),
        n.style.setProperty("margin-bottom", "8px"),
        i.style.setProperty("font-weight", "bold"),
        Ja(i, () => e.error.message),
        ii(s, "click", ni, !0),
        s.style.setProperty("color", "rgba(252, 165, 165)"),
        s.style.setProperty("background-color", "rgb(153, 27, 27)"),
        s.style.setProperty("border-radius", "5px"),
        s.style.setProperty("padding", "4px 8px"),
        o.style.setProperty("margin-top", "8px"),
        o.style.setProperty("width", "100%"),
        Ja(o, () => e.error.stack),
        a
      );
    })()
  );
}
cn(["click"]);
const xo = !1,
  ho = !1,
  vo = !1;
function bo() {
  return (
    Pe(mi),
    [
      ho,
      vo,
      C(Ms, {
        get children() {
          return si;
        },
      }),
      xo,
    ]
  );
}
function go(e) {
  return na(document.documentElement, e, !1, !0), e.children;
}
function wo(e) {
  return na(document.head, e, !1, !0), e.children;
}
function yo(e) {
  return na(document.body, e, !1, !0), e.children;
}
function ko() {
  return [
    C(we, { charset: "utf-8" }),
    C(we, { name: "viewport", content: "width=device-width, initial-scale=1" }),
    C(we, { name: "theme-color", content: "#1c1b22" }),
    C(Ps, { children: "Velocity" }),
    C(we, { property: "og:title", content: "Velocity" }),
    C(Pa, { rel: "icon", href: "favicon.ico" }),
    C(Pa, { rel: "apple-touch-icon", href: "icons/touch.png" }),
    C(Pa, { rel: "manifest", href: "webmanifest.json" }),
    C(we, { name: "robots", content: "index, follow" }),
    C(we, { name: "revisit-after", content: "7 days" }),
    C(we, {
      name: "description",
      content:
        "A highly customizable tabbed proxy for evading internet censorship.",
    }),
    C(we, {
      property: "og:description",
      content:
        "A highly customizable tabbed proxy for evading internet censorship.",
    }),
    C(we, {
      name: "keywords",
      content: "proxy,velocity,tabbed,proxy,unblocker",
    }),
  ];
}
const ke = globalThis.fetch,
  fi = globalThis.WebSocket,
  ja = globalThis.Request,
  Ea = globalThis.Response,
  xi = [101, 204, 205, 304],
  jo = [301, 302, 303, 307, 308];
class Re extends Error {
  status;
  body;
  constructor(a, n) {
    super(n.message || n.code), (this.status = a), (this.body = n);
  }
}
class hi {
  base;
  constructor(a, n) {
    this.base = new URL(`./v${a}/`, n);
  }
}
const vi =
    "!#$%&'*+-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~",
  zn = "%";
function Eo(e) {
  for (let a = 0; a < e.length; a++) {
    const n = e[a];
    if (!vi.includes(n)) return !1;
  }
  return !0;
}
function Ao(e) {
  let a = "";
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    if (vi.includes(i) && i !== zn) a += i;
    else {
      const s = i.charCodeAt(0);
      a += zn + s.toString(16).padStart(2, "0");
    }
  }
  return a;
}
class So extends hi {
  ws;
  http;
  newMeta;
  getMeta;
  constructor(a) {
    super(1, a),
      (this.ws = new URL(this.base)),
      (this.http = new URL(this.base)),
      (this.newMeta = new URL("ws-new-meta", this.base)),
      (this.getMeta = new URL("ws-meta", this.base)),
      this.ws.protocol === "https:"
        ? (this.ws.protocol = "wss:")
        : (this.ws.protocol = "ws:");
  }
  async connect(a, n, i, s, o) {
    const t = await ke(this.newMeta, { method: "GET" });
    if (!t.ok) throw new Re(t.status, await t.json());
    const r = await t.text(),
      p = new fi(this.ws, [
        "bare",
        Ao(
          JSON.stringify({
            remote: { protocol: n, host: i, port: s, path: o },
            headers: a,
            forward_headers: [
              "accept-encoding",
              "accept-language",
              "sec-websocket-extensions",
              "sec-websocket-key",
              "sec-websocket-version",
            ],
            id: r,
          }),
        ),
      ]);
    return (
      (p.meta = new Promise((f, m) => {
        p.addEventListener("open", async () => {
          const x = await ke(this.getMeta, {
            headers: { "x-bare-id": r },
            method: "GET",
          });
          x.ok || m(new Re(x.status, await x.json())), f(await x.json());
        }),
          p.addEventListener("error", m);
      })),
      p
    );
  }
  async request(a, n, i, s, o, t, r, p, f) {
    if (s.startsWith("blob:")) {
      const F = await ke(`${s}${o}${r}`),
        M = new Ea(F.body, F);
      return (
        (M.rawHeaders = Object.fromEntries(F.headers)), (M.rawResponse = F), M
      );
    }
    const m = {};
    if (n instanceof Headers) for (const [F, M] of n) m[F] = M;
    else for (const F in n) m[F] = n[F];
    const x = ["accept-encoding", "accept-language"],
      v = { credentials: "omit", method: a, signal: f };
    i !== void 0 && (v.body = i);
    const y = new ja(this.http, v);
    this.writeBareRequest(y, s, o, r, t, m, x);
    const j = await ke(y),
      E = await this.readBareResponse(j),
      T = new Ea(xi.includes(E.status) ? void 0 : j.body, {
        status: E.status,
        statusText: E.statusText ?? void 0,
        headers: E.headers,
      });
    return (T.rawHeaders = E.rawHeaders), (T.rawResponse = j), T;
  }
  async readBareResponse(a) {
    if (!a.ok) throw new Re(a.status, await a.json());
    const n = ["x-bare-status", "x-bare-status-text", "x-bare-headers"];
    for (const r of n)
      if (!a.headers.has(r))
        throw new Re(500, {
          code: "IMPL_MISSING_BARE_HEADER",
          id: `response.headers.${r}`,
        });
    const i = parseInt(a.headers.get("x-bare-status")),
      s = a.headers.get("x-bare-status-text"),
      o = JSON.parse(a.headers.get("x-bare-headers")),
      t = new Headers(o);
    return { status: i, statusText: s, rawHeaders: o, headers: t };
  }
  writeBareRequest(a, n, i, s, o, t, r) {
    a.headers.set("x-bare-protocol", n),
      a.headers.set("x-bare-host", i),
      a.headers.set("x-bare-path", s),
      a.headers.set("x-bare-port", o.toString()),
      a.headers.set("x-bare-headers", JSON.stringify(t)),
      a.headers.set("x-bare-forward-headers", JSON.stringify(r));
  }
}
function Fe(e, a) {
  const n = (e & 65535) + (a & 65535);
  return (((e >> 16) + (a >> 16) + (n >> 16)) << 16) | (n & 65535);
}
function To(e, a) {
  return (e << a) | (e >>> (32 - a));
}
function Ua(e, a, n, i, s, o) {
  return Fe(To(Fe(Fe(a, e), Fe(i, o)), s), n);
}
function ee(e, a, n, i, s, o, t) {
  return Ua((a & n) | (~a & i), e, a, s, o, t);
}
function ae(e, a, n, i, s, o, t) {
  return Ua((a & i) | (n & ~i), e, a, s, o, t);
}
function ne(e, a, n, i, s, o, t) {
  return Ua(a ^ n ^ i, e, a, s, o, t);
}
function ie(e, a, n, i, s, o, t) {
  return Ua(n ^ (a | ~i), e, a, s, o, t);
}
function ha(e, a) {
  (e[a >> 5] |= 128 << a % 32), (e[(((a + 64) >>> 9) << 4) + 14] = a);
  let n = 1732584193,
    i = -271733879,
    s = -1732584194,
    o = 271733878;
  for (let t = 0; t < e.length; t += 16) {
    const r = n,
      p = i,
      f = s,
      m = o;
    (n = ee(n, i, s, o, e[t], 7, -680876936)),
      (o = ee(o, n, i, s, e[t + 1], 12, -389564586)),
      (s = ee(s, o, n, i, e[t + 2], 17, 606105819)),
      (i = ee(i, s, o, n, e[t + 3], 22, -1044525330)),
      (n = ee(n, i, s, o, e[t + 4], 7, -176418897)),
      (o = ee(o, n, i, s, e[t + 5], 12, 1200080426)),
      (s = ee(s, o, n, i, e[t + 6], 17, -1473231341)),
      (i = ee(i, s, o, n, e[t + 7], 22, -45705983)),
      (n = ee(n, i, s, o, e[t + 8], 7, 1770035416)),
      (o = ee(o, n, i, s, e[t + 9], 12, -1958414417)),
      (s = ee(s, o, n, i, e[t + 10], 17, -42063)),
      (i = ee(i, s, o, n, e[t + 11], 22, -1990404162)),
      (n = ee(n, i, s, o, e[t + 12], 7, 1804603682)),
      (o = ee(o, n, i, s, e[t + 13], 12, -40341101)),
      (s = ee(s, o, n, i, e[t + 14], 17, -1502002290)),
      (i = ee(i, s, o, n, e[t + 15], 22, 1236535329)),
      (n = ae(n, i, s, o, e[t + 1], 5, -165796510)),
      (o = ae(o, n, i, s, e[t + 6], 9, -1069501632)),
      (s = ae(s, o, n, i, e[t + 11], 14, 643717713)),
      (i = ae(i, s, o, n, e[t], 20, -373897302)),
      (n = ae(n, i, s, o, e[t + 5], 5, -701558691)),
      (o = ae(o, n, i, s, e[t + 10], 9, 38016083)),
      (s = ae(s, o, n, i, e[t + 15], 14, -660478335)),
      (i = ae(i, s, o, n, e[t + 4], 20, -405537848)),
      (n = ae(n, i, s, o, e[t + 9], 5, 568446438)),
      (o = ae(o, n, i, s, e[t + 14], 9, -1019803690)),
      (s = ae(s, o, n, i, e[t + 3], 14, -187363961)),
      (i = ae(i, s, o, n, e[t + 8], 20, 1163531501)),
      (n = ae(n, i, s, o, e[t + 13], 5, -1444681467)),
      (o = ae(o, n, i, s, e[t + 2], 9, -51403784)),
      (s = ae(s, o, n, i, e[t + 7], 14, 1735328473)),
      (i = ae(i, s, o, n, e[t + 12], 20, -1926607734)),
      (n = ne(n, i, s, o, e[t + 5], 4, -378558)),
      (o = ne(o, n, i, s, e[t + 8], 11, -2022574463)),
      (s = ne(s, o, n, i, e[t + 11], 16, 1839030562)),
      (i = ne(i, s, o, n, e[t + 14], 23, -35309556)),
      (n = ne(n, i, s, o, e[t + 1], 4, -1530992060)),
      (o = ne(o, n, i, s, e[t + 4], 11, 1272893353)),
      (s = ne(s, o, n, i, e[t + 7], 16, -155497632)),
      (i = ne(i, s, o, n, e[t + 10], 23, -1094730640)),
      (n = ne(n, i, s, o, e[t + 13], 4, 681279174)),
      (o = ne(o, n, i, s, e[t], 11, -358537222)),
      (s = ne(s, o, n, i, e[t + 3], 16, -722521979)),
      (i = ne(i, s, o, n, e[t + 6], 23, 76029189)),
      (n = ne(n, i, s, o, e[t + 9], 4, -640364487)),
      (o = ne(o, n, i, s, e[t + 12], 11, -421815835)),
      (s = ne(s, o, n, i, e[t + 15], 16, 530742520)),
      (i = ne(i, s, o, n, e[t + 2], 23, -995338651)),
      (n = ie(n, i, s, o, e[t], 6, -198630844)),
      (o = ie(o, n, i, s, e[t + 7], 10, 1126891415)),
      (s = ie(s, o, n, i, e[t + 14], 15, -1416354905)),
      (i = ie(i, s, o, n, e[t + 5], 21, -57434055)),
      (n = ie(n, i, s, o, e[t + 12], 6, 1700485571)),
      (o = ie(o, n, i, s, e[t + 3], 10, -1894986606)),
      (s = ie(s, o, n, i, e[t + 10], 15, -1051523)),
      (i = ie(i, s, o, n, e[t + 1], 21, -2054922799)),
      (n = ie(n, i, s, o, e[t + 8], 6, 1873313359)),
      (o = ie(o, n, i, s, e[t + 15], 10, -30611744)),
      (s = ie(s, o, n, i, e[t + 6], 15, -1560198380)),
      (i = ie(i, s, o, n, e[t + 13], 21, 1309151649)),
      (n = ie(n, i, s, o, e[t + 4], 6, -145523070)),
      (o = ie(o, n, i, s, e[t + 11], 10, -1120210379)),
      (s = ie(s, o, n, i, e[t + 2], 15, 718787259)),
      (i = ie(i, s, o, n, e[t + 9], 21, -343485551)),
      (n = Fe(n, r)),
      (i = Fe(i, p)),
      (s = Fe(s, f)),
      (o = Fe(o, m));
  }
  return [n, i, s, o];
}
function bi(e) {
  let a = "";
  const n = e.length * 32;
  for (let i = 0; i < n; i += 8)
    a += String.fromCharCode((e[i >> 5] >>> i % 32) & 255);
  return a;
}
function Ya(e) {
  const a = [],
    n = e.length >> 2;
  for (let s = 0; s < n; s += 1) a[s] = 0;
  const i = e.length * 8;
  for (let s = 0; s < i; s += 8)
    a[s >> 5] |= (e.charCodeAt(s / 8) & 255) << s % 32;
  return a;
}
function Fo(e) {
  return bi(ha(Ya(e), e.length * 8));
}
function Co(e, a) {
  let n = Ya(e);
  const i = [],
    s = [];
  n.length > 16 && (n = ha(n, e.length * 8));
  for (let t = 0; t < 16; t += 1)
    (i[t] = n[t] ^ 909522486), (s[t] = n[t] ^ 1549556828);
  const o = ha(i.concat(Ya(a)), 512 + a.length * 8);
  return bi(ha(s.concat(o), 512 + 128));
}
function gi(e) {
  const a = "0123456789abcdef";
  let n = "";
  for (let i = 0; i < e.length; i += 1) {
    const s = e.charCodeAt(i);
    n += a.charAt((s >>> 4) & 15) + a.charAt(s & 15);
  }
  return n;
}
function Qa(e) {
  return unescape(encodeURIComponent(e));
}
function wi(e) {
  return Fo(Qa(e));
}
function Uo(e) {
  return gi(wi(e));
}
function yi(e, a) {
  return Co(Qa(e), Qa(a));
}
function Mo(e, a) {
  return gi(yi(e, a));
}
function zo(e, a, n) {
  return a ? (n ? yi(a, e) : Mo(a, e)) : n ? wi(e) : Uo(e);
}
const Oa = 3072;
function Io(e) {
  const a = new Headers(e);
  if (e.has("x-bare-headers")) {
    const n = e.get("x-bare-headers");
    if (n.length > Oa) {
      a.delete("x-bare-headers");
      let i = 0;
      for (let s = 0; s < n.length; s += Oa) {
        const o = n.slice(s, s + Oa),
          t = i++;
        a.set(`x-bare-headers-${t}`, `;${o}`);
      }
    }
  }
  return a;
}
function Bo(e) {
  const a = new Headers(e),
    n = "x-bare-headers";
  if (e.has(`${n}-0`)) {
    const i = [];
    for (const [s, o] of e) {
      if (!s.startsWith(n)) continue;
      if (!o.startsWith(";"))
        throw new Re(400, {
          code: "INVALID_BARE_HEADER",
          id: `request.headers.${s}`,
          message: "Value didn't begin with semi-colon.",
        });
      const t = parseInt(s.slice(n.length + 1));
      (i[t] = o.slice(1)), a.delete(s);
    }
    a.set(n, i.join(""));
  }
  return a;
}
class Ro extends hi {
  ws;
  http;
  newMeta;
  getMeta;
  constructor(a) {
    super(2, a),
      (this.ws = new URL(this.base)),
      (this.http = new URL(this.base)),
      (this.newMeta = new URL("./ws-new-meta", this.base)),
      (this.getMeta = new URL("./ws-meta", this.base)),
      this.ws.protocol === "https:"
        ? (this.ws.protocol = "wss:")
        : (this.ws.protocol = "ws:");
  }
  async connect(a, n, i, s, o) {
    const t = new ja(this.newMeta, {
        headers: this.createBareHeaders(n, i, o, s, a),
      }),
      r = await ke(t);
    if (!r.ok) throw new Re(r.status, await r.json());
    const p = await r.text(),
      f = new fi(this.ws, [p]);
    return (
      (f.meta = new Promise((m, x) => {
        f.addEventListener("open", async () => {
          const v = await ke(this.getMeta, {
            headers: { "x-bare-id": p },
            method: "GET",
          });
          m(await this.readBareResponse(v));
        }),
          f.addEventListener("error", x);
      })),
      f
    );
  }
  async request(a, n, i, s, o, t, r, p, f) {
    if (s.startsWith("blob:")) {
      const T = await ke(`${s}${o}${r}`),
        F = new Ea(T.body, T);
      return (
        (F.rawHeaders = Object.fromEntries(T.headers)), (F.rawResponse = T), F
      );
    }
    const m = {};
    if (n instanceof Headers) for (const [T, F] of n) m[T] = F;
    else for (const T in n) m[T] = n[T];
    const x = { credentials: "omit", method: a, signal: f };
    p !== "only-if-cached" && (x.cache = p),
      i !== void 0 && (x.body = i),
      (x.headers = this.createBareHeaders(s, o, r, t, m));
    const v = new ja(this.http + "?cache=" + zo(`${s}${o}${t}${r}`), x),
      y = await ke(v),
      j = await this.readBareResponse(y),
      E = new Ea(xi.includes(j.status) ? void 0 : y.body, {
        status: j.status,
        statusText: j.statusText ?? void 0,
        headers: j.headers,
      });
    return (E.rawHeaders = j.rawHeaders), (E.rawResponse = y), E;
  }
  async readBareResponse(a) {
    if (!a.ok) throw new Re(a.status, await a.json());
    const n = Bo(a.headers),
      i = {};
    return (
      n.has("x-bare-status") && (i.status = parseInt(n.get("x-bare-status"))),
      n.has("x-bare-status-text") &&
        (i.statusText = n.get("x-bare-status-text")),
      n.has("x-bare-headers") &&
        ((i.rawHeaders = JSON.parse(n.get("x-bare-headers"))),
        (i.headers = new Headers(i.rawHeaders))),
      i
    );
  }
  createBareHeaders(a, n, i, s, o, t = [], r = [], p = []) {
    const f = new Headers();
    f.set("x-bare-protocol", a),
      f.set("x-bare-host", n),
      f.set("x-bare-path", i),
      f.set("x-bare-port", s.toString()),
      f.set("x-bare-headers", JSON.stringify(o));
    for (const m of t) f.append("x-bare-forward-headers", m);
    for (const m of r) f.append("x-bare-pass-headers", m);
    for (const m of p) f.append("x-bare-pass-status", m.toString());
    return Io(f), f;
  }
}
const Lo = [
    ["v2", Ro],
    ["v1", So],
  ],
  qo = 20;
async function Po(e, a) {
  const n = await ke(e, { signal: a });
  if (!n.ok)
    throw new Error(`Unable to fetch Bare meta: ${n.status} ${await n.text()}`);
  return await n.json();
}
function In(e) {
  if (e.port) return Number(e.port);
  switch (e.protocol) {
    case "ws:":
    case "http:":
      return 80;
    case "wss:":
    case "https:":
      return 443;
    default:
      return 0;
  }
}
class _o {
  get data() {
    return this.manfiest;
  }
  manfiest;
  client;
  server;
  working;
  onDemand;
  onDemandSignal;
  constructor(a, n) {
    (this.server = new URL(a)),
      !n || n instanceof AbortSignal
        ? ((this.onDemand = !0), (this.onDemandSignal = n))
        : ((this.onDemand = !1), (this.manfiest = n), this.getClient());
  }
  demand() {
    if (this.onDemand)
      return (
        this.working ||
          (this.working = Po(this.server, this.onDemandSignal)
            .then((a) => {
              (this.manfiest = a), this.getClient();
            })
            .catch((a) => {
              throw (delete this.working, a);
            })),
        this.working
      );
  }
  getClient() {
    for (const [a, n] of Lo)
      if (this.data.versions.includes(a)) {
        this.client = new n(this.server);
        return;
      }
    throw new Error("Unable to find compatible client version.");
  }
  async request(a, n, i, s, o, t, r, p, f) {
    return (
      await this.demand(), await this.client.request(a, n, i, s, o, t, r, p, f)
    );
  }
  async connect(a, n, i, s, o) {
    return await this.demand(), this.client.connect(a, n, i, s, o);
  }
  createWebSocket(a, n = {}, i = []) {
    const s = n instanceof Headers ? Object.fromEntries(n) : n;
    (a = new URL(a)),
      (s.Host = a.host),
      (s.Pragma = "no-cache"),
      (s["Cache-Control"] = "no-cache"),
      (s.Upgrade = "websocket"),
      (s.Connection = "Upgrade"),
      typeof i == "string" && (i = [i]);
    for (const o of i)
      if (!Eo(o))
        throw new DOMException(
          `Failed to construct 'WebSocket': The subprotocol '${o}' is invalid.`,
        );
    return (
      i.length && (s["Sec-Websocket-Protocol"] = i.join(", ")),
      this.connect(s, a.protocol, a.hostname, In(a), a.pathname + a.search)
    );
  }
  async fetch(a, n = {}) {
    a instanceof ja
      ? n
        ? (a = new URL(a.url))
        : ((n = a), (a = new URL(a.url)))
      : (a = new URL(a));
    let i;
    typeof n.method == "string" ? (i = n.method) : (i = "GET");
    let s;
    n.body !== void 0 && n.body !== null && (s = n.body);
    let o;
    typeof n.headers == "object" && n.headers !== null
      ? n.headers instanceof Headers
        ? (o = Object.fromEntries(n.headers))
        : (o = n.headers)
      : (o = {});
    let t;
    typeof n.cache == "string" ? (t = n.cache) : (t = "default");
    let r;
    n.signal instanceof AbortSignal && (r = n.signal);
    for (let p = 0; ; p++) {
      "host" in o ? (o.host = a.host) : (o.Host = a.host);
      const f = await this.request(
        i,
        o,
        s,
        a.protocol,
        a.hostname,
        In(a),
        a.pathname + a.search,
        t,
        r,
      );
      if (((f.finalURL = a.toString()), jo.includes(f.status)))
        switch (n.redirect) {
          default:
          case "follow":
            if (qo > p && f.headers.has("location")) {
              a = new URL(f.headers.get("location"), a);
              continue;
            } else throw new TypeError("Failed to fetch");
          case "error":
            throw new TypeError("Failed to fetch");
          case "manual":
            return f;
        }
      else return f;
    }
  }
}
const Oo = new _o(new URL(new URL(location.origin), top.xen.config.bare)),
  [lr, pr] = P([]),
  [ur, dr] = P([]),
  [$o, mr] = P(new Set()),
  [fr, xr] = P(Oo),
  [hr, Bn] = P([]),
  [vr, Do] = P(!0),
  [br, gr] = P([]),
  [wr, yr] = P([]),
  [kr, jr] = P([]),
  [da, Rn] = P("active");
let ma;
const No = new Uint8Array(16);
function Ho() {
  if (
    !ma &&
    ((ma =
      typeof crypto < "u" &&
      crypto.getRandomValues &&
      crypto.getRandomValues.bind(crypto)),
    !ma)
  )
    throw new Error(
      "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
    );
  return ma(No);
}
const Y = [];
for (let e = 0; e < 256; ++e) Y.push((e + 256).toString(16).slice(1));
function Vo(e, a = 0) {
  return (
    Y[e[a + 0]] +
    Y[e[a + 1]] +
    Y[e[a + 2]] +
    Y[e[a + 3]] +
    "-" +
    Y[e[a + 4]] +
    Y[e[a + 5]] +
    "-" +
    Y[e[a + 6]] +
    Y[e[a + 7]] +
    "-" +
    Y[e[a + 8]] +
    Y[e[a + 9]] +
    "-" +
    Y[e[a + 10]] +
    Y[e[a + 11]] +
    Y[e[a + 12]] +
    Y[e[a + 13]] +
    Y[e[a + 14]] +
    Y[e[a + 15]]
  ).toLowerCase();
}
const Wo =
    typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
  Ln = { randomUUID: Wo };
function Ko(e, a, n) {
  if (Ln.randomUUID && !a && !e) return Ln.randomUUID();
  e = e || {};
  const i = e.random || (e.rng || Ho)();
  if (((i[6] = (i[6] & 15) | 64), (i[8] = (i[8] & 63) | 128), a)) {
    n = n || 0;
    for (let s = 0; s < 16; ++s) a[n + s] = i[s];
    return a;
  }
  return Vo(i);
}
function Go(e) {
  const a = new Map(),
    n = new Map(),
    i = new Map();
  function s(p, f) {
    const m = a.get("event") ?? [];
    m.push(f), a.set(p, m);
  }
  function o(p, ...f) {
    (a.get(p) ?? []).forEach((x) => {
      x(...f);
    }),
      e.postMessage({ event: p, args: f });
  }
  function t(p, f) {
    const m = Ko();
    return new Promise((x, v) => {
      n.set(m, [x, v]),
        e.postMessage({ id: m, action: p, data: f, isRequest: !0 });
    });
  }
  function r(p, f) {
    const m = i.get(p) ?? new Set();
    m.add(f), i.set(p, m);
  }
  return (
    e.addEventListener("message", ({ data: p }) => {
      if (p.event)
        (a.get(p.event) ?? []).forEach((m) => {
          m(...p.args);
        });
      else if (p.action)
        if (p.isResponse) {
          const f = n.get(p.id);
          f && (p.success ? f[0](p.data) : f[1](p.data));
        } else
          p.isRequest &&
            (i.get(p.action) ?? new Set()).forEach((m) => {
              m({
                data: p.data,
                reply(x) {
                  e.postMessage({ id: p.id, data: x, isResponse: !0 });
                },
              });
            });
    }),
    { on: s, emit: o, call: t, handle: r }
  );
}
const un = new Set(),
  Aa = new Map();
function Ar(e) {
  const a = Go(e);
  un.add(a),
    Object.entries(Aa).forEach(([i, s]) => {
      a.on(i, s);
    });
  let n = new (class {
    #e = da();
    detectionInterval = 60;
    interval = setInterval(this.updateFunc, this.detectionInterval * 1e3);
    updateFunc() {
      this.#e !== da() && a.emit("util.onStateChanged", da()), (this.#e = da());
    }
  })();
  addEventListener("visibilitychange", () => {
    document.visibilityState === "visible" ? Rn("active") : Rn("idle");
  }),
    a.on("idle.setDetectionInterval", (i) => {
      (n.detectionInterval = i),
        clearInterval(n.interval),
        (n.interval = setInterval(n.updateFunc, n.detectionInterval * 1e3));
    });
}
function Jo(e, ...a) {
  (Aa.get("event") ?? []).forEach((i) => {
    i(...a);
  }),
    un.forEach((i) => {
      i.emit(e, ...a);
    });
}
function Xo(e, a) {
  const n = Aa.get("event") ?? [];
  n.push(a),
    Aa.set(e, n),
    un.forEach((i) => {
      i.on(e, a);
    });
}
const Yo = { emit: Jo, on: Xo },
  Qo = (e, a) => a.some((n) => e instanceof n);
let qn, Pn;
function Zo() {
  return (
    qn ||
    (qn = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function et() {
  return (
    Pn ||
    (Pn = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const ki = new WeakMap(),
  Za = new WeakMap(),
  ji = new WeakMap(),
  $a = new WeakMap(),
  dn = new WeakMap();
function at(e) {
  const a = new Promise((n, i) => {
    const s = () => {
        e.removeEventListener("success", o), e.removeEventListener("error", t);
      },
      o = () => {
        n(Ce(e.result)), s();
      },
      t = () => {
        i(e.error), s();
      };
    e.addEventListener("success", o), e.addEventListener("error", t);
  });
  return (
    a
      .then((n) => {
        n instanceof IDBCursor && ki.set(n, e);
      })
      .catch(() => {}),
    dn.set(a, e),
    a
  );
}
function nt(e) {
  if (Za.has(e)) return;
  const a = new Promise((n, i) => {
    const s = () => {
        e.removeEventListener("complete", o),
          e.removeEventListener("error", t),
          e.removeEventListener("abort", t);
      },
      o = () => {
        n(), s();
      },
      t = () => {
        i(e.error || new DOMException("AbortError", "AbortError")), s();
      };
    e.addEventListener("complete", o),
      e.addEventListener("error", t),
      e.addEventListener("abort", t);
  });
  Za.set(e, a);
}
let en = {
  get(e, a, n) {
    if (e instanceof IDBTransaction) {
      if (a === "done") return Za.get(e);
      if (a === "objectStoreNames") return e.objectStoreNames || ji.get(e);
      if (a === "store")
        return n.objectStoreNames[1]
          ? void 0
          : n.objectStore(n.objectStoreNames[0]);
    }
    return Ce(e[a]);
  },
  set(e, a, n) {
    return (e[a] = n), !0;
  },
  has(e, a) {
    return e instanceof IDBTransaction && (a === "done" || a === "store")
      ? !0
      : a in e;
  },
};
function it(e) {
  en = e(en);
}
function st(e) {
  return e === IDBDatabase.prototype.transaction &&
    !("objectStoreNames" in IDBTransaction.prototype)
    ? function (a, ...n) {
        const i = e.call(Da(this), a, ...n);
        return ji.set(i, a.sort ? a.sort() : [a]), Ce(i);
      }
    : et().includes(e)
    ? function (...a) {
        return e.apply(Da(this), a), Ce(ki.get(this));
      }
    : function (...a) {
        return Ce(e.apply(Da(this), a));
      };
}
function ot(e) {
  return typeof e == "function"
    ? st(e)
    : (e instanceof IDBTransaction && nt(e),
      Qo(e, Zo()) ? new Proxy(e, en) : e);
}
function Ce(e) {
  if (e instanceof IDBRequest) return at(e);
  if ($a.has(e)) return $a.get(e);
  const a = ot(e);
  return a !== e && ($a.set(e, a), dn.set(a, e)), a;
}
const Da = (e) => dn.get(e);
function tt(e, a, { blocked: n, upgrade: i, blocking: s, terminated: o } = {}) {
  const t = indexedDB.open(e, a),
    r = Ce(t);
  return (
    i &&
      t.addEventListener("upgradeneeded", (p) => {
        i(Ce(t.result), p.oldVersion, p.newVersion, Ce(t.transaction), p);
      }),
    n && t.addEventListener("blocked", (p) => n(p.oldVersion, p.newVersion, p)),
    r
      .then((p) => {
        o && p.addEventListener("close", () => o()),
          s &&
            p.addEventListener("versionchange", (f) =>
              s(f.oldVersion, f.newVersion, f),
            );
      })
      .catch(() => {}),
    r
  );
}
const rt = ["get", "getKey", "getAll", "getAllKeys", "count"],
  ct = ["put", "add", "delete", "clear"],
  Na = new Map();
function _n(e, a) {
  if (!(e instanceof IDBDatabase && !(a in e) && typeof a == "string")) return;
  if (Na.get(a)) return Na.get(a);
  const n = a.replace(/FromIndex$/, ""),
    i = a !== n,
    s = ct.includes(n);
  if (
    !(n in (i ? IDBIndex : IDBObjectStore).prototype) ||
    !(s || rt.includes(n))
  )
    return;
  const o = async function (t, ...r) {
    const p = this.transaction(t, s ? "readwrite" : "readonly");
    let f = p.store;
    return (
      i && (f = f.index(r.shift())),
      (await Promise.all([f[n](...r), s && p.done]))[0]
    );
  };
  return Na.set(a, o), o;
}
it((e) => ({
  ...e,
  get: (a, n, i) => _n(a, n) || e.get(a, n, i),
  has: (a, n) => !!_n(a, n) || e.has(a, n),
}));
const lt = [
    {
      component: _e(() =>
        Be(
          () => import("./index-e544ecbf.js"),
          [
            "assets/index-e544ecbf.js",
            "assets/Favicon-94b6bc56.js",
            "assets/index-37963400.js",
            "assets/url-4d36b2c8.js",
          ],
        ),
      ),
      path: "/xen/~/apps/Xen/velocity/",
    },
    {
      component: _e(() => Be(() => import("./bookmarks-66c5c70a.js"), [])),
      path: "/xen/~/apps/Xen/velocity/internal/bookmarks",
    },
    {
      component: _e(() =>
        Be(
          () => import("./history-836c2448.js"),
          ["assets/history-836c2448.js", "assets/Favicon-94b6bc56.js"],
        ),
      ),
      path: "/xen/~/apps/Xen/velocity/internal/history",
    },
    {
      component: _e(() =>
        Be(
          () => import("./newTab-a888c537.js"),
          ["assets/newTab-a888c537.js", "assets/url-4d36b2c8.js"],
        ),
      ),
      path: "/xen/~/apps/Xen/velocity/internal/newTab",
    },
    {
      component: _e(() => Be(() => import("./preferences-49e225ac.js"), [])),
      path: "/xen/~/apps/Xen/velocity/internal/preferences",
    },
    {
      component: _e(() =>
        Be(
          () => import("./view-source-df90a0c0.js"),
          ["assets/view-source-df90a0c0.js", "assets/view-source-5c045b07.css"],
        ),
      ),
      path: "/xen/~/apps/Xen/velocity/internal/view-source",
    },
  ],
  pt = () => lt;
var Sr =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function Ma(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Ei = { exports: {} },
  ut = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50],
  },
  Ai = { exports: {} },
  dt = function (a) {
    return !a || typeof a == "string"
      ? !1
      : a instanceof Array ||
          Array.isArray(a) ||
          (a.length >= 0 &&
            (a.splice instanceof Function ||
              (Object.getOwnPropertyDescriptor(a, a.length - 1) &&
                a.constructor.name !== "String")));
  },
  mt = dt,
  ft = Array.prototype.concat,
  xt = Array.prototype.slice,
  On = (Ai.exports = function (a) {
    for (var n = [], i = 0, s = a.length; i < s; i++) {
      var o = a[i];
      mt(o) ? (n = ft.call(n, xt.call(o))) : n.push(o);
    }
    return n;
  });
On.wrap = function (e) {
  return function () {
    return e(On(arguments));
  };
};
var ht = Ai.exports,
  ea = ut,
  ca = ht,
  Si = Object.hasOwnProperty,
  Ti = Object.create(null);
for (var Ha in ea) Si.call(ea, Ha) && (Ti[ea[Ha]] = Ha);
var ce = (Ei.exports = { to: {}, get: {} });
ce.get = function (e) {
  var a = e.substring(0, 3).toLowerCase(),
    n,
    i;
  switch (a) {
    case "hsl":
      (n = ce.get.hsl(e)), (i = "hsl");
      break;
    case "hwb":
      (n = ce.get.hwb(e)), (i = "hwb");
      break;
    default:
      (n = ce.get.rgb(e)), (i = "rgb");
      break;
  }
  return n ? { model: i, value: n } : null;
};
ce.get.rgb = function (e) {
  if (!e) return null;
  var a = /^#([a-f0-9]{3,4})$/i,
    n = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i,
    i =
      /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,
    s =
      /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,
    o = /^(\w+)$/,
    t = [0, 0, 0, 1],
    r,
    p,
    f;
  if ((r = e.match(n))) {
    for (f = r[2], r = r[1], p = 0; p < 3; p++) {
      var m = p * 2;
      t[p] = parseInt(r.slice(m, m + 2), 16);
    }
    f && (t[3] = parseInt(f, 16) / 255);
  } else if ((r = e.match(a))) {
    for (r = r[1], f = r[3], p = 0; p < 3; p++)
      t[p] = parseInt(r[p] + r[p], 16);
    f && (t[3] = parseInt(f + f, 16) / 255);
  } else if ((r = e.match(i))) {
    for (p = 0; p < 3; p++) t[p] = parseInt(r[p + 1], 0);
    r[4] &&
      (r[5] ? (t[3] = parseFloat(r[4]) * 0.01) : (t[3] = parseFloat(r[4])));
  } else if ((r = e.match(s))) {
    for (p = 0; p < 3; p++) t[p] = Math.round(parseFloat(r[p + 1]) * 2.55);
    r[4] &&
      (r[5] ? (t[3] = parseFloat(r[4]) * 0.01) : (t[3] = parseFloat(r[4])));
  } else
    return (r = e.match(o))
      ? r[1] === "transparent"
        ? [0, 0, 0, 0]
        : Si.call(ea, r[1])
        ? ((t = ea[r[1]]), (t[3] = 1), t)
        : null
      : null;
  for (p = 0; p < 3; p++) t[p] = Ue(t[p], 0, 255);
  return (t[3] = Ue(t[3], 0, 1)), t;
};
ce.get.hsl = function (e) {
  if (!e) return null;
  var a =
      /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,
    n = e.match(a);
  if (n) {
    var i = parseFloat(n[4]),
      s = ((parseFloat(n[1]) % 360) + 360) % 360,
      o = Ue(parseFloat(n[2]), 0, 100),
      t = Ue(parseFloat(n[3]), 0, 100),
      r = Ue(isNaN(i) ? 1 : i, 0, 1);
    return [s, o, t, r];
  }
  return null;
};
ce.get.hwb = function (e) {
  if (!e) return null;
  var a =
      /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,
    n = e.match(a);
  if (n) {
    var i = parseFloat(n[4]),
      s = ((parseFloat(n[1]) % 360) + 360) % 360,
      o = Ue(parseFloat(n[2]), 0, 100),
      t = Ue(parseFloat(n[3]), 0, 100),
      r = Ue(isNaN(i) ? 1 : i, 0, 1);
    return [s, o, t, r];
  }
  return null;
};
ce.to.hex = function () {
  var e = ca(arguments);
  return (
    "#" +
    fa(e[0]) +
    fa(e[1]) +
    fa(e[2]) +
    (e[3] < 1 ? fa(Math.round(e[3] * 255)) : "")
  );
};
ce.to.rgb = function () {
  var e = ca(arguments);
  return e.length < 4 || e[3] === 1
    ? "rgb(" +
        Math.round(e[0]) +
        ", " +
        Math.round(e[1]) +
        ", " +
        Math.round(e[2]) +
        ")"
    : "rgba(" +
        Math.round(e[0]) +
        ", " +
        Math.round(e[1]) +
        ", " +
        Math.round(e[2]) +
        ", " +
        e[3] +
        ")";
};
ce.to.rgb.percent = function () {
  var e = ca(arguments),
    a = Math.round((e[0] / 255) * 100),
    n = Math.round((e[1] / 255) * 100),
    i = Math.round((e[2] / 255) * 100);
  return e.length < 4 || e[3] === 1
    ? "rgb(" + a + "%, " + n + "%, " + i + "%)"
    : "rgba(" + a + "%, " + n + "%, " + i + "%, " + e[3] + ")";
};
ce.to.hsl = function () {
  var e = ca(arguments);
  return e.length < 4 || e[3] === 1
    ? "hsl(" + e[0] + ", " + e[1] + "%, " + e[2] + "%)"
    : "hsla(" + e[0] + ", " + e[1] + "%, " + e[2] + "%, " + e[3] + ")";
};
ce.to.hwb = function () {
  var e = ca(arguments),
    a = "";
  return (
    e.length >= 4 && e[3] !== 1 && (a = ", " + e[3]),
    "hwb(" + e[0] + ", " + e[1] + "%, " + e[2] + "%" + a + ")"
  );
};
ce.to.keyword = function (e) {
  return Ti[e.slice(0, 3)];
};
function Ue(e, a, n) {
  return Math.min(Math.max(a, e), n);
}
function fa(e) {
  var a = Math.round(e).toString(16).toUpperCase();
  return a.length < 2 ? "0" + a : a;
}
var vt = Ei.exports,
  bt = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50],
  };
const sa = bt,
  Fi = {};
for (const e of Object.keys(sa)) Fi[sa[e]] = e;
const k = {
  rgb: { channels: 3, labels: "rgb" },
  hsl: { channels: 3, labels: "hsl" },
  hsv: { channels: 3, labels: "hsv" },
  hwb: { channels: 3, labels: "hwb" },
  cmyk: { channels: 4, labels: "cmyk" },
  xyz: { channels: 3, labels: "xyz" },
  lab: { channels: 3, labels: "lab" },
  lch: { channels: 3, labels: "lch" },
  hex: { channels: 1, labels: ["hex"] },
  keyword: { channels: 1, labels: ["keyword"] },
  ansi16: { channels: 1, labels: ["ansi16"] },
  ansi256: { channels: 1, labels: ["ansi256"] },
  hcg: { channels: 3, labels: ["h", "c", "g"] },
  apple: { channels: 3, labels: ["r16", "g16", "b16"] },
  gray: { channels: 1, labels: ["gray"] },
};
var Ci = k;
for (const e of Object.keys(k)) {
  if (!("channels" in k[e])) throw new Error("missing channels property: " + e);
  if (!("labels" in k[e]))
    throw new Error("missing channel labels property: " + e);
  if (k[e].labels.length !== k[e].channels)
    throw new Error("channel and label counts mismatch: " + e);
  const { channels: a, labels: n } = k[e];
  delete k[e].channels,
    delete k[e].labels,
    Object.defineProperty(k[e], "channels", { value: a }),
    Object.defineProperty(k[e], "labels", { value: n });
}
k.rgb.hsl = function (e) {
  const a = e[0] / 255,
    n = e[1] / 255,
    i = e[2] / 255,
    s = Math.min(a, n, i),
    o = Math.max(a, n, i),
    t = o - s;
  let r, p;
  o === s
    ? (r = 0)
    : a === o
    ? (r = (n - i) / t)
    : n === o
    ? (r = 2 + (i - a) / t)
    : i === o && (r = 4 + (a - n) / t),
    (r = Math.min(r * 60, 360)),
    r < 0 && (r += 360);
  const f = (s + o) / 2;
  return (
    o === s ? (p = 0) : f <= 0.5 ? (p = t / (o + s)) : (p = t / (2 - o - s)),
    [r, p * 100, f * 100]
  );
};
k.rgb.hsv = function (e) {
  let a, n, i, s, o;
  const t = e[0] / 255,
    r = e[1] / 255,
    p = e[2] / 255,
    f = Math.max(t, r, p),
    m = f - Math.min(t, r, p),
    x = function (v) {
      return (f - v) / 6 / m + 1 / 2;
    };
  return (
    m === 0
      ? ((s = 0), (o = 0))
      : ((o = m / f),
        (a = x(t)),
        (n = x(r)),
        (i = x(p)),
        t === f
          ? (s = i - n)
          : r === f
          ? (s = 1 / 3 + a - i)
          : p === f && (s = 2 / 3 + n - a),
        s < 0 ? (s += 1) : s > 1 && (s -= 1)),
    [s * 360, o * 100, f * 100]
  );
};
k.rgb.hwb = function (e) {
  const a = e[0],
    n = e[1];
  let i = e[2];
  const s = k.rgb.hsl(e)[0],
    o = (1 / 255) * Math.min(a, Math.min(n, i));
  return (
    (i = 1 - (1 / 255) * Math.max(a, Math.max(n, i))), [s, o * 100, i * 100]
  );
};
k.rgb.cmyk = function (e) {
  const a = e[0] / 255,
    n = e[1] / 255,
    i = e[2] / 255,
    s = Math.min(1 - a, 1 - n, 1 - i),
    o = (1 - a - s) / (1 - s) || 0,
    t = (1 - n - s) / (1 - s) || 0,
    r = (1 - i - s) / (1 - s) || 0;
  return [o * 100, t * 100, r * 100, s * 100];
};
function gt(e, a) {
  return (e[0] - a[0]) ** 2 + (e[1] - a[1]) ** 2 + (e[2] - a[2]) ** 2;
}
k.rgb.keyword = function (e) {
  const a = Fi[e];
  if (a) return a;
  let n = 1 / 0,
    i;
  for (const s of Object.keys(sa)) {
    const o = sa[s],
      t = gt(e, o);
    t < n && ((n = t), (i = s));
  }
  return i;
};
k.keyword.rgb = function (e) {
  return sa[e];
};
k.rgb.xyz = function (e) {
  let a = e[0] / 255,
    n = e[1] / 255,
    i = e[2] / 255;
  (a = a > 0.04045 ? ((a + 0.055) / 1.055) ** 2.4 : a / 12.92),
    (n = n > 0.04045 ? ((n + 0.055) / 1.055) ** 2.4 : n / 12.92),
    (i = i > 0.04045 ? ((i + 0.055) / 1.055) ** 2.4 : i / 12.92);
  const s = a * 0.4124 + n * 0.3576 + i * 0.1805,
    o = a * 0.2126 + n * 0.7152 + i * 0.0722,
    t = a * 0.0193 + n * 0.1192 + i * 0.9505;
  return [s * 100, o * 100, t * 100];
};
k.rgb.lab = function (e) {
  const a = k.rgb.xyz(e);
  let n = a[0],
    i = a[1],
    s = a[2];
  (n /= 95.047),
    (i /= 100),
    (s /= 108.883),
    (n = n > 0.008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116),
    (i = i > 0.008856 ? i ** (1 / 3) : 7.787 * i + 16 / 116),
    (s = s > 0.008856 ? s ** (1 / 3) : 7.787 * s + 16 / 116);
  const o = 116 * i - 16,
    t = 500 * (n - i),
    r = 200 * (i - s);
  return [o, t, r];
};
k.hsl.rgb = function (e) {
  const a = e[0] / 360,
    n = e[1] / 100,
    i = e[2] / 100;
  let s, o, t;
  if (n === 0) return (t = i * 255), [t, t, t];
  i < 0.5 ? (s = i * (1 + n)) : (s = i + n - i * n);
  const r = 2 * i - s,
    p = [0, 0, 0];
  for (let f = 0; f < 3; f++)
    (o = a + (1 / 3) * -(f - 1)),
      o < 0 && o++,
      o > 1 && o--,
      6 * o < 1
        ? (t = r + (s - r) * 6 * o)
        : 2 * o < 1
        ? (t = s)
        : 3 * o < 2
        ? (t = r + (s - r) * (2 / 3 - o) * 6)
        : (t = r),
      (p[f] = t * 255);
  return p;
};
k.hsl.hsv = function (e) {
  const a = e[0];
  let n = e[1] / 100,
    i = e[2] / 100,
    s = n;
  const o = Math.max(i, 0.01);
  (i *= 2), (n *= i <= 1 ? i : 2 - i), (s *= o <= 1 ? o : 2 - o);
  const t = (i + n) / 2,
    r = i === 0 ? (2 * s) / (o + s) : (2 * n) / (i + n);
  return [a, r * 100, t * 100];
};
k.hsv.rgb = function (e) {
  const a = e[0] / 60,
    n = e[1] / 100;
  let i = e[2] / 100;
  const s = Math.floor(a) % 6,
    o = a - Math.floor(a),
    t = 255 * i * (1 - n),
    r = 255 * i * (1 - n * o),
    p = 255 * i * (1 - n * (1 - o));
  switch (((i *= 255), s)) {
    case 0:
      return [i, p, t];
    case 1:
      return [r, i, t];
    case 2:
      return [t, i, p];
    case 3:
      return [t, r, i];
    case 4:
      return [p, t, i];
    case 5:
      return [i, t, r];
  }
};
k.hsv.hsl = function (e) {
  const a = e[0],
    n = e[1] / 100,
    i = e[2] / 100,
    s = Math.max(i, 0.01);
  let o, t;
  t = (2 - n) * i;
  const r = (2 - n) * s;
  return (
    (o = n * s),
    (o /= r <= 1 ? r : 2 - r),
    (o = o || 0),
    (t /= 2),
    [a, o * 100, t * 100]
  );
};
k.hwb.rgb = function (e) {
  const a = e[0] / 360;
  let n = e[1] / 100,
    i = e[2] / 100;
  const s = n + i;
  let o;
  s > 1 && ((n /= s), (i /= s));
  const t = Math.floor(6 * a),
    r = 1 - i;
  (o = 6 * a - t), t & 1 && (o = 1 - o);
  const p = n + o * (r - n);
  let f, m, x;
  switch (t) {
    default:
    case 6:
    case 0:
      (f = r), (m = p), (x = n);
      break;
    case 1:
      (f = p), (m = r), (x = n);
      break;
    case 2:
      (f = n), (m = r), (x = p);
      break;
    case 3:
      (f = n), (m = p), (x = r);
      break;
    case 4:
      (f = p), (m = n), (x = r);
      break;
    case 5:
      (f = r), (m = n), (x = p);
      break;
  }
  return [f * 255, m * 255, x * 255];
};
k.cmyk.rgb = function (e) {
  const a = e[0] / 100,
    n = e[1] / 100,
    i = e[2] / 100,
    s = e[3] / 100,
    o = 1 - Math.min(1, a * (1 - s) + s),
    t = 1 - Math.min(1, n * (1 - s) + s),
    r = 1 - Math.min(1, i * (1 - s) + s);
  return [o * 255, t * 255, r * 255];
};
k.xyz.rgb = function (e) {
  const a = e[0] / 100,
    n = e[1] / 100,
    i = e[2] / 100;
  let s, o, t;
  return (
    (s = a * 3.2406 + n * -1.5372 + i * -0.4986),
    (o = a * -0.9689 + n * 1.8758 + i * 0.0415),
    (t = a * 0.0557 + n * -0.204 + i * 1.057),
    (s = s > 0.0031308 ? 1.055 * s ** (1 / 2.4) - 0.055 : s * 12.92),
    (o = o > 0.0031308 ? 1.055 * o ** (1 / 2.4) - 0.055 : o * 12.92),
    (t = t > 0.0031308 ? 1.055 * t ** (1 / 2.4) - 0.055 : t * 12.92),
    (s = Math.min(Math.max(0, s), 1)),
    (o = Math.min(Math.max(0, o), 1)),
    (t = Math.min(Math.max(0, t), 1)),
    [s * 255, o * 255, t * 255]
  );
};
k.xyz.lab = function (e) {
  let a = e[0],
    n = e[1],
    i = e[2];
  (a /= 95.047),
    (n /= 100),
    (i /= 108.883),
    (a = a > 0.008856 ? a ** (1 / 3) : 7.787 * a + 16 / 116),
    (n = n > 0.008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116),
    (i = i > 0.008856 ? i ** (1 / 3) : 7.787 * i + 16 / 116);
  const s = 116 * n - 16,
    o = 500 * (a - n),
    t = 200 * (n - i);
  return [s, o, t];
};
k.lab.xyz = function (e) {
  const a = e[0],
    n = e[1],
    i = e[2];
  let s, o, t;
  (o = (a + 16) / 116), (s = n / 500 + o), (t = o - i / 200);
  const r = o ** 3,
    p = s ** 3,
    f = t ** 3;
  return (
    (o = r > 0.008856 ? r : (o - 16 / 116) / 7.787),
    (s = p > 0.008856 ? p : (s - 16 / 116) / 7.787),
    (t = f > 0.008856 ? f : (t - 16 / 116) / 7.787),
    (s *= 95.047),
    (o *= 100),
    (t *= 108.883),
    [s, o, t]
  );
};
k.lab.lch = function (e) {
  const a = e[0],
    n = e[1],
    i = e[2];
  let s;
  (s = (Math.atan2(i, n) * 360) / 2 / Math.PI), s < 0 && (s += 360);
  const t = Math.sqrt(n * n + i * i);
  return [a, t, s];
};
k.lch.lab = function (e) {
  const a = e[0],
    n = e[1],
    s = (e[2] / 360) * 2 * Math.PI,
    o = n * Math.cos(s),
    t = n * Math.sin(s);
  return [a, o, t];
};
k.rgb.ansi16 = function (e, a = null) {
  const [n, i, s] = e;
  let o = a === null ? k.rgb.hsv(e)[2] : a;
  if (((o = Math.round(o / 50)), o === 0)) return 30;
  let t =
    30 +
    ((Math.round(s / 255) << 2) |
      (Math.round(i / 255) << 1) |
      Math.round(n / 255));
  return o === 2 && (t += 60), t;
};
k.hsv.ansi16 = function (e) {
  return k.rgb.ansi16(k.hsv.rgb(e), e[2]);
};
k.rgb.ansi256 = function (e) {
  const a = e[0],
    n = e[1],
    i = e[2];
  return a === n && n === i
    ? a < 8
      ? 16
      : a > 248
      ? 231
      : Math.round(((a - 8) / 247) * 24) + 232
    : 16 +
        36 * Math.round((a / 255) * 5) +
        6 * Math.round((n / 255) * 5) +
        Math.round((i / 255) * 5);
};
k.ansi16.rgb = function (e) {
  let a = e % 10;
  if (a === 0 || a === 7)
    return e > 50 && (a += 3.5), (a = (a / 10.5) * 255), [a, a, a];
  const n = (~~(e > 50) + 1) * 0.5,
    i = (a & 1) * n * 255,
    s = ((a >> 1) & 1) * n * 255,
    o = ((a >> 2) & 1) * n * 255;
  return [i, s, o];
};
k.ansi256.rgb = function (e) {
  if (e >= 232) {
    const o = (e - 232) * 10 + 8;
    return [o, o, o];
  }
  e -= 16;
  let a;
  const n = (Math.floor(e / 36) / 5) * 255,
    i = (Math.floor((a = e % 36) / 6) / 5) * 255,
    s = ((a % 6) / 5) * 255;
  return [n, i, s];
};
k.rgb.hex = function (e) {
  const n = (
    ((Math.round(e[0]) & 255) << 16) +
    ((Math.round(e[1]) & 255) << 8) +
    (Math.round(e[2]) & 255)
  )
    .toString(16)
    .toUpperCase();
  return "000000".substring(n.length) + n;
};
k.hex.rgb = function (e) {
  const a = e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!a) return [0, 0, 0];
  let n = a[0];
  a[0].length === 3 &&
    (n = n
      .split("")
      .map((r) => r + r)
      .join(""));
  const i = parseInt(n, 16),
    s = (i >> 16) & 255,
    o = (i >> 8) & 255,
    t = i & 255;
  return [s, o, t];
};
k.rgb.hcg = function (e) {
  const a = e[0] / 255,
    n = e[1] / 255,
    i = e[2] / 255,
    s = Math.max(Math.max(a, n), i),
    o = Math.min(Math.min(a, n), i),
    t = s - o;
  let r, p;
  return (
    t < 1 ? (r = o / (1 - t)) : (r = 0),
    t <= 0
      ? (p = 0)
      : s === a
      ? (p = ((n - i) / t) % 6)
      : s === n
      ? (p = 2 + (i - a) / t)
      : (p = 4 + (a - n) / t),
    (p /= 6),
    (p %= 1),
    [p * 360, t * 100, r * 100]
  );
};
k.hsl.hcg = function (e) {
  const a = e[1] / 100,
    n = e[2] / 100,
    i = n < 0.5 ? 2 * a * n : 2 * a * (1 - n);
  let s = 0;
  return i < 1 && (s = (n - 0.5 * i) / (1 - i)), [e[0], i * 100, s * 100];
};
k.hsv.hcg = function (e) {
  const a = e[1] / 100,
    n = e[2] / 100,
    i = a * n;
  let s = 0;
  return i < 1 && (s = (n - i) / (1 - i)), [e[0], i * 100, s * 100];
};
k.hcg.rgb = function (e) {
  const a = e[0] / 360,
    n = e[1] / 100,
    i = e[2] / 100;
  if (n === 0) return [i * 255, i * 255, i * 255];
  const s = [0, 0, 0],
    o = (a % 1) * 6,
    t = o % 1,
    r = 1 - t;
  let p = 0;
  switch (Math.floor(o)) {
    case 0:
      (s[0] = 1), (s[1] = t), (s[2] = 0);
      break;
    case 1:
      (s[0] = r), (s[1] = 1), (s[2] = 0);
      break;
    case 2:
      (s[0] = 0), (s[1] = 1), (s[2] = t);
      break;
    case 3:
      (s[0] = 0), (s[1] = r), (s[2] = 1);
      break;
    case 4:
      (s[0] = t), (s[1] = 0), (s[2] = 1);
      break;
    default:
      (s[0] = 1), (s[1] = 0), (s[2] = r);
  }
  return (
    (p = (1 - n) * i),
    [(n * s[0] + p) * 255, (n * s[1] + p) * 255, (n * s[2] + p) * 255]
  );
};
k.hcg.hsv = function (e) {
  const a = e[1] / 100,
    n = e[2] / 100,
    i = a + n * (1 - a);
  let s = 0;
  return i > 0 && (s = a / i), [e[0], s * 100, i * 100];
};
k.hcg.hsl = function (e) {
  const a = e[1] / 100,
    i = (e[2] / 100) * (1 - a) + 0.5 * a;
  let s = 0;
  return (
    i > 0 && i < 0.5
      ? (s = a / (2 * i))
      : i >= 0.5 && i < 1 && (s = a / (2 * (1 - i))),
    [e[0], s * 100, i * 100]
  );
};
k.hcg.hwb = function (e) {
  const a = e[1] / 100,
    n = e[2] / 100,
    i = a + n * (1 - a);
  return [e[0], (i - a) * 100, (1 - i) * 100];
};
k.hwb.hcg = function (e) {
  const a = e[1] / 100,
    i = 1 - e[2] / 100,
    s = i - a;
  let o = 0;
  return s < 1 && (o = (i - s) / (1 - s)), [e[0], s * 100, o * 100];
};
k.apple.rgb = function (e) {
  return [(e[0] / 65535) * 255, (e[1] / 65535) * 255, (e[2] / 65535) * 255];
};
k.rgb.apple = function (e) {
  return [(e[0] / 255) * 65535, (e[1] / 255) * 65535, (e[2] / 255) * 65535];
};
k.gray.rgb = function (e) {
  return [(e[0] / 100) * 255, (e[0] / 100) * 255, (e[0] / 100) * 255];
};
k.gray.hsl = function (e) {
  return [0, 0, e[0]];
};
k.gray.hsv = k.gray.hsl;
k.gray.hwb = function (e) {
  return [0, 100, e[0]];
};
k.gray.cmyk = function (e) {
  return [0, 0, 0, e[0]];
};
k.gray.lab = function (e) {
  return [e[0], 0, 0];
};
k.gray.hex = function (e) {
  const a = Math.round((e[0] / 100) * 255) & 255,
    i = ((a << 16) + (a << 8) + a).toString(16).toUpperCase();
  return "000000".substring(i.length) + i;
};
k.rgb.gray = function (e) {
  return [((e[0] + e[1] + e[2]) / 3 / 255) * 100];
};
const Sa = Ci;
function wt() {
  const e = {},
    a = Object.keys(Sa);
  for (let n = a.length, i = 0; i < n; i++)
    e[a[i]] = { distance: -1, parent: null };
  return e;
}
function yt(e) {
  const a = wt(),
    n = [e];
  for (a[e].distance = 0; n.length; ) {
    const i = n.pop(),
      s = Object.keys(Sa[i]);
    for (let o = s.length, t = 0; t < o; t++) {
      const r = s[t],
        p = a[r];
      p.distance === -1 &&
        ((p.distance = a[i].distance + 1), (p.parent = i), n.unshift(r));
    }
  }
  return a;
}
function kt(e, a) {
  return function (n) {
    return a(e(n));
  };
}
function jt(e, a) {
  const n = [a[e].parent, e];
  let i = Sa[a[e].parent][e],
    s = a[e].parent;
  for (; a[s].parent; )
    n.unshift(a[s].parent), (i = kt(Sa[a[s].parent][s], i)), (s = a[s].parent);
  return (i.conversion = n), i;
}
var Et = function (e) {
  const a = yt(e),
    n = {},
    i = Object.keys(a);
  for (let s = i.length, o = 0; o < s; o++) {
    const t = i[o];
    a[t].parent !== null && (n[t] = jt(t, a));
  }
  return n;
};
const an = Ci,
  At = Et,
  De = {},
  St = Object.keys(an);
function Tt(e) {
  const a = function (...n) {
    const i = n[0];
    return i == null ? i : (i.length > 1 && (n = i), e(n));
  };
  return "conversion" in e && (a.conversion = e.conversion), a;
}
function Ft(e) {
  const a = function (...n) {
    const i = n[0];
    if (i == null) return i;
    i.length > 1 && (n = i);
    const s = e(n);
    if (typeof s == "object")
      for (let o = s.length, t = 0; t < o; t++) s[t] = Math.round(s[t]);
    return s;
  };
  return "conversion" in e && (a.conversion = e.conversion), a;
}
St.forEach((e) => {
  (De[e] = {}),
    Object.defineProperty(De[e], "channels", { value: an[e].channels }),
    Object.defineProperty(De[e], "labels", { value: an[e].labels });
  const a = At(e);
  Object.keys(a).forEach((i) => {
    const s = a[i];
    (De[e][i] = Ft(s)), (De[e][i].raw = Tt(s));
  });
});
var Ct = De;
const Ne = vt,
  re = Ct,
  Ui = ["keyword", "gray", "hex"],
  nn = {};
for (const e of Object.keys(re)) nn[[...re[e].labels].sort().join("")] = e;
const Ta = {};
function J(e, a) {
  if (!(this instanceof J)) return new J(e, a);
  if ((a && a in Ui && (a = null), a && !(a in re)))
    throw new Error("Unknown model: " + a);
  let n, i;
  if (e == null)
    (this.model = "rgb"), (this.color = [0, 0, 0]), (this.valpha = 1);
  else if (e instanceof J)
    (this.model = e.model),
      (this.color = [...e.color]),
      (this.valpha = e.valpha);
  else if (typeof e == "string") {
    const s = Ne.get(e);
    if (s === null) throw new Error("Unable to parse color from string: " + e);
    (this.model = s.model),
      (i = re[this.model].channels),
      (this.color = s.value.slice(0, i)),
      (this.valpha = typeof s.value[i] == "number" ? s.value[i] : 1);
  } else if (e.length > 0) {
    (this.model = a || "rgb"), (i = re[this.model].channels);
    const s = Array.prototype.slice.call(e, 0, i);
    (this.color = sn(s, i)), (this.valpha = typeof e[i] == "number" ? e[i] : 1);
  } else if (typeof e == "number")
    (this.model = "rgb"),
      (this.color = [(e >> 16) & 255, (e >> 8) & 255, e & 255]),
      (this.valpha = 1);
  else {
    this.valpha = 1;
    const s = Object.keys(e);
    "alpha" in e &&
      (s.splice(s.indexOf("alpha"), 1),
      (this.valpha = typeof e.alpha == "number" ? e.alpha : 0));
    const o = s.sort().join("");
    if (!(o in nn))
      throw new Error(
        "Unable to parse color from object: " + JSON.stringify(e),
      );
    this.model = nn[o];
    const { labels: t } = re[this.model],
      r = [];
    for (n = 0; n < t.length; n++) r.push(e[t[n]]);
    this.color = sn(r);
  }
  if (Ta[this.model])
    for (i = re[this.model].channels, n = 0; n < i; n++) {
      const s = Ta[this.model][n];
      s && (this.color[n] = s(this.color[n]));
    }
  (this.valpha = Math.max(0, Math.min(1, this.valpha))),
    Object.freeze && Object.freeze(this);
}
J.prototype = {
  toString() {
    return this.string();
  },
  toJSON() {
    return this[this.model]();
  },
  string(e) {
    let a = this.model in Ne.to ? this : this.rgb();
    a = a.round(typeof e == "number" ? e : 1);
    const n = a.valpha === 1 ? a.color : [...a.color, this.valpha];
    return Ne.to[a.model](n);
  },
  percentString(e) {
    const a = this.rgb().round(typeof e == "number" ? e : 1),
      n = a.valpha === 1 ? a.color : [...a.color, this.valpha];
    return Ne.to.rgb.percent(n);
  },
  array() {
    return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha];
  },
  object() {
    const e = {},
      { channels: a } = re[this.model],
      { labels: n } = re[this.model];
    for (let i = 0; i < a; i++) e[n[i]] = this.color[i];
    return this.valpha !== 1 && (e.alpha = this.valpha), e;
  },
  unitArray() {
    const e = this.rgb().color;
    return (
      (e[0] /= 255),
      (e[1] /= 255),
      (e[2] /= 255),
      this.valpha !== 1 && e.push(this.valpha),
      e
    );
  },
  unitObject() {
    const e = this.rgb().object();
    return (
      (e.r /= 255),
      (e.g /= 255),
      (e.b /= 255),
      this.valpha !== 1 && (e.alpha = this.valpha),
      e
    );
  },
  round(e) {
    return (
      (e = Math.max(e || 0, 0)),
      new J([...this.color.map(Mt(e)), this.valpha], this.model)
    );
  },
  alpha(e) {
    return e !== void 0
      ? new J([...this.color, Math.max(0, Math.min(1, e))], this.model)
      : this.valpha;
  },
  red: V("rgb", 0, K(255)),
  green: V("rgb", 1, K(255)),
  blue: V("rgb", 2, K(255)),
  hue: V(
    ["hsl", "hsv", "hsl", "hwb", "hcg"],
    0,
    (e) => ((e % 360) + 360) % 360,
  ),
  saturationl: V("hsl", 1, K(100)),
  lightness: V("hsl", 2, K(100)),
  saturationv: V("hsv", 1, K(100)),
  value: V("hsv", 2, K(100)),
  chroma: V("hcg", 1, K(100)),
  gray: V("hcg", 2, K(100)),
  white: V("hwb", 1, K(100)),
  wblack: V("hwb", 2, K(100)),
  cyan: V("cmyk", 0, K(100)),
  magenta: V("cmyk", 1, K(100)),
  yellow: V("cmyk", 2, K(100)),
  black: V("cmyk", 3, K(100)),
  x: V("xyz", 0, K(95.047)),
  y: V("xyz", 1, K(100)),
  z: V("xyz", 2, K(108.833)),
  l: V("lab", 0, K(100)),
  a: V("lab", 1),
  b: V("lab", 2),
  keyword(e) {
    return e !== void 0 ? new J(e) : re[this.model].keyword(this.color);
  },
  hex(e) {
    return e !== void 0 ? new J(e) : Ne.to.hex(this.rgb().round().color);
  },
  hexa(e) {
    if (e !== void 0) return new J(e);
    const a = this.rgb().round().color;
    let n = Math.round(this.valpha * 255)
      .toString(16)
      .toUpperCase();
    return n.length === 1 && (n = "0" + n), Ne.to.hex(a) + n;
  },
  rgbNumber() {
    const e = this.rgb().color;
    return ((e[0] & 255) << 16) | ((e[1] & 255) << 8) | (e[2] & 255);
  },
  luminosity() {
    const e = this.rgb().color,
      a = [];
    for (const [n, i] of e.entries()) {
      const s = i / 255;
      a[n] = s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    }
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  },
  contrast(e) {
    const a = this.luminosity(),
      n = e.luminosity();
    return a > n ? (a + 0.05) / (n + 0.05) : (n + 0.05) / (a + 0.05);
  },
  level(e) {
    const a = this.contrast(e);
    return a >= 7 ? "AAA" : a >= 4.5 ? "AA" : "";
  },
  isDark() {
    const e = this.rgb().color;
    return (e[0] * 2126 + e[1] * 7152 + e[2] * 722) / 1e4 < 128;
  },
  isLight() {
    return !this.isDark();
  },
  negate() {
    const e = this.rgb();
    for (let a = 0; a < 3; a++) e.color[a] = 255 - e.color[a];
    return e;
  },
  lighten(e) {
    const a = this.hsl();
    return (a.color[2] += a.color[2] * e), a;
  },
  darken(e) {
    const a = this.hsl();
    return (a.color[2] -= a.color[2] * e), a;
  },
  saturate(e) {
    const a = this.hsl();
    return (a.color[1] += a.color[1] * e), a;
  },
  desaturate(e) {
    const a = this.hsl();
    return (a.color[1] -= a.color[1] * e), a;
  },
  whiten(e) {
    const a = this.hwb();
    return (a.color[1] += a.color[1] * e), a;
  },
  blacken(e) {
    const a = this.hwb();
    return (a.color[2] += a.color[2] * e), a;
  },
  grayscale() {
    const e = this.rgb().color,
      a = e[0] * 0.3 + e[1] * 0.59 + e[2] * 0.11;
    return J.rgb(a, a, a);
  },
  fade(e) {
    return this.alpha(this.valpha - this.valpha * e);
  },
  opaquer(e) {
    return this.alpha(this.valpha + this.valpha * e);
  },
  rotate(e) {
    const a = this.hsl();
    let n = a.color[0];
    return (n = (n + e) % 360), (n = n < 0 ? 360 + n : n), (a.color[0] = n), a;
  },
  mix(e, a) {
    if (!e || !e.rgb)
      throw new Error(
        'Argument to "mix" was not a Color instance, but rather an instance of ' +
          typeof e,
      );
    const n = e.rgb(),
      i = this.rgb(),
      s = a === void 0 ? 0.5 : a,
      o = 2 * s - 1,
      t = n.alpha() - i.alpha(),
      r = ((o * t === -1 ? o : (o + t) / (1 + o * t)) + 1) / 2,
      p = 1 - r;
    return J.rgb(
      r * n.red() + p * i.red(),
      r * n.green() + p * i.green(),
      r * n.blue() + p * i.blue(),
      n.alpha() * s + i.alpha() * (1 - s),
    );
  },
};
for (const e of Object.keys(re)) {
  if (Ui.includes(e)) continue;
  const { channels: a } = re[e];
  (J.prototype[e] = function (...n) {
    return this.model === e
      ? new J(this)
      : n.length > 0
      ? new J(n, e)
      : new J([...zt(re[this.model][e].raw(this.color)), this.valpha], e);
  }),
    (J[e] = function (...n) {
      let i = n[0];
      return typeof i == "number" && (i = sn(n, a)), new J(i, e);
    });
}
function Ut(e, a) {
  return Number(e.toFixed(a));
}
function Mt(e) {
  return function (a) {
    return Ut(a, e);
  };
}
function V(e, a, n) {
  e = Array.isArray(e) ? e : [e];
  for (const i of e) (Ta[i] || (Ta[i] = []))[a] = n;
  return (
    (e = e[0]),
    function (i) {
      let s;
      return i !== void 0
        ? (n && (i = n(i)), (s = this[e]()), (s.color[a] = i), s)
        : ((s = this[e]().color[a]), n && (s = n(s)), s);
    }
  );
}
function K(e) {
  return function (a) {
    return Math.max(0, Math.min(e, a));
  };
}
function zt(e) {
  return Array.isArray(e) ? e : [e];
}
function sn(e, a) {
  for (let n = 0; n < a; n++) typeof e[n] != "number" && (e[n] = 0);
  return e;
}
var It = J;
const Bt = Ma(It);
var Mi = {};
const Rt = {
  "application/1d-interleaved-parityfec": { source: "iana" },
  "application/3gpdash-qoe-report+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/3gpp-ims+xml": { source: "iana", compressible: !0 },
  "application/3gpphal+json": { source: "iana", compressible: !0 },
  "application/3gpphalforms+json": { source: "iana", compressible: !0 },
  "application/a2l": { source: "iana" },
  "application/ace+cbor": { source: "iana" },
  "application/activemessage": { source: "iana" },
  "application/activity+json": { source: "iana", compressible: !0 },
  "application/alto-costmap+json": { source: "iana", compressible: !0 },
  "application/alto-costmapfilter+json": { source: "iana", compressible: !0 },
  "application/alto-directory+json": { source: "iana", compressible: !0 },
  "application/alto-endpointcost+json": { source: "iana", compressible: !0 },
  "application/alto-endpointcostparams+json": {
    source: "iana",
    compressible: !0,
  },
  "application/alto-endpointprop+json": { source: "iana", compressible: !0 },
  "application/alto-endpointpropparams+json": {
    source: "iana",
    compressible: !0,
  },
  "application/alto-error+json": { source: "iana", compressible: !0 },
  "application/alto-networkmap+json": { source: "iana", compressible: !0 },
  "application/alto-networkmapfilter+json": {
    source: "iana",
    compressible: !0,
  },
  "application/alto-updatestreamcontrol+json": {
    source: "iana",
    compressible: !0,
  },
  "application/alto-updatestreamparams+json": {
    source: "iana",
    compressible: !0,
  },
  "application/aml": { source: "iana" },
  "application/andrew-inset": { source: "iana", extensions: ["ez"] },
  "application/applefile": { source: "iana" },
  "application/applixware": { source: "apache", extensions: ["aw"] },
  "application/at+jwt": { source: "iana" },
  "application/atf": { source: "iana" },
  "application/atfx": { source: "iana" },
  "application/atom+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["atom"],
  },
  "application/atomcat+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["atomcat"],
  },
  "application/atomdeleted+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["atomdeleted"],
  },
  "application/atomicmail": { source: "iana" },
  "application/atomsvc+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["atomsvc"],
  },
  "application/atsc-dwd+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["dwd"],
  },
  "application/atsc-dynamic-event-message": { source: "iana" },
  "application/atsc-held+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["held"],
  },
  "application/atsc-rdt+json": { source: "iana", compressible: !0 },
  "application/atsc-rsat+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["rsat"],
  },
  "application/atxml": { source: "iana" },
  "application/auth-policy+xml": { source: "iana", compressible: !0 },
  "application/bacnet-xdd+zip": { source: "iana", compressible: !1 },
  "application/batch-smtp": { source: "iana" },
  "application/bdoc": { compressible: !1, extensions: ["bdoc"] },
  "application/beep+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/calendar+json": { source: "iana", compressible: !0 },
  "application/calendar+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xcs"],
  },
  "application/call-completion": { source: "iana" },
  "application/cals-1840": { source: "iana" },
  "application/captive+json": { source: "iana", compressible: !0 },
  "application/cbor": { source: "iana" },
  "application/cbor-seq": { source: "iana" },
  "application/cccex": { source: "iana" },
  "application/ccmp+xml": { source: "iana", compressible: !0 },
  "application/ccxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["ccxml"],
  },
  "application/cdfx+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["cdfx"],
  },
  "application/cdmi-capability": { source: "iana", extensions: ["cdmia"] },
  "application/cdmi-container": { source: "iana", extensions: ["cdmic"] },
  "application/cdmi-domain": { source: "iana", extensions: ["cdmid"] },
  "application/cdmi-object": { source: "iana", extensions: ["cdmio"] },
  "application/cdmi-queue": { source: "iana", extensions: ["cdmiq"] },
  "application/cdni": { source: "iana" },
  "application/cea": { source: "iana" },
  "application/cea-2018+xml": { source: "iana", compressible: !0 },
  "application/cellml+xml": { source: "iana", compressible: !0 },
  "application/cfw": { source: "iana" },
  "application/city+json": { source: "iana", compressible: !0 },
  "application/clr": { source: "iana" },
  "application/clue+xml": { source: "iana", compressible: !0 },
  "application/clue_info+xml": { source: "iana", compressible: !0 },
  "application/cms": { source: "iana" },
  "application/cnrp+xml": { source: "iana", compressible: !0 },
  "application/coap-group+json": { source: "iana", compressible: !0 },
  "application/coap-payload": { source: "iana" },
  "application/commonground": { source: "iana" },
  "application/conference-info+xml": { source: "iana", compressible: !0 },
  "application/cose": { source: "iana" },
  "application/cose-key": { source: "iana" },
  "application/cose-key-set": { source: "iana" },
  "application/cpl+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["cpl"],
  },
  "application/csrattrs": { source: "iana" },
  "application/csta+xml": { source: "iana", compressible: !0 },
  "application/cstadata+xml": { source: "iana", compressible: !0 },
  "application/csvm+json": { source: "iana", compressible: !0 },
  "application/cu-seeme": { source: "apache", extensions: ["cu"] },
  "application/cwt": { source: "iana" },
  "application/cybercash": { source: "iana" },
  "application/dart": { compressible: !0 },
  "application/dash+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["mpd"],
  },
  "application/dash-patch+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["mpp"],
  },
  "application/dashdelta": { source: "iana" },
  "application/davmount+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["davmount"],
  },
  "application/dca-rft": { source: "iana" },
  "application/dcd": { source: "iana" },
  "application/dec-dx": { source: "iana" },
  "application/dialog-info+xml": { source: "iana", compressible: !0 },
  "application/dicom": { source: "iana" },
  "application/dicom+json": { source: "iana", compressible: !0 },
  "application/dicom+xml": { source: "iana", compressible: !0 },
  "application/dii": { source: "iana" },
  "application/dit": { source: "iana" },
  "application/dns": { source: "iana" },
  "application/dns+json": { source: "iana", compressible: !0 },
  "application/dns-message": { source: "iana" },
  "application/docbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: ["dbk"],
  },
  "application/dots+cbor": { source: "iana" },
  "application/dskpp+xml": { source: "iana", compressible: !0 },
  "application/dssc+der": { source: "iana", extensions: ["dssc"] },
  "application/dssc+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xdssc"],
  },
  "application/dvcs": { source: "iana" },
  "application/ecmascript": {
    source: "iana",
    compressible: !0,
    extensions: ["es", "ecma"],
  },
  "application/edi-consent": { source: "iana" },
  "application/edi-x12": { source: "iana", compressible: !1 },
  "application/edifact": { source: "iana", compressible: !1 },
  "application/efi": { source: "iana" },
  "application/elm+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/elm+xml": { source: "iana", compressible: !0 },
  "application/emergencycalldata.cap+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/emergencycalldata.comment+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/emergencycalldata.control+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/emergencycalldata.deviceinfo+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/emergencycalldata.ecall.msd": { source: "iana" },
  "application/emergencycalldata.providerinfo+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/emergencycalldata.serviceinfo+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/emergencycalldata.veds+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/emma+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["emma"],
  },
  "application/emotionml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["emotionml"],
  },
  "application/encaprtp": { source: "iana" },
  "application/epp+xml": { source: "iana", compressible: !0 },
  "application/epub+zip": {
    source: "iana",
    compressible: !1,
    extensions: ["epub"],
  },
  "application/eshop": { source: "iana" },
  "application/exi": { source: "iana", extensions: ["exi"] },
  "application/expect-ct-report+json": { source: "iana", compressible: !0 },
  "application/express": { source: "iana", extensions: ["exp"] },
  "application/fastinfoset": { source: "iana" },
  "application/fastsoap": { source: "iana" },
  "application/fdt+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["fdt"],
  },
  "application/fhir+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/fhir+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/fido.trusted-apps+json": { compressible: !0 },
  "application/fits": { source: "iana" },
  "application/flexfec": { source: "iana" },
  "application/font-sfnt": { source: "iana" },
  "application/font-tdpfr": { source: "iana", extensions: ["pfr"] },
  "application/font-woff": { source: "iana", compressible: !1 },
  "application/framework-attributes+xml": { source: "iana", compressible: !0 },
  "application/geo+json": {
    source: "iana",
    compressible: !0,
    extensions: ["geojson"],
  },
  "application/geo+json-seq": { source: "iana" },
  "application/geopackage+sqlite3": { source: "iana" },
  "application/geoxacml+xml": { source: "iana", compressible: !0 },
  "application/gltf-buffer": { source: "iana" },
  "application/gml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["gml"],
  },
  "application/gpx+xml": {
    source: "apache",
    compressible: !0,
    extensions: ["gpx"],
  },
  "application/gxf": { source: "apache", extensions: ["gxf"] },
  "application/gzip": { source: "iana", compressible: !1, extensions: ["gz"] },
  "application/h224": { source: "iana" },
  "application/held+xml": { source: "iana", compressible: !0 },
  "application/hjson": { extensions: ["hjson"] },
  "application/http": { source: "iana" },
  "application/hyperstudio": { source: "iana", extensions: ["stk"] },
  "application/ibe-key-request+xml": { source: "iana", compressible: !0 },
  "application/ibe-pkg-reply+xml": { source: "iana", compressible: !0 },
  "application/ibe-pp-data": { source: "iana" },
  "application/iges": { source: "iana" },
  "application/im-iscomposing+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/index": { source: "iana" },
  "application/index.cmd": { source: "iana" },
  "application/index.obj": { source: "iana" },
  "application/index.response": { source: "iana" },
  "application/index.vnd": { source: "iana" },
  "application/inkml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["ink", "inkml"],
  },
  "application/iotp": { source: "iana" },
  "application/ipfix": { source: "iana", extensions: ["ipfix"] },
  "application/ipp": { source: "iana" },
  "application/isup": { source: "iana" },
  "application/its+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["its"],
  },
  "application/java-archive": {
    source: "apache",
    compressible: !1,
    extensions: ["jar", "war", "ear"],
  },
  "application/java-serialized-object": {
    source: "apache",
    compressible: !1,
    extensions: ["ser"],
  },
  "application/java-vm": {
    source: "apache",
    compressible: !1,
    extensions: ["class"],
  },
  "application/javascript": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: ["js", "mjs"],
  },
  "application/jf2feed+json": { source: "iana", compressible: !0 },
  "application/jose": { source: "iana" },
  "application/jose+json": { source: "iana", compressible: !0 },
  "application/jrd+json": { source: "iana", compressible: !0 },
  "application/jscalendar+json": { source: "iana", compressible: !0 },
  "application/json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: ["json", "map"],
  },
  "application/json-patch+json": { source: "iana", compressible: !0 },
  "application/json-seq": { source: "iana" },
  "application/json5": { extensions: ["json5"] },
  "application/jsonml+json": {
    source: "apache",
    compressible: !0,
    extensions: ["jsonml"],
  },
  "application/jwk+json": { source: "iana", compressible: !0 },
  "application/jwk-set+json": { source: "iana", compressible: !0 },
  "application/jwt": { source: "iana" },
  "application/kpml-request+xml": { source: "iana", compressible: !0 },
  "application/kpml-response+xml": { source: "iana", compressible: !0 },
  "application/ld+json": {
    source: "iana",
    compressible: !0,
    extensions: ["jsonld"],
  },
  "application/lgr+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["lgr"],
  },
  "application/link-format": { source: "iana" },
  "application/load-control+xml": { source: "iana", compressible: !0 },
  "application/lost+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["lostxml"],
  },
  "application/lostsync+xml": { source: "iana", compressible: !0 },
  "application/lpf+zip": { source: "iana", compressible: !1 },
  "application/lxf": { source: "iana" },
  "application/mac-binhex40": { source: "iana", extensions: ["hqx"] },
  "application/mac-compactpro": { source: "apache", extensions: ["cpt"] },
  "application/macwriteii": { source: "iana" },
  "application/mads+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["mads"],
  },
  "application/manifest+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: ["webmanifest"],
  },
  "application/marc": { source: "iana", extensions: ["mrc"] },
  "application/marcxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["mrcx"],
  },
  "application/mathematica": { source: "iana", extensions: ["ma", "nb", "mb"] },
  "application/mathml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["mathml"],
  },
  "application/mathml-content+xml": { source: "iana", compressible: !0 },
  "application/mathml-presentation+xml": { source: "iana", compressible: !0 },
  "application/mbms-associated-procedure-description+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/mbms-deregister+xml": { source: "iana", compressible: !0 },
  "application/mbms-envelope+xml": { source: "iana", compressible: !0 },
  "application/mbms-msk+xml": { source: "iana", compressible: !0 },
  "application/mbms-msk-response+xml": { source: "iana", compressible: !0 },
  "application/mbms-protection-description+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/mbms-reception-report+xml": { source: "iana", compressible: !0 },
  "application/mbms-register+xml": { source: "iana", compressible: !0 },
  "application/mbms-register-response+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/mbms-schedule+xml": { source: "iana", compressible: !0 },
  "application/mbms-user-service-description+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/mbox": { source: "iana", extensions: ["mbox"] },
  "application/media-policy-dataset+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["mpf"],
  },
  "application/media_control+xml": { source: "iana", compressible: !0 },
  "application/mediaservercontrol+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["mscml"],
  },
  "application/merge-patch+json": { source: "iana", compressible: !0 },
  "application/metalink+xml": {
    source: "apache",
    compressible: !0,
    extensions: ["metalink"],
  },
  "application/metalink4+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["meta4"],
  },
  "application/mets+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["mets"],
  },
  "application/mf4": { source: "iana" },
  "application/mikey": { source: "iana" },
  "application/mipc": { source: "iana" },
  "application/missing-blocks+cbor-seq": { source: "iana" },
  "application/mmt-aei+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["maei"],
  },
  "application/mmt-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["musd"],
  },
  "application/mods+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["mods"],
  },
  "application/moss-keys": { source: "iana" },
  "application/moss-signature": { source: "iana" },
  "application/mosskey-data": { source: "iana" },
  "application/mosskey-request": { source: "iana" },
  "application/mp21": { source: "iana", extensions: ["m21", "mp21"] },
  "application/mp4": { source: "iana", extensions: ["mp4s", "m4p"] },
  "application/mpeg4-generic": { source: "iana" },
  "application/mpeg4-iod": { source: "iana" },
  "application/mpeg4-iod-xmt": { source: "iana" },
  "application/mrb-consumer+xml": { source: "iana", compressible: !0 },
  "application/mrb-publish+xml": { source: "iana", compressible: !0 },
  "application/msc-ivr+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/msc-mixer+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/msword": {
    source: "iana",
    compressible: !1,
    extensions: ["doc", "dot"],
  },
  "application/mud+json": { source: "iana", compressible: !0 },
  "application/multipart-core": { source: "iana" },
  "application/mxf": { source: "iana", extensions: ["mxf"] },
  "application/n-quads": { source: "iana", extensions: ["nq"] },
  "application/n-triples": { source: "iana", extensions: ["nt"] },
  "application/nasdata": { source: "iana" },
  "application/news-checkgroups": { source: "iana", charset: "US-ASCII" },
  "application/news-groupinfo": { source: "iana", charset: "US-ASCII" },
  "application/news-transmission": { source: "iana" },
  "application/nlsml+xml": { source: "iana", compressible: !0 },
  "application/node": { source: "iana", extensions: ["cjs"] },
  "application/nss": { source: "iana" },
  "application/oauth-authz-req+jwt": { source: "iana" },
  "application/oblivious-dns-message": { source: "iana" },
  "application/ocsp-request": { source: "iana" },
  "application/ocsp-response": { source: "iana" },
  "application/octet-stream": {
    source: "iana",
    compressible: !1,
    extensions: [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer",
    ],
  },
  "application/oda": { source: "iana", extensions: ["oda"] },
  "application/odm+xml": { source: "iana", compressible: !0 },
  "application/odx": { source: "iana" },
  "application/oebps-package+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["opf"],
  },
  "application/ogg": { source: "iana", compressible: !1, extensions: ["ogx"] },
  "application/omdoc+xml": {
    source: "apache",
    compressible: !0,
    extensions: ["omdoc"],
  },
  "application/onenote": {
    source: "apache",
    extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"],
  },
  "application/opc-nodeset+xml": { source: "iana", compressible: !0 },
  "application/oscore": { source: "iana" },
  "application/oxps": { source: "iana", extensions: ["oxps"] },
  "application/p21": { source: "iana" },
  "application/p21+zip": { source: "iana", compressible: !1 },
  "application/p2p-overlay+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["relo"],
  },
  "application/parityfec": { source: "iana" },
  "application/passport": { source: "iana" },
  "application/patch-ops-error+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xer"],
  },
  "application/pdf": { source: "iana", compressible: !1, extensions: ["pdf"] },
  "application/pdx": { source: "iana" },
  "application/pem-certificate-chain": { source: "iana" },
  "application/pgp-encrypted": {
    source: "iana",
    compressible: !1,
    extensions: ["pgp"],
  },
  "application/pgp-keys": { source: "iana", extensions: ["asc"] },
  "application/pgp-signature": { source: "iana", extensions: ["asc", "sig"] },
  "application/pics-rules": { source: "apache", extensions: ["prf"] },
  "application/pidf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/pidf-diff+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/pkcs10": { source: "iana", extensions: ["p10"] },
  "application/pkcs12": { source: "iana" },
  "application/pkcs7-mime": { source: "iana", extensions: ["p7m", "p7c"] },
  "application/pkcs7-signature": { source: "iana", extensions: ["p7s"] },
  "application/pkcs8": { source: "iana", extensions: ["p8"] },
  "application/pkcs8-encrypted": { source: "iana" },
  "application/pkix-attr-cert": { source: "iana", extensions: ["ac"] },
  "application/pkix-cert": { source: "iana", extensions: ["cer"] },
  "application/pkix-crl": { source: "iana", extensions: ["crl"] },
  "application/pkix-pkipath": { source: "iana", extensions: ["pkipath"] },
  "application/pkixcmp": { source: "iana", extensions: ["pki"] },
  "application/pls+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["pls"],
  },
  "application/poc-settings+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/postscript": {
    source: "iana",
    compressible: !0,
    extensions: ["ai", "eps", "ps"],
  },
  "application/ppsp-tracker+json": { source: "iana", compressible: !0 },
  "application/problem+json": { source: "iana", compressible: !0 },
  "application/problem+xml": { source: "iana", compressible: !0 },
  "application/provenance+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["provx"],
  },
  "application/prs.alvestrand.titrax-sheet": { source: "iana" },
  "application/prs.cww": { source: "iana", extensions: ["cww"] },
  "application/prs.cyn": { source: "iana", charset: "7-BIT" },
  "application/prs.hpub+zip": { source: "iana", compressible: !1 },
  "application/prs.nprend": { source: "iana" },
  "application/prs.plucker": { source: "iana" },
  "application/prs.rdf-xml-crypt": { source: "iana" },
  "application/prs.xsf+xml": { source: "iana", compressible: !0 },
  "application/pskc+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["pskcxml"],
  },
  "application/pvd+json": { source: "iana", compressible: !0 },
  "application/qsig": { source: "iana" },
  "application/raml+yaml": { compressible: !0, extensions: ["raml"] },
  "application/raptorfec": { source: "iana" },
  "application/rdap+json": { source: "iana", compressible: !0 },
  "application/rdf+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["rdf", "owl"],
  },
  "application/reginfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["rif"],
  },
  "application/relax-ng-compact-syntax": {
    source: "iana",
    extensions: ["rnc"],
  },
  "application/remote-printing": { source: "iana" },
  "application/reputon+json": { source: "iana", compressible: !0 },
  "application/resource-lists+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["rl"],
  },
  "application/resource-lists-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["rld"],
  },
  "application/rfc+xml": { source: "iana", compressible: !0 },
  "application/riscos": { source: "iana" },
  "application/rlmi+xml": { source: "iana", compressible: !0 },
  "application/rls-services+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["rs"],
  },
  "application/route-apd+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["rapd"],
  },
  "application/route-s-tsid+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["sls"],
  },
  "application/route-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["rusd"],
  },
  "application/rpki-ghostbusters": { source: "iana", extensions: ["gbr"] },
  "application/rpki-manifest": { source: "iana", extensions: ["mft"] },
  "application/rpki-publication": { source: "iana" },
  "application/rpki-roa": { source: "iana", extensions: ["roa"] },
  "application/rpki-updown": { source: "iana" },
  "application/rsd+xml": {
    source: "apache",
    compressible: !0,
    extensions: ["rsd"],
  },
  "application/rss+xml": {
    source: "apache",
    compressible: !0,
    extensions: ["rss"],
  },
  "application/rtf": { source: "iana", compressible: !0, extensions: ["rtf"] },
  "application/rtploopback": { source: "iana" },
  "application/rtx": { source: "iana" },
  "application/samlassertion+xml": { source: "iana", compressible: !0 },
  "application/samlmetadata+xml": { source: "iana", compressible: !0 },
  "application/sarif+json": { source: "iana", compressible: !0 },
  "application/sarif-external-properties+json": {
    source: "iana",
    compressible: !0,
  },
  "application/sbe": { source: "iana" },
  "application/sbml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["sbml"],
  },
  "application/scaip+xml": { source: "iana", compressible: !0 },
  "application/scim+json": { source: "iana", compressible: !0 },
  "application/scvp-cv-request": { source: "iana", extensions: ["scq"] },
  "application/scvp-cv-response": { source: "iana", extensions: ["scs"] },
  "application/scvp-vp-request": { source: "iana", extensions: ["spq"] },
  "application/scvp-vp-response": { source: "iana", extensions: ["spp"] },
  "application/sdp": { source: "iana", extensions: ["sdp"] },
  "application/secevent+jwt": { source: "iana" },
  "application/senml+cbor": { source: "iana" },
  "application/senml+json": { source: "iana", compressible: !0 },
  "application/senml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["senmlx"],
  },
  "application/senml-etch+cbor": { source: "iana" },
  "application/senml-etch+json": { source: "iana", compressible: !0 },
  "application/senml-exi": { source: "iana" },
  "application/sensml+cbor": { source: "iana" },
  "application/sensml+json": { source: "iana", compressible: !0 },
  "application/sensml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["sensmlx"],
  },
  "application/sensml-exi": { source: "iana" },
  "application/sep+xml": { source: "iana", compressible: !0 },
  "application/sep-exi": { source: "iana" },
  "application/session-info": { source: "iana" },
  "application/set-payment": { source: "iana" },
  "application/set-payment-initiation": {
    source: "iana",
    extensions: ["setpay"],
  },
  "application/set-registration": { source: "iana" },
  "application/set-registration-initiation": {
    source: "iana",
    extensions: ["setreg"],
  },
  "application/sgml": { source: "iana" },
  "application/sgml-open-catalog": { source: "iana" },
  "application/shf+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["shf"],
  },
  "application/sieve": { source: "iana", extensions: ["siv", "sieve"] },
  "application/simple-filter+xml": { source: "iana", compressible: !0 },
  "application/simple-message-summary": { source: "iana" },
  "application/simplesymbolcontainer": { source: "iana" },
  "application/sipc": { source: "iana" },
  "application/slate": { source: "iana" },
  "application/smil": { source: "iana" },
  "application/smil+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["smi", "smil"],
  },
  "application/smpte336m": { source: "iana" },
  "application/soap+fastinfoset": { source: "iana" },
  "application/soap+xml": { source: "iana", compressible: !0 },
  "application/sparql-query": { source: "iana", extensions: ["rq"] },
  "application/sparql-results+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["srx"],
  },
  "application/spdx+json": { source: "iana", compressible: !0 },
  "application/spirits-event+xml": { source: "iana", compressible: !0 },
  "application/sql": { source: "iana" },
  "application/srgs": { source: "iana", extensions: ["gram"] },
  "application/srgs+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["grxml"],
  },
  "application/sru+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["sru"],
  },
  "application/ssdl+xml": {
    source: "apache",
    compressible: !0,
    extensions: ["ssdl"],
  },
  "application/ssml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["ssml"],
  },
  "application/stix+json": { source: "iana", compressible: !0 },
  "application/swid+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["swidtag"],
  },
  "application/tamp-apex-update": { source: "iana" },
  "application/tamp-apex-update-confirm": { source: "iana" },
  "application/tamp-community-update": { source: "iana" },
  "application/tamp-community-update-confirm": { source: "iana" },
  "application/tamp-error": { source: "iana" },
  "application/tamp-sequence-adjust": { source: "iana" },
  "application/tamp-sequence-adjust-confirm": { source: "iana" },
  "application/tamp-status-query": { source: "iana" },
  "application/tamp-status-response": { source: "iana" },
  "application/tamp-update": { source: "iana" },
  "application/tamp-update-confirm": { source: "iana" },
  "application/tar": { compressible: !0 },
  "application/taxii+json": { source: "iana", compressible: !0 },
  "application/td+json": { source: "iana", compressible: !0 },
  "application/tei+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["tei", "teicorpus"],
  },
  "application/tetra_isi": { source: "iana" },
  "application/thraud+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["tfi"],
  },
  "application/timestamp-query": { source: "iana" },
  "application/timestamp-reply": { source: "iana" },
  "application/timestamped-data": { source: "iana", extensions: ["tsd"] },
  "application/tlsrpt+gzip": { source: "iana" },
  "application/tlsrpt+json": { source: "iana", compressible: !0 },
  "application/tnauthlist": { source: "iana" },
  "application/token-introspection+jwt": { source: "iana" },
  "application/toml": { compressible: !0, extensions: ["toml"] },
  "application/trickle-ice-sdpfrag": { source: "iana" },
  "application/trig": { source: "iana", extensions: ["trig"] },
  "application/ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["ttml"],
  },
  "application/tve-trigger": { source: "iana" },
  "application/tzif": { source: "iana" },
  "application/tzif-leap": { source: "iana" },
  "application/ubjson": { compressible: !1, extensions: ["ubj"] },
  "application/ulpfec": { source: "iana" },
  "application/urc-grpsheet+xml": { source: "iana", compressible: !0 },
  "application/urc-ressheet+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["rsheet"],
  },
  "application/urc-targetdesc+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["td"],
  },
  "application/urc-uisocketdesc+xml": { source: "iana", compressible: !0 },
  "application/vcard+json": { source: "iana", compressible: !0 },
  "application/vcard+xml": { source: "iana", compressible: !0 },
  "application/vemmi": { source: "iana" },
  "application/vividence.scriptfile": { source: "apache" },
  "application/vnd.1000minds.decision-model+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["1km"],
  },
  "application/vnd.3gpp-prose+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp-prose-pc3ch+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp-v2x-local-service-information": { source: "iana" },
  "application/vnd.3gpp.5gnas": { source: "iana" },
  "application/vnd.3gpp.access-transfer-events+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.bsf+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.gmop+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.gtpc": { source: "iana" },
  "application/vnd.3gpp.interworking-data": { source: "iana" },
  "application/vnd.3gpp.lpp": { source: "iana" },
  "application/vnd.3gpp.mc-signalling-ear": { source: "iana" },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcdata-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcdata-payload": { source: "iana" },
  "application/vnd.3gpp.mcdata-service-config+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcdata-signalling": { source: "iana" },
  "application/vnd.3gpp.mcdata-ue-config+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcdata-user-profile+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcptt-floor-request+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcptt-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-location-info+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcptt-service-config+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcptt-signed+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-ue-config+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcptt-user-profile+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcvideo-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-location-info+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcvideo-service-config+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcvideo-ue-config+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mcvideo-user-profile+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.mid-call+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.ngap": { source: "iana" },
  "application/vnd.3gpp.pfcp": { source: "iana" },
  "application/vnd.3gpp.pic-bw-large": { source: "iana", extensions: ["plb"] },
  "application/vnd.3gpp.pic-bw-small": { source: "iana", extensions: ["psb"] },
  "application/vnd.3gpp.pic-bw-var": { source: "iana", extensions: ["pvb"] },
  "application/vnd.3gpp.s1ap": { source: "iana" },
  "application/vnd.3gpp.sms": { source: "iana" },
  "application/vnd.3gpp.sms+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.srvcc-ext+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.srvcc-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.state-and-event-info+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.3gpp.ussd+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp2.bcmcsinfo+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp2.sms": { source: "iana" },
  "application/vnd.3gpp2.tcap": { source: "iana", extensions: ["tcap"] },
  "application/vnd.3lightssoftware.imagescal": { source: "iana" },
  "application/vnd.3m.post-it-notes": { source: "iana", extensions: ["pwn"] },
  "application/vnd.accpac.simply.aso": { source: "iana", extensions: ["aso"] },
  "application/vnd.accpac.simply.imp": { source: "iana", extensions: ["imp"] },
  "application/vnd.acucobol": { source: "iana", extensions: ["acu"] },
  "application/vnd.acucorp": { source: "iana", extensions: ["atc", "acutc"] },
  "application/vnd.adobe.air-application-installer-package+zip": {
    source: "apache",
    compressible: !1,
    extensions: ["air"],
  },
  "application/vnd.adobe.flash.movie": { source: "iana" },
  "application/vnd.adobe.formscentral.fcdt": {
    source: "iana",
    extensions: ["fcdt"],
  },
  "application/vnd.adobe.fxp": { source: "iana", extensions: ["fxp", "fxpl"] },
  "application/vnd.adobe.partial-upload": { source: "iana" },
  "application/vnd.adobe.xdp+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xdp"],
  },
  "application/vnd.adobe.xfdf": { source: "iana", extensions: ["xfdf"] },
  "application/vnd.aether.imp": { source: "iana" },
  "application/vnd.afpc.afplinedata": { source: "iana" },
  "application/vnd.afpc.afplinedata-pagedef": { source: "iana" },
  "application/vnd.afpc.cmoca-cmresource": { source: "iana" },
  "application/vnd.afpc.foca-charset": { source: "iana" },
  "application/vnd.afpc.foca-codedfont": { source: "iana" },
  "application/vnd.afpc.foca-codepage": { source: "iana" },
  "application/vnd.afpc.modca": { source: "iana" },
  "application/vnd.afpc.modca-cmtable": { source: "iana" },
  "application/vnd.afpc.modca-formdef": { source: "iana" },
  "application/vnd.afpc.modca-mediummap": { source: "iana" },
  "application/vnd.afpc.modca-objectcontainer": { source: "iana" },
  "application/vnd.afpc.modca-overlay": { source: "iana" },
  "application/vnd.afpc.modca-pagesegment": { source: "iana" },
  "application/vnd.age": { source: "iana", extensions: ["age"] },
  "application/vnd.ah-barcode": { source: "iana" },
  "application/vnd.ahead.space": { source: "iana", extensions: ["ahead"] },
  "application/vnd.airzip.filesecure.azf": {
    source: "iana",
    extensions: ["azf"],
  },
  "application/vnd.airzip.filesecure.azs": {
    source: "iana",
    extensions: ["azs"],
  },
  "application/vnd.amadeus+json": { source: "iana", compressible: !0 },
  "application/vnd.amazon.ebook": { source: "apache", extensions: ["azw"] },
  "application/vnd.amazon.mobi8-ebook": { source: "iana" },
  "application/vnd.americandynamics.acc": {
    source: "iana",
    extensions: ["acc"],
  },
  "application/vnd.amiga.ami": { source: "iana", extensions: ["ami"] },
  "application/vnd.amundsen.maze+xml": { source: "iana", compressible: !0 },
  "application/vnd.android.ota": { source: "iana" },
  "application/vnd.android.package-archive": {
    source: "apache",
    compressible: !1,
    extensions: ["apk"],
  },
  "application/vnd.anki": { source: "iana" },
  "application/vnd.anser-web-certificate-issue-initiation": {
    source: "iana",
    extensions: ["cii"],
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    source: "apache",
    extensions: ["fti"],
  },
  "application/vnd.antix.game-component": {
    source: "iana",
    extensions: ["atx"],
  },
  "application/vnd.apache.arrow.file": { source: "iana" },
  "application/vnd.apache.arrow.stream": { source: "iana" },
  "application/vnd.apache.thrift.binary": { source: "iana" },
  "application/vnd.apache.thrift.compact": { source: "iana" },
  "application/vnd.apache.thrift.json": { source: "iana" },
  "application/vnd.api+json": { source: "iana", compressible: !0 },
  "application/vnd.aplextor.warrp+json": { source: "iana", compressible: !0 },
  "application/vnd.apothekende.reservation+json": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.apple.installer+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["mpkg"],
  },
  "application/vnd.apple.keynote": { source: "iana", extensions: ["key"] },
  "application/vnd.apple.mpegurl": { source: "iana", extensions: ["m3u8"] },
  "application/vnd.apple.numbers": { source: "iana", extensions: ["numbers"] },
  "application/vnd.apple.pages": { source: "iana", extensions: ["pages"] },
  "application/vnd.apple.pkpass": { compressible: !1, extensions: ["pkpass"] },
  "application/vnd.arastra.swi": { source: "iana" },
  "application/vnd.aristanetworks.swi": { source: "iana", extensions: ["swi"] },
  "application/vnd.artisan+json": { source: "iana", compressible: !0 },
  "application/vnd.artsquare": { source: "iana" },
  "application/vnd.astraea-software.iota": {
    source: "iana",
    extensions: ["iota"],
  },
  "application/vnd.audiograph": { source: "iana", extensions: ["aep"] },
  "application/vnd.autopackage": { source: "iana" },
  "application/vnd.avalon+json": { source: "iana", compressible: !0 },
  "application/vnd.avistar+xml": { source: "iana", compressible: !0 },
  "application/vnd.balsamiq.bmml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["bmml"],
  },
  "application/vnd.balsamiq.bmpr": { source: "iana" },
  "application/vnd.banana-accounting": { source: "iana" },
  "application/vnd.bbf.usp.error": { source: "iana" },
  "application/vnd.bbf.usp.msg": { source: "iana" },
  "application/vnd.bbf.usp.msg+json": { source: "iana", compressible: !0 },
  "application/vnd.bekitzur-stech+json": { source: "iana", compressible: !0 },
  "application/vnd.bint.med-content": { source: "iana" },
  "application/vnd.biopax.rdf+xml": { source: "iana", compressible: !0 },
  "application/vnd.blink-idb-value-wrapper": { source: "iana" },
  "application/vnd.blueice.multipass": { source: "iana", extensions: ["mpm"] },
  "application/vnd.bluetooth.ep.oob": { source: "iana" },
  "application/vnd.bluetooth.le.oob": { source: "iana" },
  "application/vnd.bmi": { source: "iana", extensions: ["bmi"] },
  "application/vnd.bpf": { source: "iana" },
  "application/vnd.bpf3": { source: "iana" },
  "application/vnd.businessobjects": { source: "iana", extensions: ["rep"] },
  "application/vnd.byu.uapi+json": { source: "iana", compressible: !0 },
  "application/vnd.cab-jscript": { source: "iana" },
  "application/vnd.canon-cpdl": { source: "iana" },
  "application/vnd.canon-lips": { source: "iana" },
  "application/vnd.capasystems-pg+json": { source: "iana", compressible: !0 },
  "application/vnd.cendio.thinlinc.clientconf": { source: "iana" },
  "application/vnd.century-systems.tcp_stream": { source: "iana" },
  "application/vnd.chemdraw+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["cdxml"],
  },
  "application/vnd.chess-pgn": { source: "iana" },
  "application/vnd.chipnuts.karaoke-mmd": {
    source: "iana",
    extensions: ["mmd"],
  },
  "application/vnd.ciedi": { source: "iana" },
  "application/vnd.cinderella": { source: "iana", extensions: ["cdy"] },
  "application/vnd.cirpack.isdn-ext": { source: "iana" },
  "application/vnd.citationstyles.style+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["csl"],
  },
  "application/vnd.claymore": { source: "iana", extensions: ["cla"] },
  "application/vnd.cloanto.rp9": { source: "iana", extensions: ["rp9"] },
  "application/vnd.clonk.c4group": {
    source: "iana",
    extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"],
  },
  "application/vnd.cluetrust.cartomobile-config": {
    source: "iana",
    extensions: ["c11amc"],
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    source: "iana",
    extensions: ["c11amz"],
  },
  "application/vnd.coffeescript": { source: "iana" },
  "application/vnd.collabio.xodocuments.document": { source: "iana" },
  "application/vnd.collabio.xodocuments.document-template": { source: "iana" },
  "application/vnd.collabio.xodocuments.presentation": { source: "iana" },
  "application/vnd.collabio.xodocuments.presentation-template": {
    source: "iana",
  },
  "application/vnd.collabio.xodocuments.spreadsheet": { source: "iana" },
  "application/vnd.collabio.xodocuments.spreadsheet-template": {
    source: "iana",
  },
  "application/vnd.collection+json": { source: "iana", compressible: !0 },
  "application/vnd.collection.doc+json": { source: "iana", compressible: !0 },
  "application/vnd.collection.next+json": { source: "iana", compressible: !0 },
  "application/vnd.comicbook+zip": { source: "iana", compressible: !1 },
  "application/vnd.comicbook-rar": { source: "iana" },
  "application/vnd.commerce-battelle": { source: "iana" },
  "application/vnd.commonspace": { source: "iana", extensions: ["csp"] },
  "application/vnd.contact.cmsg": { source: "iana", extensions: ["cdbcmsg"] },
  "application/vnd.coreos.ignition+json": { source: "iana", compressible: !0 },
  "application/vnd.cosmocaller": { source: "iana", extensions: ["cmc"] },
  "application/vnd.crick.clicker": { source: "iana", extensions: ["clkx"] },
  "application/vnd.crick.clicker.keyboard": {
    source: "iana",
    extensions: ["clkk"],
  },
  "application/vnd.crick.clicker.palette": {
    source: "iana",
    extensions: ["clkp"],
  },
  "application/vnd.crick.clicker.template": {
    source: "iana",
    extensions: ["clkt"],
  },
  "application/vnd.crick.clicker.wordbank": {
    source: "iana",
    extensions: ["clkw"],
  },
  "application/vnd.criticaltools.wbs+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["wbs"],
  },
  "application/vnd.cryptii.pipe+json": { source: "iana", compressible: !0 },
  "application/vnd.crypto-shade-file": { source: "iana" },
  "application/vnd.cryptomator.encrypted": { source: "iana" },
  "application/vnd.cryptomator.vault": { source: "iana" },
  "application/vnd.ctc-posml": { source: "iana", extensions: ["pml"] },
  "application/vnd.ctct.ws+xml": { source: "iana", compressible: !0 },
  "application/vnd.cups-pdf": { source: "iana" },
  "application/vnd.cups-postscript": { source: "iana" },
  "application/vnd.cups-ppd": { source: "iana", extensions: ["ppd"] },
  "application/vnd.cups-raster": { source: "iana" },
  "application/vnd.cups-raw": { source: "iana" },
  "application/vnd.curl": { source: "iana" },
  "application/vnd.curl.car": { source: "apache", extensions: ["car"] },
  "application/vnd.curl.pcurl": { source: "apache", extensions: ["pcurl"] },
  "application/vnd.cyan.dean.root+xml": { source: "iana", compressible: !0 },
  "application/vnd.cybank": { source: "iana" },
  "application/vnd.cyclonedx+json": { source: "iana", compressible: !0 },
  "application/vnd.cyclonedx+xml": { source: "iana", compressible: !0 },
  "application/vnd.d2l.coursepackage1p0+zip": {
    source: "iana",
    compressible: !1,
  },
  "application/vnd.d3m-dataset": { source: "iana" },
  "application/vnd.d3m-problem": { source: "iana" },
  "application/vnd.dart": {
    source: "iana",
    compressible: !0,
    extensions: ["dart"],
  },
  "application/vnd.data-vision.rdz": { source: "iana", extensions: ["rdz"] },
  "application/vnd.datapackage+json": { source: "iana", compressible: !0 },
  "application/vnd.dataresource+json": { source: "iana", compressible: !0 },
  "application/vnd.dbf": { source: "iana", extensions: ["dbf"] },
  "application/vnd.debian.binary-package": { source: "iana" },
  "application/vnd.dece.data": {
    source: "iana",
    extensions: ["uvf", "uvvf", "uvd", "uvvd"],
  },
  "application/vnd.dece.ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["uvt", "uvvt"],
  },
  "application/vnd.dece.unspecified": {
    source: "iana",
    extensions: ["uvx", "uvvx"],
  },
  "application/vnd.dece.zip": { source: "iana", extensions: ["uvz", "uvvz"] },
  "application/vnd.denovo.fcselayout-link": {
    source: "iana",
    extensions: ["fe_launch"],
  },
  "application/vnd.desmume.movie": { source: "iana" },
  "application/vnd.dir-bi.plate-dl-nosuffix": { source: "iana" },
  "application/vnd.dm.delegation+xml": { source: "iana", compressible: !0 },
  "application/vnd.dna": { source: "iana", extensions: ["dna"] },
  "application/vnd.document+json": { source: "iana", compressible: !0 },
  "application/vnd.dolby.mlp": { source: "apache", extensions: ["mlp"] },
  "application/vnd.dolby.mobile.1": { source: "iana" },
  "application/vnd.dolby.mobile.2": { source: "iana" },
  "application/vnd.doremir.scorecloud-binary-document": { source: "iana" },
  "application/vnd.dpgraph": { source: "iana", extensions: ["dpg"] },
  "application/vnd.dreamfactory": { source: "iana", extensions: ["dfac"] },
  "application/vnd.drive+json": { source: "iana", compressible: !0 },
  "application/vnd.ds-keypoint": { source: "apache", extensions: ["kpxx"] },
  "application/vnd.dtg.local": { source: "iana" },
  "application/vnd.dtg.local.flash": { source: "iana" },
  "application/vnd.dtg.local.html": { source: "iana" },
  "application/vnd.dvb.ait": { source: "iana", extensions: ["ait"] },
  "application/vnd.dvb.dvbisl+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.dvbj": { source: "iana" },
  "application/vnd.dvb.esgcontainer": { source: "iana" },
  "application/vnd.dvb.ipdcdftnotifaccess": { source: "iana" },
  "application/vnd.dvb.ipdcesgaccess": { source: "iana" },
  "application/vnd.dvb.ipdcesgaccess2": { source: "iana" },
  "application/vnd.dvb.ipdcesgpdd": { source: "iana" },
  "application/vnd.dvb.ipdcroaming": { source: "iana" },
  "application/vnd.dvb.iptv.alfec-base": { source: "iana" },
  "application/vnd.dvb.iptv.alfec-enhancement": { source: "iana" },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.dvb.notif-container+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.dvb.notif-generic+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.dvb.notif-init+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.pfr": { source: "iana" },
  "application/vnd.dvb.service": { source: "iana", extensions: ["svc"] },
  "application/vnd.dxr": { source: "iana" },
  "application/vnd.dynageo": { source: "iana", extensions: ["geo"] },
  "application/vnd.dzr": { source: "iana" },
  "application/vnd.easykaraoke.cdgdownload": { source: "iana" },
  "application/vnd.ecdis-update": { source: "iana" },
  "application/vnd.ecip.rlp": { source: "iana" },
  "application/vnd.eclipse.ditto+json": { source: "iana", compressible: !0 },
  "application/vnd.ecowin.chart": { source: "iana", extensions: ["mag"] },
  "application/vnd.ecowin.filerequest": { source: "iana" },
  "application/vnd.ecowin.fileupdate": { source: "iana" },
  "application/vnd.ecowin.series": { source: "iana" },
  "application/vnd.ecowin.seriesrequest": { source: "iana" },
  "application/vnd.ecowin.seriesupdate": { source: "iana" },
  "application/vnd.efi.img": { source: "iana" },
  "application/vnd.efi.iso": { source: "iana" },
  "application/vnd.emclient.accessrequest+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.enliven": { source: "iana", extensions: ["nml"] },
  "application/vnd.enphase.envoy": { source: "iana" },
  "application/vnd.eprints.data+xml": { source: "iana", compressible: !0 },
  "application/vnd.epson.esf": { source: "iana", extensions: ["esf"] },
  "application/vnd.epson.msf": { source: "iana", extensions: ["msf"] },
  "application/vnd.epson.quickanime": { source: "iana", extensions: ["qam"] },
  "application/vnd.epson.salt": { source: "iana", extensions: ["slt"] },
  "application/vnd.epson.ssf": { source: "iana", extensions: ["ssf"] },
  "application/vnd.ericsson.quickcall": { source: "iana" },
  "application/vnd.espass-espass+zip": { source: "iana", compressible: !1 },
  "application/vnd.eszigno3+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["es3", "et3"],
  },
  "application/vnd.etsi.aoc+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.asic-e+zip": { source: "iana", compressible: !1 },
  "application/vnd.etsi.asic-s+zip": { source: "iana", compressible: !1 },
  "application/vnd.etsi.cug+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvcommand+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvdiscovery+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.etsi.iptvprofile+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvsad-bc+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvsad-cod+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvsad-npvr+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvservice+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvsync+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvueprofile+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.etsi.mcid+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.mheg5": { source: "iana" },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.etsi.pstn+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.sci+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.simservs+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.timestamp-token": { source: "iana" },
  "application/vnd.etsi.tsl+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.tsl.der": { source: "iana" },
  "application/vnd.eu.kasparian.car+json": { source: "iana", compressible: !0 },
  "application/vnd.eudora.data": { source: "iana" },
  "application/vnd.evolv.ecig.profile": { source: "iana" },
  "application/vnd.evolv.ecig.settings": { source: "iana" },
  "application/vnd.evolv.ecig.theme": { source: "iana" },
  "application/vnd.exstream-empower+zip": { source: "iana", compressible: !1 },
  "application/vnd.exstream-package": { source: "iana" },
  "application/vnd.ezpix-album": { source: "iana", extensions: ["ez2"] },
  "application/vnd.ezpix-package": { source: "iana", extensions: ["ez3"] },
  "application/vnd.f-secure.mobile": { source: "iana" },
  "application/vnd.familysearch.gedcom+zip": {
    source: "iana",
    compressible: !1,
  },
  "application/vnd.fastcopy-disk-image": { source: "iana" },
  "application/vnd.fdf": { source: "iana", extensions: ["fdf"] },
  "application/vnd.fdsn.mseed": { source: "iana", extensions: ["mseed"] },
  "application/vnd.fdsn.seed": {
    source: "iana",
    extensions: ["seed", "dataless"],
  },
  "application/vnd.ffsns": { source: "iana" },
  "application/vnd.ficlab.flb+zip": { source: "iana", compressible: !1 },
  "application/vnd.filmit.zfc": { source: "iana" },
  "application/vnd.fints": { source: "iana" },
  "application/vnd.firemonkeys.cloudcell": { source: "iana" },
  "application/vnd.flographit": { source: "iana", extensions: ["gph"] },
  "application/vnd.fluxtime.clip": { source: "iana", extensions: ["ftc"] },
  "application/vnd.font-fontforge-sfd": { source: "iana" },
  "application/vnd.framemaker": {
    source: "iana",
    extensions: ["fm", "frame", "maker", "book"],
  },
  "application/vnd.frogans.fnc": { source: "iana", extensions: ["fnc"] },
  "application/vnd.frogans.ltf": { source: "iana", extensions: ["ltf"] },
  "application/vnd.fsc.weblaunch": { source: "iana", extensions: ["fsc"] },
  "application/vnd.fujifilm.fb.docuworks": { source: "iana" },
  "application/vnd.fujifilm.fb.docuworks.binder": { source: "iana" },
  "application/vnd.fujifilm.fb.docuworks.container": { source: "iana" },
  "application/vnd.fujifilm.fb.jfi+xml": { source: "iana", compressible: !0 },
  "application/vnd.fujitsu.oasys": { source: "iana", extensions: ["oas"] },
  "application/vnd.fujitsu.oasys2": { source: "iana", extensions: ["oa2"] },
  "application/vnd.fujitsu.oasys3": { source: "iana", extensions: ["oa3"] },
  "application/vnd.fujitsu.oasysgp": { source: "iana", extensions: ["fg5"] },
  "application/vnd.fujitsu.oasysprs": { source: "iana", extensions: ["bh2"] },
  "application/vnd.fujixerox.art-ex": { source: "iana" },
  "application/vnd.fujixerox.art4": { source: "iana" },
  "application/vnd.fujixerox.ddd": { source: "iana", extensions: ["ddd"] },
  "application/vnd.fujixerox.docuworks": {
    source: "iana",
    extensions: ["xdw"],
  },
  "application/vnd.fujixerox.docuworks.binder": {
    source: "iana",
    extensions: ["xbd"],
  },
  "application/vnd.fujixerox.docuworks.container": { source: "iana" },
  "application/vnd.fujixerox.hbpl": { source: "iana" },
  "application/vnd.fut-misnet": { source: "iana" },
  "application/vnd.futoin+cbor": { source: "iana" },
  "application/vnd.futoin+json": { source: "iana", compressible: !0 },
  "application/vnd.fuzzysheet": { source: "iana", extensions: ["fzs"] },
  "application/vnd.genomatix.tuxedo": { source: "iana", extensions: ["txd"] },
  "application/vnd.gentics.grd+json": { source: "iana", compressible: !0 },
  "application/vnd.geo+json": { source: "iana", compressible: !0 },
  "application/vnd.geocube+xml": { source: "iana", compressible: !0 },
  "application/vnd.geogebra.file": { source: "iana", extensions: ["ggb"] },
  "application/vnd.geogebra.slides": { source: "iana" },
  "application/vnd.geogebra.tool": { source: "iana", extensions: ["ggt"] },
  "application/vnd.geometry-explorer": {
    source: "iana",
    extensions: ["gex", "gre"],
  },
  "application/vnd.geonext": { source: "iana", extensions: ["gxt"] },
  "application/vnd.geoplan": { source: "iana", extensions: ["g2w"] },
  "application/vnd.geospace": { source: "iana", extensions: ["g3w"] },
  "application/vnd.gerber": { source: "iana" },
  "application/vnd.globalplatform.card-content-mgt": { source: "iana" },
  "application/vnd.globalplatform.card-content-mgt-response": {
    source: "iana",
  },
  "application/vnd.gmx": { source: "iana", extensions: ["gmx"] },
  "application/vnd.google-apps.document": {
    compressible: !1,
    extensions: ["gdoc"],
  },
  "application/vnd.google-apps.presentation": {
    compressible: !1,
    extensions: ["gslides"],
  },
  "application/vnd.google-apps.spreadsheet": {
    compressible: !1,
    extensions: ["gsheet"],
  },
  "application/vnd.google-earth.kml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["kml"],
  },
  "application/vnd.google-earth.kmz": {
    source: "iana",
    compressible: !1,
    extensions: ["kmz"],
  },
  "application/vnd.gov.sk.e-form+xml": { source: "iana", compressible: !0 },
  "application/vnd.gov.sk.e-form+zip": { source: "iana", compressible: !1 },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.grafeq": { source: "iana", extensions: ["gqf", "gqs"] },
  "application/vnd.gridmp": { source: "iana" },
  "application/vnd.groove-account": { source: "iana", extensions: ["gac"] },
  "application/vnd.groove-help": { source: "iana", extensions: ["ghf"] },
  "application/vnd.groove-identity-message": {
    source: "iana",
    extensions: ["gim"],
  },
  "application/vnd.groove-injector": { source: "iana", extensions: ["grv"] },
  "application/vnd.groove-tool-message": {
    source: "iana",
    extensions: ["gtm"],
  },
  "application/vnd.groove-tool-template": {
    source: "iana",
    extensions: ["tpl"],
  },
  "application/vnd.groove-vcard": { source: "iana", extensions: ["vcg"] },
  "application/vnd.hal+json": { source: "iana", compressible: !0 },
  "application/vnd.hal+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["hal"],
  },
  "application/vnd.handheld-entertainment+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["zmm"],
  },
  "application/vnd.hbci": { source: "iana", extensions: ["hbci"] },
  "application/vnd.hc+json": { source: "iana", compressible: !0 },
  "application/vnd.hcl-bireports": { source: "iana" },
  "application/vnd.hdt": { source: "iana" },
  "application/vnd.heroku+json": { source: "iana", compressible: !0 },
  "application/vnd.hhe.lesson-player": { source: "iana", extensions: ["les"] },
  "application/vnd.hl7cda+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/vnd.hl7v2+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/vnd.hp-hpgl": { source: "iana", extensions: ["hpgl"] },
  "application/vnd.hp-hpid": { source: "iana", extensions: ["hpid"] },
  "application/vnd.hp-hps": { source: "iana", extensions: ["hps"] },
  "application/vnd.hp-jlyt": { source: "iana", extensions: ["jlt"] },
  "application/vnd.hp-pcl": { source: "iana", extensions: ["pcl"] },
  "application/vnd.hp-pclxl": { source: "iana", extensions: ["pclxl"] },
  "application/vnd.httphone": { source: "iana" },
  "application/vnd.hydrostatix.sof-data": {
    source: "iana",
    extensions: ["sfd-hdstx"],
  },
  "application/vnd.hyper+json": { source: "iana", compressible: !0 },
  "application/vnd.hyper-item+json": { source: "iana", compressible: !0 },
  "application/vnd.hyperdrive+json": { source: "iana", compressible: !0 },
  "application/vnd.hzn-3d-crossword": { source: "iana" },
  "application/vnd.ibm.afplinedata": { source: "iana" },
  "application/vnd.ibm.electronic-media": { source: "iana" },
  "application/vnd.ibm.minipay": { source: "iana", extensions: ["mpy"] },
  "application/vnd.ibm.modcap": {
    source: "iana",
    extensions: ["afp", "listafp", "list3820"],
  },
  "application/vnd.ibm.rights-management": {
    source: "iana",
    extensions: ["irm"],
  },
  "application/vnd.ibm.secure-container": {
    source: "iana",
    extensions: ["sc"],
  },
  "application/vnd.iccprofile": { source: "iana", extensions: ["icc", "icm"] },
  "application/vnd.ieee.1905": { source: "iana" },
  "application/vnd.igloader": { source: "iana", extensions: ["igl"] },
  "application/vnd.imagemeter.folder+zip": { source: "iana", compressible: !1 },
  "application/vnd.imagemeter.image+zip": { source: "iana", compressible: !1 },
  "application/vnd.immervision-ivp": { source: "iana", extensions: ["ivp"] },
  "application/vnd.immervision-ivu": { source: "iana", extensions: ["ivu"] },
  "application/vnd.ims.imsccv1p1": { source: "iana" },
  "application/vnd.ims.imsccv1p2": { source: "iana" },
  "application/vnd.ims.imsccv1p3": { source: "iana" },
  "application/vnd.ims.lis.v2.result+json": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.informedcontrol.rms+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.informix-visionary": { source: "iana" },
  "application/vnd.infotech.project": { source: "iana" },
  "application/vnd.infotech.project+xml": { source: "iana", compressible: !0 },
  "application/vnd.innopath.wamp.notification": { source: "iana" },
  "application/vnd.insors.igm": { source: "iana", extensions: ["igm"] },
  "application/vnd.intercon.formnet": {
    source: "iana",
    extensions: ["xpw", "xpx"],
  },
  "application/vnd.intergeo": { source: "iana", extensions: ["i2g"] },
  "application/vnd.intertrust.digibox": { source: "iana" },
  "application/vnd.intertrust.nncp": { source: "iana" },
  "application/vnd.intu.qbo": { source: "iana", extensions: ["qbo"] },
  "application/vnd.intu.qfx": { source: "iana", extensions: ["qfx"] },
  "application/vnd.iptc.g2.catalogitem+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.iptc.g2.newsitem+xml": { source: "iana", compressible: !0 },
  "application/vnd.iptc.g2.newsmessage+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.ipunplugged.rcprofile": {
    source: "iana",
    extensions: ["rcprofile"],
  },
  "application/vnd.irepository.package+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["irp"],
  },
  "application/vnd.is-xpr": { source: "iana", extensions: ["xpr"] },
  "application/vnd.isac.fcs": { source: "iana", extensions: ["fcs"] },
  "application/vnd.iso11783-10+zip": { source: "iana", compressible: !1 },
  "application/vnd.jam": { source: "iana", extensions: ["jam"] },
  "application/vnd.japannet-directory-service": { source: "iana" },
  "application/vnd.japannet-jpnstore-wakeup": { source: "iana" },
  "application/vnd.japannet-payment-wakeup": { source: "iana" },
  "application/vnd.japannet-registration": { source: "iana" },
  "application/vnd.japannet-registration-wakeup": { source: "iana" },
  "application/vnd.japannet-setstore-wakeup": { source: "iana" },
  "application/vnd.japannet-verification": { source: "iana" },
  "application/vnd.japannet-verification-wakeup": { source: "iana" },
  "application/vnd.jcp.javame.midlet-rms": {
    source: "iana",
    extensions: ["rms"],
  },
  "application/vnd.jisp": { source: "iana", extensions: ["jisp"] },
  "application/vnd.joost.joda-archive": {
    source: "iana",
    extensions: ["joda"],
  },
  "application/vnd.jsk.isdn-ngn": { source: "iana" },
  "application/vnd.kahootz": { source: "iana", extensions: ["ktz", "ktr"] },
  "application/vnd.kde.karbon": { source: "iana", extensions: ["karbon"] },
  "application/vnd.kde.kchart": { source: "iana", extensions: ["chrt"] },
  "application/vnd.kde.kformula": { source: "iana", extensions: ["kfo"] },
  "application/vnd.kde.kivio": { source: "iana", extensions: ["flw"] },
  "application/vnd.kde.kontour": { source: "iana", extensions: ["kon"] },
  "application/vnd.kde.kpresenter": {
    source: "iana",
    extensions: ["kpr", "kpt"],
  },
  "application/vnd.kde.kspread": { source: "iana", extensions: ["ksp"] },
  "application/vnd.kde.kword": { source: "iana", extensions: ["kwd", "kwt"] },
  "application/vnd.kenameaapp": { source: "iana", extensions: ["htke"] },
  "application/vnd.kidspiration": { source: "iana", extensions: ["kia"] },
  "application/vnd.kinar": { source: "iana", extensions: ["kne", "knp"] },
  "application/vnd.koan": {
    source: "iana",
    extensions: ["skp", "skd", "skt", "skm"],
  },
  "application/vnd.kodak-descriptor": { source: "iana", extensions: ["sse"] },
  "application/vnd.las": { source: "iana" },
  "application/vnd.las.las+json": { source: "iana", compressible: !0 },
  "application/vnd.las.las+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["lasxml"],
  },
  "application/vnd.laszip": { source: "iana" },
  "application/vnd.leap+json": { source: "iana", compressible: !0 },
  "application/vnd.liberty-request+xml": { source: "iana", compressible: !0 },
  "application/vnd.llamagraphics.life-balance.desktop": {
    source: "iana",
    extensions: ["lbd"],
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["lbe"],
  },
  "application/vnd.logipipe.circuit+zip": { source: "iana", compressible: !1 },
  "application/vnd.loom": { source: "iana" },
  "application/vnd.lotus-1-2-3": { source: "iana", extensions: ["123"] },
  "application/vnd.lotus-approach": { source: "iana", extensions: ["apr"] },
  "application/vnd.lotus-freelance": { source: "iana", extensions: ["pre"] },
  "application/vnd.lotus-notes": { source: "iana", extensions: ["nsf"] },
  "application/vnd.lotus-organizer": { source: "iana", extensions: ["org"] },
  "application/vnd.lotus-screencam": { source: "iana", extensions: ["scm"] },
  "application/vnd.lotus-wordpro": { source: "iana", extensions: ["lwp"] },
  "application/vnd.macports.portpkg": {
    source: "iana",
    extensions: ["portpkg"],
  },
  "application/vnd.mapbox-vector-tile": { source: "iana", extensions: ["mvt"] },
  "application/vnd.marlin.drm.actiontoken+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.marlin.drm.license+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.marlin.drm.mdcf": { source: "iana" },
  "application/vnd.mason+json": { source: "iana", compressible: !0 },
  "application/vnd.maxar.archive.3tz+zip": { source: "iana", compressible: !1 },
  "application/vnd.maxmind.maxmind-db": { source: "iana" },
  "application/vnd.mcd": { source: "iana", extensions: ["mcd"] },
  "application/vnd.medcalcdata": { source: "iana", extensions: ["mc1"] },
  "application/vnd.mediastation.cdkey": {
    source: "iana",
    extensions: ["cdkey"],
  },
  "application/vnd.meridian-slingshot": { source: "iana" },
  "application/vnd.mfer": { source: "iana", extensions: ["mwf"] },
  "application/vnd.mfmp": { source: "iana", extensions: ["mfm"] },
  "application/vnd.micro+json": { source: "iana", compressible: !0 },
  "application/vnd.micrografx.flo": { source: "iana", extensions: ["flo"] },
  "application/vnd.micrografx.igx": { source: "iana", extensions: ["igx"] },
  "application/vnd.microsoft.portable-executable": { source: "iana" },
  "application/vnd.microsoft.windows.thumbnail-cache": { source: "iana" },
  "application/vnd.miele+json": { source: "iana", compressible: !0 },
  "application/vnd.mif": { source: "iana", extensions: ["mif"] },
  "application/vnd.minisoft-hp3000-save": { source: "iana" },
  "application/vnd.mitsubishi.misty-guard.trustweb": { source: "iana" },
  "application/vnd.mobius.daf": { source: "iana", extensions: ["daf"] },
  "application/vnd.mobius.dis": { source: "iana", extensions: ["dis"] },
  "application/vnd.mobius.mbk": { source: "iana", extensions: ["mbk"] },
  "application/vnd.mobius.mqy": { source: "iana", extensions: ["mqy"] },
  "application/vnd.mobius.msl": { source: "iana", extensions: ["msl"] },
  "application/vnd.mobius.plc": { source: "iana", extensions: ["plc"] },
  "application/vnd.mobius.txf": { source: "iana", extensions: ["txf"] },
  "application/vnd.mophun.application": { source: "iana", extensions: ["mpn"] },
  "application/vnd.mophun.certificate": { source: "iana", extensions: ["mpc"] },
  "application/vnd.motorola.flexsuite": { source: "iana" },
  "application/vnd.motorola.flexsuite.adsi": { source: "iana" },
  "application/vnd.motorola.flexsuite.fis": { source: "iana" },
  "application/vnd.motorola.flexsuite.gotap": { source: "iana" },
  "application/vnd.motorola.flexsuite.kmr": { source: "iana" },
  "application/vnd.motorola.flexsuite.ttc": { source: "iana" },
  "application/vnd.motorola.flexsuite.wem": { source: "iana" },
  "application/vnd.motorola.iprm": { source: "iana" },
  "application/vnd.mozilla.xul+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xul"],
  },
  "application/vnd.ms-3mfdocument": { source: "iana" },
  "application/vnd.ms-artgalry": { source: "iana", extensions: ["cil"] },
  "application/vnd.ms-asf": { source: "iana" },
  "application/vnd.ms-cab-compressed": { source: "iana", extensions: ["cab"] },
  "application/vnd.ms-color.iccprofile": { source: "apache" },
  "application/vnd.ms-excel": {
    source: "iana",
    compressible: !1,
    extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    source: "iana",
    extensions: ["xlam"],
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    source: "iana",
    extensions: ["xlsb"],
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    source: "iana",
    extensions: ["xlsm"],
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    source: "iana",
    extensions: ["xltm"],
  },
  "application/vnd.ms-fontobject": {
    source: "iana",
    compressible: !0,
    extensions: ["eot"],
  },
  "application/vnd.ms-htmlhelp": { source: "iana", extensions: ["chm"] },
  "application/vnd.ms-ims": { source: "iana", extensions: ["ims"] },
  "application/vnd.ms-lrm": { source: "iana", extensions: ["lrm"] },
  "application/vnd.ms-office.activex+xml": { source: "iana", compressible: !0 },
  "application/vnd.ms-officetheme": { source: "iana", extensions: ["thmx"] },
  "application/vnd.ms-opentype": { source: "apache", compressible: !0 },
  "application/vnd.ms-outlook": { compressible: !1, extensions: ["msg"] },
  "application/vnd.ms-package.obfuscated-opentype": { source: "apache" },
  "application/vnd.ms-pki.seccat": { source: "apache", extensions: ["cat"] },
  "application/vnd.ms-pki.stl": { source: "apache", extensions: ["stl"] },
  "application/vnd.ms-playready.initiator+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.ms-powerpoint": {
    source: "iana",
    compressible: !1,
    extensions: ["ppt", "pps", "pot"],
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    source: "iana",
    extensions: ["ppam"],
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    source: "iana",
    extensions: ["pptm"],
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    source: "iana",
    extensions: ["sldm"],
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    source: "iana",
    extensions: ["ppsm"],
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    source: "iana",
    extensions: ["potm"],
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.ms-printing.printticket+xml": {
    source: "apache",
    compressible: !0,
  },
  "application/vnd.ms-printschematicket+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.ms-project": { source: "iana", extensions: ["mpp", "mpt"] },
  "application/vnd.ms-tnef": { source: "iana" },
  "application/vnd.ms-windows.devicepairing": { source: "iana" },
  "application/vnd.ms-windows.nwprinting.oob": { source: "iana" },
  "application/vnd.ms-windows.printerpairing": { source: "iana" },
  "application/vnd.ms-windows.wsd.oob": { source: "iana" },
  "application/vnd.ms-wmdrm.lic-chlg-req": { source: "iana" },
  "application/vnd.ms-wmdrm.lic-resp": { source: "iana" },
  "application/vnd.ms-wmdrm.meter-chlg-req": { source: "iana" },
  "application/vnd.ms-wmdrm.meter-resp": { source: "iana" },
  "application/vnd.ms-word.document.macroenabled.12": {
    source: "iana",
    extensions: ["docm"],
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    source: "iana",
    extensions: ["dotm"],
  },
  "application/vnd.ms-works": {
    source: "iana",
    extensions: ["wps", "wks", "wcm", "wdb"],
  },
  "application/vnd.ms-wpl": { source: "iana", extensions: ["wpl"] },
  "application/vnd.ms-xpsdocument": {
    source: "iana",
    compressible: !1,
    extensions: ["xps"],
  },
  "application/vnd.msa-disk-image": { source: "iana" },
  "application/vnd.mseq": { source: "iana", extensions: ["mseq"] },
  "application/vnd.msign": { source: "iana" },
  "application/vnd.multiad.creator": { source: "iana" },
  "application/vnd.multiad.creator.cif": { source: "iana" },
  "application/vnd.music-niff": { source: "iana" },
  "application/vnd.musician": { source: "iana", extensions: ["mus"] },
  "application/vnd.muvee.style": { source: "iana", extensions: ["msty"] },
  "application/vnd.mynfc": { source: "iana", extensions: ["taglet"] },
  "application/vnd.nacamar.ybrid+json": { source: "iana", compressible: !0 },
  "application/vnd.ncd.control": { source: "iana" },
  "application/vnd.ncd.reference": { source: "iana" },
  "application/vnd.nearst.inv+json": { source: "iana", compressible: !0 },
  "application/vnd.nebumind.line": { source: "iana" },
  "application/vnd.nervana": { source: "iana" },
  "application/vnd.netfpx": { source: "iana" },
  "application/vnd.neurolanguage.nlu": { source: "iana", extensions: ["nlu"] },
  "application/vnd.nimn": { source: "iana" },
  "application/vnd.nintendo.nitro.rom": { source: "iana" },
  "application/vnd.nintendo.snes.rom": { source: "iana" },
  "application/vnd.nitf": { source: "iana", extensions: ["ntf", "nitf"] },
  "application/vnd.noblenet-directory": { source: "iana", extensions: ["nnd"] },
  "application/vnd.noblenet-sealer": { source: "iana", extensions: ["nns"] },
  "application/vnd.noblenet-web": { source: "iana", extensions: ["nnw"] },
  "application/vnd.nokia.catalogs": { source: "iana" },
  "application/vnd.nokia.conml+wbxml": { source: "iana" },
  "application/vnd.nokia.conml+xml": { source: "iana", compressible: !0 },
  "application/vnd.nokia.iptv.config+xml": { source: "iana", compressible: !0 },
  "application/vnd.nokia.isds-radio-presets": { source: "iana" },
  "application/vnd.nokia.landmark+wbxml": { source: "iana" },
  "application/vnd.nokia.landmark+xml": { source: "iana", compressible: !0 },
  "application/vnd.nokia.landmarkcollection+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["ac"],
  },
  "application/vnd.nokia.n-gage.data": {
    source: "iana",
    extensions: ["ngdat"],
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    source: "iana",
    extensions: ["n-gage"],
  },
  "application/vnd.nokia.ncd": { source: "iana" },
  "application/vnd.nokia.pcd+wbxml": { source: "iana" },
  "application/vnd.nokia.pcd+xml": { source: "iana", compressible: !0 },
  "application/vnd.nokia.radio-preset": {
    source: "iana",
    extensions: ["rpst"],
  },
  "application/vnd.nokia.radio-presets": {
    source: "iana",
    extensions: ["rpss"],
  },
  "application/vnd.novadigm.edm": { source: "iana", extensions: ["edm"] },
  "application/vnd.novadigm.edx": { source: "iana", extensions: ["edx"] },
  "application/vnd.novadigm.ext": { source: "iana", extensions: ["ext"] },
  "application/vnd.ntt-local.content-share": { source: "iana" },
  "application/vnd.ntt-local.file-transfer": { source: "iana" },
  "application/vnd.ntt-local.ogw_remote-access": { source: "iana" },
  "application/vnd.ntt-local.sip-ta_remote": { source: "iana" },
  "application/vnd.ntt-local.sip-ta_tcp_stream": { source: "iana" },
  "application/vnd.oasis.opendocument.chart": {
    source: "iana",
    extensions: ["odc"],
  },
  "application/vnd.oasis.opendocument.chart-template": {
    source: "iana",
    extensions: ["otc"],
  },
  "application/vnd.oasis.opendocument.database": {
    source: "iana",
    extensions: ["odb"],
  },
  "application/vnd.oasis.opendocument.formula": {
    source: "iana",
    extensions: ["odf"],
  },
  "application/vnd.oasis.opendocument.formula-template": {
    source: "iana",
    extensions: ["odft"],
  },
  "application/vnd.oasis.opendocument.graphics": {
    source: "iana",
    compressible: !1,
    extensions: ["odg"],
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    source: "iana",
    extensions: ["otg"],
  },
  "application/vnd.oasis.opendocument.image": {
    source: "iana",
    extensions: ["odi"],
  },
  "application/vnd.oasis.opendocument.image-template": {
    source: "iana",
    extensions: ["oti"],
  },
  "application/vnd.oasis.opendocument.presentation": {
    source: "iana",
    compressible: !1,
    extensions: ["odp"],
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    source: "iana",
    extensions: ["otp"],
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    source: "iana",
    compressible: !1,
    extensions: ["ods"],
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    source: "iana",
    extensions: ["ots"],
  },
  "application/vnd.oasis.opendocument.text": {
    source: "iana",
    compressible: !1,
    extensions: ["odt"],
  },
  "application/vnd.oasis.opendocument.text-master": {
    source: "iana",
    extensions: ["odm"],
  },
  "application/vnd.oasis.opendocument.text-template": {
    source: "iana",
    extensions: ["ott"],
  },
  "application/vnd.oasis.opendocument.text-web": {
    source: "iana",
    extensions: ["oth"],
  },
  "application/vnd.obn": { source: "iana" },
  "application/vnd.ocf+cbor": { source: "iana" },
  "application/vnd.oci.image.manifest.v1+json": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oftn.l10n+json": { source: "iana", compressible: !0 },
  "application/vnd.oipf.contentaccessdownload+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oipf.cspg-hexbinary": { source: "iana" },
  "application/vnd.oipf.dae.svg+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.dae.xhtml+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oipf.pae.gem": { source: "iana" },
  "application/vnd.oipf.spdiscovery+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.spdlist+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.ueprofile+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.userprofile+xml": { source: "iana", compressible: !0 },
  "application/vnd.olpc-sugar": { source: "iana", extensions: ["xo"] },
  "application/vnd.oma-scws-config": { source: "iana" },
  "application/vnd.oma-scws-http-request": { source: "iana" },
  "application/vnd.oma-scws-http-response": { source: "iana" },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oma.bcast.imd+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.ltkm": { source: "iana" },
  "application/vnd.oma.bcast.notification+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oma.bcast.provisioningtrigger": { source: "iana" },
  "application/vnd.oma.bcast.sgboot": { source: "iana" },
  "application/vnd.oma.bcast.sgdd+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.sgdu": { source: "iana" },
  "application/vnd.oma.bcast.simple-symbol-container": { source: "iana" },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oma.bcast.sprov+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.stkm": { source: "iana" },
  "application/vnd.oma.cab-address-book+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oma.cab-pcc+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.cab-subs-invite+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oma.dcd": { source: "iana" },
  "application/vnd.oma.dcdc": { source: "iana" },
  "application/vnd.oma.dd2+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["dd2"],
  },
  "application/vnd.oma.drm.risd+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.group-usage-list+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oma.lwm2m+cbor": { source: "iana" },
  "application/vnd.oma.lwm2m+json": { source: "iana", compressible: !0 },
  "application/vnd.oma.lwm2m+tlv": { source: "iana" },
  "application/vnd.oma.pal+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oma.poc.final-report+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oma.poc.groups+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oma.push": { source: "iana" },
  "application/vnd.oma.scidm.messages+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oma.xcap-directory+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.omads-email+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/vnd.omads-file+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/vnd.omads-folder+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/vnd.omaloc-supl-init": { source: "iana" },
  "application/vnd.onepager": { source: "iana" },
  "application/vnd.onepagertamp": { source: "iana" },
  "application/vnd.onepagertamx": { source: "iana" },
  "application/vnd.onepagertat": { source: "iana" },
  "application/vnd.onepagertatp": { source: "iana" },
  "application/vnd.onepagertatx": { source: "iana" },
  "application/vnd.openblox.game+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["obgx"],
  },
  "application/vnd.openblox.game-binary": { source: "iana" },
  "application/vnd.openeye.oeb": { source: "iana" },
  "application/vnd.openofficeorg.extension": {
    source: "apache",
    extensions: ["oxt"],
  },
  "application/vnd.openstreetmap.data+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["osm"],
  },
  "application/vnd.opentimestamps.ots": { source: "iana" },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    source: "iana",
    compressible: !1,
    extensions: ["pptx"],
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    source: "iana",
    extensions: ["sldx"],
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    source: "iana",
    extensions: ["ppsx"],
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    source: "iana",
    extensions: ["potx"],
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    source: "iana",
    compressible: !1,
    extensions: ["xlsx"],
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    source: "iana",
    extensions: ["xltx"],
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    source: "iana",
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    source: "iana",
    compressible: !1,
    extensions: ["docx"],
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    source: "iana",
    extensions: ["dotx"],
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":
    { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.oracle.resource+json": { source: "iana", compressible: !0 },
  "application/vnd.orange.indata": { source: "iana" },
  "application/vnd.osa.netdeploy": { source: "iana" },
  "application/vnd.osgeo.mapguide.package": {
    source: "iana",
    extensions: ["mgp"],
  },
  "application/vnd.osgi.bundle": { source: "iana" },
  "application/vnd.osgi.dp": { source: "iana", extensions: ["dp"] },
  "application/vnd.osgi.subsystem": { source: "iana", extensions: ["esa"] },
  "application/vnd.otps.ct-kip+xml": { source: "iana", compressible: !0 },
  "application/vnd.oxli.countgraph": { source: "iana" },
  "application/vnd.pagerduty+json": { source: "iana", compressible: !0 },
  "application/vnd.palm": {
    source: "iana",
    extensions: ["pdb", "pqa", "oprc"],
  },
  "application/vnd.panoply": { source: "iana" },
  "application/vnd.paos.xml": { source: "iana" },
  "application/vnd.patentdive": { source: "iana" },
  "application/vnd.patientecommsdoc": { source: "iana" },
  "application/vnd.pawaafile": { source: "iana", extensions: ["paw"] },
  "application/vnd.pcos": { source: "iana" },
  "application/vnd.pg.format": { source: "iana", extensions: ["str"] },
  "application/vnd.pg.osasli": { source: "iana", extensions: ["ei6"] },
  "application/vnd.piaccess.application-licence": { source: "iana" },
  "application/vnd.picsel": { source: "iana", extensions: ["efif"] },
  "application/vnd.pmi.widget": { source: "iana", extensions: ["wg"] },
  "application/vnd.poc.group-advertisement+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.pocketlearn": { source: "iana", extensions: ["plf"] },
  "application/vnd.powerbuilder6": { source: "iana", extensions: ["pbd"] },
  "application/vnd.powerbuilder6-s": { source: "iana" },
  "application/vnd.powerbuilder7": { source: "iana" },
  "application/vnd.powerbuilder7-s": { source: "iana" },
  "application/vnd.powerbuilder75": { source: "iana" },
  "application/vnd.powerbuilder75-s": { source: "iana" },
  "application/vnd.preminet": { source: "iana" },
  "application/vnd.previewsystems.box": { source: "iana", extensions: ["box"] },
  "application/vnd.proteus.magazine": { source: "iana", extensions: ["mgz"] },
  "application/vnd.psfs": { source: "iana" },
  "application/vnd.publishare-delta-tree": {
    source: "iana",
    extensions: ["qps"],
  },
  "application/vnd.pvi.ptid1": { source: "iana", extensions: ["ptid"] },
  "application/vnd.pwg-multiplexed": { source: "iana" },
  "application/vnd.pwg-xhtml-print+xml": { source: "iana", compressible: !0 },
  "application/vnd.qualcomm.brew-app-res": { source: "iana" },
  "application/vnd.quarantainenet": { source: "iana" },
  "application/vnd.quark.quarkxpress": {
    source: "iana",
    extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"],
  },
  "application/vnd.quobject-quoxdocument": { source: "iana" },
  "application/vnd.radisys.moml+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-audit+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.radisys.msml-conf+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-dialog+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/vnd.rainstor.data": { source: "iana" },
  "application/vnd.rapid": { source: "iana" },
  "application/vnd.rar": { source: "iana", extensions: ["rar"] },
  "application/vnd.realvnc.bed": { source: "iana", extensions: ["bed"] },
  "application/vnd.recordare.musicxml": { source: "iana", extensions: ["mxl"] },
  "application/vnd.recordare.musicxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["musicxml"],
  },
  "application/vnd.renlearn.rlprint": { source: "iana" },
  "application/vnd.resilient.logic": { source: "iana" },
  "application/vnd.restful+json": { source: "iana", compressible: !0 },
  "application/vnd.rig.cryptonote": {
    source: "iana",
    extensions: ["cryptonote"],
  },
  "application/vnd.rim.cod": { source: "apache", extensions: ["cod"] },
  "application/vnd.rn-realmedia": { source: "apache", extensions: ["rm"] },
  "application/vnd.rn-realmedia-vbr": {
    source: "apache",
    extensions: ["rmvb"],
  },
  "application/vnd.route66.link66+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["link66"],
  },
  "application/vnd.rs-274x": { source: "iana" },
  "application/vnd.ruckus.download": { source: "iana" },
  "application/vnd.s3sms": { source: "iana" },
  "application/vnd.sailingtracker.track": {
    source: "iana",
    extensions: ["st"],
  },
  "application/vnd.sar": { source: "iana" },
  "application/vnd.sbm.cid": { source: "iana" },
  "application/vnd.sbm.mid2": { source: "iana" },
  "application/vnd.scribus": { source: "iana" },
  "application/vnd.sealed.3df": { source: "iana" },
  "application/vnd.sealed.csf": { source: "iana" },
  "application/vnd.sealed.doc": { source: "iana" },
  "application/vnd.sealed.eml": { source: "iana" },
  "application/vnd.sealed.mht": { source: "iana" },
  "application/vnd.sealed.net": { source: "iana" },
  "application/vnd.sealed.ppt": { source: "iana" },
  "application/vnd.sealed.tiff": { source: "iana" },
  "application/vnd.sealed.xls": { source: "iana" },
  "application/vnd.sealedmedia.softseal.html": { source: "iana" },
  "application/vnd.sealedmedia.softseal.pdf": { source: "iana" },
  "application/vnd.seemail": { source: "iana", extensions: ["see"] },
  "application/vnd.seis+json": { source: "iana", compressible: !0 },
  "application/vnd.sema": { source: "iana", extensions: ["sema"] },
  "application/vnd.semd": { source: "iana", extensions: ["semd"] },
  "application/vnd.semf": { source: "iana", extensions: ["semf"] },
  "application/vnd.shade-save-file": { source: "iana" },
  "application/vnd.shana.informed.formdata": {
    source: "iana",
    extensions: ["ifm"],
  },
  "application/vnd.shana.informed.formtemplate": {
    source: "iana",
    extensions: ["itp"],
  },
  "application/vnd.shana.informed.interchange": {
    source: "iana",
    extensions: ["iif"],
  },
  "application/vnd.shana.informed.package": {
    source: "iana",
    extensions: ["ipk"],
  },
  "application/vnd.shootproof+json": { source: "iana", compressible: !0 },
  "application/vnd.shopkick+json": { source: "iana", compressible: !0 },
  "application/vnd.shp": { source: "iana" },
  "application/vnd.shx": { source: "iana" },
  "application/vnd.sigrok.session": { source: "iana" },
  "application/vnd.simtech-mindmapper": {
    source: "iana",
    extensions: ["twd", "twds"],
  },
  "application/vnd.siren+json": { source: "iana", compressible: !0 },
  "application/vnd.smaf": { source: "iana", extensions: ["mmf"] },
  "application/vnd.smart.notebook": { source: "iana" },
  "application/vnd.smart.teacher": { source: "iana", extensions: ["teacher"] },
  "application/vnd.snesdev-page-table": { source: "iana" },
  "application/vnd.software602.filler.form+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["fo"],
  },
  "application/vnd.software602.filler.form-xml-zip": { source: "iana" },
  "application/vnd.solent.sdkm+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["sdkm", "sdkd"],
  },
  "application/vnd.spotfire.dxp": { source: "iana", extensions: ["dxp"] },
  "application/vnd.spotfire.sfs": { source: "iana", extensions: ["sfs"] },
  "application/vnd.sqlite3": { source: "iana" },
  "application/vnd.sss-cod": { source: "iana" },
  "application/vnd.sss-dtf": { source: "iana" },
  "application/vnd.sss-ntf": { source: "iana" },
  "application/vnd.stardivision.calc": {
    source: "apache",
    extensions: ["sdc"],
  },
  "application/vnd.stardivision.draw": {
    source: "apache",
    extensions: ["sda"],
  },
  "application/vnd.stardivision.impress": {
    source: "apache",
    extensions: ["sdd"],
  },
  "application/vnd.stardivision.math": {
    source: "apache",
    extensions: ["smf"],
  },
  "application/vnd.stardivision.writer": {
    source: "apache",
    extensions: ["sdw", "vor"],
  },
  "application/vnd.stardivision.writer-global": {
    source: "apache",
    extensions: ["sgl"],
  },
  "application/vnd.stepmania.package": {
    source: "iana",
    extensions: ["smzip"],
  },
  "application/vnd.stepmania.stepchart": { source: "iana", extensions: ["sm"] },
  "application/vnd.street-stream": { source: "iana" },
  "application/vnd.sun.wadl+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["wadl"],
  },
  "application/vnd.sun.xml.calc": { source: "apache", extensions: ["sxc"] },
  "application/vnd.sun.xml.calc.template": {
    source: "apache",
    extensions: ["stc"],
  },
  "application/vnd.sun.xml.draw": { source: "apache", extensions: ["sxd"] },
  "application/vnd.sun.xml.draw.template": {
    source: "apache",
    extensions: ["std"],
  },
  "application/vnd.sun.xml.impress": { source: "apache", extensions: ["sxi"] },
  "application/vnd.sun.xml.impress.template": {
    source: "apache",
    extensions: ["sti"],
  },
  "application/vnd.sun.xml.math": { source: "apache", extensions: ["sxm"] },
  "application/vnd.sun.xml.writer": { source: "apache", extensions: ["sxw"] },
  "application/vnd.sun.xml.writer.global": {
    source: "apache",
    extensions: ["sxg"],
  },
  "application/vnd.sun.xml.writer.template": {
    source: "apache",
    extensions: ["stw"],
  },
  "application/vnd.sus-calendar": {
    source: "iana",
    extensions: ["sus", "susp"],
  },
  "application/vnd.svd": { source: "iana", extensions: ["svd"] },
  "application/vnd.swiftview-ics": { source: "iana" },
  "application/vnd.sycle+xml": { source: "iana", compressible: !0 },
  "application/vnd.syft+json": { source: "iana", compressible: !0 },
  "application/vnd.symbian.install": {
    source: "apache",
    extensions: ["sis", "sisx"],
  },
  "application/vnd.syncml+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: ["xsm"],
  },
  "application/vnd.syncml.dm+wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: ["bdm"],
  },
  "application/vnd.syncml.dm+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: ["xdm"],
  },
  "application/vnd.syncml.dm.notification": { source: "iana" },
  "application/vnd.syncml.dmddf+wbxml": { source: "iana" },
  "application/vnd.syncml.dmddf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: ["ddf"],
  },
  "application/vnd.syncml.dmtnds+wbxml": { source: "iana" },
  "application/vnd.syncml.dmtnds+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
  },
  "application/vnd.syncml.ds.notification": { source: "iana" },
  "application/vnd.tableschema+json": { source: "iana", compressible: !0 },
  "application/vnd.tao.intent-module-archive": {
    source: "iana",
    extensions: ["tao"],
  },
  "application/vnd.tcpdump.pcap": {
    source: "iana",
    extensions: ["pcap", "cap", "dmp"],
  },
  "application/vnd.think-cell.ppttc+json": { source: "iana", compressible: !0 },
  "application/vnd.tmd.mediaflex.api+xml": { source: "iana", compressible: !0 },
  "application/vnd.tml": { source: "iana" },
  "application/vnd.tmobile-livetv": { source: "iana", extensions: ["tmo"] },
  "application/vnd.tri.onesource": { source: "iana" },
  "application/vnd.trid.tpt": { source: "iana", extensions: ["tpt"] },
  "application/vnd.triscape.mxs": { source: "iana", extensions: ["mxs"] },
  "application/vnd.trueapp": { source: "iana", extensions: ["tra"] },
  "application/vnd.truedoc": { source: "iana" },
  "application/vnd.ubisoft.webplayer": { source: "iana" },
  "application/vnd.ufdl": { source: "iana", extensions: ["ufd", "ufdl"] },
  "application/vnd.uiq.theme": { source: "iana", extensions: ["utz"] },
  "application/vnd.umajin": { source: "iana", extensions: ["umj"] },
  "application/vnd.unity": { source: "iana", extensions: ["unityweb"] },
  "application/vnd.uoml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["uoml"],
  },
  "application/vnd.uplanet.alert": { source: "iana" },
  "application/vnd.uplanet.alert-wbxml": { source: "iana" },
  "application/vnd.uplanet.bearer-choice": { source: "iana" },
  "application/vnd.uplanet.bearer-choice-wbxml": { source: "iana" },
  "application/vnd.uplanet.cacheop": { source: "iana" },
  "application/vnd.uplanet.cacheop-wbxml": { source: "iana" },
  "application/vnd.uplanet.channel": { source: "iana" },
  "application/vnd.uplanet.channel-wbxml": { source: "iana" },
  "application/vnd.uplanet.list": { source: "iana" },
  "application/vnd.uplanet.list-wbxml": { source: "iana" },
  "application/vnd.uplanet.listcmd": { source: "iana" },
  "application/vnd.uplanet.listcmd-wbxml": { source: "iana" },
  "application/vnd.uplanet.signal": { source: "iana" },
  "application/vnd.uri-map": { source: "iana" },
  "application/vnd.valve.source.material": { source: "iana" },
  "application/vnd.vcx": { source: "iana", extensions: ["vcx"] },
  "application/vnd.vd-study": { source: "iana" },
  "application/vnd.vectorworks": { source: "iana" },
  "application/vnd.vel+json": { source: "iana", compressible: !0 },
  "application/vnd.verimatrix.vcas": { source: "iana" },
  "application/vnd.veritone.aion+json": { source: "iana", compressible: !0 },
  "application/vnd.veryant.thin": { source: "iana" },
  "application/vnd.ves.encrypted": { source: "iana" },
  "application/vnd.vidsoft.vidconference": { source: "iana" },
  "application/vnd.visio": {
    source: "iana",
    extensions: ["vsd", "vst", "vss", "vsw"],
  },
  "application/vnd.visionary": { source: "iana", extensions: ["vis"] },
  "application/vnd.vividence.scriptfile": { source: "iana" },
  "application/vnd.vsf": { source: "iana", extensions: ["vsf"] },
  "application/vnd.wap.sic": { source: "iana" },
  "application/vnd.wap.slc": { source: "iana" },
  "application/vnd.wap.wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: ["wbxml"],
  },
  "application/vnd.wap.wmlc": { source: "iana", extensions: ["wmlc"] },
  "application/vnd.wap.wmlscriptc": { source: "iana", extensions: ["wmlsc"] },
  "application/vnd.webturbo": { source: "iana", extensions: ["wtb"] },
  "application/vnd.wfa.dpp": { source: "iana" },
  "application/vnd.wfa.p2p": { source: "iana" },
  "application/vnd.wfa.wsc": { source: "iana" },
  "application/vnd.windows.devicepairing": { source: "iana" },
  "application/vnd.wmc": { source: "iana" },
  "application/vnd.wmf.bootstrap": { source: "iana" },
  "application/vnd.wolfram.mathematica": { source: "iana" },
  "application/vnd.wolfram.mathematica.package": { source: "iana" },
  "application/vnd.wolfram.player": { source: "iana", extensions: ["nbp"] },
  "application/vnd.wordperfect": { source: "iana", extensions: ["wpd"] },
  "application/vnd.wqd": { source: "iana", extensions: ["wqd"] },
  "application/vnd.wrq-hp3000-labelled": { source: "iana" },
  "application/vnd.wt.stf": { source: "iana", extensions: ["stf"] },
  "application/vnd.wv.csp+wbxml": { source: "iana" },
  "application/vnd.wv.csp+xml": { source: "iana", compressible: !0 },
  "application/vnd.wv.ssp+xml": { source: "iana", compressible: !0 },
  "application/vnd.xacml+json": { source: "iana", compressible: !0 },
  "application/vnd.xara": { source: "iana", extensions: ["xar"] },
  "application/vnd.xfdl": { source: "iana", extensions: ["xfdl"] },
  "application/vnd.xfdl.webform": { source: "iana" },
  "application/vnd.xmi+xml": { source: "iana", compressible: !0 },
  "application/vnd.xmpie.cpkg": { source: "iana" },
  "application/vnd.xmpie.dpkg": { source: "iana" },
  "application/vnd.xmpie.plan": { source: "iana" },
  "application/vnd.xmpie.ppkg": { source: "iana" },
  "application/vnd.xmpie.xlim": { source: "iana" },
  "application/vnd.yamaha.hv-dic": { source: "iana", extensions: ["hvd"] },
  "application/vnd.yamaha.hv-script": { source: "iana", extensions: ["hvs"] },
  "application/vnd.yamaha.hv-voice": { source: "iana", extensions: ["hvp"] },
  "application/vnd.yamaha.openscoreformat": {
    source: "iana",
    extensions: ["osf"],
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["osfpvg"],
  },
  "application/vnd.yamaha.remote-setup": { source: "iana" },
  "application/vnd.yamaha.smaf-audio": { source: "iana", extensions: ["saf"] },
  "application/vnd.yamaha.smaf-phrase": { source: "iana", extensions: ["spf"] },
  "application/vnd.yamaha.through-ngn": { source: "iana" },
  "application/vnd.yamaha.tunnel-udpencap": { source: "iana" },
  "application/vnd.yaoweme": { source: "iana" },
  "application/vnd.yellowriver-custom-menu": {
    source: "iana",
    extensions: ["cmp"],
  },
  "application/vnd.youtube.yt": { source: "iana" },
  "application/vnd.zul": { source: "iana", extensions: ["zir", "zirz"] },
  "application/vnd.zzazz.deck+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["zaz"],
  },
  "application/voicexml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["vxml"],
  },
  "application/voucher-cms+json": { source: "iana", compressible: !0 },
  "application/vq-rtcpxr": { source: "iana" },
  "application/wasm": {
    source: "iana",
    compressible: !0,
    extensions: ["wasm"],
  },
  "application/watcherinfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["wif"],
  },
  "application/webpush-options+json": { source: "iana", compressible: !0 },
  "application/whoispp-query": { source: "iana" },
  "application/whoispp-response": { source: "iana" },
  "application/widget": { source: "iana", extensions: ["wgt"] },
  "application/winhlp": { source: "apache", extensions: ["hlp"] },
  "application/wita": { source: "iana" },
  "application/wordperfect5.1": { source: "iana" },
  "application/wsdl+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["wsdl"],
  },
  "application/wspolicy+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["wspolicy"],
  },
  "application/x-7z-compressed": {
    source: "apache",
    compressible: !1,
    extensions: ["7z"],
  },
  "application/x-abiword": { source: "apache", extensions: ["abw"] },
  "application/x-ace-compressed": { source: "apache", extensions: ["ace"] },
  "application/x-amf": { source: "apache" },
  "application/x-apple-diskimage": { source: "apache", extensions: ["dmg"] },
  "application/x-arj": { compressible: !1, extensions: ["arj"] },
  "application/x-authorware-bin": {
    source: "apache",
    extensions: ["aab", "x32", "u32", "vox"],
  },
  "application/x-authorware-map": { source: "apache", extensions: ["aam"] },
  "application/x-authorware-seg": { source: "apache", extensions: ["aas"] },
  "application/x-bcpio": { source: "apache", extensions: ["bcpio"] },
  "application/x-bdoc": { compressible: !1, extensions: ["bdoc"] },
  "application/x-bittorrent": { source: "apache", extensions: ["torrent"] },
  "application/x-blorb": { source: "apache", extensions: ["blb", "blorb"] },
  "application/x-bzip": {
    source: "apache",
    compressible: !1,
    extensions: ["bz"],
  },
  "application/x-bzip2": {
    source: "apache",
    compressible: !1,
    extensions: ["bz2", "boz"],
  },
  "application/x-cbr": {
    source: "apache",
    extensions: ["cbr", "cba", "cbt", "cbz", "cb7"],
  },
  "application/x-cdlink": { source: "apache", extensions: ["vcd"] },
  "application/x-cfs-compressed": { source: "apache", extensions: ["cfs"] },
  "application/x-chat": { source: "apache", extensions: ["chat"] },
  "application/x-chess-pgn": { source: "apache", extensions: ["pgn"] },
  "application/x-chrome-extension": { extensions: ["crx"] },
  "application/x-cocoa": { source: "nginx", extensions: ["cco"] },
  "application/x-compress": { source: "apache" },
  "application/x-conference": { source: "apache", extensions: ["nsc"] },
  "application/x-cpio": { source: "apache", extensions: ["cpio"] },
  "application/x-csh": { source: "apache", extensions: ["csh"] },
  "application/x-deb": { compressible: !1 },
  "application/x-debian-package": {
    source: "apache",
    extensions: ["deb", "udeb"],
  },
  "application/x-dgc-compressed": { source: "apache", extensions: ["dgc"] },
  "application/x-director": {
    source: "apache",
    extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"],
  },
  "application/x-doom": { source: "apache", extensions: ["wad"] },
  "application/x-dtbncx+xml": {
    source: "apache",
    compressible: !0,
    extensions: ["ncx"],
  },
  "application/x-dtbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: ["dtb"],
  },
  "application/x-dtbresource+xml": {
    source: "apache",
    compressible: !0,
    extensions: ["res"],
  },
  "application/x-dvi": {
    source: "apache",
    compressible: !1,
    extensions: ["dvi"],
  },
  "application/x-envoy": { source: "apache", extensions: ["evy"] },
  "application/x-eva": { source: "apache", extensions: ["eva"] },
  "application/x-font-bdf": { source: "apache", extensions: ["bdf"] },
  "application/x-font-dos": { source: "apache" },
  "application/x-font-framemaker": { source: "apache" },
  "application/x-font-ghostscript": { source: "apache", extensions: ["gsf"] },
  "application/x-font-libgrx": { source: "apache" },
  "application/x-font-linux-psf": { source: "apache", extensions: ["psf"] },
  "application/x-font-pcf": { source: "apache", extensions: ["pcf"] },
  "application/x-font-snf": { source: "apache", extensions: ["snf"] },
  "application/x-font-speedo": { source: "apache" },
  "application/x-font-sunos-news": { source: "apache" },
  "application/x-font-type1": {
    source: "apache",
    extensions: ["pfa", "pfb", "pfm", "afm"],
  },
  "application/x-font-vfont": { source: "apache" },
  "application/x-freearc": { source: "apache", extensions: ["arc"] },
  "application/x-futuresplash": { source: "apache", extensions: ["spl"] },
  "application/x-gca-compressed": { source: "apache", extensions: ["gca"] },
  "application/x-glulx": { source: "apache", extensions: ["ulx"] },
  "application/x-gnumeric": { source: "apache", extensions: ["gnumeric"] },
  "application/x-gramps-xml": { source: "apache", extensions: ["gramps"] },
  "application/x-gtar": { source: "apache", extensions: ["gtar"] },
  "application/x-gzip": { source: "apache" },
  "application/x-hdf": { source: "apache", extensions: ["hdf"] },
  "application/x-httpd-php": { compressible: !0, extensions: ["php"] },
  "application/x-install-instructions": {
    source: "apache",
    extensions: ["install"],
  },
  "application/x-iso9660-image": { source: "apache", extensions: ["iso"] },
  "application/x-iwork-keynote-sffkey": { extensions: ["key"] },
  "application/x-iwork-numbers-sffnumbers": { extensions: ["numbers"] },
  "application/x-iwork-pages-sffpages": { extensions: ["pages"] },
  "application/x-java-archive-diff": {
    source: "nginx",
    extensions: ["jardiff"],
  },
  "application/x-java-jnlp-file": {
    source: "apache",
    compressible: !1,
    extensions: ["jnlp"],
  },
  "application/x-javascript": { compressible: !0 },
  "application/x-keepass2": { extensions: ["kdbx"] },
  "application/x-latex": {
    source: "apache",
    compressible: !1,
    extensions: ["latex"],
  },
  "application/x-lua-bytecode": { extensions: ["luac"] },
  "application/x-lzh-compressed": {
    source: "apache",
    extensions: ["lzh", "lha"],
  },
  "application/x-makeself": { source: "nginx", extensions: ["run"] },
  "application/x-mie": { source: "apache", extensions: ["mie"] },
  "application/x-mobipocket-ebook": {
    source: "apache",
    extensions: ["prc", "mobi"],
  },
  "application/x-mpegurl": { compressible: !1 },
  "application/x-ms-application": {
    source: "apache",
    extensions: ["application"],
  },
  "application/x-ms-shortcut": { source: "apache", extensions: ["lnk"] },
  "application/x-ms-wmd": { source: "apache", extensions: ["wmd"] },
  "application/x-ms-wmz": { source: "apache", extensions: ["wmz"] },
  "application/x-ms-xbap": { source: "apache", extensions: ["xbap"] },
  "application/x-msaccess": { source: "apache", extensions: ["mdb"] },
  "application/x-msbinder": { source: "apache", extensions: ["obd"] },
  "application/x-mscardfile": { source: "apache", extensions: ["crd"] },
  "application/x-msclip": { source: "apache", extensions: ["clp"] },
  "application/x-msdos-program": { extensions: ["exe"] },
  "application/x-msdownload": {
    source: "apache",
    extensions: ["exe", "dll", "com", "bat", "msi"],
  },
  "application/x-msmediaview": {
    source: "apache",
    extensions: ["mvb", "m13", "m14"],
  },
  "application/x-msmetafile": {
    source: "apache",
    extensions: ["wmf", "wmz", "emf", "emz"],
  },
  "application/x-msmoney": { source: "apache", extensions: ["mny"] },
  "application/x-mspublisher": { source: "apache", extensions: ["pub"] },
  "application/x-msschedule": { source: "apache", extensions: ["scd"] },
  "application/x-msterminal": { source: "apache", extensions: ["trm"] },
  "application/x-mswrite": { source: "apache", extensions: ["wri"] },
  "application/x-netcdf": { source: "apache", extensions: ["nc", "cdf"] },
  "application/x-ns-proxy-autoconfig": {
    compressible: !0,
    extensions: ["pac"],
  },
  "application/x-nzb": { source: "apache", extensions: ["nzb"] },
  "application/x-perl": { source: "nginx", extensions: ["pl", "pm"] },
  "application/x-pilot": { source: "nginx", extensions: ["prc", "pdb"] },
  "application/x-pkcs12": {
    source: "apache",
    compressible: !1,
    extensions: ["p12", "pfx"],
  },
  "application/x-pkcs7-certificates": {
    source: "apache",
    extensions: ["p7b", "spc"],
  },
  "application/x-pkcs7-certreqresp": { source: "apache", extensions: ["p7r"] },
  "application/x-pki-message": { source: "iana" },
  "application/x-rar-compressed": {
    source: "apache",
    compressible: !1,
    extensions: ["rar"],
  },
  "application/x-redhat-package-manager": {
    source: "nginx",
    extensions: ["rpm"],
  },
  "application/x-research-info-systems": {
    source: "apache",
    extensions: ["ris"],
  },
  "application/x-sea": { source: "nginx", extensions: ["sea"] },
  "application/x-sh": {
    source: "apache",
    compressible: !0,
    extensions: ["sh"],
  },
  "application/x-shar": { source: "apache", extensions: ["shar"] },
  "application/x-shockwave-flash": {
    source: "apache",
    compressible: !1,
    extensions: ["swf"],
  },
  "application/x-silverlight-app": { source: "apache", extensions: ["xap"] },
  "application/x-sql": { source: "apache", extensions: ["sql"] },
  "application/x-stuffit": {
    source: "apache",
    compressible: !1,
    extensions: ["sit"],
  },
  "application/x-stuffitx": { source: "apache", extensions: ["sitx"] },
  "application/x-subrip": { source: "apache", extensions: ["srt"] },
  "application/x-sv4cpio": { source: "apache", extensions: ["sv4cpio"] },
  "application/x-sv4crc": { source: "apache", extensions: ["sv4crc"] },
  "application/x-t3vm-image": { source: "apache", extensions: ["t3"] },
  "application/x-tads": { source: "apache", extensions: ["gam"] },
  "application/x-tar": {
    source: "apache",
    compressible: !0,
    extensions: ["tar"],
  },
  "application/x-tcl": { source: "apache", extensions: ["tcl", "tk"] },
  "application/x-tex": { source: "apache", extensions: ["tex"] },
  "application/x-tex-tfm": { source: "apache", extensions: ["tfm"] },
  "application/x-texinfo": {
    source: "apache",
    extensions: ["texinfo", "texi"],
  },
  "application/x-tgif": { source: "apache", extensions: ["obj"] },
  "application/x-ustar": { source: "apache", extensions: ["ustar"] },
  "application/x-virtualbox-hdd": { compressible: !0, extensions: ["hdd"] },
  "application/x-virtualbox-ova": { compressible: !0, extensions: ["ova"] },
  "application/x-virtualbox-ovf": { compressible: !0, extensions: ["ovf"] },
  "application/x-virtualbox-vbox": { compressible: !0, extensions: ["vbox"] },
  "application/x-virtualbox-vbox-extpack": {
    compressible: !1,
    extensions: ["vbox-extpack"],
  },
  "application/x-virtualbox-vdi": { compressible: !0, extensions: ["vdi"] },
  "application/x-virtualbox-vhd": { compressible: !0, extensions: ["vhd"] },
  "application/x-virtualbox-vmdk": { compressible: !0, extensions: ["vmdk"] },
  "application/x-wais-source": { source: "apache", extensions: ["src"] },
  "application/x-web-app-manifest+json": {
    compressible: !0,
    extensions: ["webapp"],
  },
  "application/x-www-form-urlencoded": { source: "iana", compressible: !0 },
  "application/x-x509-ca-cert": {
    source: "iana",
    extensions: ["der", "crt", "pem"],
  },
  "application/x-x509-ca-ra-cert": { source: "iana" },
  "application/x-x509-next-ca-cert": { source: "iana" },
  "application/x-xfig": { source: "apache", extensions: ["fig"] },
  "application/x-xliff+xml": {
    source: "apache",
    compressible: !0,
    extensions: ["xlf"],
  },
  "application/x-xpinstall": {
    source: "apache",
    compressible: !1,
    extensions: ["xpi"],
  },
  "application/x-xz": { source: "apache", extensions: ["xz"] },
  "application/x-zmachine": {
    source: "apache",
    extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
  },
  "application/x400-bp": { source: "iana" },
  "application/xacml+xml": { source: "iana", compressible: !0 },
  "application/xaml+xml": {
    source: "apache",
    compressible: !0,
    extensions: ["xaml"],
  },
  "application/xcap-att+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xav"],
  },
  "application/xcap-caps+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xca"],
  },
  "application/xcap-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xdf"],
  },
  "application/xcap-el+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xel"],
  },
  "application/xcap-error+xml": { source: "iana", compressible: !0 },
  "application/xcap-ns+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xns"],
  },
  "application/xcon-conference-info+xml": { source: "iana", compressible: !0 },
  "application/xcon-conference-info-diff+xml": {
    source: "iana",
    compressible: !0,
  },
  "application/xenc+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xenc"],
  },
  "application/xhtml+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xhtml", "xht"],
  },
  "application/xhtml-voice+xml": { source: "apache", compressible: !0 },
  "application/xliff+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xlf"],
  },
  "application/xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xml", "xsl", "xsd", "rng"],
  },
  "application/xml-dtd": {
    source: "iana",
    compressible: !0,
    extensions: ["dtd"],
  },
  "application/xml-external-parsed-entity": { source: "iana" },
  "application/xml-patch+xml": { source: "iana", compressible: !0 },
  "application/xmpp+xml": { source: "iana", compressible: !0 },
  "application/xop+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xop"],
  },
  "application/xproc+xml": {
    source: "apache",
    compressible: !0,
    extensions: ["xpl"],
  },
  "application/xslt+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["xsl", "xslt"],
  },
  "application/xspf+xml": {
    source: "apache",
    compressible: !0,
    extensions: ["xspf"],
  },
  "application/xv+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["mxml", "xhvml", "xvml", "xvm"],
  },
  "application/yang": { source: "iana", extensions: ["yang"] },
  "application/yang-data+json": { source: "iana", compressible: !0 },
  "application/yang-data+xml": { source: "iana", compressible: !0 },
  "application/yang-patch+json": { source: "iana", compressible: !0 },
  "application/yang-patch+xml": { source: "iana", compressible: !0 },
  "application/yin+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["yin"],
  },
  "application/zip": { source: "iana", compressible: !1, extensions: ["zip"] },
  "application/zlib": { source: "iana" },
  "application/zstd": { source: "iana" },
  "audio/1d-interleaved-parityfec": { source: "iana" },
  "audio/32kadpcm": { source: "iana" },
  "audio/3gpp": { source: "iana", compressible: !1, extensions: ["3gpp"] },
  "audio/3gpp2": { source: "iana" },
  "audio/aac": { source: "iana" },
  "audio/ac3": { source: "iana" },
  "audio/adpcm": { source: "apache", extensions: ["adp"] },
  "audio/amr": { source: "iana", extensions: ["amr"] },
  "audio/amr-wb": { source: "iana" },
  "audio/amr-wb+": { source: "iana" },
  "audio/aptx": { source: "iana" },
  "audio/asc": { source: "iana" },
  "audio/atrac-advanced-lossless": { source: "iana" },
  "audio/atrac-x": { source: "iana" },
  "audio/atrac3": { source: "iana" },
  "audio/basic": {
    source: "iana",
    compressible: !1,
    extensions: ["au", "snd"],
  },
  "audio/bv16": { source: "iana" },
  "audio/bv32": { source: "iana" },
  "audio/clearmode": { source: "iana" },
  "audio/cn": { source: "iana" },
  "audio/dat12": { source: "iana" },
  "audio/dls": { source: "iana" },
  "audio/dsr-es201108": { source: "iana" },
  "audio/dsr-es202050": { source: "iana" },
  "audio/dsr-es202211": { source: "iana" },
  "audio/dsr-es202212": { source: "iana" },
  "audio/dv": { source: "iana" },
  "audio/dvi4": { source: "iana" },
  "audio/eac3": { source: "iana" },
  "audio/encaprtp": { source: "iana" },
  "audio/evrc": { source: "iana" },
  "audio/evrc-qcp": { source: "iana" },
  "audio/evrc0": { source: "iana" },
  "audio/evrc1": { source: "iana" },
  "audio/evrcb": { source: "iana" },
  "audio/evrcb0": { source: "iana" },
  "audio/evrcb1": { source: "iana" },
  "audio/evrcnw": { source: "iana" },
  "audio/evrcnw0": { source: "iana" },
  "audio/evrcnw1": { source: "iana" },
  "audio/evrcwb": { source: "iana" },
  "audio/evrcwb0": { source: "iana" },
  "audio/evrcwb1": { source: "iana" },
  "audio/evs": { source: "iana" },
  "audio/flexfec": { source: "iana" },
  "audio/fwdred": { source: "iana" },
  "audio/g711-0": { source: "iana" },
  "audio/g719": { source: "iana" },
  "audio/g722": { source: "iana" },
  "audio/g7221": { source: "iana" },
  "audio/g723": { source: "iana" },
  "audio/g726-16": { source: "iana" },
  "audio/g726-24": { source: "iana" },
  "audio/g726-32": { source: "iana" },
  "audio/g726-40": { source: "iana" },
  "audio/g728": { source: "iana" },
  "audio/g729": { source: "iana" },
  "audio/g7291": { source: "iana" },
  "audio/g729d": { source: "iana" },
  "audio/g729e": { source: "iana" },
  "audio/gsm": { source: "iana" },
  "audio/gsm-efr": { source: "iana" },
  "audio/gsm-hr-08": { source: "iana" },
  "audio/ilbc": { source: "iana" },
  "audio/ip-mr_v2.5": { source: "iana" },
  "audio/isac": { source: "apache" },
  "audio/l16": { source: "iana" },
  "audio/l20": { source: "iana" },
  "audio/l24": { source: "iana", compressible: !1 },
  "audio/l8": { source: "iana" },
  "audio/lpc": { source: "iana" },
  "audio/melp": { source: "iana" },
  "audio/melp1200": { source: "iana" },
  "audio/melp2400": { source: "iana" },
  "audio/melp600": { source: "iana" },
  "audio/mhas": { source: "iana" },
  "audio/midi": { source: "apache", extensions: ["mid", "midi", "kar", "rmi"] },
  "audio/mobile-xmf": { source: "iana", extensions: ["mxmf"] },
  "audio/mp3": { compressible: !1, extensions: ["mp3"] },
  "audio/mp4": {
    source: "iana",
    compressible: !1,
    extensions: ["m4a", "mp4a"],
  },
  "audio/mp4a-latm": { source: "iana" },
  "audio/mpa": { source: "iana" },
  "audio/mpa-robust": { source: "iana" },
  "audio/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
  },
  "audio/mpeg4-generic": { source: "iana" },
  "audio/musepack": { source: "apache" },
  "audio/ogg": {
    source: "iana",
    compressible: !1,
    extensions: ["oga", "ogg", "spx", "opus"],
  },
  "audio/opus": { source: "iana" },
  "audio/parityfec": { source: "iana" },
  "audio/pcma": { source: "iana" },
  "audio/pcma-wb": { source: "iana" },
  "audio/pcmu": { source: "iana" },
  "audio/pcmu-wb": { source: "iana" },
  "audio/prs.sid": { source: "iana" },
  "audio/qcelp": { source: "iana" },
  "audio/raptorfec": { source: "iana" },
  "audio/red": { source: "iana" },
  "audio/rtp-enc-aescm128": { source: "iana" },
  "audio/rtp-midi": { source: "iana" },
  "audio/rtploopback": { source: "iana" },
  "audio/rtx": { source: "iana" },
  "audio/s3m": { source: "apache", extensions: ["s3m"] },
  "audio/scip": { source: "iana" },
  "audio/silk": { source: "apache", extensions: ["sil"] },
  "audio/smv": { source: "iana" },
  "audio/smv-qcp": { source: "iana" },
  "audio/smv0": { source: "iana" },
  "audio/sofa": { source: "iana" },
  "audio/sp-midi": { source: "iana" },
  "audio/speex": { source: "iana" },
  "audio/t140c": { source: "iana" },
  "audio/t38": { source: "iana" },
  "audio/telephone-event": { source: "iana" },
  "audio/tetra_acelp": { source: "iana" },
  "audio/tetra_acelp_bb": { source: "iana" },
  "audio/tone": { source: "iana" },
  "audio/tsvcis": { source: "iana" },
  "audio/uemclip": { source: "iana" },
  "audio/ulpfec": { source: "iana" },
  "audio/usac": { source: "iana" },
  "audio/vdvi": { source: "iana" },
  "audio/vmr-wb": { source: "iana" },
  "audio/vnd.3gpp.iufp": { source: "iana" },
  "audio/vnd.4sb": { source: "iana" },
  "audio/vnd.audiokoz": { source: "iana" },
  "audio/vnd.celp": { source: "iana" },
  "audio/vnd.cisco.nse": { source: "iana" },
  "audio/vnd.cmles.radio-events": { source: "iana" },
  "audio/vnd.cns.anp1": { source: "iana" },
  "audio/vnd.cns.inf1": { source: "iana" },
  "audio/vnd.dece.audio": { source: "iana", extensions: ["uva", "uvva"] },
  "audio/vnd.digital-winds": { source: "iana", extensions: ["eol"] },
  "audio/vnd.dlna.adts": { source: "iana" },
  "audio/vnd.dolby.heaac.1": { source: "iana" },
  "audio/vnd.dolby.heaac.2": { source: "iana" },
  "audio/vnd.dolby.mlp": { source: "iana" },
  "audio/vnd.dolby.mps": { source: "iana" },
  "audio/vnd.dolby.pl2": { source: "iana" },
  "audio/vnd.dolby.pl2x": { source: "iana" },
  "audio/vnd.dolby.pl2z": { source: "iana" },
  "audio/vnd.dolby.pulse.1": { source: "iana" },
  "audio/vnd.dra": { source: "iana", extensions: ["dra"] },
  "audio/vnd.dts": { source: "iana", extensions: ["dts"] },
  "audio/vnd.dts.hd": { source: "iana", extensions: ["dtshd"] },
  "audio/vnd.dts.uhd": { source: "iana" },
  "audio/vnd.dvb.file": { source: "iana" },
  "audio/vnd.everad.plj": { source: "iana" },
  "audio/vnd.hns.audio": { source: "iana" },
  "audio/vnd.lucent.voice": { source: "iana", extensions: ["lvp"] },
  "audio/vnd.ms-playready.media.pya": { source: "iana", extensions: ["pya"] },
  "audio/vnd.nokia.mobile-xmf": { source: "iana" },
  "audio/vnd.nortel.vbk": { source: "iana" },
  "audio/vnd.nuera.ecelp4800": { source: "iana", extensions: ["ecelp4800"] },
  "audio/vnd.nuera.ecelp7470": { source: "iana", extensions: ["ecelp7470"] },
  "audio/vnd.nuera.ecelp9600": { source: "iana", extensions: ["ecelp9600"] },
  "audio/vnd.octel.sbc": { source: "iana" },
  "audio/vnd.presonus.multitrack": { source: "iana" },
  "audio/vnd.qcelp": { source: "iana" },
  "audio/vnd.rhetorex.32kadpcm": { source: "iana" },
  "audio/vnd.rip": { source: "iana", extensions: ["rip"] },
  "audio/vnd.rn-realaudio": { compressible: !1 },
  "audio/vnd.sealedmedia.softseal.mpeg": { source: "iana" },
  "audio/vnd.vmx.cvsd": { source: "iana" },
  "audio/vnd.wave": { compressible: !1 },
  "audio/vorbis": { source: "iana", compressible: !1 },
  "audio/vorbis-config": { source: "iana" },
  "audio/wav": { compressible: !1, extensions: ["wav"] },
  "audio/wave": { compressible: !1, extensions: ["wav"] },
  "audio/webm": { source: "apache", compressible: !1, extensions: ["weba"] },
  "audio/x-aac": { source: "apache", compressible: !1, extensions: ["aac"] },
  "audio/x-aiff": { source: "apache", extensions: ["aif", "aiff", "aifc"] },
  "audio/x-caf": { source: "apache", compressible: !1, extensions: ["caf"] },
  "audio/x-flac": { source: "apache", extensions: ["flac"] },
  "audio/x-m4a": { source: "nginx", extensions: ["m4a"] },
  "audio/x-matroska": { source: "apache", extensions: ["mka"] },
  "audio/x-mpegurl": { source: "apache", extensions: ["m3u"] },
  "audio/x-ms-wax": { source: "apache", extensions: ["wax"] },
  "audio/x-ms-wma": { source: "apache", extensions: ["wma"] },
  "audio/x-pn-realaudio": { source: "apache", extensions: ["ram", "ra"] },
  "audio/x-pn-realaudio-plugin": { source: "apache", extensions: ["rmp"] },
  "audio/x-realaudio": { source: "nginx", extensions: ["ra"] },
  "audio/x-tta": { source: "apache" },
  "audio/x-wav": { source: "apache", extensions: ["wav"] },
  "audio/xm": { source: "apache", extensions: ["xm"] },
  "chemical/x-cdx": { source: "apache", extensions: ["cdx"] },
  "chemical/x-cif": { source: "apache", extensions: ["cif"] },
  "chemical/x-cmdf": { source: "apache", extensions: ["cmdf"] },
  "chemical/x-cml": { source: "apache", extensions: ["cml"] },
  "chemical/x-csml": { source: "apache", extensions: ["csml"] },
  "chemical/x-pdb": { source: "apache" },
  "chemical/x-xyz": { source: "apache", extensions: ["xyz"] },
  "font/collection": { source: "iana", extensions: ["ttc"] },
  "font/otf": { source: "iana", compressible: !0, extensions: ["otf"] },
  "font/sfnt": { source: "iana" },
  "font/ttf": { source: "iana", compressible: !0, extensions: ["ttf"] },
  "font/woff": { source: "iana", extensions: ["woff"] },
  "font/woff2": { source: "iana", extensions: ["woff2"] },
  "image/aces": { source: "iana", extensions: ["exr"] },
  "image/apng": { compressible: !1, extensions: ["apng"] },
  "image/avci": { source: "iana", extensions: ["avci"] },
  "image/avcs": { source: "iana", extensions: ["avcs"] },
  "image/avif": { source: "iana", compressible: !1, extensions: ["avif"] },
  "image/bmp": { source: "iana", compressible: !0, extensions: ["bmp"] },
  "image/cgm": { source: "iana", extensions: ["cgm"] },
  "image/dicom-rle": { source: "iana", extensions: ["drle"] },
  "image/emf": { source: "iana", extensions: ["emf"] },
  "image/fits": { source: "iana", extensions: ["fits"] },
  "image/g3fax": { source: "iana", extensions: ["g3"] },
  "image/gif": { source: "iana", compressible: !1, extensions: ["gif"] },
  "image/heic": { source: "iana", extensions: ["heic"] },
  "image/heic-sequence": { source: "iana", extensions: ["heics"] },
  "image/heif": { source: "iana", extensions: ["heif"] },
  "image/heif-sequence": { source: "iana", extensions: ["heifs"] },
  "image/hej2k": { source: "iana", extensions: ["hej2"] },
  "image/hsj2": { source: "iana", extensions: ["hsj2"] },
  "image/ief": { source: "iana", extensions: ["ief"] },
  "image/jls": { source: "iana", extensions: ["jls"] },
  "image/jp2": {
    source: "iana",
    compressible: !1,
    extensions: ["jp2", "jpg2"],
  },
  "image/jpeg": {
    source: "iana",
    compressible: !1,
    extensions: ["jpeg", "jpg", "jpe"],
  },
  "image/jph": { source: "iana", extensions: ["jph"] },
  "image/jphc": { source: "iana", extensions: ["jhc"] },
  "image/jpm": { source: "iana", compressible: !1, extensions: ["jpm"] },
  "image/jpx": { source: "iana", compressible: !1, extensions: ["jpx", "jpf"] },
  "image/jxr": { source: "iana", extensions: ["jxr"] },
  "image/jxra": { source: "iana", extensions: ["jxra"] },
  "image/jxrs": { source: "iana", extensions: ["jxrs"] },
  "image/jxs": { source: "iana", extensions: ["jxs"] },
  "image/jxsc": { source: "iana", extensions: ["jxsc"] },
  "image/jxsi": { source: "iana", extensions: ["jxsi"] },
  "image/jxss": { source: "iana", extensions: ["jxss"] },
  "image/ktx": { source: "iana", extensions: ["ktx"] },
  "image/ktx2": { source: "iana", extensions: ["ktx2"] },
  "image/naplps": { source: "iana" },
  "image/pjpeg": { compressible: !1 },
  "image/png": { source: "iana", compressible: !1, extensions: ["png"] },
  "image/prs.btif": { source: "iana", extensions: ["btif"] },
  "image/prs.pti": { source: "iana", extensions: ["pti"] },
  "image/pwg-raster": { source: "iana" },
  "image/sgi": { source: "apache", extensions: ["sgi"] },
  "image/svg+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["svg", "svgz"],
  },
  "image/t38": { source: "iana", extensions: ["t38"] },
  "image/tiff": {
    source: "iana",
    compressible: !1,
    extensions: ["tif", "tiff"],
  },
  "image/tiff-fx": { source: "iana", extensions: ["tfx"] },
  "image/vnd.adobe.photoshop": {
    source: "iana",
    compressible: !0,
    extensions: ["psd"],
  },
  "image/vnd.airzip.accelerator.azv": { source: "iana", extensions: ["azv"] },
  "image/vnd.cns.inf2": { source: "iana" },
  "image/vnd.dece.graphic": {
    source: "iana",
    extensions: ["uvi", "uvvi", "uvg", "uvvg"],
  },
  "image/vnd.djvu": { source: "iana", extensions: ["djvu", "djv"] },
  "image/vnd.dvb.subtitle": { source: "iana", extensions: ["sub"] },
  "image/vnd.dwg": { source: "iana", extensions: ["dwg"] },
  "image/vnd.dxf": { source: "iana", extensions: ["dxf"] },
  "image/vnd.fastbidsheet": { source: "iana", extensions: ["fbs"] },
  "image/vnd.fpx": { source: "iana", extensions: ["fpx"] },
  "image/vnd.fst": { source: "iana", extensions: ["fst"] },
  "image/vnd.fujixerox.edmics-mmr": { source: "iana", extensions: ["mmr"] },
  "image/vnd.fujixerox.edmics-rlc": { source: "iana", extensions: ["rlc"] },
  "image/vnd.globalgraphics.pgb": { source: "iana" },
  "image/vnd.microsoft.icon": {
    source: "iana",
    compressible: !0,
    extensions: ["ico"],
  },
  "image/vnd.mix": { source: "iana" },
  "image/vnd.mozilla.apng": { source: "iana" },
  "image/vnd.ms-dds": { compressible: !0, extensions: ["dds"] },
  "image/vnd.ms-modi": { source: "iana", extensions: ["mdi"] },
  "image/vnd.ms-photo": { source: "apache", extensions: ["wdp"] },
  "image/vnd.net-fpx": { source: "iana", extensions: ["npx"] },
  "image/vnd.pco.b16": { source: "iana", extensions: ["b16"] },
  "image/vnd.radiance": { source: "iana" },
  "image/vnd.sealed.png": { source: "iana" },
  "image/vnd.sealedmedia.softseal.gif": { source: "iana" },
  "image/vnd.sealedmedia.softseal.jpg": { source: "iana" },
  "image/vnd.svf": { source: "iana" },
  "image/vnd.tencent.tap": { source: "iana", extensions: ["tap"] },
  "image/vnd.valve.source.texture": { source: "iana", extensions: ["vtf"] },
  "image/vnd.wap.wbmp": { source: "iana", extensions: ["wbmp"] },
  "image/vnd.xiff": { source: "iana", extensions: ["xif"] },
  "image/vnd.zbrush.pcx": { source: "iana", extensions: ["pcx"] },
  "image/webp": { source: "apache", extensions: ["webp"] },
  "image/wmf": { source: "iana", extensions: ["wmf"] },
  "image/x-3ds": { source: "apache", extensions: ["3ds"] },
  "image/x-cmu-raster": { source: "apache", extensions: ["ras"] },
  "image/x-cmx": { source: "apache", extensions: ["cmx"] },
  "image/x-freehand": {
    source: "apache",
    extensions: ["fh", "fhc", "fh4", "fh5", "fh7"],
  },
  "image/x-icon": { source: "apache", compressible: !0, extensions: ["ico"] },
  "image/x-jng": { source: "nginx", extensions: ["jng"] },
  "image/x-mrsid-image": { source: "apache", extensions: ["sid"] },
  "image/x-ms-bmp": { source: "nginx", compressible: !0, extensions: ["bmp"] },
  "image/x-pcx": { source: "apache", extensions: ["pcx"] },
  "image/x-pict": { source: "apache", extensions: ["pic", "pct"] },
  "image/x-portable-anymap": { source: "apache", extensions: ["pnm"] },
  "image/x-portable-bitmap": { source: "apache", extensions: ["pbm"] },
  "image/x-portable-graymap": { source: "apache", extensions: ["pgm"] },
  "image/x-portable-pixmap": { source: "apache", extensions: ["ppm"] },
  "image/x-rgb": { source: "apache", extensions: ["rgb"] },
  "image/x-tga": { source: "apache", extensions: ["tga"] },
  "image/x-xbitmap": { source: "apache", extensions: ["xbm"] },
  "image/x-xcf": { compressible: !1 },
  "image/x-xpixmap": { source: "apache", extensions: ["xpm"] },
  "image/x-xwindowdump": { source: "apache", extensions: ["xwd"] },
  "message/cpim": { source: "iana" },
  "message/delivery-status": { source: "iana" },
  "message/disposition-notification": {
    source: "iana",
    extensions: ["disposition-notification"],
  },
  "message/external-body": { source: "iana" },
  "message/feedback-report": { source: "iana" },
  "message/global": { source: "iana", extensions: ["u8msg"] },
  "message/global-delivery-status": { source: "iana", extensions: ["u8dsn"] },
  "message/global-disposition-notification": {
    source: "iana",
    extensions: ["u8mdn"],
  },
  "message/global-headers": { source: "iana", extensions: ["u8hdr"] },
  "message/http": { source: "iana", compressible: !1 },
  "message/imdn+xml": { source: "iana", compressible: !0 },
  "message/news": { source: "iana" },
  "message/partial": { source: "iana", compressible: !1 },
  "message/rfc822": {
    source: "iana",
    compressible: !0,
    extensions: ["eml", "mime"],
  },
  "message/s-http": { source: "iana" },
  "message/sip": { source: "iana" },
  "message/sipfrag": { source: "iana" },
  "message/tracking-status": { source: "iana" },
  "message/vnd.si.simp": { source: "iana" },
  "message/vnd.wfa.wsc": { source: "iana", extensions: ["wsc"] },
  "model/3mf": { source: "iana", extensions: ["3mf"] },
  "model/e57": { source: "iana" },
  "model/gltf+json": { source: "iana", compressible: !0, extensions: ["gltf"] },
  "model/gltf-binary": {
    source: "iana",
    compressible: !0,
    extensions: ["glb"],
  },
  "model/iges": {
    source: "iana",
    compressible: !1,
    extensions: ["igs", "iges"],
  },
  "model/mesh": {
    source: "iana",
    compressible: !1,
    extensions: ["msh", "mesh", "silo"],
  },
  "model/mtl": { source: "iana", extensions: ["mtl"] },
  "model/obj": { source: "iana", extensions: ["obj"] },
  "model/step": { source: "iana" },
  "model/step+xml": { source: "iana", compressible: !0, extensions: ["stpx"] },
  "model/step+zip": { source: "iana", compressible: !1, extensions: ["stpz"] },
  "model/step-xml+zip": {
    source: "iana",
    compressible: !1,
    extensions: ["stpxz"],
  },
  "model/stl": { source: "iana", extensions: ["stl"] },
  "model/vnd.collada+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["dae"],
  },
  "model/vnd.dwf": { source: "iana", extensions: ["dwf"] },
  "model/vnd.flatland.3dml": { source: "iana" },
  "model/vnd.gdl": { source: "iana", extensions: ["gdl"] },
  "model/vnd.gs-gdl": { source: "apache" },
  "model/vnd.gs.gdl": { source: "iana" },
  "model/vnd.gtw": { source: "iana", extensions: ["gtw"] },
  "model/vnd.moml+xml": { source: "iana", compressible: !0 },
  "model/vnd.mts": { source: "iana", extensions: ["mts"] },
  "model/vnd.opengex": { source: "iana", extensions: ["ogex"] },
  "model/vnd.parasolid.transmit.binary": {
    source: "iana",
    extensions: ["x_b"],
  },
  "model/vnd.parasolid.transmit.text": { source: "iana", extensions: ["x_t"] },
  "model/vnd.pytha.pyox": { source: "iana" },
  "model/vnd.rosette.annotated-data-model": { source: "iana" },
  "model/vnd.sap.vds": { source: "iana", extensions: ["vds"] },
  "model/vnd.usdz+zip": {
    source: "iana",
    compressible: !1,
    extensions: ["usdz"],
  },
  "model/vnd.valve.source.compiled-map": {
    source: "iana",
    extensions: ["bsp"],
  },
  "model/vnd.vtu": { source: "iana", extensions: ["vtu"] },
  "model/vrml": {
    source: "iana",
    compressible: !1,
    extensions: ["wrl", "vrml"],
  },
  "model/x3d+binary": {
    source: "apache",
    compressible: !1,
    extensions: ["x3db", "x3dbz"],
  },
  "model/x3d+fastinfoset": { source: "iana", extensions: ["x3db"] },
  "model/x3d+vrml": {
    source: "apache",
    compressible: !1,
    extensions: ["x3dv", "x3dvz"],
  },
  "model/x3d+xml": {
    source: "iana",
    compressible: !0,
    extensions: ["x3d", "x3dz"],
  },
  "model/x3d-vrml": { source: "iana", extensions: ["x3dv"] },
  "multipart/alternative": { source: "iana", compressible: !1 },
  "multipart/appledouble": { source: "iana" },
  "multipart/byteranges": { source: "iana" },
  "multipart/digest": { source: "iana" },
  "multipart/encrypted": { source: "iana", compressible: !1 },
  "multipart/form-data": { source: "iana", compressible: !1 },
  "multipart/header-set": { source: "iana" },
  "multipart/mixed": { source: "iana" },
  "multipart/multilingual": { source: "iana" },
  "multipart/parallel": { source: "iana" },
  "multipart/related": { source: "iana", compressible: !1 },
  "multipart/report": { source: "iana" },
  "multipart/signed": { source: "iana", compressible: !1 },
  "multipart/vnd.bint.med-plus": { source: "iana" },
  "multipart/voice-message": { source: "iana" },
  "multipart/x-mixed-replace": { source: "iana" },
  "text/1d-interleaved-parityfec": { source: "iana" },
  "text/cache-manifest": {
    source: "iana",
    compressible: !0,
    extensions: ["appcache", "manifest"],
  },
  "text/calendar": { source: "iana", extensions: ["ics", "ifb"] },
  "text/calender": { compressible: !0 },
  "text/cmd": { compressible: !0 },
  "text/coffeescript": { extensions: ["coffee", "litcoffee"] },
  "text/cql": { source: "iana" },
  "text/cql-expression": { source: "iana" },
  "text/cql-identifier": { source: "iana" },
  "text/css": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: ["css"],
  },
  "text/csv": { source: "iana", compressible: !0, extensions: ["csv"] },
  "text/csv-schema": { source: "iana" },
  "text/directory": { source: "iana" },
  "text/dns": { source: "iana" },
  "text/ecmascript": { source: "iana" },
  "text/encaprtp": { source: "iana" },
  "text/enriched": { source: "iana" },
  "text/fhirpath": { source: "iana" },
  "text/flexfec": { source: "iana" },
  "text/fwdred": { source: "iana" },
  "text/gff3": { source: "iana" },
  "text/grammar-ref-list": { source: "iana" },
  "text/html": {
    source: "iana",
    compressible: !0,
    extensions: ["html", "htm", "shtml"],
  },
  "text/jade": { extensions: ["jade"] },
  "text/javascript": { source: "iana", compressible: !0 },
  "text/jcr-cnd": { source: "iana" },
  "text/jsx": { compressible: !0, extensions: ["jsx"] },
  "text/less": { compressible: !0, extensions: ["less"] },
  "text/markdown": {
    source: "iana",
    compressible: !0,
    extensions: ["markdown", "md"],
  },
  "text/mathml": { source: "nginx", extensions: ["mml"] },
  "text/mdx": { compressible: !0, extensions: ["mdx"] },
  "text/mizar": { source: "iana" },
  "text/n3": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: ["n3"],
  },
  "text/parameters": { source: "iana", charset: "UTF-8" },
  "text/parityfec": { source: "iana" },
  "text/plain": {
    source: "iana",
    compressible: !0,
    extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
  },
  "text/provenance-notation": { source: "iana", charset: "UTF-8" },
  "text/prs.fallenstein.rst": { source: "iana" },
  "text/prs.lines.tag": { source: "iana", extensions: ["dsc"] },
  "text/prs.prop.logic": { source: "iana" },
  "text/raptorfec": { source: "iana" },
  "text/red": { source: "iana" },
  "text/rfc822-headers": { source: "iana" },
  "text/richtext": { source: "iana", compressible: !0, extensions: ["rtx"] },
  "text/rtf": { source: "iana", compressible: !0, extensions: ["rtf"] },
  "text/rtp-enc-aescm128": { source: "iana" },
  "text/rtploopback": { source: "iana" },
  "text/rtx": { source: "iana" },
  "text/sgml": { source: "iana", extensions: ["sgml", "sgm"] },
  "text/shaclc": { source: "iana" },
  "text/shex": { source: "iana", extensions: ["shex"] },
  "text/slim": { extensions: ["slim", "slm"] },
  "text/spdx": { source: "iana", extensions: ["spdx"] },
  "text/strings": { source: "iana" },
  "text/stylus": { extensions: ["stylus", "styl"] },
  "text/t140": { source: "iana" },
  "text/tab-separated-values": {
    source: "iana",
    compressible: !0,
    extensions: ["tsv"],
  },
  "text/troff": {
    source: "iana",
    extensions: ["t", "tr", "roff", "man", "me", "ms"],
  },
  "text/turtle": { source: "iana", charset: "UTF-8", extensions: ["ttl"] },
  "text/ulpfec": { source: "iana" },
  "text/uri-list": {
    source: "iana",
    compressible: !0,
    extensions: ["uri", "uris", "urls"],
  },
  "text/vcard": { source: "iana", compressible: !0, extensions: ["vcard"] },
  "text/vnd.a": { source: "iana" },
  "text/vnd.abc": { source: "iana" },
  "text/vnd.ascii-art": { source: "iana" },
  "text/vnd.curl": { source: "iana", extensions: ["curl"] },
  "text/vnd.curl.dcurl": { source: "apache", extensions: ["dcurl"] },
  "text/vnd.curl.mcurl": { source: "apache", extensions: ["mcurl"] },
  "text/vnd.curl.scurl": { source: "apache", extensions: ["scurl"] },
  "text/vnd.debian.copyright": { source: "iana", charset: "UTF-8" },
  "text/vnd.dmclientscript": { source: "iana" },
  "text/vnd.dvb.subtitle": { source: "iana", extensions: ["sub"] },
  "text/vnd.esmertec.theme-descriptor": { source: "iana", charset: "UTF-8" },
  "text/vnd.familysearch.gedcom": { source: "iana", extensions: ["ged"] },
  "text/vnd.ficlab.flt": { source: "iana" },
  "text/vnd.fly": { source: "iana", extensions: ["fly"] },
  "text/vnd.fmi.flexstor": { source: "iana", extensions: ["flx"] },
  "text/vnd.gml": { source: "iana" },
  "text/vnd.graphviz": { source: "iana", extensions: ["gv"] },
  "text/vnd.hans": { source: "iana" },
  "text/vnd.hgl": { source: "iana" },
  "text/vnd.in3d.3dml": { source: "iana", extensions: ["3dml"] },
  "text/vnd.in3d.spot": { source: "iana", extensions: ["spot"] },
  "text/vnd.iptc.newsml": { source: "iana" },
  "text/vnd.iptc.nitf": { source: "iana" },
  "text/vnd.latex-z": { source: "iana" },
  "text/vnd.motorola.reflex": { source: "iana" },
  "text/vnd.ms-mediapackage": { source: "iana" },
  "text/vnd.net2phone.commcenter.command": { source: "iana" },
  "text/vnd.radisys.msml-basic-layout": { source: "iana" },
  "text/vnd.senx.warpscript": { source: "iana" },
  "text/vnd.si.uricatalogue": { source: "iana" },
  "text/vnd.sosi": { source: "iana" },
  "text/vnd.sun.j2me.app-descriptor": {
    source: "iana",
    charset: "UTF-8",
    extensions: ["jad"],
  },
  "text/vnd.trolltech.linguist": { source: "iana", charset: "UTF-8" },
  "text/vnd.wap.si": { source: "iana" },
  "text/vnd.wap.sl": { source: "iana" },
  "text/vnd.wap.wml": { source: "iana", extensions: ["wml"] },
  "text/vnd.wap.wmlscript": { source: "iana", extensions: ["wmls"] },
  "text/vtt": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: ["vtt"],
  },
  "text/x-asm": { source: "apache", extensions: ["s", "asm"] },
  "text/x-c": {
    source: "apache",
    extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
  },
  "text/x-component": { source: "nginx", extensions: ["htc"] },
  "text/x-fortran": {
    source: "apache",
    extensions: ["f", "for", "f77", "f90"],
  },
  "text/x-gwt-rpc": { compressible: !0 },
  "text/x-handlebars-template": { extensions: ["hbs"] },
  "text/x-java-source": { source: "apache", extensions: ["java"] },
  "text/x-jquery-tmpl": { compressible: !0 },
  "text/x-lua": { extensions: ["lua"] },
  "text/x-markdown": { compressible: !0, extensions: ["mkd"] },
  "text/x-nfo": { source: "apache", extensions: ["nfo"] },
  "text/x-opml": { source: "apache", extensions: ["opml"] },
  "text/x-org": { compressible: !0, extensions: ["org"] },
  "text/x-pascal": { source: "apache", extensions: ["p", "pas"] },
  "text/x-processing": { compressible: !0, extensions: ["pde"] },
  "text/x-sass": { extensions: ["sass"] },
  "text/x-scss": { extensions: ["scss"] },
  "text/x-setext": { source: "apache", extensions: ["etx"] },
  "text/x-sfv": { source: "apache", extensions: ["sfv"] },
  "text/x-suse-ymp": { compressible: !0, extensions: ["ymp"] },
  "text/x-uuencode": { source: "apache", extensions: ["uu"] },
  "text/x-vcalendar": { source: "apache", extensions: ["vcs"] },
  "text/x-vcard": { source: "apache", extensions: ["vcf"] },
  "text/xml": { source: "iana", compressible: !0, extensions: ["xml"] },
  "text/xml-external-parsed-entity": { source: "iana" },
  "text/yaml": { compressible: !0, extensions: ["yaml", "yml"] },
  "video/1d-interleaved-parityfec": { source: "iana" },
  "video/3gpp": { source: "iana", extensions: ["3gp", "3gpp"] },
  "video/3gpp-tt": { source: "iana" },
  "video/3gpp2": { source: "iana", extensions: ["3g2"] },
  "video/av1": { source: "iana" },
  "video/bmpeg": { source: "iana" },
  "video/bt656": { source: "iana" },
  "video/celb": { source: "iana" },
  "video/dv": { source: "iana" },
  "video/encaprtp": { source: "iana" },
  "video/ffv1": { source: "iana" },
  "video/flexfec": { source: "iana" },
  "video/h261": { source: "iana", extensions: ["h261"] },
  "video/h263": { source: "iana", extensions: ["h263"] },
  "video/h263-1998": { source: "iana" },
  "video/h263-2000": { source: "iana" },
  "video/h264": { source: "iana", extensions: ["h264"] },
  "video/h264-rcdo": { source: "iana" },
  "video/h264-svc": { source: "iana" },
  "video/h265": { source: "iana" },
  "video/iso.segment": { source: "iana", extensions: ["m4s"] },
  "video/jpeg": { source: "iana", extensions: ["jpgv"] },
  "video/jpeg2000": { source: "iana" },
  "video/jpm": { source: "apache", extensions: ["jpm", "jpgm"] },
  "video/jxsv": { source: "iana" },
  "video/mj2": { source: "iana", extensions: ["mj2", "mjp2"] },
  "video/mp1s": { source: "iana" },
  "video/mp2p": { source: "iana" },
  "video/mp2t": { source: "iana", extensions: ["ts"] },
  "video/mp4": {
    source: "iana",
    compressible: !1,
    extensions: ["mp4", "mp4v", "mpg4"],
  },
  "video/mp4v-es": { source: "iana" },
  "video/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"],
  },
  "video/mpeg4-generic": { source: "iana" },
  "video/mpv": { source: "iana" },
  "video/nv": { source: "iana" },
  "video/ogg": { source: "iana", compressible: !1, extensions: ["ogv"] },
  "video/parityfec": { source: "iana" },
  "video/pointer": { source: "iana" },
  "video/quicktime": {
    source: "iana",
    compressible: !1,
    extensions: ["qt", "mov"],
  },
  "video/raptorfec": { source: "iana" },
  "video/raw": { source: "iana" },
  "video/rtp-enc-aescm128": { source: "iana" },
  "video/rtploopback": { source: "iana" },
  "video/rtx": { source: "iana" },
  "video/scip": { source: "iana" },
  "video/smpte291": { source: "iana" },
  "video/smpte292m": { source: "iana" },
  "video/ulpfec": { source: "iana" },
  "video/vc1": { source: "iana" },
  "video/vc2": { source: "iana" },
  "video/vnd.cctv": { source: "iana" },
  "video/vnd.dece.hd": { source: "iana", extensions: ["uvh", "uvvh"] },
  "video/vnd.dece.mobile": { source: "iana", extensions: ["uvm", "uvvm"] },
  "video/vnd.dece.mp4": { source: "iana" },
  "video/vnd.dece.pd": { source: "iana", extensions: ["uvp", "uvvp"] },
  "video/vnd.dece.sd": { source: "iana", extensions: ["uvs", "uvvs"] },
  "video/vnd.dece.video": { source: "iana", extensions: ["uvv", "uvvv"] },
  "video/vnd.directv.mpeg": { source: "iana" },
  "video/vnd.directv.mpeg-tts": { source: "iana" },
  "video/vnd.dlna.mpeg-tts": { source: "iana" },
  "video/vnd.dvb.file": { source: "iana", extensions: ["dvb"] },
  "video/vnd.fvt": { source: "iana", extensions: ["fvt"] },
  "video/vnd.hns.video": { source: "iana" },
  "video/vnd.iptvforum.1dparityfec-1010": { source: "iana" },
  "video/vnd.iptvforum.1dparityfec-2005": { source: "iana" },
  "video/vnd.iptvforum.2dparityfec-1010": { source: "iana" },
  "video/vnd.iptvforum.2dparityfec-2005": { source: "iana" },
  "video/vnd.iptvforum.ttsavc": { source: "iana" },
  "video/vnd.iptvforum.ttsmpeg2": { source: "iana" },
  "video/vnd.motorola.video": { source: "iana" },
  "video/vnd.motorola.videop": { source: "iana" },
  "video/vnd.mpegurl": { source: "iana", extensions: ["mxu", "m4u"] },
  "video/vnd.ms-playready.media.pyv": { source: "iana", extensions: ["pyv"] },
  "video/vnd.nokia.interleaved-multimedia": { source: "iana" },
  "video/vnd.nokia.mp4vr": { source: "iana" },
  "video/vnd.nokia.videovoip": { source: "iana" },
  "video/vnd.objectvideo": { source: "iana" },
  "video/vnd.radgamettools.bink": { source: "iana" },
  "video/vnd.radgamettools.smacker": { source: "iana" },
  "video/vnd.sealed.mpeg1": { source: "iana" },
  "video/vnd.sealed.mpeg4": { source: "iana" },
  "video/vnd.sealed.swf": { source: "iana" },
  "video/vnd.sealedmedia.softseal.mov": { source: "iana" },
  "video/vnd.uvvu.mp4": { source: "iana", extensions: ["uvu", "uvvu"] },
  "video/vnd.vivo": { source: "iana", extensions: ["viv"] },
  "video/vnd.youtube.yt": { source: "iana" },
  "video/vp8": { source: "iana" },
  "video/vp9": { source: "iana" },
  "video/webm": { source: "apache", compressible: !1, extensions: ["webm"] },
  "video/x-f4v": { source: "apache", extensions: ["f4v"] },
  "video/x-fli": { source: "apache", extensions: ["fli"] },
  "video/x-flv": { source: "apache", compressible: !1, extensions: ["flv"] },
  "video/x-m4v": { source: "apache", extensions: ["m4v"] },
  "video/x-matroska": {
    source: "apache",
    compressible: !1,
    extensions: ["mkv", "mk3d", "mks"],
  },
  "video/x-mng": { source: "apache", extensions: ["mng"] },
  "video/x-ms-asf": { source: "apache", extensions: ["asf", "asx"] },
  "video/x-ms-vob": { source: "apache", extensions: ["vob"] },
  "video/x-ms-wm": { source: "apache", extensions: ["wm"] },
  "video/x-ms-wmv": { source: "apache", compressible: !1, extensions: ["wmv"] },
  "video/x-ms-wmx": { source: "apache", extensions: ["wmx"] },
  "video/x-ms-wvx": { source: "apache", extensions: ["wvx"] },
  "video/x-msvideo": { source: "apache", extensions: ["avi"] },
  "video/x-sgi-movie": { source: "apache", extensions: ["movie"] },
  "video/x-smv": { source: "apache", extensions: ["smv"] },
  "x-conference/x-cooltalk": { source: "apache", extensions: ["ice"] },
  "x-shader/x-fragment": { compressible: !0 },
  "x-shader/x-vertex": { compressible: !0 },
};
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */ var Lt = Rt,
  qt = {},
  za = {};
za.byteLength = Ot;
za.toByteArray = Dt;
za.fromByteArray = Vt;
var ge = [],
  ue = [],
  Pt = typeof Uint8Array < "u" ? Uint8Array : Array,
  Va = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var $e = 0, _t = Va.length; $e < _t; ++$e)
  (ge[$e] = Va[$e]), (ue[Va.charCodeAt($e)] = $e);
ue["-".charCodeAt(0)] = 62;
ue["_".charCodeAt(0)] = 63;
function zi(e) {
  var a = e.length;
  if (a % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var n = e.indexOf("=");
  n === -1 && (n = a);
  var i = n === a ? 0 : 4 - (n % 4);
  return [n, i];
}
function Ot(e) {
  var a = zi(e),
    n = a[0],
    i = a[1];
  return ((n + i) * 3) / 4 - i;
}
function $t(e, a, n) {
  return ((a + n) * 3) / 4 - n;
}
function Dt(e) {
  var a,
    n = zi(e),
    i = n[0],
    s = n[1],
    o = new Pt($t(e, i, s)),
    t = 0,
    r = s > 0 ? i - 4 : i,
    p;
  for (p = 0; p < r; p += 4)
    (a =
      (ue[e.charCodeAt(p)] << 18) |
      (ue[e.charCodeAt(p + 1)] << 12) |
      (ue[e.charCodeAt(p + 2)] << 6) |
      ue[e.charCodeAt(p + 3)]),
      (o[t++] = (a >> 16) & 255),
      (o[t++] = (a >> 8) & 255),
      (o[t++] = a & 255);
  return (
    s === 2 &&
      ((a = (ue[e.charCodeAt(p)] << 2) | (ue[e.charCodeAt(p + 1)] >> 4)),
      (o[t++] = a & 255)),
    s === 1 &&
      ((a =
        (ue[e.charCodeAt(p)] << 10) |
        (ue[e.charCodeAt(p + 1)] << 4) |
        (ue[e.charCodeAt(p + 2)] >> 2)),
      (o[t++] = (a >> 8) & 255),
      (o[t++] = a & 255)),
    o
  );
}
function Nt(e) {
  return (
    ge[(e >> 18) & 63] + ge[(e >> 12) & 63] + ge[(e >> 6) & 63] + ge[e & 63]
  );
}
function Ht(e, a, n) {
  for (var i, s = [], o = a; o < n; o += 3)
    (i =
      ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (e[o + 2] & 255)),
      s.push(Nt(i));
  return s.join("");
}
function Vt(e) {
  for (
    var a, n = e.length, i = n % 3, s = [], o = 16383, t = 0, r = n - i;
    t < r;
    t += o
  )
    s.push(Ht(e, t, t + o > r ? r : t + o));
  return (
    i === 1
      ? ((a = e[n - 1]), s.push(ge[a >> 2] + ge[(a << 4) & 63] + "=="))
      : i === 2 &&
        ((a = (e[n - 2] << 8) + e[n - 1]),
        s.push(ge[a >> 10] + ge[(a >> 4) & 63] + ge[(a << 2) & 63] + "=")),
    s.join("")
  );
}
var mn = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ mn.read =
  function (e, a, n, i, s) {
    var o,
      t,
      r = s * 8 - i - 1,
      p = (1 << r) - 1,
      f = p >> 1,
      m = -7,
      x = n ? s - 1 : 0,
      v = n ? -1 : 1,
      y = e[a + x];
    for (
      x += v, o = y & ((1 << -m) - 1), y >>= -m, m += r;
      m > 0;
      o = o * 256 + e[a + x], x += v, m -= 8
    );
    for (
      t = o & ((1 << -m) - 1), o >>= -m, m += i;
      m > 0;
      t = t * 256 + e[a + x], x += v, m -= 8
    );
    if (o === 0) o = 1 - f;
    else {
      if (o === p) return t ? NaN : (y ? -1 : 1) * (1 / 0);
      (t = t + Math.pow(2, i)), (o = o - f);
    }
    return (y ? -1 : 1) * t * Math.pow(2, o - i);
  };
mn.write = function (e, a, n, i, s, o) {
  var t,
    r,
    p,
    f = o * 8 - s - 1,
    m = (1 << f) - 1,
    x = m >> 1,
    v = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
    y = i ? 0 : o - 1,
    j = i ? 1 : -1,
    E = a < 0 || (a === 0 && 1 / a < 0) ? 1 : 0;
  for (
    a = Math.abs(a),
      isNaN(a) || a === 1 / 0
        ? ((r = isNaN(a) ? 1 : 0), (t = m))
        : ((t = Math.floor(Math.log(a) / Math.LN2)),
          a * (p = Math.pow(2, -t)) < 1 && (t--, (p *= 2)),
          t + x >= 1 ? (a += v / p) : (a += v * Math.pow(2, 1 - x)),
          a * p >= 2 && (t++, (p /= 2)),
          t + x >= m
            ? ((r = 0), (t = m))
            : t + x >= 1
            ? ((r = (a * p - 1) * Math.pow(2, s)), (t = t + x))
            : ((r = a * Math.pow(2, x - 1) * Math.pow(2, s)), (t = 0)));
    s >= 8;
    e[n + y] = r & 255, y += j, r /= 256, s -= 8
  );
  for (
    t = (t << s) | r, f += s;
    f > 0;
    e[n + y] = t & 255, y += j, t /= 256, f -= 8
  );
  e[n + y - j] |= E * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ (function (e) {
  var a = za,
    n = mn,
    i =
      typeof Symbol == "function" && typeof Symbol.for == "function"
        ? Symbol.for("nodejs.util.inspect.custom")
        : null;
  (e.Buffer = r), (e.SlowBuffer = M), (e.INSPECT_MAX_BYTES = 50);
  var s = 2147483647;
  (e.kMaxLength = s),
    (r.TYPED_ARRAY_SUPPORT = o()),
    !r.TYPED_ARRAY_SUPPORT &&
      typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
      );
  function o() {
    try {
      var u = new Uint8Array(1),
        c = {
          foo: function () {
            return 42;
          },
        };
      return (
        Object.setPrototypeOf(c, Uint8Array.prototype),
        Object.setPrototypeOf(u, c),
        u.foo() === 42
      );
    } catch {
      return !1;
    }
  }
  Object.defineProperty(r.prototype, "parent", {
    enumerable: !0,
    get: function () {
      if (r.isBuffer(this)) return this.buffer;
    },
  }),
    Object.defineProperty(r.prototype, "offset", {
      enumerable: !0,
      get: function () {
        if (r.isBuffer(this)) return this.byteOffset;
      },
    });
  function t(u) {
    if (u > s)
      throw new RangeError(
        'The value "' + u + '" is invalid for option "size"',
      );
    var c = new Uint8Array(u);
    return Object.setPrototypeOf(c, r.prototype), c;
  }
  function r(u, c, l) {
    if (typeof u == "number") {
      if (typeof c == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number',
        );
      return x(u);
    }
    return p(u, c, l);
  }
  r.poolSize = 8192;
  function p(u, c, l) {
    if (typeof u == "string") return v(u, c);
    if (ArrayBuffer.isView(u)) return j(u);
    if (u == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof u,
      );
    if (
      xe(u, ArrayBuffer) ||
      (u && xe(u.buffer, ArrayBuffer)) ||
      (typeof SharedArrayBuffer < "u" &&
        (xe(u, SharedArrayBuffer) || (u && xe(u.buffer, SharedArrayBuffer))))
    )
      return E(u, c, l);
    if (typeof u == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number',
      );
    var d = u.valueOf && u.valueOf();
    if (d != null && d !== u) return r.from(d, c, l);
    var h = T(u);
    if (h) return h;
    if (
      typeof Symbol < "u" &&
      Symbol.toPrimitive != null &&
      typeof u[Symbol.toPrimitive] == "function"
    )
      return r.from(u[Symbol.toPrimitive]("string"), c, l);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof u,
    );
  }
  (r.from = function (u, c, l) {
    return p(u, c, l);
  }),
    Object.setPrototypeOf(r.prototype, Uint8Array.prototype),
    Object.setPrototypeOf(r, Uint8Array);
  function f(u) {
    if (typeof u != "number")
      throw new TypeError('"size" argument must be of type number');
    if (u < 0)
      throw new RangeError(
        'The value "' + u + '" is invalid for option "size"',
      );
  }
  function m(u, c, l) {
    return (
      f(u),
      u <= 0
        ? t(u)
        : c !== void 0
        ? typeof l == "string"
          ? t(u).fill(c, l)
          : t(u).fill(c)
        : t(u)
    );
  }
  r.alloc = function (u, c, l) {
    return m(u, c, l);
  };
  function x(u) {
    return f(u), t(u < 0 ? 0 : F(u) | 0);
  }
  (r.allocUnsafe = function (u) {
    return x(u);
  }),
    (r.allocUnsafeSlow = function (u) {
      return x(u);
    });
  function v(u, c) {
    if (((typeof c != "string" || c === "") && (c = "utf8"), !r.isEncoding(c)))
      throw new TypeError("Unknown encoding: " + c);
    var l = q(u, c) | 0,
      d = t(l),
      h = d.write(u, c);
    return h !== l && (d = d.slice(0, h)), d;
  }
  function y(u) {
    for (
      var c = u.length < 0 ? 0 : F(u.length) | 0, l = t(c), d = 0;
      d < c;
      d += 1
    )
      l[d] = u[d] & 255;
    return l;
  }
  function j(u) {
    if (xe(u, Uint8Array)) {
      var c = new Uint8Array(u);
      return E(c.buffer, c.byteOffset, c.byteLength);
    }
    return y(u);
  }
  function E(u, c, l) {
    if (c < 0 || u.byteLength < c)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (u.byteLength < c + (l || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var d;
    return (
      c === void 0 && l === void 0
        ? (d = new Uint8Array(u))
        : l === void 0
        ? (d = new Uint8Array(u, c))
        : (d = new Uint8Array(u, c, l)),
      Object.setPrototypeOf(d, r.prototype),
      d
    );
  }
  function T(u) {
    if (r.isBuffer(u)) {
      var c = F(u.length) | 0,
        l = t(c);
      return l.length === 0 || u.copy(l, 0, 0, c), l;
    }
    if (u.length !== void 0)
      return typeof u.length != "number" || Ra(u.length) ? t(0) : y(u);
    if (u.type === "Buffer" && Array.isArray(u.data)) return y(u.data);
  }
  function F(u) {
    if (u >= s)
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          s.toString(16) +
          " bytes",
      );
    return u | 0;
  }
  function M(u) {
    return +u != u && (u = 0), r.alloc(+u);
  }
  (r.isBuffer = function (c) {
    return c != null && c._isBuffer === !0 && c !== r.prototype;
  }),
    (r.compare = function (c, l) {
      if (
        (xe(c, Uint8Array) && (c = r.from(c, c.offset, c.byteLength)),
        xe(l, Uint8Array) && (l = r.from(l, l.offset, l.byteLength)),
        !r.isBuffer(c) || !r.isBuffer(l))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
        );
      if (c === l) return 0;
      for (
        var d = c.length, h = l.length, b = 0, g = Math.min(d, h);
        b < g;
        ++b
      )
        if (c[b] !== l[b]) {
          (d = c[b]), (h = l[b]);
          break;
        }
      return d < h ? -1 : h < d ? 1 : 0;
    }),
    (r.isEncoding = function (c) {
      switch (String(c).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }),
    (r.concat = function (c, l) {
      if (!Array.isArray(c))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (c.length === 0) return r.alloc(0);
      var d;
      if (l === void 0) for (l = 0, d = 0; d < c.length; ++d) l += c[d].length;
      var h = r.allocUnsafe(l),
        b = 0;
      for (d = 0; d < c.length; ++d) {
        var g = c[d];
        if (xe(g, Uint8Array))
          b + g.length > h.length
            ? r.from(g).copy(h, b)
            : Uint8Array.prototype.set.call(h, g, b);
        else if (r.isBuffer(g)) g.copy(h, b);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        b += g.length;
      }
      return h;
    });
  function q(u, c) {
    if (r.isBuffer(u)) return u.length;
    if (ArrayBuffer.isView(u) || xe(u, ArrayBuffer)) return u.byteLength;
    if (typeof u != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof u,
      );
    var l = u.length,
      d = arguments.length > 2 && arguments[2] === !0;
    if (!d && l === 0) return 0;
    for (var h = !1; ; )
      switch (c) {
        case "ascii":
        case "latin1":
        case "binary":
          return l;
        case "utf8":
        case "utf-8":
          return Ba(u).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return l * 2;
        case "hex":
          return l >>> 1;
        case "base64":
          return bn(u).length;
        default:
          if (h) return d ? -1 : Ba(u).length;
          (c = ("" + c).toLowerCase()), (h = !0);
      }
  }
  r.byteLength = q;
  function D(u, c, l) {
    var d = !1;
    if (
      ((c === void 0 || c < 0) && (c = 0),
      c > this.length ||
        ((l === void 0 || l > this.length) && (l = this.length), l <= 0) ||
        ((l >>>= 0), (c >>>= 0), l <= c))
    )
      return "";
    for (u || (u = "utf8"); ; )
      switch (u) {
        case "hex":
          return _i(this, c, l);
        case "utf8":
        case "utf-8":
          return me(this, c, l);
        case "ascii":
          return Ie(this, c, l);
        case "latin1":
        case "binary":
          return Ia(this, c, l);
        case "base64":
          return te(this, c, l);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Oi(this, c, l);
        default:
          if (d) throw new TypeError("Unknown encoding: " + u);
          (u = (u + "").toLowerCase()), (d = !0);
      }
  }
  r.prototype._isBuffer = !0;
  function _(u, c, l) {
    var d = u[c];
    (u[c] = u[l]), (u[l] = d);
  }
  (r.prototype.swap16 = function () {
    var c = this.length;
    if (c % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var l = 0; l < c; l += 2) _(this, l, l + 1);
    return this;
  }),
    (r.prototype.swap32 = function () {
      var c = this.length;
      if (c % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var l = 0; l < c; l += 4) _(this, l, l + 3), _(this, l + 1, l + 2);
      return this;
    }),
    (r.prototype.swap64 = function () {
      var c = this.length;
      if (c % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var l = 0; l < c; l += 8)
        _(this, l, l + 7),
          _(this, l + 1, l + 6),
          _(this, l + 2, l + 5),
          _(this, l + 3, l + 4);
      return this;
    }),
    (r.prototype.toString = function () {
      var c = this.length;
      return c === 0
        ? ""
        : arguments.length === 0
        ? me(this, 0, c)
        : D.apply(this, arguments);
    }),
    (r.prototype.toLocaleString = r.prototype.toString),
    (r.prototype.equals = function (c) {
      if (!r.isBuffer(c)) throw new TypeError("Argument must be a Buffer");
      return this === c ? !0 : r.compare(this, c) === 0;
    }),
    (r.prototype.inspect = function () {
      var c = "",
        l = e.INSPECT_MAX_BYTES;
      return (
        (c = this.toString("hex", 0, l)
          .replace(/(.{2})/g, "$1 ")
          .trim()),
        this.length > l && (c += " ... "),
        "<Buffer " + c + ">"
      );
    }),
    i && (r.prototype[i] = r.prototype.inspect),
    (r.prototype.compare = function (c, l, d, h, b) {
      if (
        (xe(c, Uint8Array) && (c = r.from(c, c.offset, c.byteLength)),
        !r.isBuffer(c))
      )
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof c,
        );
      if (
        (l === void 0 && (l = 0),
        d === void 0 && (d = c ? c.length : 0),
        h === void 0 && (h = 0),
        b === void 0 && (b = this.length),
        l < 0 || d > c.length || h < 0 || b > this.length)
      )
        throw new RangeError("out of range index");
      if (h >= b && l >= d) return 0;
      if (h >= b) return -1;
      if (l >= d) return 1;
      if (((l >>>= 0), (d >>>= 0), (h >>>= 0), (b >>>= 0), this === c))
        return 0;
      for (
        var g = b - h,
          I = d - l,
          L = Math.min(g, I),
          $ = this.slice(h, b),
          Z = c.slice(l, d),
          H = 0;
        H < L;
        ++H
      )
        if ($[H] !== Z[H]) {
          (g = $[H]), (I = Z[H]);
          break;
        }
      return g < I ? -1 : I < g ? 1 : 0;
    });
  function pe(u, c, l, d, h) {
    if (u.length === 0) return -1;
    if (
      (typeof l == "string"
        ? ((d = l), (l = 0))
        : l > 2147483647
        ? (l = 2147483647)
        : l < -2147483648 && (l = -2147483648),
      (l = +l),
      Ra(l) && (l = h ? 0 : u.length - 1),
      l < 0 && (l = u.length + l),
      l >= u.length)
    ) {
      if (h) return -1;
      l = u.length - 1;
    } else if (l < 0)
      if (h) l = 0;
      else return -1;
    if ((typeof c == "string" && (c = r.from(c, d)), r.isBuffer(c)))
      return c.length === 0 ? -1 : Se(u, c, l, d, h);
    if (typeof c == "number")
      return (
        (c = c & 255),
        typeof Uint8Array.prototype.indexOf == "function"
          ? h
            ? Uint8Array.prototype.indexOf.call(u, c, l)
            : Uint8Array.prototype.lastIndexOf.call(u, c, l)
          : Se(u, [c], l, d, h)
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  function Se(u, c, l, d, h) {
    var b = 1,
      g = u.length,
      I = c.length;
    if (
      d !== void 0 &&
      ((d = String(d).toLowerCase()),
      d === "ucs2" || d === "ucs-2" || d === "utf16le" || d === "utf-16le")
    ) {
      if (u.length < 2 || c.length < 2) return -1;
      (b = 2), (g /= 2), (I /= 2), (l /= 2);
    }
    function L(gn, wn) {
      return b === 1 ? gn[wn] : gn.readUInt16BE(wn * b);
    }
    var $;
    if (h) {
      var Z = -1;
      for ($ = l; $ < g; $++)
        if (L(u, $) === L(c, Z === -1 ? 0 : $ - Z)) {
          if ((Z === -1 && (Z = $), $ - Z + 1 === I)) return Z * b;
        } else Z !== -1 && ($ -= $ - Z), (Z = -1);
    } else
      for (l + I > g && (l = g - I), $ = l; $ >= 0; $--) {
        for (var H = !0, pa = 0; pa < I; pa++)
          if (L(u, $ + pa) !== L(c, pa)) {
            H = !1;
            break;
          }
        if (H) return $;
      }
    return -1;
  }
  (r.prototype.includes = function (c, l, d) {
    return this.indexOf(c, l, d) !== -1;
  }),
    (r.prototype.indexOf = function (c, l, d) {
      return pe(this, c, l, d, !0);
    }),
    (r.prototype.lastIndexOf = function (c, l, d) {
      return pe(this, c, l, d, !1);
    });
  function ze(u, c, l, d) {
    l = Number(l) || 0;
    var h = u.length - l;
    d ? ((d = Number(d)), d > h && (d = h)) : (d = h);
    var b = c.length;
    d > b / 2 && (d = b / 2);
    for (var g = 0; g < d; ++g) {
      var I = parseInt(c.substr(g * 2, 2), 16);
      if (Ra(I)) return g;
      u[l + g] = I;
    }
    return g;
  }
  function R(u, c, l, d) {
    return la(Ba(c, u.length - l), u, l, d);
  }
  function A(u, c, l, d) {
    return la(Ni(c), u, l, d);
  }
  function z(u, c, l, d) {
    return la(bn(c), u, l, d);
  }
  function O(u, c, l, d) {
    return la(Hi(c, u.length - l), u, l, d);
  }
  (r.prototype.write = function (c, l, d, h) {
    if (l === void 0) (h = "utf8"), (d = this.length), (l = 0);
    else if (d === void 0 && typeof l == "string")
      (h = l), (d = this.length), (l = 0);
    else if (isFinite(l))
      (l = l >>> 0),
        isFinite(d)
          ? ((d = d >>> 0), h === void 0 && (h = "utf8"))
          : ((h = d), (d = void 0));
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported",
      );
    var b = this.length - l;
    if (
      ((d === void 0 || d > b) && (d = b),
      (c.length > 0 && (d < 0 || l < 0)) || l > this.length)
    )
      throw new RangeError("Attempt to write outside buffer bounds");
    h || (h = "utf8");
    for (var g = !1; ; )
      switch (h) {
        case "hex":
          return ze(this, c, l, d);
        case "utf8":
        case "utf-8":
          return R(this, c, l, d);
        case "ascii":
        case "latin1":
        case "binary":
          return A(this, c, l, d);
        case "base64":
          return z(this, c, l, d);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return O(this, c, l, d);
        default:
          if (g) throw new TypeError("Unknown encoding: " + h);
          (h = ("" + h).toLowerCase()), (g = !0);
      }
  }),
    (r.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    });
  function te(u, c, l) {
    return c === 0 && l === u.length
      ? a.fromByteArray(u)
      : a.fromByteArray(u.slice(c, l));
  }
  function me(u, c, l) {
    l = Math.min(u.length, l);
    for (var d = [], h = c; h < l; ) {
      var b = u[h],
        g = null,
        I = b > 239 ? 4 : b > 223 ? 3 : b > 191 ? 2 : 1;
      if (h + I <= l) {
        var L, $, Z, H;
        switch (I) {
          case 1:
            b < 128 && (g = b);
            break;
          case 2:
            (L = u[h + 1]),
              (L & 192) === 128 &&
                ((H = ((b & 31) << 6) | (L & 63)), H > 127 && (g = H));
            break;
          case 3:
            (L = u[h + 1]),
              ($ = u[h + 2]),
              (L & 192) === 128 &&
                ($ & 192) === 128 &&
                ((H = ((b & 15) << 12) | ((L & 63) << 6) | ($ & 63)),
                H > 2047 && (H < 55296 || H > 57343) && (g = H));
            break;
          case 4:
            (L = u[h + 1]),
              ($ = u[h + 2]),
              (Z = u[h + 3]),
              (L & 192) === 128 &&
                ($ & 192) === 128 &&
                (Z & 192) === 128 &&
                ((H =
                  ((b & 15) << 18) |
                  ((L & 63) << 12) |
                  (($ & 63) << 6) |
                  (Z & 63)),
                H > 65535 && H < 1114112 && (g = H));
        }
      }
      g === null
        ? ((g = 65533), (I = 1))
        : g > 65535 &&
          ((g -= 65536),
          d.push(((g >>> 10) & 1023) | 55296),
          (g = 56320 | (g & 1023))),
        d.push(g),
        (h += I);
    }
    return fe(d);
  }
  var Te = 4096;
  function fe(u) {
    var c = u.length;
    if (c <= Te) return String.fromCharCode.apply(String, u);
    for (var l = "", d = 0; d < c; )
      l += String.fromCharCode.apply(String, u.slice(d, (d += Te)));
    return l;
  }
  function Ie(u, c, l) {
    var d = "";
    l = Math.min(u.length, l);
    for (var h = c; h < l; ++h) d += String.fromCharCode(u[h] & 127);
    return d;
  }
  function Ia(u, c, l) {
    var d = "";
    l = Math.min(u.length, l);
    for (var h = c; h < l; ++h) d += String.fromCharCode(u[h]);
    return d;
  }
  function _i(u, c, l) {
    var d = u.length;
    (!c || c < 0) && (c = 0), (!l || l < 0 || l > d) && (l = d);
    for (var h = "", b = c; b < l; ++b) h += Vi[u[b]];
    return h;
  }
  function Oi(u, c, l) {
    for (var d = u.slice(c, l), h = "", b = 0; b < d.length - 1; b += 2)
      h += String.fromCharCode(d[b] + d[b + 1] * 256);
    return h;
  }
  r.prototype.slice = function (c, l) {
    var d = this.length;
    (c = ~~c),
      (l = l === void 0 ? d : ~~l),
      c < 0 ? ((c += d), c < 0 && (c = 0)) : c > d && (c = d),
      l < 0 ? ((l += d), l < 0 && (l = 0)) : l > d && (l = d),
      l < c && (l = c);
    var h = this.subarray(c, l);
    return Object.setPrototypeOf(h, r.prototype), h;
  };
  function G(u, c, l) {
    if (u % 1 !== 0 || u < 0) throw new RangeError("offset is not uint");
    if (u + c > l)
      throw new RangeError("Trying to access beyond buffer length");
  }
  (r.prototype.readUintLE = r.prototype.readUIntLE =
    function (c, l, d) {
      (c = c >>> 0), (l = l >>> 0), d || G(c, l, this.length);
      for (var h = this[c], b = 1, g = 0; ++g < l && (b *= 256); )
        h += this[c + g] * b;
      return h;
    }),
    (r.prototype.readUintBE = r.prototype.readUIntBE =
      function (c, l, d) {
        (c = c >>> 0), (l = l >>> 0), d || G(c, l, this.length);
        for (var h = this[c + --l], b = 1; l > 0 && (b *= 256); )
          h += this[c + --l] * b;
        return h;
      }),
    (r.prototype.readUint8 = r.prototype.readUInt8 =
      function (c, l) {
        return (c = c >>> 0), l || G(c, 1, this.length), this[c];
      }),
    (r.prototype.readUint16LE = r.prototype.readUInt16LE =
      function (c, l) {
        return (
          (c = c >>> 0), l || G(c, 2, this.length), this[c] | (this[c + 1] << 8)
        );
      }),
    (r.prototype.readUint16BE = r.prototype.readUInt16BE =
      function (c, l) {
        return (
          (c = c >>> 0), l || G(c, 2, this.length), (this[c] << 8) | this[c + 1]
        );
      }),
    (r.prototype.readUint32LE = r.prototype.readUInt32LE =
      function (c, l) {
        return (
          (c = c >>> 0),
          l || G(c, 4, this.length),
          (this[c] | (this[c + 1] << 8) | (this[c + 2] << 16)) +
            this[c + 3] * 16777216
        );
      }),
    (r.prototype.readUint32BE = r.prototype.readUInt32BE =
      function (c, l) {
        return (
          (c = c >>> 0),
          l || G(c, 4, this.length),
          this[c] * 16777216 +
            ((this[c + 1] << 16) | (this[c + 2] << 8) | this[c + 3])
        );
      }),
    (r.prototype.readIntLE = function (c, l, d) {
      (c = c >>> 0), (l = l >>> 0), d || G(c, l, this.length);
      for (var h = this[c], b = 1, g = 0; ++g < l && (b *= 256); )
        h += this[c + g] * b;
      return (b *= 128), h >= b && (h -= Math.pow(2, 8 * l)), h;
    }),
    (r.prototype.readIntBE = function (c, l, d) {
      (c = c >>> 0), (l = l >>> 0), d || G(c, l, this.length);
      for (var h = l, b = 1, g = this[c + --h]; h > 0 && (b *= 256); )
        g += this[c + --h] * b;
      return (b *= 128), g >= b && (g -= Math.pow(2, 8 * l)), g;
    }),
    (r.prototype.readInt8 = function (c, l) {
      return (
        (c = c >>> 0),
        l || G(c, 1, this.length),
        this[c] & 128 ? (255 - this[c] + 1) * -1 : this[c]
      );
    }),
    (r.prototype.readInt16LE = function (c, l) {
      (c = c >>> 0), l || G(c, 2, this.length);
      var d = this[c] | (this[c + 1] << 8);
      return d & 32768 ? d | 4294901760 : d;
    }),
    (r.prototype.readInt16BE = function (c, l) {
      (c = c >>> 0), l || G(c, 2, this.length);
      var d = this[c + 1] | (this[c] << 8);
      return d & 32768 ? d | 4294901760 : d;
    }),
    (r.prototype.readInt32LE = function (c, l) {
      return (
        (c = c >>> 0),
        l || G(c, 4, this.length),
        this[c] | (this[c + 1] << 8) | (this[c + 2] << 16) | (this[c + 3] << 24)
      );
    }),
    (r.prototype.readInt32BE = function (c, l) {
      return (
        (c = c >>> 0),
        l || G(c, 4, this.length),
        (this[c] << 24) | (this[c + 1] << 16) | (this[c + 2] << 8) | this[c + 3]
      );
    }),
    (r.prototype.readFloatLE = function (c, l) {
      return (
        (c = c >>> 0), l || G(c, 4, this.length), n.read(this, c, !0, 23, 4)
      );
    }),
    (r.prototype.readFloatBE = function (c, l) {
      return (
        (c = c >>> 0), l || G(c, 4, this.length), n.read(this, c, !1, 23, 4)
      );
    }),
    (r.prototype.readDoubleLE = function (c, l) {
      return (
        (c = c >>> 0), l || G(c, 8, this.length), n.read(this, c, !0, 52, 8)
      );
    }),
    (r.prototype.readDoubleBE = function (c, l) {
      return (
        (c = c >>> 0), l || G(c, 8, this.length), n.read(this, c, !1, 52, 8)
      );
    });
  function oe(u, c, l, d, h, b) {
    if (!r.isBuffer(u))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (c > h || c < b)
      throw new RangeError('"value" argument is out of bounds');
    if (l + d > u.length) throw new RangeError("Index out of range");
  }
  (r.prototype.writeUintLE = r.prototype.writeUIntLE =
    function (c, l, d, h) {
      if (((c = +c), (l = l >>> 0), (d = d >>> 0), !h)) {
        var b = Math.pow(2, 8 * d) - 1;
        oe(this, c, l, d, b, 0);
      }
      var g = 1,
        I = 0;
      for (this[l] = c & 255; ++I < d && (g *= 256); )
        this[l + I] = (c / g) & 255;
      return l + d;
    }),
    (r.prototype.writeUintBE = r.prototype.writeUIntBE =
      function (c, l, d, h) {
        if (((c = +c), (l = l >>> 0), (d = d >>> 0), !h)) {
          var b = Math.pow(2, 8 * d) - 1;
          oe(this, c, l, d, b, 0);
        }
        var g = d - 1,
          I = 1;
        for (this[l + g] = c & 255; --g >= 0 && (I *= 256); )
          this[l + g] = (c / I) & 255;
        return l + d;
      }),
    (r.prototype.writeUint8 = r.prototype.writeUInt8 =
      function (c, l, d) {
        return (
          (c = +c),
          (l = l >>> 0),
          d || oe(this, c, l, 1, 255, 0),
          (this[l] = c & 255),
          l + 1
        );
      }),
    (r.prototype.writeUint16LE = r.prototype.writeUInt16LE =
      function (c, l, d) {
        return (
          (c = +c),
          (l = l >>> 0),
          d || oe(this, c, l, 2, 65535, 0),
          (this[l] = c & 255),
          (this[l + 1] = c >>> 8),
          l + 2
        );
      }),
    (r.prototype.writeUint16BE = r.prototype.writeUInt16BE =
      function (c, l, d) {
        return (
          (c = +c),
          (l = l >>> 0),
          d || oe(this, c, l, 2, 65535, 0),
          (this[l] = c >>> 8),
          (this[l + 1] = c & 255),
          l + 2
        );
      }),
    (r.prototype.writeUint32LE = r.prototype.writeUInt32LE =
      function (c, l, d) {
        return (
          (c = +c),
          (l = l >>> 0),
          d || oe(this, c, l, 4, 4294967295, 0),
          (this[l + 3] = c >>> 24),
          (this[l + 2] = c >>> 16),
          (this[l + 1] = c >>> 8),
          (this[l] = c & 255),
          l + 4
        );
      }),
    (r.prototype.writeUint32BE = r.prototype.writeUInt32BE =
      function (c, l, d) {
        return (
          (c = +c),
          (l = l >>> 0),
          d || oe(this, c, l, 4, 4294967295, 0),
          (this[l] = c >>> 24),
          (this[l + 1] = c >>> 16),
          (this[l + 2] = c >>> 8),
          (this[l + 3] = c & 255),
          l + 4
        );
      }),
    (r.prototype.writeIntLE = function (c, l, d, h) {
      if (((c = +c), (l = l >>> 0), !h)) {
        var b = Math.pow(2, 8 * d - 1);
        oe(this, c, l, d, b - 1, -b);
      }
      var g = 0,
        I = 1,
        L = 0;
      for (this[l] = c & 255; ++g < d && (I *= 256); )
        c < 0 && L === 0 && this[l + g - 1] !== 0 && (L = 1),
          (this[l + g] = (((c / I) >> 0) - L) & 255);
      return l + d;
    }),
    (r.prototype.writeIntBE = function (c, l, d, h) {
      if (((c = +c), (l = l >>> 0), !h)) {
        var b = Math.pow(2, 8 * d - 1);
        oe(this, c, l, d, b - 1, -b);
      }
      var g = d - 1,
        I = 1,
        L = 0;
      for (this[l + g] = c & 255; --g >= 0 && (I *= 256); )
        c < 0 && L === 0 && this[l + g + 1] !== 0 && (L = 1),
          (this[l + g] = (((c / I) >> 0) - L) & 255);
      return l + d;
    }),
    (r.prototype.writeInt8 = function (c, l, d) {
      return (
        (c = +c),
        (l = l >>> 0),
        d || oe(this, c, l, 1, 127, -128),
        c < 0 && (c = 255 + c + 1),
        (this[l] = c & 255),
        l + 1
      );
    }),
    (r.prototype.writeInt16LE = function (c, l, d) {
      return (
        (c = +c),
        (l = l >>> 0),
        d || oe(this, c, l, 2, 32767, -32768),
        (this[l] = c & 255),
        (this[l + 1] = c >>> 8),
        l + 2
      );
    }),
    (r.prototype.writeInt16BE = function (c, l, d) {
      return (
        (c = +c),
        (l = l >>> 0),
        d || oe(this, c, l, 2, 32767, -32768),
        (this[l] = c >>> 8),
        (this[l + 1] = c & 255),
        l + 2
      );
    }),
    (r.prototype.writeInt32LE = function (c, l, d) {
      return (
        (c = +c),
        (l = l >>> 0),
        d || oe(this, c, l, 4, 2147483647, -2147483648),
        (this[l] = c & 255),
        (this[l + 1] = c >>> 8),
        (this[l + 2] = c >>> 16),
        (this[l + 3] = c >>> 24),
        l + 4
      );
    }),
    (r.prototype.writeInt32BE = function (c, l, d) {
      return (
        (c = +c),
        (l = l >>> 0),
        d || oe(this, c, l, 4, 2147483647, -2147483648),
        c < 0 && (c = 4294967295 + c + 1),
        (this[l] = c >>> 24),
        (this[l + 1] = c >>> 16),
        (this[l + 2] = c >>> 8),
        (this[l + 3] = c & 255),
        l + 4
      );
    });
  function xn(u, c, l, d, h, b) {
    if (l + d > u.length) throw new RangeError("Index out of range");
    if (l < 0) throw new RangeError("Index out of range");
  }
  function hn(u, c, l, d, h) {
    return (
      (c = +c),
      (l = l >>> 0),
      h || xn(u, c, l, 4),
      n.write(u, c, l, d, 23, 4),
      l + 4
    );
  }
  (r.prototype.writeFloatLE = function (c, l, d) {
    return hn(this, c, l, !0, d);
  }),
    (r.prototype.writeFloatBE = function (c, l, d) {
      return hn(this, c, l, !1, d);
    });
  function vn(u, c, l, d, h) {
    return (
      (c = +c),
      (l = l >>> 0),
      h || xn(u, c, l, 8),
      n.write(u, c, l, d, 52, 8),
      l + 8
    );
  }
  (r.prototype.writeDoubleLE = function (c, l, d) {
    return vn(this, c, l, !0, d);
  }),
    (r.prototype.writeDoubleBE = function (c, l, d) {
      return vn(this, c, l, !1, d);
    }),
    (r.prototype.copy = function (c, l, d, h) {
      if (!r.isBuffer(c)) throw new TypeError("argument should be a Buffer");
      if (
        (d || (d = 0),
        !h && h !== 0 && (h = this.length),
        l >= c.length && (l = c.length),
        l || (l = 0),
        h > 0 && h < d && (h = d),
        h === d || c.length === 0 || this.length === 0)
      )
        return 0;
      if (l < 0) throw new RangeError("targetStart out of bounds");
      if (d < 0 || d >= this.length) throw new RangeError("Index out of range");
      if (h < 0) throw new RangeError("sourceEnd out of bounds");
      h > this.length && (h = this.length),
        c.length - l < h - d && (h = c.length - l + d);
      var b = h - d;
      return (
        this === c && typeof Uint8Array.prototype.copyWithin == "function"
          ? this.copyWithin(l, d, h)
          : Uint8Array.prototype.set.call(c, this.subarray(d, h), l),
        b
      );
    }),
    (r.prototype.fill = function (c, l, d, h) {
      if (typeof c == "string") {
        if (
          (typeof l == "string"
            ? ((h = l), (l = 0), (d = this.length))
            : typeof d == "string" && ((h = d), (d = this.length)),
          h !== void 0 && typeof h != "string")
        )
          throw new TypeError("encoding must be a string");
        if (typeof h == "string" && !r.isEncoding(h))
          throw new TypeError("Unknown encoding: " + h);
        if (c.length === 1) {
          var b = c.charCodeAt(0);
          ((h === "utf8" && b < 128) || h === "latin1") && (c = b);
        }
      } else
        typeof c == "number"
          ? (c = c & 255)
          : typeof c == "boolean" && (c = Number(c));
      if (l < 0 || this.length < l || this.length < d)
        throw new RangeError("Out of range index");
      if (d <= l) return this;
      (l = l >>> 0), (d = d === void 0 ? this.length : d >>> 0), c || (c = 0);
      var g;
      if (typeof c == "number") for (g = l; g < d; ++g) this[g] = c;
      else {
        var I = r.isBuffer(c) ? c : r.from(c, h),
          L = I.length;
        if (L === 0)
          throw new TypeError(
            'The value "' + c + '" is invalid for argument "value"',
          );
        for (g = 0; g < d - l; ++g) this[g + l] = I[g % L];
      }
      return this;
    });
  var $i = /[^+/0-9A-Za-z-_]/g;
  function Di(u) {
    if (((u = u.split("=")[0]), (u = u.trim().replace($i, "")), u.length < 2))
      return "";
    for (; u.length % 4 !== 0; ) u = u + "=";
    return u;
  }
  function Ba(u, c) {
    c = c || 1 / 0;
    for (var l, d = u.length, h = null, b = [], g = 0; g < d; ++g) {
      if (((l = u.charCodeAt(g)), l > 55295 && l < 57344)) {
        if (!h) {
          if (l > 56319) {
            (c -= 3) > -1 && b.push(239, 191, 189);
            continue;
          } else if (g + 1 === d) {
            (c -= 3) > -1 && b.push(239, 191, 189);
            continue;
          }
          h = l;
          continue;
        }
        if (l < 56320) {
          (c -= 3) > -1 && b.push(239, 191, 189), (h = l);
          continue;
        }
        l = (((h - 55296) << 10) | (l - 56320)) + 65536;
      } else h && (c -= 3) > -1 && b.push(239, 191, 189);
      if (((h = null), l < 128)) {
        if ((c -= 1) < 0) break;
        b.push(l);
      } else if (l < 2048) {
        if ((c -= 2) < 0) break;
        b.push((l >> 6) | 192, (l & 63) | 128);
      } else if (l < 65536) {
        if ((c -= 3) < 0) break;
        b.push((l >> 12) | 224, ((l >> 6) & 63) | 128, (l & 63) | 128);
      } else if (l < 1114112) {
        if ((c -= 4) < 0) break;
        b.push(
          (l >> 18) | 240,
          ((l >> 12) & 63) | 128,
          ((l >> 6) & 63) | 128,
          (l & 63) | 128,
        );
      } else throw new Error("Invalid code point");
    }
    return b;
  }
  function Ni(u) {
    for (var c = [], l = 0; l < u.length; ++l) c.push(u.charCodeAt(l) & 255);
    return c;
  }
  function Hi(u, c) {
    for (var l, d, h, b = [], g = 0; g < u.length && !((c -= 2) < 0); ++g)
      (l = u.charCodeAt(g)), (d = l >> 8), (h = l % 256), b.push(h), b.push(d);
    return b;
  }
  function bn(u) {
    return a.toByteArray(Di(u));
  }
  function la(u, c, l, d) {
    for (var h = 0; h < d && !(h + l >= c.length || h >= u.length); ++h)
      c[h + l] = u[h];
    return h;
  }
  function xe(u, c) {
    return (
      u instanceof c ||
      (u != null &&
        u.constructor != null &&
        u.constructor.name != null &&
        u.constructor.name === c.name)
    );
  }
  function Ra(u) {
    return u !== u;
  }
  var Vi = (function () {
    for (var u = "0123456789abcdef", c = new Array(256), l = 0; l < 16; ++l)
      for (var d = l * 16, h = 0; h < 16; ++h) c[d + h] = u[l] + u[h];
    return c;
  })();
})(qt);
var Ii = { exports: {} },
  W = (Ii.exports = {}),
  ve,
  be;
function on() {
  throw new Error("setTimeout has not been defined");
}
function tn() {
  throw new Error("clearTimeout has not been defined");
}
(function () {
  try {
    typeof setTimeout == "function" ? (ve = setTimeout) : (ve = on);
  } catch {
    ve = on;
  }
  try {
    typeof clearTimeout == "function" ? (be = clearTimeout) : (be = tn);
  } catch {
    be = tn;
  }
})();
function Bi(e) {
  if (ve === setTimeout) return setTimeout(e, 0);
  if ((ve === on || !ve) && setTimeout)
    return (ve = setTimeout), setTimeout(e, 0);
  try {
    return ve(e, 0);
  } catch {
    try {
      return ve.call(null, e, 0);
    } catch {
      return ve.call(this, e, 0);
    }
  }
}
function Wt(e) {
  if (be === clearTimeout) return clearTimeout(e);
  if ((be === tn || !be) && clearTimeout)
    return (be = clearTimeout), clearTimeout(e);
  try {
    return be(e);
  } catch {
    try {
      return be.call(null, e);
    } catch {
      return be.call(this, e);
    }
  }
}
var je = [],
  We = !1,
  Le,
  va = -1;
function Kt() {
  !We ||
    !Le ||
    ((We = !1),
    Le.length ? (je = Le.concat(je)) : (va = -1),
    je.length && Ri());
}
function Ri() {
  if (!We) {
    var e = Bi(Kt);
    We = !0;
    for (var a = je.length; a; ) {
      for (Le = je, je = []; ++va < a; ) Le && Le[va].run();
      (va = -1), (a = je.length);
    }
    (Le = null), (We = !1), Wt(e);
  }
}
W.nextTick = function (e) {
  var a = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var n = 1; n < arguments.length; n++) a[n - 1] = arguments[n];
  je.push(new Li(e, a)), je.length === 1 && !We && Bi(Ri);
};
function Li(e, a) {
  (this.fun = e), (this.array = a);
}
Li.prototype.run = function () {
  this.fun.apply(null, this.array);
};
W.title = "browser";
W.browser = !0;
W.env = {};
W.argv = [];
W.version = "";
W.versions = {};
function Ae() {}
W.on = Ae;
W.addListener = Ae;
W.once = Ae;
W.off = Ae;
W.removeListener = Ae;
W.removeAllListeners = Ae;
W.emit = Ae;
W.prependListener = Ae;
W.prependOnceListener = Ae;
W.listeners = function (e) {
  return [];
};
W.binding = function (e) {
  throw new Error("process.binding is not supported");
};
W.cwd = function () {
  return "/";
};
W.chdir = function (e) {
  throw new Error("process.chdir is not supported");
};
W.umask = function () {
  return 0;
};
var Gt = Ii.exports;
const Jt = Ma(Gt);
(function (e) {
  function a() {
    var i = this || self;
    return delete e.prototype.__magic__, i;
  }
  if (typeof globalThis == "object") return globalThis;
  if (this) return a();
  e.defineProperty(e.prototype, "__magic__", { configurable: !0, get: a });
  var n = __magic__;
  return n;
})(Object);
function he(e) {
  if (typeof e != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
}
function $n(e, a) {
  for (var n = "", i = 0, s = -1, o = 0, t, r = 0; r <= e.length; ++r) {
    if (r < e.length) t = e.charCodeAt(r);
    else {
      if (t === 47) break;
      t = 47;
    }
    if (t === 47) {
      if (!(s === r - 1 || o === 1))
        if (s !== r - 1 && o === 2) {
          if (
            n.length < 2 ||
            i !== 2 ||
            n.charCodeAt(n.length - 1) !== 46 ||
            n.charCodeAt(n.length - 2) !== 46
          ) {
            if (n.length > 2) {
              var p = n.lastIndexOf("/");
              if (p !== n.length - 1) {
                p === -1
                  ? ((n = ""), (i = 0))
                  : ((n = n.slice(0, p)),
                    (i = n.length - 1 - n.lastIndexOf("/"))),
                  (s = r),
                  (o = 0);
                continue;
              }
            } else if (n.length === 2 || n.length === 1) {
              (n = ""), (i = 0), (s = r), (o = 0);
              continue;
            }
          }
          a && (n.length > 0 ? (n += "/..") : (n = ".."), (i = 2));
        } else
          n.length > 0
            ? (n += "/" + e.slice(s + 1, r))
            : (n = e.slice(s + 1, r)),
            (i = r - s - 1);
      (s = r), (o = 0);
    } else t === 46 && o !== -1 ? ++o : (o = -1);
  }
  return n;
}
function Xt(e, a) {
  var n = a.dir || a.root,
    i = a.base || (a.name || "") + (a.ext || "");
  return n ? (n === a.root ? n + i : n + e + i) : i;
}
var Ke = {
  resolve: function () {
    for (var a = "", n = !1, i, s = arguments.length - 1; s >= -1 && !n; s--) {
      var o;
      s >= 0 ? (o = arguments[s]) : (i === void 0 && (i = Jt.cwd()), (o = i)),
        he(o),
        o.length !== 0 && ((a = o + "/" + a), (n = o.charCodeAt(0) === 47));
    }
    return (
      (a = $n(a, !n)),
      n ? (a.length > 0 ? "/" + a : "/") : a.length > 0 ? a : "."
    );
  },
  normalize: function (a) {
    if ((he(a), a.length === 0)) return ".";
    var n = a.charCodeAt(0) === 47,
      i = a.charCodeAt(a.length - 1) === 47;
    return (
      (a = $n(a, !n)),
      a.length === 0 && !n && (a = "."),
      a.length > 0 && i && (a += "/"),
      n ? "/" + a : a
    );
  },
  isAbsolute: function (a) {
    return he(a), a.length > 0 && a.charCodeAt(0) === 47;
  },
  join: function () {
    if (arguments.length === 0) return ".";
    for (var a, n = 0; n < arguments.length; ++n) {
      var i = arguments[n];
      he(i), i.length > 0 && (a === void 0 ? (a = i) : (a += "/" + i));
    }
    return a === void 0 ? "." : Ke.normalize(a);
  },
  relative: function (a, n) {
    if (
      (he(a),
      he(n),
      a === n || ((a = Ke.resolve(a)), (n = Ke.resolve(n)), a === n))
    )
      return "";
    for (var i = 1; i < a.length && a.charCodeAt(i) === 47; ++i);
    for (
      var s = a.length, o = s - i, t = 1;
      t < n.length && n.charCodeAt(t) === 47;
      ++t
    );
    for (
      var r = n.length, p = r - t, f = o < p ? o : p, m = -1, x = 0;
      x <= f;
      ++x
    ) {
      if (x === f) {
        if (p > f) {
          if (n.charCodeAt(t + x) === 47) return n.slice(t + x + 1);
          if (x === 0) return n.slice(t + x);
        } else
          o > f && (a.charCodeAt(i + x) === 47 ? (m = x) : x === 0 && (m = 0));
        break;
      }
      var v = a.charCodeAt(i + x),
        y = n.charCodeAt(t + x);
      if (v !== y) break;
      v === 47 && (m = x);
    }
    var j = "";
    for (x = i + m + 1; x <= s; ++x)
      (x === s || a.charCodeAt(x) === 47) &&
        (j.length === 0 ? (j += "..") : (j += "/.."));
    return j.length > 0
      ? j + n.slice(t + m)
      : ((t += m), n.charCodeAt(t) === 47 && ++t, n.slice(t));
  },
  _makeLong: function (a) {
    return a;
  },
  dirname: function (a) {
    if ((he(a), a.length === 0)) return ".";
    for (
      var n = a.charCodeAt(0), i = n === 47, s = -1, o = !0, t = a.length - 1;
      t >= 1;
      --t
    )
      if (((n = a.charCodeAt(t)), n === 47)) {
        if (!o) {
          s = t;
          break;
        }
      } else o = !1;
    return s === -1 ? (i ? "/" : ".") : i && s === 1 ? "//" : a.slice(0, s);
  },
  basename: function (a, n) {
    if (n !== void 0 && typeof n != "string")
      throw new TypeError('"ext" argument must be a string');
    he(a);
    var i = 0,
      s = -1,
      o = !0,
      t;
    if (n !== void 0 && n.length > 0 && n.length <= a.length) {
      if (n.length === a.length && n === a) return "";
      var r = n.length - 1,
        p = -1;
      for (t = a.length - 1; t >= 0; --t) {
        var f = a.charCodeAt(t);
        if (f === 47) {
          if (!o) {
            i = t + 1;
            break;
          }
        } else
          p === -1 && ((o = !1), (p = t + 1)),
            r >= 0 &&
              (f === n.charCodeAt(r)
                ? --r === -1 && (s = t)
                : ((r = -1), (s = p)));
      }
      return i === s ? (s = p) : s === -1 && (s = a.length), a.slice(i, s);
    } else {
      for (t = a.length - 1; t >= 0; --t)
        if (a.charCodeAt(t) === 47) {
          if (!o) {
            i = t + 1;
            break;
          }
        } else s === -1 && ((o = !1), (s = t + 1));
      return s === -1 ? "" : a.slice(i, s);
    }
  },
  extname: function (a) {
    he(a);
    for (
      var n = -1, i = 0, s = -1, o = !0, t = 0, r = a.length - 1;
      r >= 0;
      --r
    ) {
      var p = a.charCodeAt(r);
      if (p === 47) {
        if (!o) {
          i = r + 1;
          break;
        }
        continue;
      }
      s === -1 && ((o = !1), (s = r + 1)),
        p === 46
          ? n === -1
            ? (n = r)
            : t !== 1 && (t = 1)
          : n !== -1 && (t = -1);
    }
    return n === -1 ||
      s === -1 ||
      t === 0 ||
      (t === 1 && n === s - 1 && n === i + 1)
      ? ""
      : a.slice(n, s);
  },
  format: function (a) {
    if (a === null || typeof a != "object")
      throw new TypeError(
        'The "pathObject" argument must be of type Object. Received type ' +
          typeof a,
      );
    return Xt("/", a);
  },
  parse: function (a) {
    he(a);
    var n = { root: "", dir: "", base: "", ext: "", name: "" };
    if (a.length === 0) return n;
    var i = a.charCodeAt(0),
      s = i === 47,
      o;
    s ? ((n.root = "/"), (o = 1)) : (o = 0);
    for (
      var t = -1, r = 0, p = -1, f = !0, m = a.length - 1, x = 0;
      m >= o;
      --m
    ) {
      if (((i = a.charCodeAt(m)), i === 47)) {
        if (!f) {
          r = m + 1;
          break;
        }
        continue;
      }
      p === -1 && ((f = !1), (p = m + 1)),
        i === 46
          ? t === -1
            ? (t = m)
            : x !== 1 && (x = 1)
          : t !== -1 && (x = -1);
    }
    return (
      t === -1 || p === -1 || x === 0 || (x === 1 && t === p - 1 && t === r + 1)
        ? p !== -1 &&
          (r === 0 && s
            ? (n.base = n.name = a.slice(1, p))
            : (n.base = n.name = a.slice(r, p)))
        : (r === 0 && s
            ? ((n.name = a.slice(1, t)), (n.base = a.slice(1, p)))
            : ((n.name = a.slice(r, t)), (n.base = a.slice(r, p))),
          (n.ext = a.slice(t, p))),
      r > 0 ? (n.dir = a.slice(0, r - 1)) : s && (n.dir = "/"),
      n
    );
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null,
};
Ke.posix = Ke;
var qi = Ke;
const Tr = Ma(qi);
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ (function (e) {
  var a = Lt,
    n = qi.extname,
    i = /^\s*([^;\s]*)(?:;|\s|$)/,
    s = /^text\//i;
  (e.charset = o),
    (e.charsets = { lookup: o }),
    (e.contentType = t),
    (e.extension = r),
    (e.extensions = Object.create(null)),
    (e.lookup = p),
    (e.types = Object.create(null)),
    f(e.extensions, e.types);
  function o(m) {
    if (!m || typeof m != "string") return !1;
    var x = i.exec(m),
      v = x && a[x[1].toLowerCase()];
    return v && v.charset ? v.charset : x && s.test(x[1]) ? "UTF-8" : !1;
  }
  function t(m) {
    if (!m || typeof m != "string") return !1;
    var x = m.indexOf("/") === -1 ? e.lookup(m) : m;
    if (!x) return !1;
    if (x.indexOf("charset") === -1) {
      var v = e.charset(x);
      v && (x += "; charset=" + v.toLowerCase());
    }
    return x;
  }
  function r(m) {
    if (!m || typeof m != "string") return !1;
    var x = i.exec(m),
      v = x && e.extensions[x[1].toLowerCase()];
    return !v || !v.length ? !1 : v[0];
  }
  function p(m) {
    if (!m || typeof m != "string") return !1;
    var x = n("x." + m)
      .toLowerCase()
      .substr(1);
    return (x && e.types[x]) || !1;
  }
  function f(m, x) {
    var v = ["nginx", "apache", void 0, "iana"];
    Object.keys(a).forEach(function (j) {
      var E = a[j],
        T = E.extensions;
      if (!(!T || !T.length)) {
        m[j] = T;
        for (var F = 0; F < T.length; F++) {
          var M = T[F];
          if (x[M]) {
            var q = v.indexOf(a[x[M]].source),
              D = v.indexOf(E.source);
            if (
              x[M] !== "application/octet-stream" &&
              (q > D || (q === D && x[M].substr(0, 12) === "application/"))
            )
              continue;
          }
          x[M] = j;
        }
      }
    });
  }
})(Mi);
const Yt = Ma(Mi),
  Pi = {
    colors: {
      frame: "#1c1b22",
      tab_selected: "#42414d",
      tab_background_text: "white",
      toolbar: "#2b2a33",
      toolbar_text: "white",
      toolbar_field: "#1C1B22",
      toolbar_field_text: "white",
      tab_line: "transparent",
    },
  };
let ba = Object.assign({}, Pi);
fn(ba);
function Fr(e, a) {
  const n = Object.assign({}, ba, e.theme);
  fn(n, a), (ba = n), localStorage.setItem("theme", JSON.stringify(ba));
}
async function fn(e, a) {
  const n = document.querySelector(":root");
  n.setAttribute("style", "");
  for (let i in e.colors) {
    i === "accentcolor" &&
      ((i = "frame"),
      console.warn(
        "Using accentcolor in themes is deprecated since Firefox 70.",
      )),
      i === "textcolor" &&
        ((i = "tab_background_text"),
        console.warn(
          "Using tab_background_text in themes is deprecated since Firefox 70.",
        )),
      i === "bookmark_text" && (i = "toolbar_text");
    const s = `--${i.replace(/_/g, "-")}`;
    n.style.setProperty(s, Bt(e.colors[i]).toString());
  }
  if (e.images && a)
    for (let i in e.images) {
      i === "headerURL" && (i = "theme_frame");
      const s = `--${i.replace(/_/g, "-")}`;
      if (i === "additional_backgrounds") {
        let o = "";
        const t = e.images.additional_backgrounds;
        for (const r in t)
          o += `url(${URL.createObjectURL(await Dn(t[r], a))})${
            t.length - 1 <= Number(r) ? "" : ","
          }`;
        n.style.setProperty(s, o);
      } else {
        const o = URL.createObjectURL(await Dn(e.images[i], a));
        n.style.setProperty(s, `url(${o})`);
      }
    }
  if (e.properties)
    for (let i in e.properties) {
      const s = `--${i.replace(/_/g, "-")}`,
        o = e.properties[i];
      typeof o == "string"
        ? n.style.setProperty(s, o)
        : n.style.setProperty(s, o.join(","));
    }
}
async function Dn(e, a) {
  const n = await a.extractFile(e, Yt.lookup(e) || "text/plain");
  if (typeof n == "string") throw new Error("Unable to extract file.");
  return n;
}
function Qt() {
  return localStorage.getItem("preferences")
    ? JSON.parse(localStorage.getItem("preferences"))
    : {
        "general.startup.openPreviousTabs": !0,
        "general.tabs.openWindowLinksInTab": !0,
        "general.tabs.switchToMedia": !1,
        "general.tabs.confirmBeforeClosing": !0,
        "search.defaults.useHttps": !1,
        "search.defaults.searchEngine": "duckduckgo",
        "search.defaults.proxy": "ultraviolet",
        "bookmarks.shown": !0,
      };
}
const Cr = {
    encode(e) {
      return (
        e &&
        encodeURIComponent(
          e
            .toString()
            .split("")
            .map((a, n) =>
              n % 2 ? String.fromCharCode(a.charCodeAt(0) ^ 2) : a,
            )
            .join(""),
        )
      );
    },
    decode(e) {
      if (!e) return e;
      let [a, ...n] = e.split("?");
      return (
        decodeURIComponent(a)
          .split("")
          .map((i, s) => (s % 2 ? String.fromCharCode(i.charCodeAt(0) ^ 2) : i))
          .join("") + (n.length ? "?" + n.join("?") : "")
      );
    },
  },
  Ur = {
    google: { name: "Google", searchStr: "https://www.google.com/search?q=%s" },
    bing: { name: "Bing", searchStr: "https://www.bing.com/search?q=%s" },
    duckduckgo: {
      name: "DuckDuckGo",
      searchStr: "https://duckduckgo.com/?q=%s",
    },
    brave: { name: "Brave", searchStr: "https://search.brave.com/search?q=%s" },
    yahoo: { name: "Yahoo", searchStr: "https://search.yahoo.com/search?p=%s" },
  };
function Mr(e) {
  if (e == "<all_urls>") return /^(?:http|https|file|ftp):\/\/.*/;
  var i = /^(\*|http|https|file|ftp):\/\/(.*)$/.exec(e);
  if (!i) return /$./;
  var a = i[1],
    n = i[2],
    i = /^([^\/]*)\/(.*)$/.exec(n);
  if (!i) return /$./;
  var s = i[1],
    o = i[2];
  if (a == "file" && s != "") return /$./;
  if (a != "file" && s == "") return /$./;
  if (!/^(\*|\*\.[^*]+|[^*]*)$/.exec(s)) return /$./;
  var t = "^";
  return (
    (t += a == "*" ? "https*" : a),
    (t += ":\\/\\/"),
    (t += s.replace(/\*\.?/, "[^\\/]*")),
    (t += "(:\\d+)?"),
    (t += "\\/"),
    (t += o.replace("*", ".*")),
    (t += "$"),
    RegExp(t)
  );
}
const zr = /^\.?\//;
function Ir() {
  return Array.from($o())[0];
}
function Zt() {
  function e(a) {
    const n = document.createElement("script");
    (n.src = "pro.fontawesome.js"), a.appendChild(n);
    const i = document.createElement("script");
    (i.charset = "UTF-8"),
      (i.src = "uv/uv.bundle.js"),
      (i.onload = () => {
        const s = document.createElement("script");
        (s.src = "uv/uv.config.js"),
          a.appendChild(s),
          (s.onload = () => {
            Be(() => import("./registerSW-51f8a8af.js"), []);
          });
      }),
      a.appendChild(i);
  }
  return (
    Ji(async () => {
      await n(localStorage.getItem("theme")),
        window.addEventListener("storage", async (i) => {
          i.key === "theme" && (await n(i.newValue));
        });
      const a = await tt("bookmarks", 1, {
        upgrade(i) {
          i.createObjectStore("bookmarks", { keyPath: "id" });
        },
      });
      Bn(await a.getAll("bookmarks")),
        Yo.on("bookmarks.reload", async () => {
          Bn(await a.getAll("bookmarks"));
        }),
        Do(Qt()["bookmarks.shown"] ?? !0);
      async function n(i) {
        try {
          const s = JSON.parse(i || JSON.stringify(Pi));
          s && (await fn(s));
        } catch {}
      }
    }),
    C(go, {
      lang: "en",
      get children() {
        return [
          C(wo, {
            ref(a) {
              const n = e;
              typeof n == "function" ? n(a) : (e = a);
            },
            get children() {
              return C(ko, {});
            },
          }),
          C(yo, {
            class: "h-screen",
            get children() {
              return [
                C(ds, {
                  get children() {
                    return C(mo, {
                      get children() {
                        return C(lo, {
                          get children() {
                            return C(pt, {});
                          },
                        });
                      },
                    });
                  },
                }),
                C(bo, {}),
              ];
            },
          }),
        ];
      },
    })
  );
}
const Nn = Object.values(Object.assign({}))[0],
  er = Nn ? Nn.default : void 0,
  ar = () => {
    let e = {
      get request() {},
      get clientAddress() {},
      get locals() {},
      get prevUrl() {},
      get responseHeaders() {},
      get tags() {},
      get env() {},
      get routerContext() {},
      setStatusCode(n) {},
      getStatusCode() {},
      $type: po,
      fetch,
    };
    function a(n) {
      return C(to, n);
    }
    return C(mi.Provider, {
      value: e,
      get children() {
        return C(Ls, {
          get children() {
            return C(a, {
              get base() {
                return "/";
              },
              data: er,
              get children() {
                return C(Zt, {});
              },
            });
          },
        });
      },
    });
  };
Bs(() => C(ar, {}), document);
export {
  ga as $,
  As as A,
  ii as B,
  Ga as C,
  Qt as D,
  $o as E,
  rr as F,
  lr as G,
  pr as H,
  Ur as I,
  fr as J,
  xr as K,
  Pa as L,
  _o as M,
  Ts as N,
  Ma as O,
  Sr as P,
  tt as Q,
  jr as R,
  rn as S,
  Ps as T,
  kr as U,
  Fr as V,
  Ar as W,
  fn as X,
  Pi as Y,
  Mr as Z,
  Be as _,
  Ki as a,
  wr as a0,
  mr as a1,
  Ko as a2,
  Yo as a3,
  Jt as a4,
  Oo as a5,
  Tr as a6,
  Yt as a7,
  zr as a8,
  yr as a9,
  dr as aa,
  gr as ab,
  br as ac,
  Cr as ad,
  ir as b,
  P as c,
  na as d,
  Ee as e,
  C as f,
  sr as g,
  N as h,
  Ja as i,
  cn as j,
  Pe as k,
  Wn as l,
  or as m,
  Q as n,
  Je as o,
  Ji as p,
  Xe as q,
  vr as r,
  tr as s,
  js as t,
  cr as u,
  Do as v,
  hr as w,
  Bn as x,
  ur as y,
  Ir as z,
};
