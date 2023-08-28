import { A as m, c as f, P as p, T as b, R as g } from "./index-37963400.js";
import {
  Q as A,
  R as l,
  U as c,
  V as x,
  W as T,
  j,
  z as w,
  i as k,
  h as M,
  X as _,
  Y as D,
  t as u,
} from "./index-1fe75362.js";
import "./url-4d36b2c8.js";
const h = u("<br>"),
  I = u("<b>"),
  P = u('<a class="">Learn More'),
  v = await A("addons", 1, {
    upgrade(t) {
      t.createObjectStore("addons", { keyPath: "id" });
    },
  }),
  $ = v.transaction("addons", "readwrite"),
  U = $.objectStore("addons");
l(await U.getAll());
c().forEach(async (t) => {
  await E(t);
});
function z(t, e) {
  return new Promise(async (n, s) => {
    const a = await t.extractManifest(),
      i = new p(w());
    i.addText({
      content: a.theme
        ? [
            "This site would like to install an add-on in Velocity:",
            h(),
            (() => {
              const o = I();
              return k(o, () => a.short_name ?? a.name), o;
            })(),
          ]
        : [
            "Add ",
            M(() => a.short_name ?? a.name),
            "? This extension will have permission to:",
            h(),
            "- xyz",
            h(),
            (() => {
              const o = P();
              return (
                (o.$$click = () => {
                  new b(
                    "https://support.mozilla.org/en-US/kb/permission-request-messages-firefox-extensions",
                    !0,
                  );
                }),
                o
              );
            })(),
          ],
    }),
      i.addButton({ style: 0, text: "Add", id: "add" }),
      i.addButton({ style: 1, text: "Cancel", id: "cancel" }),
      i.on("add", async () => {
        const o = {
          canUninstall: !0,
          id: (await t.id) ?? a.name,
          isActive: !0,
          isEnabled: !0,
          name: a.name,
          type: a.theme ? "theme" : "extension",
          version: a.version,
          description: a.description,
          archive: e,
        };
        o.type === "theme" &&
          l(
            c().map(
              (d) => (
                d.type === "theme" && ((d.isActive = !1), (d.isEnabled = !1)), d
              ),
            ),
          ),
          l([o, ...c()]),
          y(),
          await E(o, t, a),
          n(await t.id);
      }),
      i.on("cancel", () => {
        s(new Error("User prevented installation."));
      }),
      i.push();
  });
}
function C(t) {
  return new Promise(async (e, n) => {
    if (t.canUninstall) {
      const s = new p(w(), p.Confirm, "Action may require application reload.");
      s.on("ok", () => {
        location.reload();
      }),
        s.on("cancel", () => {
          console.warn(
            "Addon may still be running in the background, in order to ensure the addon is fully uninstalled please reload the tab.",
          );
        }),
        s.on("close", async () => {
          t.type === "theme" &&
            t.isActive &&
            t.isEnabled &&
            (localStorage.setItem("theme", ""), _(D)),
            l(c().filter((a) => a.id !== t.id)),
            await y(),
            e();
        }),
        s.push();
    } else n();
  });
}
async function E(t, e, n) {
  if (
    ((e = e ?? new m(t.archive)),
    await e.ready,
    (n = n ?? (await e.extractManifest())),
    t.type === "theme")
  )
    t.isActive && x(n, e);
  else if (t.isEnabled) {
    n.content_scripts && R(n.content_scripts, n.permissions ?? [], e);
    const s = new Worker("/addon/backgroundWorker.js", {
      type: "module",
      name: n.short_name || n.name,
    });
    T(s), s.postMessage({ manifest: n });
  }
}
function R(t, e, n) {
  t.forEach(async (s) => {
    s.js && (s.js = s.js.map(async (a) => n.extractFile(a, "text"))),
      s.css && (s.css = s.css.map(async (a) => n.extractFile(a, "text"))),
      f(s, e ?? []);
  });
}
async function y() {
  const e = v.transaction("addons", "readwrite").objectStore("addons");
  await e.clear();
  for (const n of c()) await e.put(n);
  return Promise.resolve();
}
j(["click"]);
const B = new g("addonstore");
class r extends Event {
  id;
  constructor(e, n) {
    super(e), (this.id = n);
  }
}
class W extends EventTarget {
  abuseReportPanelEnabled = !1;
  constructor() {
    super();
  }
  async createInstall(e) {
    const n = this;
    return new (class extends EventTarget {
      async install() {
        const a = new m(e.url);
        this.dispatchEvent(new Event("onDownloadStarted")),
          a.ready
            .then(async () => {
              this.dispatchEvent(new Event("onDownloadEnded")),
                this.dispatchEvent(new Event("onInstallStarted")),
                z(a, e.url)
                  .then((i) => {
                    this.dispatchEvent(new Event("onInstallEnded")),
                      n.dispatchEvent(new r("onInstalled", i));
                  })
                  .catch(() => {
                    this.dispatchEvent(new Event("onInstallCancelled"));
                  });
            })
            .catch(() => {
              this.dispatchEvent(new Event("onDownloadFailed"));
            });
      }
    })();
  }
  async getAddonByID(e) {
    const n = c().find((s) => s.id === e);
    return n
      ? Object.assign(
          {
            uninstall: () => {
              this.dispatchEvent(new r("onUninstalling", e)),
                C(n)
                  .then(() => {
                    this.dispatchEvent(new r("onUninstalled", e));
                  })
                  .catch(() => {});
            },
            setEnabled: (s) => {
              s
                ? (this.dispatchEvent(new r("onEnabling", e)),
                  setTimeout(() => {
                    this.dispatchEvent(new r("onEnabled", e));
                  }, 1e3))
                : (this.dispatchEvent(new r("onDisabling", e)),
                  setTimeout(() => {
                    this.dispatchEvent(new r("onDisabled", e));
                  }, 1e3));
            },
          },
          n,
        )
      : void 0;
  }
  reportAbuse() {}
}
B.createInject("*://addons.mozilla.org/*", ({ navigator: t }) => {
  const e = new W();
  Object.defineProperty(t, "mozAddonManager", {
    get() {
      return e;
    },
  });
});
