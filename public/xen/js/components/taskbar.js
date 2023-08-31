window.Element.prototype.bounce = async function () {
  var element = this;

  element.animate(
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

  await new Promise((r) => setTimeout(r, 450));

  element.animate(
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

  await new Promise((r) => setTimeout(r, 350));

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
      await xen.fs.readFile("/xen/system/taskbar/pinned.json", "utf-8"),
    );
  },
  async createElement(name, id) {
    const el = document.createElement("div");

    const appData = await fetch("/xen/~/apps/" + id + "/meta").then(
      (response) => response.json(),
    );

    const icon =
      path.join("/xen/~/apps/", id, appData.icon) ||
      "/xen/~/apps/" + id + "/icon.png";

    el.classList.add("os-dock-item");

    el.dataset.name = appData.name;
    el.dataset.id = id;
    el.innerHTML = `
            <img alt="App Logo" src="${icon}">
            <span class="os-dock-indicator"></span>
        `;

    el.addEventListener("click", async () => {
      if (el.dataset.open == "true") {
        // TODO: App Event Emitter
        return window.xen.apps;
      }

      const app = await xen.apps.open(id, el);
    });

    this.currentApps.push([name, el]);

    return el;
  },
  async appOpen(name, id, elID) {
    if (this.currentApps.find((a) => a[0] == name)) {
      var appEl = this.currentApps.find((a) => a[0] == name)[1];

      appEl.dataset.open = "true";

      appEl.querySelector(".os-dock-indicator").style.opacity = "1";
    } else return this.addApp(...arguments);
  },
  async addApp(name, id) {
    if (this.currentApps.find((a) => a[0] == name)) return;

    let el = await this.createElement("", id);

    el.style.transform = "scale(0)";
    el.dataset.open = "true";
    el.dataset.temporary = "true";

    this.currentApps.push([name, el]);
    this.dockApps.appendChild(el);

    await new Promise((r) => setTimeout(r, 100));

    requestAnimationFrame(() => {
      el.style.transform = "scale(1)";
    });

    await new Promise((r) => setTimeout(r, 200));

    return el;
  },
  async appClose(name, id) {
    if (this.currentApps.find((a) => a[0] == name)) {
      var appEl = this.currentApps.find((a) => a[0] == name)[1];

      appEl.dataset.open = "false";

      appEl.querySelector(".os-dock-indicator").style.opacity = "0";

      if (appEl.dataset.temporary) {
        requestAnimationFrame(() => {
          appEl.style.transform = "scale(0)";
        });

        await new Promise((r) => setTimeout(r, 200));

        appEl.remove();

        this.currentApps.splice(
          this.currentApps.findIndex((a) => a[0] == name),
          1,
        );
      }
    } else return;
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
  init: async function () {
    this.runDate();
    setInterval(this.runDate, 1000);

    let currentY = 0;
    let moving = false;

    const move = (e) => {
      currentY = e.clientY;

      const show = async () => {
        await this.show();
        moving = false;
      };

      const hide = async () => {
        await this.hide();
        moving = false;
      };

      if (e.clientY > window.innerHeight - 40 && this.hidden && !moving) {
        moving = true;
        setTimeout(() => {
          if (this.taskMenu.open) return moving = false;
          if (!(currentY > window.innerHeight - 40)) return hide(moving = false);
          if (this.hidden == false) return moving = false;

          return show();
        }, 0);
      } else if (e.clientY < window.innerHeight - 60 && !moving) {
        moving = true;
        setTimeout(() => {
          if (this.taskMenu.open) return moving = false;
          if (!(currentY < window.innerHeight - 60)) return show(moving = false);
          if (this.hidden == true) return moving = false;

          return hide();
        }, 1000);
      }
    };

    document.addEventListener("mousemove", move);

    const apps = await this.getApps();

    for (let i = 0; i < apps.length; i++) {
      this.dockApps.appendChild(
        await this.createElement(apps[i].name, apps[i].id),
      );
    }

    return;
  },
  hidden: false,
  show: async function () {
    if (!this.hidden) return;

    this.hidden = false;

    this.taskbarElem.animate(
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

    await new Promise((r) => setTimeout(r, 500));

    this.taskbarElem.style.transform = "";

    return true;
  },
  hide: async function () {
    if (this.hidden) return false;

    this.hidden = true;

    this.taskbarElem.animate(
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

    await new Promise((r) => setTimeout(r, 490));

    this.taskbarElem.style.transform = "translateY(calc(100% + 20px))";

    return true;
  },
};

window.xen.taskbar = taskbar;

export default taskbar;
