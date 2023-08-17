// Loads scripted apps

function __workerCode() {
    // ALL CODE IN THIS FUNCTION IS RUN IN A SCOPED DEDICATED WORKER

    self.__joinPath = (...args) => {
        return args.map((part, i) => {
          if (i === 0) {
            return part.trim().replace(/[\/]*$/g, '')
          } else {
            return part.trim().replace(/(^[\/]*|[\/]*$)/g, '')
          }
        }).filter(x=>x.length).join('/')
    };

    self._readyPromise = new Promise(function(res) {
        self.addEventListener("message", function(event) {
            if (event.data.type === "ready") {
                res();
            }
        });
    });
    
    class Window {
        constructor(data) {
            console.log("Window created")
            this.appData = data;
        }

        async loadFile(url) {
            let text;

            if (
                url.startsWith("data:")
                || url.startsWith("blob:")
                || url.startsWith("http://")
                || url.startsWith("https://")
            ) {
                text = await fetch(url).then(function(res) {
                    return res.text();
                });
            } else text = await fetch(__joinPath("/xen/~/apps/", self.__moduleID, url)).then(function(res) {
                return res.text();
            });

            await exec(`document.getElementById("${this.appData.id}").querySelector("iframe").contentWindow.document.write(atob("${btoa(text)}"))`);
        }
    }

    self.xen = {
        onReady: function(callback) {
            _readyPromise.then(callback).then(function() {
                self.postMessage({
                    type: "ready"
                });
            });
        },
        register: async function(data) {
            const app = await exec(`window.xen.apps.register({
                name: "${data.name}",
                native: ${data.native || false},
                type: "${data.type || "default"}",
                x: ${data.x || 0},
                y: ${data.y || 0},
                width: ${data.width || 500},
                height: ${data.height || 300}
            });`);

            return new Window(app);
        }
    };
    
    async function exec(script) {
        const channel = new MessageChannel();
    
        return await new Promise((resolve, reject) => {
            channel.port2.onmessage = (event) => {
                console.log(event);
                if (event.data.type === "exec") {
                    if (event.data.success === true) {
                        resolve(event.data.result);
                    } else {
                        reject();
                    }
                }
            };

            self.postMessage({
                type: "exec",
                script: script
            }, [channel.port1]);
        });
    }
}

function createWorker(name, script, id) {
    script = new Blob([`
self.__moduleName = "${name}";
self.__moduleID = "${id}";

(${__workerCode.toString()})();

${script}
        `], 
        {
            type: "application/javascript"
        }
    );

    const worker = new Worker(URL.createObjectURL(script), {
        type: "module",
        name: "appLoader-" + name
    });

    return worker;
}

const appLoader = {
    async load(data, script, el) {
        const worker = createWorker(data.name, script, data.id);

        let complete = false;

        function bounce() {
          if (complete) return clearInterval(interval);

          if (el) {
            el.bounce();
          }
        }

        let interval = setInterval(bounce, 800);

        bounce();

        worker.postMessage({
            type: "ready",
        });

        worker.addEventListener("message", async (event) => {
            if (event.data.type === "ready") {
                complete = true;
            }

            if (event.data.type === "exec") {
                console.log(event);
                event.ports[0].postMessage({
                    type: "exec",
                    success: true,
                    result: await (0, eval)(`(() => {return ${event.data.script};})()`)
                });
            }
        });

        await window.xen.taskbar.appOpen(data.name, data.id);
    }
};

export default appLoader;