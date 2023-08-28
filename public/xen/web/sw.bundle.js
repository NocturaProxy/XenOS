"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/path-normalize/lib/index.js
var require_lib = __commonJS({
  "node_modules/path-normalize/lib/index.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2["default"] = void 0;
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
    var assertPath = function assertPath2(path2) {
      var t = _typeof(path2);
      if (t !== "string") {
        throw new TypeError("Expected a string, got a ".concat(t));
      }
    };
    var posixNormalize = function posixNormalize2(path2, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path2.length; ++i) {
        if (i < path2.length) {
          code = path2.charCodeAt(i);
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
              res += "/" + path2.slice(lastSlash + 1, i);
            } else {
              res = path2.slice(lastSlash + 1, i);
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
      var path2 = p;
      if (path2.length === 0) {
        return ".";
      }
      var isAbsolute = path2.charCodeAt(0) === SLASH;
      var trailingSeparator = path2.charCodeAt(path2.length - 1) === SLASH;
      path2 = decode(path2);
      path2 = posixNormalize(path2, !isAbsolute);
      if (path2.length === 0 && !isAbsolute) {
        path2 = ".";
      }
      if (path2.length > 0 && trailingSeparator) {
        path2 += "/";
      }
      if (isAbsolute) {
        return "/" + path2;
      }
      return path2;
    };
    var _default = normalize;
    exports2["default"] = _default;
    module2.exports = exports2.default;
  }
});

// node_modules/path-browserify/index.js
var require_path_browserify = __commonJS({
  "node_modules/path-browserify/index.js"(exports2, module2) {
    "use strict";
    function assertPath(path2) {
      if (typeof path2 !== "string") {
        throw new TypeError("Path must be a string. Received " + JSON.stringify(path2));
      }
    }
    function normalizeStringPosix(path2, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path2.length; ++i) {
        if (i < path2.length)
          code = path2.charCodeAt(i);
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
              res += "/" + path2.slice(lastSlash + 1, i);
            else
              res = path2.slice(lastSlash + 1, i);
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
          var path2;
          if (i >= 0)
            path2 = arguments[i];
          else {
            if (cwd === void 0)
              cwd = process.cwd();
            path2 = cwd;
          }
          assertPath(path2);
          if (path2.length === 0) {
            continue;
          }
          resolvedPath = path2 + "/" + resolvedPath;
          resolvedAbsolute = path2.charCodeAt(0) === 47;
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
      normalize: function normalize(path2) {
        assertPath(path2);
        if (path2.length === 0)
          return ".";
        var isAbsolute = path2.charCodeAt(0) === 47;
        var trailingSeparator = path2.charCodeAt(path2.length - 1) === 47;
        path2 = normalizeStringPosix(path2, !isAbsolute);
        if (path2.length === 0 && !isAbsolute)
          path2 = ".";
        if (path2.length > 0 && trailingSeparator)
          path2 += "/";
        if (isAbsolute)
          return "/" + path2;
        return path2;
      },
      isAbsolute: function isAbsolute(path2) {
        assertPath(path2);
        return path2.length > 0 && path2.charCodeAt(0) === 47;
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
      _makeLong: function _makeLong(path2) {
        return path2;
      },
      dirname: function dirname(path2) {
        assertPath(path2);
        if (path2.length === 0)
          return ".";
        var code = path2.charCodeAt(0);
        var hasRoot = code === 47;
        var end = -1;
        var matchedSlash = true;
        for (var i = path2.length - 1; i >= 1; --i) {
          code = path2.charCodeAt(i);
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
        return path2.slice(0, end);
      },
      basename: function basename(path2, ext) {
        if (ext !== void 0 && typeof ext !== "string")
          throw new TypeError('"ext" argument must be a string');
        assertPath(path2);
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        if (ext !== void 0 && ext.length > 0 && ext.length <= path2.length) {
          if (ext.length === path2.length && ext === path2)
            return "";
          var extIdx = ext.length - 1;
          var firstNonSlashEnd = -1;
          for (i = path2.length - 1; i >= 0; --i) {
            var code = path2.charCodeAt(i);
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
            end = path2.length;
          return path2.slice(start, end);
        } else {
          for (i = path2.length - 1; i >= 0; --i) {
            if (path2.charCodeAt(i) === 47) {
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
          return path2.slice(start, end);
        }
      },
      extname: function extname2(path2) {
        assertPath(path2);
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var preDotState = 0;
        for (var i = path2.length - 1; i >= 0; --i) {
          var code = path2.charCodeAt(i);
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
        return path2.slice(startDot, end);
      },
      format: function format(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") {
          throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
        }
        return _format("/", pathObject);
      },
      parse: function parse(path2) {
        assertPath(path2);
        var ret = { root: "", dir: "", base: "", ext: "", name: "" };
        if (path2.length === 0)
          return ret;
        var code = path2.charCodeAt(0);
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
        var i = path2.length - 1;
        var preDotState = 0;
        for (; i >= start; --i) {
          code = path2.charCodeAt(i);
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
              ret.base = ret.name = path2.slice(1, end);
            else
              ret.base = ret.name = path2.slice(startPart, end);
          }
        } else {
          if (startPart === 0 && isAbsolute) {
            ret.name = path2.slice(1, startDot);
            ret.base = path2.slice(1, end);
          } else {
            ret.name = path2.slice(startPart, startDot);
            ret.base = path2.slice(startPart, end);
          }
          ret.ext = path2.slice(startDot, end);
        }
        if (startPart > 0)
          ret.dir = path2.slice(0, startPart - 1);
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

// public/xen/js/core/FileSystem.ts
var require_FileSystem = __commonJS({
  "public/xen/js/core/FileSystem.ts"(exports2, module2) {
    "use strict";
    var import_path_normalize = __toESM(require_lib());
    var import_path_browserify2 = __toESM(require_path_browserify());
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
      constructor(path2 = "") {
        this.base = new URL(
          (0, import_path_normalize.default)(location.origin + (path2 || "").replace(/\/?$/, "/"))
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
            "Not A File",
            /* 9: Directory Path Nonexistent */
            "Directory Path Nonexistent"
          ];
          super(types[type]);
        }
      };
      directory = class directory extends _vfs {
        constructor(path2 = "", parent = new _vfs()) {
          super(path2);
          this.parent = parent;
        }
      };
      get loading() {
        return caches.open("vfs").then(async (cache) => {
          if (!await cache.match(new URL(location.origin + "/")))
            await cache.put(new URL(location.origin + "/"), new Response(null, {
              headers: {
                "x-detail": JSON.stringify({
                  type: "directory"
                })
              }
            }));
          return cache;
        });
      }
      parent;
      async mkdir(path2) {
        if (!path2)
          throw new this.error(1);
        path2 = path2.replace(/\/$/, "");
        const fs2 = await this.loading;
        var relURL = new URL((0, import_path_normalize.default)(this.base.href + path2)).pathname;
        var build = "/";
        for await (var segment of relURL.split("/")) {
          if (!segment)
            continue;
          build += segment;
          if (build == "/")
            continue;
          if (build == path2)
            continue;
          if (!await this.exists(build))
            await (this.parent || this).mkdir(build);
          build += "/";
        }
        await fs2.put(
          new URL((0, import_path_normalize.default)(this.base.href + path2)),
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
      async openDir(path2) {
        if (!path2)
          throw new this.error(1);
        path2 = path2.replace(/\/$/, "");
        const fs2 = await this.loading;
        const dir = await fs2.match(new URL((0, import_path_normalize.default)(this.base.href + path2)));
        if (!dir)
          throw new this.error(6);
        const detail = JSON.parse(dir.headers.get("x-detail") || "{}");
        if (detail.type != "directory")
          throw new this.error(7);
        path2 = new URL((0, import_path_normalize.default)(this.base.href + path2)).pathname;
        return new this.directory(path2);
      }
      async writeFile(path2, content, details = {}) {
        if (!path2)
          throw new this.error(1);
        if (typeof content == "undefined")
          throw new this.error(2);
        if (path2 == "/")
          throw new this.error(0);
        path2 = path2.replace(/\/$/, "");
        if (!await this.exists(import_path_browserify2.default.dirname(path2)))
          await this.mkdir(import_path_browserify2.default.dirname(path2));
        const fs2 = await this.loading;
        let contentType2 = "text/plain";
        if (Array.isArray(content)) {
          contentType2 = "application/json";
          content = new Blob([JSON.stringify(content)]);
        } else if (content.constructor == Object) {
          contentType2 = "application/json";
          content = new Blob([JSON.stringify(content)]);
        } else if (typeof content == "string") {
          contentType2 = "text/plain";
          content = new Blob([content]);
        } else if (typeof content == "number") {
          contentType2 = "text/plain";
          content = new Blob([`${content}`]);
        }
        details.type = "file";
        await fs2.put(
          new URL((0, import_path_normalize.default)(this.base.href + path2)),
          new Response(content, {
            headers: {
              "x-detail": JSON.stringify(details),
              "content-length": content.size.toString(),
              "content-type": contentType2
            }
          })
        );
        return void 0;
      }
      async readFile(path2, encoding = null) {
        if (!path2)
          throw new this.error(1);
        path2 = path2.replace(/\/$/, "");
        const fs2 = await this.loading;
        if (await fs2.match(new URL((0, import_path_normalize.default)(this.base.href + path2)))) {
          return await fs2.match(new URL((0, import_path_normalize.default)(this.base.href + path2))).then(
            (response) => encoding == "utf-8" ? response.text() : response.blob()
          );
        } else {
          throw new this.error(5);
        }
      }
      async unlink(path2) {
        if (!path2)
          throw new this.error(1);
        path2 = path2.replace(/\/$/, "");
        const fs2 = await this.loading;
        await fs2.delete(new URL((0, import_path_normalize.default)(this.base.href + path2)));
        return void 0;
      }
      async readdir(path2) {
        if (!path2)
          throw new this.error(1);
        path2 = path2.replace(/\/$/, "");
        const fs2 = await this.loading;
        const dir = await fs2.match(new URL((0, import_path_normalize.default)(this.base.href + path2)));
        if (!dir)
          throw new this.error(6);
        const detail = JSON.parse(dir.headers.get("x-detail") || "{}");
        if (detail.type != "directory")
          throw new this.error(7);
        const opened = await fs2.keys();
        const files = [];
        for (const file of opened) {
          if (file.url.startsWith(new URL((0, import_path_normalize.default)(this.base.href + path2)).href)) {
            let relative = file.url.replace(new URL((0, import_path_normalize.default)(this.base.href + path2)).href, "").replace(/^\//, "");
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
      async exists(path2) {
        if (!path2)
          throw new this.error(1);
        path2 = path2.replace(/\/$/, "");
        try {
          await this.stat(path2);
          return true;
        } catch {
          return false;
        }
      }
      async stat(path2) {
        if (!path2)
          throw new this.error(1);
        path2 = path2.replace(/\/$/, "");
        const fs2 = await this.loading;
        const file = await fs2.match(new URL((0, import_path_normalize.default)(this.base.href + path2)));
        if (!file)
          throw new this.error(5);
        const detail = JSON.parse(file.headers.get("x-detail") || "{}");
        return new EntryStat(detail, await file.blob());
      }
    };
    module2.exports = vfs;
  }
});

// node_modules/@dynamic-pkg/mime/index.js
var mime_exports = {};
__export(mime_exports, {
  default: () => mime_default
});
function charset(e) {
  if (!e || "string" != typeof e)
    return false;
  var s = EXTRACT_TYPE_REGEXP.exec(e), a = s && db[s[1].toLowerCase()];
  return a && a.charset ? a.charset : !(!s || !TEXT_TYPE_REGEXP.test(s[1])) && "UTF-8";
}
function contentType(e) {
  if (!e || "string" != typeof e)
    return false;
  var s = -1 === e.indexOf("/") ? exports.lookup(e) : e;
  if (!s)
    return false;
  if (-1 === s.indexOf("charset")) {
    var a = exports.charset(s);
    a && (s += "; charset=" + a.toLowerCase());
  }
  return s;
}
function extension(e) {
  if (!e || "string" != typeof e)
    return false;
  var s = EXTRACT_TYPE_REGEXP.exec(e), a = s && exports.extensions[s[1].toLowerCase()];
  return !(!a || !a.length) && a[0];
}
function lookup(e) {
  if (!e || "string" != typeof e)
    return false;
  var s = (0, import_path_browserify.extname)("x." + e).toLowerCase().substr(1);
  return s && exports.types[s] || false;
}
function populateMaps(e, s) {
  var a = ["nginx", "apache", void 0, "iana"];
  Object.keys(db).forEach(function(o) {
    var i = db[o], n = i.extensions;
    if (n && n.length) {
      e[o] = n;
      for (var t = 0; t < n.length; t++) {
        var c = n[t];
        if (s[c]) {
          var r = a.indexOf(db[s[c]].source), p = a.indexOf(i.source);
          if ("application/octet-stream" !== s[c] && (r > p || r === p && "application/" === s[c].substr(0, 12)))
            continue;
        }
        s[c] = o;
      }
    }
  });
}
var import_path_browserify, db, EXTRACT_TYPE_REGEXP, TEXT_TYPE_REGEXP, exports, mime_default;
var init_mime = __esm({
  "node_modules/@dynamic-pkg/mime/index.js"() {
    "use strict";
    import_path_browserify = __toESM(require_path_browserify());
    db = { "application/ecmascript": { source: "apache", compressible: true, extensions: ["ecma"] }, "application/gzip": { source: "iana", compressible: false, extensions: ["gz"] }, "application/http": { source: "iana" }, "application/javascript": { source: "apache", charset: "UTF-8", compressible: true, extensions: ["js"] }, "application/json": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["json", "map"] }, "application/manifest+json": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["webmanifest"] }, "application/marc": { source: "iana", extensions: ["mrc"] }, "application/mp4": { source: "iana", extensions: ["mp4", "mpg4", "mp4s", "m4p"] }, "application/ogg": { source: "iana", compressible: false, extensions: ["ogx"] }, "application/sql": { source: "iana", extensions: ["sql"] }, "application/wasm": { source: "iana", compressible: true, extensions: ["wasm"] }, "application/x-bittorrent": { source: "apache", extensions: ["torrent"] }, "application/x-gzip": { source: "apache" }, "application/x-javascript": { compressible: true }, "application/x-web-app-manifest+json": { compressible: true, extensions: ["webapp"] }, "application/x-www-form-urlencoded": { source: "iana", compressible: true }, "application/xhtml+xml": { source: "iana", compressible: true, extensions: ["xhtml", "xht"] }, "application/xhtml-voice+xml": { source: "apache", compressible: true }, "application/xml": { source: "iana", compressible: true, extensions: ["xml", "xsl", "xsd", "rng"] }, "application/zip": { source: "iana", compressible: false, extensions: ["zip"] }, "application/zlib": { source: "iana" }, "audio/midi": { source: "apache", extensions: ["mid", "midi", "kar", "rmi"] }, "audio/mp3": { compressible: false, extensions: ["mp3"] }, "audio/mp4": { source: "iana", compressible: false, extensions: ["m4a", "mp4a"] }, "audio/mp4a-latm": { source: "iana" }, "audio/mpa": { source: "iana" }, "audio/mpa-robust": { source: "iana" }, "audio/mpeg": { source: "iana", compressible: false, extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"] }, "audio/ogg": { source: "iana", compressible: false, extensions: ["oga", "ogg", "spx", "opus"] }, "audio/red": { source: "iana" }, "audio/rtx": { source: "iana" }, "audio/scip": { source: "iana" }, "audio/silk": { source: "apache", extensions: ["sil"] }, "audio/smv": { source: "iana" }, "audio/wav": { compressible: false, extensions: ["wav"] }, "audio/wave": { compressible: false, extensions: ["wav"] }, "audio/webm": { source: "apache", compressible: false, extensions: ["weba"] }, "audio/x-aac": { source: "apache", compressible: false, extensions: ["aac"] }, "audio/x-aiff": { source: "apache", extensions: ["aif", "aiff", "aifc"] }, "audio/x-caf": { source: "apache", compressible: false, extensions: ["caf"] }, "audio/x-flac": { source: "apache", extensions: ["flac"] }, "audio/x-m4a": { source: "nginx", extensions: ["m4a"] }, "audio/x-matroska": { source: "apache", extensions: ["mka"] }, "audio/x-mpegurl": { source: "apache", extensions: ["m3u"] }, "audio/x-ms-wax": { source: "apache", extensions: ["wax"] }, "audio/x-ms-wma": { source: "apache", extensions: ["wma"] }, "audio/x-pn-realaudio": { source: "apache", extensions: ["ram", "ra"] }, "audio/x-pn-realaudio-plugin": { source: "apache", extensions: ["rmp"] }, "audio/x-realaudio": { source: "nginx", extensions: ["ra"] }, "audio/x-tta": { source: "apache" }, "audio/x-wav": { source: "apache", extensions: ["wav"] }, "audio/xm": { source: "apache", extensions: ["xm"] }, "font/collection": { source: "iana", extensions: ["ttc"] }, "font/otf": { source: "iana", compressible: true, extensions: ["otf"] }, "font/sfnt": { source: "iana" }, "font/ttf": { source: "iana", compressible: true, extensions: ["ttf"] }, "font/woff": { source: "iana", extensions: ["woff"] }, "font/woff2": { source: "iana", extensions: ["woff2"] }, "image/gif": { source: "iana", compressible: false, extensions: ["gif"] }, "image/heic": { source: "iana", extensions: ["heic"] }, "image/heic-sequence": { source: "iana", extensions: ["heics"] }, "image/heif": { source: "iana", extensions: ["heif"] }, "image/jpeg": { source: "iana", compressible: false, extensions: ["jpeg", "jpg", "jpe"] }, "image/png": { source: "iana", compressible: false, extensions: ["png"] }, "image/svg+xml": { source: "iana", compressible: true, extensions: ["svg", "svgz"] }, "image/webp": { source: "iana", extensions: ["webp"] }, "text/coffeescript": { extensions: ["coffee", "litcoffee"] }, "text/css": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["css"] }, "text/ecmascript": { source: "apache" }, "text/html": { source: "iana", compressible: true, extensions: ["html", "htm", "shtml"] }, "text/jade": { extensions: ["jade"] }, "text/javascript": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["js", "mjs"] }, "text/markdown": { source: "iana", compressible: true, extensions: ["md", "markdown"] } };
    EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    TEXT_TYPE_REGEXP = /^text\//i;
    exports = {};
    exports.charset = charset, exports.charsets = { lookup: charset }, exports.contentType = contentType, exports.extension = extension, exports.extensions = /* @__PURE__ */ Object.create(null), exports.lookup = lookup, exports.types = /* @__PURE__ */ Object.create(null), populateMaps(exports.extensions, exports.types);
    mime_default = exports;
  }
});

// public/sw.js
var fs = new (require_FileSystem())();
var path = require_path_browserify();
var { default: mime } = (init_mime(), __toCommonJS(mime_exports));
importScripts("/uv/uv.bundle.js");
importScripts("/uv/uv.config.js");
importScripts("/uv/uv.sw.js");
var uv = new UVServiceWorker();
self.addEventListener("activate", () => self.clients.claim());
self.addEventListener("fetch", (event) => {
  const req = event.request;
  event.respondWith(
    (async (res) => {
      if (req.url.startsWith("chrome-extension://"))
        return await fetch(req);
      if (req.url.startsWith(location.origin + "/~/uv/"))
        return await uv.fetch(event);
      if (req.url.startsWith(location.origin + "/xen/~/")) {
        const _url = req.url.replace(location.origin + "/xen/~", "");
        if (_url.startsWith("/terminal/commands/")) {
          const url = path.join(
            "/xen/apps/native/terminal/commands/",
            _url.replace("/terminal/commands/", "")
          );
          return await fetch(url);
        }
        if (_url.startsWith("/about:")) {
          switch (_url.slice(7)) {
            default:
            case "blank":
              return new Response("", {
                headers: {
                  "Content-Type": "text/html"
                }
              });
            case "srcdoc":
              return new Response(await req.text(), {
                headers: {
                  "Content-Type": "text/html"
                }
              });
          }
        }
        if (_url.startsWith("/assets")) {
          const url = path.join(
            "/xen/system/assets/",
            _url.replace("/assets/", "")
          );
          return new Response(await fs.readFile(url), {
            headers: {
              "Content-Type": mime.lookup(url)
            }
          });
        }
        if (_url.startsWith("/apps")) {
          const app = _url.replace("/apps/", "").split("/").slice(0, 2).join("/");
          const [author, appName] = app.split("/");
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
            let finalURL, content;
            try {
              content = await fs.readFile(
                finalURL = path.join(
                  "/xen/system/apps/",
                  app,
                  url == "/" ? "/index.html" : url
                )
              );
            } catch {
              content = await fs.readFile(
                finalURL = path.join(
                  "/xen/system/apps/",
                  app,
                  url == "/" ? "/index.html" : url + ".html"
                )
              ).catch(() => {
                return new Response(`404: ${url} not found`);
              });
            }
            if (mime.lookup(finalURL) == "text/html") {
              content = `<base href="/xen/~/apps/${app}/" /><script src="/xen/~/assets/inject.bundle.js"><\/script>${await content.text()}`;
            }
            return new Response(content, {
              headers: {
                "Content-Type": mime.lookup(finalURL)
              }
            });
          }
        }
      } else {
        const path2 = new URL(req.url).pathname;
        const cache = await caches.open("apps");
        if (!await cache.match(req)) {
          if (path2.startsWith("/img/") || path2.startsWith("/xen/font/") || req.destination == "font" || req.url.startsWith("https://cdn.jsdelivr.net/"))
            return res = await fetch(req), await cache.put(req, res), res;
          else
            return await fetch(req);
        } else {
          return await cache.match(req) || await fetch(req);
        }
      }
    })()
  );
});
var nativePath = "/xen/apps/native/";
function installApp(data) {
}
async function installNative(data) {
  const appData = await fetch(
    nativePath + data.app.replace("Xen/", "") + "/app.json"
  ).then((response) => response.json());
  appData.id = data.app;
  appData.files.splice(appData.files.indexOf("app.json"), 1);
  await fs.mkdir("/xen/system/apps/" + data.app);
  await Promise.all(
    appData.files.map(async (file) => {
      const res = await fetch(
        nativePath + data.app.replace("Xen/", "") + "/" + file
      );
      const blob = await res.blob();
      await fs.writeFile("/xen/system/apps/" + data.app + "/" + file, blob);
    })
  );
  await fs.writeFile(
    "/xen/system/apps/" + data.app + "/app.json",
    JSON.stringify(appData)
  );
  const installed = JSON.parse(
    await fs.readFile("/xen/system/apps/installed.json", "utf-8")
  );
  if (!installed.includes(data.app))
    installed.push(data.app);
  await fs.writeFile(
    "/xen/system/apps/installed.json",
    JSON.stringify(installed)
  );
  return true;
}
async function updateNative(data) {
  const appData = await fetch(
    nativePath + data.app.replace("Xen/", "") + "/app.json"
  ).then((response) => response.json());
  const installed = JSON.parse(
    await fs.readFile(`/xen/system/apps/${data.app}/app.json`, "utf-8")
  );
  if (installed.version == appData.version)
    return false;
  appData.files.splice(appData.files.indexOf("app.json"), 1);
  for (let file of appData.files) {
    const res = await fetch(
      nativePath + data.app.replace("Xen/", "") + "/" + file
    );
    const blob = await res.blob();
    await fs.writeFile("/xen/system/apps/" + data.app + "/" + file, blob);
  }
  await fs.writeFile(
    "/xen/system/apps/" + data.app + "/app.json",
    JSON.stringify(appData)
  );
  return true;
}
self.addEventListener("message", async (event) => {
  if (typeof event.data !== "object")
    return false;
  switch (event.data.type) {
    case "install":
      if (event.data.native === true) {
        await installNative(event.data).catch((err) => {
          event.ports[0].postMessage({
            type: "install",
            success: false,
            error: err
          });
        });
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
            error: err
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
self.addEventListener("install", (event) => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(clients.claim()));
