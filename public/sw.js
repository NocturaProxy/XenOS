self.addEventListener("activate", () => self.clients.claim());

self.addEventListener("fetch", (event) => {
  const req = event.request;

  event.respondWith(
    (async (res) => {
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
    })(),
  );
});

// Immediately apply updates
self.addEventListener("install", (event) => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(clients.claim()));
