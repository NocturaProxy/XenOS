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
    dock: document.querySelector(".os-dock"),
    dockApps: document.querySelector(".os-dock-apps"),
    async getApps() {
        return JSON.parse(await xen.fs.readFile("/xen/system/taskbar/pinned.json", "utf-8"));
    },
    createElement(name, icon) {
        const el = document.createElement("div");

        el.classList.add("os-dock-item");
        el.dataset.name = name;
        el.innerHTML = `
            <img alt="App Logo" src="${icon}">
        `;

        return el;
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
            this.dockApps.appendChild(this.createElement(apps[i].name, apps[i].icon));
        }
        
        return;
    }
};

window.xen.taskbar = taskbar;

export default taskbar;