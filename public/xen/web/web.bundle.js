var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) =>
  function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res;
  };
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod,
  )
);

// node_modules/path-normalize/lib/index.js
var require_lib = __commonJS({
  "node_modules/path-normalize/lib/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    exports["default"] = void 0;
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return (
        (_typeof =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (obj2) {
                return typeof obj2;
              }
            : function (obj2) {
                return obj2 &&
                  "function" == typeof Symbol &&
                  obj2.constructor === Symbol &&
                  obj2 !== Symbol.prototype
                  ? "symbol"
                  : typeof obj2;
              }),
        _typeof(obj)
      );
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
            if (
              res.length < 2 ||
              lastSegmentLength !== 2 ||
              res.charCodeAt(res.length - 1) !== DOT ||
              res.charCodeAt(res.length - 2) !== DOT
            ) {
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
    var normalize2 = function normalize3(p) {
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
    var _default = normalize2;
    exports["default"] = _default;
    module.exports = exports.default;
  },
});

// node_modules/@lukeed/uuid/dist/index.mjs
function v4() {
  var i = 0,
    num,
    out = "";
  if (!BUFFER || IDX + 16 > 256) {
    BUFFER = Array((i = 256));
    while (i--) BUFFER[i] = (256 * Math.random()) | 0;
    i = IDX = 0;
  }
  for (; i < 16; i++) {
    num = BUFFER[IDX + i];
    if (i == 6) out += HEX[(num & 15) | 64];
    else if (i == 8) out += HEX[(num & 63) | 128];
    else out += HEX[num];
    if (i & 1 && i > 1 && i < 11) out += "-";
  }
  IDX++;
  return out;
}
var IDX, HEX, BUFFER;
var init_dist = __esm({
  "node_modules/@lukeed/uuid/dist/index.mjs"() {
    IDX = 256;
    HEX = [];
    while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);
  },
});

// public/xen/js/core/windows.js
var windows_exports = {};
__export(windows_exports, {
  default: () => windows_default,
});
var Window, windows_default;
var init_windows = __esm({
  "public/xen/js/core/windows.js"() {
    "use strict";
    init_dist();
    Window = class {
      constructor(details) {
        Object.entries(
          Object.assign(details, {
            name: "Unknown",
            icon: void 0,
            width: 500,
            height: 400,
            x: 0,
            y: 0,
          }),
        ).forEach(([name, value]) => (this[name] = value));
        this.id = this.createID();
        this.containers = this.initializeContainer();
        this.iframe = this.initializeFrame();
        this.containers[1].appendChild(this.iframe);
        console.log(this.containers);
      }
      createID() {
        return v4();
      }
      createElement(tag, classList, id) {
        const el = document.createElement(tag);
        el.classList.add(...classList);
        el.id = id;
        return el;
      }
      initializeContainer() {
        const el = this.createElement(
          "div",
          ["xen-window-container", this.id],
          this.id,
        );
        const content = this.createElement(
          "div",
          ["xen-window-content", this.id],
          "",
        );
        const controls = this.createElement(
          "div",
          ["xen-window-controls", this.id],
          "",
        );
        const maximize = this.createElement(
          "span",
          ["xen-window-maximize", this.id],
          "",
        );
        const minimize = this.createElement(
          "span",
          ["xen-window-minimize", this.id],
          "",
        );
        const close = this.createElement(
          "span",
          ["xen-window-close", this.id],
          "",
        );
        controls.append(maximize, minimize, close);
        el.appendChild(controls);
        el.appendChild(content);
        return [el, content];
      }
      initializeFrame() {
        const el = this.createElement(
          "iframe",
          ["xen-window-frame", this.id],
          "",
        );
        el.style.background = "black";
        return el;
      }
    };
    windows_default = new (class WindowComponent {
      constructor() {
        window.xen.constructor.prototype.WindowComponent = this.constructor;
        window.xen.windows = this;
      }
      register(
        cfg = {
          name: "Unknown",
          icon: void 0,
          width: 500,
          height: 400,
          x: 0,
          y: 0,
          element: null,
        },
      ) {
        return new Window(cfg, cfg.element);
      }
    })();
  },
});

// public/xen/js/core/apps.js
var apps_exports = {};
__export(apps_exports, {
  default: () => apps_default,
});
var apps_default;
var init_apps = __esm({
  "public/xen/js/core/apps.js"() {
    "use strict";
    apps_default = new (class AppsComponent {
      builtins = ["Xen/welcome", "Xen/settings", "Xen/store"];
      constructor() {
        window.xen.constructor.prototype.AppsComponent = this.constructor;
        window.xen.apps = this;
      }
      async install(pkg) {
        if (!this.builtins.includes(pkg)) {
          return;
        }
      }
      async getInstalledApps() {
        return await fetch("/~xen/apps/installed.json").then((res) =>
          res.json(),
        );
      }
      async startup() {
        await xen.wait(1e3);
        return true;
      }
    })();
  },
});

// public/xen/js/core/battery.js
var battery_exports = {};
var bar, bound, data;
var init_battery = __esm({
  async "public/xen/js/core/battery.js"() {
    "use strict";
    bar = document.getElementById("os-battery-bar");
    bound = 215;
    data = await window.xen.battery;
    bar.style.width = `${(data.level * bound).toFixed(0)}px`;
    data.addEventListener("levelchange", async function (event) {
      bar.style.width = `${(data.level * bound).toFixed(0)}px`;
    });
  },
});

// public/xen/js/core/weather.js
var weather_exports = {};
async function getWeather(lat, lon, timezone) {
  return await fetch(
    `https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&latitude=${lat}&longitude=${lon}&timezone=${timezone}  `,
    {},
  )
    .then((res) => res.json())
    .then((data3) => {
      return {
        current: parseCurrentWeather(data3),
        daily: parseDailyWeather(data3),
        hourly: parseHourlyWeather(data3),
      };
    });
}
function parseCurrentWeather({ current_weather, daily }) {
  const {
    temperature: currentTemp,
    windspeed: windSpeed,
    weathercode: iconCode,
  } = current_weather;
  const {
    temperature_2m_max: [maxTemp],
    temperature_2m_min: [minTemp],
    apparent_temperature_max: [maxFeelsLike],
    apparent_temperature_min: [minFeelsLike],
    precipitation_sum: [precip],
  } = daily;
  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(maxTemp),
    lowTemp: Math.round(minTemp),
    highFeelsLike: Math.round(maxFeelsLike),
    lowFeelsLike: Math.round(minFeelsLike),
    windSpeed: Math.round(windSpeed),
    precip: Math.round(precip * 100) / 100,
    iconCode,
  };
}
function parseDailyWeather({ daily }) {
  return daily.time.map((time, index) => {
    return {
      timestamp: time * 1e3,
      iconCode: daily.weathercode[index],
      maxTemp: Math.round(daily.temperature_2m_max[index]),
    };
  });
}
function parseHourlyWeather({ hourly, current_weather }) {
  return hourly.time
    .map((time, index) => {
      return {
        timestamp: time * 1e3,
        iconCode: hourly.weathercode[index],
        temp: Math.round(hourly.temperature_2m[index]),
        feelsLike: Math.round(hourly.apparent_temperature[index]),
        windSpeed: Math.round(hourly.windspeed_10m[index]),
        precip: Math.round(hourly.precipitation[index] * 100) / 100,
      };
    })
    .filter(({ timestamp }) => timestamp >= current_weather.time * 1e3);
}
var api, data2, weather;
var init_weather = __esm({
  async "public/xen/js/core/weather.js"() {
    "use strict";
    api = "/ipapi";
    data2 = await fetch(api).then((res) => res.json());
    weather = await getWeather(
      data2.lat,
      data2.lon,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    );
    console.log(weather);
  },
});

// public/xen/js/components.js
var components_exports = {};
__export(components_exports, {
  default: () => components_default,
});
var components_default;
var init_components = __esm({
  "public/xen/js/components.js"() {
    "use strict";
    components_default = Promise.allSettled([
      console.log("Loading Modules"),
      Promise.resolve()
        .then(() => (init_windows(), windows_exports))
        .then(
          (module) => (
            console.debug("Loaded Windows Component"), module.default
          ),
        ),
      Promise.resolve()
        .then(() => (init_apps(), apps_exports))
        .then(
          (module) => (console.debug("Loaded Apps Component"), module.default),
        ),
      init_battery()
        .then(() => battery_exports)
        .then(
          (module) => (
            console.debug("Loaded Battery Component"), module.default
          ),
        ),
      init_weather()
        .then(() => weather_exports)
        .then(
          (module) => (
            console.debug("Loaded Weather Component"), module.default
          ),
        ),
    ]);
  },
});

// public/xen/js/startup.js
var startup_exports = {};
__export(startup_exports, {
  default: () => startup_default,
});
var startup_default;
var init_startup = __esm({
  "public/xen/js/startup.js"() {
    "use strict";
    startup_default = new (class Startup {
      pre = document.getElementById("os-pre");
      comm = document.getElementById("os-pre-text2");
      constructor() {
        window.xen.startup.then(async (timing) => {
          this.pre.style.transition = "0.4s ease";
          this.pre.style.opacity = "0";
          await window.xen.wait(400);
          this.pre.style.display = "none";
        });
      }
    })();
  },
});

// public/xen/js/vfs.js
var import_path_normalize = __toESM(require_lib());
var vfs = class _vfs {
  normalize = import_path_normalize.default;
  constructor(path) {
    this.base = new URL(
      (0, import_path_normalize.default)(
        location.origin + (path || "").replace(/\/?$/, "/"),
      ),
    );
  }
  error = class VFSError extends Error {
    constructor(type) {
      var types = [
        /* Path Error */
        "Invalid Path: /",
        /* Missing Path */
        "Missing Required Argument: path",
        /* Missing Content */
        "Missing Required Argument: content",
      ];
      return super(types[type]);
    }
  };
  directory = class directory extends _vfs {
    constructor() {
      return super(...arguments);
    }
  };
  get loading() {
    return caches.open("vfs");
  }
  async openDir(path) {
    return new this.directory(path);
  }
  async writeFile(path, content, details = {}) {
    if (path == "/") throw new this.error(0);
    if (!path) throw new this.error(1);
    if (!content) throw new this.error(2);
    const fs = await this.loading;
    await fs.put(
      new URL((0, import_path_normalize.default)(this.base.href + path)),
      new Response(content, {
        headers: {
          "x-detail": JSON.stringify(details),
        },
      }),
    );
    return void 0;
  }
  async readFile(path) {
    if (!path) throw new this.error(1);
    const fs = await this.loading;
    return await fs.match(
      new URL((0, import_path_normalize.default)(this.base.href + path)),
    );
  }
  async unlink(path) {
    if (!path) throw new this.error(1);
    const fs = await this.loading;
    await fs.delete(
      new URL((0, import_path_normalize.default)(this.base.href + path)),
    );
    return void 0;
  }
};
var vfs_default = vfs;

// public/xen/js/system.js
var Xen = class {
  wait(ms) {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve();
      }, ms);
    });
  }
  constructor(...modules) {
    console.log("XEN: Startup");
    this.fs = new vfs_default("/");
    this.startup = new Promise(async (resolve) => {
      const comm = document.getElementById("os-pre-text2");
      while (document.readyState !== "complete") {
        console.log(
          document.querySelectorAll(
            "script[src]:not([data-loaded]), img[src]:not([data-loaded])",
          ),
        );
        await Promise.allSettled(
          [
            ...document.querySelectorAll(
              "script[src]:not([data-loaded]), img[src]:not([data-loaded])",
            ),
          ].map((node) => {
            return new Promise(
              (load, fail) =>
                (node.complete && (load(), true)) ||
                node.addEventListener("load", load) ||
                setTimeout(fail, 5e3),
            )
              .then(() => (node.dataset.loaded = "true"))
              .catch((err) => {
                console.log(node);
                throw err;
              });
          }),
        );
        await this.wait(10);
      }
      comm.innerText = "Initializing Components";
      for (var module of modules) {
        await this.load(module);
        console.debug("Loaded Module", module);
        continue;
      }
      comm.innerText = "Downloading apps and content";
      await window.xen.apps.startup();
      comm.innerText = ":D";
      resolve(xen);
    });
  }
  get battery() {
    return navigator.getBattery();
  }
  async load(Module) {
    return await Module.then((module) => module.default);
  }
};

// public/xen/js/entry.js
window.xen = new Xen(
  Promise.resolve().then(() => (init_components(), components_exports)),
  Promise.resolve().then(() => (init_startup(), startup_exports)),
);
