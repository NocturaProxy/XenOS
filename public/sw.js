const fs = new (require("./xen/js/core/FileSystem.ts"))();
const path = require("path-browserify");
const { default: mime } = require("@dynamic-pkg/mime");

self.addEventListener("activate", () => self.clients.claim());

self.addEventListener("fetch", (event) => {
  const req = event.request;

  event.respondWith(
    (async (res) => {
      if (req.url.startsWith("chrome-extension://")) return await fetch(req);

      if (req.url.startsWith(location.origin + "/xen/~/")) {
        const _url = req.url.replace(location.origin + "/xen/~", "");

        if (_url.startsWith("/apps")) {
          const app = _url.replace("/apps/", "").split("/").slice(0, 2).join("/");
          const [ author, appName ] = app.split("/");

          let native = false;

          if (author == "Xen") 
            native = true;

          const url = `/${_url.split("/").slice(4).join("/")}`;

          if (url.startsWith("/meta")) {
            return new Response(
              await fs.readFile(
                path.normalize("/xen/system/apps/" + app + "/app.json")
              ),
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            );
          } else {
            let content = await fs.readFile(
              path.join("/xen/system/apps/", app, url)
            );

            if (mime.lookup(url) == "text/html") {
              content = `<base href="/xen/~/apps/${app}/" />${await content.text()}`;
            }

            return new Response(
              content,
              {
                headers: {
                  "Content-Type": mime.lookup(url)
                }
              }
            );
          }
        }
      } else {
        const path = new URL(req.url).pathname;
        const cache = await caches.open("apps");

        // Offline support
        if (!(await cache.match(req))) {
          if (path.startsWith("/img/") || path.startsWith("/xen/font/"))
            return (res = await fetch(req)), await cache.put(req, res), res;
          else return await fetch(req);
        } else {
          return (await cache.match(req)) || (await fetch(req));
        }
      }
    })(),
  );
});

let nativePath = "/xen/apps/native/";

function installApp(data) {

}

async function installNative(data) {
  const appData = await fetch(nativePath + data.app.replace("Xen/", "") + "/app.json").then(
    response => response.json()
  );
  appData.files
    .splice(appData.files.indexOf("app.json"), 1);

  for (let file of appData.files) {
    const res = await fetch(nativePath + data.app.replace("Xen/", "") + "/" + file);
    const blob = await res.blob();

    await fs.writeFile("/xen/system/apps/" + data.app + "/" + file, blob);
  }

  await fs.writeFile("/xen/system/apps/" + data.app + "/app.json", JSON.stringify(appData));

  const installed = JSON.parse(await fs.readFile("/xen/system/apps/installed.json", "utf-8"));

  if (!installed.includes(data.app)) installed.push(data.app);

  await fs.writeFile("/xen/system/apps/installed.json", JSON.stringify(installed));

  return true;
}

async function updateNative(data) {
  const appData = await fetch(nativePath + data.app.replace("Xen/", "") + "/app.json").then(
    response => response.json()
  );

  const installed = JSON.parse(await fs.readFile(`/xen/system/apps/${data.app}/app.json`, "utf-8"));

  if (installed.version == appData.version) return false;

  appData.files
    .splice(appData.files.indexOf("app.json"), 1);

  for (let file of appData.files) {
    const res = await fetch(nativePath + data.app.replace("Xen/", "") + "/" + file);
    const blob = await res.blob();

    await fs.writeFile("/xen/system/apps/" + data.app + "/" + file, blob);
  }

  await fs.writeFile("/xen/system/apps/" + data.app + "/app.json", JSON.stringify(appData));

  return true;
}

self.addEventListener("message", async (event) => {
  if (typeof event.data !== "object") return false;

  switch(event.data.type) {
    case "install":
      if (event.data.native === true) {
        await installNative(event.data).catch((err) => {
          event.ports[0].postMessage({
            type: "install",
            success: false,
            error: err.toString()
          });
        });;

        event.ports[0].postMessage({
          type: "install",
          success: true
        });
      } else {
        return installApp(event.data);
      }

      break;
    case "update":
      if (event.data.native === true) {
        await updateNative(event.data).catch((err) => {
          event.ports[0].postMessage({
            type: "update",
            success: false,
            error: err.toString()
          });
        });

        event.ports[0].postMessage({
          type: "update",
          success: false
        });
      }
      break;
    case "uninstall":
      break;
  }
});

// Immediately apply updates
self.addEventListener("install", (event) => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(clients.claim()));
