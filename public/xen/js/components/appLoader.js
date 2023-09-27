// Loads scripted apps


function __workerCode() {
  // ALL CODE IN THIS FUNCTION IS RUN IN A SCOPED DEDICATED WORKER

  self.__joinPath = (...args) => {
    return args
      .map((part, i) => {
        if (i === 0) {
          return part.trim().replace(/[\/]*$/g, "");
        } else {
          return part.trim().replace(/(^[\/]*|[\/]*$)/g, "");
        }
      })
      .filter((x) => x.length)
      .join("/");
  };

  self._readyPromise = new Promise(function (res) {
    self.addEventListener("message", function (event) {
      if (event.data.type === "ready") {
        res();
      }
    });
  });

  class Window {
    constructor(data) {
      this.appData = data;
    }

    loadURL(url, opts = {}) {
      if (
        !(
          url.startsWith("data:") ||
          url.startsWith("blob:") ||
          url.startsWith("http://") ||
          url.startsWith("https://")
        )
      )
        url =
          location.origin + __joinPath("/xen/~/apps/", self.__moduleID, url);

      return new Promise(async (resolve) => {
        await exec(`
                    return new Promise(resolve => {
                        document.getElementById("${
                          this.appData.id
                        }").querySelector("iframe").addEventListener("${
                          opts.event || "load"
                        }", function(e) {
                            resolve();
                        }, {once: true});

                        document.getElementById("${
                          this.appData.id
                        }").querySelector("iframe").src = "${url}";
                    });
                `);

        resolve();
      });
    }

    async loadFile(url, opts) {
      let text;

      if (
        url.startsWith("data:") ||
        url.startsWith("blob:") ||
        url.startsWith("http://") ||
        url.startsWith("https://")
      ) {
        text = await fetch(url).then(function (res) {
          return res.text();
        });
      } else
        text = await fetch(
          location.origin + __joinPath("/xen/~/apps/", self.__moduleID, url),
        ).then(function (res) {
          return res.text();
        });

      await exec(
        `document.getElementById("${
          this.appData.id
        }").querySelector("iframe").contentWindow.document.write(atob("${btoa(
          text,
        )}"))`,
      );
    }

    async hide(ms = 0) {
      await exec(
        `document.getElementById("${this.appData.id}").style.transition = "${(
          ms / 1000
        ).toFixed(2)}s opacity ease";`,
      );
      await exec(
        `requestAnimationFrame(() => document.getElementById("${this.appData.id}").style.opacity = "0");`,
      );

      if (ms) await new Promise((r) => setTimeout(r, ms));

      await exec(
        `document.getElementById("${this.appData.id}").style.display = "none";`,
      );

      return true;
    }

    async show(ms = 0) {
      await exec(
        `document.getElementById("${this.appData.id}").style.transition = "${(
          ms / 1000
        ).toFixed(2)}s opacity ease";`,
      );
      await exec(
        `requestAnimationFrame(() => document.getElementById("${this.appData.id}").style.opacity = "1");`,
      );

      if (ms) await new Promise((r) => setTimeout(r, ms));

      await exec(
        `document.getElementById("${this.appData.id}").style.display = "block";`,
      );

      return true;
    }
  }

  self.xen = {
    onReady: function (callback) {
      _readyPromise.then(callback).then(function () {
        self.postMessage({
          type: "ready",
        });
      });
    },
    register: async function (data) {
      const app = await exec(`return window.xen.apps.register({
          name: "${data.name}",
          native: ${data.native || false},
          type: "${data.type || "default"}",
          x: ${data.x || 0},
          y: ${data.y || 0},
          width: ${data.width || 500},
          height: ${data.height || 300},
          visible: ${data.visible !== false},
          menuBar: ${data.menu !== false},
          focus: ${data.focus !== false},
          appId: "${self.__moduleID}"
      });`);

      return new Window(app);
    },
  };

  async function exec(script) {
    const channel = new MessageChannel();

    return await new Promise((resolve, reject) => {
      channel.port2.onmessage = (event) => {
        if (event.data.type === "exec") {
          if (event.data.success === true) {
            resolve(event.data.result);
          } else {
            reject();
          }
        }
      };

      self.postMessage(
        {
          type: "exec",
          script: script,
        },
        [channel.port1],
      );
    });
  }
}

function createWorker(name, script, id, pid) {
  script = new Blob(
    [
      `
self.__moduleName = "${name}";
self.__moduleID = "${id}";
self.__processID = "${pid}";

(${__workerCode.toString()})();

${script}
        `,
    ],
    {
      type: "application/javascript",
    },
  );

  const worker = new Worker(URL.createObjectURL(script), {
    type: "module",
    name: "appLoader-" + pid,
  });

  return worker;
}

const appLoader = {
  load(data, script, el, pid = xen.apps.createID()) {
    return new Promise(async (resolve) => {
      const worker = createWorker(data.name, script, data.id, pid);

      let complete = false;

      function bounce() {
        if (complete) return resolve(worker), clearInterval(interval);

        if (el) {
          el.bounce();
        }
      }

      let interval = setInterval(bounce, 800);

      bounce();

      worker.postMessage({
        type: "ready",
      });

      function clone(obj) {
        try {
          return JSON.parse(JSON.stringify(obj));
        } catch {
          return obj;
        }
      }

      worker.addEventListener("message", async (event) => {
        if (event.data.type === "ready") {
          complete = true;
        }

        if (event.data.type === "exec") {
          event.ports[0].postMessage({
            type: "exec",
            success: true,
            result: clone(await (0, eval)(`(() => {${event.data.script};})()`)),
          });
        }
      });

      await window.xen.taskbar.appOpen(data.name, data.id);

      //return resolve(worker);
    });
  },
};

export default appLoader;
