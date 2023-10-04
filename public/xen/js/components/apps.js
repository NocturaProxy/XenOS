const appManager = {
  apps: [],
  processes: [],
  appsStore: await window.caches.open("xen-apps"),
  installedApps: await window.xen.fs
    .readFile("/xen/system/apps/installed.json", "utf-8")
    .then(JSON.parse),
  nativeApps: [
    "Xen/welcome",
    "Xen/settings",
    "Xen/velocity",
    "Xen/terminal",
    "Xen/store",
  ],

  init: async function () {
    for (const app of this.nativeApps) {
      await this.install(app);
    }
  },

  install: async function (id) {
    if (!navigator.serviceWorker.controller) {
      throw new Error("Invalid XEN Instance");
    }

    const channel = new MessageChannel();

    await new Promise((resolve, reject) => {
      navigator.serviceWorker.controller.postMessage(
        {
          type: "install",
          app: id,
          repo: window.location.origin,
          native: this.nativeApps.includes(id),
        },
        [channel.port2],
      );

      channel.port1.onmessage = async (event) => {
        if (event.data.type === "install") {
          if (event.data.success === true) {
            resolve();
          } else {
            reject(event.data.error);
          }
        }
      };
    });

    return true;
  },

  getAppsData: async function () {
    return await Promise.all(
      window.xen.apps.installedApps.map(async (app) => {
        const req = await fetch(`/xen/~/apps/${app}/meta`).then((response) =>
          response.json(),
        );

        return {
          id: app,
          name: req.name,
          icon: window.path.join("/xen/~/apps/", app, req.icon),
        };
      }),
    );
  },

  getAppData: async function (id) {
    const req = await fetch(`/xen/~/apps/${id}/meta`).then((response) =>
      response.json(),
    );

    return {
      id,
      name: req.name,
      icon: window.path.join("/xen/~/apps/", id, req.icon),
    };
  },

  update: async function (id) {
    try {
      if (!navigator.serviceWorker.controller) {
        throw new Error("Invalid XEN Instance");
      }

      const channel = new MessageChannel();

      await new Promise((resolve, reject) => {
        navigator.serviceWorker.controller.postMessage(
          {
            type: "update",
            app: id,
            repo: window.location.origin,
            native: this.nativeApps.includes(id),
          },
          [channel.port2],
        );

        channel.port1.onmessage = async (event) => {
          if (event.data.type === "update") {
            if (event.data.success === true) {
              resolve();
            } else {
              reject(event.data.error);
            }
          }
        };
      });

      return true;
    } catch (e) {
      return await this.install(id);
    }
  },

  opening: [],

  open: async function (id, el) {
    const appData = await fetch(`/xen/~/apps/${id}/meta`).then((response) =>
      response.json(),
    );

    if (this.opening.includes(id)) {
      return false;
    }

    this.opening.push(id);

    if (!el) {
      el = await window.xen.taskbar.addApp(appData.name, id);
    }

    let complete = false;

    function bounce() {
      if (complete) {
        return false;
      }

      if (el) {
        el.bounce();
      }
    }

    const pid = window.xen.apps.createID();
    let app;

    switch (appData.type) {
      case "static": {
        bounce();

        setInterval(bounce, 800);

        app = await this.register({
          name: appData.name,
          native: appData.native || false,
          type: "static",
          url: appData.staticURL.match(/^https?:\/\//g)
            ? appData.staticURL
            : window.path.join(`/xen/~/apps/${id}/`, appData.staticURL),
          x: 100,
          y: 200,
          width: 700,
          height: 500,
          appId: id,
          pid,
        });

        complete = true;

        await window.xen.taskbar.appOpen(app.name, id, app.id);

        break;
      }
      case "default": {
        // scripted app, check appLoader.js
        app = await window.xen.apps.loader.load(
          appData,
          await fetch(
            window.path.join(`/xen/~/apps/${id}`, appData.entry),
          ).then((response) => response.text()),
          el,
          pid,
        );

        break;
      }
    }

    this.opening.splice(this.opening.indexOf(id), 1);

    this.processes.push({
      name: id,
      pid,
      worker: app instanceof window.Worker ? app : null,
    });

    return app;
  },

  close: async function (id, element) {
    const app = this.apps.findIndex((a) => a.id === id);
    await window.xen.taskbar.appClose(this.apps[app].name, id);

    this.apps.splice(app, 1);

    window.xen.favorites.closed(id);

    element.remove();
    return true;
  },

  createID: () => {
    return Math.random().toString(36).substr(2, 9);
  },

  register: async function (options) {
    const {
      name,
      type,
      url,
      x,
      y,
      width,
      height,
      focus,
      menuBar,
      visible,
      appId,
      pid,
    } = options;

    const app = {
      id: this.createID(),
      name,
      type,
      url,
      x,
      y,
      width,
      height,
      focus,
      menuBar,
      visible,
      appId,
      pid,
    };

    const frame = document.createElement("iframe");
    frame.classList.add("appFrame");
    frame.src = options.url || "/xen/~/about:blank";

    const el = window.xen.wm.createWindow(
      app.name,
      frame,
      app.id,
      app.x,
      app.y,
      app.width,
      app.height,
      app.visible,
    );

    if ("menuBar" in options && options.menuBar === false) {
      el.querySelector(".box-header-title").style.display = "none";
      el.querySelector(".box-body-inner").style.height = "100%";
    }

    if (options.visible !== false) {
      await new Promise((resolve) =>
        !options.native
          ? resolve((el.style.display = "block"))
          : frame.addEventListener("load", () => {
              el.style.display = "block";

              resolve();
            }),
      );
    }

    if (focus !== false) {
      await window.xen.wm.focus(app.id);
    }

    app.master = el;

    this.apps.push(app);

    return app;
  },
};

window.xen.apps = appManager;
appManager.loader = await import("./appLoader.js").then((m) => m.default);

export default appManager;
