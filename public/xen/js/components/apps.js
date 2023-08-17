const appManager = {
  apps: [],
  appsStore: await caches.open("xen-apps"),
  installedApps: await xen.fs.readFile("/xen/system/apps/installed.json", "utf-8").then(JSON.parse),
  nativeApps: [
    "Xen/welcome",
    "Xen/settings",
  ],

  init: async function() {
    for (const app of this.nativeApps) {
      await this.update(app);
    }

    await this.open("Xen/welcome");
  },

  install: async function(id) {
    if (!navigator.serviceWorker.controller)
      throw new Error("Invalid XEN Instance");

    const channel = new MessageChannel();

    await new Promise((resolve, reject) => {
      navigator.serviceWorker.controller.postMessage({
        type: "install",
        app: id,
        repo: location.origin,
        native: this.nativeApps.includes(id),
      }, [channel.port2]);

      channel.port1.onmessage = async (event) => {
        if (event.data.type === "install") {
          if (event.data.success === true) {
            resolve();
          } else {
            reject();
          }
        }
      }
    });

    return true;
  },

  update: async function(id) {
    try {
      if (!navigator.serviceWorker.controller)
        throw new Error("Invalid XEN Instance");

      const channel = new MessageChannel();

      await new Promise((resolve, reject) => {
        navigator.serviceWorker.controller.postMessage({
          type: "update",
          app: id,
          repo: location.origin,
          native: this.nativeApps.includes(id),
        }, [channel.port2]);

        channel.port1.onmessage = async (event) => {
          if (event.data.type === "update") {
            if (event.data.success === true) {
              resolve();
            } else {
              reject();
            }
          }
        }
      });

      return true;
    } catch {
      return await this.install(id);
    }
  },

  open: async function(id) {
    const appData = await fetch(`/xen/~/apps/${id}/meta`).then(
      response => response.json()
    );

    switch(appData.type) {
      case "static":
        const app = await this.register({
          name: appData.name,
          type: "static",
          url: path.join(`/xen/~/apps/${id}/`, appData.staticURL),
          x: 100,
          y: 200,
          width: 700,
          height: 500,
        });
        break;
      case "default":
        break;
    }
  },

  createID: () => {
    return Math.random().toString(36).substr(2, 9);
  },

  register: function(options) {
    const { name, type, url, x, y, width, height } = options;

    const app = {
      id: this.createID(),
      name,
      type,
      url,
      x,
      y,
      width,
      height,
    };

    this.apps.push(app);

    const frame = document.createElement("iframe");
    frame.classList.add("appFrame");
    frame.src = path.join(options.url) || "about:blank";

    const el = window.xen.wm.createWindow(app.name, frame, app.id, app.x, app.y, app.width, app.height);

    console.log(el);

    return app;
  },
};

window.xen.apps = appManager;

export default appManager;