"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/path-normalize/lib/index.js
var require_lib = __commonJS({
  "node_modules/path-normalize/lib/index.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    var SLASH = 47;
    var DOT = 46;
    var assertPath = function assertPath2(path) {
      var t = _typeof(path);
      if (t !== "string") {
        throw new TypeError("Expected a string, got a ".concat(t));
      }
    };
    var posixNormalize = function posixNormalize2(path, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path.length; ++i) {
        if (i < path.length) {
          code = path.charCodeAt(i);
        } else if (code === SLASH) {
          break;
        } else {
          code = SLASH;
        }
        if (code === SLASH) {
          if (lastSlash === i - 1 || dots === 1) {
          } else if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== DOT || res.charCodeAt(res.length - 2) !== DOT) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0) {
                res += "/..";
              } else {
                res = "..";
              }
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0) {
              res += "/" + path.slice(lastSlash + 1, i);
            } else {
              res = path.slice(lastSlash + 1, i);
            }
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === DOT && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    };
    var decode = function decode2(s) {
      try {
        return decodeURIComponent(s);
      } catch (_unused) {
        return s;
      }
    };
    var normalize = function normalize2(p) {
      assertPath(p);
      var path = p;
      if (path.length === 0) {
        return ".";
      }
      var isAbsolute = path.charCodeAt(0) === SLASH;
      var trailingSeparator = path.charCodeAt(path.length - 1) === SLASH;
      path = decode(path);
      path = posixNormalize(path, !isAbsolute);
      if (path.length === 0 && !isAbsolute) {
        path = ".";
      }
      if (path.length > 0 && trailingSeparator) {
        path += "/";
      }
      if (isAbsolute) {
        return "/" + path;
      }
      return path;
    };
    var _default = normalize;
    exports["default"] = _default;
    module2.exports = exports.default;
  }
});

// public/xen/js/core/FileSystem.ts
var require_FileSystem = __commonJS({
  "public/xen/js/core/FileSystem.ts"(exports, module2) {
    "use strict";
    var import_path_normalize = __toESM(require_lib());
    var EntryStat = class {
      constructor(detail, file) {
        this.detail = detail;
        this.file = file;
        this.detail = detail;
        if (!this.isDirectory()) {
          this.file = file;
          this.length = file.size;
        }
      }
      content = null;
      length = 0;
      isDirectory() {
        return this.detail.type == "directory";
      }
      isFile() {
        return this.detail.type == "file";
      }
    };
    var vfs = class _vfs {
      normalize = import_path_normalize.default;
      base;
      constructor(path = "") {
        this.base = new URL(
          (0, import_path_normalize.default)(location.origin + (path || "").replace(/\/?$/, "/"))
        );
      }
      error = class VFSError extends Error {
        constructor(type) {
          var types = [
            /* 0: Path Error */
            "Invalid Path: /",
            /* 1: Missing Path */
            "Missing Required Argument: path",
            /* 2: Missing Content */
            "Missing Required Argument: content",
            /* 3: Dir Exists */
            "Directory Already Exists",
            /* 4: File Exists */
            "File Already Exists",
            /* 5: Not Found */
            "File Not Found",
            /* 6: Dir Does Not Exist */
            "Directory Does Not Exist",
            /* 7: Not A Directory */
            "Not A Directory",
            /* 8: Not A File */
            "Not A File"
          ];
          super(types[type]);
        }
      };
      directory = class directory extends _vfs {
        constructor(path = "") {
          super(path);
        }
      };
      get loading() {
        return caches.open("vfs");
      }
      async mkdir(path) {
        if (!path)
          throw new this.error(1);
        path = path.replace(/\/$/, "");
        const fs = await this.loading;
        var relURL = new URL((0, import_path_normalize.default)(this.base.href + path)).pathname;
        var build = "/";
        for (var segment of relURL.split("/")) {
          if (!segment)
            continue;
          build += segment;
          if (!await this.exists(build))
            await this.mkdir(build);
          build += "/";
        }
        await fs.put(
          new URL((0, import_path_normalize.default)(this.base.href + path)),
          new Response(null, {
            headers: {
              "x-detail": JSON.stringify({
                type: "directory"
              })
            }
          })
        );
        return void 0;
      }
      async openDir(path) {
        if (!path)
          throw new this.error(1);
        path = path.replace(/\/$/, "");
        const fs = await this.loading;
        const dir = await fs.match(new URL((0, import_path_normalize.default)(this.base.href + path + "/")));
        if (!dir)
          throw new this.error(6);
        const detail = JSON.parse(dir.headers.get("x-detail") || "{}");
        if (detail.type != "directory")
          throw new this.error(7);
        return new this.directory(path);
      }
      async writeFile(path, content, details = {}) {
        if (!path)
          throw new this.error(1);
        if (!content)
          throw new this.error(2);
        if (path == "/")
          throw new this.error(0);
        path = path.replace(/\/$/, "");
        const fs = await this.loading;
        let contentType = "text/plain";
        if (Array.isArray(content)) {
          contentType = "application/json";
          content = new Blob([JSON.stringify(content)]);
        } else if (content.constructor == Object) {
          contentType = "application/json";
          content = new Blob([JSON.stringify(content)]);
        } else if (typeof content == "string") {
          contentType = "text/plain";
          content = new Blob([content]);
        }
        details.type = "file";
        await fs.put(
          new URL((0, import_path_normalize.default)(this.base.href + path)),
          new Response(content, {
            headers: {
              "x-detail": JSON.stringify(details),
              "content-length": content.size.toString(),
              "content-type": contentType
            }
          })
        );
        return void 0;
      }
      async readFile(path, encoding = null) {
        if (!path)
          throw new this.error(1);
        path = path.replace(/\/$/, "");
        const fs = await this.loading;
        if (await fs.match(new URL((0, import_path_normalize.default)(this.base.href + path)))) {
          return await fs.match(new URL((0, import_path_normalize.default)(this.base.href + path))).then((response) => encoding == "utf-8" ? response.text() : response.blob());
        } else {
          throw new this.error(5);
        }
      }
      async unlink(path) {
        if (!path)
          throw new this.error(1);
        path = path.replace(/\/$/, "");
        const fs = await this.loading;
        await fs.delete(new URL((0, import_path_normalize.default)(this.base.href + path)));
        return void 0;
      }
      async readdir(path) {
        if (!path)
          throw new this.error(1);
        path = path.replace(/\/$/, "");
        const fs = await this.loading;
        const dir = await fs.match(new URL((0, import_path_normalize.default)(this.base.href + path)));
        if (!dir)
          throw new this.error(6);
        const detail = JSON.parse(dir.headers.get("x-detail") || "{}");
        if (detail.type != "directory")
          throw new this.error(7);
        const opened = await fs.keys();
        const files = [];
        for (const file of opened) {
          if (file.url.startsWith(new URL((0, import_path_normalize.default)(this.base.href + path)).href)) {
            let relative = file.url.replace(new URL((0, import_path_normalize.default)(this.base.href + path)).href, "").replace(/^\//, "");
            if (!relative)
              continue;
            if (relative.split("/").length > 1)
              relative = relative.split("/")[0];
            if (files.includes(relative))
              continue;
            files.push(relative);
          }
        }
        return files;
      }
      async exists(path) {
        if (!path)
          throw new this.error(1);
        path = path.replace(/\/$/, "");
        try {
          this.stat(path);
          return true;
        } catch {
          return false;
        }
      }
      async stat(path) {
        if (!path)
          throw new this.error(1);
        path = path.replace(/\/$/, "");
        const fs = await this.loading;
        const file = await fs.match(new URL((0, import_path_normalize.default)(this.base.href + path)));
        if (!file)
          throw new this.error(5);
        const detail = JSON.parse(file.headers.get("x-detail") || "{}");
        return new EntryStat(detail, await file.blob());
      }
    };
    module2.exports = vfs;
  }
});

// public/xen/js/core/WindowManager.ts
var require_WindowManager = __commonJS({
  "public/xen/js/core/WindowManager.ts"(exports, module2) {
    "use strict";
    var WindowManager = class {
      windows = [];
      init = async () => {
      };
      getCloseSVG() {
        return `<svg style="width: 13px;height: 13px;" xmlns="http://www.w3.org/2000/svg" width="188" height="185" viewBox="0 0 188 185" fill="none">
      <rect width="188" height="185" rx="92.5" fill="#F46868"></rect>
    </svg>`;
      }
      getMiniSVG() {
        return `<svg style="width: 13px;height: 13px;" xmlns="http://www.w3.org/2000/svg" width="188" height="185" viewBox="0 0 188 185" fill="none">
      <rect width="188" height="185" rx="92.5" fill="#ffcd5b"></rect>
    </svg>`;
      }
      getFullSVG() {
        return `<svg style="width: 13px;height: 13px;" xmlns="http://www.w3.org/2000/svg" width="188" height="185" viewBox="0 0 188 185" fill="none">
      <rect width="188" height="185" rx="92.5" fill="rgb(64 190 64)"></rect>
    </svg>`;
      }
      createWindow = (title, content, id, x = 0, y = 0, width = 0, height = 0) => {
        const windowElement = document.createElement("div");
        windowElement.classList.add("drag", "box");
        windowElement.id = id;
        windowElement.style.left = `${x}px`;
        windowElement.style.top = `${y}px`;
        windowElement.style.width = `${width}px`;
        windowElement.style.height = `${height}px`;
        const titleBar = document.createElement("div");
        titleBar.classList.add("box-header");
        const titleLabel = document.createElement("div");
        titleLabel.classList.add("box-header-title");
        titleLabel.innerText = title;
        const minimizeButton = document.createElement("span");
        minimizeButton.classList.add("os-mini");
        minimizeButton.innerHTML = this.getMiniSVG();
        minimizeButton.addEventListener("click", () => {
          this.minimizeWindow(id);
        });
        const closeButton = document.createElement("span");
        closeButton.classList.add("os-exit");
        closeButton.innerHTML = this.getCloseSVG();
        closeButton.addEventListener("click", () => {
          window.xen.apps.close(id, windowElement);
        });
        const fullscreenButton = document.createElement("span");
        fullscreenButton.classList.add("os-full");
        fullscreenButton.innerHTML = this.getFullSVG();
        fullscreenButton.addEventListener("click", () => {
          this.fullscreen(id);
        });
        const innerBody = document.createElement("div");
        innerBody.classList.add("box-body-inner");
        innerBody.appendChild(content);
        titleBar.appendChild(titleLabel);
        titleLabel.appendChild(minimizeButton);
        titleLabel.appendChild(closeButton);
        titleLabel.appendChild(fullscreenButton);
        windowElement.append(
          titleBar,
          innerBody,
          ...["left", "top", "right", "bottom", "topLeft", "topRight", "bottomRight", "bottomLeft"].map((direction) => {
            const div = document.createElement("div");
            div.classList.add(direction.includes("top") ? "resize" : "dresize", direction + "Resize");
            return div;
          })
        );
        this.resizeListener(windowElement);
        document.getElementById("os-desktop")?.appendChild(windowElement);
        window.xen.wm.windows.push(windowElement);
        const drag = windowElement.querySelector(".box-header-title");
        drag?.addEventListener("mousedown", (e) => {
          const box = windowElement.getBoundingClientRect();
          const titleBox = titleBar.getBoundingClientRect();
          const offsetX = e.clientX - box.left;
          const offsetY = e.clientY - box.top;
          this.focus(id);
          if (document.querySelector(".os-mini")?.contains(e.target) || document.querySelector(".os-full")?.contains(e.target) || document.querySelector(".os-exit")?.contains(e.target))
            return false;
          if (windowElement.dataset.mini === "true")
            return false;
          document.querySelectorAll(".drag iframe").forEach((iframe) => {
            iframe.style.pointerEvents = "none";
          });
          const mouseMoveHandler = (e2) => {
            requestAnimationFrame(() => {
              let left = e2.clientX - offsetX;
              let top = e2.clientY - offsetY;
              if (e2.clientX < 0) {
                left = 0;
              }
              if (e2.clientY < 0) {
                top = 0;
              }
              if (left > window.innerWidth) {
                left = window.innerWidth - box.width;
              }
              if (top > window.innerHeight) {
                top = window.innerHeight - box.height;
              }
              windowElement.style.left = `${left}px`;
              windowElement.style.top = `${top}px`;
            });
          };
          const mouseUpHandler = (e2) => {
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
            let top = e2.clientY - offsetY;
            if (top + titleBox.height > window.innerHeight) {
              windowElement.style.top = `${window.innerHeight - titleBox.height}px`;
            }
            if (top < 0) {
              windowElement.style.top = `0px`;
            }
            windowElement.querySelectorAll("iframe").forEach((iframe) => {
              iframe.style.pointerEvents = "auto";
            });
          };
          document.addEventListener("mousemove", mouseMoveHandler);
          document.addEventListener("mouseup", mouseUpHandler);
        });
        return windowElement;
      };
      focus(id) {
        const elem = document.getElementById(id);
        if (!elem)
          return;
        const zIndex = Math.max(
          ...Array.from(document.querySelectorAll(".box")).map((e) => +(e.style.zIndex || 0))
        ) || 0;
        elem.style.zIndex = `${zIndex + 1}`;
      }
      resizeListener(master) {
        var left = master.querySelector(".leftResize"), right = master.querySelector(".rightResize"), top = master.querySelector(".topResize"), bottom = master.querySelector(".bottomResize");
        var topLeft = master.querySelector(".topLeftResize"), topRight = master.querySelector(".topRightResize"), bottomLeft = master.querySelector(".bottomLeftResize"), bottomRight = master.querySelector(".bottomRightResize");
        [left, right, top, bottom].forEach((side, index) => {
          var s = ["left", "right", "top", "bottom"][index];
          var startX;
          var startY;
          var computed;
          var startHeight;
          var startWidth;
          var startTop;
          var startLeft;
          var mousemove = function(e) {
            requestAnimationFrame(() => {
              if (s == "top") {
                var height = parseInt(startHeight.replace("px", "")) - (e.clientY - startY);
                master.style.height = (height > 70 ? height : 70) + "px";
                master.style.top = (height > 70 ? parseInt(startTop.replace("px", "")) + (e.clientY - startY) : "") + "px";
              } else if (s == "bottom") {
                var height = parseInt(startHeight.replace("px", "")) + (e.clientY - startY);
                master.style.height = (height > 70 ? height : 70) + "px";
                master.style.top = startTop;
              } else if (s == "left") {
                var width = parseInt(startWidth.replace("px", "")) - (e.clientX - startX);
                master.style.width = (width > 70 ? width : 70) + "px";
                master.style.left = (width > 70 ? parseInt(startLeft.replace("px", "")) + (e.clientX - startX) : "") + "px";
              } else if (s == "right") {
                var width = parseInt(startWidth.replace("px", "")) + (e.clientX - startX);
                master.style.width = (width > 70 ? width : 70) + "px";
                master.style.left = startLeft;
              }
            });
          };
          document.addEventListener("mousedown", function(e) {
            if (e.target !== side)
              return;
            computed = window.getComputedStyle(master);
            startHeight = computed.height + "";
            startWidth = computed.width + "";
            startTop = computed.top + "";
            startLeft = computed.left + "";
            startX = e.clientX;
            startY = e.clientY;
            master.style.transition = "0s";
            master.querySelectorAll("iframe").forEach(function(iframe) {
              iframe.style.pointerEvents = "none";
            });
            document.addEventListener("mousemove", mousemove);
          });
          document.addEventListener("mouseup", function(e) {
            if (!startX && !startY)
              return;
            master.style.transition = "";
            document.removeEventListener("mousemove", mousemove);
            master.querySelectorAll("iframe").forEach(function(iframe) {
              iframe.style.pointerEvents = "all";
            });
          });
        });
        [topLeft, topRight, bottomLeft, bottomRight].forEach((side, index) => {
          var s = ["topLeft", "topRight", "bottomLeft", "bottomRight"][index];
          var startX;
          var startY;
          var computed;
          var startHeight;
          var startWidth;
          var startTop;
          var startLeft;
          var mousemove = function(e) {
            requestAnimationFrame(() => {
              if (s == "topLeft") {
                var height = parseInt(startHeight.replace("px", "")) - (e.clientY - startY);
                var width = parseInt(startWidth.replace("px", "")) - (e.clientX - startX);
                master.style.height = (height > 70 ? height : 70) + "px";
                master.style.top = (height > 70 ? parseInt(startTop.replace("px", "")) + (e.clientY - startY) : "") + "px";
                master.style.width = (width > 70 ? width : 70) + "px";
                master.style.left = (width > 70 ? parseInt(startLeft.replace("px", "")) + (e.clientX - startX) : "") + "px";
              } else if (s == "topRight") {
                var height = parseInt(startHeight.replace("px", "")) - (e.clientY - startY);
                var width = parseInt(startWidth.replace("px", "")) + (e.clientX - startX);
                master.style.height = (height > 70 ? height : 70) + "px";
                master.style.top = (height > 70 ? parseInt(startTop.replace("px", "")) + (e.clientY - startY) : "") + "px";
                master.style.width = (width > 70 ? width : 70) + "px";
                master.style.left = startLeft;
              } else if (s == "bottomLeft") {
                var height = parseInt(startHeight.replace("px", "")) + (e.clientY - startY);
                var width = parseInt(startWidth.replace("px", "")) - (e.clientX - startX);
                master.style.height = (height > 70 ? height : 70) + "px";
                master.style.top = startTop;
                master.style.width = (width > 70 ? width : 70) + "px";
                master.style.left = (width > 70 ? parseInt(startLeft.replace("px", "")) + (e.clientX - startX) : "") + "px";
              } else if (s == "bottomRight") {
                var height = parseInt(startHeight.replace("px", "")) + (e.clientY - startY);
                var width = parseInt(startWidth.replace("px", "")) + (e.clientX - startX);
                master.style.height = (height > 70 ? height : 70) + "px";
                master.style.top = startTop;
                master.style.width = (width > 70 ? width : 70) + "px";
                master.style.left = startLeft;
              }
            });
          };
          document.addEventListener("mousedown", function(e) {
            if (e.target !== side)
              return;
            computed = window.getComputedStyle(master);
            startHeight = computed.height + "";
            startWidth = computed.width + "";
            startTop = computed.top + "";
            startLeft = computed.left + "";
            startX = e.clientX;
            startY = e.clientY;
            master.style.transition = "0s";
            master.querySelectorAll("iframe").forEach(function(iframe) {
              iframe.style.pointerEvents = "none";
            });
            document.addEventListener("mousemove", mousemove);
          });
          document.addEventListener("mouseup", function(e) {
            if (!startX && !startY)
              return;
            master.style.transition = "";
            document.removeEventListener("mousemove", mousemove);
            master.querySelectorAll("iframe").forEach(function(iframe) {
              iframe.style.pointerEvents = "all";
            });
          });
        });
      }
      minimizeWindow = (id) => {
        const windowElement = document.getElementById(id);
        if (!windowElement)
          return false;
        windowElement.style.transform = "scale(0.15)";
        windowElement.style.transition = "all 0.7s ease";
        windowElement.dataset.mini = "true";
        windowElement.querySelectorAll("*").forEach((element) => {
          element.style.pointerEvents = "none";
        });
        const bounds = windowElement.getBoundingClientRect();
        if (bounds.top > window.innerHeight - 310) {
          windowElement.style.top = window.innerHeight - 310 + "px";
        }
        if (bounds.top < -193) {
          windowElement.style.top = "-193px";
        }
        if (bounds.left < -275) {
          windowElement.style.left = "-275px";
        }
        if (bounds.left > window.innerWidth - 425) {
          windowElement.style.left = window.innerWidth - 425 + "px";
        }
        setTimeout(() => windowElement.style.transition = "", 700);
        const down = (e) => {
          if (e.which !== 1)
            return;
          let startX = e.clientX - e.target.offsetLeft;
          let startY = e.clientY - e.target.offsetTop;
          function move(event) {
            if (windowElement?.dataset.fullscreen === "true")
              return;
            let left = event.clientX - startX;
            let top = event.clientY - startY;
            if (top < -193)
              top = -193;
            if (left < -275)
              left = -275;
            if (left > window.innerWidth - 425)
              left = window.innerWidth - 425;
            if (top > window.innerHeight - 310)
              top = window.innerHeight - 310;
            requestAnimationFrame(() => {
              e.target.style.position = `absolute`;
              e.target.style.top = `${top}px`;
              e.target.style.left = `${left}px`;
            });
          }
          const up = (event) => {
            if (event.clientX === e.clientX && event.clientY === e.clientY) {
              windowElement.style.transform = "scale(1)";
              windowElement.dataset.mini = "false";
              windowElement.style.transition = "all 0.7s ease";
              windowElement.querySelectorAll("*").forEach((element) => {
                element.style.pointerEvents = "auto";
              });
              if (parseInt(windowElement.style.top.replace("px", "")) < 0)
                windowElement.style.top = "0";
              setTimeout(() => windowElement.style.transition = "", 700);
              windowElement.removeEventListener("mousedown", down);
            }
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
          };
          document.addEventListener("mouseup", up);
          document.addEventListener("mousemove", move);
        };
        windowElement.addEventListener("mousedown", down);
      };
      unminimize = async (id) => {
        const windowElement = document.getElementById(id);
        if (!windowElement)
          return false;
        windowElement.style.transform = "scale(1)";
        windowElement.dataset.mini = "false";
        windowElement.style.transition = "all 0.7s ease";
        windowElement.querySelectorAll("*").forEach((element) => {
          element.style.pointerEvents = "auto";
        });
        if (parseInt(windowElement.style.top.replace("px", "")) < 0)
          windowElement.style.top = "0";
        await new Promise((r) => setTimeout(r, 700));
        windowElement.style.transition = "";
        windowElement.removeEventListeners("mousedown");
        return true;
      };
      fullscreen = async (id) => {
        const windowElement = document.getElementById(id);
        if (!windowElement)
          return false;
        if (windowElement.dataset.mini === "true") {
          await this.unminimize(id);
        }
        windowElement.style.transition = "all 0.15s ease";
        if (windowElement.dataset.fullscreen === "true") {
          requestAnimationFrame(async () => {
            windowElement.style.width = windowElement.dataset.prevWidth || "";
            windowElement.style.height = windowElement.dataset.prevHeight || "";
            windowElement.style.top = windowElement.dataset.prevTop || "";
            windowElement.style.left = windowElement.dataset.prevLeft || "";
            windowElement.dataset.fullscreen = "false";
            await new Promise((r) => setTimeout(r, 150));
            windowElement.style.transition = "";
          });
          return window.xen.taskbar.show();
        }
        requestAnimationFrame(async () => {
          windowElement.dataset.prevWidth = windowElement.style.width;
          windowElement.dataset.prevHeight = windowElement.style.height;
          windowElement.style.width = "100vw";
          windowElement.style.height = "100vh";
          windowElement.dataset.prevTop = windowElement.style.top;
          windowElement.dataset.prevLeft = windowElement.style.left;
          windowElement.style.top = "0";
          windowElement.style.left = "0";
          window.xen.taskbar.hide();
          windowElement.dataset.fullscreen = "true";
          await new Promise((r) => setTimeout(r, 150));
          windowElement.style.transition = "";
        });
        return true;
      };
    };
    module2.exports = WindowManager;
  }
});

// node_modules/path-browserify/index.js
var require_path_browserify = __commonJS({
  "node_modules/path-browserify/index.js"(exports, module2) {
    "use strict";
    function assertPath(path) {
      if (typeof path !== "string") {
        throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
      }
    }
    function normalizeStringPosix(path, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path.length; ++i) {
        if (i < path.length)
          code = path.charCodeAt(i);
        else if (code === 47)
          break;
        else
          code = 47;
        if (code === 47) {
          if (lastSlash === i - 1 || dots === 1) {
          } else if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0)
                res += "/..";
              else
                res = "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0)
              res += "/" + path.slice(lastSlash + 1, i);
            else
              res = path.slice(lastSlash + 1, i);
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === 46 && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    function _format(sep, pathObject) {
      var dir = pathObject.dir || pathObject.root;
      var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep + base;
    }
    var posix = {
      // path.resolve([from ...], to)
      resolve: function resolve() {
        var resolvedPath = "";
        var resolvedAbsolute = false;
        var cwd;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path;
          if (i >= 0)
            path = arguments[i];
          else {
            if (cwd === void 0)
              cwd = process.cwd();
            path = cwd;
          }
          assertPath(path);
          if (path.length === 0) {
            continue;
          }
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = path.charCodeAt(0) === 47;
        }
        resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
        if (resolvedAbsolute) {
          if (resolvedPath.length > 0)
            return "/" + resolvedPath;
          else
            return "/";
        } else if (resolvedPath.length > 0) {
          return resolvedPath;
        } else {
          return ".";
        }
      },
      normalize: function normalize(path) {
        assertPath(path);
        if (path.length === 0)
          return ".";
        var isAbsolute = path.charCodeAt(0) === 47;
        var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
        path = normalizeStringPosix(path, !isAbsolute);
        if (path.length === 0 && !isAbsolute)
          path = ".";
        if (path.length > 0 && trailingSeparator)
          path += "/";
        if (isAbsolute)
          return "/" + path;
        return path;
      },
      isAbsolute: function isAbsolute(path) {
        assertPath(path);
        return path.length > 0 && path.charCodeAt(0) === 47;
      },
      join: function join() {
        if (arguments.length === 0)
          return ".";
        var joined;
        for (var i = 0; i < arguments.length; ++i) {
          var arg = arguments[i];
          assertPath(arg);
          if (arg.length > 0) {
            if (joined === void 0)
              joined = arg;
            else
              joined += "/" + arg;
          }
        }
        if (joined === void 0)
          return ".";
        return posix.normalize(joined);
      },
      relative: function relative(from, to) {
        assertPath(from);
        assertPath(to);
        if (from === to)
          return "";
        from = posix.resolve(from);
        to = posix.resolve(to);
        if (from === to)
          return "";
        var fromStart = 1;
        for (; fromStart < from.length; ++fromStart) {
          if (from.charCodeAt(fromStart) !== 47)
            break;
        }
        var fromEnd = from.length;
        var fromLen = fromEnd - fromStart;
        var toStart = 1;
        for (; toStart < to.length; ++toStart) {
          if (to.charCodeAt(toStart) !== 47)
            break;
        }
        var toEnd = to.length;
        var toLen = toEnd - toStart;
        var length = fromLen < toLen ? fromLen : toLen;
        var lastCommonSep = -1;
        var i = 0;
        for (; i <= length; ++i) {
          if (i === length) {
            if (toLen > length) {
              if (to.charCodeAt(toStart + i) === 47) {
                return to.slice(toStart + i + 1);
              } else if (i === 0) {
                return to.slice(toStart + i);
              }
            } else if (fromLen > length) {
              if (from.charCodeAt(fromStart + i) === 47) {
                lastCommonSep = i;
              } else if (i === 0) {
                lastCommonSep = 0;
              }
            }
            break;
          }
          var fromCode = from.charCodeAt(fromStart + i);
          var toCode = to.charCodeAt(toStart + i);
          if (fromCode !== toCode)
            break;
          else if (fromCode === 47)
            lastCommonSep = i;
        }
        var out = "";
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
          if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0)
              out += "..";
            else
              out += "/..";
          }
        }
        if (out.length > 0)
          return out + to.slice(toStart + lastCommonSep);
        else {
          toStart += lastCommonSep;
          if (to.charCodeAt(toStart) === 47)
            ++toStart;
          return to.slice(toStart);
        }
      },
      _makeLong: function _makeLong(path) {
        return path;
      },
      dirname: function dirname(path) {
        assertPath(path);
        if (path.length === 0)
          return ".";
        var code = path.charCodeAt(0);
        var hasRoot = code === 47;
        var end = -1;
        var matchedSlash = true;
        for (var i = path.length - 1; i >= 1; --i) {
          code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              end = i;
              break;
            }
          } else {
            matchedSlash = false;
          }
        }
        if (end === -1)
          return hasRoot ? "/" : ".";
        if (hasRoot && end === 1)
          return "//";
        return path.slice(0, end);
      },
      basename: function basename(path, ext) {
        if (ext !== void 0 && typeof ext !== "string")
          throw new TypeError('"ext" argument must be a string');
        assertPath(path);
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
          if (ext.length === path.length && ext === path)
            return "";
          var extIdx = ext.length - 1;
          var firstNonSlashEnd = -1;
          for (i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else {
              if (firstNonSlashEnd === -1) {
                matchedSlash = false;
                firstNonSlashEnd = i + 1;
              }
              if (extIdx >= 0) {
                if (code === ext.charCodeAt(extIdx)) {
                  if (--extIdx === -1) {
                    end = i;
                  }
                } else {
                  extIdx = -1;
                  end = firstNonSlashEnd;
                }
              }
            }
          }
          if (start === end)
            end = firstNonSlashEnd;
          else if (end === -1)
            end = path.length;
          return path.slice(start, end);
        } else {
          for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
          }
          if (end === -1)
            return "";
          return path.slice(start, end);
        }
      },
      extname: function extname(path) {
        assertPath(path);
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var preDotState = 0;
        for (var i = path.length - 1; i >= 0; --i) {
          var code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          return "";
        }
        return path.slice(startDot, end);
      },
      format: function format(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") {
          throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
        }
        return _format("/", pathObject);
      },
      parse: function parse(path) {
        assertPath(path);
        var ret = { root: "", dir: "", base: "", ext: "", name: "" };
        if (path.length === 0)
          return ret;
        var code = path.charCodeAt(0);
        var isAbsolute = code === 47;
        var start;
        if (isAbsolute) {
          ret.root = "/";
          start = 1;
        } else {
          start = 0;
        }
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var i = path.length - 1;
        var preDotState = 0;
        for (; i >= start; --i) {
          code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          if (end !== -1) {
            if (startPart === 0 && isAbsolute)
              ret.base = ret.name = path.slice(1, end);
            else
              ret.base = ret.name = path.slice(startPart, end);
          }
        } else {
          if (startPart === 0 && isAbsolute) {
            ret.name = path.slice(1, startDot);
            ret.base = path.slice(1, end);
          } else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
          }
          ret.ext = path.slice(startDot, end);
        }
        if (startPart > 0)
          ret.dir = path.slice(0, startPart - 1);
        else if (isAbsolute)
          ret.dir = "/";
        return ret;
      },
      sep: "/",
      delimiter: ":",
      win32: null,
      posix: null
    };
    posix.posix = posix;
    module2.exports = posix;
  }
});

// public/xen/js/core/Loader.ts
var require_Loader = __commonJS({
  "public/xen/js/core/Loader.ts"(exports, module2) {
    "use strict";
    var { join } = require_path_browserify();
    var ModuleLoader = class {
      load(module3) {
        return import(join(
          "../js",
          module3
        )).then((imported) => {
          return imported.default.init();
        });
      }
      async init(...modules) {
        await Promise.allSettled(
          modules.map((module3) => this.load(module3))
        );
        return true;
      }
    };
    module2.exports = ModuleLoader;
  }
});

// node_modules/js-cookie/dist/js.cookie.js
var require_js_cookie = __commonJS({
  "node_modules/js-cookie/dist/js.cookie.js"(exports, module2) {
    (function(global, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, function() {
        var current = global.Cookies;
        var exports2 = global.Cookies = factory();
        exports2.noConflict = function() {
          global.Cookies = current;
          return exports2;
        };
      }());
    })(exports, function() {
      "use strict";
      function assign(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            target[key] = source[key];
          }
        }
        return target;
      }
      var defaultConverter = {
        read: function(value) {
          if (value[0] === '"') {
            value = value.slice(1, -1);
          }
          return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
        },
        write: function(value) {
          return encodeURIComponent(value).replace(
            /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
            decodeURIComponent
          );
        }
      };
      function init(converter, defaultAttributes) {
        function set(name, value, attributes) {
          if (typeof document === "undefined") {
            return;
          }
          attributes = assign({}, defaultAttributes, attributes);
          if (typeof attributes.expires === "number") {
            attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
          }
          if (attributes.expires) {
            attributes.expires = attributes.expires.toUTCString();
          }
          name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
          var stringifiedAttributes = "";
          for (var attributeName in attributes) {
            if (!attributes[attributeName]) {
              continue;
            }
            stringifiedAttributes += "; " + attributeName;
            if (attributes[attributeName] === true) {
              continue;
            }
            stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
          }
          return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
        }
        function get(name) {
          if (typeof document === "undefined" || arguments.length && !name) {
            return;
          }
          var cookies = document.cookie ? document.cookie.split("; ") : [];
          var jar = {};
          for (var i = 0; i < cookies.length; i++) {
            var parts = cookies[i].split("=");
            var value = parts.slice(1).join("=");
            try {
              var found = decodeURIComponent(parts[0]);
              jar[found] = converter.read(value, found);
              if (name === found) {
                break;
              }
            } catch (e) {
            }
          }
          return name ? jar[name] : jar;
        }
        return Object.create(
          {
            set,
            get,
            remove: function(name, attributes) {
              set(
                name,
                "",
                assign({}, attributes, {
                  expires: -1
                })
              );
            },
            withAttributes: function(attributes) {
              return init(this.converter, assign({}, this.attributes, attributes));
            },
            withConverter: function(converter2) {
              return init(assign({}, this.converter, converter2), this.attributes);
            }
          },
          {
            attributes: { value: Object.freeze(defaultAttributes) },
            converter: { value: Object.freeze(converter) }
          }
        );
      }
      var api = init(defaultConverter, { path: "/" });
      return api;
    });
  }
});

// public/xen/js/core/Xen.ts
var require_Xen = __commonJS({
  "public/xen/js/core/Xen.ts"(exports, module2) {
    "use strict";
    var fs = require_FileSystem();
    var wm = require_WindowManager();
    var loader = require_Loader();
    var cookie = require_js_cookie();
    window.path = require_path_browserify();
    var Xen2 = class {
      fs = new fs();
      wm = new wm();
      loader = new loader();
      taskbar;
      battery;
      apps;
      async startup() {
        await this.fs.loading;
        await this.wm.init();
        window.EventTarget.prototype.addEventListener = new Proxy(window.EventTarget.prototype.addEventListener, {
          apply: (target, thisArg, args) => {
            if (!thisArg.eventListeners)
              thisArg.eventListeners = [];
            thisArg.eventListeners.push({
              type: args[0],
              listener: args[1],
              options: args[2] || {}
            });
            return Reflect.apply(target, thisArg, args);
          }
        });
        window.EventTarget.prototype.removeEventListeners = function(event) {
          if (!this.eventListeners)
            return;
          for (const listener of this.eventListeners.filter(([type, listener2, options]) => type === event)) {
            this.removeEventListener(listener.type, listener.listener, listener.options);
          }
        };
        if (cookie.get("fs-initiated") !== "true") {
          await this.stupFileSystem();
          cookie.set(
            "fs-initiated",
            "true",
            {
              expires: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 365 * 10),
              secure: true,
              sameSite: "strict"
            }
          );
        }
        await this.loader.init(
          "components/apps.js",
          "components/taskbar.js",
          "components/battery.js",
          "components/cursor.js"
        );
        return true;
      }
      async stupFileSystem() {
        const vfs = this.fs;
        await vfs.mkdir("/xen");
        await vfs.mkdir("/xen/system");
        await vfs.mkdir("/xen/users");
        await vfs.mkdir("/xen/users/guest");
        await vfs.mkdir("/xen/users/guest/desktop");
        await vfs.mkdir("/xen/users/guest/documents");
        await vfs.mkdir("/xen/users/guest/downloads");
        await vfs.mkdir("/xen/users/guest/music");
        await vfs.mkdir("/xen/users/guest/pictures");
        await vfs.mkdir("/xen/users/guest/videos");
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
          }
        ]);
        await vfs.mkdir("/xen/system/apps");
        await vfs.writeFile("/xen/system/apps/installed.json", []);
        return true;
      }
      hideLoader() {
        const loader2 = document.getElementById("os-pre");
        if (!loader2)
          return;
        loader2.animate(
          [
            {
              opacity: 1
            },
            {
              opacity: 0
            }
          ],
          {
            duration: 500,
            easing: "ease-in-out"
          }
        );
        setTimeout(() => {
          loader2.style.display = "none";
        }, 500);
      }
    };
    module2.exports = Xen2;
  }
});

// public/xen/js/entry.js
var Xen = require_Xen();
window.xen = new Xen();
window.xen.startup().then(() => {
  console.log(
    "%cWelcome to XenOS",
    "color:black; background-color:white; padding:5px; border-radius: 5px; line-height: 26px; font-size:30px;"
  );
  window.xen.hideLoader();
});
/*! Bundled license information:

js-cookie/dist/js.cookie.js:
  (*! js-cookie v3.0.5 | MIT *)
*/
