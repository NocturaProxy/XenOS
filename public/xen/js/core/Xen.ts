import * as bare from "@tomphttp/bare-client";

import fs from "./FileSystem";
import Wm from "./WindowManager";
import Loader from "./Loader";
import cookie from "js-cookie";
import path from "path-browserify";
import config from "../config.js";
window.path = path;

interface FileSystem {
  buffer: {
    from: (data: unknown) => Uint8Array;
  };
  mkdir: (path: string) => Promise<void>;
  writeFile: (path: string, content: Blob | Buffer | string) => Promise<void>;
  openDir: (path: string) => Promise<FileSystem>;
  exists: (path: string) => Promise<boolean>;
  readFile: (path: string, type: string) => Promise<Uint8Array>;
  stat: (path: string) => Promise<unknown>;
  unlink: (path: string) => Promise<void>;
  rmdir: (path: string) => Promise<void>;
  cwd: () => string;
  sh: unknown;
}

class Xen {
  fs: FileSystem = fs;
  buffer = fs.buffer;
  wm = new Wm();
  loader = new Loader();
  bare: bare.BareClient | null = null;

  cookie: NonNullable<unknown> = cookie;
  config: NonNullable<unknown> = config;

  taskbar: any;
  battery: any;
  apps: any;
  error: any;

  async Worker(): Promise<boolean> {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("/xen/web/sw.bundle.js", {
        scope: "/",
      });

      await navigator.serviceWorker.ready;
    }

    if (navigator.serviceWorker.controller == null) {
      location.reload();

      return false;
    }

    return true;
  }

  async startup(): Promise<void> {
    // await this.fs.loading;

    if (navigator.serviceWorker.controller == null) {
      if (!await this.Worker()) {
        return;
      }
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
        apply: (
          target,
          thisArg,
          args: EventListenerOrEventListenerObject[],
        ) => {
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

    Object.defineProperty(
      window.EventTarget.prototype,
      "removeEventListeners",
      {
        value: function (
          this: EventTarget & { eventListeners?: [] },
          event: string,
        ) {
          if (this.eventListeners == null) return;

          for (const listener of this.eventListeners.filter(
            ([type]: string[]) => type === event,
          ) as {
            type: string;
            listener: EventListenerOrEventListenerObject;
            options: EventListenerOptions;
          }[]) {
            this.removeEventListener(
              listener.type,
              listener.listener,
              listener.options,
            );
          }
        },
        writable: true,
        enumerable: false,
        configurable: true,
      },
    );

    await this.loader.init(
      "components/apps.js",
      "components/context.js",
      "components/taskbar.js",
      "components/battery.js",
      "components/cursor.js",
      "components/pwa.js",
      "components/favorites.js",
    );

    // await window.xen.apps.open("Xen/welcome");
  }

  async setupFileSystem(): Promise<boolean> {
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
      await vfs.writeFile(
        "/xen/system/taskbar/pinned.json",
        JSON.stringify([
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
          },
        ]),
      );

      // App files

      await vfs.mkdir("/xen/system/apps");
      await vfs.mkdir("/xen/system/apps/Xen");
      await vfs.writeFile(
        "/xen/system/apps/installed.json",
        JSON.stringify([]),
      );

      // Inject Bundle

      await vfs.mkdir("/xen/system/assets");
      await vfs.writeFile(
        "/xen/system/assets/inject.bundle.js",
        await (await fetch("/xen/web/inject.bundle.js")).text(),
      );
    } catch (e) {
      console.error(e);
    }

    return true;
  }

  hideLoader(): void {
    const loader = document.getElementById("os-pre");

    if (loader == null) return;

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

export default Xen;
