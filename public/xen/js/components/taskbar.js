window.Element.prototype.bounce = async function () {
  this.animate(
    [
      {
        transform: "translate3d(0, 0, 0)",
      },
      {
        transform: "translate3d(0, -10px, 0)",
      },
    ],
    {
      duration: 450,
      iterations: 1,
      delay: 0,
      easing: "ease-out",
    },
  );

  await new Promise((resolve) => setTimeout(resolve, 450));

  this.animate(
    [
      {
        transform: "translate3d(0, -10px, 0)",
      },
      {
        transform: "translate3d(0, 0, 0)",
      },
    ],
    {
      duration: 350,
      iterations: 1,
      easing: "ease-in",
    },
  );

  await new Promise((resolve) => setTimeout(resolve, 350));

  return true;
};

const taskbar = {
  taskbarElem: document.getElementById("os-taskbar-resizable"),
  dock: document.querySelector(".os-dock"),
  dockApps: document.querySelector(".os-dock-apps"),
  taskMenu: await import("./taskMenu.js").then((m) => m.default),

  currentApps: [],

  async getApps() {
    return JSON.parse(
      await window.xen.fs.readFile("/xen/system/taskbar/pinned.json", "utf-8"),
    );
  },
  async createElement(name, id) {
    const el = document.createElement("div");

    const appData = await fetch("/xen/~/apps/" + id + "/meta").then(
      (response) => response.json(),
    );

    const icon =
      window.path.join("/xen/~/apps/", id, appData.icon) ||
      "/xen/~/apps/" + id + "/icon.png";

    el.classList.add("os-dock-item");

    el.dataset.name = appData.name;
    el.dataset.id = id;
    el.innerHTML = `
            <img alt='App Logo' src='${icon}'>
            <span class='os-dock-indicator'></span>
        `;

    el.addEventListener("click", async () => {
      if (el.dataset.open === "true") {
        // TODO: App Event Emitter
        return window.xen.apps;
      }

      // TODO: More app customizations from taskbar
      await window.xen.apps.open(id, el);
    });

    this.currentApps.push([name, el]);

    el.registerContextMenu(
      {
        type: "center",
        get components() {
          const open = !!(
            window.xen.apps.processes.find((process) => process.name === id) ||
            window.xen.apps.apps.find((app) => app.appId === id)
          );
          const list = [];

          list.push({
            type: "button",
            text: "Open",
            click: () => {
              // TODO: stuff
            },
          });

          if (open) {
            list.push({
              type: "button",
              text: "Quit",
              click: () => {
                if (
                  window.xen.apps.processes.find(
                    (process) => process.name === id,
                  )
                ) {
                  window.xen.apps.processes
                    .find((process) => process.name === id)
                    .worker?.terminate();
                }

                if (window.xen.apps.apps.find((app) => app.appId === id)) {
                  window.xen.apps.close(
                    window.xen.apps.apps.find((app) => app.appId === id).master
                      .id,
                    window.xen.apps.apps.find((app) => app.appId === id).master,
                  );
                }
              },
            });
          }

          return list;
        },
      },
      () => {
        el.style.filter = "brightness(0.7)";

        this.ctxOpen = true;
      },
      () => {
        el.style.filter = "";

        this.ctxOpen = false;
      },
    );

    return el;
  },
  async appOpen(name, id) {
    window.xen.favorites.opened(id);

    if (this.currentApps.find((a) => a[0] === name)) {
      const appEl = this.currentApps.find((a) => a[0] === name)[1];

      appEl.dataset.open = "true";

      appEl.querySelector(".os-dock-indicator").style.opacity = "1";
    } else return this.addApp(...arguments);
  },
  async addApp(name, id) {
    if (this.currentApps.find((a) => a[0] === name)) return;

    const el = await this.createElement("", id);

    el.style.transform = "scale(0)";
    el.dataset.open = "true";
    el.dataset.temporary = "true";

    this.currentApps.push([name, el]);
    this.dockApps.appendChild(el);

    await new Promise((resolve) => setTimeout(resolve, 100));

    window.requestAnimationFrame(() => {
      el.style.transform = "scale(1)";
    });

    await new Promise((resolve) => setTimeout(resolve, 200));

    return el;
  },
  async appClose(name) {
    if (this.currentApps.find((a) => a[0] === name)) {
      const appEl = this.currentApps.find((a) => a[0] === name)[1];

      appEl.dataset.open = "false";

      appEl.querySelector(".os-dock-indicator").style.opacity = "0";

      if (appEl.dataset.temporary) {
        window.requestAnimationFrame(() => {
          appEl.style.transform = "scale(0)";
        });

        await new Promise((resolve) => setTimeout(resolve, 200));

        appEl.remove();

        this.currentApps.splice(
          this.currentApps.findIndex((app) => app[0] === name),
          1,
        );
      }
    }
  },
  runDate() {
    document.getElementById("os-dock-time").innerText =
      new Date().toLocaleTimeString("en-US", {
        timeStyle: "short",
      });

    document.getElementById("os-dock-date").innerText =
      new Date().toLocaleDateString("en-US", {
        dateStyle: "short",
      });
  },
  ctxOpen: false,
  init: async function () {
    this.runDate();
    setInterval(this.runDate, 1000);

    let currentY = 0;
    let moving = false;

    const move = (e) => {
      currentY = e.clientY;

      const show = async () => {
        if (this.ctxOpen) return;

        await this.show();
        moving = false;

        if (currentY < window.innerHeight - 60) return hide((moving = true));
      };

      const hide = async () => {
        if (this.ctxOpen) return;
        await this.hide();
        moving = false;

        if (currentY > window.innerHeight - 40) return show((moving = true));
      };

      if (e.clientY > window.innerHeight - 40 && this.hidden && !moving) {
        moving = true;

        setTimeout(() => {
          if (this.taskMenu.open) {
            moving = false;
            return;
          }
          if (!(currentY > window.innerHeight - 40))
            return hide((moving = false));
          if (this.hidden === false) {
            moving = false;
            return;
          }

          return show();
        }, 100);
      } else if (e.clientY < window.innerHeight - 60 && !moving) {
        moving = true;

        setTimeout(() => {
          if (this.taskMenu.open) {
            moving = false;
            return;
          }
          if (!(currentY < window.innerHeight - 60))
            return show((moving = false));
          if (this.hidden === true) {
            moving = false;
            return;
          }

          return setTimeout(() => {
            if (currentY < window.innerHeight - 60) return hide();
            else {
              moving = false;
            }
          }, 600);
        }, 100);
      }
    };

    document.addEventListener("mousemove", move);

    const apps = await this.getApps();

    for (let i = 0; i < apps.length; i++) {
      this.dockApps.appendChild(
        await this.createElement(apps[i].name, apps[i].id),
      );
    }
  },
  hidden: false,
  show: async function () {
    if (!this.hidden) return;

    this.hidden = false;

    const anim = this.taskbarElem.animate(
      [
        {
          transform: "translateY(calc(100% + 20px))",
        },
        {
          transform: "translateY(0)",
        },
      ],
      {
        easing: "ease",
        duration: 500,
      },
    );

    this.taskbarElem.style.transform = "";

    await anim.finished;

    return true;
  },
  hide: async function () {
    if (this.hidden) return false;

    this.hidden = true;

    const anim = this.taskbarElem.animate(
      [
        {
          transform: "translateY(0)",
        },
        {
          transform: "translateY(calc(100% + 20px))",
        },
      ],
      {
        easing: "ease",
        duration: 500,
      },
    );

    this.taskbarElem.style.transform = "translateY(calc(100% + 20px))";

    await anim.finished;

    return true;
  },
};

window.xen.taskbar = taskbar;

export default taskbar;
