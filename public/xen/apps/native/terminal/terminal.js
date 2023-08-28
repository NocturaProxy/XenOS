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

    async #setupFS() {
        try {
        if (!this.fs) this.fs = await window.top.xen.fs.openDir('/xen/system/apps/Xen/terminal');

        if (!await this.fs.exists("/lib"))
            await this.fs.mkdir("/lib");

        this.fs = await this.fs.openDir("/lib");

        if (!await this.fs.exists("/cmd"))
            await this.fs.mkdir("/cmd");
        
        if (!await this.fs.exists("/motd.txt"))
            await this.fs.writeFile("/motd.txt", "Welcome to Xen!");

        if (!await this.fs.exists("/lastlogin.txt"))
            await this.fs.writeFile("/lastlogin.txt", new Date().getTime());

        if (!await this.fs.exists("history.txt"))
            await this.fs.writeFile("/history.txt", "");

        return this.fs;
        } catch(e) {
            console.error(e);
        }
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

    return(text) {
        return this.term.write(
            "\r\n" + c.bold(this.user) + '@' + c.bold('xen') + ':~$ '
        );
    }

    typing = "";

    async onKey({ key, domEvent: event }) {
        const printable =
            !event.altKey &&
            !event.altGraphKey &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.key.includes('Arrow');

        if (event.key === 'Enter') {
            this.typing = "";

            this.return();
        } else if (event.key === 'Backspace') {
            if (this.typing.length > 0) {
                this.typing = this.typing.slice(0, -1);

                this.term.write('\b \b');
            } else {
                this.term.write('\b');
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
                this.term.write('\t');
            }
        } else if (printable) {
            this.typing += event.key;

            this.term.write(event.key);
        } else if (event.key === 'ArrowUp') {
            const history = await this.fs.readFile('/history.txt', 'utf-8');

            const lines = history.split('\n');

            if (lines.length > 0) {
                this.typing = lines[lines.length - 1];

                this.term.write('\r\n' + this.typing);
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