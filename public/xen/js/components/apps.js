const appManager = {
  apps: [],
  appsStore: await caches.open("xen-apps"),
  installedApps: await xen.fs.readFile("/xen/system/apps/installed.json", "utf-8").then(JSON.parse),
  nativeApps: [
    "Xen/welcome",
    "Xen/settings",
    "Xen/velocity",
    "Xen/terminal",
    "Xen/store"
  ],

  init: async function() {
    for (const app of this.nativeApps) {
      await this.install(app);
    }
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

  opening: [],

  open: async function(id, el) {
    const appData = await fetch(`/xen/~/apps/${id}/meta`).then(
      response => response.json()
    );

    if (this.opening.includes(id)) return false;
    this.opening.push(id);

    if (!el) el = await window.xen.taskbar.addApp(appData.name, id);

    switch(appData.type) {
      case "static": {
        let complete = false;

        function bounce() {
          if (complete) return clearInterval(interval);

          if (el) {
            el.bounce();
          }
        }

        bounce();

        let interval = setInterval(bounce, 800);

        const app = await this.register({
          name: appData.name,
          native: appData.native || false,
          type: "static",
          url: appData.staticURL.match(/^https?:\/\//g) ? appData.staticURL : path.join(`/xen/~/apps/${id}/`, appData.staticURL),
          x: 100,
          y: 200,
          width: 700,
          height: 500,
        });

        complete = true;
        
        await window.xen.taskbar.appOpen(app.name, id, app.id);

        break;
      }
      case "default": {
        // scripted app, check appLoader.js
        await window.xen.apps.loader.load(
          appData,
          await fetch(path.join(`/xen/~/apps/${id}`, appData.entry)).then(
            response => response.text()
          ),
          el
        )

        break;
      }
    }

    this.opening.splice(this.opening.indexOf(id), 1);

    return true;
  },

  close: async function(id, element) {
    const app = this.apps.find(a => a.id == id);
    await window.xen.taskbar.appClose(app.name, id);

    element.remove();
    return true;
  },

  createID: () => {
    return Math.random().toString(36).substr(2, 9);
  },

  register: async function(options) {
    const { name, type, url, x, y, width, height, focus } = options;

    const app = {
      id: this.createID(),
      name,
      type,
      url,
      x,
      y,
      width,
      height,
      focus
    };

    this.apps.push(app);

    const frame = document.createElement("iframe");
    frame.classList.add("appFrame");

    frame.src = options.url || "about:blank";
      
    const el = window.xen.wm.createWindow(app.name, frame, app.id, app.x, app.y, app.width, app.height);

    el.style.display = "none";

    await new Promise(resolve => 
      !options.native ?
      resolve(el.style.display = "block") :
      frame.addEventListener("load", () => {
        el.style.display = "block";

        resolve();
      })
    );

    if (focus !== false) await xen.wm.focus(app.id);

    return app;
  },
};

window.xen.apps = appManager;
appManager.loader = await import("./appLoader.js").then(m => m.default);

export default appManager;