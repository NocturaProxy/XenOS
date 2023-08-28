import { Q as c, z as a, v as s, r as o, D as n } from "./index-1fe75362.js";
import { K as e, T as r } from "./index-37963400.js";
import "./url-4d36b2c8.js";
const i = await c("keybinds", 1, {
    upgrade(t) {
      t.createObjectStore("keybinds", { keyPath: "id" });
    },
  }),
  l = i.transaction("keybinds", "readwrite"),
  b = l.objectStore("keybinds"),
  k = await b.getAll();
new e({
  id: 0,
  alias: "reload_tab",
  name: "Reload",
  description: "Reload the current tab",
  key: "r",
  ctrl: !0,
  callback() {
    a().reload();
  },
});
new e({
  id: 1,
  alias: "bookmark_tab",
  name: "Bookmark",
  description: "Bookmark the current tab",
  key: "d",
  ctrl: !0,
  callback() {
    a().bookmark();
  },
});
new e({
  id: 2,
  alias: "view_source",
  name: "View Source",
  description: "View the source of the current tab",
  key: "u",
  ctrl: !0,
  callback() {
    new r(`view-source:${a().url()}`, !0);
  },
});
new e({
  id: 3,
  alias: "search_tab",
  name: "Search",
  description: "Search the current tab",
  key: "e",
  ctrl: !0,
  callback() {
    const t = document.querySelector("#url_bar");
    t?.focus(),
      t?.select(),
      (a().search = a().search() !== !1 ? a().search : "");
  },
});
new e({
  id: 4,
  alias: "open_history",
  name: "History",
  description: "Open the history page",
  key: "h",
  ctrl: !0,
  callback() {
    new r("about:history", !0);
  },
});
new e({
  id: 5,
  alias: "new_tab",
  name: "New Tab",
  description: "Open a new tab",
  key: "t",
  alt: !0,
  callback() {
    new r("about:newTab", !0);
  },
});
new e({
  id: 6,
  alias: "close_tab",
  name: "Close Tab",
  description: "Close the current tab",
  key: "w",
  alt: !0,
  callback() {
    a().close();
  },
});
new e({
  id: 7,
  alias: "go_back",
  name: "Back",
  description: "Go back in the current tab",
  key: "ArrowLeft",
  alt: !0,
  callback() {
    a().goBack();
  },
});
new e({
  id: 8,
  alias: "go_forward",
  name: "Forward",
  description: "Go forward in the current tab",
  key: "ArrowRight",
  alt: !0,
  callback() {
    a().goForward();
  },
});
new e({
  id: 9,
  alias: "open_devtools",
  name: "Dev Tools",
  description: "Open the dev tools for the current tab",
  key: "i",
  ctrl: !0,
  shift: !0,
  callback() {
    a().setDevTools();
  },
});
new e({
  id: 10,
  alias: "open_bookmarks",
  name: "Bookmarks",
  description: "Toggle the bookmarks bar",
  key: "b",
  ctrl: !0,
  shift: !0,
  callback() {
    s(!o()),
      localStorage.setItem(
        "preferences",
        JSON.stringify(Object.assign(n(), { "bookmarks.shown": o() })),
      );
  },
});
k.map((t) => {
  new e(t);
});
