const menu = {
    open: false,
    dock: document.getElementById("os-taskbar-resizable"),
    dockUnder: document.querySelector(".os-taskbar-under"),
    taskMenu: document.querySelector(".os-taskbar-menu"),
    startMenu: document.querySelector(".start-over"),
    searchMenu: document.querySelector(".start-search"),

    show: async function() {
        this.open = true;

        this.taskMenu.style.height = "400px";
        this.dock.style.height = "445px";
    },

    hide: async function() {
        this.open = false;

        await this.hideSearch();
        
        this.taskMenu.style.height = "";
        this.dock.style.height = "";
    },

    showSearch: async function() {
        this.searchMenu.querySelector("input").focus();

        const apps = await Promise.all(window.xen.apps.installedApps.map(async app => {
            const req = await fetch("/xen/~/apps/" + app + "/meta").then(
                response => response.json()
            );

            return {
                id: app,
                name: req.name,
                icon: path.join("/xen/~/apps/", app, req.icon),
            }
        }));

        const container = this.searchMenu.querySelector(".search-apps");

        container.innerHTML = apps.map(app => 
            `<div class="start-app" data-app="${app.id}">
                <img class="start-app-icon" src="${app.icon}">
                ${app.name}
            </div>`
        ).join("\n");

        this.startMenu.style.opacity = "0";
        await new Promise(r => setTimeout(r, 100));
        this.startMenu.style.visibility = "hidden";

        this.searchMenu.style.opacity = "0";
        this.searchMenu.style.visibility = "visible";
        this.searchMenu.style.opacity = "1";

        return true;
    },

    hideSearch: async function() {
        this.searchMenu.querySelector("input").blur();

        this.searchMenu.style.opacity = "0";
        await new Promise(r => setTimeout(r, 100));
        this.searchMenu.style.visibility = "hidden";

        this.startMenu.style.opacity = "0";
        this.startMenu.style.visibility = "visible";
        this.startMenu.style.opacity = "1";

        return true;
    },

    initSearch: async function(e) {
        const input = this.searchMenu.querySelector("input");

        if (e.key == "Backspace" && input.value.length == 0) {
            return await this.hideSearch();
        }

        await this.showSearch();
    }
};

menu.searchMenu.querySelector("button.start-back").addEventListener("click", async function(e) {
    menu.hideSearch();
});

menu.startMenu.querySelector(".start-go").addEventListener("click", async function(e) {
    menu.showSearch();
});

document.getElementById("startButton").addEventListener("click", function(e) {
    if (menu.open) {
        menu.hide();
    } else {
        menu.show();
    }
});

document.addEventListener("keyup", function(e) {
    if (e.key == "Option" || e.key == "Alt") {
        if (menu.open) {
            menu.hide();
        } else {
            menu.show();
        }
    }
});

document.addEventListener("click", function(e) {
    let target;

    for (var n = e.target; n.parentNode; n = n.parentNode) {
        if (n.id == "os-taskbar-resizable") {
            target = n;
            break;
        }
    }

    if (!target) {
        return menu.hide();
    }
});

window.addEventListener("keydown", function(e) {
    if (!menu.open) return;

    switch(e.key) {
        case "a":
        case "b":
        case "c":
        case "d":
        case "e":
        case "f":
        case "g":
        case "h":
        case "i":
        case "j":
        case "k":
        case "l":
        case "m":
        case "n":
        case "o":
        case "p":
        case "q":
        case "r":
        case "s":
        case "t":
        case "u":
        case "v":
        case "w":
        case "x":
        case "y":
        case "z":
        case " ":
        case "Backspace":
            return menu.initSearch(e);
        case "Escape":
            return menu.hide();
        default:
            console.log(e.key);
            break;
    }
});