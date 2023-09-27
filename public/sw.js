const Filer = require("filer");
const { default: fs } = require("./xen/js/core/FileSystem");

const path = require("path-browserify");
const { default: mime } = require("@dynamic-pkg/mime");

importScripts("/uv/uv.bundle.js");
importScripts("/uv/uv.config.js");
importScripts("/uv/uv.sw.js");

const uv = new UVServiceWorker();

self.addEventListener("fetch", (event) => {
  const req = event.request;

  event.respondWith(
    (async (res) => {
      if (req.url.startsWith("chrome-extension://")) return await fetch(req);

      if (req.url.startsWith(location.origin + "/~/uv/"))
        return await uv.fetch(event);

      if (req.url.startsWith(location.origin + "/xen/~/")) {
        const _url = req.url.replace(location.origin + "/xen/~", "");

        if (_url.startsWith("/terminal/commands/")) {
          const url = path.join(
            "/xen/apps/native/terminal/commands/",
            _url.replace("/terminal/commands/", ""),
          );

          return await fetch(url);
        }

        if (_url.startsWith("/about:")) {
          switch (_url.slice(7)) {
            default:
            case "blank":
              return new Response("", {
                headers: {
                  "Content-Type": "text/html",
                },
              });
            case "srcdoc":
              return new Response(await req.text(), {
                headers: {
                  "Content-Type": "text/html",
                },
              });
          }
        }

        if (_url.startsWith("/assets")) {
          const url = path.join(
            "/xen/system/assets/",
            _url.replace("/assets/", ""),
          );

          return new Response(await fs.readFile(url), {
            headers: {
              "Content-Type": mime.lookup(url),
            },
          });
        }

        if (_url.startsWith("/apps")) {
          const app = _url
            .replace("/apps/", "")
            .split("/")
            .slice(0, 2)
            .join("/");
          const [author, appName] = app.split("/");

          let native = false;

          if (author == "Xen") native = true;

          const url = `/${_url.split("/").slice(4).join("/")}`;

          if (url.startsWith("/meta")) {
            return new Response(
              await fs.readFile(
                path.normalize("/xen/system/apps/" + app + "/app.json"),
              ),
              {
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );
          } else {
            let finalURL, content;

            try {
              content = await fs.readFile(
                (finalURL = path.join(
                  "/xen/system/apps/",
                  app,
                  url == "/" ? "/index.html" : url,
                )),
              );
            } catch {
              content = await fs
                .readFile(
                  (finalURL = path.join(
                    "/xen/system/apps/",
                    app,
                    url == "/" ? "/index.html" : url + ".html",
                  )),
                )
                .catch(() => {
                  return new Response(`404: ${url} not found`);
                });
            }
            
            content = new Blob([
              content,
            ], {
              type: mime.lookup(finalURL),
            });

            if (mime.lookup(finalURL) == "text/html") {
              content = `<base href="/xen/~/apps/${app}/" /><script src="/xen/~/assets/inject.bundle.js"></script>${await content.text()}`;
            }

            return new Response(content, {
              headers: {
                "Content-Type": mime.lookup(finalURL),
              },
            });
          }
        }
      } else {
        const path = new URL(req.url).pathname;
        const cache = await caches.open("xen-cache");

        // Offline support
        if (!(await cache.match(req))) {
          if (
            path.startsWith("/xen/img/") ||
            path.startsWith("/xen/font/") ||
            path.startsWith("/xen/cursors/") ||
            req.destination == "font" ||
            req.url.startsWith("https://cdn.jsdelivr.net/") ||
            req.url.startsWith("https://ka-f.fontawesome.com/")
          )
            return (
              res = await fetch(req),
              cache.put(req.url, res.clone()),
              res
            );
          else return await fetch(req);
        } else {
          return (await cache.match(req)) || (await fetch(req));
        }
      }
    })(),
  );
});

let nativePath = "/xen/apps/native/";

function installApp(data) {}

async function installNative(data) {
  const appData = await fetch(
    nativePath + data.app.replace("Xen/", "") + "/app.json",
  ).then((response) => response.json());

  appData.id = data.app;
  appData.files.splice(appData.files.indexOf("app.json"), 1);

  try {
    await fs.mkdir("/xen/system/apps/" + data.app);
  } catch {};

  await Promise.all(
    appData.files.map(async (file) => {
      if (await fs.stat(Filer.path.dirname("/xen/system/apps/" + data.app + "/" + file)).catch(() => false)) {
        const res = await fetch(
          nativePath + data.app.replace("Xen/", "") + "/" + file,
        );
        const blob = await res.blob();

        await fs.writeFile("/xen/system/apps/" + data.app + "/" + file, Filer.Buffer.from(await blob.arrayBuffer()));
      } else {
        try {
          await fs.mkdir(Filer.path.dirname("/xen/system/apps/" + data.app + "/" + file));
        } catch(e) {};

        const res = await fetch(
          nativePath + data.app.replace("Xen/", "") + "/" + file,
        );
        const blob = await res.blob();

        await fs.writeFile("/xen/system/apps/" + data.app + "/" + file, Filer.Buffer.from(await blob.arrayBuffer()));
      }
    }),
  );

  await fs.writeFile(
    "/xen/system/apps/" + data.app + "/app.json",
    JSON.stringify(appData),
  );

  const installed = JSON.parse(
    await fs.readFile("/xen/system/apps/installed.json", "utf-8"),
  );

  if (!installed.includes(data.app)) installed.push(data.app);

  await fs.writeFile(
    "/xen/system/apps/installed.json",
    JSON.stringify(installed),
  );

  return true;
}

async function updateNative(data) {
  const appData = await fetch(
    nativePath + data.app.replace("Xen/", "") + "/app.json",
  ).then((response) => response.json());

  const installed = JSON.parse(
    await fs.readFile(`/xen/system/apps/${data.app}/app.json`, "utf-8"),
  );

  if (installed.version == appData.version) return false;

  appData.files.splice(appData.files.indexOf("app.json"), 1);

  for (let file of appData.files) {
    const res = await fetch(
      nativePath + data.app.replace("Xen/", "") + "/" + file,
    );
    const blob = await res.blob();

    await fs.writeFile("/xen/system/apps/" + data.app + "/" + file, Filer.Buffer.from(await blob.arrayBuffer()));
  }

  await fs.writeFile(
    "/xen/system/apps/" + data.app + "/app.json",
    JSON.stringify(appData),
  );

  return true;
}

self.addEventListener("message", async (event) => {
  if (typeof event.data !== "object") return false;

  switch (event.data.type) {
    case "install":
      if (event.data.native === true) {
        await installNative(event.data).catch((err) => {
          //console.error(err);

          event.ports[0].postMessage({
            type: "install",
            success: false,
            error: err,
          });
        });

        event.ports[0].postMessage({
          type: "install",
          success: true,
        });
      } else {
        return installApp(event.data);
      }

      break;
    case "update":
      if (event.data.native === true) {
        await updateNative(event.data).catch((err) => {
          //console.error(err);

          event.ports[0].postMessage({
            type: "update",
            success: false,
            error: err,
          });
        });

        event.ports[0].postMessage({
          type: "update",
          success: true,
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
