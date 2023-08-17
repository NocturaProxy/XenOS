const fs = require("./FileSystem");
const wm = require("./WindowManager");
const loader = require("./Loader");
const cookie = require("js-cookie");

window.path = require("path-browserify");

interface Window {
    xen: Xen;
    path: any;
}

interface FileSystem {
    loading: Promise<void>;
    readFile(path: string): Promise<string>;
    writeFile(path: string, data: string): Promise<void>;
    unlink(path: string): Promise<void>;
    openDir(path: string): Promise<void>;
    exists(path: string): Promise<boolean>;
    mkdir(path: string): Promise<void>;
    stat(path: string): Promise<any>;
}

class Xen {
    fs: FileSystem = new fs();
    wm = new wm();
    loader = new loader();

    taskbar: any;
    battery: any;
    apps: any;

    async startup() {
        await this.fs.loading;
        await this.wm.init();

        window.EventTarget.prototype.addEventListener = new Proxy(window.EventTarget.prototype.addEventListener, {
            apply: (target, thisArg, args) => {
                if (!thisArg.eventListeners) thisArg.eventListeners = [];

                thisArg.eventListeners.push({
                    type: args[0],
                    listener: args[1],
                    options: args[2] || {}
                });

                return Reflect.apply(target, thisArg, args);
            }
        });

        (window.EventTarget.prototype as any).removeEventListeners = function(event: any) {
            if (!this.eventListeners) return;

            for (const listener of this.eventListeners.filter(([type, listener, options]: any) => type === event)) {
                this.removeEventListener(listener.type, listener.listener, listener.options);
            }
        }

        if (cookie.get("fs-initiated") !== "true") {
            await this.stupFileSystem();

            cookie.set(
                "fs-initiated",
                "true",
                {
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10),
                    secure: true,
                    sameSite: "strict"
                }
            );
        }

        await this.loader.init(
            "components/apps.js",
            "components/taskbar.js",
            "components/battery.js",
        );

        return true;
    }

    async stupFileSystem() {
        const vfs = this.fs;

        // General Files
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

        await vfs.writeFile("/xen/system/taskbar/pinned.json", [
            {
                name: "Welcome",
                id: "Xen/welcome"
            },
            {
                name: "Settings",
                id: "Xen/settings"
            },
            {
                name: "Velocity",
                id: "Xen/velocity"
            },
        ] as any);

        // App files

        await vfs.mkdir("/xen/system/apps");

        await vfs.writeFile("/xen/system/apps/installed.json", [

        ] as any);

        return true;
    };

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
                }
            ],
            {
                duration: 500,
                easing: "ease-in-out",
            }
        );

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }
}

module.exports = Xen;