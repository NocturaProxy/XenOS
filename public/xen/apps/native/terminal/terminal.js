import FontFaceObserver from 'https://cdn.jsdelivr.net/npm/fontfaceobserver@2.3.0/+esm';
import FitAddon from 'https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.7.0/+esm';
import WebLinksAddon from 'https://cdn.jsdelivr.net/npm/xterm-addon-web-links@0.8.0/+esm';
import * as XTermFont from "https://cdn.jsdelivr.net/npm/xterm-webfont@2.0.0/+esm";

import c from 'https://cdn.jsdelivr.net/npm/ansi-colors@4.1.3/+esm';

var term = new Terminal({
    fontFamily: "monospace",
    fontWeight: "lighter",
    fontWeightBold: "light",
    letterSpacing: 1,
    theme: {
        background: "#0000001a",
        
    },
    cursorBlink: true,
    allowTransparency: true,
});

self.term = term;

class XenTerm {
    term = null;

    constructor() {
        this.user = "guest";
    }

    fs = null;
    dfs = null;

    async #setupFS() {
        if (!this.dfs) this.dfs = await window.top.xen.fs.openDir('/xen/users/guest/');
        if (!this.fs) this._fs = await window.top.xen.fs.openDir('/xen/system/apps/Xen/terminal');

        if (!await this._fs.exists("/lib"))
            await this._fs.mkdir("/lib");

        this.fs = await this._fs.openDir("/lib");

        if (!await this.fs.exists("/cmd"))
            await this.fs.mkdir("/cmd");
        
        if (!await this.fs.exists("/motd.txt"))
            await this.fs.writeFile("/motd.txt", "Welcome to Xen!");

        if (!await this.fs.exists("/lastlogin.txt"))
            await this.fs.writeFile("/lastlogin.txt", new Date().getTime());

        if (!await this.fs.exists("history.txt"))
            await this.fs.writeFile("/history.txt", []);

        return this.fs;
    }

    async activate(term) {
        await this.#setupFS();

        this.term = term;

        this.term.writeln(
            c.bold(await this.fs.readFile('/motd.txt', 'utf-8'))
        );
        this.term.writeln(
            c.dim(
                'Last login: ' + new Date(
                    parseInt(await this.fs.readFile('/lastlogin.txt', 'utf-8'))
                ).toLocaleString({}, {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                })
            )
        );
        // this.term.writeln('\n');
        this.term.onKey(this.onKey.bind(this));

        this.return();
    }

    return(text = "") {
        this.typing = text;
        return this.term.write(
            "\r\n" + c.bold(this.user) + '@' + c.bold('xen') + ':~$ ' + text
        );
    }

    typing = "";
    up = 0;

    parseCommand(command) {
        const args = command.match(/(?:(?:"[^"]+")|(?:[^\s]+))/gmi).map(
            match => match.startsWith('"') ? match.slice(1, -1) : match
        );

        return {
            command: args[0],
            args: args.slice(1),
        };
    }

    rewriteError(err) {
        return new Error(
            err
                .toString()
                .replace(
                    new RegExp(
                        "TypeError: " +
                        "Failed to fetch dynamically imported module: " +
                        location.origin +
                        "/xen/~/apps/Xen/terminal/commands/"
                    ),
                    "Command not found: "
                )
                .replace(
                    new RegExp(
                        ".js$",
                        "g"
                    ),
                    ""
                )
        );
    }

    async onKey({ key, domEvent: event }) {
        if (event.key === 'Enter') {
            this.up = 0;

            if (this.typing.length > 0) {
                const history = JSON.parse(await this.fs.readFile('/history.txt', 'utf-8'));

                await this.fs.writeFile('/history.txt', (history.push(this.typing), history));

                const { command, args } = this.parseCommand(this.typing);

                if (command === 'clear') {
                    this.term.clear();
                    this.return();
                } else {
                    return import("/xen/~/terminal/commands/" + command + ".js").then(async ({ help, run }) => {
                        return run(args, {
                            fs: this.dfs,
                            term: this.term,
                            write: this.term.write.bind(this.term),
                        });
                    }).catch(async (err) => {
                        this.term.write("\r\n");
                        this.term.write(c.redBright(this.rewriteError(err).message));
                    }).finally(() => {
                        this.return();
                    });
                }
            } else {
                this.typing = "";

                this.return();
            }
        } else if (event.key === 'Backspace') {
            if (this.typing.length > 0) {
                this.typing = this.typing.slice(0, -1);

                this.term.write('\b \b');
            } else {
                return;
            }
        } else if (event.key === "Tab") {
            const files = await this.fs.readdir("/cmd");

            const matches = files.filter(file => file.startsWith(this.typing));

            if (matches.length === 1) {
                this.typing = matches[0];

                this.term.write(matches[0].slice(this.typing.length));
            } else if (matches.length > 1) {
                this.term.write('\r\n');

                for (const match of matches) {
                    this.term.writeln(match);
                }

                this.return();
            } else {
                this.typing += '    ';
                this.term.write('    ');
            }
        } else if (
            !event.altKey &&
            !event.altGraphKey &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.key.includes('Arrow')
        ) {
            this.typing += event.key;

            this.term.write(event.key);
        } else if (event.key === 'ArrowUp') {
            const history = JSON.parse(await this.fs.readFile('/history.txt', 'utf-8'));

            if (this.up < history.length) {
                this.up++;

                this.term.write('\b \b'.repeat(this.typing.length));

                this.typing = history[history.length - this.up];

                this.term.write(this.typing);
            }
        } else if (event.key === "ArrowDown") {
            const history = JSON.parse(await this.fs.readFile("/history.txt", "utf-8"));

            if (this.up > 1) {
                this.up--;

                this.term.write("\b \b".repeat(this.typing.length));

                this.typing = history[history.length - this.up];

                this.term.write(this.typing);
            } else {
                this.up = 0;

                this.term.write("\b \b".repeat(this.typing.length));

                this.typing = "";

                this.term.write("");
            }
        }
    }
}

const fit = new FitAddon.FitAddon();

[
    new WebLinksAddon.WebLinksAddon(),
    fit,
    new XenTerm(term),
].forEach(term.loadAddon.bind(term));

term.open(document.getElementById('terminal'));

fit.fit();

window.onresize = () => {
    fit.fit();
};