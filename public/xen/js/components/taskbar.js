window.Element.prototype.bounce = async function() {
    var element = this;

    element.animate(
        [
            {
                transform: "translate3d(0, 0, 0)",
            },
            {
                transform: "translate3d(0, -10px, 0)",
            }
        ],
        {
            duration: 450,
            iterations: 1,
            delay: 0,
            easing: 'ease-out'
        }
    );

    await new Promise(r => setTimeout(r, 450));

    element.animate(
        [
            {
                transform: "translate3d(0, -10px, 0)",
            },
            {
                transform: "translate3d(0, 0, 0)",
            }
        ],
        {
            duration: 350,
            iterations: 1,
            easing: 'ease-in'
        }
    );

    await new Promise(r => setTimeout(r, 350));

    return true;
}

const taskbar = {
    taskbarElem: document.getElementById("os-taskbar-resizable"),
    dock: document.querySelector(".os-dock"),
    dockApps: document.querySelector(".os-dock-apps"),
    taskMenu: await import("./taskMenu.js").then(m => m.default),

    currentApps: [],

    async getApps() {
        return JSON.parse(await xen.fs.readFile("/xen/system/taskbar/pinned.json", "utf-8"));
    },
    async createElement(name, id) {
        const el = document.createElement("div");

        const appData = await fetch("/xen/~/apps/" + id + "/meta").then(
            response => response.json()
        );

        const icon = path.join("/xen/~/apps/", id, appData.icon) || "/xen/~/apps/" + id + "/icon.png";


        el.classList.add("os-dock-item");

        el.dataset.name = name;
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
    async appOpen(name, id) {
        if (this.currentApps.find(a => a[0] == name)) {
            var appEl = this.currentApps.find(a => a[0] == name)[1];

            appEl.dataset.open = "true";

            appEl.querySelector(".os-dock-indicator").style.opacity = "1";
        } else return;
    },
    async appClose(name, id) {
        if (this.currentApps.find(a => a[0] == name)) {
            var appEl = this.currentApps.find(a => a[0] == name)[1];

            appEl.dataset.open = "false";

            appEl.querySelector(".os-dock-indicator").style.opacity = "0";
        } else return;
    },
    runDate() {
        document.getElementById("os-dock-time").innerText = new Date().toLocaleTimeString("en-US", {
            timeStyle: "short"
        });

        document.getElementById("os-dock-date").innerText = new Date().toLocaleDateString("en-US", {
            dateStyle: "short"
        });
    },
    init: async function() {
        this.runDate();
        setInterval(this.runDate, 1000);

        const apps = await this.getApps();

        for (let i = 0; i < apps.length; i++) {
            this.dockApps.appendChild(await this.createElement(apps[i].name, apps[i].id));
        }
        
        return;
    },
    hidden: false,
    show: async function() {
        if (!this.hidden) return;

        this.hidden = false;

        this.taskbarElem.animate(
            [
                {
                    transform: "translateY(calc(100% + 20px))",
                },
                {
                    transform: "translateY(0)"
                }
            ],
            {
                easing: "ease",
                duration: 500
            }
        );

        await new Promise(r => setTimeout(r, 500));

        this.taskbarElem.style.transform = "";
    },
    hide: async function() {
        this.taskbarElem.animate(
            [
                {
                    transform: "translateY(0)",
                },
                {
                    transform: "translateY(calc(100% + 20px))"
                }
            ],
            {
                easing: "ease",
                duration: 500
            }
        );

        await new Promise(r => setTimeout(r, 490));

        this.taskbarElem.style.transform = "translateY(calc(100% + 20px))";

        let currentY = 0;

        const move = (e) => {
            currentY = e.clientY;

            if (e.clientY > window.innerHeight - 20 && this.hidden) {
                setTimeout(() => {
                    if (!(currentY > window.innerHeight - 20)) return;

                    this.show();
                    document.removeEventListener("mousemove", move);
                }, 150);
            }
        }

        this.hidden = true;

        document.addEventListener("mousemove", move);
    }
};

window.xen.taskbar = taskbar;

export default taskbar;