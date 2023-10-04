const express = require("express");
const compress = require("express-compression");
const esbuild = require("esbuild");
const fs = require("fs");
const request = require("request");
const http = require("node:http");
const { createBareServer } = require("@tomphttp/bare-server-node");
const { polyfillNode: polyfill } = require("esbuild-plugin-polyfill-node");

require("./repoServer");

const PORT = "3000";

console.log("Welcome to XenOS Server");

try {
  esbuild
    .context({
      entryPoints: [
        {
          in: "public/xen/js/entry.ts",
          out: "web.bundle",
        },
        {
          in: "public/sw.js",
          out: "sw.bundle",
        },
        {
          in: "public/xen/js/inject/entry.js",
          out: "inject.bundle",
        },
      ],
      bundle: true,
      format: "esm",
      outdir: "public/xen/web/",
      logLevel: "error",
      platform: "browser",
      minify: false,
      plugins: [polyfill({})],
    })
    .then((ctx) => ctx.watch());

  const files = fs.readdirSync("./public/xen/js/components/");

  esbuild
    .context({
      entryPoints: files.map((file) => ({
        in: "public/xen/js/components/" + file,
        out: file.replace(".js", ""),
      })),
      bundle: true,
      format: "esm",
      outdir: "public/xen/web/components",
      logLevel: "error",
      platform: "browser",
      minify: false,
      plugins: [polyfill({})],
    })
    .then((ctx) => ctx.watch());
} catch (e) {
  console.log(e);
}

const server = http.createServer();
const app = express(server);
const bareServer = createBareServer("/bare/");

app.use(compress({ level: 9 }));

app.use((req, res, next) => {
  res.append("Service-Worker-Allowed", "/");

  if (req.pathname === "/") {
    res.append(
      "Content-Security-Policy",
      "default-src 'self' fonts.googleapis.com fonts.gstatic.com; img-src * blob:; script-src 'self' 'sha256-9NsIanf8jSVFuiPetrZ1jfLPoMPzZuPz2w3GWvQFgIU=' 'sha256-inline' 'unsafe-eval' 'unsafe-hashes'; font-src 'self' fonts.gstatic.com fonts.googleapis.com data: *.slant.co; style-src-elem fonts.googleapis.com fonts.gstatic.com 'self' 'sha256-tdxd90rTdR0f9tIdFGpIqKd/7yyeTMO/vWN8Fu6/q40=' 'sha256-pg+aUJQeX3r3dfj4esilAvVsVMvh+iTCagyckScaD7M=' 'sha256-pNuvqlsmWwHO/+G71KM8gYFRp51DP92YGba0uGQLwNE='; style-src 'unsafe-inline' fonts.gstatic.com fonts.googleapis.com; connect-src 'self' xenos-app-repository.enderkingj.repl.co xen-analytics.enderkingj.repl.co fonts.googleapis.com fonts.gstatic.com google.com; frame-src *",
    );
  }

  next();
});

app.use(
  express.static("public", {
    maxAge: "0",
  }),
);

app.get("/ipapi", async (req, res) => {
  try {
    return res.send(
      await fetch(
        `http://ip-api.com/json/${(
          req.headers["x-forwarded-for"]?.split(",").shift() ||
          req.socket?.remoteAddress ||
          ""
        ).replace("::1", "")}`,
      ).then((res) => res.json()),
    );
  } catch (e) {
    return res.status(400).send({ error: e.toString() });
  }
});

app.get("/media", (req, res) => {
  const imageUrl = req.query.imageUrl;

  request(imageUrl).pipe(res);
});

server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  console.log(`Server running at http://localhost:${PORT}/.`);
});

server.listen({
  port: PORT,
});
