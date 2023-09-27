export const help = async (args, process) => {
    const { fs } = process;

    return `
        ping - ping a server
    `;
}

export const run = async (args, process) => {
    const { fs, http, term } = process;
    let [ hostname ] = args;
    
    let active = true;

    if (!hostname) throw "";

    term.attachCustomKeyEventHandler(async (e) => {
        if (!active) return;

        if (e.key === "c" && e.ctrlKey) {
            active = false;
        }
    });

    try {
        new URL(hostname);
    } catch {
        hostname = `http://${hostname}`;
    }

    for (let i = 0; active; i++) {
        var start = Date.now();

        let res = await http.fetch(hostname, {
            redirect: "manual"
        });

        var { size } = await res.blob();

        var end = Date.now();
        var time = end - start;

        term.write("\r\n");
        term.write(`PING ${hostname}: ${size} data bytes, ${time}ms`);

        await new Promise((resolve) => setTimeout(resolve, 500));

        continue;
    }

    return true;
}