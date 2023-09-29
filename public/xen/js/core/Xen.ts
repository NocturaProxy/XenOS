const { default: fs } = require("./FileSystem");
const wm = require("./WindowManager");
const loader = require("./Loader");
const cookie = require("js-cookie");
const config = require("../config.json");

import * as bare from "@tomphttp/bare-client";

window.path = require("path-browserify");

declare global {
  interface Window {
    xen: Xen;
    path: any;
  }
}

class Xen {
  fs: any = fs;
  buffer = fs.buffer;
  wm = new wm();
  loader = new loader();
  bare: bare.BareClient | null = null;

  cookie: Object = cookie;
  config: Object = config;

  taskbar: any;
  battery: any;
  apps: any;
  
  constructor() {}

  async Worker() {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("/xen/web/sw.bundle.js", {
        scope: "/",
      });

      await navigator.serviceWorker.ready;
    }

    if (!navigator.serviceWorker.controller) {
      location.reload();
    }

    return true;
  }

  async startup() {
    //await this.fs.loading;

    if (!navigator.serviceWorker.controller) {
      await this.Worker();
    }

    if (cookie.get("fs-initiated") !== "true") {
      await this.setupFileSystem();

      cookie.set("fs-initiated", "true", {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10),
        secure: true,
        sameSite: "strict",
      });
    }

    this.bare = await bare.createBareClient(location.origin + "/bare/");

    await this.wm.init();

    await new Promise((resolve) => setTimeout(resolve, 150));

    window.EventTarget.prototype.addEventListener = new Proxy(
      window.EventTarget.prototype.addEventListener,
      {
        apply: (target, thisArg, args) => {
          if (!thisArg.eventListeners) thisArg.eventListeners = [];

          thisArg.eventListeners.push({
            type: args[0],
            listener: args[1],
            options: args[2] || {},
          });

          return Reflect.apply(target, thisArg, args);
        },
      },
    );

    (window.EventTarget.prototype as any).removeEventListeners = function (
      event: any,
    ) {
      if (!this.eventListeners) return;

      for (const listener of this.eventListeners.filter(
        ([type, listener, options]: any) => type === event,
      )) {
        this.removeEventListener(
          listener.type,
          listener.listener,
          listener.options,
        );
      }
    };

    await this.loader.init(
      "components/apps.js",
      "components/taskbar.js",
      "components/battery.js",
      "components/cursor.js",
      "components/context.js",
      "components/pwa.js",
      "components/favorites.js"
    );

    //await window.xen.apps.open("Xen/welcome");

    return;
  }

  async setupFileSystem() {
    const vfs = this.fs;

    // General Files
    try {
      await vfs.mkdir("/xen");
      
      await vfs.mkdir("/xen/system");
      await vfs.mkdir("/xen/users");

      // Use Guest as a placeholder
      await vfs.mkdir("/xen/users/guest");
      await vfs.mkdir("/xen/users/guest/desktop");
      await vfs.mkdir("/xen/users/guest/documents");
      await vfs.mkdir("/xen/users/guest/downloads");
      await vfs.mkdir("/xen/users/guest/music");
      await vfs.mkdir("/xen/users/guest/pictures");
      await vfs.mkdir("/xen/users/guest/videos");

      // Taskbar files
      await vfs.mkdir("/xen/system/taskbar");
      await vfs.writeFile("/xen/system/taskbar/pinned.json", JSON.stringify([
        {
          name: "Welcome",
          id: "Xen/welcome",
        },
        {
          name: "Settings",
          id: "Xen/settings",
        },
        {
          name: "Velocity",
          id: "Xen/velocity",
        },
        {
          name: "App Store",
          id: "Xen/store",
        },
        {
          name: "Terminal",
          id: "Xen/terminal",
        }
      ]));

      // App files

      await vfs.mkdir("/xen/system/apps");
      await vfs.mkdir("/xen/system/apps/Xen");
      await vfs.writeFile("/xen/system/apps/installed.json", JSON.stringify([]));

      // Inject Bundle

      await vfs.mkdir("/xen/system/assets");
      await vfs.writeFile(
        "/xen/system/assets/inject.bundle.js",
        await (await fetch("/xen/web/inject.bundle.js")).text(),
      );
    } catch (e) {console.error(e)}

    return true;
  }

  hideLoader() {
    const loader = document.getElementById("os-pre");

    if (!loader) return;

    loader.animate(
      [
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
      ],
      {
        duration: 500,
        easing: "ease-in-out",
      },
    );

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
}

module.exports = Xen;
