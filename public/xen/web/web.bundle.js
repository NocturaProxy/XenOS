var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/esbuild-plugin-polyfill-node/polyfills/__dirname.js
var init_dirname = __esm({
  "node_modules/esbuild-plugin-polyfill-node/polyfills/__dirname.js"() {
  }
});

// node_modules/@jspm/core/nodelibs/browser/process.js
var process_exports = {};
__export(process_exports, {
  _debugEnd: () => _debugEnd,
  _debugProcess: () => _debugProcess,
  _events: () => _events,
  _eventsCount: () => _eventsCount,
  _exiting: () => _exiting,
  _fatalExceptions: () => _fatalExceptions,
  _getActiveHandles: () => _getActiveHandles,
  _getActiveRequests: () => _getActiveRequests,
  _kill: () => _kill,
  _linkedBinding: () => _linkedBinding,
  _maxListeners: () => _maxListeners,
  _preload_modules: () => _preload_modules,
  _rawDebug: () => _rawDebug,
  _startProfilerIdleNotifier: () => _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier: () => _stopProfilerIdleNotifier,
  _tickCallback: () => _tickCallback,
  abort: () => abort,
  addListener: () => addListener,
  allowedNodeEnvironmentFlags: () => allowedNodeEnvironmentFlags,
  arch: () => arch,
  argv: () => argv,
  argv0: () => argv0,
  assert: () => assert,
  binding: () => binding,
  chdir: () => chdir,
  config: () => config,
  cpuUsage: () => cpuUsage,
  cwd: () => cwd,
  debugPort: () => debugPort,
  default: () => process,
  dlopen: () => dlopen,
  domain: () => domain,
  emit: () => emit,
  emitWarning: () => emitWarning,
  env: () => env,
  execArgv: () => execArgv,
  execPath: () => execPath,
  exit: () => exit,
  features: () => features,
  hasUncaughtExceptionCaptureCallback: () => hasUncaughtExceptionCaptureCallback,
  hrtime: () => hrtime,
  kill: () => kill,
  listeners: () => listeners,
  memoryUsage: () => memoryUsage,
  moduleLoadList: () => moduleLoadList,
  nextTick: () => nextTick,
  off: () => off,
  on: () => on,
  once: () => once,
  openStdin: () => openStdin,
  pid: () => pid,
  platform: () => platform,
  ppid: () => ppid,
  prependListener: () => prependListener,
  prependOnceListener: () => prependOnceListener,
  reallyExit: () => reallyExit,
  release: () => release,
  removeAllListeners: () => removeAllListeners,
  removeListener: () => removeListener,
  resourceUsage: () => resourceUsage,
  setSourceMapsEnabled: () => setSourceMapsEnabled,
  setUncaughtExceptionCaptureCallback: () => setUncaughtExceptionCaptureCallback,
  stderr: () => stderr,
  stdin: () => stdin,
  stdout: () => stdout,
  title: () => title,
  umask: () => umask,
  uptime: () => uptime,
  version: () => version,
  versions: () => versions
});
function unimplemented(name) {
  throw new Error("Node.js process " + name + " is not supported by JSPM core outside of Node.js");
}
function cleanUpNextTick() {
  if (!draining || !currentQueue)
    return;
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length)
    drainQueue();
}
function drainQueue() {
  if (draining)
    return;
  var timeout = setTimeout(cleanUpNextTick, 0);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue)
        currentQueue[queueIndex].run();
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  clearTimeout(timeout);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining)
    setTimeout(drainQueue, 0);
}
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
function noop() {
}
function _linkedBinding(name) {
  unimplemented("_linkedBinding");
}
function dlopen(name) {
  unimplemented("dlopen");
}
function _getActiveRequests() {
  return [];
}
function _getActiveHandles() {
  return [];
}
function assert(condition, message) {
  if (!condition)
    throw new Error(message || "assertion error");
}
function hasUncaughtExceptionCaptureCallback() {
  return false;
}
function uptime() {
  return _performance.now() / 1e3;
}
function hrtime(previousTimestamp) {
  var baseNow = Math.floor((Date.now() - _performance.now()) * 1e-3);
  var clocktime = _performance.now() * 1e-3;
  var seconds = Math.floor(clocktime) + baseNow;
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += nanoPerSec;
    }
  }
  return [seconds, nanoseconds];
}
function on() {
  return process;
}
function listeners(name) {
  return [];
}
var queue, draining, currentQueue, queueIndex, title, arch, platform, env, argv, execArgv, version, versions, emitWarning, binding, umask, cwd, chdir, release, _rawDebug, moduleLoadList, domain, _exiting, config, reallyExit, _kill, cpuUsage, resourceUsage, memoryUsage, kill, exit, openStdin, allowedNodeEnvironmentFlags, features, _fatalExceptions, setUncaughtExceptionCaptureCallback, _tickCallback, _debugProcess, _debugEnd, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, stdout, stderr, stdin, abort, pid, ppid, execPath, debugPort, argv0, _preload_modules, setSourceMapsEnabled, _performance, nowOffset, nanoPerSec, _maxListeners, _events, _eventsCount, addListener, once, off, removeListener, removeAllListeners, emit, prependListener, prependOnceListener, process;
var init_process = __esm({
  "node_modules/@jspm/core/nodelibs/browser/process.js"() {
    init_dirname();
    init_buffer2();
    init_process2();
    queue = [];
    draining = false;
    queueIndex = -1;
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    title = "browser";
    arch = "x64";
    platform = "browser";
    env = {
      PATH: "/usr/bin",
      LANG: navigator.language + ".UTF-8",
      PWD: "/",
      HOME: "/home",
      TMP: "/tmp"
    };
    argv = ["/usr/bin/node"];
    execArgv = [];
    version = "v16.8.0";
    versions = {};
    emitWarning = function(message, type) {
      console.warn((type ? type + ": " : "") + message);
    };
    binding = function(name) {
      unimplemented("binding");
    };
    umask = function(mask) {
      return 0;
    };
    cwd = function() {
      return "/";
    };
    chdir = function(dir) {
    };
    release = {
      name: "node",
      sourceUrl: "",
      headersUrl: "",
      libUrl: ""
    };
    _rawDebug = noop;
    moduleLoadList = [];
    domain = {};
    _exiting = false;
    config = {};
    reallyExit = noop;
    _kill = noop;
    cpuUsage = function() {
      return {};
    };
    resourceUsage = cpuUsage;
    memoryUsage = cpuUsage;
    kill = noop;
    exit = noop;
    openStdin = noop;
    allowedNodeEnvironmentFlags = {};
    features = {
      inspector: false,
      debug: false,
      uv: false,
      ipv6: false,
      tls_alpn: false,
      tls_sni: false,
      tls_ocsp: false,
      tls: false,
      cached_builtins: true
    };
    _fatalExceptions = noop;
    setUncaughtExceptionCaptureCallback = noop;
    _tickCallback = noop;
    _debugProcess = noop;
    _debugEnd = noop;
    _startProfilerIdleNotifier = noop;
    _stopProfilerIdleNotifier = noop;
    stdout = void 0;
    stderr = void 0;
    stdin = void 0;
    abort = noop;
    pid = 2;
    ppid = 1;
    execPath = "/bin/usr/node";
    debugPort = 9229;
    argv0 = "node";
    _preload_modules = [];
    setSourceMapsEnabled = noop;
    _performance = {
      now: typeof performance !== "undefined" ? performance.now.bind(performance) : void 0,
      timing: typeof performance !== "undefined" ? performance.timing : void 0
    };
    if (_performance.now === void 0) {
      nowOffset = Date.now();
      if (_performance.timing && _performance.timing.navigationStart) {
        nowOffset = _performance.timing.navigationStart;
      }
      _performance.now = () => Date.now() - nowOffset;
    }
    nanoPerSec = 1e9;
    hrtime.bigint = function(time) {
      var diff = hrtime(time);
      if (typeof BigInt === "undefined") {
        return diff[0] * nanoPerSec + diff[1];
      }
      return BigInt(diff[0] * nanoPerSec) + BigInt(diff[1]);
    };
    _maxListeners = 10;
    _events = {};
    _eventsCount = 0;
    addListener = on;
    once = on;
    off = on;
    removeListener = on;
    removeAllListeners = on;
    emit = noop;
    prependListener = on;
    prependOnceListener = on;
    process = {
      version,
      versions,
      arch,
      platform,
      release,
      _rawDebug,
      moduleLoadList,
      binding,
      _linkedBinding,
      _events,
      _eventsCount,
      _maxListeners,
      on,
      addListener,
      once,
      off,
      removeListener,
      removeAllListeners,
      emit,
      prependListener,
      prependOnceListener,
      listeners,
      domain,
      _exiting,
      config,
      dlopen,
      uptime,
      _getActiveRequests,
      _getActiveHandles,
      reallyExit,
      _kill,
      cpuUsage,
      resourceUsage,
      memoryUsage,
      kill,
      exit,
      openStdin,
      allowedNodeEnvironmentFlags,
      assert,
      features,
      _fatalExceptions,
      setUncaughtExceptionCaptureCallback,
      hasUncaughtExceptionCaptureCallback,
      emitWarning,
      nextTick,
      _tickCallback,
      _debugProcess,
      _debugEnd,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      stdout,
      stdin,
      stderr,
      abort,
      umask,
      chdir,
      cwd,
      env,
      title,
      argv,
      execArgv,
      pid,
      ppid,
      execPath,
      debugPort,
      hrtime,
      argv0,
      _preload_modules,
      setSourceMapsEnabled
    };
  }
});

// node_modules/esbuild-plugin-polyfill-node/polyfills/process.js
var init_process2 = __esm({
  "node_modules/esbuild-plugin-polyfill-node/polyfills/process.js"() {
    init_process();
  }
});

// node_modules/@jspm/core/nodelibs/browser/buffer.js
function dew$2() {
  if (_dewExec$2)
    return exports$3;
  _dewExec$2 = true;
  exports$3.byteLength = byteLength;
  exports$3.toByteArray = toByteArray;
  exports$3.fromByteArray = fromByteArray;
  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
  function getLens(b64) {
    var len2 = b64.length;
    if (len2 % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1)
      validLen = len2;
    var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
    return [validLen, placeHoldersLen];
  }
  function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i2;
    for (i2 = 0; i2 < len2; i2 += 4) {
      tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
      arr[curByte++] = tmp >> 16 & 255;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
      tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
      tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i2 = start; i2 < end; i2 += 3) {
      tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
      output.push(tripletToBase64(tmp));
    }
    return output.join("");
  }
  function fromByteArray(uint8) {
    var tmp;
    var len2 = uint8.length;
    var extraBytes = len2 % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
      parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
    }
    if (extraBytes === 1) {
      tmp = uint8[len2 - 1];
      parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
    } else if (extraBytes === 2) {
      tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
      parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
    }
    return parts.join("");
  }
  return exports$3;
}
function dew$1() {
  if (_dewExec$1)
    return exports$2;
  _dewExec$1 = true;
  exports$2.read = function(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
    }
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
    }
    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  };
  exports$2.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }
    for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
    }
    e = e << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
    }
    buffer[offset + i - d] |= s * 128;
  };
  return exports$2;
}
function dew() {
  if (_dewExec)
    return exports$1;
  _dewExec = true;
  const base64 = dew$2();
  const ieee754 = dew$1();
  const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
  exports$1.Buffer = Buffer3;
  exports$1.SlowBuffer = SlowBuffer;
  exports$1.INSPECT_MAX_BYTES = 50;
  const K_MAX_LENGTH = 2147483647;
  exports$1.kMaxLength = K_MAX_LENGTH;
  Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
  if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
    console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  }
  function typedArraySupport() {
    try {
      const arr = new Uint8Array(1);
      const proto = {
        foo: function() {
          return 42;
        }
      };
      Object.setPrototypeOf(proto, Uint8Array.prototype);
      Object.setPrototypeOf(arr, proto);
      return arr.foo() === 42;
    } catch (e) {
      return false;
    }
  }
  Object.defineProperty(Buffer3.prototype, "parent", {
    enumerable: true,
    get: function() {
      if (!Buffer3.isBuffer(this))
        return void 0;
      return this.buffer;
    }
  });
  Object.defineProperty(Buffer3.prototype, "offset", {
    enumerable: true,
    get: function() {
      if (!Buffer3.isBuffer(this))
        return void 0;
      return this.byteOffset;
    }
  });
  function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
      throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer3.prototype);
    return buf;
  }
  function Buffer3(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new TypeError('The "string" argument must be of type string. Received type number');
      }
      return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
  }
  Buffer3.poolSize = 8192;
  function from(value, encodingOrOffset, length) {
    if (typeof value === "string") {
      return fromString(value, encodingOrOffset);
    }
    if (ArrayBuffer.isView(value)) {
      return fromArrayView(value);
    }
    if (value == null) {
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === "number") {
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    }
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
      return Buffer3.from(valueOf, encodingOrOffset, length);
    }
    const b = fromObject(value);
    if (b)
      return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
      return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    }
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
  }
  Buffer3.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
  };
  Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(Buffer3, Uint8Array);
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be of type number');
    } else if (size < 0) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }
  }
  function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(size);
    }
    if (fill !== void 0) {
      return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    }
    return createBuffer(size);
  }
  Buffer3.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
  };
  function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
  }
  Buffer3.allocUnsafe = function(size) {
    return allocUnsafe(size);
  };
  Buffer3.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
  };
  function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer3.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
    const length = byteLength(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) {
      buf = buf.slice(0, actual);
    }
    return buf;
  }
  function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for (let i = 0; i < length; i += 1) {
      buf[i] = array[i] & 255;
    }
    return buf;
  }
  function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
      const copy = new Uint8Array(arrayView);
      return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
  }
  function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('"length" is outside of buffer bounds');
    }
    let buf;
    if (byteOffset === void 0 && length === void 0) {
      buf = new Uint8Array(array);
    } else if (length === void 0) {
      buf = new Uint8Array(array, byteOffset);
    } else {
      buf = new Uint8Array(array, byteOffset, length);
    }
    Object.setPrototypeOf(buf, Buffer3.prototype);
    return buf;
  }
  function fromObject(obj) {
    if (Buffer3.isBuffer(obj)) {
      const len = checked(obj.length) | 0;
      const buf = createBuffer(len);
      if (buf.length === 0) {
        return buf;
      }
      obj.copy(buf, 0, 0, len);
      return buf;
    }
    if (obj.length !== void 0) {
      if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
        return createBuffer(0);
      }
      return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data);
    }
  }
  function checked(length) {
    if (length >= K_MAX_LENGTH) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    }
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0;
    }
    return Buffer3.alloc(+length);
  }
  Buffer3.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer3.prototype;
  };
  Buffer3.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array))
      a = Buffer3.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array))
      b = Buffer3.from(b, b.offset, b.byteLength);
    if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
      throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    }
    if (a === b)
      return 0;
    let x = a.length;
    let y = b.length;
    for (let i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  Buffer3.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer3.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
      return Buffer3.alloc(0);
    }
    let i;
    if (length === void 0) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }
    const buffer = Buffer3.allocUnsafe(length);
    let pos = 0;
    for (i = 0; i < list.length; ++i) {
      let buf = list[i];
      if (isInstance(buf, Uint8Array)) {
        if (pos + buf.length > buffer.length) {
          if (!Buffer3.isBuffer(buf))
            buf = Buffer3.from(buf);
          buf.copy(buffer, pos);
        } else {
          Uint8Array.prototype.set.call(buffer, buf, pos);
        }
      } else if (!Buffer3.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      } else {
        buf.copy(buffer, pos);
      }
      pos += buf.length;
    }
    return buffer;
  };
  function byteLength(string, encoding) {
    if (Buffer3.isBuffer(string)) {
      return string.length;
    }
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
    }
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0)
      return 0;
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase) {
            return mustMatch ? -1 : utf8ToBytes(string).length;
          }
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer3.byteLength = byteLength;
  function slowToString(encoding, start, end) {
    let loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding)
      encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer3.prototype._isBuffer = true;
  function swap(b, n, m) {
    const i = b[n];
    b[n] = b[m];
    b[m] = i;
  }
  Buffer3.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (let i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this;
  };
  Buffer3.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (let i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this;
  };
  Buffer3.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (let i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this;
  };
  Buffer3.prototype.toString = function toString() {
    const length = this.length;
    if (length === 0)
      return "";
    if (arguments.length === 0)
      return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
  Buffer3.prototype.equals = function equals(b) {
    if (!Buffer3.isBuffer(b))
      throw new TypeError("Argument must be a Buffer");
    if (this === b)
      return true;
    return Buffer3.compare(this, b) === 0;
  };
  Buffer3.prototype.inspect = function inspect() {
    let str = "";
    const max = exports$1.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max)
      str += " ... ";
    return "<Buffer " + str + ">";
  };
  if (customInspectSymbol) {
    Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
  }
  Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) {
      target = Buffer3.from(target, target.offset, target.byteLength);
    }
    if (!Buffer3.isBuffer(target)) {
      throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
    }
    if (start === void 0) {
      start = 0;
    }
    if (end === void 0) {
      end = target ? target.length : 0;
    }
    if (thisStart === void 0) {
      thisStart = 0;
    }
    if (thisEnd === void 0) {
      thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError("out of range index");
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target)
      return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for (let i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
      }
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    if (buffer.length === 0)
      return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (numberIsNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer.length - 1;
    }
    if (byteOffset < 0)
      byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir)
        return -1;
      else
        byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir)
        byteOffset = 0;
      else
        return -1;
    }
    if (typeof val === "string") {
      val = Buffer3.from(val, encoding);
    }
    if (Buffer3.isBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
      }
      return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read(buf, i2) {
      if (indexSize === 1) {
        return buf[i2];
      } else {
        return buf.readUInt16BE(i2 * indexSize);
      }
    }
    let i;
    if (dir) {
      let foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1)
            foundIndex = i;
          if (i - foundIndex + 1 === valLength)
            return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1)
            i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength)
        byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        let found = true;
        for (let j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break;
          }
        }
        if (found)
          return i;
      }
    }
    return -1;
  }
  Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };
  Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };
  Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    const strLen = string.length;
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    let i;
    for (i = 0; i < length; ++i) {
      const parsed = parseInt(string.substr(i * 2, 2), 16);
      if (numberIsNaN(parsed))
        return i;
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }
  Buffer3.prototype.write = function write(string, offset, length, encoding) {
    if (offset === void 0) {
      encoding = "utf8";
      length = this.length;
      offset = 0;
    } else if (length === void 0 && typeof offset === "string") {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === void 0)
          encoding = "utf8";
      } else {
        encoding = length;
        length = void 0;
      }
    } else {
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    }
    const remaining = this.length - offset;
    if (length === void 0 || length > remaining)
      length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    if (!encoding)
      encoding = "utf8";
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, string, offset, length);
        case "base64":
          return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset, length);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer3.prototype.toJSON = function toJSON() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while (i < end) {
      const firstByte = buf[i];
      let codePoint = null;
      let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        let secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  const MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    let res = "";
    let i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0)
      start = 0;
    if (!end || end < 0 || end > len)
      end = len;
    let out = "";
    for (let i = start; i < end; ++i) {
      out += hexSliceLookupTable[buf[i]];
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = "";
    for (let i = 0; i < bytes.length - 1; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  Buffer3.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0)
        start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0)
        end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start)
      end = start;
    const newBuf = this.subarray(start, end);
    Object.setPrototypeOf(newBuf, Buffer3.prototype);
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0)
      throw new RangeError("offset is not uint");
    if (offset + ext > length)
      throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength2, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength2 && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    return val;
  };
  Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      checkOffset(offset, byteLength2, this.length);
    }
    let val = this[offset + --byteLength2];
    let mul = 1;
    while (byteLength2 > 0 && (mul *= 256)) {
      val += this[offset + --byteLength2] * mul;
    }
    return val;
  };
  Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    return this[offset];
  };
  Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
  };
  Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
  };
  Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
  };
  Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
  };
  Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
  });
  Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
  });
  Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength2, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength2 && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength2);
    return val;
  };
  Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength2, this.length);
    let i = byteLength2;
    let mul = 1;
    let val = this[offset + --i];
    while (i > 0 && (mul *= 256)) {
      val += this[offset + --i] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength2);
    return val;
  };
  Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    if (!(this[offset] & 128))
      return this[offset];
    return (255 - this[offset] + 1) * -1;
  };
  Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
  };
  Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
  };
  Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
  });
  Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
  });
  Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
  };
  Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
  };
  Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
  };
  Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer3.isBuffer(buf))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min)
      throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
  }
  Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
      checkInt(this, value, offset, byteLength2, maxBytes, 0);
    }
    let mul = 1;
    let i = 0;
    this[offset] = value & 255;
    while (++i < byteLength2 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength2;
  };
  Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
      checkInt(this, value, offset, byteLength2, maxBytes, 0);
    }
    let i = byteLength2 - 1;
    let mul = 1;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength2;
  };
  Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 255, 0);
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 255;
    return offset + 4;
  };
  Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  function wrtBigUInt64LE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
  }
  function wrtBigUInt64BE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
  }
  Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength2 - 1);
      checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 255;
    while (++i < byteLength2 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength2;
  };
  Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength2 - 1);
      checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    let i = byteLength2 - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength2;
  };
  Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 127, -128);
    if (value < 0)
      value = 255 + value + 1;
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 2147483647, -2147483648);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
  };
  Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (value < 0)
      value = 4294967295 + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
    if (offset < 0)
      throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer3.isBuffer(target))
      throw new TypeError("argument should be a Buffer");
    if (!start)
      start = 0;
    if (!end && end !== 0)
      end = this.length;
    if (targetStart >= target.length)
      targetStart = target.length;
    if (!targetStart)
      targetStart = 0;
    if (end > 0 && end < start)
      end = start;
    if (end === start)
      return 0;
    if (target.length === 0 || this.length === 0)
      return 0;
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (start < 0 || start >= this.length)
      throw new RangeError("Index out of range");
    if (end < 0)
      throw new RangeError("sourceEnd out of bounds");
    if (end > this.length)
      end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    const len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
      this.copyWithin(targetStart, start, end);
    } else {
      Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    }
    return len;
  };
  Buffer3.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (encoding !== void 0 && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      if (val.length === 1) {
        const code = val.charCodeAt(0);
        if (encoding === "utf8" && code < 128 || encoding === "latin1") {
          val = code;
        }
      }
    } else if (typeof val === "number") {
      val = val & 255;
    } else if (typeof val === "boolean") {
      val = Number(val);
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return this;
    }
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val)
      val = 0;
    let i;
    if (typeof val === "number") {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
      const len = bytes.length;
      if (len === 0) {
        throw new TypeError('The value "' + val + '" is invalid for argument "value"');
      }
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }
    return this;
  };
  const errors = {};
  function E(sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
      constructor() {
        super();
        Object.defineProperty(this, "message", {
          value: getMessage.apply(this, arguments),
          writable: true,
          configurable: true
        });
        this.name = `${this.name} [${sym}]`;
        this.stack;
        delete this.name;
      }
      get code() {
        return sym;
      }
      set code(value) {
        Object.defineProperty(this, "code", {
          configurable: true,
          enumerable: true,
          value,
          writable: true
        });
      }
      toString() {
        return `${this.name} [${sym}]: ${this.message}`;
      }
    };
  }
  E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
    if (name) {
      return `${name} is outside of buffer bounds`;
    }
    return "Attempt to access memory outside buffer bounds";
  }, RangeError);
  E("ERR_INVALID_ARG_TYPE", function(name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
  }, TypeError);
  E("ERR_OUT_OF_RANGE", function(str, range, input) {
    let msg = `The value of "${str}" is out of range.`;
    let received = input;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input));
    } else if (typeof input === "bigint") {
      received = String(input);
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received);
      }
      received += "n";
    }
    msg += ` It must be ${range}. Received ${received}`;
    return msg;
  }, RangeError);
  function addNumericalSeparator(val) {
    let res = "";
    let i = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for (; i >= start + 4; i -= 3) {
      res = `_${val.slice(i - 3, i)}${res}`;
    }
    return `${val.slice(0, i)}${res}`;
  }
  function checkBounds(buf, offset, byteLength2) {
    validateNumber(offset, "offset");
    if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
      boundsError(offset, buf.length - (byteLength2 + 1));
    }
  }
  function checkIntBI(value, min, max, buf, offset, byteLength2) {
    if (value > max || value < min) {
      const n = typeof min === "bigint" ? "n" : "";
      let range;
      if (byteLength2 > 3) {
        if (min === 0 || min === BigInt(0)) {
          range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
        } else {
          range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
        }
      } else {
        range = `>= ${min}${n} and <= ${max}${n}`;
      }
      throw new errors.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset, byteLength2);
  }
  function validateNumber(value, name) {
    if (typeof value !== "number") {
      throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
    }
  }
  function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
      validateNumber(value, type);
      throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
    }
    if (length < 0) {
      throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    }
    throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
  }
  const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = str.split("=")[0];
    str = str.trim().replace(INVALID_BASE64_RE, "");
    if (str.length < 2)
      return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for (let i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0)
          break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0)
          break;
        bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0)
          break;
        bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0)
          break;
        bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0)
        break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    let i;
    for (i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length)
        break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
  }
  function numberIsNaN(obj) {
    return obj !== obj;
  }
  const hexSliceLookupTable = function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for (let i = 0; i < 16; ++i) {
      const i16 = i * 16;
      for (let j = 0; j < 16; ++j) {
        table[i16 + j] = alphabet[i] + alphabet[j];
      }
    }
    return table;
  }();
  function defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
  }
  function BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
  }
  return exports$1;
}
var exports$3, _dewExec$2, exports$2, _dewExec$1, exports$1, _dewExec, exports, Buffer2, INSPECT_MAX_BYTES, kMaxLength;
var init_buffer = __esm({
  "node_modules/@jspm/core/nodelibs/browser/buffer.js"() {
    init_dirname();
    init_buffer2();
    init_process2();
    exports$3 = {};
    _dewExec$2 = false;
    exports$2 = {};
    _dewExec$1 = false;
    exports$1 = {};
    _dewExec = false;
    exports = dew();
    exports["Buffer"];
    exports["SlowBuffer"];
    exports["INSPECT_MAX_BYTES"];
    exports["kMaxLength"];
    Buffer2 = exports.Buffer;
    INSPECT_MAX_BYTES = exports.INSPECT_MAX_BYTES;
    kMaxLength = exports.kMaxLength;
  }
});

// node_modules/esbuild-plugin-polyfill-node/polyfills/buffer.js
var init_buffer2 = __esm({
  "node_modules/esbuild-plugin-polyfill-node/polyfills/buffer.js"() {
    init_buffer();
  }
});

// node_modules/@tomphttp/bare-client/dist/index.js
function safeAdd(x, y) {
  const lsw = (x & 65535) + (y & 65535);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
function binlMD5(x, len) {
  x[len >> 5] |= 128 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;
  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}
function binl2rstr(input) {
  let output = "";
  const length32 = input.length * 32;
  for (let i = 0; i < length32; i += 8) {
    output += String.fromCharCode(input[i >> 5] >>> i % 32 & 255);
  }
  return output;
}
function rstr2binl(input) {
  const output = [];
  const outputLen = input.length >> 2;
  for (let i = 0; i < outputLen; i += 1) {
    output[i] = 0;
  }
  const length8 = input.length * 8;
  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 255) << i % 32;
  }
  return output;
}
function rstrMD5(s) {
  return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
}
function rstrHMACMD5(key, data) {
  let bkey = rstr2binl(key);
  const ipad = [];
  const opad = [];
  if (bkey.length > 16) {
    bkey = binlMD5(bkey, key.length * 8);
  }
  for (let i = 0; i < 16; i += 1) {
    ipad[i] = bkey[i] ^ 909522486;
    opad[i] = bkey[i] ^ 1549556828;
  }
  const hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
}
function rstr2hex(input) {
  const hexTab = "0123456789abcdef";
  let output = "";
  for (let i = 0; i < input.length; i += 1) {
    const x = input.charCodeAt(i);
    output += hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15);
  }
  return output;
}
function str2rstrUTF8(input) {
  return unescape(encodeURIComponent(input));
}
function rawMD5(s) {
  return rstrMD5(str2rstrUTF8(s));
}
function hexMD5(s) {
  return rstr2hex(rawMD5(s));
}
function rawHMACMD5(k, d) {
  return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
}
function hexHMACMD5(k, d) {
  return rstr2hex(rawHMACMD5(k, d));
}
function md5(string, key, raw) {
  if (!key) {
    if (!raw) {
      return hexMD5(string);
    }
    return rawMD5(string);
  }
  if (!raw) {
    return hexHMACMD5(key, string);
  }
  return rawHMACMD5(key, string);
}
function splitHeaders(headers) {
  const output = new Headers(headers);
  if (headers.has("x-bare-headers")) {
    const value = headers.get("x-bare-headers");
    if (value.length > MAX_HEADER_VALUE) {
      output.delete("x-bare-headers");
      let split = 0;
      for (let i = 0; i < value.length; i += MAX_HEADER_VALUE) {
        const part = value.slice(i, i + MAX_HEADER_VALUE);
        const id = split++;
        output.set(`x-bare-headers-${id}`, `;${part}`);
      }
    }
  }
  return output;
}
function joinHeaders(headers) {
  const output = new Headers(headers);
  const prefix = "x-bare-headers";
  if (headers.has(`${prefix}-0`)) {
    const join = [];
    for (const [header, value] of headers) {
      if (!header.startsWith(prefix)) {
        continue;
      }
      if (!value.startsWith(";")) {
        throw new BareError(400, {
          code: "INVALID_BARE_HEADER",
          id: `request.headers.${header}`,
          message: `Value didn't begin with semi-colon.`
        });
      }
      const id = parseInt(header.slice(prefix.length + 1));
      join[id] = value.slice(1);
      output.delete(header);
    }
    output.set(prefix, join.join(""));
  }
  return output;
}
function validProtocol(protocol) {
  for (let i = 0; i < protocol.length; i++) {
    const char = protocol[i];
    if (!validChars.includes(char)) {
      return false;
    }
  }
  return true;
}
async function fetchManifest(server, signal) {
  const outgoing = await fetch2(server, { signal });
  if (!outgoing.ok) {
    throw new Error(`Unable to fetch Bare meta: ${outgoing.status} ${await outgoing.text()}`);
  }
  return await outgoing.json();
}
function isUrlLike(url) {
  return typeof url === "string" || url instanceof URL;
}
async function createBareClient(server, signal) {
  const manifest = await fetchManifest(server, signal);
  return new BareClient(server, manifest);
}
var fetch2, WebSocket, Request, Response, WebSocketFields, maxRedirects, statusEmpty, statusRedirect, BareError, Client, MAX_HEADER_VALUE, ClientV3, validChars, clientCtors, getRealReadyState, wsProtocols, BareClient;
var init_dist = __esm({
  "node_modules/@tomphttp/bare-client/dist/index.js"() {
    init_dirname();
    init_buffer2();
    init_process2();
    fetch2 = globalThis.fetch;
    WebSocket = globalThis.WebSocket;
    Request = globalThis.Request;
    Response = globalThis.Response;
    WebSocketFields = {
      prototype: {
        send: WebSocket.prototype.send
      },
      CLOSED: WebSocket.CLOSED,
      CLOSING: WebSocket.CLOSING,
      CONNECTING: WebSocket.CONNECTING,
      OPEN: WebSocket.OPEN
    };
    maxRedirects = 20;
    statusEmpty = [101, 204, 205, 304];
    statusRedirect = [301, 302, 303, 307, 308];
    BareError = class extends Error {
      status;
      body;
      constructor(status, body) {
        super(body.message || body.code);
        this.status = status;
        this.body = body;
      }
    };
    Client = class {
      base;
      /**
       *
       * @param version Version provided by extension
       * @param server Bare Server URL provided by BareClient
       */
      constructor(version2, server) {
        this.base = new URL(`./v${version2}/`, server);
      }
    };
    MAX_HEADER_VALUE = 3072;
    ClientV3 = class extends Client {
      ws;
      http;
      constructor(server) {
        super(3, server);
        this.ws = new URL(this.base);
        this.http = new URL(this.base);
        if (this.ws.protocol === "https:") {
          this.ws.protocol = "wss:";
        } else {
          this.ws.protocol = "ws:";
        }
      }
      connect(remote, protocols, getRequestHeaders, onMeta, onReadyState) {
        const ws = new WebSocket(this.ws);
        const cleanup = () => {
          ws.removeEventListener("close", closeListener);
          ws.removeEventListener("message", messageListener);
        };
        const closeListener = () => {
          cleanup();
        };
        const messageListener = (event) => {
          cleanup();
          if (typeof event.data !== "string")
            throw new TypeError("the first websocket message was not a text frame");
          const message = JSON.parse(event.data);
          if (message.type !== "open")
            throw new TypeError("message was not of open type");
          event.stopImmediatePropagation();
          onMeta({
            protocol: message.protocol,
            setCookies: message.setCookies
          });
          onReadyState(WebSocketFields.OPEN);
          ws.dispatchEvent(new Event("open"));
        };
        ws.addEventListener("close", closeListener);
        ws.addEventListener("message", messageListener);
        ws.addEventListener(
          "open",
          (event) => {
            event.stopImmediatePropagation();
            onReadyState(WebSocketFields.CONNECTING);
            getRequestHeaders().then((headers) => WebSocketFields.prototype.send.call(ws, JSON.stringify({
              type: "connect",
              remote: remote.toString(),
              protocols,
              headers,
              forwardHeaders: []
            })));
          },
          // only block the open event once
          { once: true }
        );
        return ws;
      }
      async request(method, requestHeaders, body, remote, cache, duplex, signal) {
        if (remote.protocol.startsWith("blob:")) {
          const response2 = await fetch2(remote);
          const result2 = new Response(response2.body, response2);
          result2.rawHeaders = Object.fromEntries(response2.headers);
          result2.rawResponse = response2;
          return result2;
        }
        const bareHeaders = {};
        if (requestHeaders instanceof Headers) {
          for (const [header, value] of requestHeaders) {
            bareHeaders[header] = value;
          }
        } else {
          for (const header in requestHeaders) {
            bareHeaders[header] = requestHeaders[header];
          }
        }
        const options = {
          credentials: "omit",
          method,
          signal
        };
        if (cache !== "only-if-cached") {
          options.cache = cache;
        }
        if (body !== void 0) {
          options.body = body;
        }
        if (duplex !== void 0) {
          options.duplex = duplex;
        }
        options.headers = this.createBareHeaders(remote, bareHeaders);
        const response = await fetch2(this.http + "?cache=" + md5(remote.toString()), options);
        const readResponse = await this.readBareResponse(response);
        const result = new Response(statusEmpty.includes(readResponse.status) ? void 0 : response.body, {
          status: readResponse.status,
          statusText: readResponse.statusText ?? void 0,
          headers: new Headers(readResponse.headers)
        });
        result.rawHeaders = readResponse.headers;
        result.rawResponse = response;
        return result;
      }
      async readBareResponse(response) {
        if (!response.ok) {
          throw new BareError(response.status, await response.json());
        }
        const responseHeaders = joinHeaders(response.headers);
        const result = {};
        const xBareStatus = responseHeaders.get("x-bare-status");
        if (xBareStatus !== null)
          result.status = parseInt(xBareStatus);
        const xBareStatusText = responseHeaders.get("x-bare-status-text");
        if (xBareStatusText !== null)
          result.statusText = xBareStatusText;
        const xBareHeaders = responseHeaders.get("x-bare-headers");
        if (xBareHeaders !== null)
          result.headers = JSON.parse(xBareHeaders);
        return result;
      }
      createBareHeaders(remote, bareHeaders, forwardHeaders = [], passHeaders = [], passStatus = []) {
        const headers = new Headers();
        headers.set("x-bare-url", remote.toString());
        headers.set("x-bare-headers", JSON.stringify(bareHeaders));
        for (const header of forwardHeaders) {
          headers.append("x-bare-forward-headers", header);
        }
        for (const header of passHeaders) {
          headers.append("x-bare-pass-headers", header);
        }
        for (const status of passStatus) {
          headers.append("x-bare-pass-status", status.toString());
        }
        splitHeaders(headers);
        return headers;
      }
    };
    validChars = "!#$%&'*+-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~";
    clientCtors = [
      ["v3", ClientV3]
    ];
    getRealReadyState = Object.getOwnPropertyDescriptor(WebSocket.prototype, "readyState").get;
    wsProtocols = ["ws:", "wss:"];
    BareClient = class {
      manifest;
      client;
      server;
      working;
      onDemand;
      onDemandSignal;
      constructor(server, _) {
        this.server = new URL(server);
        if (!_ || _ instanceof AbortSignal) {
          this.onDemand = true;
          this.onDemandSignal = _;
        } else {
          this.onDemand = false;
          this.loadManifest(_);
        }
      }
      loadManifest(manifest) {
        this.manifest = manifest;
        this.client = this.getClient();
        return this.client;
      }
      demand() {
        if (!this.onDemand)
          return this.client;
        if (!this.working)
          this.working = fetchManifest(this.server, this.onDemandSignal).then((manifest) => this.loadManifest(manifest)).catch((err) => {
            delete this.working;
            throw err;
          });
        return this.working;
      }
      getClient() {
        for (const [version2, ctor] of clientCtors)
          if (this.manifest.versions.includes(version2))
            return new ctor(this.server);
        throw new Error("Unable to find compatible client version. Starting from v2.0.0, @tomphttp/bare-client only supports Bare servers v3+. For more information, see https://github.com/tomphttp/bare-client/");
      }
      createWebSocket(remote, protocols = [], options) {
        if (!this.client)
          throw new TypeError("You need to wait for the client to finish fetching the manifest before creating any WebSockets. Try caching the manifest data before making this request.");
        try {
          remote = new URL(remote);
        } catch (err) {
          throw new DOMException(`Faiiled to construct 'WebSocket': The URL '${remote}' is invalid.`);
        }
        if (!wsProtocols.includes(remote.protocol))
          throw new DOMException(`Failed to construct 'WebSocket': The URL's scheme must be either 'ws' or 'wss'. '${remote.protocol}' is not allowed.`);
        if (!Array.isArray(protocols))
          protocols = [protocols];
        protocols = protocols.map(String);
        for (const proto of protocols)
          if (!validProtocol(proto))
            throw new DOMException(`Failed to construct 'WebSocket': The subprotocol '${proto}' is invalid.`);
        const socket = this.client.connect(remote, protocols, async () => {
          const resolvedHeaders = typeof options.headers === "function" ? await options.headers() : options.headers || {};
          const requestHeaders = resolvedHeaders instanceof Headers ? Object.fromEntries(resolvedHeaders) : resolvedHeaders;
          requestHeaders["Host"] = remote.host;
          requestHeaders["Pragma"] = "no-cache";
          requestHeaders["Cache-Control"] = "no-cache";
          requestHeaders["Upgrade"] = "websocket";
          requestHeaders["Connection"] = "Upgrade";
          return requestHeaders;
        }, (meta) => {
          fakeProtocol = meta.protocol;
          if (options.setCookiesCallback)
            options.setCookiesCallback(meta.setCookies);
        }, (readyState) => {
          fakeReadyState = readyState;
        }, options.webSocketImpl || WebSocket);
        let fakeProtocol = "";
        let fakeReadyState = WebSocketFields.CONNECTING;
        const getReadyState = () => {
          const realReadyState = getRealReadyState.call(socket);
          return realReadyState === WebSocketFields.OPEN ? fakeReadyState : realReadyState;
        };
        if (options.readyStateHook)
          options.readyStateHook(socket, getReadyState);
        else {
          Object.defineProperty(socket, "readyState", {
            get: getReadyState,
            configurable: true,
            enumerable: true
          });
        }
        const getSendError = () => {
          const readyState = getReadyState();
          if (readyState === WebSocketFields.CONNECTING)
            return new DOMException("Failed to execute 'send' on 'WebSocket': Still in CONNECTING state.");
        };
        if (options.sendErrorHook)
          options.sendErrorHook(socket, getSendError);
        else {
          socket.send = function(...args) {
            const error = getSendError();
            if (error)
              throw error;
            else
              WebSocketFields.prototype.send.call(this, ...args);
          };
        }
        if (options.urlHook)
          options.urlHook(socket, remote);
        else
          Object.defineProperty(socket, "url", {
            get: () => remote.toString(),
            configurable: true,
            enumerable: true
          });
        const getProtocol = () => fakeProtocol;
        if (options.protocolHook)
          options.protocolHook(socket, getProtocol);
        else
          Object.defineProperty(socket, "protocol", {
            get: getProtocol,
            configurable: true,
            enumerable: true
          });
        return socket;
      }
      async fetch(url, init) {
        const req = isUrlLike(url) ? new Request(url, init) : url;
        const inputHeaders = init?.headers || req.headers;
        const headers = inputHeaders instanceof Headers ? Object.fromEntries(inputHeaders) : inputHeaders;
        const duplex = init?.duplex;
        const body = init?.body || req.body;
        let urlO = new URL(req.url);
        const client = await this.demand();
        for (let i = 0; ; i++) {
          if ("host" in headers)
            headers.host = urlO.host;
          else
            headers.Host = urlO.host;
          const response = await client.request(req.method, headers, body, urlO, req.cache, duplex, req.signal);
          response.finalURL = urlO.toString();
          const redirect = init?.redirect || req.redirect;
          if (statusRedirect.includes(response.status)) {
            switch (redirect) {
              case "follow": {
                const location2 = response.headers.get("location");
                if (maxRedirects > i && location2 !== null) {
                  urlO = new URL(location2, urlO);
                  continue;
                } else
                  throw new TypeError("Failed to fetch");
              }
              case "error":
                throw new TypeError("Failed to fetch");
              case "manual":
                return response;
            }
          } else {
            return response;
          }
        }
      }
    };
  }
});

// node_modules/filer/dist/filer.min.js
var require_filer_min = __commonJS({
  "node_modules/filer/dist/filer.min.js"(exports2, module) {
    init_dirname();
    init_buffer2();
    init_process2();
    parcelRequire = function(e, r, t, n) {
      var i, o = "function" == typeof parcelRequire && parcelRequire, u = "function" == typeof __require && __require;
      function f(t2, n2) {
        if (!r[t2]) {
          if (!e[t2]) {
            var i2 = "function" == typeof parcelRequire && parcelRequire;
            if (!n2 && i2)
              return i2(t2, true);
            if (o)
              return o(t2, true);
            if (u && "string" == typeof t2)
              return u(t2);
            var c2 = new Error("Cannot find module '" + t2 + "'");
            throw c2.code = "MODULE_NOT_FOUND", c2;
          }
          p.resolve = function(r2) {
            return e[t2][1][r2] || r2;
          }, p.cache = {};
          var l2 = r[t2] = new f.Module(t2);
          e[t2][0].call(l2.exports, p, l2, l2.exports, this);
        }
        return r[t2].exports;
        function p(e2) {
          return f(p.resolve(e2));
        }
      }
      f.isParcelRequire = true, f.Module = function(e2) {
        this.id = e2, this.bundle = f, this.exports = {};
      }, f.modules = e, f.cache = r, f.parent = o, f.register = function(r2, t2) {
        e[r2] = [function(e2, r3) {
          r3.exports = t2;
        }, {}];
      };
      for (var c = 0; c < t.length; c++)
        try {
          f(t[c]);
        } catch (e2) {
          i || (i = e2);
        }
      if (t.length) {
        var l = f(t[t.length - 1]);
        "object" == typeof exports2 && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function() {
          return l;
        }) : n && (this[n] = l);
      }
      if (parcelRequire = f, i)
        throw i;
      return f;
    }({ "b1ZG": [function(require2, module2, exports3) {
      "use strict";
      Object.defineProperty(exports3, "__esModule", { value: true }), exports3.promisify = e;
      var r = "__ES6-PROMISIFY--CUSTOM-ARGUMENTS__";
      function e(o) {
        if ("function" != typeof o)
          throw new TypeError("Argument to promisify must be a function");
        var n = o[r], t = e.Promise || Promise;
        if ("function" != typeof t)
          throw new Error("No Promise implementation found; do you need a polyfill?");
        return function() {
          for (var r2 = this, e2 = arguments.length, i = Array(e2), f = 0; f < e2; f++)
            i[f] = arguments[f];
          return new t(function(e3, t2) {
            i.push(function(r3) {
              if (r3)
                return t2(r3);
              for (var o2 = arguments.length, i2 = Array(1 < o2 ? o2 - 1 : 0), f2 = 1; f2 < o2; f2++)
                i2[f2 - 1] = arguments[f2];
              if (1 === i2.length || !n)
                return e3(i2[0]);
              var u = {};
              i2.forEach(function(r4, e4) {
                var o3 = n[e4];
                o3 && (u[o3] = r4);
              }), e3(u);
            }), o.apply(r2, i);
          });
        };
      }
      e.argumentNames = "__ES6-PROMISIFY--CUSTOM-ARGUMENTS__", e.Promise = void 0;
    }, {}], "pBGv": [function(require2, module2, exports3) {
      var t, e, n = module2.exports = {};
      function r() {
        throw new Error("setTimeout has not been defined");
      }
      function o() {
        throw new Error("clearTimeout has not been defined");
      }
      function i(e2) {
        if (t === setTimeout)
          return setTimeout(e2, 0);
        if ((t === r || !t) && setTimeout)
          return t = setTimeout, setTimeout(e2, 0);
        try {
          return t(e2, 0);
        } catch (n2) {
          try {
            return t.call(null, e2, 0);
          } catch (n3) {
            return t.call(this, e2, 0);
          }
        }
      }
      function u(t2) {
        if (e === clearTimeout)
          return clearTimeout(t2);
        if ((e === o || !e) && clearTimeout)
          return e = clearTimeout, clearTimeout(t2);
        try {
          return e(t2);
        } catch (n2) {
          try {
            return e.call(null, t2);
          } catch (n3) {
            return e.call(this, t2);
          }
        }
      }
      !function() {
        try {
          t = "function" == typeof setTimeout ? setTimeout : r;
        } catch (n2) {
          t = r;
        }
        try {
          e = "function" == typeof clearTimeout ? clearTimeout : o;
        } catch (n2) {
          e = o;
        }
      }();
      var c, s = [], l = false, a = -1;
      function f() {
        l && c && (l = false, c.length ? s = c.concat(s) : a = -1, s.length && h());
      }
      function h() {
        if (!l) {
          var t2 = i(f);
          l = true;
          for (var e2 = s.length; e2; ) {
            for (c = s, s = []; ++a < e2; )
              c && c[a].run();
            a = -1, e2 = s.length;
          }
          c = null, l = false, u(t2);
        }
      }
      function m(t2, e2) {
        this.fun = t2, this.array = e2;
      }
      function p() {
      }
      n.nextTick = function(t2) {
        var e2 = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n2 = 1; n2 < arguments.length; n2++)
            e2[n2 - 1] = arguments[n2];
        s.push(new m(t2, e2)), 1 !== s.length || l || i(h);
      }, m.prototype.run = function() {
        this.fun.apply(null, this.array);
      }, n.title = "browser", n.env = {}, n.argv = [], n.version = "", n.versions = {}, n.on = p, n.addListener = p, n.once = p, n.off = p, n.removeListener = p, n.removeAllListeners = p, n.emit = p, n.prependListener = p, n.prependOnceListener = p, n.listeners = function(t2) {
        return [];
      }, n.binding = function(t2) {
        throw new Error("process.binding is not supported");
      }, n.cwd = function() {
        return "/";
      }, n.chdir = function(t2) {
        throw new Error("process.chdir is not supported");
      }, n.umask = function() {
        return 0;
      };
    }, {}], "UUq2": [function(require2, module2, exports3) {
      var process2 = require2("process");
      var r = require2("process");
      function t(r2, t2) {
        for (var e2 = 0, n2 = r2.length - 1; n2 >= 0; n2--) {
          var o2 = r2[n2];
          "." === o2 ? r2.splice(n2, 1) : ".." === o2 ? (r2.splice(n2, 1), e2++) : e2 && (r2.splice(n2, 1), e2--);
        }
        if (t2)
          for (; e2--; e2)
            r2.unshift("..");
        return r2;
      }
      function e(r2) {
        "string" != typeof r2 && (r2 += "");
        var t2, e2 = 0, n2 = -1, o2 = true;
        for (t2 = r2.length - 1; t2 >= 0; --t2)
          if (47 === r2.charCodeAt(t2)) {
            if (!o2) {
              e2 = t2 + 1;
              break;
            }
          } else
            -1 === n2 && (o2 = false, n2 = t2 + 1);
        return -1 === n2 ? "" : r2.slice(e2, n2);
      }
      function n(r2, t2) {
        if (r2.filter)
          return r2.filter(t2);
        for (var e2 = [], n2 = 0; n2 < r2.length; n2++)
          t2(r2[n2], n2, r2) && e2.push(r2[n2]);
        return e2;
      }
      exports3.resolve = function() {
        for (var e2 = "", o2 = false, s = arguments.length - 1; s >= -1 && !o2; s--) {
          var i = s >= 0 ? arguments[s] : r.cwd();
          if ("string" != typeof i)
            throw new TypeError("Arguments to path.resolve must be strings");
          i && (e2 = i + "/" + e2, o2 = "/" === i.charAt(0));
        }
        return (o2 ? "/" : "") + (e2 = t(n(e2.split("/"), function(r2) {
          return !!r2;
        }), !o2).join("/")) || ".";
      }, exports3.normalize = function(r2) {
        var e2 = exports3.isAbsolute(r2), s = "/" === o(r2, -1);
        return (r2 = t(n(r2.split("/"), function(r3) {
          return !!r3;
        }), !e2).join("/")) || e2 || (r2 = "."), r2 && s && (r2 += "/"), (e2 ? "/" : "") + r2;
      }, exports3.isAbsolute = function(r2) {
        return "/" === r2.charAt(0);
      }, exports3.join = function() {
        var r2 = Array.prototype.slice.call(arguments, 0);
        return exports3.normalize(n(r2, function(r3, t2) {
          if ("string" != typeof r3)
            throw new TypeError("Arguments to path.join must be strings");
          return r3;
        }).join("/"));
      }, exports3.relative = function(r2, t2) {
        function e2(r3) {
          for (var t3 = 0; t3 < r3.length && "" === r3[t3]; t3++)
            ;
          for (var e3 = r3.length - 1; e3 >= 0 && "" === r3[e3]; e3--)
            ;
          return t3 > e3 ? [] : r3.slice(t3, e3 - t3 + 1);
        }
        r2 = exports3.resolve(r2).substr(1), t2 = exports3.resolve(t2).substr(1);
        for (var n2 = e2(r2.split("/")), o2 = e2(t2.split("/")), s = Math.min(n2.length, o2.length), i = s, u = 0; u < s; u++)
          if (n2[u] !== o2[u]) {
            i = u;
            break;
          }
        var f = [];
        for (u = i; u < n2.length; u++)
          f.push("..");
        return (f = f.concat(o2.slice(i))).join("/");
      }, exports3.sep = "/", exports3.delimiter = ":", exports3.dirname = function(r2) {
        if ("string" != typeof r2 && (r2 += ""), 0 === r2.length)
          return ".";
        for (var t2 = r2.charCodeAt(0), e2 = 47 === t2, n2 = -1, o2 = true, s = r2.length - 1; s >= 1; --s)
          if (47 === (t2 = r2.charCodeAt(s))) {
            if (!o2) {
              n2 = s;
              break;
            }
          } else
            o2 = false;
        return -1 === n2 ? e2 ? "/" : "." : e2 && 1 === n2 ? "/" : r2.slice(0, n2);
      }, exports3.basename = function(r2, t2) {
        var n2 = e(r2);
        return t2 && n2.substr(-1 * t2.length) === t2 && (n2 = n2.substr(0, n2.length - t2.length)), n2;
      }, exports3.extname = function(r2) {
        "string" != typeof r2 && (r2 += "");
        for (var t2 = -1, e2 = 0, n2 = -1, o2 = true, s = 0, i = r2.length - 1; i >= 0; --i) {
          var u = r2.charCodeAt(i);
          if (47 !== u)
            -1 === n2 && (o2 = false, n2 = i + 1), 46 === u ? -1 === t2 ? t2 = i : 1 !== s && (s = 1) : -1 !== t2 && (s = -1);
          else if (!o2) {
            e2 = i + 1;
            break;
          }
        }
        return -1 === t2 || -1 === n2 || 0 === s || 1 === s && t2 === n2 - 1 && t2 === e2 + 1 ? "" : r2.slice(t2, n2);
      };
      var o = "b" === "ab".substr(-1) ? function(r2, t2, e2) {
        return r2.substr(t2, e2);
      } : function(r2, t2, e2) {
        return t2 < 0 && (t2 = r2.length + t2), r2.substr(t2, e2);
      };
    }, { "process": "pBGv" }], "UzoP": [function(require2, module2, exports3) {
      var process2 = require2("process");
      var r = require2("process");
      r.cwd = function() {
        return "/";
      };
      var e = require2("path"), n = Object.assign({}, e);
      n.basename = function(r2, n2) {
        var i = e.basename(r2, n2);
        return "" === i ? "/" : i;
      }, n.normalize = function(r2) {
        return "/" === (r2 = e.normalize(r2)) ? r2 : n.removeTrailing(r2);
      }, n.isNull = function(r2) {
        return -1 !== ("" + r2).indexOf("\0");
      }, n.addTrailing = function(r2) {
        return r2.replace(/\/*$/, "/");
      }, n.removeTrailing = function(r2) {
        return "" === (r2 = r2.replace(/\/*$/, "")) ? "/" : r2;
      }, module2.exports = n;
    }, { "path": "UUq2", "process": "pBGv" }], "iJA9": [function(require2, module2, exports3) {
      var _ = "READ", E = "WRITE", O = "CREATE", R = "EXCLUSIVE", I = "TRUNCATE", S = "APPEND", T = "CREATE", N = "REPLACE";
      module2.exports = { FILE_SYSTEM_NAME: "local", FILE_STORE_NAME: "files", IDB_RO: "readonly", IDB_RW: "readwrite", WSQL_VERSION: "1", WSQL_SIZE: 5242880, WSQL_DESC: "FileSystem Storage", NODE_TYPE_FILE: "FILE", NODE_TYPE_DIRECTORY: "DIRECTORY", NODE_TYPE_SYMBOLIC_LINK: "SYMLINK", NODE_TYPE_META: "META", DEFAULT_DIR_PERMISSIONS: 493, DEFAULT_FILE_PERMISSIONS: 420, FULL_READ_WRITE_EXEC_PERMISSIONS: 511, READ_WRITE_PERMISSIONS: 438, SYMLOOP_MAX: 10, BINARY_MIME_TYPE: "application/octet-stream", JSON_MIME_TYPE: "application/json", ROOT_DIRECTORY_NAME: "/", FS_FORMAT: "FORMAT", FS_NOCTIME: "NOCTIME", FS_NOMTIME: "NOMTIME", FS_NODUPEIDCHECK: "FS_NODUPEIDCHECK", O_READ: _, O_WRITE: E, O_CREATE: O, O_EXCLUSIVE: R, O_TRUNCATE: I, O_APPEND: S, O_FLAGS: { r: [_], "r+": [_, E], w: [E, O, I], "w+": [E, _, O, I], wx: [E, O, R, I], "wx+": [E, _, O, R, I], a: [E, O, S], "a+": [E, _, O, S], ax: [E, O, R, S], "ax+": [E, _, O, R, S] }, XATTR_CREATE: T, XATTR_REPLACE: N, FS_READY: "READY", FS_PENDING: "PENDING", FS_ERROR: "ERROR", SUPER_NODE_ID: "00000000-0000-0000-0000-000000000000", STDIN: 0, STDOUT: 1, STDERR: 2, FIRST_DESCRIPTOR: 3, ENVIRONMENT: { TMP: "/tmp", PATH: "" }, fsConstants: { O_RDONLY: 0, O_WRONLY: 1, O_RDWR: 2, S_IFMT: 61440, S_IFREG: 32768, S_IFDIR: 16384, S_IFCHR: 8192, S_IFBLK: 24576, S_IFIFO: 4096, S_IFLNK: 40960, S_IFSOCK: 49152, O_CREAT: 512, O_EXCL: 2048, O_NOCTTY: 131072, O_TRUNC: 1024, O_APPEND: 8, O_DIRECTORY: 1048576, O_NOFOLLOW: 256, O_SYNC: 128, O_DSYNC: 4194304, O_SYMLINK: 2097152, O_NONBLOCK: 4, S_IRWXU: 448, S_IRUSR: 256, S_IWUSR: 128, S_IXUSR: 64, S_IRWXG: 56, S_IRGRP: 32, S_IWGRP: 16, S_IXGRP: 8, S_IRWXO: 7, S_IROTH: 4, S_IWOTH: 2, S_IXOTH: 1, F_OK: 0, R_OK: 4, W_OK: 2, X_OK: 1, UV_FS_COPYFILE_EXCL: 1, COPYFILE_EXCL: 1 } };
    }, {}], "yh9p": [function(require2, module2, exports3) {
      "use strict";
      exports3.byteLength = u, exports3.toByteArray = i, exports3.fromByteArray = d;
      for (var r = [], t = [], e = "undefined" != typeof Uint8Array ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, a = n.length; o < a; ++o)
        r[o] = n[o], t[n.charCodeAt(o)] = o;
      function h(r2) {
        var t2 = r2.length;
        if (t2 % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
        var e2 = r2.indexOf("=");
        return -1 === e2 && (e2 = t2), [e2, e2 === t2 ? 0 : 4 - e2 % 4];
      }
      function u(r2) {
        var t2 = h(r2), e2 = t2[0], n2 = t2[1];
        return 3 * (e2 + n2) / 4 - n2;
      }
      function c(r2, t2, e2) {
        return 3 * (t2 + e2) / 4 - e2;
      }
      function i(r2) {
        var n2, o2, a2 = h(r2), u2 = a2[0], i2 = a2[1], f2 = new e(c(r2, u2, i2)), A2 = 0, d2 = i2 > 0 ? u2 - 4 : u2;
        for (o2 = 0; o2 < d2; o2 += 4)
          n2 = t[r2.charCodeAt(o2)] << 18 | t[r2.charCodeAt(o2 + 1)] << 12 | t[r2.charCodeAt(o2 + 2)] << 6 | t[r2.charCodeAt(o2 + 3)], f2[A2++] = n2 >> 16 & 255, f2[A2++] = n2 >> 8 & 255, f2[A2++] = 255 & n2;
        return 2 === i2 && (n2 = t[r2.charCodeAt(o2)] << 2 | t[r2.charCodeAt(o2 + 1)] >> 4, f2[A2++] = 255 & n2), 1 === i2 && (n2 = t[r2.charCodeAt(o2)] << 10 | t[r2.charCodeAt(o2 + 1)] << 4 | t[r2.charCodeAt(o2 + 2)] >> 2, f2[A2++] = n2 >> 8 & 255, f2[A2++] = 255 & n2), f2;
      }
      function f(t2) {
        return r[t2 >> 18 & 63] + r[t2 >> 12 & 63] + r[t2 >> 6 & 63] + r[63 & t2];
      }
      function A(r2, t2, e2) {
        for (var n2, o2 = [], a2 = t2; a2 < e2; a2 += 3)
          n2 = (r2[a2] << 16 & 16711680) + (r2[a2 + 1] << 8 & 65280) + (255 & r2[a2 + 2]), o2.push(f(n2));
        return o2.join("");
      }
      function d(t2) {
        for (var e2, n2 = t2.length, o2 = n2 % 3, a2 = [], h2 = 0, u2 = n2 - o2; h2 < u2; h2 += 16383)
          a2.push(A(t2, h2, h2 + 16383 > u2 ? u2 : h2 + 16383));
        return 1 === o2 ? (e2 = t2[n2 - 1], a2.push(r[e2 >> 2] + r[e2 << 4 & 63] + "==")) : 2 === o2 && (e2 = (t2[n2 - 2] << 8) + t2[n2 - 1], a2.push(r[e2 >> 10] + r[e2 >> 4 & 63] + r[e2 << 2 & 63] + "=")), a2.join("");
      }
      t["-".charCodeAt(0)] = 62, t["_".charCodeAt(0)] = 63;
    }, {}], "JgNJ": [function(require2, module2, exports3) {
      exports3.read = function(a, o, t, r, h) {
        var M, p, w = 8 * h - r - 1, f = (1 << w) - 1, e = f >> 1, i = -7, N = t ? h - 1 : 0, n = t ? -1 : 1, s = a[o + N];
        for (N += n, M = s & (1 << -i) - 1, s >>= -i, i += w; i > 0; M = 256 * M + a[o + N], N += n, i -= 8)
          ;
        for (p = M & (1 << -i) - 1, M >>= -i, i += r; i > 0; p = 256 * p + a[o + N], N += n, i -= 8)
          ;
        if (0 === M)
          M = 1 - e;
        else {
          if (M === f)
            return p ? NaN : 1 / 0 * (s ? -1 : 1);
          p += Math.pow(2, r), M -= e;
        }
        return (s ? -1 : 1) * p * Math.pow(2, M - r);
      }, exports3.write = function(a, o, t, r, h, M) {
        var p, w, f, e = 8 * M - h - 1, i = (1 << e) - 1, N = i >> 1, n = 23 === h ? Math.pow(2, -24) - Math.pow(2, -77) : 0, s = r ? 0 : M - 1, u = r ? 1 : -1, l = o < 0 || 0 === o && 1 / o < 0 ? 1 : 0;
        for (o = Math.abs(o), isNaN(o) || o === 1 / 0 ? (w = isNaN(o) ? 1 : 0, p = i) : (p = Math.floor(Math.log(o) / Math.LN2), o * (f = Math.pow(2, -p)) < 1 && (p--, f *= 2), (o += p + N >= 1 ? n / f : n * Math.pow(2, 1 - N)) * f >= 2 && (p++, f /= 2), p + N >= i ? (w = 0, p = i) : p + N >= 1 ? (w = (o * f - 1) * Math.pow(2, h), p += N) : (w = o * Math.pow(2, N - 1) * Math.pow(2, h), p = 0)); h >= 8; a[t + s] = 255 & w, s += u, w /= 256, h -= 8)
          ;
        for (p = p << h | w, e += h; e > 0; a[t + s] = 255 & p, s += u, p /= 256, e -= 8)
          ;
        a[t + s - u] |= 128 * l;
      };
    }, {}], "REa7": [function(require2, module2, exports3) {
      var r = {}.toString;
      module2.exports = Array.isArray || function(t) {
        return "[object Array]" == r.call(t);
      };
    }, {}], "dskh": [function(require2, module2, exports3) {
      var global = arguments[3];
      var t = arguments[3], r = require2("base64-js"), e = require2("ieee754"), n = require2("isarray");
      function i() {
        try {
          var t2 = new Uint8Array(1);
          return t2.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
            return 42;
          } }, 42 === t2.foo() && "function" == typeof t2.subarray && 0 === t2.subarray(1, 1).byteLength;
        } catch (r2) {
          return false;
        }
      }
      function o() {
        return f.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function u(t2, r2) {
        if (o() < r2)
          throw new RangeError("Invalid typed array length");
        return f.TYPED_ARRAY_SUPPORT ? (t2 = new Uint8Array(r2)).__proto__ = f.prototype : (null === t2 && (t2 = new f(r2)), t2.length = r2), t2;
      }
      function f(t2, r2, e2) {
        if (!(f.TYPED_ARRAY_SUPPORT || this instanceof f))
          return new f(t2, r2, e2);
        if ("number" == typeof t2) {
          if ("string" == typeof r2)
            throw new Error("If encoding is specified then the first argument must be a string");
          return c(this, t2);
        }
        return s(this, t2, r2, e2);
      }
      function s(t2, r2, e2, n2) {
        if ("number" == typeof r2)
          throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && r2 instanceof ArrayBuffer ? g(t2, r2, e2, n2) : "string" == typeof r2 ? l(t2, r2, e2) : y(t2, r2);
      }
      function h(t2) {
        if ("number" != typeof t2)
          throw new TypeError('"size" argument must be a number');
        if (t2 < 0)
          throw new RangeError('"size" argument must not be negative');
      }
      function a(t2, r2, e2, n2) {
        return h(r2), r2 <= 0 ? u(t2, r2) : void 0 !== e2 ? "string" == typeof n2 ? u(t2, r2).fill(e2, n2) : u(t2, r2).fill(e2) : u(t2, r2);
      }
      function c(t2, r2) {
        if (h(r2), t2 = u(t2, r2 < 0 ? 0 : 0 | w(r2)), !f.TYPED_ARRAY_SUPPORT)
          for (var e2 = 0; e2 < r2; ++e2)
            t2[e2] = 0;
        return t2;
      }
      function l(t2, r2, e2) {
        if ("string" == typeof e2 && "" !== e2 || (e2 = "utf8"), !f.isEncoding(e2))
          throw new TypeError('"encoding" must be a valid string encoding');
        var n2 = 0 | v(r2, e2), i2 = (t2 = u(t2, n2)).write(r2, e2);
        return i2 !== n2 && (t2 = t2.slice(0, i2)), t2;
      }
      function p(t2, r2) {
        var e2 = r2.length < 0 ? 0 : 0 | w(r2.length);
        t2 = u(t2, e2);
        for (var n2 = 0; n2 < e2; n2 += 1)
          t2[n2] = 255 & r2[n2];
        return t2;
      }
      function g(t2, r2, e2, n2) {
        if (r2.byteLength, e2 < 0 || r2.byteLength < e2)
          throw new RangeError("'offset' is out of bounds");
        if (r2.byteLength < e2 + (n2 || 0))
          throw new RangeError("'length' is out of bounds");
        return r2 = void 0 === e2 && void 0 === n2 ? new Uint8Array(r2) : void 0 === n2 ? new Uint8Array(r2, e2) : new Uint8Array(r2, e2, n2), f.TYPED_ARRAY_SUPPORT ? (t2 = r2).__proto__ = f.prototype : t2 = p(t2, r2), t2;
      }
      function y(t2, r2) {
        if (f.isBuffer(r2)) {
          var e2 = 0 | w(r2.length);
          return 0 === (t2 = u(t2, e2)).length ? t2 : (r2.copy(t2, 0, 0, e2), t2);
        }
        if (r2) {
          if ("undefined" != typeof ArrayBuffer && r2.buffer instanceof ArrayBuffer || "length" in r2)
            return "number" != typeof r2.length || W(r2.length) ? u(t2, 0) : p(t2, r2);
          if ("Buffer" === r2.type && n(r2.data))
            return p(t2, r2.data);
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }
      function w(t2) {
        if (t2 >= o())
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
        return 0 | t2;
      }
      function d(t2) {
        return +t2 != t2 && (t2 = 0), f.alloc(+t2);
      }
      function v(t2, r2) {
        if (f.isBuffer(t2))
          return t2.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t2) || t2 instanceof ArrayBuffer))
          return t2.byteLength;
        "string" != typeof t2 && (t2 = "" + t2);
        var e2 = t2.length;
        if (0 === e2)
          return 0;
        for (var n2 = false; ; )
          switch (r2) {
            case "ascii":
            case "latin1":
            case "binary":
              return e2;
            case "utf8":
            case "utf-8":
            case void 0:
              return $(t2).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * e2;
            case "hex":
              return e2 >>> 1;
            case "base64":
              return K(t2).length;
            default:
              if (n2)
                return $(t2).length;
              r2 = ("" + r2).toLowerCase(), n2 = true;
          }
      }
      function E(t2, r2, e2) {
        var n2 = false;
        if ((void 0 === r2 || r2 < 0) && (r2 = 0), r2 > this.length)
          return "";
        if ((void 0 === e2 || e2 > this.length) && (e2 = this.length), e2 <= 0)
          return "";
        if ((e2 >>>= 0) <= (r2 >>>= 0))
          return "";
        for (t2 || (t2 = "utf8"); ; )
          switch (t2) {
            case "hex":
              return x(this, r2, e2);
            case "utf8":
            case "utf-8":
              return Y(this, r2, e2);
            case "ascii":
              return L(this, r2, e2);
            case "latin1":
            case "binary":
              return D(this, r2, e2);
            case "base64":
              return S(this, r2, e2);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return C(this, r2, e2);
            default:
              if (n2)
                throw new TypeError("Unknown encoding: " + t2);
              t2 = (t2 + "").toLowerCase(), n2 = true;
          }
      }
      function b(t2, r2, e2) {
        var n2 = t2[r2];
        t2[r2] = t2[e2], t2[e2] = n2;
      }
      function R(t2, r2, e2, n2, i2) {
        if (0 === t2.length)
          return -1;
        if ("string" == typeof e2 ? (n2 = e2, e2 = 0) : e2 > 2147483647 ? e2 = 2147483647 : e2 < -2147483648 && (e2 = -2147483648), e2 = +e2, isNaN(e2) && (e2 = i2 ? 0 : t2.length - 1), e2 < 0 && (e2 = t2.length + e2), e2 >= t2.length) {
          if (i2)
            return -1;
          e2 = t2.length - 1;
        } else if (e2 < 0) {
          if (!i2)
            return -1;
          e2 = 0;
        }
        if ("string" == typeof r2 && (r2 = f.from(r2, n2)), f.isBuffer(r2))
          return 0 === r2.length ? -1 : _(t2, r2, e2, n2, i2);
        if ("number" == typeof r2)
          return r2 &= 255, f.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i2 ? Uint8Array.prototype.indexOf.call(t2, r2, e2) : Uint8Array.prototype.lastIndexOf.call(t2, r2, e2) : _(t2, [r2], e2, n2, i2);
        throw new TypeError("val must be string, number or Buffer");
      }
      function _(t2, r2, e2, n2, i2) {
        var o2, u2 = 1, f2 = t2.length, s2 = r2.length;
        if (void 0 !== n2 && ("ucs2" === (n2 = String(n2).toLowerCase()) || "ucs-2" === n2 || "utf16le" === n2 || "utf-16le" === n2)) {
          if (t2.length < 2 || r2.length < 2)
            return -1;
          u2 = 2, f2 /= 2, s2 /= 2, e2 /= 2;
        }
        function h2(t3, r3) {
          return 1 === u2 ? t3[r3] : t3.readUInt16BE(r3 * u2);
        }
        if (i2) {
          var a2 = -1;
          for (o2 = e2; o2 < f2; o2++)
            if (h2(t2, o2) === h2(r2, -1 === a2 ? 0 : o2 - a2)) {
              if (-1 === a2 && (a2 = o2), o2 - a2 + 1 === s2)
                return a2 * u2;
            } else
              -1 !== a2 && (o2 -= o2 - a2), a2 = -1;
        } else
          for (e2 + s2 > f2 && (e2 = f2 - s2), o2 = e2; o2 >= 0; o2--) {
            for (var c2 = true, l2 = 0; l2 < s2; l2++)
              if (h2(t2, o2 + l2) !== h2(r2, l2)) {
                c2 = false;
                break;
              }
            if (c2)
              return o2;
          }
        return -1;
      }
      function A(t2, r2, e2, n2) {
        e2 = Number(e2) || 0;
        var i2 = t2.length - e2;
        n2 ? (n2 = Number(n2)) > i2 && (n2 = i2) : n2 = i2;
        var o2 = r2.length;
        if (o2 % 2 != 0)
          throw new TypeError("Invalid hex string");
        n2 > o2 / 2 && (n2 = o2 / 2);
        for (var u2 = 0; u2 < n2; ++u2) {
          var f2 = parseInt(r2.substr(2 * u2, 2), 16);
          if (isNaN(f2))
            return u2;
          t2[e2 + u2] = f2;
        }
        return u2;
      }
      function m(t2, r2, e2, n2) {
        return Q($(r2, t2.length - e2), t2, e2, n2);
      }
      function P(t2, r2, e2, n2) {
        return Q(G(r2), t2, e2, n2);
      }
      function T(t2, r2, e2, n2) {
        return P(t2, r2, e2, n2);
      }
      function B(t2, r2, e2, n2) {
        return Q(K(r2), t2, e2, n2);
      }
      function U(t2, r2, e2, n2) {
        return Q(H(r2, t2.length - e2), t2, e2, n2);
      }
      function S(t2, e2, n2) {
        return 0 === e2 && n2 === t2.length ? r.fromByteArray(t2) : r.fromByteArray(t2.slice(e2, n2));
      }
      function Y(t2, r2, e2) {
        e2 = Math.min(t2.length, e2);
        for (var n2 = [], i2 = r2; i2 < e2; ) {
          var o2, u2, f2, s2, h2 = t2[i2], a2 = null, c2 = h2 > 239 ? 4 : h2 > 223 ? 3 : h2 > 191 ? 2 : 1;
          if (i2 + c2 <= e2)
            switch (c2) {
              case 1:
                h2 < 128 && (a2 = h2);
                break;
              case 2:
                128 == (192 & (o2 = t2[i2 + 1])) && (s2 = (31 & h2) << 6 | 63 & o2) > 127 && (a2 = s2);
                break;
              case 3:
                o2 = t2[i2 + 1], u2 = t2[i2 + 2], 128 == (192 & o2) && 128 == (192 & u2) && (s2 = (15 & h2) << 12 | (63 & o2) << 6 | 63 & u2) > 2047 && (s2 < 55296 || s2 > 57343) && (a2 = s2);
                break;
              case 4:
                o2 = t2[i2 + 1], u2 = t2[i2 + 2], f2 = t2[i2 + 3], 128 == (192 & o2) && 128 == (192 & u2) && 128 == (192 & f2) && (s2 = (15 & h2) << 18 | (63 & o2) << 12 | (63 & u2) << 6 | 63 & f2) > 65535 && s2 < 1114112 && (a2 = s2);
            }
          null === a2 ? (a2 = 65533, c2 = 1) : a2 > 65535 && (a2 -= 65536, n2.push(a2 >>> 10 & 1023 | 55296), a2 = 56320 | 1023 & a2), n2.push(a2), i2 += c2;
        }
        return O(n2);
      }
      exports3.Buffer = f, exports3.SlowBuffer = d, exports3.INSPECT_MAX_BYTES = 50, f.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : i(), exports3.kMaxLength = o(), f.poolSize = 8192, f._augment = function(t2) {
        return t2.__proto__ = f.prototype, t2;
      }, f.from = function(t2, r2, e2) {
        return s(null, t2, r2, e2);
      }, f.TYPED_ARRAY_SUPPORT && (f.prototype.__proto__ = Uint8Array.prototype, f.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && f[Symbol.species] === f && Object.defineProperty(f, Symbol.species, { value: null, configurable: true })), f.alloc = function(t2, r2, e2) {
        return a(null, t2, r2, e2);
      }, f.allocUnsafe = function(t2) {
        return c(null, t2);
      }, f.allocUnsafeSlow = function(t2) {
        return c(null, t2);
      }, f.isBuffer = function(t2) {
        return !(null == t2 || !t2._isBuffer);
      }, f.compare = function(t2, r2) {
        if (!f.isBuffer(t2) || !f.isBuffer(r2))
          throw new TypeError("Arguments must be Buffers");
        if (t2 === r2)
          return 0;
        for (var e2 = t2.length, n2 = r2.length, i2 = 0, o2 = Math.min(e2, n2); i2 < o2; ++i2)
          if (t2[i2] !== r2[i2]) {
            e2 = t2[i2], n2 = r2[i2];
            break;
          }
        return e2 < n2 ? -1 : n2 < e2 ? 1 : 0;
      }, f.isEncoding = function(t2) {
        switch (String(t2).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      }, f.concat = function(t2, r2) {
        if (!n(t2))
          throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t2.length)
          return f.alloc(0);
        var e2;
        if (void 0 === r2)
          for (r2 = 0, e2 = 0; e2 < t2.length; ++e2)
            r2 += t2[e2].length;
        var i2 = f.allocUnsafe(r2), o2 = 0;
        for (e2 = 0; e2 < t2.length; ++e2) {
          var u2 = t2[e2];
          if (!f.isBuffer(u2))
            throw new TypeError('"list" argument must be an Array of Buffers');
          u2.copy(i2, o2), o2 += u2.length;
        }
        return i2;
      }, f.byteLength = v, f.prototype._isBuffer = true, f.prototype.swap16 = function() {
        var t2 = this.length;
        if (t2 % 2 != 0)
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var r2 = 0; r2 < t2; r2 += 2)
          b(this, r2, r2 + 1);
        return this;
      }, f.prototype.swap32 = function() {
        var t2 = this.length;
        if (t2 % 4 != 0)
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var r2 = 0; r2 < t2; r2 += 4)
          b(this, r2, r2 + 3), b(this, r2 + 1, r2 + 2);
        return this;
      }, f.prototype.swap64 = function() {
        var t2 = this.length;
        if (t2 % 8 != 0)
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var r2 = 0; r2 < t2; r2 += 8)
          b(this, r2, r2 + 7), b(this, r2 + 1, r2 + 6), b(this, r2 + 2, r2 + 5), b(this, r2 + 3, r2 + 4);
        return this;
      }, f.prototype.toString = function() {
        var t2 = 0 | this.length;
        return 0 === t2 ? "" : 0 === arguments.length ? Y(this, 0, t2) : E.apply(this, arguments);
      }, f.prototype.equals = function(t2) {
        if (!f.isBuffer(t2))
          throw new TypeError("Argument must be a Buffer");
        return this === t2 || 0 === f.compare(this, t2);
      }, f.prototype.inspect = function() {
        var t2 = "", r2 = exports3.INSPECT_MAX_BYTES;
        return this.length > 0 && (t2 = this.toString("hex", 0, r2).match(/.{2}/g).join(" "), this.length > r2 && (t2 += " ... ")), "<Buffer " + t2 + ">";
      }, f.prototype.compare = function(t2, r2, e2, n2, i2) {
        if (!f.isBuffer(t2))
          throw new TypeError("Argument must be a Buffer");
        if (void 0 === r2 && (r2 = 0), void 0 === e2 && (e2 = t2 ? t2.length : 0), void 0 === n2 && (n2 = 0), void 0 === i2 && (i2 = this.length), r2 < 0 || e2 > t2.length || n2 < 0 || i2 > this.length)
          throw new RangeError("out of range index");
        if (n2 >= i2 && r2 >= e2)
          return 0;
        if (n2 >= i2)
          return -1;
        if (r2 >= e2)
          return 1;
        if (this === t2)
          return 0;
        for (var o2 = (i2 >>>= 0) - (n2 >>>= 0), u2 = (e2 >>>= 0) - (r2 >>>= 0), s2 = Math.min(o2, u2), h2 = this.slice(n2, i2), a2 = t2.slice(r2, e2), c2 = 0; c2 < s2; ++c2)
          if (h2[c2] !== a2[c2]) {
            o2 = h2[c2], u2 = a2[c2];
            break;
          }
        return o2 < u2 ? -1 : u2 < o2 ? 1 : 0;
      }, f.prototype.includes = function(t2, r2, e2) {
        return -1 !== this.indexOf(t2, r2, e2);
      }, f.prototype.indexOf = function(t2, r2, e2) {
        return R(this, t2, r2, e2, true);
      }, f.prototype.lastIndexOf = function(t2, r2, e2) {
        return R(this, t2, r2, e2, false);
      }, f.prototype.write = function(t2, r2, e2, n2) {
        if (void 0 === r2)
          n2 = "utf8", e2 = this.length, r2 = 0;
        else if (void 0 === e2 && "string" == typeof r2)
          n2 = r2, e2 = this.length, r2 = 0;
        else {
          if (!isFinite(r2))
            throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          r2 |= 0, isFinite(e2) ? (e2 |= 0, void 0 === n2 && (n2 = "utf8")) : (n2 = e2, e2 = void 0);
        }
        var i2 = this.length - r2;
        if ((void 0 === e2 || e2 > i2) && (e2 = i2), t2.length > 0 && (e2 < 0 || r2 < 0) || r2 > this.length)
          throw new RangeError("Attempt to write outside buffer bounds");
        n2 || (n2 = "utf8");
        for (var o2 = false; ; )
          switch (n2) {
            case "hex":
              return A(this, t2, r2, e2);
            case "utf8":
            case "utf-8":
              return m(this, t2, r2, e2);
            case "ascii":
              return P(this, t2, r2, e2);
            case "latin1":
            case "binary":
              return T(this, t2, r2, e2);
            case "base64":
              return B(this, t2, r2, e2);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return U(this, t2, r2, e2);
            default:
              if (o2)
                throw new TypeError("Unknown encoding: " + n2);
              n2 = ("" + n2).toLowerCase(), o2 = true;
          }
      }, f.prototype.toJSON = function() {
        return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
      };
      var I = 4096;
      function O(t2) {
        var r2 = t2.length;
        if (r2 <= I)
          return String.fromCharCode.apply(String, t2);
        for (var e2 = "", n2 = 0; n2 < r2; )
          e2 += String.fromCharCode.apply(String, t2.slice(n2, n2 += I));
        return e2;
      }
      function L(t2, r2, e2) {
        var n2 = "";
        e2 = Math.min(t2.length, e2);
        for (var i2 = r2; i2 < e2; ++i2)
          n2 += String.fromCharCode(127 & t2[i2]);
        return n2;
      }
      function D(t2, r2, e2) {
        var n2 = "";
        e2 = Math.min(t2.length, e2);
        for (var i2 = r2; i2 < e2; ++i2)
          n2 += String.fromCharCode(t2[i2]);
        return n2;
      }
      function x(t2, r2, e2) {
        var n2 = t2.length;
        (!r2 || r2 < 0) && (r2 = 0), (!e2 || e2 < 0 || e2 > n2) && (e2 = n2);
        for (var i2 = "", o2 = r2; o2 < e2; ++o2)
          i2 += Z(t2[o2]);
        return i2;
      }
      function C(t2, r2, e2) {
        for (var n2 = t2.slice(r2, e2), i2 = "", o2 = 0; o2 < n2.length; o2 += 2)
          i2 += String.fromCharCode(n2[o2] + 256 * n2[o2 + 1]);
        return i2;
      }
      function M(t2, r2, e2) {
        if (t2 % 1 != 0 || t2 < 0)
          throw new RangeError("offset is not uint");
        if (t2 + r2 > e2)
          throw new RangeError("Trying to access beyond buffer length");
      }
      function k(t2, r2, e2, n2, i2, o2) {
        if (!f.isBuffer(t2))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (r2 > i2 || r2 < o2)
          throw new RangeError('"value" argument is out of bounds');
        if (e2 + n2 > t2.length)
          throw new RangeError("Index out of range");
      }
      function N(t2, r2, e2, n2) {
        r2 < 0 && (r2 = 65535 + r2 + 1);
        for (var i2 = 0, o2 = Math.min(t2.length - e2, 2); i2 < o2; ++i2)
          t2[e2 + i2] = (r2 & 255 << 8 * (n2 ? i2 : 1 - i2)) >>> 8 * (n2 ? i2 : 1 - i2);
      }
      function z(t2, r2, e2, n2) {
        r2 < 0 && (r2 = 4294967295 + r2 + 1);
        for (var i2 = 0, o2 = Math.min(t2.length - e2, 4); i2 < o2; ++i2)
          t2[e2 + i2] = r2 >>> 8 * (n2 ? i2 : 3 - i2) & 255;
      }
      function F(t2, r2, e2, n2, i2, o2) {
        if (e2 + n2 > t2.length)
          throw new RangeError("Index out of range");
        if (e2 < 0)
          throw new RangeError("Index out of range");
      }
      function j(t2, r2, n2, i2, o2) {
        return o2 || F(t2, r2, n2, 4, 34028234663852886e22, -34028234663852886e22), e.write(t2, r2, n2, i2, 23, 4), n2 + 4;
      }
      function q(t2, r2, n2, i2, o2) {
        return o2 || F(t2, r2, n2, 8, 17976931348623157e292, -17976931348623157e292), e.write(t2, r2, n2, i2, 52, 8), n2 + 8;
      }
      f.prototype.slice = function(t2, r2) {
        var e2, n2 = this.length;
        if ((t2 = ~~t2) < 0 ? (t2 += n2) < 0 && (t2 = 0) : t2 > n2 && (t2 = n2), (r2 = void 0 === r2 ? n2 : ~~r2) < 0 ? (r2 += n2) < 0 && (r2 = 0) : r2 > n2 && (r2 = n2), r2 < t2 && (r2 = t2), f.TYPED_ARRAY_SUPPORT)
          (e2 = this.subarray(t2, r2)).__proto__ = f.prototype;
        else {
          var i2 = r2 - t2;
          e2 = new f(i2, void 0);
          for (var o2 = 0; o2 < i2; ++o2)
            e2[o2] = this[o2 + t2];
        }
        return e2;
      }, f.prototype.readUIntLE = function(t2, r2, e2) {
        t2 |= 0, r2 |= 0, e2 || M(t2, r2, this.length);
        for (var n2 = this[t2], i2 = 1, o2 = 0; ++o2 < r2 && (i2 *= 256); )
          n2 += this[t2 + o2] * i2;
        return n2;
      }, f.prototype.readUIntBE = function(t2, r2, e2) {
        t2 |= 0, r2 |= 0, e2 || M(t2, r2, this.length);
        for (var n2 = this[t2 + --r2], i2 = 1; r2 > 0 && (i2 *= 256); )
          n2 += this[t2 + --r2] * i2;
        return n2;
      }, f.prototype.readUInt8 = function(t2, r2) {
        return r2 || M(t2, 1, this.length), this[t2];
      }, f.prototype.readUInt16LE = function(t2, r2) {
        return r2 || M(t2, 2, this.length), this[t2] | this[t2 + 1] << 8;
      }, f.prototype.readUInt16BE = function(t2, r2) {
        return r2 || M(t2, 2, this.length), this[t2] << 8 | this[t2 + 1];
      }, f.prototype.readUInt32LE = function(t2, r2) {
        return r2 || M(t2, 4, this.length), (this[t2] | this[t2 + 1] << 8 | this[t2 + 2] << 16) + 16777216 * this[t2 + 3];
      }, f.prototype.readUInt32BE = function(t2, r2) {
        return r2 || M(t2, 4, this.length), 16777216 * this[t2] + (this[t2 + 1] << 16 | this[t2 + 2] << 8 | this[t2 + 3]);
      }, f.prototype.readIntLE = function(t2, r2, e2) {
        t2 |= 0, r2 |= 0, e2 || M(t2, r2, this.length);
        for (var n2 = this[t2], i2 = 1, o2 = 0; ++o2 < r2 && (i2 *= 256); )
          n2 += this[t2 + o2] * i2;
        return n2 >= (i2 *= 128) && (n2 -= Math.pow(2, 8 * r2)), n2;
      }, f.prototype.readIntBE = function(t2, r2, e2) {
        t2 |= 0, r2 |= 0, e2 || M(t2, r2, this.length);
        for (var n2 = r2, i2 = 1, o2 = this[t2 + --n2]; n2 > 0 && (i2 *= 256); )
          o2 += this[t2 + --n2] * i2;
        return o2 >= (i2 *= 128) && (o2 -= Math.pow(2, 8 * r2)), o2;
      }, f.prototype.readInt8 = function(t2, r2) {
        return r2 || M(t2, 1, this.length), 128 & this[t2] ? -1 * (255 - this[t2] + 1) : this[t2];
      }, f.prototype.readInt16LE = function(t2, r2) {
        r2 || M(t2, 2, this.length);
        var e2 = this[t2] | this[t2 + 1] << 8;
        return 32768 & e2 ? 4294901760 | e2 : e2;
      }, f.prototype.readInt16BE = function(t2, r2) {
        r2 || M(t2, 2, this.length);
        var e2 = this[t2 + 1] | this[t2] << 8;
        return 32768 & e2 ? 4294901760 | e2 : e2;
      }, f.prototype.readInt32LE = function(t2, r2) {
        return r2 || M(t2, 4, this.length), this[t2] | this[t2 + 1] << 8 | this[t2 + 2] << 16 | this[t2 + 3] << 24;
      }, f.prototype.readInt32BE = function(t2, r2) {
        return r2 || M(t2, 4, this.length), this[t2] << 24 | this[t2 + 1] << 16 | this[t2 + 2] << 8 | this[t2 + 3];
      }, f.prototype.readFloatLE = function(t2, r2) {
        return r2 || M(t2, 4, this.length), e.read(this, t2, true, 23, 4);
      }, f.prototype.readFloatBE = function(t2, r2) {
        return r2 || M(t2, 4, this.length), e.read(this, t2, false, 23, 4);
      }, f.prototype.readDoubleLE = function(t2, r2) {
        return r2 || M(t2, 8, this.length), e.read(this, t2, true, 52, 8);
      }, f.prototype.readDoubleBE = function(t2, r2) {
        return r2 || M(t2, 8, this.length), e.read(this, t2, false, 52, 8);
      }, f.prototype.writeUIntLE = function(t2, r2, e2, n2) {
        (t2 = +t2, r2 |= 0, e2 |= 0, n2) || k(this, t2, r2, e2, Math.pow(2, 8 * e2) - 1, 0);
        var i2 = 1, o2 = 0;
        for (this[r2] = 255 & t2; ++o2 < e2 && (i2 *= 256); )
          this[r2 + o2] = t2 / i2 & 255;
        return r2 + e2;
      }, f.prototype.writeUIntBE = function(t2, r2, e2, n2) {
        (t2 = +t2, r2 |= 0, e2 |= 0, n2) || k(this, t2, r2, e2, Math.pow(2, 8 * e2) - 1, 0);
        var i2 = e2 - 1, o2 = 1;
        for (this[r2 + i2] = 255 & t2; --i2 >= 0 && (o2 *= 256); )
          this[r2 + i2] = t2 / o2 & 255;
        return r2 + e2;
      }, f.prototype.writeUInt8 = function(t2, r2, e2) {
        return t2 = +t2, r2 |= 0, e2 || k(this, t2, r2, 1, 255, 0), f.TYPED_ARRAY_SUPPORT || (t2 = Math.floor(t2)), this[r2] = 255 & t2, r2 + 1;
      }, f.prototype.writeUInt16LE = function(t2, r2, e2) {
        return t2 = +t2, r2 |= 0, e2 || k(this, t2, r2, 2, 65535, 0), f.TYPED_ARRAY_SUPPORT ? (this[r2] = 255 & t2, this[r2 + 1] = t2 >>> 8) : N(this, t2, r2, true), r2 + 2;
      }, f.prototype.writeUInt16BE = function(t2, r2, e2) {
        return t2 = +t2, r2 |= 0, e2 || k(this, t2, r2, 2, 65535, 0), f.TYPED_ARRAY_SUPPORT ? (this[r2] = t2 >>> 8, this[r2 + 1] = 255 & t2) : N(this, t2, r2, false), r2 + 2;
      }, f.prototype.writeUInt32LE = function(t2, r2, e2) {
        return t2 = +t2, r2 |= 0, e2 || k(this, t2, r2, 4, 4294967295, 0), f.TYPED_ARRAY_SUPPORT ? (this[r2 + 3] = t2 >>> 24, this[r2 + 2] = t2 >>> 16, this[r2 + 1] = t2 >>> 8, this[r2] = 255 & t2) : z(this, t2, r2, true), r2 + 4;
      }, f.prototype.writeUInt32BE = function(t2, r2, e2) {
        return t2 = +t2, r2 |= 0, e2 || k(this, t2, r2, 4, 4294967295, 0), f.TYPED_ARRAY_SUPPORT ? (this[r2] = t2 >>> 24, this[r2 + 1] = t2 >>> 16, this[r2 + 2] = t2 >>> 8, this[r2 + 3] = 255 & t2) : z(this, t2, r2, false), r2 + 4;
      }, f.prototype.writeIntLE = function(t2, r2, e2, n2) {
        if (t2 = +t2, r2 |= 0, !n2) {
          var i2 = Math.pow(2, 8 * e2 - 1);
          k(this, t2, r2, e2, i2 - 1, -i2);
        }
        var o2 = 0, u2 = 1, f2 = 0;
        for (this[r2] = 255 & t2; ++o2 < e2 && (u2 *= 256); )
          t2 < 0 && 0 === f2 && 0 !== this[r2 + o2 - 1] && (f2 = 1), this[r2 + o2] = (t2 / u2 >> 0) - f2 & 255;
        return r2 + e2;
      }, f.prototype.writeIntBE = function(t2, r2, e2, n2) {
        if (t2 = +t2, r2 |= 0, !n2) {
          var i2 = Math.pow(2, 8 * e2 - 1);
          k(this, t2, r2, e2, i2 - 1, -i2);
        }
        var o2 = e2 - 1, u2 = 1, f2 = 0;
        for (this[r2 + o2] = 255 & t2; --o2 >= 0 && (u2 *= 256); )
          t2 < 0 && 0 === f2 && 0 !== this[r2 + o2 + 1] && (f2 = 1), this[r2 + o2] = (t2 / u2 >> 0) - f2 & 255;
        return r2 + e2;
      }, f.prototype.writeInt8 = function(t2, r2, e2) {
        return t2 = +t2, r2 |= 0, e2 || k(this, t2, r2, 1, 127, -128), f.TYPED_ARRAY_SUPPORT || (t2 = Math.floor(t2)), t2 < 0 && (t2 = 255 + t2 + 1), this[r2] = 255 & t2, r2 + 1;
      }, f.prototype.writeInt16LE = function(t2, r2, e2) {
        return t2 = +t2, r2 |= 0, e2 || k(this, t2, r2, 2, 32767, -32768), f.TYPED_ARRAY_SUPPORT ? (this[r2] = 255 & t2, this[r2 + 1] = t2 >>> 8) : N(this, t2, r2, true), r2 + 2;
      }, f.prototype.writeInt16BE = function(t2, r2, e2) {
        return t2 = +t2, r2 |= 0, e2 || k(this, t2, r2, 2, 32767, -32768), f.TYPED_ARRAY_SUPPORT ? (this[r2] = t2 >>> 8, this[r2 + 1] = 255 & t2) : N(this, t2, r2, false), r2 + 2;
      }, f.prototype.writeInt32LE = function(t2, r2, e2) {
        return t2 = +t2, r2 |= 0, e2 || k(this, t2, r2, 4, 2147483647, -2147483648), f.TYPED_ARRAY_SUPPORT ? (this[r2] = 255 & t2, this[r2 + 1] = t2 >>> 8, this[r2 + 2] = t2 >>> 16, this[r2 + 3] = t2 >>> 24) : z(this, t2, r2, true), r2 + 4;
      }, f.prototype.writeInt32BE = function(t2, r2, e2) {
        return t2 = +t2, r2 |= 0, e2 || k(this, t2, r2, 4, 2147483647, -2147483648), t2 < 0 && (t2 = 4294967295 + t2 + 1), f.TYPED_ARRAY_SUPPORT ? (this[r2] = t2 >>> 24, this[r2 + 1] = t2 >>> 16, this[r2 + 2] = t2 >>> 8, this[r2 + 3] = 255 & t2) : z(this, t2, r2, false), r2 + 4;
      }, f.prototype.writeFloatLE = function(t2, r2, e2) {
        return j(this, t2, r2, true, e2);
      }, f.prototype.writeFloatBE = function(t2, r2, e2) {
        return j(this, t2, r2, false, e2);
      }, f.prototype.writeDoubleLE = function(t2, r2, e2) {
        return q(this, t2, r2, true, e2);
      }, f.prototype.writeDoubleBE = function(t2, r2, e2) {
        return q(this, t2, r2, false, e2);
      }, f.prototype.copy = function(t2, r2, e2, n2) {
        if (e2 || (e2 = 0), n2 || 0 === n2 || (n2 = this.length), r2 >= t2.length && (r2 = t2.length), r2 || (r2 = 0), n2 > 0 && n2 < e2 && (n2 = e2), n2 === e2)
          return 0;
        if (0 === t2.length || 0 === this.length)
          return 0;
        if (r2 < 0)
          throw new RangeError("targetStart out of bounds");
        if (e2 < 0 || e2 >= this.length)
          throw new RangeError("sourceStart out of bounds");
        if (n2 < 0)
          throw new RangeError("sourceEnd out of bounds");
        n2 > this.length && (n2 = this.length), t2.length - r2 < n2 - e2 && (n2 = t2.length - r2 + e2);
        var i2, o2 = n2 - e2;
        if (this === t2 && e2 < r2 && r2 < n2)
          for (i2 = o2 - 1; i2 >= 0; --i2)
            t2[i2 + r2] = this[i2 + e2];
        else if (o2 < 1e3 || !f.TYPED_ARRAY_SUPPORT)
          for (i2 = 0; i2 < o2; ++i2)
            t2[i2 + r2] = this[i2 + e2];
        else
          Uint8Array.prototype.set.call(t2, this.subarray(e2, e2 + o2), r2);
        return o2;
      }, f.prototype.fill = function(t2, r2, e2, n2) {
        if ("string" == typeof t2) {
          if ("string" == typeof r2 ? (n2 = r2, r2 = 0, e2 = this.length) : "string" == typeof e2 && (n2 = e2, e2 = this.length), 1 === t2.length) {
            var i2 = t2.charCodeAt(0);
            i2 < 256 && (t2 = i2);
          }
          if (void 0 !== n2 && "string" != typeof n2)
            throw new TypeError("encoding must be a string");
          if ("string" == typeof n2 && !f.isEncoding(n2))
            throw new TypeError("Unknown encoding: " + n2);
        } else
          "number" == typeof t2 && (t2 &= 255);
        if (r2 < 0 || this.length < r2 || this.length < e2)
          throw new RangeError("Out of range index");
        if (e2 <= r2)
          return this;
        var o2;
        if (r2 >>>= 0, e2 = void 0 === e2 ? this.length : e2 >>> 0, t2 || (t2 = 0), "number" == typeof t2)
          for (o2 = r2; o2 < e2; ++o2)
            this[o2] = t2;
        else {
          var u2 = f.isBuffer(t2) ? t2 : $(new f(t2, n2).toString()), s2 = u2.length;
          for (o2 = 0; o2 < e2 - r2; ++o2)
            this[o2 + r2] = u2[o2 % s2];
        }
        return this;
      };
      var V = /[^+\/0-9A-Za-z-_]/g;
      function X(t2) {
        if ((t2 = J(t2).replace(V, "")).length < 2)
          return "";
        for (; t2.length % 4 != 0; )
          t2 += "=";
        return t2;
      }
      function J(t2) {
        return t2.trim ? t2.trim() : t2.replace(/^\s+|\s+$/g, "");
      }
      function Z(t2) {
        return t2 < 16 ? "0" + t2.toString(16) : t2.toString(16);
      }
      function $(t2, r2) {
        var e2;
        r2 = r2 || 1 / 0;
        for (var n2 = t2.length, i2 = null, o2 = [], u2 = 0; u2 < n2; ++u2) {
          if ((e2 = t2.charCodeAt(u2)) > 55295 && e2 < 57344) {
            if (!i2) {
              if (e2 > 56319) {
                (r2 -= 3) > -1 && o2.push(239, 191, 189);
                continue;
              }
              if (u2 + 1 === n2) {
                (r2 -= 3) > -1 && o2.push(239, 191, 189);
                continue;
              }
              i2 = e2;
              continue;
            }
            if (e2 < 56320) {
              (r2 -= 3) > -1 && o2.push(239, 191, 189), i2 = e2;
              continue;
            }
            e2 = 65536 + (i2 - 55296 << 10 | e2 - 56320);
          } else
            i2 && (r2 -= 3) > -1 && o2.push(239, 191, 189);
          if (i2 = null, e2 < 128) {
            if ((r2 -= 1) < 0)
              break;
            o2.push(e2);
          } else if (e2 < 2048) {
            if ((r2 -= 2) < 0)
              break;
            o2.push(e2 >> 6 | 192, 63 & e2 | 128);
          } else if (e2 < 65536) {
            if ((r2 -= 3) < 0)
              break;
            o2.push(e2 >> 12 | 224, e2 >> 6 & 63 | 128, 63 & e2 | 128);
          } else {
            if (!(e2 < 1114112))
              throw new Error("Invalid code point");
            if ((r2 -= 4) < 0)
              break;
            o2.push(e2 >> 18 | 240, e2 >> 12 & 63 | 128, e2 >> 6 & 63 | 128, 63 & e2 | 128);
          }
        }
        return o2;
      }
      function G(t2) {
        for (var r2 = [], e2 = 0; e2 < t2.length; ++e2)
          r2.push(255 & t2.charCodeAt(e2));
        return r2;
      }
      function H(t2, r2) {
        for (var e2, n2, i2, o2 = [], u2 = 0; u2 < t2.length && !((r2 -= 2) < 0); ++u2)
          n2 = (e2 = t2.charCodeAt(u2)) >> 8, i2 = e2 % 256, o2.push(i2), o2.push(n2);
        return o2;
      }
      function K(t2) {
        return r.toByteArray(X(t2));
      }
      function Q(t2, r2, e2, n2) {
        for (var i2 = 0; i2 < n2 && !(i2 + e2 >= r2.length || i2 >= t2.length); ++i2)
          r2[i2 + e2] = t2[i2];
        return i2;
      }
      function W(t2) {
        return t2 != t2;
      }
    }, { "base64-js": "yh9p", "ieee754": "JgNJ", "isarray": "REa7", "buffer": "dskh" }], "QO4x": [function(require2, module2, exports3) {
      var Buffer3 = require2("buffer").Buffer;
      var global = arguments[3];
      var t = require2("buffer").Buffer, e = arguments[3], r = require2("../constants.js").FILE_SYSTEM_NAME, n = require2("../constants.js").FILE_STORE_NAME, o = require2("../constants.js").IDB_RW, u = require2("../constants.js").IDB_RO;
      function c(t2, e2) {
        this.db = t2, this.mode = e2;
      }
      function i(t2) {
        this.name = t2 || r, this.db = null;
      }
      c.prototype._getObjectStore = function() {
        if (this.objectStore)
          return this.objectStore;
        var t2 = this.db.transaction(n, this.mode);
        return this.objectStore = t2.objectStore(n), this.objectStore;
      }, c.prototype.clear = function(t2) {
        try {
          var e2 = this._getObjectStore().clear();
          e2.onsuccess = function() {
            t2();
          }, e2.onerror = function(e3) {
            e3.preventDefault(), t2(e3.error);
          };
        } catch (r2) {
          t2(r2);
        }
      }, c.prototype._get = function(t2, e2) {
        try {
          var r2 = this._getObjectStore().get(t2);
          r2.onsuccess = function(t3) {
            var r3 = t3.target.result;
            e2(null, r3);
          }, r2.onerror = function(t3) {
            t3.preventDefault(), e2(t3.error);
          };
        } catch (n2) {
          e2(n2);
        }
      }, c.prototype.getObject = function(t2, e2) {
        this._get(t2, e2);
      }, c.prototype.getBuffer = function(e2, r2) {
        this._get(e2, function(e3, n2) {
          if (e3)
            return r2(e3);
          r2(null, t.from(n2));
        });
      }, c.prototype._put = function(t2, e2, r2) {
        try {
          var n2 = this._getObjectStore().put(e2, t2);
          n2.onsuccess = function(t3) {
            var e3 = t3.target.result;
            r2(null, e3);
          }, n2.onerror = function(t3) {
            t3.preventDefault(), r2(t3.error);
          };
        } catch (o2) {
          r2(o2);
        }
      }, c.prototype.putObject = function(t2, e2, r2) {
        this._put(t2, e2, r2);
      }, c.prototype.putBuffer = function(t2, e2, r2) {
        var n2 = e2.buffer;
        this._put(t2, n2, r2);
      }, c.prototype.delete = function(t2, e2) {
        try {
          var r2 = this._getObjectStore().delete(t2);
          r2.onsuccess = function(t3) {
            var r3 = t3.target.result;
            e2(null, r3);
          }, r2.onerror = function(t3) {
            t3.preventDefault(), e2(t3.error);
          };
        } catch (n2) {
          e2(n2);
        }
      }, i.isSupported = function() {
        return !!(e.indexedDB || e.mozIndexedDB || e.webkitIndexedDB || e.msIndexedDB);
      }, i.prototype.open = function(t2) {
        var r2 = this;
        if (r2.db)
          return t2();
        try {
          var o2 = (e.indexedDB || e.mozIndexedDB || e.webkitIndexedDB || e.msIndexedDB).open(r2.name);
          o2.onupgradeneeded = function(t3) {
            var e2 = t3.target.result;
            e2.objectStoreNames.contains(n) && e2.deleteObjectStore(n), e2.createObjectStore(n);
          }, o2.onsuccess = function(e2) {
            r2.db = e2.target.result, t2();
          }, o2.onerror = function(e2) {
            e2.preventDefault(), t2(e2.error);
          };
        } catch (u2) {
          t2(u2);
        }
      }, i.prototype.getReadOnlyContext = function() {
        return new c(this.db, u);
      }, i.prototype.getReadWriteContext = function() {
        return new c(this.db, o);
      }, module2.exports = i;
    }, { "../constants.js": "iJA9", "buffer": "dskh" }], "u4Zs": [function(require2, module2, exports3) {
      var process2 = require2("process");
      var define2;
      var e, t = require2("process");
      !function() {
        var n = {};
        void 0 !== t && t.nextTick ? (n.nextTick = t.nextTick, "undefined" != typeof setImmediate ? n.setImmediate = function(e2) {
          setImmediate(e2);
        } : n.setImmediate = n.nextTick) : "function" == typeof setImmediate ? (n.nextTick = function(e2) {
          setImmediate(e2);
        }, n.setImmediate = n.nextTick) : (n.nextTick = function(e2) {
          setTimeout(e2, 0);
        }, n.setImmediate = n.nextTick), n.eachSeries = function(e2, t2, n2) {
          if (n2 = n2 || function() {
          }, !e2.length)
            return n2();
          var i = 0;
          !function o() {
            t2(e2[i], function(t3) {
              t3 ? (n2(t3), n2 = function() {
              }) : (i += 1) >= e2.length ? n2() : o();
            });
          }();
        }, n.forEachSeries = n.eachSeries, void 0 !== e && e.amd ? e([], function() {
          return n;
        }) : "undefined" != typeof module2 && module2.exports ? module2.exports = n : root.async = n;
      }();
    }, { "process": "pBGv" }], "OWym": [function(require2, module2, exports3) {
      var t = require2("../constants.js").FILE_SYSTEM_NAME, e = require2("../../lib/async.js").setImmediate, o = function() {
        var t2 = {};
        return function(e2) {
          return Object.prototype.hasOwnProperty.call(t2, e2) || (t2[e2] = {}), t2[e2];
        };
      }();
      function n(t2, e2) {
        this.readOnly = e2, this.objectStore = t2;
      }
      function r(e2) {
        this.name = e2 || t;
      }
      n.prototype.clear = function(t2) {
        if (this.readOnly)
          e(function() {
            t2("[MemoryContext] Error: write operation on read only context");
          });
        else {
          var o2 = this.objectStore;
          Object.keys(o2).forEach(function(t3) {
            delete o2[t3];
          }), e(t2);
        }
      }, n.prototype.getObject = n.prototype.getBuffer = function(t2, o2) {
        var n2 = this;
        e(function() {
          o2(null, n2.objectStore[t2]);
        });
      }, n.prototype.putObject = n.prototype.putBuffer = function(t2, o2, n2) {
        this.readOnly ? e(function() {
          n2("[MemoryContext] Error: write operation on read only context");
        }) : (this.objectStore[t2] = o2, e(n2));
      }, n.prototype.delete = function(t2, o2) {
        this.readOnly ? e(function() {
          o2("[MemoryContext] Error: write operation on read only context");
        }) : (delete this.objectStore[t2], e(o2));
      }, r.isSupported = function() {
        return true;
      }, r.prototype.open = function(t2) {
        this.db = o(this.name), e(t2);
      }, r.prototype.getReadOnlyContext = function() {
        return new n(this.db, true);
      }, r.prototype.getReadWriteContext = function() {
        return new n(this.db, false);
      }, module2.exports = r;
    }, { "../constants.js": "iJA9", "../../lib/async.js": "u4Zs" }], "AiW7": [function(require2, module2, exports3) {
      var e = require2("./indexeddb.js"), r = require2("./memory.js");
      module2.exports = { IndexedDB: e, Default: e, Memory: r };
    }, { "./indexeddb.js": "QO4x", "./memory.js": "OWym" }], "p8GN": [function(require2, module2, exports3) {
      var t = {};
      ["3:EACCES:permission denied", "9:EBADF:bad file descriptor", "10:EBUSY:resource busy or locked", "18:EINVAL:invalid argument", "27:ENOTDIR:not a directory", "28:EISDIR:illegal operation on a directory", "34:ENOENT:no such file or directory", "47:EEXIST:file already exists", "50:EPERM:operation not permitted", "51:ELOOP:too many symbolic links encountered", "53:ENOTEMPTY:directory not empty", "55:EIO:i/o error", "1000:ENOTMOUNTED:not mounted", "1001:EFILESYSTEMERROR:missing super node, use 'FORMAT' flag to format filesystem.", "1002:ENOATTR:attribute does not exist"].forEach(function(e) {
        var o = +(e = e.split(":"))[0], r = e[1], i = e[2];
        function s(t2, e2) {
          Error.call(this), this.name = r, this.code = r, this.errno = o, this.message = t2 || i, e2 && (this.path = e2), this.stack = new Error(this.message).stack;
        }
        s.prototype = Object.create(Error.prototype), s.prototype.constructor = s, s.prototype.toString = function() {
          var t2 = this.path ? ", '" + this.path + "'" : "";
          return this.name + ": " + this.message + t2;
        }, t[r] = t[o] = s;
      }), module2.exports = t;
    }, {}], "QMiB": [function(require2, module2, exports3) {
      "use strict";
      var t = require2("../constants.js").ENVIRONMENT;
      module2.exports = function(n) {
        (n = n || {}).TMP = n.TMP || t.TMP, n.PATH = n.PATH || t.PATH, this.get = function(t2) {
          return n[t2];
        }, this.set = function(t2, s) {
          n[t2] = s;
        };
      };
    }, { "../constants.js": "iJA9" }], "bQx9": [function(require2, module2, exports3) {
      module2.exports = function(t, o) {
        for (var a = [], e = 0; e < t.length; e++) {
          var n = o(t[e], e);
          r(n) ? a.push.apply(a, n) : a.push(n);
        }
        return a;
      };
      var r = Array.isArray || function(r2) {
        return "[object Array]" === Object.prototype.toString.call(r2);
      };
    }, {}], "D9yG": [function(require2, module2, exports3) {
      "use strict";
      function e(e2, r, i) {
        e2 instanceof RegExp && (e2 = n(e2, i)), r instanceof RegExp && (r = n(r, i));
        var o = t(e2, r, i);
        return o && { start: o[0], end: o[1], pre: i.slice(0, o[0]), body: i.slice(o[0] + e2.length, o[1]), post: i.slice(o[1] + r.length) };
      }
      function n(e2, n2) {
        var t2 = n2.match(e2);
        return t2 ? t2[0] : null;
      }
      function t(e2, n2, t2) {
        var r, i, o, f, l, s = t2.indexOf(e2), c = t2.indexOf(n2, s + 1), p = s;
        if (s >= 0 && c > 0) {
          for (r = [], o = t2.length; p >= 0 && !l; )
            p == s ? (r.push(p), s = t2.indexOf(e2, p + 1)) : 1 == r.length ? l = [r.pop(), c] : ((i = r.pop()) < o && (o = i, f = c), c = t2.indexOf(n2, p + 1)), p = s < c && s >= 0 ? s : c;
          r.length && (l = [o, f]);
        }
        return l;
      }
      module2.exports = e, e.range = t;
    }, {}], "dwXQ": [function(require2, module2, exports3) {
      var t = require2("concat-map"), r = require2("balanced-match");
      module2.exports = f;
      var n = "\0SLASH" + Math.random() + "\0", e = "\0OPEN" + Math.random() + "\0", i = "\0CLOSE" + Math.random() + "\0", o = "\0COMMA" + Math.random() + "\0", a = "\0PERIOD" + Math.random() + "\0";
      function s(t2) {
        return parseInt(t2, 10) == t2 ? parseInt(t2, 10) : t2.charCodeAt(0);
      }
      function p(t2) {
        return t2.split("\\\\").join(n).split("\\{").join(e).split("\\}").join(i).split("\\,").join(o).split("\\.").join(a);
      }
      function u(t2) {
        return t2.split(n).join("\\").split(e).join("{").split(i).join("}").split(o).join(",").split(a).join(".");
      }
      function l(t2) {
        if (!t2)
          return [""];
        var n2 = [], e2 = r("{", "}", t2);
        if (!e2)
          return t2.split(",");
        var i2 = e2.pre, o2 = e2.body, a2 = e2.post, s2 = i2.split(",");
        s2[s2.length - 1] += "{" + o2 + "}";
        var p2 = l(a2);
        return a2.length && (s2[s2.length - 1] += p2.shift(), s2.push.apply(s2, p2)), n2.push.apply(n2, s2), n2;
      }
      function f(t2) {
        return t2 ? ("{}" === t2.substr(0, 2) && (t2 = "\\{\\}" + t2.substr(2)), m(p(t2), true).map(u)) : [];
      }
      function h(t2) {
        return t2;
      }
      function d(t2) {
        return "{" + t2 + "}";
      }
      function c(t2) {
        return /^-?0\d/.test(t2);
      }
      function v(t2, r2) {
        return t2 <= r2;
      }
      function g(t2, r2) {
        return t2 >= r2;
      }
      function m(n2, e2) {
        var o2 = [], a2 = r("{", "}", n2);
        if (!a2 || /\$$/.test(a2.pre))
          return [n2];
        var p2, u2 = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(a2.body), f2 = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(a2.body), h2 = u2 || f2, b = a2.body.indexOf(",") >= 0;
        if (!h2 && !b)
          return a2.post.match(/,.*\}/) ? m(n2 = a2.pre + "{" + a2.body + i + a2.post) : [n2];
        if (h2)
          p2 = a2.body.split(/\.\./);
        else if (1 === (p2 = l(a2.body)).length && 1 === (p2 = m(p2[0], false).map(d)).length)
          return (M = a2.post.length ? m(a2.post, false) : [""]).map(function(t2) {
            return a2.pre + p2[0] + t2;
          });
        var j, y = a2.pre, M = a2.post.length ? m(a2.post, false) : [""];
        if (h2) {
          var A = s(p2[0]), C = s(p2[1]), O = Math.max(p2[0].length, p2[1].length), S = 3 == p2.length ? Math.abs(s(p2[2])) : 1, $ = v;
          C < A && (S *= -1, $ = g);
          var x = p2.some(c);
          j = [];
          for (var E = A; $(E, C); E += S) {
            var I;
            if (f2)
              "\\" === (I = String.fromCharCode(E)) && (I = "");
            else if (I = String(E), x) {
              var q = O - I.length;
              if (q > 0) {
                var z = new Array(q + 1).join("0");
                I = E < 0 ? "-" + z + I.slice(1) : z + I;
              }
            }
            j.push(I);
          }
        } else
          j = t(p2, function(t2) {
            return m(t2, false);
          });
        for (var L = 0; L < j.length; L++)
          for (var P = 0; P < M.length; P++) {
            var Z = y + j[L] + M[P];
            (!e2 || h2 || Z) && o2.push(Z);
          }
        return o2;
      }
    }, { "concat-map": "bQx9", "balanced-match": "D9yG" }], "NtKi": [function(require2, module2, exports3) {
      module2.exports = g, g.Minimatch = l;
      var t = { sep: "/" };
      try {
        t = require2("path");
      } catch (O) {
      }
      var e = g.GLOBSTAR = l.GLOBSTAR = {}, n = require2("brace-expansion"), r = { "!": { open: "(?:(?!(?:", close: "))[^/]*?)" }, "?": { open: "(?:", close: ")?" }, "+": { open: "(?:", close: ")+" }, "*": { open: "(?:", close: ")*" }, "@": { open: "(?:", close: ")" } }, i = "[^/]", s = i + "*?", a = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?", o = "(?:(?!(?:\\/|^)\\.).)*?", h = c("().*{}+?[]^$\\!");
      function c(t2) {
        return t2.split("").reduce(function(t3, e2) {
          return t3[e2] = true, t3;
        }, {});
      }
      var u = /\/+/;
      function p(t2, e2) {
        return e2 = e2 || {}, function(n2, r2, i2) {
          return g(n2, t2, e2);
        };
      }
      function f(t2, e2) {
        t2 = t2 || {}, e2 = e2 || {};
        var n2 = {};
        return Object.keys(e2).forEach(function(t3) {
          n2[t3] = e2[t3];
        }), Object.keys(t2).forEach(function(e3) {
          n2[e3] = t2[e3];
        }), n2;
      }
      function g(t2, e2, n2) {
        if ("string" != typeof e2)
          throw new TypeError("glob pattern string required");
        return n2 || (n2 = {}), !(!n2.nocomment && "#" === e2.charAt(0)) && ("" === e2.trim() ? "" === t2 : new l(e2, n2).match(t2));
      }
      function l(e2, n2) {
        if (!(this instanceof l))
          return new l(e2, n2);
        if ("string" != typeof e2)
          throw new TypeError("glob pattern string required");
        n2 || (n2 = {}), e2 = e2.trim(), "/" !== t.sep && (e2 = e2.split(t.sep).join("/")), this.options = n2, this.set = [], this.pattern = e2, this.regexp = null, this.negate = false, this.comment = false, this.empty = false, this.make();
      }
      function d() {
        if (!this._made) {
          var t2 = this.pattern, e2 = this.options;
          if (e2.nocomment || "#" !== t2.charAt(0))
            if (t2) {
              this.parseNegate();
              var n2 = this.globSet = this.braceExpand();
              e2.debug && (this.debug = console.error), this.debug(this.pattern, n2), n2 = this.globParts = n2.map(function(t3) {
                return t3.split(u);
              }), this.debug(this.pattern, n2), n2 = n2.map(function(t3, e3, n3) {
                return t3.map(this.parse, this);
              }, this), this.debug(this.pattern, n2), n2 = n2.filter(function(t3) {
                return -1 === t3.indexOf(false);
              }), this.debug(this.pattern, n2), this.set = n2;
            } else
              this.empty = true;
          else
            this.comment = true;
        }
      }
      function b() {
        var t2 = this.pattern, e2 = false, n2 = 0;
        if (!this.options.nonegate) {
          for (var r2 = 0, i2 = t2.length; r2 < i2 && "!" === t2.charAt(r2); r2++)
            e2 = !e2, n2++;
          n2 && (this.pattern = t2.substr(n2)), this.negate = e2;
        }
      }
      function m(t2, e2) {
        if (e2 || (e2 = this instanceof l ? this.options : {}), void 0 === (t2 = void 0 === t2 ? this.pattern : t2))
          throw new TypeError("undefined pattern");
        return e2.nobrace || !t2.match(/\{.*\}/) ? [t2] : n(t2);
      }
      g.filter = p, g.defaults = function(t2) {
        if (!t2 || !Object.keys(t2).length)
          return g;
        var e2 = g, n2 = function(n3, r2, i2) {
          return e2.minimatch(n3, r2, f(t2, i2));
        };
        return n2.Minimatch = function(n3, r2) {
          return new e2.Minimatch(n3, f(t2, r2));
        }, n2;
      }, l.defaults = function(t2) {
        return t2 && Object.keys(t2).length ? g.defaults(t2).Minimatch : l;
      }, l.prototype.debug = function() {
      }, l.prototype.make = d, l.prototype.parseNegate = b, g.braceExpand = function(t2, e2) {
        return m(t2, e2);
      }, l.prototype.braceExpand = m, l.prototype.parse = y;
      var v = {};
      function y(t2, n2) {
        if (t2.length > 65536)
          throw new TypeError("pattern is too long");
        var a2 = this.options;
        if (!a2.noglobstar && "**" === t2)
          return e;
        if ("" === t2)
          return "";
        var o2, c2 = "", u2 = !!a2.nocase, p2 = false, f2 = [], g2 = [], l2 = false, d2 = -1, b2 = -1, m2 = "." === t2.charAt(0) ? "" : a2.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)", y2 = this;
        function w2() {
          if (o2) {
            switch (o2) {
              case "*":
                c2 += s, u2 = true;
                break;
              case "?":
                c2 += i, u2 = true;
                break;
              default:
                c2 += "\\" + o2;
            }
            y2.debug("clearStateChar %j %j", o2, c2), o2 = false;
          }
        }
        for (var x2, j2 = 0, k = t2.length; j2 < k && (x2 = t2.charAt(j2)); j2++)
          if (this.debug("%s	%s %s %j", t2, j2, c2, x2), p2 && h[x2])
            c2 += "\\" + x2, p2 = false;
          else
            switch (x2) {
              case "/":
                return false;
              case "\\":
                w2(), p2 = true;
                continue;
              case "?":
              case "*":
              case "+":
              case "@":
              case "!":
                if (this.debug("%s	%s %s %j <-- stateChar", t2, j2, c2, x2), l2) {
                  this.debug("  in class"), "!" === x2 && j2 === b2 + 1 && (x2 = "^"), c2 += x2;
                  continue;
                }
                y2.debug("call clearStateChar %j", o2), w2(), o2 = x2, a2.noext && w2();
                continue;
              case "(":
                if (l2) {
                  c2 += "(";
                  continue;
                }
                if (!o2) {
                  c2 += "\\(";
                  continue;
                }
                f2.push({ type: o2, start: j2 - 1, reStart: c2.length, open: r[o2].open, close: r[o2].close }), c2 += "!" === o2 ? "(?:(?!(?:" : "(?:", this.debug("plType %j %j", o2, c2), o2 = false;
                continue;
              case ")":
                if (l2 || !f2.length) {
                  c2 += "\\)";
                  continue;
                }
                w2(), u2 = true;
                var A = f2.pop();
                c2 += A.close, "!" === A.type && g2.push(A), A.reEnd = c2.length;
                continue;
              case "|":
                if (l2 || !f2.length || p2) {
                  c2 += "\\|", p2 = false;
                  continue;
                }
                w2(), c2 += "|";
                continue;
              case "[":
                if (w2(), l2) {
                  c2 += "\\" + x2;
                  continue;
                }
                l2 = true, b2 = j2, d2 = c2.length, c2 += x2;
                continue;
              case "]":
                if (j2 === b2 + 1 || !l2) {
                  c2 += "\\" + x2, p2 = false;
                  continue;
                }
                if (l2) {
                  var S = t2.substring(b2 + 1, j2);
                  try {
                    RegExp("[" + S + "]");
                  } catch (O) {
                    var $ = this.parse(S, v);
                    c2 = c2.substr(0, d2) + "\\[" + $[0] + "\\]", u2 = u2 || $[1], l2 = false;
                    continue;
                  }
                }
                u2 = true, l2 = false, c2 += x2;
                continue;
              default:
                w2(), p2 ? p2 = false : !h[x2] || "^" === x2 && l2 || (c2 += "\\"), c2 += x2;
            }
        for (l2 && (S = t2.substr(b2 + 1), $ = this.parse(S, v), c2 = c2.substr(0, d2) + "\\[" + $[0], u2 = u2 || $[1]), A = f2.pop(); A; A = f2.pop()) {
          var R = c2.slice(A.reStart + A.open.length);
          this.debug("setting tail", c2, A), R = R.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(t3, e2, n3) {
            return n3 || (n3 = "\\"), e2 + e2 + n3 + "|";
          }), this.debug("tail=%j\n   %s", R, R, A, c2);
          var T = "*" === A.type ? s : "?" === A.type ? i : "\\" + A.type;
          u2 = true, c2 = c2.slice(0, A.reStart) + T + "\\(" + R;
        }
        w2(), p2 && (c2 += "\\\\");
        var C = false;
        switch (c2.charAt(0)) {
          case ".":
          case "[":
          case "(":
            C = true;
        }
        for (var L = g2.length - 1; L > -1; L--) {
          var q = g2[L], B = c2.slice(0, q.reStart), M = c2.slice(q.reStart, q.reEnd - 8), N = c2.slice(q.reEnd - 8, q.reEnd), _ = c2.slice(q.reEnd);
          N += _;
          var G = B.split("(").length - 1, P = _;
          for (j2 = 0; j2 < G; j2++)
            P = P.replace(/\)[+*?]?/, "");
          var z = "";
          "" === (_ = P) && n2 !== v && (z = "$"), c2 = B + M + _ + z + N;
        }
        if ("" !== c2 && u2 && (c2 = "(?=.)" + c2), C && (c2 = m2 + c2), n2 === v)
          return [c2, u2];
        if (!u2)
          return E(t2);
        var D = a2.nocase ? "i" : "";
        try {
          var F = new RegExp("^" + c2 + "$", D);
        } catch (O) {
          return new RegExp("$.");
        }
        return F._glob = t2, F._src = c2, F;
      }
      function w() {
        if (this.regexp || false === this.regexp)
          return this.regexp;
        var t2 = this.set;
        if (!t2.length)
          return this.regexp = false, this.regexp;
        var n2 = this.options, r2 = n2.noglobstar ? s : n2.dot ? a : o, i2 = n2.nocase ? "i" : "", h2 = t2.map(function(t3) {
          return t3.map(function(t4) {
            return t4 === e ? r2 : "string" == typeof t4 ? j(t4) : t4._src;
          }).join("\\/");
        }).join("|");
        h2 = "^(?:" + h2 + ")$", this.negate && (h2 = "^(?!" + h2 + ").*$");
        try {
          this.regexp = new RegExp(h2, i2);
        } catch (c2) {
          this.regexp = false;
        }
        return this.regexp;
      }
      function x(e2, n2) {
        if (this.debug("match", e2, this.pattern), this.comment)
          return false;
        if (this.empty)
          return "" === e2;
        if ("/" === e2 && n2)
          return true;
        var r2 = this.options;
        "/" !== t.sep && (e2 = e2.split(t.sep).join("/")), e2 = e2.split(u), this.debug(this.pattern, "split", e2);
        var i2, s2, a2 = this.set;
        for (this.debug(this.pattern, "set", a2), s2 = e2.length - 1; s2 >= 0 && !(i2 = e2[s2]); s2--)
          ;
        for (s2 = 0; s2 < a2.length; s2++) {
          var o2 = a2[s2], h2 = e2;
          if (r2.matchBase && 1 === o2.length && (h2 = [i2]), this.matchOne(h2, o2, n2))
            return !!r2.flipNegate || !this.negate;
        }
        return !r2.flipNegate && this.negate;
      }
      function E(t2) {
        return t2.replace(/\\(.)/g, "$1");
      }
      function j(t2) {
        return t2.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      }
      g.makeRe = function(t2, e2) {
        return new l(t2, e2 || {}).makeRe();
      }, l.prototype.makeRe = w, g.match = function(t2, e2, n2) {
        var r2 = new l(e2, n2 = n2 || {});
        return t2 = t2.filter(function(t3) {
          return r2.match(t3);
        }), r2.options.nonull && !t2.length && t2.push(e2), t2;
      }, l.prototype.match = x, l.prototype.matchOne = function(t2, n2, r2) {
        var i2 = this.options;
        this.debug("matchOne", { this: this, file: t2, pattern: n2 }), this.debug("matchOne", t2.length, n2.length);
        for (var s2 = 0, a2 = 0, o2 = t2.length, h2 = n2.length; s2 < o2 && a2 < h2; s2++, a2++) {
          this.debug("matchOne loop");
          var c2, u2 = n2[a2], p2 = t2[s2];
          if (this.debug(n2, u2, p2), false === u2)
            return false;
          if (u2 === e) {
            this.debug("GLOBSTAR", [n2, u2, p2]);
            var f2 = s2, g2 = a2 + 1;
            if (g2 === h2) {
              for (this.debug("** at the end"); s2 < o2; s2++)
                if ("." === t2[s2] || ".." === t2[s2] || !i2.dot && "." === t2[s2].charAt(0))
                  return false;
              return true;
            }
            for (; f2 < o2; ) {
              var l2 = t2[f2];
              if (this.debug("\nglobstar while", t2, f2, n2, g2, l2), this.matchOne(t2.slice(f2), n2.slice(g2), r2))
                return this.debug("globstar found match!", f2, o2, l2), true;
              if ("." === l2 || ".." === l2 || !i2.dot && "." === l2.charAt(0)) {
                this.debug("dot detected!", t2, f2, n2, g2);
                break;
              }
              this.debug("globstar swallow a segment, and continue"), f2++;
            }
            return !(!r2 || (this.debug("\n>>> no match, partial?", t2, f2, n2, g2), f2 !== o2));
          }
          if ("string" == typeof u2 ? (c2 = i2.nocase ? p2.toLowerCase() === u2.toLowerCase() : p2 === u2, this.debug("string match", u2, p2, c2)) : (c2 = p2.match(u2), this.debug("pattern match", u2, p2, c2)), !c2)
            return false;
        }
        if (s2 === o2 && a2 === h2)
          return true;
        if (s2 === o2)
          return r2;
        if (a2 === h2)
          return s2 === o2 - 1 && "" === t2[s2];
        throw new Error("wtf?");
      };
    }, { "path": "UUq2", "brace-expansion": "dwXQ" }], "D1Ra": [function(require2, module2, exports3) {
      var n = require2("es6-promisify"), t = n.promisify, e = require2("../path.js"), i = require2("../errors.js"), r = require2("./environment.js"), o = require2("../../lib/async.js"), u = require2("minimatch");
      function c(n2, o2) {
        var u2 = this, c2 = new r((o2 = o2 || {}).env), f = "/";
        Object.defineProperty(this, "fs", { get: function() {
          return n2;
        }, enumerable: true }), Object.defineProperty(this, "env", { get: function() {
          return c2;
        }, enumerable: true }), this.cd = function(t2, r2) {
          t2 = e.resolve(f, t2), n2.stat(t2, function(n3, e2) {
            n3 ? r2(new i.ENOTDIR(null, t2)) : "DIRECTORY" === e2.type ? (f = t2, r2()) : r2(new i.ENOTDIR(null, t2));
          });
        }, this.pwd = function() {
          return f;
        }, this.promises = {}, ["cd", "exec", "touch", "cat", "ls", "rm", "tempDir", "mkdirp", "find"].forEach(function(n3) {
          u2.promises[n3] = t(u2[n3].bind(u2));
        });
      }
      c.prototype.exec = function(n2, t2, i2) {
        var r2 = this.fs;
        "function" == typeof t2 && (i2 = t2, t2 = []), t2 = t2 || [], i2 = i2 || function() {
        }, n2 = e.resolve(this.pwd(), n2), r2.readFile(n2, "utf8", function(n3, e2) {
          if (n3)
            i2(n3);
          else
            try {
              new Function("fs", "args", "callback", e2)(r2, t2, i2);
            } catch (o2) {
              i2(o2);
            }
        });
      }, c.prototype.touch = function(n2, t2, i2) {
        var r2 = this.fs;
        "function" == typeof t2 && (i2 = t2, t2 = {}), t2 = t2 || {}, i2 = i2 || function() {
        }, n2 = e.resolve(this.pwd(), n2), r2.stat(n2, function(e2) {
          e2 ? true === t2.updateOnly ? i2() : function(n3) {
            r2.writeFile(n3, "", i2);
          }(n2) : function(n3) {
            var e3 = Date.now(), o2 = t2.date || e3, u2 = t2.date || e3;
            r2.utimes(n3, o2, u2, i2);
          }(n2);
        });
      }, c.prototype.cat = function(n2, t2) {
        var r2 = this, u2 = r2.fs, c2 = "";
        t2 = t2 || function() {
        }, n2 ? (n2 = "string" == typeof n2 ? [n2] : n2, o.eachSeries(n2, function(n3, t3) {
          var i2 = e.resolve(r2.pwd(), n3);
          u2.readFile(i2, "utf8", function(n4, e2) {
            n4 ? t3(n4) : (c2 += e2 + "\n", t3());
          });
        }, function(n3) {
          n3 ? t2(n3) : t2(null, c2.replace(/\n$/, ""));
        })) : t2(new i.EINVAL("Missing files argument"));
      }, c.prototype.ls = function(n2, t2, r2) {
        var u2 = this, c2 = u2.fs;
        "function" == typeof t2 && (r2 = t2, t2 = {}), t2 = t2 || {}, r2 = r2 || function() {
        }, n2 ? function n3(i2, r3) {
          var f = e.resolve(u2.pwd(), i2), s = [];
          c2.readdir(f, function(i3, u3) {
            i3 ? r3(i3) : o.eachSeries(u3, function(i4, r4) {
              i4 = e.join(f, i4), c2.stat(i4, function(i5, o2) {
                if (i5)
                  r4(i5);
                else {
                  var u4 = o2;
                  t2.recursive && "DIRECTORY" === o2.type ? n3(e.join(f, u4.name), function(n4, t3) {
                    n4 ? r4(n4) : (u4.contents = t3, s.push(u4), r4());
                  }) : (s.push(u4), r4());
                }
              });
            }, function(n4) {
              r3(n4, s);
            });
          });
        }(n2, r2) : r2(new i.EINVAL("Missing dir argument"));
      }, c.prototype.rm = function(n2, t2, r2) {
        var u2 = this, c2 = u2.fs;
        "function" == typeof t2 && (r2 = t2, t2 = {}), t2 = t2 || {}, r2 = r2 || function() {
        }, n2 ? function n3(r3, f) {
          r3 = e.resolve(u2.pwd(), r3), c2.stat(r3, function(u3, s) {
            u3 ? f(u3) : "FILE" !== s.type ? c2.readdir(r3, function(u4, s2) {
              u4 ? f(u4) : 0 !== s2.length ? t2.recursive ? (s2 = s2.map(function(n4) {
                return e.join(r3, n4);
              }), o.eachSeries(s2, n3, function(n4) {
                n4 ? f(n4) : c2.rmdir(r3, f);
              })) : f(new i.ENOTEMPTY(null, r3)) : c2.rmdir(r3, f);
            }) : c2.unlink(r3, f);
          });
        }(n2, r2) : r2(new i.EINVAL("Missing path argument"));
      }, c.prototype.tempDir = function(n2) {
        var t2 = this.fs, e2 = this.env.get("TMP");
        n2 = n2 || function() {
        }, t2.mkdir(e2, function() {
          n2(null, e2);
        });
      }, c.prototype.mkdirp = function(n2, t2) {
        var r2 = this.fs;
        t2 = t2 || function() {
        }, n2 ? "/" !== (n2 = e.resolve(this.pwd(), n2)) ? function n3(t3, o2) {
          r2.stat(t3, function(u2, c2) {
            if (c2) {
              if (c2.isDirectory())
                return void o2();
              if (c2.isFile())
                return void o2(new i.ENOTDIR(null, t3));
            } else {
              if (u2 && "ENOENT" !== u2.code)
                return void o2(u2);
              var f = e.dirname(t3);
              "/" === f ? r2.mkdir(t3, function(n4) {
                n4 && "EEXIST" !== n4.code ? o2(n4) : o2();
              }) : n3(f, function(n4) {
                if (n4)
                  return o2(n4);
                r2.mkdir(t3, function(n5) {
                  n5 && "EEXIST" !== n5.code ? o2(n5) : o2();
                });
              });
            }
          });
        }(n2, t2) : t2() : t2(new i.EINVAL("Missing path argument"));
      }, c.prototype.find = function(n2, t2, r2) {
        var c2 = this, f = c2.fs;
        "function" == typeof t2 && (r2 = t2, t2 = {}), r2 = r2 || function() {
        };
        var s = (t2 = t2 || {}).exec || function(n3, t3) {
          t3();
        }, a = [];
        function p(n3, i2) {
          var r3 = e.removeTrailing(n3);
          !t2.regex || t2.regex.test(r3) ? t2.name && !u(e.basename(r3), t2.name) || t2.path && !u(e.dirname(r3), t2.path) ? i2() : function(n4, t3) {
            s(n4, function(e2) {
              e2 ? t3(e2) : (a.push(n4), t3());
            });
          }(n3, i2) : i2();
        }
        function d(n3, t3) {
          n3 = e.resolve(c2.pwd(), n3), f.readdir(n3, function(i2, r3) {
            i2 ? "ENOTDIR" === i2.code ? p(n3, t3) : t3(i2) : p(e.addTrailing(n3), function(i3) {
              i3 ? t3(i3) : (r3 = r3.map(function(t4) {
                return e.join(n3, t4);
              }), o.eachSeries(r3, d, function(n4) {
                t3(n4, a);
              }));
            });
          });
        }
        n2 ? f.stat(n2, function(t3, e2) {
          t3 ? r2(t3) : e2.isDirectory() ? d(n2, r2) : r2(new i.ENOTDIR(null, n2));
        }) : r2(new i.EINVAL("Missing path argument"));
      }, module2.exports = c;
    }, { "es6-promisify": "b1ZG", "../path.js": "UzoP", "../errors.js": "p8GN", "./environment.js": "QMiB", "../../lib/async.js": "u4Zs", "minimatch": "NtKi" }], "J4Qg": [function(require2, module2, exports3) {
      function t(t2, r2) {
        for (var o2 = r2.length - 1; o2 >= 0; o2--)
          r2[o2] === t2 && r2.splice(o2, 1);
        return r2;
      }
      var r = function() {
      };
      r.createInterface = function(r2) {
        var o2 = { on: function(t2, o3) {
          void 0 === this[r2] && (this[r2] = {}), this[r2].hasOwnProperty(t2) || (this[r2][t2] = []), this[r2][t2].push(o3);
        }, off: function(o3, e2) {
          void 0 !== this[r2] && this[r2].hasOwnProperty(o3) && t(e2, this[r2][o3]);
        }, trigger: function(t2) {
          if (void 0 !== this[r2] && this[r2].hasOwnProperty(t2))
            for (var o3 = Array.prototype.slice.call(arguments, 1), e2 = 0; e2 < this[r2][t2].length; e2++)
              this[r2][t2][e2].apply(this[r2][t2][e2], o3);
        }, removeAllListeners: function(t2) {
          if (void 0 !== this[r2]) {
            var o3 = this;
            o3[r2][t2].forEach(function(r3) {
              o3.off(t2, r3);
            });
          }
        } };
        return o2;
      };
      var o = r.createInterface("_handlers");
      r.prototype._on = o.on, r.prototype._off = o.off, r.prototype._trigger = o.trigger;
      var e = r.createInterface("handlers");
      r.prototype.on = function() {
        e.on.apply(this, arguments), Array.prototype.unshift.call(arguments, "on"), this._trigger.apply(this, arguments);
      }, r.prototype.off = e.off, r.prototype.trigger = e.trigger, r.prototype.removeAllListeners = e.removeAllListeners, module2.exports = r;
    }, {}], "zBMa": [function(require2, module2, exports3) {
      function x(x2) {
        return x2.replace(/[xy]/g, function(x3) {
          var n2 = 16 * Math.random() | 0;
          return ("x" === x3 ? n2 : 3 & n2 | 8).toString(16);
        });
      }
      function n() {
        return x("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").toUpperCase();
      }
      function r(n2) {
        return x("x".repeat(n2 = n2 || 6));
      }
      function t() {
      }
      module2.exports = { guid: n, nop: t, randomChars: r };
    }, {}], "u7Jv": [function(require2, module2, exports3) {
      var global = arguments[3];
      var t = arguments[3];
      function e(t2) {
        return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
          return typeof t3;
        } : function(t3) {
          return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
        })(t2);
      }
      var n = require2("./eventemitter.js"), o = require2("../src/shared.js").guid;
      function r(t2, e2) {
        var n2 = 0;
        return function() {
          var o2 = Date.now();
          o2 - n2 > t2 && (n2 = o2, e2.apply(this, arguments));
        };
      }
      function i(t2, n2) {
        if (void 0 !== t2 && t2 || (t2 = {}), "object" === e(n2))
          for (var o2 in n2)
            n2.hasOwnProperty(o2) && (t2[o2] = n2[o2]);
        return t2;
      }
      var a = function(t2) {
        return void 0 === t2 || void 0 === t2.localStorage ? { getItem: function() {
        }, setItem: function() {
        }, removeItem: function() {
        } } : t2.localStorage;
      }(t);
      function s() {
        var e2 = this, n2 = Date.now();
        this.origin = o(), this.lastMessage = n2, this.receivedIDs = {}, this.previousValues = {};
        var r2 = function() {
          e2._onStorageEvent.apply(e2, arguments);
        };
        "undefined" != typeof document && (document.attachEvent ? document.attachEvent("onstorage", r2) : t.addEventListener("storage", r2, false));
      }
      s.prototype._transaction = function(t2) {
        var e2 = 1e3, n2 = 20, o2 = this, r2 = false, i2 = false, s2 = null;
        function c2() {
          if (!r2) {
            var u2 = Date.now(), f2 = 0 | a.getItem(p);
            if (f2 && u2 - f2 < e2)
              return i2 || (o2._on("storage", c2), i2 = true), void (s2 = setTimeout(c2, n2));
            r2 = true, a.setItem(p, u2), t2(), function() {
              i2 && o2._off("storage", c2);
              s2 && clearTimeout(s2);
              a.removeItem(p);
            }();
          }
        }
        c2();
      }, s.prototype._cleanup_emit = r(100, function() {
        this._transaction(function() {
          var t2, e2 = Date.now() - f, n2 = 0;
          try {
            t2 = JSON.parse(a.getItem(c) || "[]");
          } catch (r2) {
            t2 = [];
          }
          for (var o2 = t2.length - 1; o2 >= 0; o2--)
            t2[o2].timestamp < e2 && (t2.splice(o2, 1), n2++);
          n2 > 0 && a.setItem(c, JSON.stringify(t2));
        });
      }), s.prototype._cleanup_once = r(100, function() {
        var t2 = this;
        t2._transaction(function() {
          Date.now();
          var e2, n2, o2 = 0;
          try {
            n2 = JSON.parse(a.getItem(u) || "{}");
          } catch (r2) {
            n2 = {};
          }
          for (e2 in n2)
            t2._once_expired(e2, n2) && (delete n2[e2], o2++);
          o2 > 0 && a.setItem(u, JSON.stringify(n2));
        });
      }), s.prototype._once_expired = function(t2, n2) {
        if (!n2)
          return true;
        if (!n2.hasOwnProperty(t2))
          return true;
        if ("object" !== e(n2[t2]))
          return true;
        var o2 = n2[t2].ttl || m, r2 = Date.now();
        return n2[t2].timestamp < r2 - o2;
      }, s.prototype._localStorageChanged = function(t2, e2) {
        if (t2 && t2.key)
          return t2.key === e2;
        var n2 = a.getItem(e2);
        return n2 !== this.previousValues[e2] && (this.previousValues[e2] = n2, true);
      }, s.prototype._onStorageEvent = function(e2) {
        e2 = e2 || t.event;
        var n2 = this;
        this._localStorageChanged(e2, c) && this._transaction(function() {
          var t2, e3 = Date.now(), o2 = a.getItem(c);
          try {
            t2 = JSON.parse(o2 || "[]");
          } catch (i2) {
            t2 = [];
          }
          for (var r2 = 0; r2 < t2.length; r2++)
            if (t2[r2].origin !== n2.origin && !(t2[r2].timestamp < n2.lastMessage)) {
              if (t2[r2].id) {
                if (n2.receivedIDs.hasOwnProperty(t2[r2].id))
                  continue;
                n2.receivedIDs[t2[r2].id] = true;
              }
              n2.trigger(t2[r2].name, t2[r2].payload);
            }
          n2.lastMessage = e3;
        }), this._trigger("storage", e2);
      }, s.prototype._emit = function(t2, e2, n2) {
        if ((n2 = "string" == typeof n2 || "number" == typeof n2 ? String(n2) : null) && n2.length) {
          if (this.receivedIDs.hasOwnProperty(n2))
            return;
          this.receivedIDs[n2] = true;
        }
        var o2 = { id: n2, name: t2, origin: this.origin, timestamp: Date.now(), payload: e2 }, r2 = this;
        this._transaction(function() {
          var n3 = a.getItem(c) || "[]", i2 = "[]" === n3 ? "" : ",";
          n3 = [n3.substring(0, n3.length - 1), i2, JSON.stringify(o2), "]"].join(""), a.setItem(c, n3), r2.trigger(t2, e2), setTimeout(function() {
            r2._cleanup_emit();
          }, 50);
        });
      }, s.prototype.emit = function(t2, e2) {
        this._emit.apply(this, arguments), this._trigger("emit", t2, e2);
      }, s.prototype.once = function(t2, e2, n2) {
        if (s.supported) {
          var o2 = this;
          this._transaction(function() {
            var r2;
            try {
              r2 = JSON.parse(a.getItem(u) || "{}");
            } catch (i2) {
              r2 = {};
            }
            o2._once_expired(t2, r2) && (r2[t2] = {}, r2[t2].timestamp = Date.now(), "number" == typeof n2 && (r2[t2].ttl = 1e3 * n2), a.setItem(u, JSON.stringify(r2)), e2(), setTimeout(function() {
              o2._cleanup_once();
            }, 50));
          });
        }
      }, i(s.prototype, n.prototype), s.supported = void 0 !== a;
      var c = "intercom", u = "intercom_once", p = "intercom_lock", f = 5e4, m = 36e5;
      s.destroy = function() {
        a.removeItem(p), a.removeItem(c), a.removeItem(u);
      }, s.getInstance = function() {
        var t2;
        return function() {
          return t2 || (t2 = new s()), t2;
        };
      }(), module2.exports = s;
    }, { "./eventemitter.js": "J4Qg", "../src/shared.js": "zBMa" }], "VLEe": [function(require2, module2, exports3) {
      var e = require2("../lib/eventemitter.js"), t = require2("./path.js"), n = require2("../lib/intercom.js");
      function r() {
        e.call(this);
        var r2, i, o = this, s = false;
        function c(e2) {
          (i === e2 || s && 0 === e2.indexOf(r2)) && o.trigger("change", "change", e2);
        }
        o.start = function(e2, o2, a) {
          if (!i) {
            if (t.isNull(e2))
              throw new Error("Path must be a string without null bytes.");
            i = t.normalize(e2), (s = true === a) && (r2 = "/" === i ? "/" : i + "/"), n.getInstance().on("change", c);
          }
        }, o.close = function() {
          n.getInstance().off("change", c), o.removeAllListeners("change");
        };
      }
      r.prototype = new e(), r.prototype.constructor = r, module2.exports = r;
    }, { "../lib/eventemitter.js": "J4Qg", "./path.js": "UzoP", "../lib/intercom.js": "u7Jv" }], "ZECt": [function(require2, module2, exports3) {
      var t = require2("./constants.js").NODE_TYPE_FILE;
      module2.exports = function(s, e) {
        this.id = s, this.type = e || t;
      };
    }, { "./constants.js": "iJA9" }], "osLK": [function(require2, module2, exports3) {
      var r = require2("./constants"), e = r.FIRST_DESCRIPTOR, n = {}, t = function() {
        for (var r2 = e; o(r2); )
          r2++;
        return r2;
      }, o = function(r2) {
        return n[r2];
      }, i = function(r2) {
        var e2 = t();
        return n[e2] = r2, e2;
      }, u = function(r2) {
        return delete n[r2];
      };
      module2.exports = { allocDescriptor: i, releaseDescriptor: u, getOpenFileDescription: o };
    }, { "./constants": "iJA9" }], "KKNo": [function(require2, module2, exports3) {
      function t(t2, i2) {
        if (!(t2 instanceof i2))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(t2, i2) {
        for (var s2 = 0; s2 < i2.length; s2++) {
          var e2 = i2[s2];
          e2.enumerable = e2.enumerable || false, e2.configurable = true, "value" in e2 && (e2.writable = true), Object.defineProperty(t2, e2.key, e2);
        }
      }
      function s(t2, s2, e2) {
        return s2 && i(t2.prototype, s2), e2 && i(t2, e2), t2;
      }
      var e = require2("./constants"), n = e.NODE_TYPE_FILE, r = e.NODE_TYPE_DIRECTORY, a = e.NODE_TYPE_SYMBOLIC_LINK, o = e.DEFAULT_FILE_PERMISSIONS, u = e.DEFAULT_DIR_PERMISSIONS, h = require2("./constants").fsConstants, c = h.S_IFREG, f = h.S_IFDIR, m = h.S_IFLNK;
      function d(t2, i2, s2) {
        if (t2[i2])
          return s2();
        t2.guid(function(e2, n2) {
          if (e2)
            return s2(e2);
          t2[i2] = n2, s2();
        });
      }
      function l(t2, i2) {
        switch (t2) {
          case r:
            return (i2 || u) | f;
          case a:
            return (i2 || o) | m;
          case n:
          default:
            return (i2 || o) | c;
        }
      }
      var p = function() {
        function i2(s2) {
          t(this, i2);
          var e2 = Date.now();
          this.id = s2.id, this.data = s2.data, this.size = s2.size || 0, this.atime = s2.atime || e2, this.ctime = s2.ctime || e2, this.mtime = s2.mtime || e2, this.flags = s2.flags || [], this.xattrs = s2.xattrs || {}, this.nlinks = s2.nlinks || 0, "string" == typeof s2.type ? this.type = s2.type : "string" == typeof s2.mode ? this.type = s2.mode : this.type = n, this.permissions = s2.permissions || l(this.type), this.uid = s2.uid || 0, this.gid = s2.gid || 0;
        }
        return s(i2, [{ key: "toJSON", value: function() {
          return { id: this.id, data: this.data, size: this.size, atime: this.atime, ctime: this.ctime, mtime: this.ctime, flags: this.flags, xattrs: this.xattrs, nlinks: this.nlinks, mode: this.type, permissions: this.permissions, uid: this.uid, gid: this.gid };
        } }, { key: "mode", get: function() {
          return l(this.type, this.permissions);
        }, set: function(t2) {
          this.permissions = t2;
        } }]), i2;
      }();
      module2.exports.create = function(t2, i2) {
        d(t2, "id", function(s2) {
          if (s2)
            return i2(s2);
          d(t2, "data", function(s3) {
            if (s3)
              return i2(s3);
            i2(null, new p(t2));
          });
        });
      };
    }, { "./constants": "iJA9" }], "XWaV": [function(require2, module2, exports3) {
      var e = require2("./errors.js"), t = require2("./node");
      function i(e2, t2, i2, r) {
        this.path = e2, this.id = t2, this.flags = i2, this.position = r;
      }
      i.prototype.getNode = function(i2, r) {
        var o = this.id, n = this.path;
        i2.getObject(o, function(i3, o2) {
          return i3 ? r(i3) : o2 ? void t.create(o2, r) : r(new e.EBADF("file descriptor refers to unknown node", n));
        });
      }, module2.exports = i;
    }, { "./errors.js": "p8GN", "./node": "KKNo" }], "JEp0": [function(require2, module2, exports3) {
      var t = require2("./constants.js");
      function e(e2) {
        var i = Date.now();
        this.id = t.SUPER_NODE_ID, this.type = t.NODE_TYPE_META, this.atime = e2.atime || i, this.ctime = e2.ctime || i, this.mtime = e2.mtime || i, this.rnode = e2.rnode;
      }
      e.create = function(t2, i) {
        t2.guid(function(n, o) {
          n ? i(n) : (t2.rnode = t2.rnode || o, i(null, new e(t2)));
        });
      }, module2.exports = e;
    }, { "./constants.js": "iJA9" }], "dsCT": [function(require2, module2, exports3) {
      "use strict";
      var t = require2("./constants.js"), i = require2("./path.js");
      function e(t2) {
        return new Date(Number(t2));
      }
      function s(t2, s2, o) {
        this.dev = o, this.node = s2.id, this.type = s2.type, this.size = s2.size, this.nlinks = s2.nlinks, this.atime = e(s2.atime), this.mtime = e(s2.mtime), this.ctime = e(s2.ctime), this.atimeMs = s2.atime, this.mtimeMs = s2.mtime, this.ctimeMs = s2.ctime, this.version = s2.version, this.mode = s2.mode, this.uid = s2.uid, this.gid = s2.gid, this.name = i.basename(t2);
      }
      s.prototype.isFile = function() {
        return this.type === t.NODE_TYPE_FILE;
      }, s.prototype.isDirectory = function() {
        return this.type === t.NODE_TYPE_DIRECTORY;
      }, s.prototype.isSymbolicLink = function() {
        return this.type === t.NODE_TYPE_SYMBOLIC_LINK;
      }, s.prototype.isSocket = s.prototype.isFIFO = s.prototype.isCharacterDevice = s.prototype.isBlockDevice = function() {
        return false;
      }, module2.exports = s;
    }, { "./constants.js": "iJA9", "./path.js": "UzoP" }], "q4Wu": [function(require2, module2, exports3) {
      "use strict";
      var t = require2("./stats.js");
      function o(r, s, e) {
        this.constructor = o, t.call(this, r, s, e);
      }
      o.prototype = t.prototype, module2.exports = o;
    }, { "./stats.js": "dsCT" }], "bsBG": [function(require2, module2, exports3) {
      var Buffer3 = require2("buffer").Buffer;
      var e = require2("buffer").Buffer;
      function n(e2) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        })(e2);
      }
      var t = require2("../path.js"), i = t.normalize, o = t.dirname, r = t.basename, u = t.isAbsolute, a = require2("../shared.js"), c = require2("../../lib/async.js"), f = require2("../constants.js"), l = f.NODE_TYPE_FILE, s = f.NODE_TYPE_DIRECTORY, p = f.NODE_TYPE_SYMBOLIC_LINK, d = f.NODE_TYPE_META, m = f.FULL_READ_WRITE_EXEC_PERMISSIONS, E = f.ROOT_DIRECTORY_NAME, g = f.SUPER_NODE_ID, w = f.SYMLOOP_MAX, O = f.O_READ, b = f.O_WRITE, y = f.O_CREATE, v = f.O_EXCLUSIVE, N = f.O_APPEND, h = f.O_FLAGS, I = f.XATTR_CREATE, j = f.XATTR_REPLACE, A = f.FS_NOMTIME, D = f.FS_NOCTIME, T = require2("../errors.js"), L = require2("../directory-entry.js"), R = require2("../open-files.js"), _ = require2("../open-file-description.js"), F = require2("../super-node.js"), S = require2("../node.js"), V = require2("../dirent.js"), B = require2("../stats.js");
      function P(e2, n2, t2, i2, o2) {
        var r2 = e2.flags;
        r2.includes(D) && delete i2.ctime, r2.includes(A) && delete i2.mtime;
        var u2 = false;
        function a2(t3) {
          e2.changes.push({ event: "change", path: n2 }), o2(t3);
        }
        i2.ctime && (t2.ctime = i2.ctime, t2.atime = i2.ctime, u2 = true), i2.atime && (t2.atime = i2.atime, u2 = true), i2.mtime && (t2.mtime = i2.mtime, u2 = true), u2 ? e2.putObject(t2.id, t2, a2) : a2();
      }
      function x(e2, n2, t2, u2) {
        if (t2 !== s && t2 !== l)
          return u2(new T.EINVAL("type must be a directory or file", n2));
        n2 = i(n2);
        var a2, c2, f2, p2 = r(n2), d2 = o(n2);
        function m2(t3, i2) {
          !t3 && i2 ? u2(new T.EEXIST("path name already exists", n2)) : !t3 || t3 instanceof T.ENOENT ? e2.getObject(a2.data, E2) : u2(t3);
        }
        function E2(n3, i2) {
          n3 ? u2(n3) : (c2 = i2, S.create({ guid: e2.guid, type: t2 }, function(n4, t3) {
            n4 ? u2(n4) : ((f2 = t3).nlinks += 1, e2.putObject(f2.id, f2, w2));
          }));
        }
        function g2(n3) {
          if (n3)
            u2(n3);
          else {
            var t3 = Date.now();
            P(e2, d2, f2, { mtime: t3, ctime: t3 }, u2);
          }
        }
        function w2(n3) {
          n3 ? u2(n3) : (c2[p2] = new L(f2.id, t2), e2.putObject(a2.data, c2, g2));
        }
        k(e2, d2, function(t3, i2) {
          t3 ? u2(t3) : i2.type !== s ? u2(new T.ENOTDIR("a component of the path prefix is not a directory", n2)) : (a2 = i2, k(e2, n2, m2));
        });
      }
      function k(e2, n2, t2) {
        if (!(n2 = i(n2)))
          return t2(new T.ENOENT("path is an empty string"));
        var u2 = r(n2), a2 = o(n2), c2 = 0;
        function f2(n3, i2) {
          if (n3)
            return t2(n3);
          var o2 = new F(i2);
          o2 && o2.type === d && o2.rnode ? e2.getObject(o2.rnode, l2) : t2(new T.EFILESYSTEMERROR());
        }
        function l2(e3, n3) {
          e3 ? t2(e3) : n3 ? S.create(n3, t2) : t2(new T.ENOENT());
        }
        function m2(i2, o2) {
          i2 ? t2(i2) : o2.type === s && o2.data ? e2.getObject(o2.data, O2) : t2(new T.ENOTDIR("a component of the path prefix is not a directory", n2));
        }
        function O2(i2, o2) {
          if (i2)
            t2(i2);
          else if (Object.prototype.hasOwnProperty.call(o2, u2)) {
            var r2 = o2[u2].id;
            e2.getObject(r2, b2);
          } else
            t2(new T.ENOENT(null, n2));
        }
        function b2(e3, n3) {
          if (e3)
            return t2(e3);
          S.create(n3, y2);
        }
        function y2(l3, s2) {
          var d2;
          l3 ? t2(l3) : s2.type === p ? ++c2 > w ? t2(new T.ELOOP(null, n2)) : (d2 = s2.data, d2 = i(d2), a2 = o(d2), u2 = r(d2), E === u2 ? e2.getObject(g, f2) : k(e2, a2, m2)) : t2(null, s2);
        }
        E === u2 ? e2.getObject(g, f2) : k(e2, a2, m2);
      }
      function C(e2, n2, t2, i2, o2, r2, u2) {
        var a2 = t2.xattrs;
        r2 === I && Object.prototype.hasOwnProperty.call(a2, i2) ? u2(new T.EEXIST("attribute already exists", n2)) : r2 !== j || Object.prototype.hasOwnProperty.call(a2, i2) ? (a2[i2] = o2, e2.putObject(t2.id, t2, function(i3) {
          i3 ? u2(i3) : P(e2, n2, t2, { ctime: Date.now() }, u2);
        })) : u2(new T.ENOATTR(null, n2));
      }
      function X(e2, n2) {
        var t2, i2, o2;
        function r2(o3) {
          o3 ? n2(o3) : S.create({ guid: e2.guid, id: t2.rnode, type: s }, function(t3, o4) {
            t3 ? n2(t3) : ((i2 = o4).nlinks += 1, e2.putObject(i2.id, i2, u2));
          });
        }
        function u2(t3) {
          t3 ? n2(t3) : (o2 = {}, e2.putObject(i2.data, o2, n2));
        }
        e2.getObject(g, function(i3, o3) {
          !i3 && o3 ? n2() : !i3 || i3 instanceof T.ENOENT ? F.create({ guid: e2.guid }, function(i4, o4) {
            i4 ? n2(i4) : (t2 = o4, e2.putObject(t2.id, t2, r2));
          }) : n2(i3);
        });
      }
      function q(e2, n2, t2) {
        n2 = i(n2);
        var u2, a2, c2, f2, l2 = r(n2), p2 = o(n2);
        function d2(n3, i2) {
          n3 ? t2(n3) : (c2 = i2, e2.getObject(c2.data, m2));
        }
        function m2(n3, i2) {
          n3 ? t2(n3) : (f2 = i2, S.create({ guid: e2.guid, type: s }, function(n4, i3) {
            n4 ? t2(n4) : ((u2 = i3).nlinks += 1, e2.putObject(u2.id, u2, E2));
          }));
        }
        function E2(n3) {
          n3 ? t2(n3) : (a2 = {}, e2.putObject(u2.data, a2, w2));
        }
        function g2(n3) {
          if (n3)
            t2(n3);
          else {
            var i2 = Date.now();
            P(e2, p2, c2, { mtime: i2, ctime: i2 }, t2);
          }
        }
        function w2(n3) {
          n3 ? t2(n3) : (f2[l2] = new L(u2.id, s), e2.putObject(c2.data, f2, g2));
        }
        k(e2, n2, function(i2, o2) {
          !i2 && o2 ? t2(new T.EEXIST(null, n2)) : !i2 || i2 instanceof T.ENOENT ? k(e2, p2, d2) : t2(i2);
        });
      }
      function M(e2, n2, t2, o2) {
        var r2 = f.fsConstants, u2 = r2.F_OK, a2 = r2.R_OK, c2 = r2.W_OK, l2 = r2.X_OK, s2 = r2.S_IXUSR, p2 = r2.S_IXGRP, d2 = r2.S_IXOTH;
        k(e2, n2 = i(n2), function(e3, i2) {
          if (e3)
            return o2(e3);
          if (t2 === u2)
            return o2(null);
          var r3 = xe(i2.mode, o2);
          return r3 ? t2 & (a2 | c2) ? o2(null) : t2 & l2 && r3 & (s2 | p2 | d2) ? o2(null) : void o2(new T.EACCES("permission denied", n2)) : void 0;
        });
      }
      function z(e2, n2, t2) {
        n2 = i(n2);
        var u2, a2, c2, f2, l2 = r(n2), p2 = o(n2);
        function d2(i2, o2) {
          i2 ? t2(i2) : E === l2 ? t2(new T.EBUSY(null, n2)) : Object.prototype.hasOwnProperty.call(o2, l2) ? (u2 = (f2 = o2)[l2].id, e2.getObject(u2, m2)) : t2(new T.ENOENT(null, n2));
        }
        function m2(i2, o2) {
          i2 ? t2(i2) : o2.type !== s ? t2(new T.ENOTDIR(null, n2)) : (u2 = o2, e2.getObject(u2.data, g2));
        }
        function g2(i2, o2) {
          i2 ? t2(i2) : (a2 = o2, Object.keys(a2).length > 0 ? t2(new T.ENOTEMPTY(null, n2)) : (delete f2[l2], e2.putObject(c2.data, f2, w2)));
        }
        function w2(n3) {
          if (n3)
            t2(n3);
          else {
            var i2 = Date.now();
            P(e2, p2, c2, { mtime: i2, ctime: i2 }, O2);
          }
        }
        function O2(n3) {
          n3 ? t2(n3) : e2.delete(u2.id, b2);
        }
        function b2(n3) {
          n3 ? t2(n3) : e2.delete(u2.data, t2);
        }
        k(e2, p2, function(n3, i2) {
          n3 ? t2(n3) : (c2 = i2, e2.getObject(c2.data, d2));
        });
      }
      function Y(n2, t2, u2, a2, c2) {
        "function" == typeof a2 && (c2 = a2, a2 = null), t2 = i(t2);
        var f2, d2, m2, g2, O2, N2 = r(t2), h2 = o(t2), I2 = 0;
        function j2(e2, i2) {
          e2 ? c2(e2) : i2.type !== s ? c2(new T.ENOENT(null, t2)) : (f2 = i2, n2.getObject(f2.data, A2));
        }
        function A2(e2, i2) {
          e2 ? c2(e2) : (d2 = i2, Object.prototype.hasOwnProperty.call(d2, N2) ? u2.includes(v) ? c2(new T.EEXIST("O_CREATE and O_EXCLUSIVE are set, and the named file exists", t2)) : (m2 = d2[N2]).type === s && u2.includes(b) ? c2(new T.EISDIR("the named file is a directory and O_WRITE is set", t2)) : n2.getObject(m2.id, D2) : u2.includes(y) ? S.create({ guid: n2.guid, type: l }, function(e3, t3) {
            e3 ? c2(e3) : ((g2 = t3).nlinks += 1, a2 && (g2.mode = a2), n2.putObject(g2.id, g2, _2));
          }) : c2(new T.ENOENT("O_CREATE is not set and the named file does not exist", t2)));
        }
        function D2(e2, a3) {
          if (e2)
            c2(e2);
          else {
            var f3 = a3;
            f3.type === p ? ++I2 > w ? c2(new T.ELOOP(null, t2)) : function(e3) {
              e3 = i(e3), h2 = o(e3), N2 = r(e3), E === N2 && (u2.includes(b) ? c2(new T.EISDIR("the named file is a directory and O_WRITE is set", t2)) : k(n2, t2, R2));
              k(n2, h2, j2);
            }(f3.data) : R2(void 0, f3);
          }
        }
        function R2(e2, n3) {
          e2 ? c2(e2) : c2(null, g2 = n3);
        }
        function _2(t3) {
          t3 ? c2(t3) : (O2 = e.alloc(0), n2.putBuffer(g2.data, O2, V2));
        }
        function F2(e2) {
          if (e2)
            c2(e2);
          else {
            var t3 = Date.now();
            P(n2, h2, f2, { mtime: t3, ctime: t3 }, B2);
          }
        }
        function V2(e2) {
          e2 ? c2(e2) : (d2[N2] = new L(g2.id, l), n2.putObject(f2.data, d2, F2));
        }
        function B2(e2) {
          e2 ? c2(e2) : c2(null, g2);
        }
        E === N2 ? u2.includes(b) ? c2(new T.EISDIR("the named file is a directory and O_WRITE is set", t2)) : k(n2, t2, R2) : k(n2, h2, j2);
      }
      function K(n2, t2, i2, o2, r2, u2) {
        var a2;
        function c2(e2) {
          e2 ? u2(e2) : u2(null, r2);
        }
        function f2(e2) {
          if (e2)
            u2(e2);
          else {
            var i3 = Date.now();
            P(n2, t2.path, a2, { mtime: i3, ctime: i3 }, c2);
          }
        }
        function l2(e2) {
          e2 ? u2(e2) : n2.putObject(a2.id, a2, f2);
        }
        n2.getObject(t2.id, function(c3, f3) {
          if (c3)
            u2(c3);
          else {
            a2 = f3;
            var s2 = e.alloc(r2);
            i2.copy(s2, 0, o2, o2 + r2), t2.position = r2, a2.size = r2, a2.version += 1, n2.putBuffer(a2.data, s2, l2);
          }
        });
      }
      function U(n2, t2, i2, o2, r2, u2, a2) {
        var c2, f2;
        function l2(e2) {
          e2 ? a2(e2) : a2(null, r2);
        }
        function s2(e2) {
          if (e2)
            a2(e2);
          else {
            var i3 = Date.now();
            P(n2, t2.path, c2, { mtime: i3, ctime: i3 }, l2);
          }
        }
        function p2(e2) {
          e2 ? a2(e2) : n2.putObject(c2.id, c2, s2);
        }
        function d2(l3, s3) {
          if (l3)
            a2(l3);
          else {
            if (!(f2 = s3))
              return a2(new T.EIO("Expected Buffer"));
            var d3 = null != u2 ? u2 : t2.position, m2 = Math.max(f2.length, d3 + r2), E2 = e.alloc(m2);
            f2 && f2.copy(E2), i2.copy(E2, d3, o2, o2 + r2), void 0 === u2 && (t2.position += r2), c2.size = m2, c2.version += 1, n2.putBuffer(c2.data, E2, p2);
          }
        }
        n2.getObject(t2.id, function(e2, t3) {
          e2 ? a2(e2) : (c2 = t3, n2.getBuffer(c2.data, d2));
        });
      }
      function W(e2, n2, t2, i2, o2, r2, u2) {
        var a2, c2;
        function f2(e3, a3) {
          if (e3)
            u2(e3);
          else {
            if (!(c2 = a3))
              return u2(new T.EIO("Expected Buffer"));
            var f3 = null != r2 ? r2 : n2.position;
            o2 = f3 + o2 > t2.length ? o2 - f3 : o2, c2.copy(t2, i2, f3, f3 + o2), void 0 === r2 && (n2.position += o2), u2(null, o2);
          }
        }
        e2.getObject(n2.id, function(t3, i3) {
          t3 ? u2(t3) : i3.type === s ? u2(new T.EISDIR("the named file is a directory", n2.path)) : (a2 = i3, e2.getBuffer(a2.data, f2));
        });
      }
      function G(e2, n2, t2) {
        k(e2, n2 = i(n2), t2);
      }
      function H(e2, n2, t2) {
        n2.getNode(e2, t2);
      }
      function $(e2, n2, t2) {
        n2 = i(n2);
        var u2, a2, c2 = r(n2), f2 = o(n2);
        function l2(e3, n3) {
          if (e3)
            return t2(e3);
          S.create(n3, t2);
        }
        function s2(i2, o2) {
          i2 ? t2(i2) : (a2 = o2, Object.prototype.hasOwnProperty.call(a2, c2) ? e2.getObject(a2[c2].id, l2) : t2(new T.ENOENT("a component of the path does not name an existing file", n2)));
        }
        E === c2 ? k(e2, n2, t2) : k(e2, f2, function(n3, i2) {
          n3 ? t2(n3) : (u2 = i2, e2.getObject(u2.data, s2));
        });
      }
      function J(e2, n2, t2, u2) {
        n2 = i(n2);
        var a2 = r(n2), c2 = o(n2);
        t2 = i(t2);
        var f2, l2, p2, d2, m2, E2, g2 = r(t2), w2 = o(t2), O2 = Date.now();
        function b2(n3) {
          n3 ? u2(n3) : P(e2, t2, E2, { ctime: O2 }, u2);
        }
        function y2(n3, t3) {
          n3 ? u2(n3) : ((E2 = t3).nlinks += 1, e2.putObject(E2.id, E2, b2));
        }
        function v2(n3) {
          n3 ? u2(n3) : e2.getObject(m2, y2);
        }
        function N2(n3, t3) {
          n3 ? u2(n3) : (d2 = t3, Object.prototype.hasOwnProperty.call(d2, g2) ? u2(new T.EEXIST("newpath resolves to an existing file", g2)) : (d2[g2] = l2[a2], m2 = d2[g2].id, e2.putObject(p2.data, d2, v2)));
        }
        function h2(n3, t3) {
          n3 ? u2(n3) : (p2 = t3, e2.getObject(p2.data, N2));
        }
        function I2(n3, t3) {
          n3 ? u2(n3) : (l2 = t3, Object.prototype.hasOwnProperty.call(l2, a2) ? l2[a2].type === s ? u2(new T.EPERM("oldpath refers to a directory")) : k(e2, w2, h2) : u2(new T.ENOENT("a component of either path prefix does not exist", a2)));
        }
        k(e2, c2, function(n3, t3) {
          n3 ? u2(n3) : (f2 = t3, e2.getObject(f2.data, I2));
        });
      }
      function Q(e2, n2, t2) {
        n2 = i(n2);
        var u2, a2, c2, f2 = r(n2), l2 = o(n2);
        function p2(n3) {
          n3 ? t2(n3) : (delete a2[f2], e2.putObject(u2.data, a2, function(n4) {
            if (n4)
              t2(n4);
            else {
              var i2 = Date.now();
              P(e2, l2, u2, { mtime: i2, ctime: i2 }, t2);
            }
          }));
        }
        function d2(n3) {
          n3 ? t2(n3) : e2.delete(c2.data, p2);
        }
        function m2(i2, o2) {
          i2 ? t2(i2) : o2.type === s ? t2(new T.EPERM("unlink not permitted on directories", f2)) : function(i3, o3) {
            i3 ? t2(i3) : ((c2 = o3).nlinks -= 1, c2.nlinks < 1 ? e2.delete(c2.id, d2) : e2.putObject(c2.id, c2, function(i4) {
              i4 ? t2(i4) : P(e2, n2, c2, { ctime: Date.now() }, p2);
            }));
          }(null, o2);
        }
        function E2(n3, i2) {
          n3 ? t2(n3) : (a2 = i2, Object.prototype.hasOwnProperty.call(a2, f2) ? e2.getObject(a2[f2].id, m2) : t2(new T.ENOENT("a component of the path does not name an existing file", f2)));
        }
        k(e2, l2, function(n3, i2) {
          n3 ? t2(n3) : (u2 = i2, e2.getObject(u2.data, E2));
        });
      }
      function Z(n2, o2, r2, u2) {
        var a2, f2;
        function l2(i2, a3) {
          if (i2)
            u2(i2);
          else {
            f2 = a3;
            var l3 = Object.keys(f2);
            if (r2.encoding) {
              var s2 = l3.map(function(n3) {
                return e.from(n3);
              });
              l3 = "buffer" === r2.encoding ? s2 : s2.map(function(e2) {
                return e2.toString(r2.encoding);
              });
            }
            if (r2.withFileTypes) {
              var p2 = [];
              c.eachSeries(l3, function(i3, u3) {
                var a4 = e.from(i3, r2.encoding).toString(), c2 = t.join(o2, a4);
                ee(n2, c2, function(e2, n3) {
                  e2 && u3(e2), n3.name = i3, p2.push(n3), u3();
                });
              }, function(e2) {
                u2(e2, p2);
              });
            } else
              u2(null, l3);
          }
        }
        o2 = i(o2), "function" == typeof r2 && (u2 = r2, r2 = {}), r2 = ne(r2), k(n2, o2, function(e2, t2) {
          e2 ? u2(e2) : t2.type !== s ? u2(new T.ENOTDIR(null, o2)) : (a2 = t2, n2.getObject(a2.data, l2));
        });
      }
      function ee(e2, n2, t2) {
        $(e2, n2, function(i2, o2) {
          if (i2)
            t2(i2);
          else {
            var r2 = new V(n2, o2, e2.name);
            t2(null, r2);
          }
        });
      }
      function ne(e2, n2) {
        return e2 ? "function" == typeof e2 ? e2 = { encoding: n2 } : "string" == typeof e2 && (e2 = { encoding: e2 }) : e2 = { encoding: n2 }, e2;
      }
      function te(e2, n2, a2, c2) {
        a2 = i(a2);
        var f2, l2, s2, d2 = r(a2), m2 = o(a2);
        function g2(i2, o2) {
          i2 ? c2(i2) : (l2 = o2, Object.prototype.hasOwnProperty.call(l2, d2) ? c2(new T.EEXIST(null, d2)) : S.create({ guid: e2.guid, type: p }, function(i3, o3) {
            i3 ? c2(i3) : ((s2 = o3).nlinks += 1, u(n2) || (s2.symlink_relpath = n2, n2 = t.resolve(m2, n2)), s2.size = n2.length, s2.data = n2, e2.putObject(s2.id, s2, O2));
          }));
        }
        function w2(n3) {
          if (n3)
            c2(n3);
          else {
            var t2 = Date.now();
            P(e2, m2, f2, { mtime: t2, ctime: t2 }, c2);
          }
        }
        function O2(n3) {
          n3 ? c2(n3) : (l2[d2] = new L(s2.id, p), e2.putObject(f2.data, l2, w2));
        }
        E === d2 ? c2(new T.EEXIST(null, d2)) : k(e2, m2, function(n3, t2) {
          n3 ? c2(n3) : (f2 = t2, e2.getObject(f2.data, g2));
        });
      }
      function ie(e2, n2, t2) {
        n2 = i(n2);
        var u2, a2, c2 = r(n2), f2 = o(n2);
        function l2(n3, i2) {
          n3 ? t2(n3) : (a2 = i2, Object.prototype.hasOwnProperty.call(a2, c2) ? e2.getObject(a2[c2].id, s2) : t2(new T.ENOENT("a component of the path does not name an existing file", c2)));
        }
        function s2(e3, i2) {
          if (e3)
            t2(e3);
          else if (i2.type !== p)
            t2(new T.EINVAL("path not a symbolic link", n2));
          else {
            var o2 = i2.symlink_relpath ? i2.symlink_relpath : i2.data;
            t2(null, o2);
          }
        }
        k(e2, f2, function(n3, i2) {
          n3 ? t2(n3) : (u2 = i2, e2.getObject(u2.data, l2));
        });
      }
      function oe(n2, t2, o2, r2) {
        var u2;
        function a2(t3, i2) {
          if (t3)
            r2(t3);
          else {
            if (!i2)
              return r2(new T.EIO("Expected Buffer"));
            var a3 = e.alloc(o2);
            i2 && i2.copy(a3), n2.putBuffer(u2.data, a3, f2);
          }
        }
        function c2(e2) {
          if (e2)
            r2(e2);
          else {
            var i2 = Date.now();
            P(n2, t2, u2, { mtime: i2, ctime: i2 }, r2);
          }
        }
        function f2(e2) {
          e2 ? r2(e2) : (u2.size = o2, u2.version += 1, n2.putObject(u2.id, u2, c2));
        }
        t2 = i(t2), o2 < 0 ? r2(new T.EINVAL("length cannot be negative")) : k(n2, t2, function(e2, i2) {
          e2 ? r2(e2) : i2.type === s ? r2(new T.EISDIR(null, t2)) : (u2 = i2, n2.getBuffer(u2.data, a2));
        });
      }
      function re(n2, t2, i2, o2) {
        var r2;
        function u2(t3, u3) {
          if (t3)
            o2(t3);
          else {
            var a3;
            if (!u3)
              return o2(new T.EIO("Expected Buffer"));
            a3 = u3 ? u3.slice(0, i2) : e.alloc(i2), n2.putBuffer(r2.data, a3, c2);
          }
        }
        function a2(e2) {
          if (e2)
            o2(e2);
          else {
            var i3 = Date.now();
            P(n2, t2.path, r2, { mtime: i3, ctime: i3 }, o2);
          }
        }
        function c2(e2) {
          e2 ? o2(e2) : (r2.size = i2, r2.version += 1, n2.putObject(r2.id, r2, a2));
        }
        i2 < 0 ? o2(new T.EINVAL("length cannot be negative")) : t2.getNode(n2, function(e2, t3) {
          e2 ? o2(e2) : t3.type === s ? o2(new T.EISDIR()) : (r2 = t3, n2.getBuffer(r2.data, u2));
        });
      }
      function ue(e2, n2, t2, o2, r2) {
        n2 = i(n2), "number" != typeof t2 || "number" != typeof o2 ? r2(new T.EINVAL("atime and mtime must be number", n2)) : t2 < 0 || o2 < 0 ? r2(new T.EINVAL("atime and mtime must be positive integers", n2)) : k(e2, n2, function(i2, u2) {
          i2 ? r2(i2) : P(e2, n2, u2, { atime: t2, ctime: o2, mtime: o2 }, r2);
        });
      }
      function ae(e2, n2, t2, i2, o2) {
        "number" != typeof t2 || "number" != typeof i2 ? o2(new T.EINVAL("atime and mtime must be a number")) : t2 < 0 || i2 < 0 ? o2(new T.EINVAL("atime and mtime must be positive integers")) : n2.getNode(e2, function(r2, u2) {
          r2 ? o2(r2) : P(e2, n2.path, u2, { atime: t2, ctime: i2, mtime: i2 }, o2);
        });
      }
      function ce(e2, n2, t2, o2, r2, u2) {
        n2 = i(n2), "string" != typeof t2 ? u2(new T.EINVAL("attribute name must be a string", n2)) : t2 ? null !== r2 && r2 !== I && r2 !== j ? u2(new T.EINVAL("invalid flag, must be null, XATTR_CREATE or XATTR_REPLACE", n2)) : k(e2, n2, function(i2, a2) {
          if (i2)
            return u2(i2);
          C(e2, n2, a2, t2, o2, r2, u2);
        }) : u2(new T.EINVAL("attribute name cannot be an empty string", n2));
      }
      function fe(e2, n2, t2, i2, o2, r2) {
        "string" != typeof t2 ? r2(new T.EINVAL("attribute name must be a string")) : t2 ? null !== o2 && o2 !== I && o2 !== j ? r2(new T.EINVAL("invalid flag, must be null, XATTR_CREATE or XATTR_REPLACE")) : n2.getNode(e2, function(u2, a2) {
          if (u2)
            return r2(u2);
          C(e2, n2.path, a2, t2, i2, o2, r2);
        }) : r2(new T.EINVAL("attribute name cannot be an empty string"));
      }
      function le(e2, n2, t2, o2) {
        n2 = i(n2), "string" != typeof t2 ? o2(new T.EINVAL("attribute name must be a string", n2)) : t2 ? k(e2, n2, function(e3, i2) {
          if (e3)
            return o2(e3);
          var r2 = i2.xattrs;
          Object.prototype.hasOwnProperty.call(r2, t2) ? o2(null, r2[t2]) : o2(new T.ENOATTR(null, n2));
        }) : o2(new T.EINVAL("attribute name cannot be an empty string", n2));
      }
      function se(e2, n2, t2, i2) {
        "string" != typeof t2 ? i2(new T.EINVAL()) : t2 ? n2.getNode(e2, function(e3, n3) {
          if (e3)
            return i2(e3);
          var o2 = n3.xattrs;
          Object.prototype.hasOwnProperty.call(o2, t2) ? i2(null, o2[t2]) : i2(new T.ENOATTR());
        }) : i2(new T.EINVAL("attribute name cannot be an empty string"));
      }
      function pe(e2, n2, t2, o2) {
        n2 = i(n2), "string" != typeof t2 ? o2(new T.EINVAL("attribute name must be a string", n2)) : t2 ? k(e2, n2, function(i2, r2) {
          if (i2)
            return o2(i2);
          var u2 = r2.xattrs;
          Object.prototype.hasOwnProperty.call(u2, t2) ? (delete u2[t2], e2.putObject(r2.id, r2, function(t3) {
            t3 ? o2(t3) : P(e2, n2, r2, { ctime: Date.now() }, o2);
          })) : o2(new T.ENOATTR(null, n2));
        }) : o2(new T.EINVAL("attribute name cannot be an empty string", n2));
      }
      function de(e2, n2, t2, i2) {
        "string" != typeof t2 ? i2(new T.EINVAL("attribute name must be a string")) : t2 ? n2.getNode(e2, function(o2, r2) {
          if (o2)
            return i2(o2);
          var u2 = r2.xattrs;
          Object.prototype.hasOwnProperty.call(u2, t2) ? (delete u2[t2], e2.putObject(r2.id, r2, function(t3) {
            t3 ? i2(t3) : P(e2, n2.path, r2, { ctime: Date.now() }, i2);
          })) : i2(new T.ENOATTR());
        }) : i2(new T.EINVAL("attribute name cannot be an empty string"));
      }
      function me(e2) {
        return Object.prototype.hasOwnProperty.call(h, e2) ? h[e2] : null;
      }
      function Ee(e2, n2, t2) {
        return e2 ? "function" == typeof e2 ? e2 = { encoding: n2, flag: t2 } : "string" == typeof e2 && (e2 = { encoding: e2, flag: t2 }) : e2 = { encoding: n2, flag: t2 }, e2;
      }
      function ge(e2, n2, t2, i2, o2) {
        if (arguments.length < 5 ? (o2 = arguments[arguments.length - 1], i2 = 420) : i2 = xe(i2, m, o2), !(t2 = me(t2)))
          return o2(new T.EINVAL("flags is not valid"), n2);
        Y(e2, n2, t2, i2, function(e3, i3) {
          if (e3)
            o2(e3);
          else {
            var r2;
            r2 = t2.includes(N) ? i3.size : 0;
            var u2 = new _(n2, i3.id, t2, r2), a2 = R.allocDescriptor(u2);
            o2(null, a2);
          }
        });
      }
      function we(e2, n2, t2) {
        R.getOpenFileDescription(n2) ? (R.releaseDescriptor(n2), t2(null)) : t2(new T.EBADF());
      }
      function Oe(e2, n2, t2, i2) {
        x(e2, n2, t2, i2);
      }
      function be(e2, n2, t2, i2) {
        if (arguments.length < 4)
          i2 = t2, t2 = m;
        else if (!(t2 = xe(t2, m, i2)))
          return;
        q(e2, n2, i2);
      }
      function ye(e2, n2, t2, i2) {
        "function" == typeof t2 && (i2 = t2, t2 = f.fsConstants.F_OK), M(e2, n2, t2 |= f.fsConstants.F_OK, i2);
      }
      function ve(e2, n2, t2, i2) {
        if (i2 = arguments[arguments.length - 1], !n2)
          return i2(new Error("filename prefix is required"));
        var o2 = n2 + "-" + a.randomChars(6);
        q(e2, o2, function(e3) {
          i2(e3, o2);
        });
      }
      function Ne(e2, n2, t2) {
        z(e2, n2, t2);
      }
      function he(e2, n2, t2) {
        G(e2, n2, function(i2, o2) {
          if (i2)
            t2(i2);
          else {
            var r2 = new B(n2, o2, e2.name);
            t2(null, r2);
          }
        });
      }
      function Ie(e2, n2, t2) {
        var i2 = R.getOpenFileDescription(n2);
        i2 ? H(e2, i2, function(n3, o2) {
          if (n3)
            t2(n3);
          else {
            var r2 = new B(i2.path, o2, e2.name);
            t2(null, r2);
          }
        }) : t2(new T.EBADF());
      }
      function je(e2, n2, t2, i2) {
        J(e2, n2, t2, i2);
      }
      function Ae(e2, n2, t2) {
        Q(e2, n2, t2);
      }
      function De(e2, n2, t2, i2, o2, r2, u2) {
        i2 = void 0 === i2 ? 0 : i2, o2 = void 0 === o2 ? t2.length - i2 : o2, u2 = arguments[arguments.length - 1];
        var a2 = R.getOpenFileDescription(n2);
        a2 ? a2.flags.includes(O) ? W(e2, a2, t2, i2, o2, r2, function(e3, n3) {
          u2(e3, n3 || 0, t2);
        }) : u2(new T.EBADF("descriptor does not permit reading")) : u2(new T.EBADF());
      }
      function Te(e2, n2, t2) {
        Ve(n2, t2) === n2 && (R.getOpenFileDescription(n2) ? t2() : t2(new T.EBADF()));
      }
      function Le(n2, t2, i2, o2) {
        o2 = arguments[arguments.length - 1];
        var r2 = me((i2 = Ee(i2, null, "r")).flag || "r");
        if (!r2)
          return o2(new T.EINVAL("flags is not valid", t2));
        Y(n2, t2, r2, function(u2, a2) {
          if (u2)
            return o2(u2);
          var c2 = new _(t2, a2.id, r2, 0), f2 = R.allocDescriptor(c2);
          function l2() {
            R.releaseDescriptor(f2);
          }
          H(n2, c2, function(r3, u3) {
            if (r3)
              return l2(), o2(r3);
            var a3 = new B(c2.path, u3, n2.name);
            if (a3.isDirectory())
              return l2(), o2(new T.EISDIR("illegal operation on directory", t2));
            var f3 = a3.size, s2 = e.alloc(f3);
            W(n2, c2, s2, 0, f3, 0, function(e2) {
              if (l2(), e2)
                return o2(e2);
              var n3;
              n3 = "utf8" === i2.encoding ? s2.toString("utf8") : s2, o2(null, n3);
            });
          });
        });
      }
      function Re(e2, n2, t2, i2, o2, r2, u2) {
        u2 = arguments[arguments.length - 1], i2 = void 0 === i2 ? 0 : i2, o2 = void 0 === o2 ? t2.length - i2 : o2;
        var a2 = R.getOpenFileDescription(n2);
        a2 ? a2.flags.includes(b) ? t2.length - i2 < o2 ? u2(new T.EIO("input buffer is too small")) : U(e2, a2, t2, i2, o2, r2, u2) : u2(new T.EBADF("descriptor does not permit writing")) : u2(new T.EBADF());
      }
      function _e(n2, t2, i2, o2, r2) {
        r2 = arguments[arguments.length - 1];
        var u2 = me((o2 = Ee(o2, "utf8", "w")).flag || "w");
        if (!u2)
          return r2(new T.EINVAL("flags is not valid", t2));
        e.isBuffer(i2) || ("number" == typeof i2 && (i2 = "" + i2), i2 = "string" != typeof (i2 = i2 || "") ? e.from(i2.toString()) : e.from(i2 || "", o2.encoding || "utf8")), Y(n2, t2, u2, function(e2, o3) {
          if (e2)
            return r2(e2);
          var a2 = new _(t2, o3.id, u2, 0), c2 = R.allocDescriptor(a2);
          K(n2, a2, i2, 0, i2.length, function(e3) {
            if (R.releaseDescriptor(c2), e3)
              return r2(e3);
            r2(null);
          });
        });
      }
      function Fe(n2, t2, i2, o2, r2) {
        r2 = arguments[arguments.length - 1];
        var u2 = me((o2 = Ee(o2, "utf8", "a")).flag || "a");
        if (!u2)
          return r2(new T.EINVAL("flags is not valid", t2));
        "number" == typeof (i2 = i2 || "") && (i2 = "" + i2), "string" == typeof i2 && "utf8" === o2.encoding && (i2 = e.from(i2)), Y(n2, t2, u2, function(e2, o3) {
          if (e2)
            return r2(e2);
          var a2 = new _(t2, o3.id, u2, o3.size), c2 = R.allocDescriptor(a2);
          U(n2, a2, i2, 0, i2.length, a2.position, function(e3) {
            if (R.releaseDescriptor(c2), e3)
              return r2(e3);
            r2(null);
          });
        });
      }
      function Se(e2, n2, t2) {
        he(e2, n2, function(e3) {
          t2(!e3);
        });
      }
      function Ve(e2, n2) {
        if ("number" == typeof e2)
          return e2;
        n2(new T.EINVAL("Expected integer", e2));
      }
      var Be = /^[0-7]+$/;
      function Pe(e2) {
        return e2 === e2 >>> 0;
      }
      function xe(e2, n2, t2) {
        return "function" == typeof n2 && (t2 = n2, n2 = void 0), Pe(e2) ? e2 & m : "number" == typeof e2 ? (Number.isInteger(e2), t2(new T.EINVAL("mode not a valid an integer value", e2)), false) : "string" == typeof e2 ? Be.test(e2) ? parseInt(e2, 8) & m : (t2(new T.EINVAL("mode not a valid octal string", e2)), false) : void 0 !== n2 ? n2 : (t2(new T.EINVAL("mode not valid", e2)), false);
      }
      function ke(e2, n2, t2, o2) {
        n2 = i(n2), "number" != typeof t2 ? o2(new T.EINVAL("mode must be number", n2)) : k(e2, n2, function(i2, r2) {
          i2 ? o2(i2) : (r2.mode = t2, P(e2, n2, r2, { mtime: Date.now() }, o2));
        });
      }
      function Ce(e2, n2, t2, i2) {
        "number" != typeof t2 ? i2(new T.EINVAL("mode must be a number")) : n2.getNode(e2, function(o2, r2) {
          o2 ? i2(o2) : (r2.mode = t2, P(e2, n2.path, r2, { mtime: Date.now() }, i2));
        });
      }
      function Xe(e2, n2, t2, o2, r2) {
        n2 = i(n2), k(e2, n2, function(i2, u2) {
          i2 ? r2(i2) : (u2.uid = t2, u2.gid = o2, P(e2, n2, u2, { mtime: Date.now() }, r2));
        });
      }
      function qe(e2, n2, t2, i2, o2) {
        n2.getNode(e2, function(r2, u2) {
          r2 ? o2(r2) : (u2.uid = t2, u2.gid = i2, P(e2, n2.path, u2, { mtime: Date.now() }, o2));
        });
      }
      function Me(e2, n2, t2, i2) {
        le(e2, n2, t2, i2);
      }
      function ze(e2, n2, t2, i2) {
        var o2 = R.getOpenFileDescription(n2);
        o2 ? se(e2, o2, t2, i2) : i2(new T.EBADF());
      }
      function Ye(e2, n2, t2, i2, o2, r2) {
        "function" == typeof o2 && (r2 = o2, o2 = null), ce(e2, n2, t2, i2, o2, r2);
      }
      function Ke(e2, n2, t2, i2, o2, r2) {
        "function" == typeof o2 && (r2 = o2, o2 = null);
        var u2 = R.getOpenFileDescription(n2);
        u2 ? u2.flags.includes(b) ? fe(e2, u2, t2, i2, o2, r2) : r2(new T.EBADF("descriptor does not permit writing")) : r2(new T.EBADF());
      }
      function Ue(e2, n2, t2, i2) {
        pe(e2, n2, t2, i2);
      }
      function We(e2, n2, t2, i2) {
        var o2 = R.getOpenFileDescription(n2);
        o2 ? o2.flags.includes(b) ? de(e2, o2, t2, i2) : i2(new T.EBADF("descriptor does not permit writing")) : i2(new T.EBADF());
      }
      function Ge(e2, n2, t2, i2, o2) {
        var r2 = R.getOpenFileDescription(n2);
        r2 || o2(new T.EBADF()), "SET" === i2 ? t2 < 0 ? o2(new T.EINVAL("resulting file offset would be negative")) : (r2.position = t2, o2(null, r2.position)) : "CUR" === i2 ? r2.position + t2 < 0 ? o2(new T.EINVAL("resulting file offset would be negative")) : (r2.position += t2, o2(null, r2.position)) : "END" === i2 ? H(e2, r2, function(e3, n3) {
          e3 ? o2(e3) : n3.size + t2 < 0 ? o2(new T.EINVAL("resulting file offset would be negative")) : (r2.position = n3.size + t2, o2(null, r2.position));
        }) : o2(new T.EINVAL("whence argument is not a proper value"));
      }
      function He(e2, n2, t2, i2) {
        Z(e2, n2, t2, i2);
      }
      function $e(e2) {
        return "number" == typeof e2 ? e2 : "object" === n(e2) && "function" == typeof e2.getTime ? e2.getTime() : void 0;
      }
      function Je(e2, n2, t2, i2, o2) {
        var r2 = Date.now();
        ue(e2, n2, t2 = $e(t2 || r2), i2 = $e(i2 || r2), o2);
      }
      function Qe(e2, n2, t2, i2, o2) {
        var r2 = Date.now();
        t2 = $e(t2 || r2), i2 = $e(i2 || r2);
        var u2 = R.getOpenFileDescription(n2);
        u2 ? u2.flags.includes(b) ? ae(e2, u2, t2, i2, o2) : o2(new T.EBADF("descriptor does not permit writing")) : o2(new T.EBADF());
      }
      function Ze(e2, n2, t2, i2) {
        (t2 = xe(t2, i2)) && ke(e2, n2, t2, i2);
      }
      function en(e2, n2, t2, i2) {
        if (t2 = xe(t2, i2)) {
          var o2 = R.getOpenFileDescription(n2);
          o2 ? o2.flags.includes(b) ? Ce(e2, o2, t2, i2) : i2(new T.EBADF("descriptor does not permit writing")) : i2(new T.EBADF());
        }
      }
      function nn(e2, n2, t2, i2, o2) {
        return Pe(t2) ? Pe(i2) ? void Xe(e2, n2, t2, i2, o2) : o2(new T.EINVAL("gid must be a valid integer", i2)) : o2(new T.EINVAL("uid must be a valid integer", t2));
      }
      function tn(e2, n2, t2, i2, o2) {
        if (!Pe(t2))
          return o2(new T.EINVAL("uid must be a valid integer", t2));
        if (!Pe(i2))
          return o2(new T.EINVAL("gid must be a valid integer", i2));
        var r2 = R.getOpenFileDescription(n2);
        r2 ? r2.flags.includes(b) ? qe(e2, r2, t2, i2, o2) : o2(new T.EBADF("descriptor does not permit writing")) : o2(new T.EBADF());
      }
      function on2(e2, n2, o2, r2) {
        n2 = i(n2), o2 = i(o2);
        var u2, a2, c2, f2, l2 = t.dirname(n2), p2 = t.dirname(o2), d2 = t.basename(n2), m2 = t.basename(o2), E2 = Date.now();
        function g2(n3, t2) {
          n3 ? r2(n3) : P(e2, o2, t2, { ctime: E2 }, r2);
        }
        function w2(n3) {
          n3 ? r2(n3) : e2.getObject(f2[m2].id, g2);
        }
        function O2(n3) {
          n3 ? r2(n3) : (u2.id === c2.id && (a2 = f2), delete a2[d2], e2.putObject(u2.data, a2, w2));
        }
        function b2(n3) {
          n3 ? r2(n3) : (f2[m2] = a2[d2], e2.putObject(c2.data, f2, O2));
        }
        function y2(n3, t2) {
          n3 ? r2(n3) : (f2 = t2, Object.prototype.hasOwnProperty.call(f2, m2) ? z(e2, o2, b2) : b2());
        }
        function v2(n3, t2) {
          n3 ? r2(n3) : (c2 = t2, e2.getObject(c2.data, y2));
        }
        function N2(n3, t2) {
          n3 ? r2(n3) : (a2 = t2, k(e2, p2, v2));
        }
        function h2(n3, t2) {
          n3 ? r2(n3) : (u2 = t2, e2.getObject(t2.data, N2));
        }
        function I2(t2) {
          t2 ? r2(t2) : Q(e2, n2, r2);
        }
        k(e2, n2, function(t2, i2) {
          t2 ? r2(t2) : i2.type === s ? k(e2, l2, h2) : J(e2, n2, o2, I2);
        });
      }
      function rn(e2, n2, t2, i2, o2) {
        te(e2, n2, t2, o2 = arguments[arguments.length - 1]);
      }
      function un(e2, n2, t2) {
        ie(e2, n2, t2);
      }
      function an(e2, n2, t2) {
        $(e2, n2, function(i2, o2) {
          if (i2)
            t2(i2);
          else {
            var r2 = new B(n2, o2, e2.name);
            t2(null, r2);
          }
        });
      }
      function cn(e2, n2, t2, i2) {
        Ve(t2 = t2 || 0, i2 = arguments[arguments.length - 1]) === t2 && oe(e2, n2, t2, i2);
      }
      function fn(e2, n2, t2, i2) {
        i2 = arguments[arguments.length - 1], t2 = t2 || 0;
        var o2 = R.getOpenFileDescription(n2);
        if (o2)
          if (o2.flags.includes(b)) {
            if (Ve(t2, i2) !== t2)
              return;
            re(e2, o2, t2, i2);
          } else
            i2(new T.EBADF("descriptor does not permit writing"));
        else
          i2(new T.EBADF());
      }
      module2.exports = { appendFile: Fe, access: ye, chown: nn, chmod: Ze, close: we, ensureRootDirectory: X, exists: Se, fchown: tn, fchmod: en, fgetxattr: ze, fremovexattr: We, fsetxattr: Ke, fstat: Ie, fsync: Te, ftruncate: fn, futimes: Qe, getxattr: Me, link: je, lseek: Ge, lstat: an, mkdir: be, mkdtemp: ve, mknod: Oe, open: ge, readdir: He, read: De, readFile: Le, readlink: un, removexattr: Ue, rename: on2, rmdir: Ne, setxattr: Ye, stat: he, symlink: rn, truncate: cn, unlink: Ae, utimes: Je, writeFile: _e, write: Re };
    }, { "../path.js": "UzoP", "../shared.js": "zBMa", "../../lib/async.js": "u4Zs", "../constants.js": "iJA9", "../errors.js": "p8GN", "../directory-entry.js": "ZECt", "../open-files.js": "osLK", "../open-file-description.js": "XWaV", "../super-node.js": "JEp0", "../node.js": "KKNo", "../dirent.js": "q4Wu", "../stats.js": "dsCT", "buffer": "dskh" }], "GMi4": [function(require2, module2, exports3) {
      var Buffer3 = require2("buffer").Buffer;
      var e = require2("buffer").Buffer, r = require2("es6-promisify"), t = r.promisify, n = require2("../path.js"), a = require2("../providers/index.js"), s = require2("../shell/shell.js"), o = require2("../../lib/intercom.js"), i = require2("../fs-watcher.js"), u = require2("../errors.js"), m = require2("../shared.js"), c = m.nop, f = m.guid, l = require2("../constants.js"), h = l.fsConstants, p = l.FILE_SYSTEM_NAME, d = l.FS_FORMAT, g = l.FS_READY, b = l.FS_PENDING, A = l.FS_ERROR, P = l.FS_NODUPEIDCHECK, v = l.STDIN, y = l.STDOUT, E = l.STDERR, R = require2("./implementation.js");
      function w(e2) {
        return "function" == typeof e2 ? e2 : function(e3) {
          if (e3)
            throw e3;
        };
      }
      function S(e2) {
        e2 && console.error("Filer error: ", e2);
      }
      function O(e2) {
        if (!(e2 && e2.protocol && e2.pathname))
          return e2;
        if ("file:" !== e2.protocol)
          throw new u.EINVAL("only file: URLs are supported for paths", e2);
        for (var r2 = e2.pathname, t2 = 0; t2 < r2.length; t2++)
          if ("%" === r2[t2]) {
            var n2 = 32 | r2.codePointAt(t2 + 2);
            if ("2" === r2[t2 + 1] && 102 === n2)
              throw new u.EINVAL("file: URLs must not include encoded / characters", e2);
          }
        return decodeURIComponent(r2);
      }
      function x(r2) {
        return e.isBuffer(r2) ? r2.toString() : r2;
      }
      function F(e2, r2) {
        return e2 ? n.isNull(e2) ? new u.EINVAL("Path must be a string without null bytes.", e2) : r2 || n.isAbsolute(e2) ? void 0 : new u.EINVAL("Path must be absolute.", e2) : new u.EINVAL("Path must be a string", e2);
      }
      function _(e2, r2, t2) {
        var n2 = e2[r2], a2 = F(n2 = x(n2 = O(n2)), t2);
        if (a2)
          throw a2;
        e2[r2] = n2;
      }
      function q(e2, r2) {
        r2 = r2 || S;
        var m2 = (e2 = e2 || {}).flags || [], l2 = e2.guid ? e2.guid : f, O2 = e2.provider || new a.Default(e2.name || p), x2 = e2.name || O2.name, F2 = m2.includes(d), I = this;
        I.readyState = b, I.name = x2, I.error = null, I.stdin = v, I.stdout = y, I.stderr = E, I.constants = h, I.F_OK = h.F_OK, I.R_OK = h.R_OK, I.W_OK = h.W_OK, I.X_OK = h.X_OK, this.Shell = s.bind(void 0, this);
        var N = [];
        function j(e3) {
          return function(r3) {
            m2.includes(P) ? r3(null, l2()) : function r4(t2) {
              var n2 = l2();
              e3.getObject(n2, function(e4, a2) {
                e4 ? t2(e4) : a2 ? r4(t2) : t2(null, n2);
              });
            }(r3);
          };
        }
        this.queueOrRun = function(e3) {
          var r3;
          return g === I.readyState ? e3.call(I) : A === I.readyState ? r3 = new u.EFILESYSTEMERROR("unknown error") : N.push(e3), r3;
        }, this.watch = function(e3, r3, t2) {
          if (n.isNull(e3))
            throw new Error("Path must be a string without null bytes.");
          "function" == typeof r3 && (t2 = r3, r3 = {}), r3 = r3 || {}, t2 = t2 || c;
          var a2 = new i();
          return a2.start(e3, false, r3.recursive), a2.on("change", t2), a2;
        }, O2.open(function(e3) {
          function t2(e4) {
            function t3(e5) {
              var r3 = O2[e5]();
              return r3.name = x2, r3.flags = m2, r3.changes = [], r3.guid = j(r3), r3.close = function() {
                var e6 = r3.changes;
                !function(e7) {
                  if (e7.length) {
                    var r4 = o.getInstance();
                    e7.forEach(function(e8) {
                      r4.emit(e8.event, e8.path);
                    });
                  }
                }(e6), e6.length = 0;
              }, r3;
            }
            I.provider = { openReadWriteContext: function() {
              return t3("getReadWriteContext");
            }, openReadOnlyContext: function() {
              return t3("getReadOnlyContext");
            } }, I.readyState = e4 ? A : g, N.forEach(function(e5) {
              e5.call(this);
            }.bind(I)), N = null, r2(e4, I);
          }
          if (e3)
            return t2(e3);
          var n2 = O2.getReadWriteContext();
          n2.guid = j(n2), F2 ? n2.clear(function(e4) {
            if (e4)
              return t2(e4);
            R.ensureRootDirectory(n2, t2);
          }) : R.ensureRootDirectory(n2, t2);
        }), q.prototype.promises = {}, [{ name: "appendFile", promises: true, absPathArgs: [0] }, { name: "access", promises: true, absPathArgs: [0] }, { name: "chown", promises: true, absPathArgs: [0] }, { name: "chmod", promises: true, absPathArgs: [0] }, { name: "close" }, { name: "exists", absPathArgs: [0] }, { name: "fchown" }, { name: "fchmod" }, { name: "fgetxattr" }, { name: "fremovexattr" }, { name: "fsetxattr" }, { name: "fstat" }, { name: "fsync" }, { name: "ftruncate" }, { name: "futimes" }, { name: "getxattr", promises: true, absPathArgs: [0] }, { name: "link", promises: true, absPathArgs: [0, 1] }, { name: "lseek" }, { name: "lstat", promises: true }, { name: "mkdir", promises: true, absPathArgs: [0] }, { name: "mkdtemp", promises: true }, { name: "mknod", promises: true, absPathArgs: [0] }, { name: "open", promises: true, absPathArgs: [0] }, { name: "readdir", promises: true, absPathArgs: [0] }, { name: "read" }, { name: "readFile", promises: true, absPathArgs: [0] }, { name: "readlink", promises: true, absPathArgs: [0] }, { name: "removexattr", promises: true, absPathArgs: [0] }, { name: "rename", promises: true, absPathArgs: [0, 1] }, { name: "rmdir", promises: true, absPathArgs: [0] }, { name: "setxattr", promises: true, absPathArgs: [0] }, { name: "stat", promises: true, absPathArgs: [0] }, { name: "symlink", promises: true, relPathArgs: [0], absPathArgs: [1] }, { name: "truncate", promises: true, absPathArgs: [0] }, { name: "unlink", promises: true, absPathArgs: [0] }, { name: "utimes", promises: true, absPathArgs: [0] }, { name: "writeFile", promises: true, absPathArgs: [0] }, { name: "write" }].forEach(function(e3) {
          var r3 = e3.name, n2 = true === e3.promises;
          q.prototype[r3] = function() {
            var t2 = this, n3 = Array.prototype.slice.call(arguments, 0), a2 = n3.length - 1, s2 = "function" != typeof n3[a2], o2 = w(n3[a2]);
            e3.absPathArgs && e3.absPathArgs.forEach(function(e4) {
              return _(n3, e4, false);
            }), e3.relPathArgs && e3.relPathArgs.forEach(function(e4) {
              return _(n3, e4, true);
            });
            var i2 = t2.queueOrRun(function() {
              var e4 = t2.provider.openReadWriteContext();
              if (A === t2.readyState) {
                var i3 = new u.EFILESYSTEMERROR("filesystem unavailable, operation canceled");
                return o2.call(t2, i3);
              }
              function m3() {
                e4.close(), o2.apply(t2, arguments);
              }
              s2 ? n3.push(m3) : n3[a2] = m3;
              var c2 = [e4].concat(n3);
              R[r3].apply(null, c2);
            });
            i2 && o2(i2);
          }, n2 && (q.prototype.promises[r3] = t(q.prototype[r3].bind(I)));
        });
      }
      q.providers = a, module2.exports = q;
    }, { "es6-promisify": "b1ZG", "../path.js": "UzoP", "../providers/index.js": "AiW7", "../shell/shell.js": "D1Ra", "../../lib/intercom.js": "u7Jv", "../fs-watcher.js": "VLEe", "../errors.js": "p8GN", "../shared.js": "zBMa", "../constants.js": "iJA9", "./implementation.js": "bsBG", "buffer": "dskh" }], "iIhC": [function(require2, module2, exports3) {
      "use strict";
      function e(e2, t2, r2) {
        return { dataPath: void 0, schemaPath: void 0, keyword: "absolutePath", params: { absolutePath: r2 }, message: e2, parentSchema: t2 };
      }
      function t(t2, r2, a2) {
        return e(t2 ? "The provided value ".concat(JSON.stringify(a2), " is not an absolute path!") : "A relative path is expected. However, the provided value ".concat(JSON.stringify(a2), " is an absolute path!"), r2, a2);
      }
      function r(r2) {
        return r2.addKeyword("absolutePath", { errors: true, type: "string", compile: function(r3, a2) {
          var o = function o2(s) {
            var n = true;
            return s.includes("!") && (o2.errors = [e("The provided value ".concat(JSON.stringify(s), " contains exclamation mark (!) which is not allowed because it's reserved for loader syntax."), a2, s)], n = false), r3 === /^(?:[A-Za-z]:(\\|\/)|\\\\|\/)/.test(s) || (o2.errors = [t(r3, a2, s)], n = false), n;
          };
          return o.errors = [], o;
        } }), r2;
      }
      Object.defineProperty(exports3, "__esModule", { value: true }), exports3.default = void 0;
      var a = r;
      exports3.default = a;
    }, {}], "GNtl": [function(require2, module2, exports3) {
      "use strict";
      function t(t2, n2) {
        return a(t2) || o(t2, n2) || r(t2, n2) || e();
      }
      function e() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function r(t2, e2) {
        if (t2) {
          if ("string" == typeof t2)
            return n(t2, e2);
          var r2 = Object.prototype.toString.call(t2).slice(8, -1);
          return "Object" === r2 && t2.constructor && (r2 = t2.constructor.name), "Map" === r2 || "Set" === r2 ? Array.from(r2) : "Arguments" === r2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r2) ? n(t2, e2) : void 0;
        }
      }
      function n(t2, e2) {
        (null == e2 || e2 > t2.length) && (e2 = t2.length);
        for (var r2 = 0, n2 = new Array(e2); r2 < e2; r2++)
          n2[r2] = t2[r2];
        return n2;
      }
      function o(t2, e2) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(t2)) {
          var r2 = [], n2 = true, o2 = false, a2 = void 0;
          try {
            for (var i2, u2 = t2[Symbol.iterator](); !(n2 = (i2 = u2.next()).done) && (r2.push(i2.value), !e2 || r2.length !== e2); n2 = true)
              ;
          } catch (f2) {
            o2 = true, a2 = f2;
          } finally {
            try {
              n2 || null == u2.return || u2.return();
            } finally {
              if (o2)
                throw a2;
            }
          }
          return r2;
        }
      }
      function a(t2) {
        if (Array.isArray(t2))
          return t2;
      }
      function i(t2, e2) {
        if (!(t2 instanceof e2))
          throw new TypeError("Cannot call a class as a function");
      }
      function u(t2, e2) {
        for (var r2 = 0; r2 < e2.length; r2++) {
          var n2 = e2[r2];
          n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t2, n2.key, n2);
        }
      }
      function f(t2, e2, r2) {
        return e2 && u(t2.prototype, e2), r2 && u(t2, r2), t2;
      }
      var c = function() {
        function e2() {
          i(this, e2), this._left = [], this._right = [];
        }
        return f(e2, [{ key: "left", value: function(t2) {
          var e3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          this._left.push([t2, e3]);
        } }, { key: "right", value: function(t2) {
          var e3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          this._right.push([t2, e3]);
        } }, { key: "format", value: function() {
          var r2 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], n2 = t(e2.getRangeValue(this._left, r2), 2), o2 = n2[0], a2 = n2[1], i2 = t(e2.getRangeValue(this._right, !r2), 2), u2 = i2[0], f2 = i2[1];
          if (!Number.isFinite(o2) && !Number.isFinite(u2))
            return "";
          var c2 = a2 ? o2 + 1 : o2;
          return c2 === (f2 ? u2 - 1 : u2) ? "should be ".concat(r2 ? "" : "!", "= ").concat(c2) : Number.isFinite(o2) && !Number.isFinite(u2) ? e2.formatLeft(o2, r2, a2) : !Number.isFinite(o2) && Number.isFinite(u2) ? e2.formatRight(u2, r2, f2) : e2.formatRange(o2, u2, a2, f2, r2);
        } }], [{ key: "getOperator", value: function(t2, e3) {
          return "left" === t2 ? e3 ? ">" : ">=" : e3 ? "<" : "<=";
        } }, { key: "formatRight", value: function(t2, r2, n2) {
          return false === r2 ? e2.formatLeft(t2, !r2, !n2) : "should be ".concat(e2.getOperator("right", n2), " ").concat(t2);
        } }, { key: "formatLeft", value: function(t2, r2, n2) {
          return false === r2 ? e2.formatRight(t2, !r2, !n2) : "should be ".concat(e2.getOperator("left", n2), " ").concat(t2);
        } }, { key: "formatRange", value: function(t2, r2, n2, o2, a2) {
          var i2 = "should be";
          return i2 += " ".concat(e2.getOperator(a2 ? "left" : "right", a2 ? n2 : !n2), " ").concat(t2, " "), i2 += a2 ? "and" : "or", i2 += " ".concat(e2.getOperator(a2 ? "right" : "left", a2 ? o2 : !o2), " ").concat(r2);
        } }, { key: "getRangeValue", value: function(e3, r2) {
          for (var n2 = r2 ? 1 / 0 : -1 / 0, o2 = -1, a2 = r2 ? function(e4) {
            return t(e4, 1)[0] <= n2;
          } : function(e4) {
            return t(e4, 1)[0] >= n2;
          }, i2 = 0; i2 < e3.length; i2++)
            if (a2(e3[i2])) {
              var u2 = t(e3[i2], 1);
              n2 = u2[0], o2 = i2;
            }
          return o2 > -1 ? e3[o2] : [1 / 0, true];
        } }]), e2;
      }();
      module2.exports = c;
    }, {}], "SqDh": [function(require2, module2, exports3) {
      "use strict";
      function t(t2, e2) {
        var n2 = Object.keys(t2);
        if (Object.getOwnPropertySymbols) {
          var r2 = Object.getOwnPropertySymbols(t2);
          e2 && (r2 = r2.filter(function(e3) {
            return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
          })), n2.push.apply(n2, r2);
        }
        return n2;
      }
      function e(e2) {
        for (var r2 = 1; r2 < arguments.length; r2++) {
          var m = null != arguments[r2] ? arguments[r2] : {};
          r2 % 2 ? t(Object(m), true).forEach(function(t2) {
            n(e2, t2, m[t2]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(m)) : t(Object(m)).forEach(function(t2) {
            Object.defineProperty(e2, t2, Object.getOwnPropertyDescriptor(m, t2));
          });
        }
        return e2;
      }
      function n(t2, e2, n2) {
        return e2 in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
      }
      var r = require2("./Range");
      module2.exports.stringHints = function(t2, n2) {
        var r2 = [], m = "string", i = e({}, t2);
        if (!n2) {
          var o = i.minLength, u = i.formatMinimum, a = i.formatExclusiveMaximum;
          i.minLength = i.maxLength, i.maxLength = o, i.formatMinimum = i.formatMaximum, i.formatMaximum = u, i.formatExclusiveMaximum = !i.formatExclusiveMinimum, i.formatExclusiveMinimum = !a;
        }
        if ("number" == typeof i.minLength)
          if (1 === i.minLength)
            m = "non-empty string";
          else {
            var c = Math.max(i.minLength - 1, 0);
            r2.push("should be longer than ".concat(c, " character").concat(c > 1 ? "s" : ""));
          }
        if ("number" == typeof i.maxLength)
          if (0 === i.maxLength)
            m = "empty string";
          else {
            var f = i.maxLength + 1;
            r2.push("should be shorter than ".concat(f, " character").concat(f > 1 ? "s" : ""));
          }
        return i.pattern && r2.push("should".concat(n2 ? "" : " not", " match pattern ").concat(JSON.stringify(i.pattern))), i.format && r2.push("should".concat(n2 ? "" : " not", " match format ").concat(JSON.stringify(i.format))), i.formatMinimum && r2.push("should be ".concat(i.formatExclusiveMinimum ? ">" : ">=", " ").concat(JSON.stringify(i.formatMinimum))), i.formatMaximum && r2.push("should be ".concat(i.formatExclusiveMaximum ? "<" : "<=", " ").concat(JSON.stringify(i.formatMaximum))), [m].concat(r2);
      }, module2.exports.numberHints = function(t2, e2) {
        var n2 = ["integer" === t2.type ? "integer" : "number"], m = new r();
        "number" == typeof t2.minimum && m.left(t2.minimum), "number" == typeof t2.exclusiveMinimum && m.left(t2.exclusiveMinimum, true), "number" == typeof t2.maximum && m.right(t2.maximum), "number" == typeof t2.exclusiveMaximum && m.right(t2.exclusiveMaximum, true);
        var i = m.format(e2);
        return i && n2.push(i), "number" == typeof t2.multipleOf && n2.push("should".concat(e2 ? "" : " not", " be multiple of ").concat(t2.multipleOf)), n2;
      };
    }, { "./Range": "GNtl" }], "ySUA": [function(require2, module2, exports3) {
      "use strict";
      function t(t2) {
        return n(t2) || r(t2) || i(t2) || e();
      }
      function e() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function n(t2) {
        if (Array.isArray(t2))
          return s(t2);
      }
      function a(t2) {
        return m(t2) || r(t2) || i(t2) || c();
      }
      function r(t2) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(t2))
          return Array.from(t2);
      }
      function o(t2, e2) {
        return m(t2) || u(t2, e2) || i(t2, e2) || c();
      }
      function c() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function i(t2, e2) {
        if (t2) {
          if ("string" == typeof t2)
            return s(t2, e2);
          var n2 = Object.prototype.toString.call(t2).slice(8, -1);
          return "Object" === n2 && t2.constructor && (n2 = t2.constructor.name), "Map" === n2 || "Set" === n2 ? Array.from(n2) : "Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2) ? s(t2, e2) : void 0;
        }
      }
      function s(t2, e2) {
        (null == e2 || e2 > t2.length) && (e2 = t2.length);
        for (var n2 = 0, a2 = new Array(e2); n2 < e2; n2++)
          a2[n2] = t2[n2];
        return a2;
      }
      function u(t2, e2) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(t2)) {
          var n2 = [], a2 = true, r2 = false, o2 = void 0;
          try {
            for (var c2, i2 = t2[Symbol.iterator](); !(a2 = (c2 = i2.next()).done) && (n2.push(c2.value), !e2 || n2.length !== e2); a2 = true)
              ;
          } catch (s2) {
            r2 = true, o2 = s2;
          } finally {
            try {
              a2 || null == i2.return || i2.return();
            } finally {
              if (r2)
                throw o2;
            }
          }
          return n2;
        }
      }
      function m(t2) {
        if (Array.isArray(t2))
          return t2;
      }
      function h(t2, e2) {
        if (!(t2 instanceof e2))
          throw new TypeError("Cannot call a class as a function");
      }
      function p(t2, e2) {
        for (var n2 = 0; n2 < e2.length; n2++) {
          var a2 = e2[n2];
          a2.enumerable = a2.enumerable || false, a2.configurable = true, "value" in a2 && (a2.writable = true), Object.defineProperty(t2, a2.key, a2);
        }
      }
      function l(t2, e2, n2) {
        return e2 && p(t2.prototype, e2), n2 && p(t2, n2), t2;
      }
      function f(t2, e2) {
        if ("function" != typeof e2 && null !== e2)
          throw new TypeError("Super expression must either be null or a function");
        t2.prototype = Object.create(e2 && e2.prototype, { constructor: { value: t2, writable: true, configurable: true } }), e2 && x(t2, e2);
      }
      function d(t2) {
        return function() {
          var e2, n2 = O(t2);
          if (S()) {
            var a2 = O(this).constructor;
            e2 = Reflect.construct(n2, arguments, a2);
          } else
            e2 = n2.apply(this, arguments);
          return y(this, e2);
        };
      }
      function y(t2, e2) {
        return !e2 || "object" !== j(e2) && "function" != typeof e2 ? v(t2) : e2;
      }
      function v(t2) {
        if (void 0 === t2)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t2;
      }
      function g(t2) {
        var e2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
        return (g = function(t3) {
          if (null === t3 || !P(t3))
            return t3;
          if ("function" != typeof t3)
            throw new TypeError("Super expression must either be null or a function");
          if (void 0 !== e2) {
            if (e2.has(t3))
              return e2.get(t3);
            e2.set(t3, n2);
          }
          function n2() {
            return b(t3, arguments, O(this).constructor);
          }
          return n2.prototype = Object.create(t3.prototype, { constructor: { value: n2, enumerable: false, writable: true, configurable: true } }), x(n2, t3);
        })(t2);
      }
      function b(t2, e2, n2) {
        return (b = S() ? Reflect.construct : function(t3, e3, n3) {
          var a2 = [null];
          a2.push.apply(a2, e3);
          var r2 = new (Function.bind.apply(t3, a2))();
          return n3 && x(r2, n3.prototype), r2;
        }).apply(null, arguments);
      }
      function S() {
        if ("undefined" == typeof Reflect || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if ("function" == typeof Proxy)
          return true;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          })), true;
        } catch (t2) {
          return false;
        }
      }
      function P(t2) {
        return -1 !== Function.toString.call(t2).indexOf("[native code]");
      }
      function x(t2, e2) {
        return (x = Object.setPrototypeOf || function(t3, e3) {
          return t3.__proto__ = e3, t3;
        })(t2, e2);
      }
      function O(t2) {
        return (O = Object.setPrototypeOf ? Object.getPrototypeOf : function(t3) {
          return t3.__proto__ || Object.getPrototypeOf(t3);
        })(t2);
      }
      function j(t2) {
        return (j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
          return typeof t3;
        } : function(t3) {
          return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
        })(t2);
      }
      Object.defineProperty(exports3, "__esModule", { value: true }), exports3.default = void 0;
      var w = require2("./util/hints"), D = w.stringHints, I = w.numberHints, T = { type: 1, not: 1, oneOf: 1, anyOf: 1, if: 1, enum: 1, const: 1, instanceof: 1, required: 2, pattern: 2, patternRequired: 2, format: 2, formatMinimum: 2, formatMaximum: 2, minimum: 2, exclusiveMinimum: 2, maximum: 2, exclusiveMaximum: 2, multipleOf: 2, uniqueItems: 2, contains: 2, minLength: 2, maxLength: 2, minItems: 2, maxItems: 2, minProperties: 2, maxProperties: 2, dependencies: 2, propertyNames: 2, additionalItems: 2, additionalProperties: 2, absolutePath: 2 };
      function k(t2, e2) {
        var n2 = t2.reduce(function(t3, n3) {
          return Math.max(t3, e2(n3));
        }, 0);
        return t2.filter(function(t3) {
          return e2(t3) === n2;
        });
      }
      function A(t2) {
        var e2 = t2;
        return e2 = k(e2, function(t3) {
          return t3.dataPath ? t3.dataPath.length : 0;
        }), e2 = k(e2, function(t3) {
          return T[t3.keyword] || 2;
        });
      }
      function N(t2, e2) {
        for (var n2 = t2.length - 1, a2 = function(e3) {
          return 0 !== t2[n2].schemaPath.indexOf(e3);
        }; n2 > -1 && !e2.every(a2); )
          if ("anyOf" === t2[n2].keyword || "oneOf" === t2[n2].keyword) {
            var r2 = M(t2[n2]), o2 = N(t2.slice(0, n2), r2.concat(t2[n2].schemaPath));
            n2 = o2 - 1;
          } else
            n2 -= 1;
        return n2 + 1;
      }
      function M(t2) {
        var e2 = t2.schema;
        return Array.isArray(e2) ? e2.map(function(t3) {
          return t3.$ref;
        }).filter(function(t3) {
          return t3;
        }) : [];
      }
      function E(t2) {
        for (var e2 = [], n2 = t2.length - 1; n2 > 0; ) {
          var a2 = t2[n2];
          if ("anyOf" === a2.keyword || "oneOf" === a2.keyword) {
            var r2 = M(a2), o2 = N(t2.slice(0, n2), r2.concat(a2.schemaPath));
            o2 !== n2 ? (e2.push(Object.assign({}, a2, { children: t2.slice(o2, n2) })), n2 = o2) : e2.push(a2);
          } else
            e2.push(a2);
          n2 -= 1;
        }
        return 0 === n2 && e2.push(t2[n2]), e2.reverse();
      }
      function q(t2, e2) {
        return t2.replace(/\n(?!$)/g, "\n".concat(e2));
      }
      function R(t2) {
        return !!t2.not;
      }
      function J(t2) {
        return R(t2) ? J(t2.not) : t2;
      }
      function $(t2) {
        var e2 = J(t2);
        return V(e2) || F(e2) || L(e2) || z(e2) || B(e2);
      }
      function _(t2) {
        return "object" === j(t2) && null !== t2;
      }
      function V(t2) {
        return "number" === t2.type || void 0 !== t2.minimum || void 0 !== t2.exclusiveMinimum || void 0 !== t2.maximum || void 0 !== t2.exclusiveMaximum || void 0 !== t2.multipleOf;
      }
      function F(t2) {
        return "integer" === t2.type || void 0 !== t2.minimum || void 0 !== t2.exclusiveMinimum || void 0 !== t2.maximum || void 0 !== t2.exclusiveMaximum || void 0 !== t2.multipleOf;
      }
      function L(t2) {
        return "string" === t2.type || void 0 !== t2.minLength || void 0 !== t2.maxLength || void 0 !== t2.pattern || void 0 !== t2.format || void 0 !== t2.formatMinimum || void 0 !== t2.formatMaximum;
      }
      function B(t2) {
        return "boolean" === t2.type;
      }
      function C(t2) {
        return "array" === t2.type || "number" == typeof t2.minItems || "number" == typeof t2.maxItems || void 0 !== t2.uniqueItems || void 0 !== t2.items || void 0 !== t2.additionalItems || void 0 !== t2.contains;
      }
      function H(t2) {
        return "object" === t2.type || void 0 !== t2.minProperties || void 0 !== t2.maxProperties || void 0 !== t2.required || void 0 !== t2.properties || void 0 !== t2.patternProperties || void 0 !== t2.additionalProperties || void 0 !== t2.dependencies || void 0 !== t2.propertyNames || void 0 !== t2.patternRequired;
      }
      function z(t2) {
        return "null" === t2.type;
      }
      function K(t2) {
        return /^[aeiou]/i.test(t2) ? "an" : "a";
      }
      function U(t2) {
        if (!t2)
          return "";
        if (!t2.type) {
          if (V(t2) || F(t2))
            return " | should be any non-number";
          if (L(t2))
            return " | should be any non-string";
          if (C(t2))
            return " | should be any non-array";
          if (H(t2))
            return " | should be any non-object";
        }
        return "";
      }
      function G(t2) {
        return t2.length > 0 ? "(".concat(t2.join(", "), ")") : "";
      }
      function Q(t2, e2) {
        return V(t2) || F(t2) ? I(t2, e2) : L(t2) ? D(t2, e2) : [];
      }
      var W = function(e2) {
        f(r2, g(Error));
        var n2 = d(r2);
        function r2(t2, e3) {
          var a2, c2, i2, s2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          if (h(this, r2), (a2 = n2.call(this)).name = "ValidationError", a2.errors = t2, a2.schema = e3, e3.title && (!s2.name || !s2.baseDataPath)) {
            var u2 = e3.title.match(/^(.+) (.+)$/);
            if (u2) {
              if (!s2.name)
                c2 = o(u2, 2)[1];
              if (!s2.baseDataPath)
                i2 = o(u2, 3)[2];
            }
          }
          a2.headerName = s2.name || c2 || "Object", a2.baseDataPath = s2.baseDataPath || i2 || "configuration", a2.postFormatter = s2.postFormatter || null;
          var m2 = "Invalid ".concat(a2.baseDataPath, " object. ").concat(a2.headerName, " has been initialized using ").concat(K(a2.baseDataPath), " ").concat(a2.baseDataPath, " object that does not match the API schema.\n");
          return a2.message = "".concat(m2).concat(a2.formatValidationErrors(t2)), Error.captureStackTrace(v(a2), a2.constructor), a2;
        }
        return l(r2, [{ key: "getSchemaPart", value: function(t2) {
          for (var e3 = t2.split("/"), n3 = this.schema, a2 = 1; a2 < e3.length; a2++) {
            var r3 = n3[e3[a2]];
            if (!r3)
              break;
            n3 = r3;
          }
          return n3;
        } }, { key: "formatSchema", value: function(e3) {
          var n3 = this, r3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], c2 = r3, i2 = function(t2, a2) {
            return a2 ? o2.includes(t2) ? "(recursive)" : n3.formatSchema(t2, c2, o2.concat(e3)) : n3.formatSchema(t2, c2, o2);
          };
          if (R(e3) && !H(e3)) {
            if ($(e3.not))
              return c2 = !r3, i2(e3.not);
            var s2 = !e3.not.not;
            return c2 = !r3, s2 ? (r3 ? "" : "non ") + i2(e3.not) : i2(e3.not);
          }
          if (e3.instanceof) {
            var u2 = e3.instanceof;
            return (Array.isArray(u2) ? u2 : [u2]).map(function(t2) {
              return "Function" === t2 ? "function" : t2;
            }).join(" | ");
          }
          if (e3.enum)
            return e3.enum.map(function(t2) {
              return JSON.stringify(t2);
            }).join(" | ");
          if (void 0 !== e3.const)
            return JSON.stringify(e3.const);
          if (e3.oneOf)
            return e3.oneOf.map(function(t2) {
              return i2(t2, true);
            }).join(" | ");
          if (e3.anyOf)
            return e3.anyOf.map(function(t2) {
              return i2(t2, true);
            }).join(" | ");
          if (e3.allOf)
            return e3.allOf.map(function(t2) {
              return i2(t2, true);
            }).join(" & ");
          if (e3.if) {
            var m2 = e3.if, h2 = e3.then, p2 = e3.else;
            return "".concat(m2 ? "if ".concat(i2(m2)) : "").concat(h2 ? " then ".concat(i2(h2)) : "").concat(p2 ? " else ".concat(i2(p2)) : "");
          }
          if (e3.$ref)
            return i2(this.getSchemaPart(e3.$ref), true);
          if (V(e3) || F(e3)) {
            var l2 = a(Q(e3, r3)), f2 = l2[0], d2 = l2.slice(1), y2 = "".concat(f2).concat(d2.length > 0 ? " ".concat(G(d2)) : "");
            return r3 ? y2 : d2.length > 0 ? "non-".concat(f2, " | ").concat(y2) : "non-".concat(f2);
          }
          if (L(e3)) {
            var v2 = a(Q(e3, r3)), g2 = v2[0], b2 = v2.slice(1), S2 = "".concat(g2).concat(b2.length > 0 ? " ".concat(G(b2)) : "");
            return r3 ? S2 : "string" === S2 ? "non-string" : "non-string | ".concat(S2);
          }
          if (B(e3))
            return "".concat(r3 ? "" : "non-", "boolean");
          if (C(e3)) {
            c2 = true;
            var P2 = [];
            "number" == typeof e3.minItems && P2.push("should not have fewer than ".concat(e3.minItems, " item").concat(e3.minItems > 1 ? "s" : "")), "number" == typeof e3.maxItems && P2.push("should not have more than ".concat(e3.maxItems, " item").concat(e3.maxItems > 1 ? "s" : "")), e3.uniqueItems && P2.push("should not have duplicate items");
            var x2 = void 0 === e3.additionalItems || Boolean(e3.additionalItems), O2 = "";
            return e3.items ? Array.isArray(e3.items) && e3.items.length > 0 ? (O2 = "".concat(e3.items.map(function(t2) {
              return i2(t2);
            }).join(", ")), x2 && e3.additionalItems && _(e3.additionalItems) && Object.keys(e3.additionalItems).length > 0 && P2.push("additional items should be ".concat(i2(e3.additionalItems)))) : O2 = e3.items && Object.keys(e3.items).length > 0 ? "".concat(i2(e3.items)) : "any" : O2 = "any", e3.contains && Object.keys(e3.contains).length > 0 && P2.push("should contains at least one ".concat(this.formatSchema(e3.contains), " item")), "[".concat(O2).concat(x2 ? ", ..." : "", "]").concat(P2.length > 0 ? " (".concat(P2.join(", "), ")") : "");
          }
          if (H(e3)) {
            c2 = true;
            var j2 = [];
            if ("number" == typeof e3.minProperties && j2.push("should not have fewer than ".concat(e3.minProperties, " ").concat(e3.minProperties > 1 ? "properties" : "property")), "number" == typeof e3.maxProperties && j2.push("should not have more than ".concat(e3.maxProperties, " ").concat(e3.minProperties && e3.minProperties > 1 ? "properties" : "property")), e3.patternProperties && Object.keys(e3.patternProperties).length > 0) {
              var w2 = Object.keys(e3.patternProperties);
              j2.push("additional property names should match pattern".concat(w2.length > 1 ? "s" : "", " ").concat(w2.map(function(t2) {
                return JSON.stringify(t2);
              }).join(" | ")));
            }
            var D2 = e3.properties ? Object.keys(e3.properties) : [], I2 = e3.required ? e3.required : [], T2 = t(new Set([].concat(I2).concat(D2))).map(function(t2) {
              var e4 = I2.includes(t2);
              return "".concat(t2).concat(e4 ? "" : "?");
            }).concat(void 0 === e3.additionalProperties || Boolean(e3.additionalProperties) ? e3.additionalProperties && _(e3.additionalProperties) ? ["<key>: ".concat(i2(e3.additionalProperties))] : ["\u2026"] : []).join(", "), k2 = e3.dependencies, A2 = e3.propertyNames, N2 = e3.patternRequired;
            return k2 && Object.keys(k2).forEach(function(t2) {
              var e4 = k2[t2];
              Array.isArray(e4) ? j2.push("should have ".concat(e4.length > 1 ? "properties" : "property", " ").concat(e4.map(function(t3) {
                return "'".concat(t3, "'");
              }).join(", "), " when property '").concat(t2, "' is present")) : j2.push("should be valid according to the schema ".concat(i2(e4), " when property '").concat(t2, "' is present"));
            }), A2 && Object.keys(A2).length > 0 && j2.push("each property name should match format ".concat(JSON.stringify(e3.propertyNames.format))), N2 && N2.length > 0 && j2.push("should have property matching pattern ".concat(N2.map(function(t2) {
              return JSON.stringify(t2);
            }))), "object {".concat(T2 ? " ".concat(T2, " ") : "", "}").concat(j2.length > 0 ? " (".concat(j2.join(", "), ")") : "");
          }
          return z(e3) ? "".concat(r3 ? "" : "non-", "null") : Array.isArray(e3.type) ? "".concat(e3.type.join(" | ")) : JSON.stringify(e3, null, 2);
        } }, { key: "getSchemaPartText", value: function(t2, e3) {
          var n3 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], a2 = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
          if (!t2)
            return "";
          if (Array.isArray(e3))
            for (var r3 = 0; r3 < e3.length; r3++) {
              var o2 = t2[e3[r3]];
              if (!o2)
                break;
              t2 = o2;
            }
          for (; t2.$ref; )
            t2 = this.getSchemaPart(t2.$ref);
          var c2 = "".concat(this.formatSchema(t2, a2)).concat(n3 ? "." : "");
          return t2.description && (c2 += "\n-> ".concat(t2.description)), t2.link && (c2 += "\n-> Read more at ".concat(t2.link)), c2;
        } }, { key: "getSchemaPartDescription", value: function(t2) {
          if (!t2)
            return "";
          for (; t2.$ref; )
            t2 = this.getSchemaPart(t2.$ref);
          var e3 = "";
          return t2.description && (e3 += "\n-> ".concat(t2.description)), t2.link && (e3 += "\n-> Read more at ".concat(t2.link)), e3;
        } }, { key: "formatValidationError", value: function(t2) {
          var e3 = this, n3 = t2.keyword, r3 = t2.dataPath, o2 = "".concat(this.baseDataPath).concat(r3);
          switch (n3) {
            case "type":
              var c2 = t2.parentSchema;
              switch (t2.params.type) {
                case "number":
                  return "".concat(o2, " should be a ").concat(this.getSchemaPartText(c2, false, true));
                case "integer":
                  return "".concat(o2, " should be an ").concat(this.getSchemaPartText(c2, false, true));
                case "string":
                case "boolean":
                  return "".concat(o2, " should be a ").concat(this.getSchemaPartText(c2, false, true));
                case "array":
                  return "".concat(o2, " should be an array:\n").concat(this.getSchemaPartText(c2));
                case "object":
                  return "".concat(o2, " should be an object:\n").concat(this.getSchemaPartText(c2));
                case "null":
                  return "".concat(o2, " should be a ").concat(this.getSchemaPartText(c2, false, true));
                default:
                  return "".concat(o2, " should be:\n").concat(this.getSchemaPartText(c2));
              }
            case "instanceof":
              var i2 = t2.parentSchema;
              return "".concat(o2, " should be an instance of ").concat(this.getSchemaPartText(i2, false, true));
            case "pattern":
              var s2 = t2.params, u2 = t2.parentSchema, m2 = s2.pattern;
              return "".concat(o2, " should match pattern ").concat(JSON.stringify(m2)).concat(U(u2), ".").concat(this.getSchemaPartDescription(u2));
            case "format":
              var h2 = t2.params, p2 = t2.parentSchema, l2 = h2.format;
              return "".concat(o2, " should match format ").concat(JSON.stringify(l2)).concat(U(p2), ".").concat(this.getSchemaPartDescription(p2));
            case "formatMinimum":
            case "formatMaximum":
              var f2 = t2.params, d2 = t2.parentSchema, y2 = f2.comparison, v2 = f2.limit;
              return "".concat(o2, " should be ").concat(y2, " ").concat(JSON.stringify(v2)).concat(U(d2), ".").concat(this.getSchemaPartDescription(d2));
            case "minimum":
            case "maximum":
            case "exclusiveMinimum":
            case "exclusiveMaximum":
              var g2 = t2.parentSchema, b2 = t2.params, S2 = b2.comparison, P2 = b2.limit, x2 = a(Q(g2, true)).slice(1);
              return 0 === x2.length && x2.push("should be ".concat(S2, " ").concat(P2)), "".concat(o2, " ").concat(x2.join(" ")).concat(U(g2), ".").concat(this.getSchemaPartDescription(g2));
            case "multipleOf":
              var O2 = t2.params, j2 = t2.parentSchema, w2 = O2.multipleOf;
              return "".concat(o2, " should be multiple of ").concat(w2).concat(U(j2), ".").concat(this.getSchemaPartDescription(j2));
            case "patternRequired":
              var D2 = t2.params, I2 = t2.parentSchema, T2 = D2.missingPattern;
              return "".concat(o2, " should have property matching pattern ").concat(JSON.stringify(T2)).concat(U(I2), ".").concat(this.getSchemaPartDescription(I2));
            case "minLength":
              var k2 = t2.params, N2 = t2.parentSchema, M2 = k2.limit;
              if (1 === M2)
                return "".concat(o2, " should be a non-empty string").concat(U(N2), ".").concat(this.getSchemaPartDescription(N2));
              var R2 = M2 - 1;
              return "".concat(o2, " should be longer than ").concat(R2, " character").concat(R2 > 1 ? "s" : "").concat(U(N2), ".").concat(this.getSchemaPartDescription(N2));
            case "minItems":
              var J2 = t2.params, _2 = t2.parentSchema, V2 = J2.limit;
              return 1 === V2 ? "".concat(o2, " should be a non-empty array").concat(U(_2), ".").concat(this.getSchemaPartDescription(_2)) : "".concat(o2, " should not have fewer than ").concat(V2, " items").concat(U(_2), ".").concat(this.getSchemaPartDescription(_2));
            case "minProperties":
              var F2 = t2.params, L2 = t2.parentSchema, B2 = F2.limit;
              return 1 === B2 ? "".concat(o2, " should be a non-empty object").concat(U(L2), ".").concat(this.getSchemaPartDescription(L2)) : "".concat(o2, " should not have fewer than ").concat(B2, " properties").concat(U(L2), ".").concat(this.getSchemaPartDescription(L2));
            case "maxLength":
              var C2 = t2.params, z2 = t2.parentSchema, K2 = C2.limit + 1;
              return "".concat(o2, " should be shorter than ").concat(K2, " character").concat(K2 > 1 ? "s" : "").concat(U(z2), ".").concat(this.getSchemaPartDescription(z2));
            case "maxItems":
              var G2 = t2.params, W2 = t2.parentSchema, X2 = G2.limit;
              return "".concat(o2, " should not have more than ").concat(X2, " items").concat(U(W2), ".").concat(this.getSchemaPartDescription(W2));
            case "maxProperties":
              var Y = t2.params, Z = t2.parentSchema, tt = Y.limit;
              return "".concat(o2, " should not have more than ").concat(tt, " properties").concat(U(Z), ".").concat(this.getSchemaPartDescription(Z));
            case "uniqueItems":
              var et = t2.params, nt = t2.parentSchema, at = et.i;
              return "".concat(o2, " should not contain the item '").concat(t2.data[at], "' twice").concat(U(nt), ".").concat(this.getSchemaPartDescription(nt));
            case "additionalItems":
              var rt = t2.params, ot = t2.parentSchema, ct = rt.limit;
              return "".concat(o2, " should not have more than ").concat(ct, " items").concat(U(ot), ". These items are valid:\n").concat(this.getSchemaPartText(ot));
            case "contains":
              var it = t2.parentSchema;
              return "".concat(o2, " should contains at least one ").concat(this.getSchemaPartText(it, ["contains"]), " item").concat(U(it), ".");
            case "required":
              var st = t2.parentSchema, ut = t2.params.missingProperty.replace(/^\./, ""), mt = st && Boolean(st.properties && st.properties[ut]);
              return "".concat(o2, " misses the property '").concat(ut, "'").concat(U(st), ".").concat(mt ? " Should be:\n".concat(this.getSchemaPartText(st, ["properties", ut])) : this.getSchemaPartDescription(st));
            case "additionalProperties":
              var ht = t2.params, pt = t2.parentSchema, lt = ht.additionalProperty;
              return "".concat(o2, " has an unknown property '").concat(lt, "'").concat(U(pt), ". These properties are valid:\n").concat(this.getSchemaPartText(pt));
            case "dependencies":
              var ft = t2.params, dt = t2.parentSchema, yt = ft.property, vt = ft.deps.split(",").map(function(t3) {
                return "'".concat(t3.trim(), "'");
              }).join(", ");
              return "".concat(o2, " should have properties ").concat(vt, " when property '").concat(yt, "' is present").concat(U(dt), ".").concat(this.getSchemaPartDescription(dt));
            case "propertyNames":
              var gt = t2.params, bt = t2.parentSchema, St = t2.schema, Pt = gt.propertyName;
              return "".concat(o2, " property name '").concat(Pt, "' is invalid").concat(U(bt), ". Property names should be match format ").concat(JSON.stringify(St.format), ".").concat(this.getSchemaPartDescription(bt));
            case "enum":
              var xt = t2.parentSchema;
              return xt && xt.enum && 1 === xt.enum.length ? "".concat(o2, " should be ").concat(this.getSchemaPartText(xt, false, true)) : "".concat(o2, " should be one of these:\n").concat(this.getSchemaPartText(xt));
            case "const":
              var Ot = t2.parentSchema;
              return "".concat(o2, " should be equal to constant ").concat(this.getSchemaPartText(Ot, false, true));
            case "not":
              var jt = H(t2.parentSchema) ? "\n".concat(this.getSchemaPartText(t2.parentSchema)) : "", wt = this.getSchemaPartText(t2.schema, false, false, false);
              if ($(t2.schema))
                return "".concat(o2, " should be any ").concat(wt).concat(jt, ".");
              var Dt = t2.schema, It = t2.parentSchema;
              return "".concat(o2, " should not be ").concat(this.getSchemaPartText(Dt, false, true)).concat(It && H(It) ? "\n".concat(this.getSchemaPartText(It)) : "");
            case "oneOf":
            case "anyOf":
              var Tt = t2.parentSchema, kt = t2.children;
              if (kt && kt.length > 0) {
                if (1 === t2.schema.length) {
                  var At = kt[kt.length - 1], Nt = kt.slice(0, kt.length - 1);
                  return this.formatValidationError(Object.assign({}, At, { children: Nt, parentSchema: Object.assign({}, Tt, At.parentSchema) }));
                }
                var Mt = A(kt);
                return 1 === Mt.length ? this.formatValidationError(Mt[0]) : (Mt = E(Mt), "".concat(o2, " should be one of these:\n").concat(this.getSchemaPartText(Tt), "\nDetails:\n").concat(Mt.map(function(t3) {
                  return " * ".concat(q(e3.formatValidationError(t3), "   "));
                }).join("\n")));
              }
              return "".concat(o2, " should be one of these:\n").concat(this.getSchemaPartText(Tt));
            case "if":
              var Et = t2.params, qt = t2.parentSchema, Rt = Et.failingKeyword;
              return "".concat(o2, ' should match "').concat(Rt, '" schema:\n').concat(this.getSchemaPartText(qt, [Rt]));
            case "absolutePath":
              var Jt = t2.message, $t = t2.parentSchema;
              return "".concat(o2, ": ").concat(Jt).concat(this.getSchemaPartDescription($t));
            default:
              var _t = t2.message, Vt = t2.parentSchema, Ft = JSON.stringify(t2, null, 2);
              return "".concat(o2, " ").concat(_t, " (").concat(Ft, ").\n").concat(this.getSchemaPartText(Vt, false));
          }
        } }, { key: "formatValidationErrors", value: function(t2) {
          var e3 = this;
          return t2.map(function(t3) {
            var n3 = e3.formatValidationError(t3);
            return e3.postFormatter && (n3 = e3.postFormatter(n3, t3)), " - ".concat(q(n3, "   "));
          }).join("\n");
        } }]), r2;
      }(), X = W;
      exports3.default = X;
    }, { "./util/hints": "SqDh" }], "wWOq": [function(require2, module2, exports3) {
      var define2;
      var global = arguments[3];
      var e, r = arguments[3];
      !function(r2, t) {
        "object" == typeof exports3 && "undefined" != typeof module2 ? t(exports3) : "function" == typeof e && e.amd ? e(["exports"], t) : t(r2.URI = r2.URI || {});
      }(this, function(e2) {
        "use strict";
        function r2() {
          for (var e3 = arguments.length, r3 = Array(e3), t2 = 0; t2 < e3; t2++)
            r3[t2] = arguments[t2];
          if (r3.length > 1) {
            r3[0] = r3[0].slice(0, -1);
            for (var n2 = r3.length - 1, o2 = 1; o2 < n2; ++o2)
              r3[o2] = r3[o2].slice(1, -1);
            return r3[n2] = r3[n2].slice(1), r3.join("");
          }
          return r3[0];
        }
        function t(e3) {
          return "(?:" + e3 + ")";
        }
        function n(e3) {
          return void 0 === e3 ? "undefined" : null === e3 ? "null" : Object.prototype.toString.call(e3).split(" ").pop().split("]").shift().toLowerCase();
        }
        function o(e3) {
          return e3.toUpperCase();
        }
        function a(e3) {
          var n2 = r2("[0-9]", "[A-Fa-f]"), o2 = t(t("%[EFef]" + n2 + "%" + n2 + n2 + "%" + n2 + n2) + "|" + t("%[89A-Fa-f]" + n2 + "%" + n2 + n2) + "|" + t("%" + n2 + n2)), a2 = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", i2 = r2("[\\:\\/\\?\\#\\[\\]\\@]", a2), s2 = e3 ? "[\\uE000-\\uF8FF]" : "[]", u2 = r2("[A-Za-z]", "[0-9]", "[\\-\\.\\_\\~]", e3 ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]"), c2 = t("[A-Za-z]" + r2("[A-Za-z]", "[0-9]", "[\\+\\-\\.]") + "*"), p2 = t(t(o2 + "|" + r2(u2, a2, "[\\:]")) + "*"), h2 = (t(t("25[0-5]") + "|" + t("2[0-4][0-9]") + "|" + t("1[0-9][0-9]") + "|" + t("[1-9][0-9]") + "|[0-9]"), t(t("25[0-5]") + "|" + t("2[0-4][0-9]") + "|" + t("1[0-9][0-9]") + "|" + t("0?[1-9][0-9]") + "|0?0?[0-9]")), f2 = t(h2 + "\\." + h2 + "\\." + h2 + "\\." + h2), l2 = t(n2 + "{1,4}"), v2 = t(t(l2 + "\\:" + l2) + "|" + f2), d2 = t(t(l2 + "\\:") + "{6}" + v2), g2 = t("\\:\\:" + t(l2 + "\\:") + "{5}" + v2), m2 = t(t(l2) + "?\\:\\:" + t(l2 + "\\:") + "{4}" + v2), E2 = t(t(t(l2 + "\\:") + "{0,1}" + l2) + "?\\:\\:" + t(l2 + "\\:") + "{3}" + v2), C2 = t(t(t(l2 + "\\:") + "{0,2}" + l2) + "?\\:\\:" + t(l2 + "\\:") + "{2}" + v2), y2 = t(t(t(l2 + "\\:") + "{0,3}" + l2) + "?\\:\\:" + l2 + "\\:" + v2), S2 = t(t(t(l2 + "\\:") + "{0,4}" + l2) + "?\\:\\:" + v2), A2 = t(t(t(l2 + "\\:") + "{0,5}" + l2) + "?\\:\\:" + l2), D2 = t(t(t(l2 + "\\:") + "{0,6}" + l2) + "?\\:\\:"), w2 = t([d2, g2, m2, E2, C2, y2, S2, A2, D2].join("|")), b2 = t(t(u2 + "|" + o2) + "+"), x2 = (t(w2 + "\\%25" + b2), t(w2 + t("\\%25|\\%(?!" + n2 + "{2})") + b2)), O2 = t("[vV]" + n2 + "+\\." + r2(u2, a2, "[\\:]") + "+"), I2 = t("\\[" + t(x2 + "|" + w2 + "|" + O2) + "\\]"), F2 = t(t(o2 + "|" + r2(u2, a2)) + "*"), N2 = t(I2 + "|" + f2 + "(?!" + F2 + ")|" + F2), R2 = t("[0-9]*"), T2 = t(t(p2 + "@") + "?" + N2 + t("\\:" + R2) + "?"), _2 = t(o2 + "|" + r2(u2, a2, "[\\:\\@]")), P2 = t(_2 + "*"), U2 = t(_2 + "+"), j2 = t(t(o2 + "|" + r2(u2, a2, "[\\@]")) + "+"), q2 = t(t("\\/" + P2) + "*"), H2 = t("\\/" + t(U2 + q2) + "?"), z2 = t(j2 + q2), L2 = t(U2 + q2), $2 = "(?!" + _2 + ")", V2 = (t(q2 + "|" + H2 + "|" + z2 + "|" + L2 + "|" + $2), t(t(_2 + "|" + r2("[\\/\\?]", s2)) + "*")), M2 = t(t(_2 + "|[\\/\\?]") + "*"), Z2 = t(t("\\/\\/" + T2 + q2) + "|" + H2 + "|" + L2 + "|" + $2), k2 = t(c2 + "\\:" + Z2 + t("\\?" + V2) + "?" + t("\\#" + M2) + "?"), G2 = t(t("\\/\\/" + T2 + q2) + "|" + H2 + "|" + z2 + "|" + $2), Q2 = t(G2 + t("\\?" + V2) + "?" + t("\\#" + M2) + "?");
          t(k2 + "|" + Q2), t(c2 + "\\:" + Z2 + t("\\?" + V2) + "?"), t(t("\\/\\/(" + t("(" + p2 + ")@") + "?(" + N2 + ")" + t("\\:(" + R2 + ")") + "?)") + "?(" + q2 + "|" + H2 + "|" + L2 + "|" + $2 + ")"), t("\\?(" + V2 + ")"), t("\\#(" + M2 + ")"), t(t("\\/\\/(" + t("(" + p2 + ")@") + "?(" + N2 + ")" + t("\\:(" + R2 + ")") + "?)") + "?(" + q2 + "|" + H2 + "|" + z2 + "|" + $2 + ")"), t("\\?(" + V2 + ")"), t("\\#(" + M2 + ")"), t(t("\\/\\/(" + t("(" + p2 + ")@") + "?(" + N2 + ")" + t("\\:(" + R2 + ")") + "?)") + "?(" + q2 + "|" + H2 + "|" + L2 + "|" + $2 + ")"), t("\\?(" + V2 + ")"), t("\\#(" + M2 + ")"), t("(" + p2 + ")@"), t("\\:(" + R2 + ")");
          return { NOT_SCHEME: new RegExp(r2("[^]", "[A-Za-z]", "[0-9]", "[\\+\\-\\.]"), "g"), NOT_USERINFO: new RegExp(r2("[^\\%\\:]", u2, a2), "g"), NOT_HOST: new RegExp(r2("[^\\%\\[\\]\\:]", u2, a2), "g"), NOT_PATH: new RegExp(r2("[^\\%\\/\\:\\@]", u2, a2), "g"), NOT_PATH_NOSCHEME: new RegExp(r2("[^\\%\\/\\@]", u2, a2), "g"), NOT_QUERY: new RegExp(r2("[^\\%]", u2, a2, "[\\:\\@\\/\\?]", s2), "g"), NOT_FRAGMENT: new RegExp(r2("[^\\%]", u2, a2, "[\\:\\@\\/\\?]"), "g"), ESCAPE: new RegExp(r2("[^]", u2, a2), "g"), UNRESERVED: new RegExp(u2, "g"), OTHER_CHARS: new RegExp(r2("[^\\%]", u2, i2), "g"), PCT_ENCODED: new RegExp(o2, "g"), IPV4ADDRESS: new RegExp("^(" + f2 + ")$"), IPV6ADDRESS: new RegExp("^\\[?(" + w2 + ")" + t(t("\\%25|\\%(?!" + n2 + "{2})") + "(" + b2 + ")") + "?\\]?$") };
        }
        var i = a(false), s = a(true), u = function() {
          return function(e3, r3) {
            if (Array.isArray(e3))
              return e3;
            if (Symbol.iterator in Object(e3))
              return function(e4, r4) {
                var t2 = [], n2 = true, o2 = false, a2 = void 0;
                try {
                  for (var i2, s2 = e4[Symbol.iterator](); !(n2 = (i2 = s2.next()).done) && (t2.push(i2.value), !r4 || t2.length !== r4); n2 = true)
                    ;
                } catch (u2) {
                  o2 = true, a2 = u2;
                } finally {
                  try {
                    !n2 && s2.return && s2.return();
                  } finally {
                    if (o2)
                      throw a2;
                  }
                }
                return t2;
              }(e3, r3);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), c = 2147483647, p = /^xn--/, h = /[^\0-\x7E]/, f = /[\x2E\u3002\uFF0E\uFF61]/g, l = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" }, v = Math.floor, d = String.fromCharCode;
        function g(e3) {
          throw new RangeError(l[e3]);
        }
        function m(e3, r3) {
          var t2 = e3.split("@"), n2 = "";
          t2.length > 1 && (n2 = t2[0] + "@", e3 = t2[1]);
          var o2 = function(e4, r4) {
            for (var t3 = [], n3 = e4.length; n3--; )
              t3[n3] = r4(e4[n3]);
            return t3;
          }((e3 = e3.replace(f, ".")).split("."), r3).join(".");
          return n2 + o2;
        }
        function E(e3) {
          for (var r3 = [], t2 = 0, n2 = e3.length; t2 < n2; ) {
            var o2 = e3.charCodeAt(t2++);
            if (o2 >= 55296 && o2 <= 56319 && t2 < n2) {
              var a2 = e3.charCodeAt(t2++);
              56320 == (64512 & a2) ? r3.push(((1023 & o2) << 10) + (1023 & a2) + 65536) : (r3.push(o2), t2--);
            } else
              r3.push(o2);
          }
          return r3;
        }
        var C = function(e3, r3) {
          return e3 + 22 + 75 * (e3 < 26) - ((0 != r3) << 5);
        }, y = function(e3, r3, t2) {
          var n2 = 0;
          for (e3 = t2 ? v(e3 / 700) : e3 >> 1, e3 += v(e3 / r3); e3 > 455; n2 += 36)
            e3 = v(e3 / 35);
          return v(n2 + 36 * e3 / (e3 + 38));
        }, S = function(e3) {
          var r3, t2 = [], n2 = e3.length, o2 = 0, a2 = 128, i2 = 72, s2 = e3.lastIndexOf("-");
          s2 < 0 && (s2 = 0);
          for (var u2 = 0; u2 < s2; ++u2)
            e3.charCodeAt(u2) >= 128 && g("not-basic"), t2.push(e3.charCodeAt(u2));
          for (var p2 = s2 > 0 ? s2 + 1 : 0; p2 < n2; ) {
            for (var h2 = o2, f2 = 1, l2 = 36; ; l2 += 36) {
              p2 >= n2 && g("invalid-input");
              var d2 = (r3 = e3.charCodeAt(p2++)) - 48 < 10 ? r3 - 22 : r3 - 65 < 26 ? r3 - 65 : r3 - 97 < 26 ? r3 - 97 : 36;
              (d2 >= 36 || d2 > v((c - o2) / f2)) && g("overflow"), o2 += d2 * f2;
              var m2 = l2 <= i2 ? 1 : l2 >= i2 + 26 ? 26 : l2 - i2;
              if (d2 < m2)
                break;
              var E2 = 36 - m2;
              f2 > v(c / E2) && g("overflow"), f2 *= E2;
            }
            var C2 = t2.length + 1;
            i2 = y(o2 - h2, C2, 0 == h2), v(o2 / C2) > c - a2 && g("overflow"), a2 += v(o2 / C2), o2 %= C2, t2.splice(o2++, 0, a2);
          }
          return String.fromCodePoint.apply(String, t2);
        }, A = function(e3) {
          var r3 = [], t2 = (e3 = E(e3)).length, n2 = 128, o2 = 0, a2 = 72, i2 = true, s2 = false, u2 = void 0;
          try {
            for (var p2, h2 = e3[Symbol.iterator](); !(i2 = (p2 = h2.next()).done); i2 = true) {
              var f2 = p2.value;
              f2 < 128 && r3.push(d(f2));
            }
          } catch (L2) {
            s2 = true, u2 = L2;
          } finally {
            try {
              !i2 && h2.return && h2.return();
            } finally {
              if (s2)
                throw u2;
            }
          }
          var l2 = r3.length, m2 = l2;
          for (l2 && r3.push("-"); m2 < t2; ) {
            var S2 = c, A2 = true, D2 = false, w2 = void 0;
            try {
              for (var b2, x2 = e3[Symbol.iterator](); !(A2 = (b2 = x2.next()).done); A2 = true) {
                var O2 = b2.value;
                O2 >= n2 && O2 < S2 && (S2 = O2);
              }
            } catch (L2) {
              D2 = true, w2 = L2;
            } finally {
              try {
                !A2 && x2.return && x2.return();
              } finally {
                if (D2)
                  throw w2;
              }
            }
            var I2 = m2 + 1;
            S2 - n2 > v((c - o2) / I2) && g("overflow"), o2 += (S2 - n2) * I2, n2 = S2;
            var F2 = true, N2 = false, R2 = void 0;
            try {
              for (var T2, _2 = e3[Symbol.iterator](); !(F2 = (T2 = _2.next()).done); F2 = true) {
                var P2 = T2.value;
                if (P2 < n2 && ++o2 > c && g("overflow"), P2 == n2) {
                  for (var U2 = o2, j2 = 36; ; j2 += 36) {
                    var q2 = j2 <= a2 ? 1 : j2 >= a2 + 26 ? 26 : j2 - a2;
                    if (U2 < q2)
                      break;
                    var H2 = U2 - q2, z2 = 36 - q2;
                    r3.push(d(C(q2 + H2 % z2, 0))), U2 = v(H2 / z2);
                  }
                  r3.push(d(C(U2, 0))), a2 = y(o2, I2, m2 == l2), o2 = 0, ++m2;
                }
              }
            } catch (L2) {
              N2 = true, R2 = L2;
            } finally {
              try {
                !F2 && _2.return && _2.return();
              } finally {
                if (N2)
                  throw R2;
              }
            }
            ++o2, ++n2;
          }
          return r3.join("");
        }, D = { version: "2.1.0", ucs2: { decode: E, encode: function(e3) {
          return String.fromCodePoint.apply(String, function(e4) {
            if (Array.isArray(e4)) {
              for (var r3 = 0, t2 = Array(e4.length); r3 < e4.length; r3++)
                t2[r3] = e4[r3];
              return t2;
            }
            return Array.from(e4);
          }(e3));
        } }, decode: S, encode: A, toASCII: function(e3) {
          return m(e3, function(e4) {
            return h.test(e4) ? "xn--" + A(e4) : e4;
          });
        }, toUnicode: function(e3) {
          return m(e3, function(e4) {
            return p.test(e4) ? S(e4.slice(4).toLowerCase()) : e4;
          });
        } }, w = {};
        function b(e3) {
          var r3 = e3.charCodeAt(0);
          return r3 < 16 ? "%0" + r3.toString(16).toUpperCase() : r3 < 128 ? "%" + r3.toString(16).toUpperCase() : r3 < 2048 ? "%" + (r3 >> 6 | 192).toString(16).toUpperCase() + "%" + (63 & r3 | 128).toString(16).toUpperCase() : "%" + (r3 >> 12 | 224).toString(16).toUpperCase() + "%" + (r3 >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (63 & r3 | 128).toString(16).toUpperCase();
        }
        function x(e3) {
          for (var r3 = "", t2 = 0, n2 = e3.length; t2 < n2; ) {
            var o2 = parseInt(e3.substr(t2 + 1, 2), 16);
            if (o2 < 128)
              r3 += String.fromCharCode(o2), t2 += 3;
            else if (o2 >= 194 && o2 < 224) {
              if (n2 - t2 >= 6) {
                var a2 = parseInt(e3.substr(t2 + 4, 2), 16);
                r3 += String.fromCharCode((31 & o2) << 6 | 63 & a2);
              } else
                r3 += e3.substr(t2, 6);
              t2 += 6;
            } else if (o2 >= 224) {
              if (n2 - t2 >= 9) {
                var i2 = parseInt(e3.substr(t2 + 4, 2), 16), s2 = parseInt(e3.substr(t2 + 7, 2), 16);
                r3 += String.fromCharCode((15 & o2) << 12 | (63 & i2) << 6 | 63 & s2);
              } else
                r3 += e3.substr(t2, 9);
              t2 += 9;
            } else
              r3 += e3.substr(t2, 3), t2 += 3;
          }
          return r3;
        }
        function O(e3, r3) {
          function t2(e4) {
            var t3 = x(e4);
            return t3.match(r3.UNRESERVED) ? t3 : e4;
          }
          return e3.scheme && (e3.scheme = String(e3.scheme).replace(r3.PCT_ENCODED, t2).toLowerCase().replace(r3.NOT_SCHEME, "")), void 0 !== e3.userinfo && (e3.userinfo = String(e3.userinfo).replace(r3.PCT_ENCODED, t2).replace(r3.NOT_USERINFO, b).replace(r3.PCT_ENCODED, o)), void 0 !== e3.host && (e3.host = String(e3.host).replace(r3.PCT_ENCODED, t2).toLowerCase().replace(r3.NOT_HOST, b).replace(r3.PCT_ENCODED, o)), void 0 !== e3.path && (e3.path = String(e3.path).replace(r3.PCT_ENCODED, t2).replace(e3.scheme ? r3.NOT_PATH : r3.NOT_PATH_NOSCHEME, b).replace(r3.PCT_ENCODED, o)), void 0 !== e3.query && (e3.query = String(e3.query).replace(r3.PCT_ENCODED, t2).replace(r3.NOT_QUERY, b).replace(r3.PCT_ENCODED, o)), void 0 !== e3.fragment && (e3.fragment = String(e3.fragment).replace(r3.PCT_ENCODED, t2).replace(r3.NOT_FRAGMENT, b).replace(r3.PCT_ENCODED, o)), e3;
        }
        function I(e3) {
          return e3.replace(/^0*(.*)/, "$1") || "0";
        }
        function F(e3, r3) {
          var t2 = e3.match(r3.IPV4ADDRESS) || [], n2 = u(t2, 2)[1];
          return n2 ? n2.split(".").map(I).join(".") : e3;
        }
        function N(e3, r3) {
          var t2 = e3.match(r3.IPV6ADDRESS) || [], n2 = u(t2, 3), o2 = n2[1], a2 = n2[2];
          if (o2) {
            for (var i2 = o2.toLowerCase().split("::").reverse(), s2 = u(i2, 2), c2 = s2[0], p2 = s2[1], h2 = p2 ? p2.split(":").map(I) : [], f2 = c2.split(":").map(I), l2 = r3.IPV4ADDRESS.test(f2[f2.length - 1]), v2 = l2 ? 7 : 8, d2 = f2.length - v2, g2 = Array(v2), m2 = 0; m2 < v2; ++m2)
              g2[m2] = h2[m2] || f2[d2 + m2] || "";
            l2 && (g2[v2 - 1] = F(g2[v2 - 1], r3));
            var E2 = g2.reduce(function(e4, r4, t3) {
              if (!r4 || "0" === r4) {
                var n3 = e4[e4.length - 1];
                n3 && n3.index + n3.length === t3 ? n3.length++ : e4.push({ index: t3, length: 1 });
              }
              return e4;
            }, []).sort(function(e4, r4) {
              return r4.length - e4.length;
            })[0], C2 = void 0;
            if (E2 && E2.length > 1) {
              var y2 = g2.slice(0, E2.index), S2 = g2.slice(E2.index + E2.length);
              C2 = y2.join(":") + "::" + S2.join(":");
            } else
              C2 = g2.join(":");
            return a2 && (C2 += "%" + a2), C2;
          }
          return e3;
        }
        var R = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i, T = void 0 === "".match(/(){0}/)[1];
        function _(e3) {
          var r3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t2 = {}, n2 = false !== r3.iri ? s : i;
          "suffix" === r3.reference && (e3 = (r3.scheme ? r3.scheme + ":" : "") + "//" + e3);
          var o2 = e3.match(R);
          if (o2) {
            T ? (t2.scheme = o2[1], t2.userinfo = o2[3], t2.host = o2[4], t2.port = parseInt(o2[5], 10), t2.path = o2[6] || "", t2.query = o2[7], t2.fragment = o2[8], isNaN(t2.port) && (t2.port = o2[5])) : (t2.scheme = o2[1] || void 0, t2.userinfo = -1 !== e3.indexOf("@") ? o2[3] : void 0, t2.host = -1 !== e3.indexOf("//") ? o2[4] : void 0, t2.port = parseInt(o2[5], 10), t2.path = o2[6] || "", t2.query = -1 !== e3.indexOf("?") ? o2[7] : void 0, t2.fragment = -1 !== e3.indexOf("#") ? o2[8] : void 0, isNaN(t2.port) && (t2.port = e3.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? o2[4] : void 0)), t2.host && (t2.host = N(F(t2.host, n2), n2)), void 0 !== t2.scheme || void 0 !== t2.userinfo || void 0 !== t2.host || void 0 !== t2.port || t2.path || void 0 !== t2.query ? void 0 === t2.scheme ? t2.reference = "relative" : void 0 === t2.fragment ? t2.reference = "absolute" : t2.reference = "uri" : t2.reference = "same-document", r3.reference && "suffix" !== r3.reference && r3.reference !== t2.reference && (t2.error = t2.error || "URI is not a " + r3.reference + " reference.");
            var a2 = w[(r3.scheme || t2.scheme || "").toLowerCase()];
            if (r3.unicodeSupport || a2 && a2.unicodeSupport)
              O(t2, n2);
            else {
              if (t2.host && (r3.domainHost || a2 && a2.domainHost))
                try {
                  t2.host = D.toASCII(t2.host.replace(n2.PCT_ENCODED, x).toLowerCase());
                } catch (u2) {
                  t2.error = t2.error || "Host's domain name can not be converted to ASCII via punycode: " + u2;
                }
              O(t2, i);
            }
            a2 && a2.parse && a2.parse(t2, r3);
          } else
            t2.error = t2.error || "URI can not be parsed.";
          return t2;
        }
        var P = /^\.\.?\//, U = /^\/\.(\/|$)/, j = /^\/\.\.(\/|$)/, q = /^\/?(?:.|\n)*?(?=\/|$)/;
        function H(e3) {
          for (var r3 = []; e3.length; )
            if (e3.match(P))
              e3 = e3.replace(P, "");
            else if (e3.match(U))
              e3 = e3.replace(U, "/");
            else if (e3.match(j))
              e3 = e3.replace(j, "/"), r3.pop();
            else if ("." === e3 || ".." === e3)
              e3 = "";
            else {
              var t2 = e3.match(q);
              if (!t2)
                throw new Error("Unexpected dot segment condition");
              var n2 = t2[0];
              e3 = e3.slice(n2.length), r3.push(n2);
            }
          return r3.join("");
        }
        function z(e3) {
          var r3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t2 = r3.iri ? s : i, n2 = [], o2 = w[(r3.scheme || e3.scheme || "").toLowerCase()];
          if (o2 && o2.serialize && o2.serialize(e3, r3), e3.host) {
            if (t2.IPV6ADDRESS.test(e3.host))
              ;
            else if (r3.domainHost || o2 && o2.domainHost)
              try {
                e3.host = r3.iri ? D.toUnicode(e3.host) : D.toASCII(e3.host.replace(t2.PCT_ENCODED, x).toLowerCase());
              } catch (c2) {
                e3.error = e3.error || "Host's domain name can not be converted to " + (r3.iri ? "Unicode" : "ASCII") + " via punycode: " + c2;
              }
          }
          O(e3, t2), "suffix" !== r3.reference && e3.scheme && (n2.push(e3.scheme), n2.push(":"));
          var a2 = function(e4, r4) {
            var t3 = false !== r4.iri ? s : i, n3 = [];
            return void 0 !== e4.userinfo && (n3.push(e4.userinfo), n3.push("@")), void 0 !== e4.host && n3.push(N(F(String(e4.host), t3), t3).replace(t3.IPV6ADDRESS, function(e5, r5, t4) {
              return "[" + r5 + (t4 ? "%25" + t4 : "") + "]";
            })), "number" == typeof e4.port && (n3.push(":"), n3.push(e4.port.toString(10))), n3.length ? n3.join("") : void 0;
          }(e3, r3);
          if (void 0 !== a2 && ("suffix" !== r3.reference && n2.push("//"), n2.push(a2), e3.path && "/" !== e3.path.charAt(0) && n2.push("/")), void 0 !== e3.path) {
            var u2 = e3.path;
            r3.absolutePath || o2 && o2.absolutePath || (u2 = H(u2)), void 0 === a2 && (u2 = u2.replace(/^\/\//, "/%2F")), n2.push(u2);
          }
          return void 0 !== e3.query && (n2.push("?"), n2.push(e3.query)), void 0 !== e3.fragment && (n2.push("#"), n2.push(e3.fragment)), n2.join("");
        }
        function L(e3, r3) {
          var t2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, n2 = {};
          return arguments[3] || (e3 = _(z(e3, t2), t2), r3 = _(z(r3, t2), t2)), !(t2 = t2 || {}).tolerant && r3.scheme ? (n2.scheme = r3.scheme, n2.userinfo = r3.userinfo, n2.host = r3.host, n2.port = r3.port, n2.path = H(r3.path || ""), n2.query = r3.query) : (void 0 !== r3.userinfo || void 0 !== r3.host || void 0 !== r3.port ? (n2.userinfo = r3.userinfo, n2.host = r3.host, n2.port = r3.port, n2.path = H(r3.path || ""), n2.query = r3.query) : (r3.path ? ("/" === r3.path.charAt(0) ? n2.path = H(r3.path) : (void 0 === e3.userinfo && void 0 === e3.host && void 0 === e3.port || e3.path ? e3.path ? n2.path = e3.path.slice(0, e3.path.lastIndexOf("/") + 1) + r3.path : n2.path = r3.path : n2.path = "/" + r3.path, n2.path = H(n2.path)), n2.query = r3.query) : (n2.path = e3.path, void 0 !== r3.query ? n2.query = r3.query : n2.query = e3.query), n2.userinfo = e3.userinfo, n2.host = e3.host, n2.port = e3.port), n2.scheme = e3.scheme), n2.fragment = r3.fragment, n2;
        }
        function $(e3, r3) {
          return e3 && e3.toString().replace(r3 && r3.iri ? s.PCT_ENCODED : i.PCT_ENCODED, x);
        }
        var V = { scheme: "http", domainHost: true, parse: function(e3, r3) {
          return e3.host || (e3.error = e3.error || "HTTP URIs must have a host."), e3;
        }, serialize: function(e3, r3) {
          return e3.port !== ("https" !== String(e3.scheme).toLowerCase() ? 80 : 443) && "" !== e3.port || (e3.port = void 0), e3.path || (e3.path = "/"), e3;
        } }, M = { scheme: "https", domainHost: V.domainHost, parse: V.parse, serialize: V.serialize }, Z = {}, k = "[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]", G = "[0-9A-Fa-f]", Q = t(t("%[EFef][0-9A-Fa-f]%" + G + G + "%" + G + G) + "|" + t("%[89A-Fa-f][0-9A-Fa-f]%" + G + G) + "|" + t("%" + G + G)), Y = r2("[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]", '[\\"\\\\]'), B = new RegExp(k, "g"), J = new RegExp(Q, "g"), K = new RegExp(r2("[^]", "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]", "[\\.]", '[\\"]', Y), "g"), W = new RegExp(r2("[^]", k, "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]"), "g"), X = W;
        function ee(e3) {
          var r3 = x(e3);
          return r3.match(B) ? r3 : e3;
        }
        var re = { scheme: "mailto", parse: function(e3, r3) {
          var t2 = e3, n2 = t2.to = t2.path ? t2.path.split(",") : [];
          if (t2.path = void 0, t2.query) {
            for (var o2 = false, a2 = {}, i2 = t2.query.split("&"), s2 = 0, u2 = i2.length; s2 < u2; ++s2) {
              var c2 = i2[s2].split("=");
              switch (c2[0]) {
                case "to":
                  for (var p2 = c2[1].split(","), h2 = 0, f2 = p2.length; h2 < f2; ++h2)
                    n2.push(p2[h2]);
                  break;
                case "subject":
                  t2.subject = $(c2[1], r3);
                  break;
                case "body":
                  t2.body = $(c2[1], r3);
                  break;
                default:
                  o2 = true, a2[$(c2[0], r3)] = $(c2[1], r3);
              }
            }
            o2 && (t2.headers = a2);
          }
          t2.query = void 0;
          for (var l2 = 0, v2 = n2.length; l2 < v2; ++l2) {
            var d2 = n2[l2].split("@");
            if (d2[0] = $(d2[0]), r3.unicodeSupport)
              d2[1] = $(d2[1], r3).toLowerCase();
            else
              try {
                d2[1] = D.toASCII($(d2[1], r3).toLowerCase());
              } catch (g2) {
                t2.error = t2.error || "Email address's domain name can not be converted to ASCII via punycode: " + g2;
              }
            n2[l2] = d2.join("@");
          }
          return t2;
        }, serialize: function(e3, r3) {
          var t2, n2 = e3, a2 = null != (t2 = e3.to) ? t2 instanceof Array ? t2 : "number" != typeof t2.length || t2.split || t2.setInterval || t2.call ? [t2] : Array.prototype.slice.call(t2) : [];
          if (a2) {
            for (var i2 = 0, s2 = a2.length; i2 < s2; ++i2) {
              var u2 = String(a2[i2]), c2 = u2.lastIndexOf("@"), p2 = u2.slice(0, c2).replace(J, ee).replace(J, o).replace(K, b), h2 = u2.slice(c2 + 1);
              try {
                h2 = r3.iri ? D.toUnicode(h2) : D.toASCII($(h2, r3).toLowerCase());
              } catch (d2) {
                n2.error = n2.error || "Email address's domain name can not be converted to " + (r3.iri ? "Unicode" : "ASCII") + " via punycode: " + d2;
              }
              a2[i2] = p2 + "@" + h2;
            }
            n2.path = a2.join(",");
          }
          var f2 = e3.headers = e3.headers || {};
          e3.subject && (f2.subject = e3.subject), e3.body && (f2.body = e3.body);
          var l2 = [];
          for (var v2 in f2)
            f2[v2] !== Z[v2] && l2.push(v2.replace(J, ee).replace(J, o).replace(W, b) + "=" + f2[v2].replace(J, ee).replace(J, o).replace(X, b));
          return l2.length && (n2.query = l2.join("&")), n2;
        } }, te = /^([^\:]+)\:(.*)/, ne = { scheme: "urn", parse: function(e3, r3) {
          var t2 = e3.path && e3.path.match(te), n2 = e3;
          if (t2) {
            var o2 = r3.scheme || n2.scheme || "urn", a2 = t2[1].toLowerCase(), i2 = t2[2], s2 = o2 + ":" + (r3.nid || a2), u2 = w[s2];
            n2.nid = a2, n2.nss = i2, n2.path = void 0, u2 && (n2 = u2.parse(n2, r3));
          } else
            n2.error = n2.error || "URN can not be parsed.";
          return n2;
        }, serialize: function(e3, r3) {
          var t2 = r3.scheme || e3.scheme || "urn", n2 = e3.nid, o2 = t2 + ":" + (r3.nid || n2), a2 = w[o2];
          a2 && (e3 = a2.serialize(e3, r3));
          var i2 = e3, s2 = e3.nss;
          return i2.path = (n2 || r3.nid) + ":" + s2, i2;
        } }, oe = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/, ae = { scheme: "urn:uuid", parse: function(e3, r3) {
          var t2 = e3;
          return t2.uuid = t2.nss, t2.nss = void 0, r3.tolerant || t2.uuid && t2.uuid.match(oe) || (t2.error = t2.error || "UUID is not valid."), t2;
        }, serialize: function(e3, r3) {
          var t2 = e3;
          return t2.nss = (e3.uuid || "").toLowerCase(), t2;
        } };
        w[V.scheme] = V, w[M.scheme] = M, w[re.scheme] = re, w[ne.scheme] = ne, w[ae.scheme] = ae, e2.SCHEMES = w, e2.pctEncChar = b, e2.pctDecChars = x, e2.parse = _, e2.removeDotSegments = H, e2.serialize = z, e2.resolveComponents = L, e2.resolve = function(e3, r3, t2) {
          var n2 = function(e4, r4) {
            var t3 = e4;
            if (r4)
              for (var n3 in r4)
                t3[n3] = r4[n3];
            return t3;
          }({ scheme: "null" }, t2);
          return z(L(_(e3, n2), _(r3, n2), n2, true), n2);
        }, e2.normalize = function(e3, r3) {
          return "string" == typeof e3 ? e3 = z(_(e3, r3), r3) : "object" === n(e3) && (e3 = _(z(e3, r3), r3)), e3;
        }, e2.equal = function(e3, r3, t2) {
          return "string" == typeof e3 ? e3 = z(_(e3, t2), t2) : "object" === n(e3) && (e3 = z(e3, t2)), "string" == typeof r3 ? r3 = z(_(r3, t2), t2) : "object" === n(r3) && (r3 = z(r3, t2)), e3 === r3;
        }, e2.escapeComponent = function(e3, r3) {
          return e3 && e3.toString().replace(r3 && r3.iri ? s.ESCAPE : i.ESCAPE, b);
        }, e2.unescapeComponent = $, Object.defineProperty(e2, "__esModule", { value: true });
      });
    }, {}], "dPQH": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function r(t, e) {
        if (t === e)
          return true;
        if (t && e && "object" == typeof t && "object" == typeof e) {
          if (t.constructor !== e.constructor)
            return false;
          var o, n, u;
          if (Array.isArray(t)) {
            if ((o = t.length) != e.length)
              return false;
            for (n = o; 0 != n--; )
              if (!r(t[n], e[n]))
                return false;
            return true;
          }
          if (t.constructor === RegExp)
            return t.source === e.source && t.flags === e.flags;
          if (t.valueOf !== Object.prototype.valueOf)
            return t.valueOf() === e.valueOf();
          if (t.toString !== Object.prototype.toString)
            return t.toString() === e.toString();
          if ((o = (u = Object.keys(t)).length) !== Object.keys(e).length)
            return false;
          for (n = o; 0 != n--; )
            if (!Object.prototype.hasOwnProperty.call(e, u[n]))
              return false;
          for (n = o; 0 != n--; ) {
            var f = u[n];
            if (!r(t[f], e[f]))
              return false;
          }
          return true;
        }
        return t != t && e != e;
      };
    }, {}], "rD0p": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(r) {
        for (var t, e = 0, o = r.length, c = 0; c < o; )
          e++, (t = r.charCodeAt(c++)) >= 55296 && t <= 56319 && c < o && 56320 == (64512 & (t = r.charCodeAt(c))) && c++;
        return e;
      };
    }, {}], "Q1F7": [function(require2, module2, exports3) {
      "use strict";
      function e(e2, r2) {
        for (var n2 in r2 = r2 || {}, e2)
          r2[n2] = e2[n2];
        return r2;
      }
      function r(e2, r2, n2, t2) {
        var a2 = t2 ? " !== " : " === ", o2 = t2 ? " || " : " && ", u2 = t2 ? "!" : "", c2 = t2 ? "" : "!";
        switch (e2) {
          case "null":
            return r2 + a2 + "null";
          case "array":
            return u2 + "Array.isArray(" + r2 + ")";
          case "object":
            return "(" + u2 + r2 + o2 + "typeof " + r2 + a2 + '"object"' + o2 + c2 + "Array.isArray(" + r2 + "))";
          case "integer":
            return "(typeof " + r2 + a2 + '"number"' + o2 + c2 + "(" + r2 + " % 1)" + o2 + r2 + a2 + r2 + (n2 ? o2 + u2 + "isFinite(" + r2 + ")" : "") + ")";
          case "number":
            return "(typeof " + r2 + a2 + '"' + e2 + '"' + (n2 ? o2 + u2 + "isFinite(" + r2 + ")" : "") + ")";
          default:
            return "typeof " + r2 + a2 + '"' + e2 + '"';
        }
      }
      function n(e2, n2, t2) {
        switch (e2.length) {
          case 1:
            return r(e2[0], n2, t2, true);
          default:
            var a2 = "", u2 = o(e2);
            for (var c2 in u2.array && u2.object && (a2 = u2.null ? "(" : "(!" + n2 + " || ", a2 += "typeof " + n2 + ' !== "object")', delete u2.null, delete u2.array, delete u2.object), u2.number && delete u2.integer, u2)
              a2 += (a2 ? " && " : "") + r(c2, n2, t2, true);
            return a2;
        }
      }
      module2.exports = { copy: e, checkDataType: r, checkDataTypes: n, coerceToTypes: a, toHash: o, getProperty: i, escapeQuotes: l, equal: require2("fast-deep-equal"), ucs2length: require2("./ucs2length"), varOccurences: f, varReplace: s, schemaHasRules: p, schemaHasRulesExcept: g, schemaUnknownRules: y, toQuotedString: h, getPathExpr: v, getPath: d, getData: w, unescapeFragment: E, unescapeJsonPointer: A, escapeFragment: R, escapeJsonPointer: x };
      var t = o(["string", "number", "integer", "boolean", "null"]);
      function a(e2, r2) {
        if (Array.isArray(r2)) {
          for (var n2 = [], a2 = 0; a2 < r2.length; a2++) {
            var o2 = r2[a2];
            t[o2] ? n2[n2.length] = o2 : "array" === e2 && "array" === o2 && (n2[n2.length] = o2);
          }
          if (n2.length)
            return n2;
        } else {
          if (t[r2])
            return [r2];
          if ("array" === e2 && "array" === r2)
            return ["array"];
        }
      }
      function o(e2) {
        for (var r2 = {}, n2 = 0; n2 < e2.length; n2++)
          r2[e2[n2]] = true;
        return r2;
      }
      var u = /^[a-z$_][a-z$_0-9]*$/i, c = /'|\\/g;
      function i(e2) {
        return "number" == typeof e2 ? "[" + e2 + "]" : u.test(e2) ? "." + e2 : "['" + l(e2) + "']";
      }
      function l(e2) {
        return e2.replace(c, "\\$&").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\f/g, "\\f").replace(/\t/g, "\\t");
      }
      function f(e2, r2) {
        r2 += "[^0-9]";
        var n2 = e2.match(new RegExp(r2, "g"));
        return n2 ? n2.length : 0;
      }
      function s(e2, r2, n2) {
        return r2 += "([^0-9])", n2 = n2.replace(/\$/g, "$$$$"), e2.replace(new RegExp(r2, "g"), n2 + "$1");
      }
      function p(e2, r2) {
        if ("boolean" == typeof e2)
          return !e2;
        for (var n2 in e2)
          if (r2[n2])
            return true;
      }
      function g(e2, r2, n2) {
        if ("boolean" == typeof e2)
          return !e2 && "not" != n2;
        for (var t2 in e2)
          if (t2 != n2 && r2[t2])
            return true;
      }
      function y(e2, r2) {
        if ("boolean" != typeof e2) {
          for (var n2 in e2)
            if (!r2[n2])
              return n2;
        }
      }
      function h(e2) {
        return "'" + l(e2) + "'";
      }
      function v(e2, r2, n2, t2) {
        return $(e2, n2 ? "'/' + " + r2 + (t2 ? "" : ".replace(/~/g, '~0').replace(/\\//g, '~1')") : t2 ? "'[' + " + r2 + " + ']'" : "'[\\'' + " + r2 + " + '\\']'");
      }
      function d(e2, r2, n2) {
        return $(e2, h(n2 ? "/" + x(r2) : i(r2)));
      }
      var m = /^\/(?:[^~]|~0|~1)*$/, b = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
      function w(e2, r2, n2) {
        var t2, a2, o2, u2;
        if ("" === e2)
          return "rootData";
        if ("/" == e2[0]) {
          if (!m.test(e2))
            throw new Error("Invalid JSON-pointer: " + e2);
          a2 = e2, o2 = "rootData";
        } else {
          if (!(u2 = e2.match(b)))
            throw new Error("Invalid JSON-pointer: " + e2);
          if (t2 = +u2[1], "#" == (a2 = u2[2])) {
            if (t2 >= r2)
              throw new Error("Cannot access property/index " + t2 + " levels up, current level is " + r2);
            return n2[r2 - t2];
          }
          if (t2 > r2)
            throw new Error("Cannot access data " + t2 + " levels up, current level is " + r2);
          if (o2 = "data" + (r2 - t2 || ""), !a2)
            return o2;
        }
        for (var c2 = o2, l2 = a2.split("/"), f2 = 0; f2 < l2.length; f2++) {
          var s2 = l2[f2];
          s2 && (c2 += " && " + (o2 += i(A(s2))));
        }
        return c2;
      }
      function $(e2, r2) {
        return '""' == e2 ? r2 : (e2 + " + " + r2).replace(/([^\\])' \+ '/g, "$1");
      }
      function E(e2) {
        return A(decodeURIComponent(e2));
      }
      function R(e2) {
        return encodeURIComponent(x(e2));
      }
      function x(e2) {
        return e2.replace(/~/g, "~0").replace(/\//g, "~1");
      }
      function A(e2) {
        return e2.replace(/~1/g, "/").replace(/~0/g, "~");
      }
    }, { "fast-deep-equal": "dPQH", "./ucs2length": "rD0p" }], "HHLG": [function(require2, module2, exports3) {
      "use strict";
      var t = require2("./util");
      function e(e2) {
        t.copy(e2, this);
      }
      module2.exports = e;
    }, { "./util": "Q1F7" }], "uMRE": [function(require2, module2, exports3) {
      "use strict";
      var e = module2.exports = function(e2, i2, t) {
        "function" == typeof i2 && (t = i2, i2 = {}), r(i2, "function" == typeof (t = i2.cb || t) ? t : t.pre || function() {
        }, t.post || function() {
        }, e2, "", e2);
      };
      function r(t, n, o, s, a, m, p, f, u, y) {
        if (s && "object" == typeof s && !Array.isArray(s)) {
          for (var c in n(s, a, m, p, f, u, y), s) {
            var d = s[c];
            if (Array.isArray(d)) {
              if (c in e.arrayKeywords)
                for (var l = 0; l < d.length; l++)
                  r(t, n, o, d[l], a + "/" + c + "/" + l, m, a, c, s, l);
            } else if (c in e.propsKeywords) {
              if (d && "object" == typeof d)
                for (var w in d)
                  r(t, n, o, d[w], a + "/" + c + "/" + i(w), m, a, c, s, w);
            } else
              (c in e.keywords || t.allKeys && !(c in e.skipKeywords)) && r(t, n, o, d, a + "/" + c, m, a, c, s);
          }
          o(s, a, m, p, f, u, y);
        }
      }
      function i(e2) {
        return e2.replace(/~/g, "~0").replace(/\//g, "~1");
      }
      e.keywords = { additionalItems: true, items: true, contains: true, additionalProperties: true, propertyNames: true, not: true }, e.arrayKeywords = { items: true, allOf: true, anyOf: true, oneOf: true }, e.propsKeywords = { definitions: true, properties: true, patternProperties: true, dependencies: true }, e.skipKeywords = { default: true, enum: true, const: true, required: true, maximum: true, minimum: true, exclusiveMaximum: true, exclusiveMinimum: true, multipleOf: true, maxLength: true, minLength: true, pattern: true, format: true, maxItems: true, minItems: true, uniqueItems: true, maxProperties: true, minProperties: true };
    }, {}], "w10T": [function(require2, module2, exports3) {
      "use strict";
      var e = require2("uri-js"), r = require2("fast-deep-equal"), t = require2("./util"), i = require2("./schema_obj"), s = require2("json-schema-traverse");
      function a(e2, r2, t2) {
        var s2 = this._refs[t2];
        if ("string" == typeof s2) {
          if (!this._refs[s2])
            return a.call(this, e2, r2, s2);
          s2 = this._refs[s2];
        }
        if ((s2 = s2 || this._schemas[t2]) instanceof i)
          return u(s2.schema, this._opts.inlineRefs) ? s2.schema : s2.validate || this._compile(s2);
        var o2, f2, c2, h2 = n.call(this, r2, t2);
        return h2 && (o2 = h2.schema, r2 = h2.root, c2 = h2.baseId), o2 instanceof i ? f2 = o2.validate || e2.call(this, o2.schema, r2, void 0, c2) : void 0 !== o2 && (f2 = u(o2, this._opts.inlineRefs) ? o2 : e2.call(this, o2, r2, void 0, c2)), f2;
      }
      function n(r2, t2) {
        var s2 = e.parse(t2), a2 = d(s2), n2 = v(this._getId(r2.schema));
        if (0 === Object.keys(r2.schema).length || a2 !== n2) {
          var f2 = g(a2), h2 = this._refs[f2];
          if ("string" == typeof h2)
            return o.call(this, r2, h2, s2);
          if (h2 instanceof i)
            h2.validate || this._compile(h2), r2 = h2;
          else {
            if (!((h2 = this._schemas[f2]) instanceof i))
              return;
            if (h2.validate || this._compile(h2), f2 == g(t2))
              return { schema: h2, root: r2, baseId: n2 };
            r2 = h2;
          }
          if (!r2.schema)
            return;
          n2 = v(this._getId(r2.schema));
        }
        return c.call(this, s2, n2, r2.schema, r2);
      }
      function o(e2, r2, t2) {
        var i2 = n.call(this, e2, r2);
        if (i2) {
          var s2 = i2.schema, a2 = i2.baseId;
          e2 = i2.root;
          var o2 = this._getId(s2);
          return o2 && (a2 = _(a2, o2)), c.call(this, t2, a2, s2, e2);
        }
      }
      module2.exports = a, a.normalizeId = g, a.fullPath = v, a.url = _, a.ids = y, a.inlineRef = u, a.schema = n;
      var f = t.toHash(["properties", "patternProperties", "enum", "dependencies", "definitions"]);
      function c(e2, r2, i2, s2) {
        if (e2.fragment = e2.fragment || "", "/" == e2.fragment.slice(0, 1)) {
          for (var a2 = e2.fragment.split("/"), o2 = 1; o2 < a2.length; o2++) {
            var c2 = a2[o2];
            if (c2) {
              if (void 0 === (i2 = i2[c2 = t.unescapeFragment(c2)]))
                break;
              var h2;
              if (!f[c2] && ((h2 = this._getId(i2)) && (r2 = _(r2, h2)), i2.$ref)) {
                var u2 = _(r2, i2.$ref), l2 = n.call(this, s2, u2);
                l2 && (i2 = l2.schema, s2 = l2.root, r2 = l2.baseId);
              }
            }
          }
          return void 0 !== i2 && i2 !== s2.schema ? { schema: i2, root: s2, baseId: r2 } : void 0;
        }
      }
      var h = t.toHash(["type", "format", "pattern", "maxLength", "minLength", "maxProperties", "minProperties", "maxItems", "minItems", "maximum", "minimum", "uniqueItems", "multipleOf", "required", "enum"]);
      function u(e2, r2) {
        return false !== r2 && (void 0 === r2 || true === r2 ? l(e2) : r2 ? m(e2) <= r2 : void 0);
      }
      function l(e2) {
        var r2;
        if (Array.isArray(e2)) {
          for (var t2 = 0; t2 < e2.length; t2++)
            if ("object" == typeof (r2 = e2[t2]) && !l(r2))
              return false;
        } else
          for (var i2 in e2) {
            if ("$ref" == i2)
              return false;
            if ("object" == typeof (r2 = e2[i2]) && !l(r2))
              return false;
          }
        return true;
      }
      function m(e2) {
        var r2, t2 = 0;
        if (Array.isArray(e2)) {
          for (var i2 = 0; i2 < e2.length; i2++)
            if ("object" == typeof (r2 = e2[i2]) && (t2 += m(r2)), t2 == 1 / 0)
              return 1 / 0;
        } else
          for (var s2 in e2) {
            if ("$ref" == s2)
              return 1 / 0;
            if (h[s2])
              t2++;
            else if ("object" == typeof (r2 = e2[s2]) && (t2 += m(r2) + 1), t2 == 1 / 0)
              return 1 / 0;
          }
        return t2;
      }
      function v(r2, t2) {
        return false !== t2 && (r2 = g(r2)), d(e.parse(r2));
      }
      function d(r2) {
        return e.serialize(r2).split("#")[0] + "#";
      }
      var p = /#\/?$/;
      function g(e2) {
        return e2 ? e2.replace(p, "") : "";
      }
      function _(r2, t2) {
        return t2 = g(t2), e.resolve(r2, t2);
      }
      function y(i2) {
        var a2 = g(this._getId(i2)), n2 = { "": a2 }, o2 = { "": v(a2, false) }, f2 = {}, c2 = this;
        return s(i2, { allKeys: true }, function(i3, s2, a3, h2, u2, l2, m2) {
          if ("" !== s2) {
            var v2 = c2._getId(i3), d2 = n2[h2], p2 = o2[h2] + "/" + u2;
            if (void 0 !== m2 && (p2 += "/" + ("number" == typeof m2 ? m2 : t.escapeFragment(m2))), "string" == typeof v2) {
              v2 = d2 = g(d2 ? e.resolve(d2, v2) : v2);
              var _2 = c2._refs[v2];
              if ("string" == typeof _2 && (_2 = c2._refs[_2]), _2 && _2.schema) {
                if (!r(i3, _2.schema))
                  throw new Error('id "' + v2 + '" resolves to more than one schema');
              } else if (v2 != g(p2))
                if ("#" == v2[0]) {
                  if (f2[v2] && !r(i3, f2[v2]))
                    throw new Error('id "' + v2 + '" resolves to more than one schema');
                  f2[v2] = i3;
                } else
                  c2._refs[v2] = p2;
            }
            n2[s2] = d2, o2[s2] = p2;
          }
        }), f2;
      }
    }, { "uri-js": "wWOq", "fast-deep-equal": "dPQH", "./util": "Q1F7", "./schema_obj": "HHLG", "json-schema-traverse": "uMRE" }], "OtNE": [function(require2, module2, exports3) {
      "use strict";
      var e = require2("./resolve");
      function t(e2) {
        this.message = "validation failed", this.errors = e2, this.ajv = this.validation = true;
      }
      function i(t2, s2, r) {
        this.message = r || i.message(t2, s2), this.missingRef = e.url(t2, s2), this.missingSchema = e.normalizeId(e.fullPath(this.missingRef));
      }
      function s(e2) {
        return e2.prototype = Object.create(Error.prototype), e2.prototype.constructor = e2, e2;
      }
      module2.exports = { Validation: s(t), MissingRef: s(i) }, i.message = function(e2, t2) {
        return "can't resolve reference " + t2 + " from id " + e2;
      };
    }, { "./resolve": "w10T" }], "Xb3N": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(r, t) {
        t || (t = {}), "function" == typeof t && (t = { cmp: t });
        var e, n = "boolean" == typeof t.cycles && t.cycles, i = t.cmp && (e = t.cmp, function(r2) {
          return function(t2, n2) {
            var i2 = { key: t2, value: r2[t2] }, u2 = { key: n2, value: r2[n2] };
            return e(i2, u2);
          };
        }), u = [];
        return function r2(t2) {
          if (t2 && t2.toJSON && "function" == typeof t2.toJSON && (t2 = t2.toJSON()), void 0 !== t2) {
            if ("number" == typeof t2)
              return isFinite(t2) ? "" + t2 : "null";
            if ("object" != typeof t2)
              return JSON.stringify(t2);
            var e2, o;
            if (Array.isArray(t2)) {
              for (o = "[", e2 = 0; e2 < t2.length; e2++)
                e2 && (o += ","), o += r2(t2[e2]) || "null";
              return o + "]";
            }
            if (null === t2)
              return "null";
            if (-1 !== u.indexOf(t2)) {
              if (n)
                return JSON.stringify("__cycle__");
              throw new TypeError("Converting circular structure to JSON");
            }
            var f = u.push(t2) - 1, c = Object.keys(t2).sort(i && i(t2));
            for (o = "", e2 = 0; e2 < c.length; e2++) {
              var l = c[e2], y = r2(t2[l]);
              y && (o && (o += ","), o += JSON.stringify(l) + ":" + y);
            }
            return u.splice(f, 1), "{" + o + "}";
          }
        }(r);
      };
    }, {}], "yhC1": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, r, a) {
        var t = "", s = true === e.schema.$async, o = e.util.schemaHasRulesExcept(e.schema, e.RULES.all, "$ref"), l = e.self._getId(e.schema);
        if (e.opts.strictKeywords) {
          var i = e.util.schemaUnknownRules(e.schema, e.RULES.keywords);
          if (i) {
            var n = "unknown keyword: " + i;
            if ("log" !== e.opts.strictKeywords)
              throw new Error(n);
            e.logger.warn(n);
          }
        }
        if (e.isTop && (t += " var validate = ", s && (e.async = true, t += "async "), t += "function(data, dataPath, parentData, parentDataProperty, rootData) { 'use strict'; ", l && (e.opts.sourceCode || e.opts.processCode) && (t += " /*# sourceURL=" + l + " */ ")), "boolean" == typeof e.schema || !o && !e.schema.$ref) {
          var c = e.level, f = e.dataLevel, h = e.schema["false schema"], u = e.schemaPath + e.util.getProperty("false schema"), p = e.errSchemaPath + "/false schema", d = !e.opts.allErrors, m = "data" + (f || ""), v = "valid" + c;
          if (false === e.schema) {
            e.isTop ? d = true : t += " var " + v + " = false; ", (W = W || []).push(t), t = "", false !== e.createErrors ? (t += " { keyword: 'false schema' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(p) + " , params: {} ", false !== e.opts.messages && (t += " , message: 'boolean schema is false' "), e.opts.verbose && (t += " , schema: false , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), t += " } ") : t += " {} ";
            var y = t;
            t = W.pop(), !e.compositeRule && d ? e.async ? t += " throw new ValidationError([" + y + "]); " : t += " validate.errors = [" + y + "]; return false; " : t += " var err = " + y + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
          } else
            e.isTop ? t += s ? " return data; " : " validate.errors = null; return true; " : t += " var " + v + " = true; ";
          return e.isTop && (t += " }; return validate; "), t;
        }
        if (e.isTop) {
          var g = e.isTop;
          c = e.level = 0, f = e.dataLevel = 0, m = "data";
          if (e.rootId = e.resolve.fullPath(e.self._getId(e.root.schema)), e.baseId = e.baseId || e.rootId, delete e.isTop, e.dataPathArr = [""], void 0 !== e.schema.default && e.opts.useDefaults && e.opts.strictDefaults) {
            var w = "default is ignored in the schema root";
            if ("log" !== e.opts.strictDefaults)
              throw new Error(w);
            e.logger.warn(w);
          }
          t += " var vErrors = null; ", t += " var errors = 0;     ", t += " if (rootData === undefined) rootData = data; ";
        } else {
          c = e.level, m = "data" + ((f = e.dataLevel) || "");
          if (l && (e.baseId = e.resolve.url(e.baseId, l)), s && !e.async)
            throw new Error("async schema in sync schema");
          t += " var errs_" + c + " = errors;";
        }
        v = "valid" + c, d = !e.opts.allErrors;
        var E = "", P = "", b = e.schema.type, D = Array.isArray(b);
        if (b && e.opts.nullable && true === e.schema.nullable && (D ? -1 == b.indexOf("null") && (b = b.concat("null")) : "null" != b && (b = [b, "null"], D = true)), D && 1 == b.length && (b = b[0], D = false), e.schema.$ref && o) {
          if ("fail" == e.opts.extendRefs)
            throw new Error('$ref: validation keywords used in schema at path "' + e.errSchemaPath + '" (see option extendRefs)');
          true !== e.opts.extendRefs && (o = false, e.logger.warn('$ref: keywords ignored in schema at path "' + e.errSchemaPath + '"'));
        }
        if (e.schema.$comment && e.opts.$comment && (t += " " + e.RULES.all.$comment.code(e, "$comment")), b) {
          if (e.opts.coerceTypes)
            var S = e.util.coerceToTypes(e.opts.coerceTypes, b);
          var R = e.RULES.types[b];
          if (S || D || true === R || R && !X(R)) {
            u = e.schemaPath + ".type", p = e.errSchemaPath + "/type", u = e.schemaPath + ".type", p = e.errSchemaPath + "/type";
            var T = D ? "checkDataTypes" : "checkDataType";
            if (t += " if (" + e.util[T](b, m, e.opts.strictNumbers, true) + ") { ", S) {
              var k = "dataType" + c, $ = "coerced" + c;
              t += " var " + k + " = typeof " + m + "; var " + $ + " = undefined; ", "array" == e.opts.coerceTypes && (t += " if (" + k + " == 'object' && Array.isArray(" + m + ") && " + m + ".length == 1) { " + m + " = " + m + "[0]; " + k + " = typeof " + m + "; if (" + e.util.checkDataType(e.schema.type, m, e.opts.strictNumbers) + ") " + $ + " = " + m + "; } "), t += " if (" + $ + " !== undefined) ; ";
              var L = S;
              if (L)
                for (var j, A = -1, I = L.length - 1; A < I; )
                  "string" == (j = L[A += 1]) ? t += " else if (" + k + " == 'number' || " + k + " == 'boolean') " + $ + " = '' + " + m + "; else if (" + m + " === null) " + $ + " = ''; " : "number" == j || "integer" == j ? (t += " else if (" + k + " == 'boolean' || " + m + " === null || (" + k + " == 'string' && " + m + " && " + m + " == +" + m + " ", "integer" == j && (t += " && !(" + m + " % 1)"), t += ")) " + $ + " = +" + m + "; ") : "boolean" == j ? t += " else if (" + m + " === 'false' || " + m + " === 0 || " + m + " === null) " + $ + " = false; else if (" + m + " === 'true' || " + m + " === 1) " + $ + " = true; " : "null" == j ? t += " else if (" + m + " === '' || " + m + " === 0 || " + m + " === false) " + $ + " = null; " : "array" == e.opts.coerceTypes && "array" == j && (t += " else if (" + k + " == 'string' || " + k + " == 'number' || " + k + " == 'boolean' || " + m + " == null) " + $ + " = [" + m + "]; ");
              t += " else {   ", (W = W || []).push(t), t = "", false !== e.createErrors ? (t += " { keyword: 'type' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(p) + " , params: { type: '", t += D ? "" + b.join(",") : "" + b, t += "' } ", false !== e.opts.messages && (t += " , message: 'should be ", t += D ? "" + b.join(",") : "" + b, t += "' "), e.opts.verbose && (t += " , schema: validate.schema" + u + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), t += " } ") : t += " {} ";
              y = t;
              t = W.pop(), !e.compositeRule && d ? e.async ? t += " throw new ValidationError([" + y + "]); " : t += " validate.errors = [" + y + "]; return false; " : t += " var err = " + y + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " } if (" + $ + " !== undefined) {  ";
              var U = f ? "data" + (f - 1 || "") : "parentData";
              t += " " + m + " = " + $ + "; ", f || (t += "if (" + U + " !== undefined)"), t += " " + U + "[" + (f ? e.dataPathArr[f] : "parentDataProperty") + "] = " + $ + "; } ";
            } else {
              (W = W || []).push(t), t = "", false !== e.createErrors ? (t += " { keyword: 'type' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(p) + " , params: { type: '", t += D ? "" + b.join(",") : "" + b, t += "' } ", false !== e.opts.messages && (t += " , message: 'should be ", t += D ? "" + b.join(",") : "" + b, t += "' "), e.opts.verbose && (t += " , schema: validate.schema" + u + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), t += " } ") : t += " {} ";
              y = t;
              t = W.pop(), !e.compositeRule && d ? e.async ? t += " throw new ValidationError([" + y + "]); " : t += " validate.errors = [" + y + "]; return false; " : t += " var err = " + y + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
            }
            t += " } ";
          }
        }
        if (e.schema.$ref && !o)
          t += " " + e.RULES.all.$ref.code(e, "$ref") + " ", d && (t += " } if (errors === ", t += g ? "0" : "errs_" + c, t += ") { ", P += "}");
        else {
          var x = e.RULES;
          if (x) {
            for (var _ = -1, N = x.length - 1; _ < N; )
              if (X(R = x[_ += 1])) {
                if (R.type && (t += " if (" + e.util.checkDataType(R.type, m, e.opts.strictNumbers) + ") { "), e.opts.useDefaults) {
                  if ("object" == R.type && e.schema.properties) {
                    h = e.schema.properties;
                    var V = Object.keys(h);
                    if (V)
                      for (var O, Q = -1, C = V.length - 1; Q < C; ) {
                        if (void 0 !== (H = h[O = V[Q += 1]]).default) {
                          var J = m + e.util.getProperty(O);
                          if (e.compositeRule) {
                            if (e.opts.strictDefaults) {
                              w = "default is ignored for: " + J;
                              if ("log" !== e.opts.strictDefaults)
                                throw new Error(w);
                              e.logger.warn(w);
                            }
                          } else
                            t += " if (" + J + " === undefined ", "empty" == e.opts.useDefaults && (t += " || " + J + " === null || " + J + " === '' "), t += " ) " + J + " = ", "shared" == e.opts.useDefaults ? t += " " + e.useDefault(H.default) + " " : t += " " + JSON.stringify(H.default) + " ", t += "; ";
                        }
                      }
                  } else if ("array" == R.type && Array.isArray(e.schema.items)) {
                    var K = e.schema.items;
                    if (K) {
                      A = -1;
                      for (var H, q = K.length - 1; A < q; )
                        if (void 0 !== (H = K[A += 1]).default) {
                          J = m + "[" + A + "]";
                          if (e.compositeRule) {
                            if (e.opts.strictDefaults) {
                              w = "default is ignored for: " + J;
                              if ("log" !== e.opts.strictDefaults)
                                throw new Error(w);
                              e.logger.warn(w);
                            }
                          } else
                            t += " if (" + J + " === undefined ", "empty" == e.opts.useDefaults && (t += " || " + J + " === null || " + J + " === '' "), t += " ) " + J + " = ", "shared" == e.opts.useDefaults ? t += " " + e.useDefault(H.default) + " " : t += " " + JSON.stringify(H.default) + " ", t += "; ";
                        }
                    }
                  }
                }
                var z = R.rules;
                if (z) {
                  for (var B, F = -1, G = z.length - 1; F < G; )
                    if (Y(B = z[F += 1])) {
                      var M = B.code(e, B.keyword, R.type);
                      M && (t += " " + M + " ", d && (E += "}"));
                    }
                }
                if (d && (t += " " + E + " ", E = ""), R.type && (t += " } ", b && b === R.type && !S)) {
                  t += " else { ";
                  var W;
                  u = e.schemaPath + ".type", p = e.errSchemaPath + "/type";
                  (W = W || []).push(t), t = "", false !== e.createErrors ? (t += " { keyword: 'type' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(p) + " , params: { type: '", t += D ? "" + b.join(",") : "" + b, t += "' } ", false !== e.opts.messages && (t += " , message: 'should be ", t += D ? "" + b.join(",") : "" + b, t += "' "), e.opts.verbose && (t += " , schema: validate.schema" + u + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), t += " } ") : t += " {} ";
                  y = t;
                  t = W.pop(), !e.compositeRule && d ? e.async ? t += " throw new ValidationError([" + y + "]); " : t += " validate.errors = [" + y + "]; return false; " : t += " var err = " + y + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " } ";
                }
                d && (t += " if (errors === ", t += g ? "0" : "errs_" + c, t += ") { ", P += "}");
              }
          }
        }
        function X(e2) {
          for (var r2 = e2.rules, a2 = 0; a2 < r2.length; a2++)
            if (Y(r2[a2]))
              return true;
        }
        function Y(r2) {
          return void 0 !== e.schema[r2.keyword] || r2.implements && function(r3) {
            for (var a2 = r3.implements, t2 = 0; t2 < a2.length; t2++)
              if (void 0 !== e.schema[a2[t2]])
                return true;
          }(r2);
        }
        return d && (t += " " + P + " "), g ? (s ? (t += " if (errors === 0) return data;           ", t += " else throw new ValidationError(vErrors); ") : (t += " validate.errors = vErrors; ", t += " return errors === 0;       "), t += " }; return validate;") : t += " var " + v + " = errors === errs_" + c + ";", t;
      };
    }, {}], "qdYs": [function(require2, module2, exports3) {
      "use strict";
      var e = require2("./resolve"), r = require2("./util"), t = require2("./error_classes"), i = require2("fast-json-stable-stringify"), o = require2("../dotjs/validate"), a = r.ucs2length, n = require2("fast-deep-equal"), s = t.Validation;
      function l(f2, g, y, w) {
        var R = this, V = this._opts, S = [void 0], _ = {}, b = [], E = {}, q = [], j = {}, x = [];
        g = g || { schema: f2, refVal: S, refs: _ };
        var $ = c.call(this, f2, g, w), k = this._compilations[$.index];
        if ($.compiling)
          return k.callValidate = function e2() {
            var r2 = k.validate;
            var t2 = r2.apply(this, arguments);
            e2.errors = r2.errors;
            return t2;
          };
        var C = this._formats, P = this.RULES;
        try {
          var I = U(f2, g, y, w);
          k.validate = I;
          var L = k.callValidate;
          return L && (L.schema = I.schema, L.errors = null, L.refs = I.refs, L.refVal = I.refVal, L.root = I.root, L.$async = I.$async, V.sourceCode && (L.source = I.source)), I;
        } finally {
          u.call(this, f2, g, w);
        }
        function U(i2, c2, u2, f3) {
          var y2 = !c2 || c2 && c2.schema == i2;
          if (c2.schema != g.schema)
            return l.call(R, i2, c2, u2, f3);
          var w2, E2 = true === i2.$async, j2 = o({ isTop: true, schema: i2, isRoot: y2, baseId: f3, root: c2, schemaPath: "", errSchemaPath: "#", errorPath: '""', MissingRefError: t.MissingRef, RULES: P, validate: o, util: r, resolve: e, resolveRef: M, usePattern: T, useDefault: D, useCustomRule: F, opts: V, formats: C, logger: R.logger, self: R });
          j2 = p(S, h) + p(b, d) + p(q, v) + p(x, m) + j2, V.processCode && (j2 = V.processCode(j2, i2));
          try {
            w2 = new Function("self", "RULES", "formats", "root", "refVal", "defaults", "customRules", "equal", "ucs2length", "ValidationError", j2)(R, P, C, g, S, q, x, n, a, s), S[0] = w2;
          } catch ($2) {
            throw R.logger.error("Error compiling schema, function code:", j2), $2;
          }
          return w2.schema = i2, w2.errors = null, w2.refs = _, w2.refVal = S, w2.root = y2 ? w2 : c2, E2 && (w2.$async = true), true === V.sourceCode && (w2.source = { code: j2, patterns: b, defaults: q }), w2;
        }
        function M(r2, t2, i2) {
          t2 = e.url(r2, t2);
          var o2, a2, n2 = _[t2];
          if (void 0 !== n2)
            return Q(o2 = S[n2], a2 = "refVal[" + n2 + "]");
          if (!i2 && g.refs) {
            var s2 = g.refs[t2];
            if (void 0 !== s2)
              return Q(o2 = g.refVal[s2], a2 = O(t2, o2));
          }
          a2 = O(t2);
          var c2 = e.call(R, U, g, t2);
          if (void 0 === c2) {
            var u2 = y && y[t2];
            u2 && (c2 = e.inlineRef(u2, V.inlineRefs) ? u2 : l.call(R, u2, g, y, r2));
          }
          if (void 0 !== c2)
            return function(e2, r3) {
              var t3 = _[e2];
              S[t3] = r3;
            }(t2, c2), Q(c2, a2);
          !function(e2) {
            delete _[e2];
          }(t2);
        }
        function O(e2, r2) {
          var t2 = S.length;
          return S[t2] = r2, _[e2] = t2, "refVal" + t2;
        }
        function Q(e2, r2) {
          return "object" == typeof e2 || "boolean" == typeof e2 ? { code: r2, schema: e2, inline: true } : { code: r2, $async: e2 && !!e2.$async };
        }
        function T(e2) {
          var r2 = E[e2];
          return void 0 === r2 && (r2 = E[e2] = b.length, b[r2] = e2), "pattern" + r2;
        }
        function D(e2) {
          switch (typeof e2) {
            case "boolean":
            case "number":
              return "" + e2;
            case "string":
              return r.toQuotedString(e2);
            case "object":
              if (null === e2)
                return "null";
              var t2 = i(e2), o2 = j[t2];
              return void 0 === o2 && (o2 = j[t2] = q.length, q[o2] = e2), "default" + o2;
          }
        }
        function F(e2, r2, t2, i2) {
          if (false !== R._opts.validateSchema) {
            var o2 = e2.definition.dependencies;
            if (o2 && !o2.every(function(e3) {
              return Object.prototype.hasOwnProperty.call(t2, e3);
            }))
              throw new Error("parent schema must have all required keywords: " + o2.join(","));
            var a2 = e2.definition.validateSchema;
            if (a2) {
              if (!a2(r2)) {
                var n2 = "keyword schema is invalid: " + R.errorsText(a2.errors);
                if ("log" != R._opts.validateSchema)
                  throw new Error(n2);
                R.logger.error(n2);
              }
            }
          }
          var s2, l2 = e2.definition.compile, c2 = e2.definition.inline, u2 = e2.definition.macro;
          if (l2)
            s2 = l2.call(R, r2, t2, i2);
          else if (u2)
            s2 = u2.call(R, r2, t2, i2), false !== V.validateSchema && R.validateSchema(s2, true);
          else if (c2)
            s2 = c2.call(R, i2, e2.keyword, r2, t2);
          else if (!(s2 = e2.definition.validate))
            return;
          if (void 0 === s2)
            throw new Error('custom keyword "' + e2.keyword + '"failed to compile');
          var f3 = x.length;
          return x[f3] = s2, { code: "customRule" + f3, validate: s2 };
        }
      }
      function c(e2, r2, t2) {
        var i2 = f.call(this, e2, r2, t2);
        return i2 >= 0 ? { index: i2, compiling: true } : (i2 = this._compilations.length, this._compilations[i2] = { schema: e2, root: r2, baseId: t2 }, { index: i2, compiling: false });
      }
      function u(e2, r2, t2) {
        var i2 = f.call(this, e2, r2, t2);
        i2 >= 0 && this._compilations.splice(i2, 1);
      }
      function f(e2, r2, t2) {
        for (var i2 = 0; i2 < this._compilations.length; i2++) {
          var o2 = this._compilations[i2];
          if (o2.schema == e2 && o2.root == r2 && o2.baseId == t2)
            return i2;
        }
        return -1;
      }
      function d(e2, t2) {
        return "var pattern" + e2 + " = new RegExp(" + r.toQuotedString(t2[e2]) + ");";
      }
      function v(e2) {
        return "var default" + e2 + " = defaults[" + e2 + "];";
      }
      function h(e2, r2) {
        return void 0 === r2[e2] ? "" : "var refVal" + e2 + " = refVal[" + e2 + "];";
      }
      function m(e2) {
        return "var customRule" + e2 + " = customRules[" + e2 + "];";
      }
      function p(e2, r2) {
        if (!e2.length)
          return "";
        for (var t2 = "", i2 = 0; i2 < e2.length; i2++)
          t2 += r2(i2, e2);
        return t2;
      }
      module2.exports = l;
    }, { "./resolve": "w10T", "./util": "Q1F7", "./error_classes": "OtNE", "fast-json-stable-stringify": "Xb3N", "../dotjs/validate": "yhC1", "fast-deep-equal": "dPQH" }], "fXCy": [function(require2, module2, exports3) {
      "use strict";
      var t = module2.exports = function() {
        this._cache = {};
      };
      t.prototype.put = function(t2, e) {
        this._cache[t2] = e;
      }, t.prototype.get = function(t2) {
        return this._cache[t2];
      }, t.prototype.del = function(t2) {
        delete this._cache[t2];
      }, t.prototype.clear = function() {
        this._cache = {};
      };
    }, {}], "dfAH": [function(require2, module2, exports3) {
      "use strict";
      var d = require2("./util"), a = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, u = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], F = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i, f = /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i, D = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i, t = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i, r = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i, e = /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-)*(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-)*(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i, i = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i, z = /^(?:\/(?:[^~/]|~0|~1)*)*$/, $ = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i, n = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;
      function s(a2) {
        return a2 = "full" == a2 ? "full" : "fast", d.copy(s[a2]);
      }
      function x(d2) {
        return d2 % 4 == 0 && (d2 % 100 != 0 || d2 % 400 == 0);
      }
      function _(d2) {
        var F2 = d2.match(a);
        if (!F2)
          return false;
        var f2 = +F2[1], D2 = +F2[2], t2 = +F2[3];
        return D2 >= 1 && D2 <= 12 && t2 >= 1 && t2 <= (2 == D2 && x(f2) ? 29 : u[D2]);
      }
      function o(d2, a2) {
        var u2 = d2.match(F);
        if (!u2)
          return false;
        var f2 = u2[1], D2 = u2[2], t2 = u2[3], r2 = u2[5];
        return (f2 <= 23 && D2 <= 59 && t2 <= 59 || 23 == f2 && 59 == D2 && 60 == t2) && (!a2 || r2);
      }
      module2.exports = s, s.fast = { date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/, time: /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, "date-time": /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i, "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i, "uri-template": r, url: e, email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i, hostname: f, ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/, ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i, regex: v, uuid: i, "json-pointer": z, "json-pointer-uri-fragment": $, "relative-json-pointer": n }, s.full = { date: _, time: o, "date-time": B, uri: l, "uri-reference": t, "uri-template": r, url: e, email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i, hostname: f, ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/, ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i, regex: v, uuid: i, "json-pointer": z, "json-pointer-uri-fragment": $, "relative-json-pointer": n };
      var E = /t|\s/i;
      function B(d2) {
        var a2 = d2.split(E);
        return 2 == a2.length && _(a2[0]) && o(a2[1], true);
      }
      var C = /\/|:/;
      function l(d2) {
        return C.test(d2) && D.test(d2);
      }
      var p = /[^\\]\\Z/;
      function v(d2) {
        if (p.test(d2))
          return false;
        try {
          return new RegExp(d2), true;
        } catch (a2) {
          return false;
        }
      }
    }, { "./util": "Q1F7" }], "a2na": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(r, e, a) {
        var s, t, o = " ", i = r.level, l = r.dataLevel, c = r.schema[e], n = r.errSchemaPath + "/" + e, h = !r.opts.allErrors, v = "data" + (l || ""), f = "valid" + i;
        if ("#" == c || "#/" == c)
          r.isRoot ? (s = r.async, t = "validate") : (s = true === r.root.schema.$async, t = "root.refVal[0]");
        else {
          var d = r.resolveRef(r.baseId, c, r.isRoot);
          if (void 0 === d) {
            var p = r.MissingRefError.message(r.baseId, c);
            if ("fail" == r.opts.missingRefs) {
              r.logger.error(p), (g = g || []).push(o), o = "", false !== r.createErrors ? (o += " { keyword: '$ref' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(n) + " , params: { ref: '" + r.util.escapeQuotes(c) + "' } ", false !== r.opts.messages && (o += " , message: 'can\\'t resolve reference " + r.util.escapeQuotes(c) + "' "), r.opts.verbose && (o += " , schema: " + r.util.toQuotedString(c) + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + v + " "), o += " } ") : o += " {} ";
              var m = o;
              o = g.pop(), !r.compositeRule && h ? r.async ? o += " throw new ValidationError([" + m + "]); " : o += " validate.errors = [" + m + "]; return false; " : o += " var err = " + m + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", h && (o += " if (false) { ");
            } else {
              if ("ignore" != r.opts.missingRefs)
                throw new r.MissingRefError(r.baseId, c, p);
              r.logger.warn(p), h && (o += " if (true) { ");
            }
          } else if (d.inline) {
            var u = r.util.copy(r);
            u.level++;
            var E = "valid" + u.level;
            u.schema = d.schema, u.schemaPath = "", u.errSchemaPath = c, o += " " + r.validate(u).replace(/validate\.schema/g, d.code) + " ", h && (o += " if (" + E + ") { ");
          } else
            s = true === d.$async || r.async && false !== d.$async, t = d.code;
        }
        if (t) {
          var g;
          (g = g || []).push(o), o = "", r.opts.passContext ? o += " " + t + ".call(this, " : o += " " + t + "( ", o += " " + v + ", (dataPath || '')", '""' != r.errorPath && (o += " + " + r.errorPath);
          var y = o += " , " + (l ? "data" + (l - 1 || "") : "parentData") + " , " + (l ? r.dataPathArr[l] : "parentDataProperty") + ", rootData)  ";
          if (o = g.pop(), s) {
            if (!r.async)
              throw new Error("async schema referenced by sync schema");
            h && (o += " var " + f + "; "), o += " try { await " + y + "; ", h && (o += " " + f + " = true; "), o += " } catch (e) { if (!(e instanceof ValidationError)) throw e; if (vErrors === null) vErrors = e.errors; else vErrors = vErrors.concat(e.errors); errors = vErrors.length; ", h && (o += " " + f + " = false; "), o += " } ", h && (o += " if (" + f + ") { ");
          } else
            o += " if (!" + y + ") { if (vErrors === null) vErrors = " + t + ".errors; else vErrors = vErrors.concat(" + t + ".errors); errors = vErrors.length; } ", h && (o += " else { ");
        }
        return o;
      };
    }, {}], "hRgn": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, t, a) {
        var r = " ", s = e.schema[t], l = e.schemaPath + e.util.getProperty(t), c = e.errSchemaPath + "/" + t, h = !e.opts.allErrors, i = e.util.copy(e), o = "";
        i.level++;
        var u = "valid" + i.level, m = i.baseId, v = true, d = s;
        if (d)
          for (var f, p = -1, n = d.length - 1; p < n; )
            f = d[p += 1], (e.opts.strictKeywords ? "object" == typeof f && Object.keys(f).length > 0 || false === f : e.util.schemaHasRules(f, e.RULES.all)) && (v = false, i.schema = f, i.schemaPath = l + "[" + p + "]", i.errSchemaPath = c + "/" + p, r += "  " + e.validate(i) + " ", i.baseId = m, h && (r += " if (" + u + ") { ", o += "}"));
        return h && (r += v ? " if (true) { " : " " + o.slice(0, -1) + " "), r;
      };
    }, {}], "lo6J": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, r, a) {
        var s = " ", t = e.level, o = e.dataLevel, l = e.schema[r], i = e.schemaPath + e.util.getProperty(r), c = e.errSchemaPath + "/" + r, h = !e.opts.allErrors, v = "data" + (o || ""), m = "valid" + t, u = "errs__" + t, n = e.util.copy(e), d = "";
        n.level++;
        var p = "valid" + n.level;
        if (l.every(function(r2) {
          return e.opts.strictKeywords ? "object" == typeof r2 && Object.keys(r2).length > 0 || false === r2 : e.util.schemaHasRules(r2, e.RULES.all);
        })) {
          var f = n.baseId;
          s += " var " + u + " = errors; var " + m + " = false;  ";
          var E = e.compositeRule;
          e.compositeRule = n.compositeRule = true;
          var y = l;
          if (y)
            for (var P, R = -1, g = y.length - 1; R < g; )
              P = y[R += 1], n.schema = P, n.schemaPath = i + "[" + R + "]", n.errSchemaPath = c + "/" + R, s += "  " + e.validate(n) + " ", n.baseId = f, s += " " + m + " = " + m + " || " + p + "; if (!" + m + ") { ", d += "}";
          e.compositeRule = n.compositeRule = E, s += " " + d + " if (!" + m + ") {   var err =   ", false !== e.createErrors ? (s += " { keyword: 'anyOf' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(c) + " , params: {} ", false !== e.opts.messages && (s += " , message: 'should match some schema in anyOf' "), e.opts.verbose && (s += " , schema: validate.schema" + i + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + v + " "), s += " } ") : s += " {} ", s += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !e.compositeRule && h && (e.async ? s += " throw new ValidationError(vErrors); " : s += " validate.errors = vErrors; return false; "), s += " } else {  errors = " + u + "; if (vErrors !== null) { if (" + u + ") vErrors.length = " + u + "; else vErrors = null; } ", e.opts.allErrors && (s += " } ");
        } else
          h && (s += " if (true) { ");
        return s;
      };
    }, {}], "Kkzr": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(t, o, e) {
        var r = " ", s = t.schema[o], n = t.errSchemaPath + "/" + o, c = (t.opts.allErrors, t.util.toQuotedString(s));
        return true === t.opts.$comment ? r += " console.log(" + c + ");" : "function" == typeof t.opts.$comment && (r += " self._opts.$comment(" + c + ", " + t.util.toQuotedString(n) + ", validate.root.schema);"), r;
      };
    }, {}], "U4sD": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(a, e, r) {
        var t = " ", s = a.level, o = a.dataLevel, l = a.schema[e], h = a.schemaPath + a.util.getProperty(e), c = a.errSchemaPath + "/" + e, d = !a.opts.allErrors, m = "data" + (o || ""), v = "valid" + s, u = a.opts.$data && l && l.$data;
        u && (t += " var schema" + s + " = " + a.util.getData(l.$data, o, a.dataPathArr) + "; "), u || (t += " var schema" + s + " = validate.schema" + h + ";"), t += "var " + v + " = equal(" + m + ", schema" + s + "); if (!" + v + ") {   ";
        var i = i || [];
        i.push(t), t = "", false !== a.createErrors ? (t += " { keyword: 'const' , dataPath: (dataPath || '') + " + a.errorPath + " , schemaPath: " + a.util.toQuotedString(c) + " , params: { allowedValue: schema" + s + " } ", false !== a.opts.messages && (t += " , message: 'should be equal to constant' "), a.opts.verbose && (t += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + a.schemaPath + " , data: " + m + " "), t += " } ") : t += " {} ";
        var n = t;
        return t = i.pop(), !a.compositeRule && d ? a.async ? t += " throw new ValidationError([" + n + "]); " : t += " validate.errors = [" + n + "]; return false; " : t += " var err = " + n + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " }", d && (t += " else { "), t;
      };
    }, {}], "EypH": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, r, a) {
        var t = " ", s = e.level, l = e.dataLevel, o = e.schema[r], i = e.schemaPath + e.util.getProperty(r), v = e.errSchemaPath + "/" + r, h = !e.opts.allErrors, c = "data" + (l || ""), u = "valid" + s, d = "errs__" + s, m = e.util.copy(e);
        m.level++;
        var p = "valid" + m.level, n = "i" + s, P = m.dataLevel = e.dataLevel + 1, f = "data" + P, E = e.baseId, g = e.opts.strictKeywords ? "object" == typeof o && Object.keys(o).length > 0 || false === o : e.util.schemaHasRules(o, e.RULES.all);
        if (t += "var " + d + " = errors;var " + u + ";", g) {
          var R = e.compositeRule;
          e.compositeRule = m.compositeRule = true, m.schema = o, m.schemaPath = i, m.errSchemaPath = v, t += " var " + p + " = false; for (var " + n + " = 0; " + n + " < " + c + ".length; " + n + "++) { ", m.errorPath = e.util.getPathExpr(e.errorPath, n, e.opts.jsonPointers, true);
          var y = c + "[" + n + "]";
          m.dataPathArr[P] = n;
          var b = e.validate(m);
          m.baseId = E, e.util.varOccurences(b, f) < 2 ? t += " " + e.util.varReplace(b, f, y) + " " : t += " var " + f + " = " + y + "; " + b + " ", t += " if (" + p + ") break; }  ", e.compositeRule = m.compositeRule = R, t += "  if (!" + p + ") {";
        } else
          t += " if (" + c + ".length == 0) {";
        var S = S || [];
        S.push(t), t = "", false !== e.createErrors ? (t += " { keyword: 'contains' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(v) + " , params: {} ", false !== e.opts.messages && (t += " , message: 'should contain a valid item' "), e.opts.verbose && (t += " , schema: validate.schema" + i + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + c + " "), t += " } ") : t += " {} ";
        var w = t;
        return t = S.pop(), !e.compositeRule && h ? e.async ? t += " throw new ValidationError([" + w + "]); " : t += " validate.errors = [" + w + "]; return false; " : t += " var err = " + w + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " } else { ", g && (t += "  errors = " + d + "; if (vErrors !== null) { if (" + d + ") vErrors.length = " + d + "; else vErrors = null; } "), e.opts.allErrors && (t += " } "), t;
      };
    }, {}], "Cpp7": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, r, t) {
        var a = " ", s = e.level, o = e.dataLevel, p = e.schema[r], i = e.schemaPath + e.util.getProperty(r), l = e.errSchemaPath + "/" + r, u = !e.opts.allErrors, n = "data" + (o || ""), h = "errs__" + s, c = e.util.copy(e), d = "";
        c.level++;
        var v = "valid" + c.level, P = {}, m = {}, y = e.opts.ownProperties;
        for (j in p)
          if ("__proto__" != j) {
            var g = p[j], f = Array.isArray(g) ? m : P;
            f[j] = g;
          }
        a += "var " + h + " = errors;";
        var Q = e.errorPath;
        for (var j in a += "var missing" + s + ";", m)
          if ((f = m[j]).length) {
            if (a += " if ( " + n + e.util.getProperty(j) + " !== undefined ", y && (a += " && Object.prototype.hasOwnProperty.call(" + n + ", '" + e.util.escapeQuotes(j) + "') "), u) {
              a += " && ( ";
              var w = f;
              if (w)
                for (var E = -1, b = w.length - 1; E < b; ) {
                  x = w[E += 1], E && (a += " || "), a += " ( ( " + (I = n + (D = e.util.getProperty(x))) + " === undefined ", y && (a += " || ! Object.prototype.hasOwnProperty.call(" + n + ", '" + e.util.escapeQuotes(x) + "') "), a += ") && (missing" + s + " = " + e.util.toQuotedString(e.opts.jsonPointers ? x : D) + ") ) ";
                }
              a += ")) {  ";
              var O = "missing" + s, S = "' + " + O + " + '";
              e.opts._errorDataPathProperty && (e.errorPath = e.opts.jsonPointers ? e.util.getPathExpr(Q, O, true) : Q + " + " + O);
              var _ = _ || [];
              _.push(a), a = "", false !== e.createErrors ? (a += " { keyword: 'dependencies' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(l) + " , params: { property: '" + e.util.escapeQuotes(j) + "', missingProperty: '" + S + "', depsCount: " + f.length + ", deps: '" + e.util.escapeQuotes(1 == f.length ? f[0] : f.join(", ")) + "' } ", false !== e.opts.messages && (a += " , message: 'should have ", 1 == f.length ? a += "property " + e.util.escapeQuotes(f[0]) : a += "properties " + e.util.escapeQuotes(f.join(", ")), a += " when property " + e.util.escapeQuotes(j) + " is present' "), e.opts.verbose && (a += " , schema: validate.schema" + i + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + n + " "), a += " } ") : a += " {} ";
              var k = a;
              a = _.pop(), !e.compositeRule && u ? e.async ? a += " throw new ValidationError([" + k + "]); " : a += " validate.errors = [" + k + "]; return false; " : a += " var err = " + k + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
            } else {
              a += " ) { ";
              var R = f;
              if (R)
                for (var x, A = -1, C = R.length - 1; A < C; ) {
                  x = R[A += 1];
                  var D = e.util.getProperty(x), I = (S = e.util.escapeQuotes(x), n + D);
                  e.opts._errorDataPathProperty && (e.errorPath = e.util.getPath(Q, x, e.opts.jsonPointers)), a += " if ( " + I + " === undefined ", y && (a += " || ! Object.prototype.hasOwnProperty.call(" + n + ", '" + e.util.escapeQuotes(x) + "') "), a += ") {  var err =   ", false !== e.createErrors ? (a += " { keyword: 'dependencies' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(l) + " , params: { property: '" + e.util.escapeQuotes(j) + "', missingProperty: '" + S + "', depsCount: " + f.length + ", deps: '" + e.util.escapeQuotes(1 == f.length ? f[0] : f.join(", ")) + "' } ", false !== e.opts.messages && (a += " , message: 'should have ", 1 == f.length ? a += "property " + e.util.escapeQuotes(f[0]) : a += "properties " + e.util.escapeQuotes(f.join(", ")), a += " when property " + e.util.escapeQuotes(j) + " is present' "), e.opts.verbose && (a += " , schema: validate.schema" + i + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + n + " "), a += " } ") : a += " {} ", a += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ";
                }
            }
            a += " }   ", u && (d += "}", a += " else { ");
          }
        e.errorPath = Q;
        var L = c.baseId;
        for (var j in P) {
          g = P[j];
          (e.opts.strictKeywords ? "object" == typeof g && Object.keys(g).length > 0 || false === g : e.util.schemaHasRules(g, e.RULES.all)) && (a += " " + v + " = true; if ( " + n + e.util.getProperty(j) + " !== undefined ", y && (a += " && Object.prototype.hasOwnProperty.call(" + n + ", '" + e.util.escapeQuotes(j) + "') "), a += ") { ", c.schema = g, c.schemaPath = i + e.util.getProperty(j), c.errSchemaPath = l + "/" + e.util.escapeFragment(j), a += "  " + e.validate(c) + " ", c.baseId = L, a += " }  ", u && (a += " if (" + v + ") { ", d += "}"));
        }
        return u && (a += "   " + d + " if (" + h + " == errors) {"), a;
      };
    }, {}], "fqDY": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(a, e, r) {
        var t = " ", s = a.level, l = a.dataLevel, o = a.schema[e], h = a.schemaPath + a.util.getProperty(e), d = a.errSchemaPath + "/" + e, i = !a.opts.allErrors, u = "data" + (l || ""), m = "valid" + s, v = a.opts.$data && o && o.$data;
        v && (t += " var schema" + s + " = " + a.util.getData(o.$data, l, a.dataPathArr) + "; ");
        var c = "i" + s, n = "schema" + s;
        v || (t += " var " + n + " = validate.schema" + h + ";"), t += "var " + m + ";", v && (t += " if (schema" + s + " === undefined) " + m + " = true; else if (!Array.isArray(schema" + s + ")) " + m + " = false; else {"), t += m + " = false;for (var " + c + "=0; " + c + "<" + n + ".length; " + c + "++) if (equal(" + u + ", " + n + "[" + c + "])) { " + m + " = true; break; }", v && (t += "  }  "), t += " if (!" + m + ") {   ";
        var p = p || [];
        p.push(t), t = "", false !== a.createErrors ? (t += " { keyword: 'enum' , dataPath: (dataPath || '') + " + a.errorPath + " , schemaPath: " + a.util.toQuotedString(d) + " , params: { allowedValues: schema" + s + " } ", false !== a.opts.messages && (t += " , message: 'should be equal to one of the allowed values' "), a.opts.verbose && (t += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + a.schemaPath + " , data: " + u + " "), t += " } ") : t += " {} ";
        var f = t;
        return t = p.pop(), !a.compositeRule && i ? a.async ? t += " throw new ValidationError([" + f + "]); " : t += " validate.errors = [" + f + "]; return false; " : t += " var err = " + f + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " }", i && (t += " else { "), t;
      };
    }, {}], "avoW": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(a, t, r) {
        var e = " ", o = a.level, s = a.dataLevel, i = a.schema[t], n = a.schemaPath + a.util.getProperty(t), f = a.errSchemaPath + "/" + t, c = !a.opts.allErrors, u = "data" + (s || "");
        if (false === a.opts.format)
          return c && (e += " if (true) { "), e;
        var m, h = a.opts.$data && i && i.$data;
        h ? (e += " var schema" + o + " = " + a.util.getData(i.$data, s, a.dataPathArr) + "; ", m = "schema" + o) : m = i;
        var l = a.opts.unknownFormats, d = Array.isArray(l);
        if (h) {
          e += " var " + (p = "format" + o) + " = formats[" + m + "]; var " + (v = "isObject" + o) + " = typeof " + p + " == 'object' && !(" + p + " instanceof RegExp) && " + p + ".validate; var " + (y = "formatType" + o) + " = " + v + " && " + p + ".type || 'string'; if (" + v + ") { ", a.async && (e += " var async" + o + " = " + p + ".async; "), e += " " + p + " = " + p + ".validate; } if (  ", h && (e += " (" + m + " !== undefined && typeof " + m + " != 'string') || "), e += " (", "ignore" != l && (e += " (" + m + " && !" + p + " ", d && (e += " && self._opts.unknownFormats.indexOf(" + m + ") == -1 "), e += ") || "), e += " (" + p + " && " + y + " == '" + r + "' && !(typeof " + p + " == 'function' ? ", a.async ? e += " (async" + o + " ? await " + p + "(" + u + ") : " + p + "(" + u + ")) " : e += " " + p + "(" + u + ") ", e += " : " + p + ".test(" + u + "))))) {";
        } else {
          var p;
          if (!(p = a.formats[i])) {
            if ("ignore" == l)
              return a.logger.warn('unknown format "' + i + '" ignored in schema at path "' + a.errSchemaPath + '"'), c && (e += " if (true) { "), e;
            if (d && l.indexOf(i) >= 0)
              return c && (e += " if (true) { "), e;
            throw new Error('unknown format "' + i + '" is used in schema at path "' + a.errSchemaPath + '"');
          }
          var v, y = (v = "object" == typeof p && !(p instanceof RegExp) && p.validate) && p.type || "string";
          if (v) {
            var g = true === p.async;
            p = p.validate;
          }
          if (y != r)
            return c && (e += " if (true) { "), e;
          if (g) {
            if (!a.async)
              throw new Error("async format in sync schema");
            e += " if (!(await " + (w = "formats" + a.util.getProperty(i) + ".validate") + "(" + u + "))) { ";
          } else {
            e += " if (! ";
            var w = "formats" + a.util.getProperty(i);
            v && (w += ".validate"), e += "function" == typeof p ? " " + w + "(" + u + ") " : " " + w + ".test(" + u + ") ", e += ") { ";
          }
        }
        var P = P || [];
        P.push(e), e = "", false !== a.createErrors ? (e += " { keyword: 'format' , dataPath: (dataPath || '') + " + a.errorPath + " , schemaPath: " + a.util.toQuotedString(f) + " , params: { format:  ", e += h ? "" + m : "" + a.util.toQuotedString(i), e += "  } ", false !== a.opts.messages && (e += ` , message: 'should match format "`, e += h ? "' + " + m + " + '" : "" + a.util.escapeQuotes(i), e += `"' `), a.opts.verbose && (e += " , schema:  ", e += h ? "validate.schema" + n : "" + a.util.toQuotedString(i), e += "         , parentSchema: validate.schema" + a.schemaPath + " , data: " + u + " "), e += " } ") : e += " {} ";
        var E = e;
        return e = P.pop(), !a.compositeRule && c ? a.async ? e += " throw new ValidationError([" + E + "]); " : e += " validate.errors = [" + E + "]; return false; " : e += " var err = " + E + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", e += " } ", c && (e += " else { "), e;
      };
    }, {}], "JHQ3": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, r, a) {
        var s = " ", t = e.level, l = e.dataLevel, h = e.schema[r], o = e.schemaPath + e.util.getProperty(r), c = e.errSchemaPath + "/" + r, i = !e.opts.allErrors, m = "data" + (l || ""), v = "valid" + t, u = "errs__" + t, d = e.util.copy(e);
        d.level++;
        var n = "valid" + d.level, p = e.schema.then, P = e.schema.else, f = void 0 !== p && (e.opts.strictKeywords ? "object" == typeof p && Object.keys(p).length > 0 || false === p : e.util.schemaHasRules(p, e.RULES.all)), E = void 0 !== P && (e.opts.strictKeywords ? "object" == typeof P && Object.keys(P).length > 0 || false === P : e.util.schemaHasRules(P, e.RULES.all)), y = d.baseId;
        if (f || E) {
          var R;
          d.createErrors = false, d.schema = h, d.schemaPath = o, d.errSchemaPath = c, s += " var " + u + " = errors; var " + v + " = true;  ";
          var S = e.compositeRule;
          e.compositeRule = d.compositeRule = true, s += "  " + e.validate(d) + " ", d.baseId = y, d.createErrors = true, s += "  errors = " + u + "; if (vErrors !== null) { if (" + u + ") vErrors.length = " + u + "; else vErrors = null; }  ", e.compositeRule = d.compositeRule = S, f ? (s += " if (" + n + ") {  ", d.schema = e.schema.then, d.schemaPath = e.schemaPath + ".then", d.errSchemaPath = e.errSchemaPath + "/then", s += "  " + e.validate(d) + " ", d.baseId = y, s += " " + v + " = " + n + "; ", f && E ? s += " var " + (R = "ifClause" + t) + " = 'then'; " : R = "'then'", s += " } ", E && (s += " else { ")) : s += " if (!" + n + ") { ", E && (d.schema = e.schema.else, d.schemaPath = e.schemaPath + ".else", d.errSchemaPath = e.errSchemaPath + "/else", s += "  " + e.validate(d) + " ", d.baseId = y, s += " " + v + " = " + n + "; ", f && E ? s += " var " + (R = "ifClause" + t) + " = 'else'; " : R = "'else'", s += " } "), s += " if (!" + v + ") {   var err =   ", false !== e.createErrors ? (s += " { keyword: 'if' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(c) + " , params: { failingKeyword: " + R + " } ", false !== e.opts.messages && (s += ` , message: 'should match "' + ` + R + ` + '" schema' `), e.opts.verbose && (s += " , schema: validate.schema" + o + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), s += " } ") : s += " {} ", s += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !e.compositeRule && i && (e.async ? s += " throw new ValidationError(vErrors); " : s += " validate.errors = vErrors; return false; "), s += " }   ", i && (s += " else { ");
        } else
          i && (s += " if (true) { ");
        return s;
      };
    }, {}], "aiPb": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, a, r) {
        var t = " ", s = e.level, l = e.dataLevel, h = e.schema[a], o = e.schemaPath + e.util.getProperty(a), i = e.errSchemaPath + "/" + a, c = !e.opts.allErrors, v = "data" + (l || ""), d = "valid" + s, n = "errs__" + s, m = e.util.copy(e), u = "";
        m.level++;
        var P = "valid" + m.level, p = "i" + s, f = m.dataLevel = e.dataLevel + 1, g = "data" + f, y = e.baseId;
        if (t += "var " + n + " = errors;var " + d + ";", Array.isArray(h)) {
          var b = e.schema.additionalItems;
          if (false === b) {
            t += " " + d + " = " + v + ".length <= " + h.length + "; ";
            var E = i;
            i = e.errSchemaPath + "/additionalItems", t += "  if (!" + d + ") {   ";
            var S = S || [];
            S.push(t), t = "", false !== e.createErrors ? (t += " { keyword: 'additionalItems' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(i) + " , params: { limit: " + h.length + " } ", false !== e.opts.messages && (t += " , message: 'should NOT have more than " + h.length + " items' "), e.opts.verbose && (t += " , schema: false , parentSchema: validate.schema" + e.schemaPath + " , data: " + v + " "), t += " } ") : t += " {} ";
            var j = t;
            t = S.pop(), !e.compositeRule && c ? e.async ? t += " throw new ValidationError([" + j + "]); " : t += " validate.errors = [" + j + "]; return false; " : t += " var err = " + j + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " } ", i = E, c && (u += "}", t += " else { ");
          }
          var R = h;
          if (R) {
            for (var I, O = -1, k = R.length - 1; O < k; )
              if (I = R[O += 1], e.opts.strictKeywords ? "object" == typeof I && Object.keys(I).length > 0 || false === I : e.util.schemaHasRules(I, e.RULES.all)) {
                t += " " + P + " = true; if (" + v + ".length > " + O + ") { ";
                var w = v + "[" + O + "]";
                m.schema = I, m.schemaPath = o + "[" + O + "]", m.errSchemaPath = i + "/" + O, m.errorPath = e.util.getPathExpr(e.errorPath, O, e.opts.jsonPointers, true), m.dataPathArr[f] = O;
                var L = e.validate(m);
                m.baseId = y, e.util.varOccurences(L, g) < 2 ? t += " " + e.util.varReplace(L, g, w) + " " : t += " var " + g + " = " + w + "; " + L + " ", t += " }  ", c && (t += " if (" + P + ") { ", u += "}");
              }
          }
          if ("object" == typeof b && (e.opts.strictKeywords ? "object" == typeof b && Object.keys(b).length > 0 || false === b : e.util.schemaHasRules(b, e.RULES.all))) {
            m.schema = b, m.schemaPath = e.schemaPath + ".additionalItems", m.errSchemaPath = e.errSchemaPath + "/additionalItems", t += " " + P + " = true; if (" + v + ".length > " + h.length + ") {  for (var " + p + " = " + h.length + "; " + p + " < " + v + ".length; " + p + "++) { ", m.errorPath = e.util.getPathExpr(e.errorPath, p, e.opts.jsonPointers, true);
            w = v + "[" + p + "]";
            m.dataPathArr[f] = p;
            L = e.validate(m);
            m.baseId = y, e.util.varOccurences(L, g) < 2 ? t += " " + e.util.varReplace(L, g, w) + " " : t += " var " + g + " = " + w + "; " + L + " ", c && (t += " if (!" + P + ") break; "), t += " } }  ", c && (t += " if (" + P + ") { ", u += "}");
          }
        } else if (e.opts.strictKeywords ? "object" == typeof h && Object.keys(h).length > 0 || false === h : e.util.schemaHasRules(h, e.RULES.all)) {
          m.schema = h, m.schemaPath = o, m.errSchemaPath = i, t += "  for (var " + p + " = 0; " + p + " < " + v + ".length; " + p + "++) { ", m.errorPath = e.util.getPathExpr(e.errorPath, p, e.opts.jsonPointers, true);
          w = v + "[" + p + "]";
          m.dataPathArr[f] = p;
          L = e.validate(m);
          m.baseId = y, e.util.varOccurences(L, g) < 2 ? t += " " + e.util.varReplace(L, g, w) + " " : t += " var " + g + " = " + w + "; " + L + " ", c && (t += " if (!" + P + ") break; "), t += " }";
        }
        return c && (t += " " + u + " if (" + n + " == errors) {"), t;
      };
    }, {}], "UJAl": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, r, a) {
        var t, s = " ", o = e.level, i = e.dataLevel, m = e.schema[r], h = e.schemaPath + e.util.getProperty(r), u = e.errSchemaPath + "/" + r, l = !e.opts.allErrors, d = "data" + (i || ""), n = e.opts.$data && m && m.$data;
        n ? (s += " var schema" + o + " = " + e.util.getData(m.$data, i, e.dataPathArr) + "; ", t = "schema" + o) : t = m;
        var c = "maximum" == r, v = c ? "exclusiveMaximum" : "exclusiveMinimum", p = e.schema[v], f = e.opts.$data && p && p.$data, b = c ? "<" : ">", P = c ? ">" : "<", E = void 0;
        if (!n && "number" != typeof m && void 0 !== m)
          throw new Error(r + " must be number");
        if (!f && void 0 !== p && "number" != typeof p && "boolean" != typeof p)
          throw new Error(v + " must be number or boolean");
        if (f) {
          var y = e.util.getData(p.$data, i, e.dataPathArr), x = "exclusive" + o, w = "exclType" + o, g = "exclIsNumber" + o, S = "' + " + (k = "op" + o) + " + '";
          s += " var schemaExcl" + o + " = " + y + "; ", s += " var " + x + "; var " + w + " = typeof " + (y = "schemaExcl" + o) + "; if (" + w + " != 'boolean' && " + w + " != 'undefined' && " + w + " != 'number') { ";
          var $;
          E = v;
          ($ = $ || []).push(s), s = "", false !== e.createErrors ? (s += " { keyword: '" + (E || "_exclusiveLimit") + "' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(u) + " , params: {} ", false !== e.opts.messages && (s += " , message: '" + v + " should be boolean' "), e.opts.verbose && (s += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + d + " "), s += " } ") : s += " {} ";
          var M = s;
          s = $.pop(), !e.compositeRule && l ? e.async ? s += " throw new ValidationError([" + M + "]); " : s += " validate.errors = [" + M + "]; return false; " : s += " var err = " + M + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += " } else if ( ", n && (s += " (" + t + " !== undefined && typeof " + t + " != 'number') || "), s += " " + w + " == 'number' ? ( (" + x + " = " + t + " === undefined || " + y + " " + b + "= " + t + ") ? " + d + " " + P + "= " + y + " : " + d + " " + P + " " + t + " ) : ( (" + x + " = " + y + " === true) ? " + d + " " + P + "= " + t + " : " + d + " " + P + " " + t + " ) || " + d + " !== " + d + ") { var op" + o + " = " + x + " ? '" + b + "' : '" + b + "='; ", void 0 === m && (E = v, u = e.errSchemaPath + "/" + v, t = y, n = f);
        } else {
          S = b;
          if ((g = "number" == typeof p) && n) {
            var k = "'" + S + "'";
            s += " if ( ", n && (s += " (" + t + " !== undefined && typeof " + t + " != 'number') || "), s += " ( " + t + " === undefined || " + p + " " + b + "= " + t + " ? " + d + " " + P + "= " + p + " : " + d + " " + P + " " + t + " ) || " + d + " !== " + d + ") { ";
          } else {
            g && void 0 === m ? (x = true, E = v, u = e.errSchemaPath + "/" + v, t = p, P += "=") : (g && (t = Math[c ? "min" : "max"](p, m)), p === (!g || t) ? (x = true, E = v, u = e.errSchemaPath + "/" + v, P += "=") : (x = false, S += "="));
            k = "'" + S + "'";
            s += " if ( ", n && (s += " (" + t + " !== undefined && typeof " + t + " != 'number') || "), s += " " + d + " " + P + " " + t + " || " + d + " !== " + d + ") { ";
          }
        }
        E = E || r, ($ = $ || []).push(s), s = "", false !== e.createErrors ? (s += " { keyword: '" + (E || "_limit") + "' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(u) + " , params: { comparison: " + k + ", limit: " + t + ", exclusive: " + x + " } ", false !== e.opts.messages && (s += " , message: 'should be " + S + " ", s += n ? "' + " + t : t + "'"), e.opts.verbose && (s += " , schema:  ", s += n ? "validate.schema" + h : "" + m, s += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + d + " "), s += " } ") : s += " {} ";
        M = s;
        return s = $.pop(), !e.compositeRule && l ? e.async ? s += " throw new ValidationError([" + M + "]); " : s += " validate.errors = [" + M + "]; return false; " : s += " var err = " + M + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += " } ", l && (s += " else { "), s;
      };
    }, {}], "W8ih": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, r, a) {
        var t, s = " ", o = e.level, m = e.dataLevel, h = e.schema[r], l = e.schemaPath + e.util.getProperty(r), i = e.errSchemaPath + "/" + r, d = !e.opts.allErrors, u = "data" + (m || ""), n = e.opts.$data && h && h.$data;
        if (n ? (s += " var schema" + o + " = " + e.util.getData(h.$data, m, e.dataPathArr) + "; ", t = "schema" + o) : t = h, !n && "number" != typeof h)
          throw new Error(r + " must be number");
        s += "if ( ", n && (s += " (" + t + " !== undefined && typeof " + t + " != 'number') || "), s += " " + u + ".length " + ("maxItems" == r ? ">" : "<") + " " + t + ") { ";
        var c = r, p = p || [];
        p.push(s), s = "", false !== e.createErrors ? (s += " { keyword: '" + (c || "_limitItems") + "' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(i) + " , params: { limit: " + t + " } ", false !== e.opts.messages && (s += " , message: 'should NOT have ", s += "maxItems" == r ? "more" : "fewer", s += " than ", s += n ? "' + " + t + " + '" : "" + h, s += " items' "), e.opts.verbose && (s += " , schema:  ", s += n ? "validate.schema" + l : "" + h, s += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + u + " "), s += " } ") : s += " {} ";
        var v = s;
        return s = p.pop(), !e.compositeRule && d ? e.async ? s += " throw new ValidationError([" + v + "]); " : s += " validate.errors = [" + v + "]; return false; " : s += " var err = " + v + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += "} ", d && (s += " else { "), s;
      };
    }, {}], "fZGX": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, r, a) {
        var t, s = " ", o = e.level, h = e.dataLevel, l = e.schema[r], m = e.schemaPath + e.util.getProperty(r), n = e.errSchemaPath + "/" + r, i = !e.opts.allErrors, u = "data" + (h || ""), c = e.opts.$data && l && l.$data;
        if (c ? (s += " var schema" + o + " = " + e.util.getData(l.$data, h, e.dataPathArr) + "; ", t = "schema" + o) : t = l, !c && "number" != typeof l)
          throw new Error(r + " must be number");
        var d = "maxLength" == r ? ">" : "<";
        s += "if ( ", c && (s += " (" + t + " !== undefined && typeof " + t + " != 'number') || "), false === e.opts.unicode ? s += " " + u + ".length " : s += " ucs2length(" + u + ") ", s += " " + d + " " + t + ") { ";
        var p = r, v = v || [];
        v.push(s), s = "", false !== e.createErrors ? (s += " { keyword: '" + (p || "_limitLength") + "' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(n) + " , params: { limit: " + t + " } ", false !== e.opts.messages && (s += " , message: 'should NOT be ", s += "maxLength" == r ? "longer" : "shorter", s += " than ", s += c ? "' + " + t + " + '" : "" + l, s += " characters' "), e.opts.verbose && (s += " , schema:  ", s += c ? "validate.schema" + m : "" + l, s += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + u + " "), s += " } ") : s += " {} ";
        var g = s;
        return s = v.pop(), !e.compositeRule && i ? e.async ? s += " throw new ValidationError([" + g + "]); " : s += " validate.errors = [" + g + "]; return false; " : s += " var err = " + g + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += "} ", i && (s += " else { "), s;
      };
    }, {}], "JAEr": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, r, a) {
        var t, s = " ", o = e.level, h = e.dataLevel, m = e.schema[r], i = e.schemaPath + e.util.getProperty(r), l = e.errSchemaPath + "/" + r, p = !e.opts.allErrors, d = "data" + (h || ""), u = e.opts.$data && m && m.$data;
        if (u ? (s += " var schema" + o + " = " + e.util.getData(m.$data, h, e.dataPathArr) + "; ", t = "schema" + o) : t = m, !u && "number" != typeof m)
          throw new Error(r + " must be number");
        s += "if ( ", u && (s += " (" + t + " !== undefined && typeof " + t + " != 'number') || "), s += " Object.keys(" + d + ").length " + ("maxProperties" == r ? ">" : "<") + " " + t + ") { ";
        var n = r, c = c || [];
        c.push(s), s = "", false !== e.createErrors ? (s += " { keyword: '" + (n || "_limitProperties") + "' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(l) + " , params: { limit: " + t + " } ", false !== e.opts.messages && (s += " , message: 'should NOT have ", s += "maxProperties" == r ? "more" : "fewer", s += " than ", s += u ? "' + " + t + " + '" : "" + m, s += " properties' "), e.opts.verbose && (s += " , schema:  ", s += u ? "validate.schema" + i : "" + m, s += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + d + " "), s += " } ") : s += " {} ";
        var v = s;
        return s = c.pop(), !e.compositeRule && p ? e.async ? s += " throw new ValidationError([" + v + "]); " : s += " validate.errors = [" + v + "]; return false; " : s += " var err = " + v + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += "} ", p && (s += " else { "), s;
      };
    }, {}], "oNPH": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, r, a) {
        var t, s = " ", i = e.level, o = e.dataLevel, l = e.schema[r], d = e.schemaPath + e.util.getProperty(r), h = e.errSchemaPath + "/" + r, n = !e.opts.allErrors, m = "data" + (o || ""), u = e.opts.$data && l && l.$data;
        if (u ? (s += " var schema" + i + " = " + e.util.getData(l.$data, o, e.dataPathArr) + "; ", t = "schema" + i) : t = l, !u && "number" != typeof l)
          throw new Error(r + " must be number");
        s += "var division" + i + ";if (", u && (s += " " + t + " !== undefined && ( typeof " + t + " != 'number' || "), s += " (division" + i + " = " + m + " / " + t + ", ", e.opts.multipleOfPrecision ? s += " Math.abs(Math.round(division" + i + ") - division" + i + ") > 1e-" + e.opts.multipleOfPrecision + " " : s += " division" + i + " !== parseInt(division" + i + ") ", s += " ) ", u && (s += "  )  "), s += " ) {   ";
        var p = p || [];
        p.push(s), s = "", false !== e.createErrors ? (s += " { keyword: 'multipleOf' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(h) + " , params: { multipleOf: " + t + " } ", false !== e.opts.messages && (s += " , message: 'should be multiple of ", s += u ? "' + " + t : t + "'"), e.opts.verbose && (s += " , schema:  ", s += u ? "validate.schema" + d : "" + l, s += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), s += " } ") : s += " {} ";
        var v = s;
        return s = p.pop(), !e.compositeRule && n ? e.async ? s += " throw new ValidationError([" + v + "]); " : s += " validate.errors = [" + v + "]; return false; " : s += " var err = " + v + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += "} ", n && (s += " else { "), s;
      };
    }, {}], "mmjm": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(r, e, a) {
        var s = " ", t = r.level, o = r.dataLevel, l = r.schema[e], h = r.schemaPath + r.util.getProperty(e), c = r.errSchemaPath + "/" + e, i = !r.opts.allErrors, m = "data" + (o || ""), v = "errs__" + t, p = r.util.copy(r);
        p.level++;
        var u = "valid" + p.level;
        if (r.opts.strictKeywords ? "object" == typeof l && Object.keys(l).length > 0 || false === l : r.util.schemaHasRules(l, r.RULES.all)) {
          p.schema = l, p.schemaPath = h, p.errSchemaPath = c, s += " var " + v + " = errors;  ";
          var d, E = r.compositeRule;
          r.compositeRule = p.compositeRule = true, p.createErrors = false, p.opts.allErrors && (d = p.opts.allErrors, p.opts.allErrors = false), s += " " + r.validate(p) + " ", p.createErrors = true, d && (p.opts.allErrors = d), r.compositeRule = p.compositeRule = E, s += " if (" + u + ") {   ";
          var n = n || [];
          n.push(s), s = "", false !== r.createErrors ? (s += " { keyword: 'not' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(c) + " , params: {} ", false !== r.opts.messages && (s += " , message: 'should NOT be valid' "), r.opts.verbose && (s += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + m + " "), s += " } ") : s += " {} ";
          var P = s;
          s = n.pop(), !r.compositeRule && i ? r.async ? s += " throw new ValidationError([" + P + "]); " : s += " validate.errors = [" + P + "]; return false; " : s += " var err = " + P + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += " } else {  errors = " + v + "; if (vErrors !== null) { if (" + v + ") vErrors.length = " + v + "; else vErrors = null; } ", r.opts.allErrors && (s += " } ");
        } else
          s += "  var err =   ", false !== r.createErrors ? (s += " { keyword: 'not' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(c) + " , params: {} ", false !== r.opts.messages && (s += " , message: 'should NOT be valid' "), r.opts.verbose && (s += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + m + " "), s += " } ") : s += " {} ", s += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", i && (s += " if (false) { ");
        return s;
      };
    }, {}], "SSWF": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, r, a) {
        var s = " ", t = e.level, l = e.dataLevel, o = e.schema[r], i = e.schemaPath + e.util.getProperty(r), c = e.errSchemaPath + "/" + r, h = !e.opts.allErrors, v = "data" + (l || ""), m = "valid" + t, u = "errs__" + t, n = e.util.copy(e), p = "";
        n.level++;
        var d = "valid" + n.level, f = n.baseId, E = "prevValid" + t, P = "passingSchemas" + t;
        s += "var " + u + " = errors , " + E + " = false , " + m + " = false , " + P + " = null; ";
        var g = e.compositeRule;
        e.compositeRule = n.compositeRule = true;
        var y = o;
        if (y)
          for (var R, S = -1, b = y.length - 1; S < b; )
            R = y[S += 1], (e.opts.strictKeywords ? "object" == typeof R && Object.keys(R).length > 0 || false === R : e.util.schemaHasRules(R, e.RULES.all)) ? (n.schema = R, n.schemaPath = i + "[" + S + "]", n.errSchemaPath = c + "/" + S, s += "  " + e.validate(n) + " ", n.baseId = f) : s += " var " + d + " = true; ", S && (s += " if (" + d + " && " + E + ") { " + m + " = false; " + P + " = [" + P + ", " + S + "]; } else { ", p += "}"), s += " if (" + d + ") { " + m + " = " + E + " = true; " + P + " = " + S + "; }";
        return e.compositeRule = n.compositeRule = g, s += p + "if (!" + m + ") {   var err =   ", false !== e.createErrors ? (s += " { keyword: 'oneOf' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(c) + " , params: { passingSchemas: " + P + " } ", false !== e.opts.messages && (s += " , message: 'should match exactly one schema in oneOf' "), e.opts.verbose && (s += " , schema: validate.schema" + i + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + v + " "), s += " } ") : s += " {} ", s += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !e.compositeRule && h && (e.async ? s += " throw new ValidationError(vErrors); " : s += " validate.errors = vErrors; return false; "), s += "} else {  errors = " + u + "; if (vErrors !== null) { if (" + u + ") vErrors.length = " + u + "; else vErrors = null; }", e.opts.allErrors && (s += " } "), s;
      };
    }, {}], "mGZS": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, t, a) {
        var r, s = " ", o = e.level, h = e.dataLevel, l = e.schema[t], u = e.schemaPath + e.util.getProperty(t), d = e.errSchemaPath + "/" + t, i = !e.opts.allErrors, n = "data" + (h || ""), p = e.opts.$data && l && l.$data;
        p ? (s += " var schema" + o + " = " + e.util.getData(l.$data, h, e.dataPathArr) + "; ", r = "schema" + o) : r = l, s += "if ( ", p && (s += " (" + r + " !== undefined && typeof " + r + " != 'string') || "), s += " !" + (p ? "(new RegExp(" + r + "))" : e.usePattern(l)) + ".test(" + n + ") ) {   ";
        var c = c || [];
        c.push(s), s = "", false !== e.createErrors ? (s += " { keyword: 'pattern' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(d) + " , params: { pattern:  ", s += p ? "" + r : "" + e.util.toQuotedString(l), s += "  } ", false !== e.opts.messages && (s += ` , message: 'should match pattern "`, s += p ? "' + " + r + " + '" : "" + e.util.escapeQuotes(l), s += `"' `), e.opts.verbose && (s += " , schema:  ", s += p ? "validate.schema" + u : "" + e.util.toQuotedString(l), s += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + n + " "), s += " } ") : s += " {} ";
        var m = s;
        return s = c.pop(), !e.compositeRule && i ? e.async ? s += " throw new ValidationError([" + m + "]); " : s += " validate.errors = [" + m + "]; return false; " : s += " var err = " + m + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += "} ", i && (s += " else { "), s;
      };
    }, {}], "jFnx": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, r, t) {
        var a = " ", o = e.level, s = e.dataLevel, i = e.schema[r], l = e.schemaPath + e.util.getProperty(r), h = e.errSchemaPath + "/" + r, p = !e.opts.allErrors, d = "data" + (s || ""), n = "errs__" + o, c = e.util.copy(e), P = "";
        c.level++;
        var u = "valid" + c.level, v = "key" + o, f = "idx" + o, m = c.dataLevel = e.dataLevel + 1, g = "data" + m, y = "dataProperties" + o, b = Object.keys(i || {}).filter(x), j = e.schema.patternProperties || {}, O = Object.keys(j).filter(x), S = e.schema.additionalProperties, E = b.length || O.length, R = false === S, k = "object" == typeof S && Object.keys(S).length, w = e.opts.removeAdditional, _ = R || k || w, Q = e.opts.ownProperties, A = e.baseId, D = e.schema.required;
        if (D && (!e.opts.$data || !D.$data) && D.length < e.opts.loopRequired)
          var q = e.util.toHash(D);
        function x(e2) {
          return "__proto__" !== e2;
        }
        if (a += "var " + n + " = errors;var " + u + " = true;", Q && (a += " var " + y + " = undefined;"), _) {
          if (a += Q ? " " + y + " = " + y + " || Object.keys(" + d + "); for (var " + f + "=0; " + f + "<" + y + ".length; " + f + "++) { var " + v + " = " + y + "[" + f + "]; " : " for (var " + v + " in " + d + ") { ", E) {
            if (a += " var isAdditional" + o + " = !(false ", b.length)
              if (b.length > 8)
                a += " || validate.schema" + l + ".hasOwnProperty(" + v + ") ";
              else {
                var I = b;
                if (I)
                  for (var L = -1, H = I.length - 1; L < H; )
                    M = I[L += 1], a += " || " + v + " == " + e.util.toQuotedString(M) + " ";
              }
            if (O.length) {
              var F = O;
              if (F)
                for (var K = -1, U = F.length - 1; K < U; )
                  se = F[K += 1], a += " || " + e.usePattern(se) + ".test(" + v + ") ";
            }
            a += " ); if (isAdditional" + o + ") { ";
          }
          if ("all" == w)
            a += " delete " + d + "[" + v + "]; ";
          else {
            var V = e.errorPath, $ = "' + " + v + " + '";
            if (e.opts._errorDataPathProperty && (e.errorPath = e.util.getPathExpr(e.errorPath, v, e.opts.jsonPointers)), R)
              if (w)
                a += " delete " + d + "[" + v + "]; ";
              else {
                a += " " + u + " = false; ";
                var N = h;
                h = e.errSchemaPath + "/additionalProperties", (te = te || []).push(a), a = "", false !== e.createErrors ? (a += " { keyword: 'additionalProperties' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(h) + " , params: { additionalProperty: '" + $ + "' } ", false !== e.opts.messages && (a += " , message: '", e.opts._errorDataPathProperty ? a += "is an invalid additional property" : a += "should NOT have additional properties", a += "' "), e.opts.verbose && (a += " , schema: false , parentSchema: validate.schema" + e.schemaPath + " , data: " + d + " "), a += " } ") : a += " {} ";
                var T = a;
                a = te.pop(), !e.compositeRule && p ? e.async ? a += " throw new ValidationError([" + T + "]); " : a += " validate.errors = [" + T + "]; return false; " : a += " var err = " + T + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", h = N, p && (a += " break; ");
              }
            else if (k)
              if ("failing" == w) {
                a += " var " + n + " = errors;  ";
                var z = e.compositeRule;
                e.compositeRule = c.compositeRule = true, c.schema = S, c.schemaPath = e.schemaPath + ".additionalProperties", c.errSchemaPath = e.errSchemaPath + "/additionalProperties", c.errorPath = e.opts._errorDataPathProperty ? e.errorPath : e.util.getPathExpr(e.errorPath, v, e.opts.jsonPointers);
                var B = d + "[" + v + "]";
                c.dataPathArr[m] = v;
                var C = e.validate(c);
                c.baseId = A, e.util.varOccurences(C, g) < 2 ? a += " " + e.util.varReplace(C, g, B) + " " : a += " var " + g + " = " + B + "; " + C + " ", a += " if (!" + u + ") { errors = " + n + "; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete " + d + "[" + v + "]; }  ", e.compositeRule = c.compositeRule = z;
              } else {
                c.schema = S, c.schemaPath = e.schemaPath + ".additionalProperties", c.errSchemaPath = e.errSchemaPath + "/additionalProperties", c.errorPath = e.opts._errorDataPathProperty ? e.errorPath : e.util.getPathExpr(e.errorPath, v, e.opts.jsonPointers);
                B = d + "[" + v + "]";
                c.dataPathArr[m] = v;
                C = e.validate(c);
                c.baseId = A, e.util.varOccurences(C, g) < 2 ? a += " " + e.util.varReplace(C, g, B) + " " : a += " var " + g + " = " + B + "; " + C + " ", p && (a += " if (!" + u + ") break; ");
              }
            e.errorPath = V;
          }
          E && (a += " } "), a += " }  ", p && (a += " if (" + u + ") { ", P += "}");
        }
        var G = e.opts.useDefaults && !e.compositeRule;
        if (b.length) {
          var J = b;
          if (J)
            for (var M, W = -1, X = J.length - 1; W < X; ) {
              var Y = i[M = J[W += 1]];
              if (e.opts.strictKeywords ? "object" == typeof Y && Object.keys(Y).length > 0 || false === Y : e.util.schemaHasRules(Y, e.RULES.all)) {
                var Z = e.util.getProperty(M), ee = (B = d + Z, G && void 0 !== Y.default);
                c.schema = Y, c.schemaPath = l + Z, c.errSchemaPath = h + "/" + e.util.escapeFragment(M), c.errorPath = e.util.getPath(e.errorPath, M, e.opts.jsonPointers), c.dataPathArr[m] = e.util.toQuotedString(M);
                C = e.validate(c);
                if (c.baseId = A, e.util.varOccurences(C, g) < 2) {
                  C = e.util.varReplace(C, g, B);
                  var re = B;
                } else {
                  re = g;
                  a += " var " + g + " = " + B + "; ";
                }
                if (ee)
                  a += " " + C + " ";
                else {
                  if (q && q[M]) {
                    a += " if ( " + re + " === undefined ", Q && (a += " || ! Object.prototype.hasOwnProperty.call(" + d + ", '" + e.util.escapeQuotes(M) + "') "), a += ") { " + u + " = false; ";
                    V = e.errorPath, N = h;
                    var te, ae = e.util.escapeQuotes(M);
                    e.opts._errorDataPathProperty && (e.errorPath = e.util.getPath(V, M, e.opts.jsonPointers)), h = e.errSchemaPath + "/required", (te = te || []).push(a), a = "", false !== e.createErrors ? (a += " { keyword: 'required' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(h) + " , params: { missingProperty: '" + ae + "' } ", false !== e.opts.messages && (a += " , message: '", e.opts._errorDataPathProperty ? a += "is a required property" : a += "should have required property \\'" + ae + "\\'", a += "' "), e.opts.verbose && (a += " , schema: validate.schema" + l + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + d + " "), a += " } ") : a += " {} ";
                    T = a;
                    a = te.pop(), !e.compositeRule && p ? e.async ? a += " throw new ValidationError([" + T + "]); " : a += " validate.errors = [" + T + "]; return false; " : a += " var err = " + T + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", h = N, e.errorPath = V, a += " } else { ";
                  } else
                    p ? (a += " if ( " + re + " === undefined ", Q && (a += " || ! Object.prototype.hasOwnProperty.call(" + d + ", '" + e.util.escapeQuotes(M) + "') "), a += ") { " + u + " = true; } else { ") : (a += " if (" + re + " !== undefined ", Q && (a += " &&   Object.prototype.hasOwnProperty.call(" + d + ", '" + e.util.escapeQuotes(M) + "') "), a += " ) { ");
                  a += " " + C + " } ";
                }
              }
              p && (a += " if (" + u + ") { ", P += "}");
            }
        }
        if (O.length) {
          var oe = O;
          if (oe)
            for (var se, ie = -1, le = oe.length - 1; ie < le; ) {
              Y = j[se = oe[ie += 1]];
              if (e.opts.strictKeywords ? "object" == typeof Y && Object.keys(Y).length > 0 || false === Y : e.util.schemaHasRules(Y, e.RULES.all)) {
                c.schema = Y, c.schemaPath = e.schemaPath + ".patternProperties" + e.util.getProperty(se), c.errSchemaPath = e.errSchemaPath + "/patternProperties/" + e.util.escapeFragment(se), a += Q ? " " + y + " = " + y + " || Object.keys(" + d + "); for (var " + f + "=0; " + f + "<" + y + ".length; " + f + "++) { var " + v + " = " + y + "[" + f + "]; " : " for (var " + v + " in " + d + ") { ", a += " if (" + e.usePattern(se) + ".test(" + v + ")) { ", c.errorPath = e.util.getPathExpr(e.errorPath, v, e.opts.jsonPointers);
                B = d + "[" + v + "]";
                c.dataPathArr[m] = v;
                C = e.validate(c);
                c.baseId = A, e.util.varOccurences(C, g) < 2 ? a += " " + e.util.varReplace(C, g, B) + " " : a += " var " + g + " = " + B + "; " + C + " ", p && (a += " if (!" + u + ") break; "), a += " } ", p && (a += " else " + u + " = true; "), a += " }  ", p && (a += " if (" + u + ") { ", P += "}");
              }
            }
        }
        return p && (a += " " + P + " if (" + n + " == errors) {"), a;
      };
    }, {}], "XxjR": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(r, e, a) {
        var t = " ", s = r.level, o = r.dataLevel, l = r.schema[e], i = r.schemaPath + r.util.getProperty(e), v = r.errSchemaPath + "/" + e, c = !r.opts.allErrors, p = "data" + (o || ""), m = "errs__" + s, h = r.util.copy(r);
        h.level++;
        var d = "valid" + h.level;
        if (t += "var " + m + " = errors;", r.opts.strictKeywords ? "object" == typeof l && Object.keys(l).length > 0 || false === l : r.util.schemaHasRules(l, r.RULES.all)) {
          h.schema = l, h.schemaPath = i, h.errSchemaPath = v;
          var u = "key" + s, n = "idx" + s, y = "i" + s, E = "' + " + u + " + '", P = "data" + (h.dataLevel = r.dataLevel + 1), f = "dataProperties" + s, R = r.opts.ownProperties, b = r.baseId;
          R && (t += " var " + f + " = undefined; "), t += R ? " " + f + " = " + f + " || Object.keys(" + p + "); for (var " + n + "=0; " + n + "<" + f + ".length; " + n + "++) { var " + u + " = " + f + "[" + n + "]; " : " for (var " + u + " in " + p + ") { ", t += " var startErrs" + s + " = errors; ";
          var g = u, k = r.compositeRule;
          r.compositeRule = h.compositeRule = true;
          var w = r.validate(h);
          h.baseId = b, r.util.varOccurences(w, P) < 2 ? t += " " + r.util.varReplace(w, P, g) + " " : t += " var " + P + " = " + g + "; " + w + " ", r.compositeRule = h.compositeRule = k, t += " if (!" + d + ") { for (var " + y + "=startErrs" + s + "; " + y + "<errors; " + y + "++) { vErrors[" + y + "].propertyName = " + u + "; }   var err =   ", false !== r.createErrors ? (t += " { keyword: 'propertyNames' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(v) + " , params: { propertyName: '" + E + "' } ", false !== r.opts.messages && (t += " , message: 'property name \\'" + E + "\\' is invalid' "), r.opts.verbose && (t += " , schema: validate.schema" + i + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + p + " "), t += " } ") : t += " {} ", t += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !r.compositeRule && c && (r.async ? t += " throw new ValidationError(vErrors); " : t += " validate.errors = vErrors; return false; "), c && (t += " break; "), t += " } }";
        }
        return c && (t += "  if (" + m + " == errors) {"), t;
      };
    }, {}], "Dht1": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(r, e, a) {
        var t = " ", s = r.level, o = r.dataLevel, i = r.schema[e], h = r.schemaPath + r.util.getProperty(e), p = r.errSchemaPath + "/" + e, l = !r.opts.allErrors, d = "data" + (o || ""), u = "valid" + s, P = r.opts.$data && i && i.$data;
        P && (t += " var schema" + s + " = " + r.util.getData(i.$data, o, r.dataPathArr) + "; ");
        var n = "schema" + s;
        if (!P)
          if (i.length < r.opts.loopRequired && r.schema.properties && Object.keys(r.schema.properties).length) {
            var c = [], m = i;
            if (m)
              for (var v, y = -1, g = m.length - 1; y < g; ) {
                v = m[y += 1];
                var f = r.schema.properties[v];
                f && (r.opts.strictKeywords ? "object" == typeof f && Object.keys(f).length > 0 || false === f : r.util.schemaHasRules(f, r.RULES.all)) || (c[c.length] = v);
              }
          } else
            c = i;
        if (P || c.length) {
          var E = r.errorPath, q = P || c.length >= r.opts.loopRequired, w = r.opts.ownProperties;
          if (l)
            if (t += " var missing" + s + "; ", q) {
              P || (t += " var " + n + " = validate.schema" + h + "; ");
              var b = "' + " + (_ = "schema" + s + "[" + (D = "i" + s) + "]") + " + '";
              r.opts._errorDataPathProperty && (r.errorPath = r.util.getPathExpr(E, _, r.opts.jsonPointers)), t += " var " + u + " = true; ", P && (t += " if (schema" + s + " === undefined) " + u + " = true; else if (!Array.isArray(schema" + s + ")) " + u + " = false; else {"), t += " for (var " + D + " = 0; " + D + " < " + n + ".length; " + D + "++) { " + u + " = " + d + "[" + n + "[" + D + "]] !== undefined ", w && (t += " &&   Object.prototype.hasOwnProperty.call(" + d + ", " + n + "[" + D + "]) "), t += "; if (!" + u + ") break; } ", P && (t += "  }  "), t += "  if (!" + u + ") {   ", (Q = Q || []).push(t), t = "", false !== r.createErrors ? (t += " { keyword: 'required' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(p) + " , params: { missingProperty: '" + b + "' } ", false !== r.opts.messages && (t += " , message: '", r.opts._errorDataPathProperty ? t += "is a required property" : t += "should have required property \\'" + b + "\\'", t += "' "), r.opts.verbose && (t += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + d + " "), t += " } ") : t += " {} ";
              var S = t;
              t = Q.pop(), !r.compositeRule && l ? r.async ? t += " throw new ValidationError([" + S + "]); " : t += " validate.errors = [" + S + "]; return false; " : t += " var err = " + S + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " } else { ";
            } else {
              t += " if ( ";
              var j = c;
              if (j)
                for (var D = -1, O = j.length - 1; D < O; ) {
                  R = j[D += 1], D && (t += " || "), t += " ( ( " + (L = d + ($ = r.util.getProperty(R))) + " === undefined ", w && (t += " || ! Object.prototype.hasOwnProperty.call(" + d + ", '" + r.util.escapeQuotes(R) + "') "), t += ") && (missing" + s + " = " + r.util.toQuotedString(r.opts.jsonPointers ? R : $) + ") ) ";
                }
              t += ") {  ";
              var Q;
              b = "' + " + (_ = "missing" + s) + " + '";
              r.opts._errorDataPathProperty && (r.errorPath = r.opts.jsonPointers ? r.util.getPathExpr(E, _, true) : E + " + " + _), (Q = Q || []).push(t), t = "", false !== r.createErrors ? (t += " { keyword: 'required' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(p) + " , params: { missingProperty: '" + b + "' } ", false !== r.opts.messages && (t += " , message: '", r.opts._errorDataPathProperty ? t += "is a required property" : t += "should have required property \\'" + b + "\\'", t += "' "), r.opts.verbose && (t += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + d + " "), t += " } ") : t += " {} ";
              S = t;
              t = Q.pop(), !r.compositeRule && l ? r.async ? t += " throw new ValidationError([" + S + "]); " : t += " validate.errors = [" + S + "]; return false; " : t += " var err = " + S + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " } else { ";
            }
          else if (q) {
            P || (t += " var " + n + " = validate.schema" + h + "; ");
            var _;
            b = "' + " + (_ = "schema" + s + "[" + (D = "i" + s) + "]") + " + '";
            r.opts._errorDataPathProperty && (r.errorPath = r.util.getPathExpr(E, _, r.opts.jsonPointers)), P && (t += " if (" + n + " && !Array.isArray(" + n + ")) {  var err =   ", false !== r.createErrors ? (t += " { keyword: 'required' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(p) + " , params: { missingProperty: '" + b + "' } ", false !== r.opts.messages && (t += " , message: '", r.opts._errorDataPathProperty ? t += "is a required property" : t += "should have required property \\'" + b + "\\'", t += "' "), r.opts.verbose && (t += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + d + " "), t += " } ") : t += " {} ", t += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else if (" + n + " !== undefined) { "), t += " for (var " + D + " = 0; " + D + " < " + n + ".length; " + D + "++) { if (" + d + "[" + n + "[" + D + "]] === undefined ", w && (t += " || ! Object.prototype.hasOwnProperty.call(" + d + ", " + n + "[" + D + "]) "), t += ") {  var err =   ", false !== r.createErrors ? (t += " { keyword: 'required' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(p) + " , params: { missingProperty: '" + b + "' } ", false !== r.opts.messages && (t += " , message: '", r.opts._errorDataPathProperty ? t += "is a required property" : t += "should have required property \\'" + b + "\\'", t += "' "), r.opts.verbose && (t += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + d + " "), t += " } ") : t += " {} ", t += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } } ", P && (t += "  }  ");
          } else {
            var k = c;
            if (k)
              for (var R, A = -1, x = k.length - 1; A < x; ) {
                R = k[A += 1];
                var $ = r.util.getProperty(R), L = (b = r.util.escapeQuotes(R), d + $);
                r.opts._errorDataPathProperty && (r.errorPath = r.util.getPath(E, R, r.opts.jsonPointers)), t += " if ( " + L + " === undefined ", w && (t += " || ! Object.prototype.hasOwnProperty.call(" + d + ", '" + r.util.escapeQuotes(R) + "') "), t += ") {  var err =   ", false !== r.createErrors ? (t += " { keyword: 'required' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(p) + " , params: { missingProperty: '" + b + "' } ", false !== r.opts.messages && (t += " , message: '", r.opts._errorDataPathProperty ? t += "is a required property" : t += "should have required property \\'" + b + "\\'", t += "' "), r.opts.verbose && (t += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + d + " "), t += " } ") : t += " {} ", t += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ";
              }
          }
          r.errorPath = E;
        } else
          l && (t += " if (true) {");
        return t;
      };
    }, {}], "mmFQ": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, a, r) {
        var t, i = " ", s = e.level, o = e.dataLevel, m = e.schema[a], l = e.schemaPath + e.util.getProperty(a), c = e.errSchemaPath + "/" + a, u = !e.opts.allErrors, d = "data" + (o || ""), h = "valid" + s, n = e.opts.$data && m && m.$data;
        if (n ? (i += " var schema" + s + " = " + e.util.getData(m.$data, o, e.dataPathArr) + "; ", t = "schema" + s) : t = m, (m || n) && false !== e.opts.uniqueItems) {
          n && (i += " var " + h + "; if (" + t + " === false || " + t + " === undefined) " + h + " = true; else if (typeof " + t + " != 'boolean') " + h + " = false; else { "), i += " var i = " + d + ".length , " + h + " = true , j; if (i > 1) { ";
          var f = e.schema.items && e.schema.items.type, v = Array.isArray(f);
          if (!f || "object" == f || "array" == f || v && (f.indexOf("object") >= 0 || f.indexOf("array") >= 0))
            i += " outer: for (;i--;) { for (j = i; j--;) { if (equal(" + d + "[i], " + d + "[j])) { " + h + " = false; break outer; } } } ";
          else {
            i += " var itemIndices = {}, item; for (;i--;) { var item = " + d + "[i]; ";
            var p = "checkDataType" + (v ? "s" : "");
            i += " if (" + e.util[p](f, "item", e.opts.strictNumbers, true) + ") continue; ", v && (i += ` if (typeof item == 'string') item = '"' + item; `), i += " if (typeof itemIndices[item] == 'number') { " + h + " = false; j = itemIndices[item]; break; } itemIndices[item] = i; } ";
          }
          i += " } ", n && (i += "  }  "), i += " if (!" + h + ") {   ";
          var y = y || [];
          y.push(i), i = "", false !== e.createErrors ? (i += " { keyword: 'uniqueItems' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(c) + " , params: { i: i, j: j } ", false !== e.opts.messages && (i += " , message: 'should NOT have duplicate items (items ## ' + j + ' and ' + i + ' are identical)' "), e.opts.verbose && (i += " , schema:  ", i += n ? "validate.schema" + l : "" + m, i += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + d + " "), i += " } ") : i += " {} ";
          var j = i;
          i = y.pop(), !e.compositeRule && u ? e.async ? i += " throw new ValidationError([" + j + "]); " : i += " validate.errors = [" + j + "]; return false; " : i += " var err = " + j + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", i += " } ", u && (i += " else { ");
        } else
          u && (i += " if (true) { ");
        return i;
      };
    }, {}], "Czyc": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = { $ref: require2("./ref"), allOf: require2("./allOf"), anyOf: require2("./anyOf"), $comment: require2("./comment"), const: require2("./const"), contains: require2("./contains"), dependencies: require2("./dependencies"), enum: require2("./enum"), format: require2("./format"), if: require2("./if"), items: require2("./items"), maximum: require2("./_limit"), minimum: require2("./_limit"), maxItems: require2("./_limitItems"), minItems: require2("./_limitItems"), maxLength: require2("./_limitLength"), minLength: require2("./_limitLength"), maxProperties: require2("./_limitProperties"), minProperties: require2("./_limitProperties"), multipleOf: require2("./multipleOf"), not: require2("./not"), oneOf: require2("./oneOf"), pattern: require2("./pattern"), properties: require2("./properties"), propertyNames: require2("./propertyNames"), required: require2("./required"), uniqueItems: require2("./uniqueItems"), validate: require2("./validate") };
    }, { "./ref": "a2na", "./allOf": "hRgn", "./anyOf": "lo6J", "./comment": "Kkzr", "./const": "U4sD", "./contains": "EypH", "./dependencies": "Cpp7", "./enum": "fqDY", "./format": "avoW", "./if": "JHQ3", "./items": "aiPb", "./_limit": "UJAl", "./_limitItems": "W8ih", "./_limitLength": "fZGX", "./_limitProperties": "JAEr", "./multipleOf": "oNPH", "./not": "mmjm", "./oneOf": "SSWF", "./pattern": "mGZS", "./properties": "jFnx", "./propertyNames": "XxjR", "./required": "Dht1", "./uniqueItems": "mmFQ", "./validate": "yhC1" }], "vBP0": [function(require2, module2, exports3) {
      "use strict";
      var e = require2("../dotjs"), t = require2("./util").toHash;
      module2.exports = function() {
        var n = [{ type: "number", rules: [{ maximum: ["exclusiveMaximum"] }, { minimum: ["exclusiveMinimum"] }, "multipleOf", "format"] }, { type: "string", rules: ["maxLength", "minLength", "pattern", "format"] }, { type: "array", rules: ["maxItems", "minItems", "items", "contains", "uniqueItems"] }, { type: "object", rules: ["maxProperties", "minProperties", "required", "dependencies", "propertyNames", { properties: ["additionalProperties", "patternProperties"] }] }, { rules: ["$ref", "const", "enum", "not", "anyOf", "oneOf", "allOf", "if"] }], r = ["type", "$comment"];
        return n.all = t(r), n.types = t(["number", "integer", "string", "array", "object", "boolean", "null"]), n.forEach(function(t2) {
          t2.rules = t2.rules.map(function(t3) {
            var i;
            if ("object" == typeof t3) {
              var o = Object.keys(t3)[0];
              i = t3[o], t3 = o, i.forEach(function(e2) {
                r.push(e2), n.all[e2] = true;
              });
            }
            return r.push(t3), n.all[t3] = { keyword: t3, code: e[t3], implements: i };
          }), n.all.$comment = { keyword: "$comment", code: e.$comment }, t2.type && (n.types[t2.type] = t2);
        }), n.keywords = t(r.concat(["$schema", "$id", "id", "$data", "$async", "title", "description", "default", "definitions", "examples", "readOnly", "writeOnly", "contentMediaType", "contentEncoding", "additionalItems", "then", "else"])), n.custom = {}, n;
      };
    }, { "../dotjs": "Czyc", "./util": "Q1F7" }], "BunE": [function(require2, module2, exports3) {
      "use strict";
      var e = ["multipleOf", "maximum", "exclusiveMaximum", "minimum", "exclusiveMinimum", "maxLength", "minLength", "pattern", "additionalItems", "maxItems", "minItems", "uniqueItems", "maxProperties", "minProperties", "required", "additionalProperties", "enum", "format", "const"];
      module2.exports = function(t, i) {
        for (var r = 0; r < i.length; r++) {
          t = JSON.parse(JSON.stringify(t));
          var m, a = i[r].split("/"), n = t;
          for (m = 1; m < a.length; m++)
            n = n[a[m]];
          for (m = 0; m < e.length; m++) {
            var s = e[m], o = n[s];
            o && (n[s] = { anyOf: [o, { $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" }] });
          }
        }
        return t;
      };
    }, {}], "mNRF": [function(require2, module2, exports3) {
      "use strict";
      var n = require2("./error_classes").MissingRef;
      function e(t, r, o) {
        var i = this;
        if ("function" != typeof this._opts.loadSchema)
          throw new Error("options.loadSchema should be a function");
        "function" == typeof r && (o = r, r = void 0);
        var a = c(t).then(function() {
          var e2 = i._addSchema(t, void 0, r);
          return e2.validate || function e3(t2) {
            try {
              return i._compile(t2);
            } catch (a2) {
              if (a2 instanceof n)
                return function o3(e4) {
                  var o4 = e4.missingSchema;
                  if (h(o4))
                    throw new Error("Schema " + o4 + " is loaded but " + e4.missingRef + " cannot be resolved");
                  var a3 = i._loadingSchemas[o4];
                  a3 || (a3 = i._loadingSchemas[o4] = i._opts.loadSchema(o4)).then(s, s);
                  return a3.then(function(n2) {
                    if (!h(o4))
                      return c(n2).then(function() {
                        h(o4) || i.addSchema(n2, o4, void 0, r);
                      });
                  }).then(function() {
                    return function t3(o5) {
                      try {
                        return i._compile(o5);
                      } catch (e5) {
                        if (e5 instanceof n)
                          return a4(e5);
                        throw e5;
                      }
                      function a4(n2) {
                        var e5 = n2.missingSchema;
                        if (h2(e5))
                          throw new Error("Schema " + e5 + " is loaded but " + n2.missingRef + " cannot be resolved");
                        var a5 = i._loadingSchemas[e5];
                        return a5 || (a5 = i._loadingSchemas[e5] = i._opts.loadSchema(e5)).then(s2, s2), a5.then(function(n3) {
                          if (!h2(e5))
                            return c(n3).then(function() {
                              h2(e5) || i.addSchema(n3, e5, void 0, r);
                            });
                        }).then(function() {
                          return t3(o5);
                        });
                        function s2() {
                          delete i._loadingSchemas[e5];
                        }
                        function h2(n3) {
                          return i._refs[n3] || i._schemas[n3];
                        }
                      }
                    }(t2);
                  });
                  function s() {
                    delete i._loadingSchemas[o4];
                  }
                  function h(n2) {
                    return i._refs[n2] || i._schemas[n2];
                  }
                }(a2);
              throw a2;
            }
            function o2(n2) {
              var o3 = n2.missingSchema;
              if (h(o3))
                throw new Error("Schema " + o3 + " is loaded but " + n2.missingRef + " cannot be resolved");
              var a2 = i._loadingSchemas[o3];
              return a2 || (a2 = i._loadingSchemas[o3] = i._opts.loadSchema(o3)).then(s, s), a2.then(function(n3) {
                if (!h(o3))
                  return c(n3).then(function() {
                    h(o3) || i.addSchema(n3, o3, void 0, r);
                  });
              }).then(function() {
                return e3(t2);
              });
              function s() {
                delete i._loadingSchemas[o3];
              }
              function h(n3) {
                return i._refs[n3] || i._schemas[n3];
              }
            }
          }(e2);
        });
        return o && a.then(function(n2) {
          o(null, n2);
        }, o), a;
        function c(n2) {
          var t2 = n2.$schema;
          return t2 && !i.getSchema(t2) ? e.call(i, { $ref: t2 }, true) : Promise.resolve();
        }
      }
      module2.exports = e;
    }, { "./error_classes": "OtNE" }], "Mzku": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(a, r, e) {
        var t, s, o = " ", i = a.level, h = a.dataLevel, d = a.schema[r], l = a.schemaPath + a.util.getProperty(r), v = a.errSchemaPath + "/" + r, c = !a.opts.allErrors, n = "data" + (h || ""), m = "valid" + i, u = "errs__" + i, p = a.opts.$data && d && d.$data;
        p ? (o += " var schema" + i + " = " + a.util.getData(d.$data, h, a.dataPathArr) + "; ", s = "schema" + i) : s = d;
        var f, P, y, E, w, k = "definition" + i, g = this.definition, R = "";
        if (p && g.$data) {
          w = "keywordValidate" + i;
          var S = g.validateSchema;
          o += " var " + k + " = RULES.custom['" + r + "'].definition; var " + w + " = " + k + ".validate;";
        } else {
          if (!(E = a.useCustomRule(this, d, a.schema, a)))
            return;
          s = "validate.schema" + l, w = E.code, f = g.compile, P = g.inline, y = g.macro;
        }
        var b = w + ".errors", $ = "i" + i, A = "ruleErr" + i, D = g.async;
        if (D && !a.async)
          throw new Error("async keyword in sync schema");
        if (P || y || (o += b + " = null;"), o += "var " + u + " = errors;var " + m + ";", p && g.$data && (R += "}", o += " if (" + s + " === undefined) { " + m + " = true; } else { ", S && (R += "}", o += " " + m + " = " + k + ".validateSchema(" + s + "); if (" + m + ") { ")), P)
          g.statements ? o += " " + E.validate + " " : o += " " + m + " = " + E.validate + "; ";
        else if (y) {
          var V = a.util.copy(a);
          R = "";
          V.level++;
          var x = "valid" + V.level;
          V.schema = E.validate, V.schemaPath = "";
          var C = a.compositeRule;
          a.compositeRule = V.compositeRule = true;
          var L = a.validate(V).replace(/validate\.schema/g, w);
          a.compositeRule = V.compositeRule = C, o += " " + L;
        } else {
          (j = j || []).push(o), o = "", o += "  " + w + ".call( ", a.opts.passContext ? o += "this" : o += "self", f || false === g.schema ? o += " , " + n + " " : o += " , " + s + " , " + n + " , validate.schema" + a.schemaPath + " ", o += " , (dataPath || '')", '""' != a.errorPath && (o += " + " + a.errorPath);
          var Q = h ? "data" + (h - 1 || "") : "parentData", _ = h ? a.dataPathArr[h] : "parentDataProperty", U = o += " , " + Q + " , " + _ + " , rootData )  ";
          o = j.pop(), false === g.errors ? (o += " " + m + " = ", D && (o += "await "), o += U + "; ") : o += D ? " var " + (b = "customErrors" + i) + " = null; try { " + m + " = await " + U + "; } catch (e) { " + m + " = false; if (e instanceof ValidationError) " + b + " = e.errors; else throw e; } " : " " + b + " = null; " + m + " = " + U + "; ";
        }
        if (g.modifying && (o += " if (" + Q + ") " + n + " = " + Q + "[" + _ + "];"), o += "" + R, g.valid)
          c && (o += " if (true) { ");
        else {
          var j;
          o += " if ( ", void 0 === g.valid ? (o += " !", o += y ? "" + x : "" + m) : o += " " + !g.valid + " ", o += ") { ", t = this.keyword, (j = j || []).push(o), o = "", (j = j || []).push(o), o = "", false !== a.createErrors ? (o += " { keyword: '" + (t || "custom") + "' , dataPath: (dataPath || '') + " + a.errorPath + " , schemaPath: " + a.util.toQuotedString(v) + " , params: { keyword: '" + this.keyword + "' } ", false !== a.opts.messages && (o += ` , message: 'should pass "` + this.keyword + `" keyword validation' `), a.opts.verbose && (o += " , schema: validate.schema" + l + " , parentSchema: validate.schema" + a.schemaPath + " , data: " + n + " "), o += " } ") : o += " {} ";
          var q = o;
          o = j.pop(), !a.compositeRule && c ? a.async ? o += " throw new ValidationError([" + q + "]); " : o += " validate.errors = [" + q + "]; return false; " : o += " var err = " + q + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
          var z = o;
          o = j.pop(), P ? g.errors ? "full" != g.errors && (o += "  for (var " + $ + "=" + u + "; " + $ + "<errors; " + $ + "++) { var " + A + " = vErrors[" + $ + "]; if (" + A + ".dataPath === undefined) " + A + ".dataPath = (dataPath || '') + " + a.errorPath + "; if (" + A + ".schemaPath === undefined) { " + A + '.schemaPath = "' + v + '"; } ', a.opts.verbose && (o += " " + A + ".schema = " + s + "; " + A + ".data = " + n + "; "), o += " } ") : false === g.errors ? o += " " + z + " " : (o += " if (" + u + " == errors) { " + z + " } else {  for (var " + $ + "=" + u + "; " + $ + "<errors; " + $ + "++) { var " + A + " = vErrors[" + $ + "]; if (" + A + ".dataPath === undefined) " + A + ".dataPath = (dataPath || '') + " + a.errorPath + "; if (" + A + ".schemaPath === undefined) { " + A + '.schemaPath = "' + v + '"; } ', a.opts.verbose && (o += " " + A + ".schema = " + s + "; " + A + ".data = " + n + "; "), o += " } } ") : y ? (o += "   var err =   ", false !== a.createErrors ? (o += " { keyword: '" + (t || "custom") + "' , dataPath: (dataPath || '') + " + a.errorPath + " , schemaPath: " + a.util.toQuotedString(v) + " , params: { keyword: '" + this.keyword + "' } ", false !== a.opts.messages && (o += ` , message: 'should pass "` + this.keyword + `" keyword validation' `), a.opts.verbose && (o += " , schema: validate.schema" + l + " , parentSchema: validate.schema" + a.schemaPath + " , data: " + n + " "), o += " } ") : o += " {} ", o += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !a.compositeRule && c && (a.async ? o += " throw new ValidationError(vErrors); " : o += " validate.errors = vErrors; return false; ")) : false === g.errors ? o += " " + z + " " : (o += " if (Array.isArray(" + b + ")) { if (vErrors === null) vErrors = " + b + "; else vErrors = vErrors.concat(" + b + "); errors = vErrors.length;  for (var " + $ + "=" + u + "; " + $ + "<errors; " + $ + "++) { var " + A + " = vErrors[" + $ + "]; if (" + A + ".dataPath === undefined) " + A + ".dataPath = (dataPath || '') + " + a.errorPath + ";  " + A + '.schemaPath = "' + v + '";  ', a.opts.verbose && (o += " " + A + ".schema = " + s + "; " + A + ".data = " + n + "; "), o += " } } else { " + z + " } "), o += " } ", c && (o += " else { ");
        }
        return o;
      };
    }, {}], "ve7q": [function(require2, module2, exports3) {
      module2.exports = { $schema: "http://json-schema.org/draft-07/schema#", $id: "http://json-schema.org/draft-07/schema#", title: "Core schema meta-schema", definitions: { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: true, default: [] } }, type: ["object", "boolean"], properties: { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: true, readOnly: { type: "boolean", default: false }, examples: { type: "array", items: true }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: true }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: false }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: true, enum: { type: "array", items: true, minItems: 1, uniqueItems: true }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: true }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, default: true };
    }, {}], "GIYw": [function(require2, module2, exports3) {
      "use strict";
      var e = require2("./refs/json-schema-draft-07.json");
      module2.exports = { $id: "https://github.com/ajv-validator/ajv/blob/master/lib/definition_schema.js", definitions: { simpleTypes: e.definitions.simpleTypes }, type: "object", dependencies: { schema: ["validate"], $data: ["validate"], statements: ["inline"], valid: { not: { required: ["macro"] } } }, properties: { type: e.properties.type, schema: { type: "boolean" }, statements: { type: "boolean" }, dependencies: { type: "array", items: { type: "string" } }, metaSchema: { type: "object" }, modifying: { type: "boolean" }, valid: { type: "boolean" }, $data: { type: "boolean" }, async: { type: "boolean" }, errors: { anyOf: [{ type: "boolean" }, { const: "full" }] } } };
    }, { "./refs/json-schema-draft-07.json": "ve7q" }], "UVv5": [function(require2, module2, exports3) {
      "use strict";
      var e = /^[a-z_$][a-z0-9_$-]*$/i, r = require2("./dotjs/custom"), t = require2("./definition_schema");
      function i(t2, i2) {
        var o2 = this.RULES;
        if (o2.keywords[t2])
          throw new Error("Keyword " + t2 + " is already defined");
        if (!e.test(t2))
          throw new Error("Keyword " + t2 + " is not a valid identifier");
        if (i2) {
          this.validateKeyword(i2, true);
          var a2 = i2.type;
          if (Array.isArray(a2))
            for (var s2 = 0; s2 < a2.length; s2++)
              d(t2, a2[s2], i2);
          else
            d(t2, a2, i2);
          var n = i2.metaSchema;
          n && (i2.$data && this._opts.$data && (n = { anyOf: [n, { $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" }] }), i2.validateSchema = this.compile(n, true));
        }
        function d(e2, t3, i3) {
          for (var a3, s3 = 0; s3 < o2.length; s3++) {
            var n2 = o2[s3];
            if (n2.type == t3) {
              a3 = n2;
              break;
            }
          }
          a3 || (a3 = { type: t3, rules: [] }, o2.push(a3));
          var d2 = { keyword: e2, definition: i3, custom: true, code: r, implements: i3.implements };
          a3.rules.push(d2), o2.custom[e2] = d2;
        }
        return o2.keywords[t2] = o2.all[t2] = true, this;
      }
      function o(e2) {
        var r2 = this.RULES.custom[e2];
        return r2 ? r2.definition : this.RULES.keywords[e2] || false;
      }
      function a(e2) {
        var r2 = this.RULES;
        delete r2.keywords[e2], delete r2.all[e2], delete r2.custom[e2];
        for (var t2 = 0; t2 < r2.length; t2++)
          for (var i2 = r2[t2].rules, o2 = 0; o2 < i2.length; o2++)
            if (i2[o2].keyword == e2) {
              i2.splice(o2, 1);
              break;
            }
        return this;
      }
      function s(e2, r2) {
        s.errors = null;
        var i2 = this._validateKeyword = this._validateKeyword || this.compile(t, true);
        if (i2(e2))
          return true;
        if (s.errors = i2.errors, r2)
          throw new Error("custom keyword definition is invalid: " + this.errorsText(i2.errors));
        return false;
      }
      module2.exports = { add: i, get: o, remove: a, validate: s };
    }, { "./dotjs/custom": "Mzku", "./definition_schema": "GIYw" }], "xbmT": [function(require2, module2, exports3) {
      module2.exports = { $schema: "http://json-schema.org/draft-07/schema#", $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", description: "Meta-schema for $data reference (JSON Schema extension proposal)", type: "object", required: ["$data"], properties: { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, additionalProperties: false };
    }, {}], "hi5j": [function(require2, module2, exports3) {
      "use strict";
      var e = require2("./compile"), t = require2("./compile/resolve"), r = require2("./cache"), a = require2("./compile/schema_obj"), i = require2("fast-json-stable-stringify"), s = require2("./compile/formats"), o = require2("./compile/rules"), h = require2("./data"), n = require2("./compile/util");
      module2.exports = p, p.prototype.validate = u, p.prototype.compile = v, p.prototype.addSchema = _, p.prototype.addMetaSchema = g, p.prototype.validateSchema = y, p.prototype.getSchema = S, p.prototype.removeSchema = q, p.prototype.addFormat = x, p.prototype.errorsText = k, p.prototype._addSchema = E, p.prototype._compile = I, p.prototype.compileAsync = require2("./compile/async");
      var c = require2("./keyword");
      p.prototype.addKeyword = c.add, p.prototype.getKeyword = c.get, p.prototype.removeKeyword = c.remove, p.prototype.validateKeyword = c.validate;
      var d = require2("./compile/error_classes");
      p.ValidationError = d.Validation, p.MissingRefError = d.MissingRef, p.$dataMetaSchema = h;
      var l = "http://json-schema.org/draft-07/schema", m = ["removeAdditional", "useDefaults", "coerceTypes", "strictDefaults"], f = ["/properties"];
      function p(e2) {
        if (!(this instanceof p))
          return new p(e2);
        e2 = this._opts = n.copy(e2) || {}, O(this), this._schemas = {}, this._refs = {}, this._fragments = {}, this._formats = s(e2.format), this._cache = e2.cache || new r(), this._loadingSchemas = {}, this._compilations = [], this.RULES = o(), this._getId = M(e2), e2.loopRequired = e2.loopRequired || 1 / 0, "property" == e2.errorDataPath && (e2._errorDataPathProperty = true), void 0 === e2.serialize && (e2.serialize = i), this._metaOpts = F(this), e2.formats && D(this), e2.keywords && P(this), A(this), "object" == typeof e2.meta && this.addMetaSchema(e2.meta), e2.nullable && this.addKeyword("nullable", { metaSchema: { type: "boolean" } }), V(this);
      }
      function u(e2, t2) {
        var r2;
        if ("string" == typeof e2) {
          if (!(r2 = this.getSchema(e2)))
            throw new Error('no schema with key or ref "' + e2 + '"');
        } else {
          var a2 = this._addSchema(e2);
          r2 = a2.validate || this._compile(a2);
        }
        var i2 = r2(t2);
        return true !== r2.$async && (this.errors = r2.errors), i2;
      }
      function v(e2, t2) {
        var r2 = this._addSchema(e2, void 0, t2);
        return r2.validate || this._compile(r2);
      }
      function _(e2, r2, a2, i2) {
        if (Array.isArray(e2)) {
          for (var s2 = 0; s2 < e2.length; s2++)
            this.addSchema(e2[s2], void 0, a2, i2);
          return this;
        }
        var o2 = this._getId(e2);
        if (void 0 !== o2 && "string" != typeof o2)
          throw new Error("schema id must be string");
        return T(this, r2 = t.normalizeId(r2 || o2)), this._schemas[r2] = this._addSchema(e2, a2, i2, true), this;
      }
      function g(e2, t2, r2) {
        return this.addSchema(e2, t2, r2, true), this;
      }
      function y(e2, t2) {
        var r2 = e2.$schema;
        if (void 0 !== r2 && "string" != typeof r2)
          throw new Error("$schema must be a string");
        if (!(r2 = r2 || this._opts.defaultMeta || w(this)))
          return this.logger.warn("meta-schema not available"), this.errors = null, true;
        var a2 = this.validate(r2, e2);
        if (!a2 && t2) {
          var i2 = "schema is invalid: " + this.errorsText();
          if ("log" != this._opts.validateSchema)
            throw new Error(i2);
          this.logger.error(i2);
        }
        return a2;
      }
      function w(e2) {
        var t2 = e2._opts.meta;
        return e2._opts.defaultMeta = "object" == typeof t2 ? e2._getId(t2) || t2 : e2.getSchema(l) ? l : void 0, e2._opts.defaultMeta;
      }
      function S(e2) {
        var t2 = $(this, e2);
        switch (typeof t2) {
          case "object":
            return t2.validate || this._compile(t2);
          case "string":
            return this.getSchema(t2);
          case "undefined":
            return b(this, e2);
        }
      }
      function b(r2, i2) {
        var s2 = t.schema.call(r2, { schema: {} }, i2);
        if (s2) {
          var o2 = s2.schema, h2 = s2.root, n2 = s2.baseId, c2 = e.call(r2, o2, h2, void 0, n2);
          return r2._fragments[i2] = new a({ ref: i2, fragment: true, schema: o2, root: h2, baseId: n2, validate: c2 }), c2;
        }
      }
      function $(e2, r2) {
        return r2 = t.normalizeId(r2), e2._schemas[r2] || e2._refs[r2] || e2._fragments[r2];
      }
      function q(e2) {
        if (e2 instanceof RegExp)
          return j(this, this._schemas, e2), j(this, this._refs, e2), this;
        switch (typeof e2) {
          case "undefined":
            return j(this, this._schemas), j(this, this._refs), this._cache.clear(), this;
          case "string":
            var r2 = $(this, e2);
            return r2 && this._cache.del(r2.cacheKey), delete this._schemas[e2], delete this._refs[e2], this;
          case "object":
            var a2 = this._opts.serialize, i2 = a2 ? a2(e2) : e2;
            this._cache.del(i2);
            var s2 = this._getId(e2);
            s2 && (s2 = t.normalizeId(s2), delete this._schemas[s2], delete this._refs[s2]);
        }
        return this;
      }
      function j(e2, t2, r2) {
        for (var a2 in t2) {
          var i2 = t2[a2];
          i2.meta || r2 && !r2.test(a2) || (e2._cache.del(i2.cacheKey), delete t2[a2]);
        }
      }
      function E(e2, r2, i2, s2) {
        if ("object" != typeof e2 && "boolean" != typeof e2)
          throw new Error("schema should be object or boolean");
        var o2 = this._opts.serialize, h2 = o2 ? o2(e2) : e2, n2 = this._cache.get(h2);
        if (n2)
          return n2;
        s2 = s2 || false !== this._opts.addUsedSchema;
        var c2 = t.normalizeId(this._getId(e2));
        c2 && s2 && T(this, c2);
        var d2, l2 = false !== this._opts.validateSchema && !r2;
        l2 && !(d2 = c2 && c2 == t.normalizeId(e2.$schema)) && this.validateSchema(e2, true);
        var m2 = t.ids.call(this, e2), f2 = new a({ id: c2, schema: e2, localRefs: m2, cacheKey: h2, meta: i2 });
        return "#" != c2[0] && s2 && (this._refs[c2] = f2), this._cache.put(h2, f2), l2 && d2 && this.validateSchema(e2, true), f2;
      }
      function I(t2, r2) {
        if (t2.compiling)
          return t2.validate = s2, s2.schema = t2.schema, s2.errors = null, s2.root = r2 || s2, true === t2.schema.$async && (s2.$async = true), s2;
        var a2, i2;
        t2.compiling = true, t2.meta && (a2 = this._opts, this._opts = this._metaOpts);
        try {
          i2 = e.call(this, t2.schema, r2, t2.localRefs);
        } catch (o2) {
          throw delete t2.validate, o2;
        } finally {
          t2.compiling = false, t2.meta && (this._opts = a2);
        }
        return t2.validate = i2, t2.refs = i2.refs, t2.refVal = i2.refVal, t2.root = i2.root, i2;
        function s2() {
          var e2 = t2.validate, r3 = e2.apply(this, arguments);
          return s2.errors = e2.errors, r3;
        }
      }
      function M(e2) {
        switch (e2.schemaId) {
          case "auto":
            return R;
          case "id":
            return z;
          default:
            return K;
        }
      }
      function z(e2) {
        return e2.$id && this.logger.warn("schema $id ignored", e2.$id), e2.id;
      }
      function K(e2) {
        return e2.id && this.logger.warn("schema id ignored", e2.id), e2.$id;
      }
      function R(e2) {
        if (e2.$id && e2.id && e2.$id != e2.id)
          throw new Error("schema $id is different from id");
        return e2.$id || e2.id;
      }
      function k(e2, t2) {
        if (!(e2 = e2 || this.errors))
          return "No errors";
        for (var r2 = void 0 === (t2 = t2 || {}).separator ? ", " : t2.separator, a2 = void 0 === t2.dataVar ? "data" : t2.dataVar, i2 = "", s2 = 0; s2 < e2.length; s2++) {
          var o2 = e2[s2];
          o2 && (i2 += a2 + o2.dataPath + " " + o2.message + r2);
        }
        return i2.slice(0, -r2.length);
      }
      function x(e2, t2) {
        return "string" == typeof t2 && (t2 = new RegExp(t2)), this._formats[e2] = t2, this;
      }
      function A(e2) {
        var t2;
        if (e2._opts.$data && (t2 = require2("./refs/data.json"), e2.addMetaSchema(t2, t2.$id, true)), false !== e2._opts.meta) {
          var r2 = require2("./refs/json-schema-draft-07.json");
          e2._opts.$data && (r2 = h(r2, f)), e2.addMetaSchema(r2, l, true), e2._refs["http://json-schema.org/schema"] = l;
        }
      }
      function V(e2) {
        var t2 = e2._opts.schemas;
        if (t2)
          if (Array.isArray(t2))
            e2.addSchema(t2);
          else
            for (var r2 in t2)
              e2.addSchema(t2[r2], r2);
      }
      function D(e2) {
        for (var t2 in e2._opts.formats) {
          var r2 = e2._opts.formats[t2];
          e2.addFormat(t2, r2);
        }
      }
      function P(e2) {
        for (var t2 in e2._opts.keywords) {
          var r2 = e2._opts.keywords[t2];
          e2.addKeyword(t2, r2);
        }
      }
      function T(e2, t2) {
        if (e2._schemas[t2] || e2._refs[t2])
          throw new Error('schema with key or id "' + t2 + '" already exists');
      }
      function F(e2) {
        for (var t2 = n.copy(e2._opts), r2 = 0; r2 < m.length; r2++)
          delete t2[m[r2]];
        return t2;
      }
      function O(e2) {
        var t2 = e2._opts.logger;
        if (false === t2)
          e2.logger = { log: U, warn: U, error: U };
        else {
          if (void 0 === t2 && (t2 = console), !("object" == typeof t2 && t2.log && t2.warn && t2.error))
            throw new Error("logger must implement log, warn and error methods");
          e2.logger = t2;
        }
      }
      function U() {
      }
    }, { "./compile": "qdYs", "./compile/resolve": "w10T", "./cache": "fXCy", "./compile/schema_obj": "HHLG", "fast-json-stable-stringify": "Xb3N", "./compile/formats": "dfAH", "./compile/rules": "vBP0", "./data": "BunE", "./compile/util": "Q1F7", "./compile/async": "mNRF", "./keyword": "UVv5", "./compile/error_classes": "OtNE", "./refs/data.json": "xbmT", "./refs/json-schema-draft-07.json": "ve7q" }], "dhP9": [function(require2, module2, exports3) {
      var Buffer3 = require2("buffer").Buffer;
      var r = require2("buffer").Buffer, e = { Object, Array, Function, Number, String, Date, RegExp };
      module2.exports = function n(t) {
        return void 0 !== r && (e.Buffer = r), "undefined" != typeof Promise && (e.Promise = Promise), n.definition = { compile: function(r2) {
          if ("string" == typeof r2) {
            var e2 = i(r2);
            return function(r3) {
              return r3 instanceof e2;
            };
          }
          var n2 = r2.map(i);
          return function(r3) {
            for (var e3 = 0; e3 < n2.length; e3++)
              if (r3 instanceof n2[e3])
                return true;
            return false;
          };
        }, CONSTRUCTORS: e, metaSchema: { anyOf: [{ type: "string" }, { type: "array", items: { type: "string" } }] } }, t.addKeyword("instanceof", n.definition), t;
        function i(r2) {
          var n2 = e[r2];
          if (n2)
            return n2;
          throw new Error('invalid "instanceof" keyword value ' + r2);
        }
      };
    }, { "buffer": "dskh" }], "uBCt": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function e(n) {
        return e.definition = { type: "number", macro: function(e2, n2) {
          var r = e2[0], i = e2[1], o = n2.exclusiveRange;
          return function(e3, n3, r2) {
            if (void 0 !== r2 && "boolean" != typeof r2)
              throw new Error("Invalid schema for exclusiveRange keyword, should be boolean");
            if (e3 > n3 || r2 && e3 == n3)
              throw new Error("There are no numbers in range");
          }(r, i, o), true === o ? { exclusiveMinimum: r, exclusiveMaximum: i } : { minimum: r, maximum: i };
        }, metaSchema: { type: "array", minItems: 2, maxItems: 2, items: { type: "number" } } }, n.addKeyword("range", e.definition), n.addKeyword("exclusiveRange"), n;
      };
    }, {}], "AtCq": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function e(t) {
        return e.definition = { type: "string", inline: function(e2, t2, r) {
          return function() {
            try {
              if ("object" == typeof r)
                return new RegExp(r.pattern, r.flags);
              var e3 = r.match(/^\/(.*)\/([gimuy]*)$/);
              if (e3)
                return new RegExp(e3[1], e3[2]);
              throw new Error("cannot parse string into RegExp");
            } catch (t3) {
              throw console.error("regular expression", r, "is invalid"), t3;
            }
          }() + ".test(data" + (e2.dataLevel || "") + ")";
        }, metaSchema: { type: ["string", "object"], properties: { pattern: { type: "string" }, flags: { type: "string" } }, required: ["pattern"], additionalProperties: false } }, t.addKeyword("regexp", e.definition), t;
      };
    }, {}], "yoml": [function(require2, module2, exports3) {
      "use strict";
      var e = ["undefined", "string", "number", "object", "function", "boolean", "symbol"];
      module2.exports = function t(n) {
        return t.definition = { inline: function(e2, t2, n2) {
          var i = "data" + (e2.dataLevel || "");
          return "string" == typeof n2 ? "typeof " + i + ' == "' + n2 + '"' : (n2 = "validate.schema" + e2.schemaPath + "." + t2) + ".indexOf(typeof " + i + ") >= 0";
        }, metaSchema: { anyOf: [{ type: "string", enum: e }, { type: "array", items: { type: "string", enum: e } }] } }, n.addKeyword("typeof", t.definition), n;
      };
    }, {}], "FbE8": [function(require2, module2, exports3) {
      "use strict";
      var t = {}, n = { timestamp: function() {
        return Date.now();
      }, datetime: function() {
        return (/* @__PURE__ */ new Date()).toISOString();
      }, date: function() {
        return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      }, time: function() {
        return (/* @__PURE__ */ new Date()).toISOString().slice(11);
      }, random: function() {
        return Math.random();
      }, randomint: function(t2) {
        var n2 = t2 && t2.max || 2;
        return function() {
          return Math.floor(Math.random() * n2);
        };
      }, seq: function(n2) {
        var r = n2 && n2.name || "";
        return t[r] = t[r] || 0, function() {
          return t[r]++;
        };
      } };
      module2.exports = function t2(r) {
        return t2.definition = { compile: function(t3, n2, r2) {
          var i = {};
          for (var o in t3) {
            var u = t3[o], a = e("string" == typeof u ? u : u.func);
            i[o] = a.length ? a(u.args) : a;
          }
          return r2.opts.useDefaults && !r2.compositeRule ? function(n3) {
            for (var e2 in t3)
              void 0 !== n3[e2] && ("empty" != r2.opts.useDefaults || null !== n3[e2] && "" !== n3[e2]) || (n3[e2] = i[e2]());
            return true;
          } : function() {
            return true;
          };
        }, DEFAULTS: n, metaSchema: { type: "object", additionalProperties: { type: ["string", "object"], additionalProperties: false, required: ["func", "args"], properties: { func: { type: "string" }, args: { type: "object" } } } } }, r.addKeyword("dynamicDefaults", t2.definition), r;
        function e(t3) {
          var r2 = n[t3];
          if (r2)
            return r2;
          throw new Error('invalid "dynamicDefaults" keyword property value: ' + t3);
        }
      };
    }, {}], "CJDR": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function e(r) {
        return e.definition = { type: "object", macro: function(e2, r2) {
          if (!e2)
            return true;
          var t = Object.keys(r2.properties);
          return 0 == t.length || { required: t };
        }, metaSchema: { type: "boolean" }, dependencies: ["properties"] }, r.addKeyword("allRequired", e.definition), r;
      };
    }, {}], "n1DR": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function e(t) {
        return e.definition = { type: "object", macro: function(e2) {
          return 0 == e2.length || (1 == e2.length ? { required: e2 } : { anyOf: e2.map(function(e3) {
            return { required: [e3] };
          }) });
        }, metaSchema: { type: "array", items: { type: "string" } } }, t.addKeyword("anyRequired", e.definition), t;
      };
    }, {}], "XrCF": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function e(t) {
        return e.definition = { type: "object", macro: function(e2) {
          return 0 == e2.length || (1 == e2.length ? { required: e2 } : { oneOf: e2.map(function(e3) {
            return { required: [e3] };
          }) });
        }, metaSchema: { type: "array", items: { type: "string" } } }, t.addKeyword("oneRequired", e.definition), t;
      };
    }, {}], "MFGI": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function e(t) {
        return e.definition = { type: "object", macro: function(e2) {
          return 0 == e2.length || (1 == e2.length ? { not: { required: e2 } } : { not: { anyOf: e2.map(function(e3) {
            return { required: [e3] };
          }) } });
        }, metaSchema: { type: "array", items: { type: "string" } } }, t.addKeyword("prohibited", e.definition), t;
      };
    }, {}], "m7Ap": [function(require2, module2, exports3) {
      "use strict";
      var e = ["number", "integer", "string", "boolean", "null"];
      function r(r2, t) {
        return r2.map(function(r3) {
          var n = t.items && t.items.properties, i = n && n[r3] && n[r3].type;
          return Array.isArray(i) ? i.indexOf("object") < 0 && i.indexOf("array") < 0 : e.indexOf(i) >= 0;
        });
      }
      module2.exports = function e2(t) {
        return e2.definition = { type: "array", compile: function(e3, t2, n) {
          var i = n.util.equal, o = r(e3, t2);
          return function(r2) {
            if (r2.length > 1)
              for (var t3 = 0; t3 < e3.length; t3++) {
                var n2, f = e3[t3];
                if (o[t3]) {
                  var a = {};
                  for (n2 = r2.length; n2--; )
                    if (r2[n2] && "object" == typeof r2[n2]) {
                      var u = r2[n2][f];
                      if (!u || "object" != typeof u) {
                        if ("string" == typeof u && (u = '"' + u), a[u])
                          return false;
                        a[u] = true;
                      }
                    }
                } else
                  for (n2 = r2.length; n2--; )
                    if (r2[n2] && "object" == typeof r2[n2]) {
                      for (var p = n2; p--; )
                        if (r2[p] && "object" == typeof r2[p] && i(r2[n2][f], r2[p][f]))
                          return false;
                    }
              }
            return true;
          };
        }, metaSchema: { type: "array", items: { type: "string" } } }, t.addKeyword("uniqueItemProperties", e2.definition), t;
      };
    }, {}], "R4Fp": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = { metaSchemaRef: t };
      var e = "http://json-schema.org/draft-07/schema";
      function t(t2) {
        var a = t2._opts.defaultMeta;
        return "string" == typeof a ? { $ref: a } : t2.getSchema(e) ? { $ref: e } : (console.warn("meta schema not defined"), {});
      }
    }, {}], "kIuQ": [function(require2, module2, exports3) {
      "use strict";
      var e = require2("./_util");
      function r(e2, r2) {
        for (var i = e2.split("/"), o = {}, n = o, a = 1; a < i.length; a++) {
          var p = i[a], s = a == i.length - 1;
          p = t(p);
          var u = n.properties = {}, f = void 0;
          if (/[0-9]+/.test(p)) {
            var c = +p;
            for (f = n.items = []; c--; )
              f.push({});
          }
          n = s ? r2 : {}, u[p] = n, f && f.push(n);
        }
        return o;
      }
      function t(e2) {
        return e2.replace(/~1/g, "/").replace(/~0/g, "~");
      }
      module2.exports = function t2(i) {
        return t2.definition = { type: "object", macro: function(e2) {
          var t3 = [];
          for (var i2 in e2)
            t3.push(r(i2, e2[i2]));
          return { allOf: t3 };
        }, metaSchema: { type: "object", propertyNames: { type: "string", format: "json-pointer" }, additionalProperties: e.metaSchemaRef(i) } }, i.addKeyword("deepProperties", t2.definition), i;
      };
    }, { "./_util": "R4Fp" }], "KB8y": [function(require2, module2, exports3) {
      "use strict";
      function e(e2, t2) {
        var r2 = "data" + (t2 || "");
        if (!e2)
          return r2;
        for (var n2 = r2, o = e2.split("/"), u = 1; u < o.length; u++) {
          n2 += " && " + (r2 += i(a(o[u])));
        }
        return n2;
      }
      module2.exports = function t2(r2) {
        return t2.definition = { type: "object", inline: function(t3, r3, n2) {
          for (var i2 = "", a2 = 0; a2 < n2.length; a2++)
            a2 && (i2 += " && "), i2 += "(" + e(n2[a2], t3.dataLevel) + " !== undefined)";
          return i2;
        }, metaSchema: { type: "array", items: { type: "string", format: "json-pointer" } } }, r2.addKeyword("deepRequired", t2.definition), r2;
      };
      var t = /^[a-z$_][a-z$_0-9]*$/i, r = /^[0-9]+$/, n = /'|\\/g;
      function i(e2) {
        return r.test(e2) ? "[" + e2 + "]" : t.test(e2) ? "." + e2 : "['" + e2.replace(n, "\\$&") + "']";
      }
      function a(e2) {
        return e2.replace(/~1/g, "/").replace(/~0/g, "~");
      }
    }, {}], "KeB4": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, a, r) {
        var t = " ", s = e.level, o = e.dataLevel, i = e.schema[a], l = e.schemaPath + e.util.getProperty(a), u = e.errSchemaPath + "/" + a, d = !e.opts.allErrors, m = "data" + (o || ""), f = "valid" + s;
        if (t += "var " + f + " = undefined;", false === e.opts.format)
          return t += " " + f + " = true; ";
        var n = e.schema.format, h = e.opts.$data && n.$data, c = "";
        if (h) {
          t += " var " + (v = "format" + s) + " = formats[" + e.util.getData(n.$data, o, e.dataPathArr) + "] , " + (p = "compare" + s) + " = " + v + " && " + v + ".compare;";
        } else {
          var v;
          if (!(v = e.formats[n]) || !v.compare)
            return t += "  " + f + " = true; ";
          var p = "formats" + e.util.getProperty(n) + ".compare";
        }
        var g, P = "formatMaximum" == a, E = "formatExclusive" + (P ? "Maximum" : "Minimum"), x = e.schema[E], y = e.opts.$data && x && x.$data, S = P ? "<" : ">", $ = "result" + s, Q = e.opts.$data && i && i.$data;
        if (Q ? (t += " var schema" + s + " = " + e.util.getData(i.$data, o, e.dataPathArr) + "; ", g = "schema" + s) : g = i, y) {
          var b = e.util.getData(x.$data, o, e.dataPathArr), w = "exclusive" + s, A = "' + " + (M = "op" + s) + " + '";
          t += " var schemaExcl" + s + " = " + b + "; ", t += " if (typeof " + (b = "schemaExcl" + s) + " != 'boolean' && " + b + " !== undefined) { " + f + " = false; ";
          var D = E;
          (k = k || []).push(t), t = "", false !== e.createErrors ? (t += " { keyword: '" + (D || "_formatExclusiveLimit") + "' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(u) + " , params: {} ", false !== e.opts.messages && (t += " , message: '" + E + " should be boolean' "), e.opts.verbose && (t += " , schema: validate.schema" + l + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), t += " } ") : t += " {} ";
          var L = t;
          t = k.pop(), !e.compositeRule && d ? e.async ? t += " throw new ValidationError([" + L + "]); " : t += " validate.errors = [" + L + "]; return false; " : t += " var err = " + L + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " }  ", d && (c += "}", t += " else { "), Q && (t += " if (" + g + " === undefined) " + f + " = true; else if (typeof " + g + " != 'string') " + f + " = false; else { ", c += "}"), h && (t += " if (!" + p + ") " + f + " = true; else { ", c += "}"), t += " var " + $ + " = " + p + "(" + m + ",  ", t += Q ? "" + g : "" + e.util.toQuotedString(i), t += " ); if (" + $ + " === undefined) " + f + " = false; var " + w + " = " + b + " === true; if (" + f + " === undefined) { " + f + " = " + w + " ? " + $ + " " + S + " 0 : " + $ + " " + S + "= 0; } if (!" + f + ") var op" + s + " = " + w + " ? '" + S + "' : '" + S + "=';";
        } else {
          A = S;
          (w = true === x) || (A += "=");
          var M = "'" + A + "'";
          Q && (t += " if (" + g + " === undefined) " + f + " = true; else if (typeof " + g + " != 'string') " + f + " = false; else { ", c += "}"), h && (t += " if (!" + p + ") " + f + " = true; else { ", c += "}"), t += " var " + $ + " = " + p + "(" + m + ",  ", t += Q ? "" + g : "" + e.util.toQuotedString(i), t += " ); if (" + $ + " === undefined) " + f + " = false; if (" + f + " === undefined) " + f + " = " + $ + " " + S, w || (t += "="), t += " 0;";
        }
        t += c + "if (!" + f + ") { ";
        var k;
        D = a;
        (k = k || []).push(t), t = "", false !== e.createErrors ? (t += " { keyword: '" + (D || "_formatLimit") + "' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(u) + " , params: { comparison: " + M + ", limit:  ", t += Q ? "" + g : "" + e.util.toQuotedString(i), t += " , exclusive: " + w + " } ", false !== e.opts.messages && (t += " , message: 'should be " + A + ' "', t += Q ? "' + " + g + " + '" : "" + e.util.escapeQuotes(i), t += `"' `), e.opts.verbose && (t += " , schema:  ", t += Q ? "validate.schema" + l : "" + e.util.toQuotedString(i), t += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), t += " } ") : t += " {} ";
        L = t;
        return t = k.pop(), !e.compositeRule && d ? e.async ? t += " throw new ValidationError([" + L + "]); " : t += " validate.errors = [" + L + "]; return false; " : t += " var err = " + L + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += "}";
      };
    }, {}], "mYD7": [function(require2, module2, exports3) {
      "use strict";
      var t = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d:\d\d)?$/i, e = /t|\s/i, i = { date: n, time: o, "date-time": d }, r = { type: "object", required: ["$data"], properties: { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, additionalProperties: false };
      function a(t2) {
        var e2 = t2._formats;
        for (var r2 in i) {
          var a2 = e2[r2];
          ("object" != typeof a2 || a2 instanceof RegExp || !a2.validate) && (a2 = e2[r2] = { validate: a2 }), a2.compare || (a2.compare = i[r2]);
        }
      }
      function n(t2, e2) {
        if (t2 && e2)
          return t2 > e2 ? 1 : t2 < e2 ? -1 : t2 === e2 ? 0 : void 0;
      }
      function o(e2, i2) {
        if (e2 && i2 && (e2 = e2.match(t), i2 = i2.match(t), e2 && i2))
          return (e2 = e2[1] + e2[2] + e2[3] + (e2[4] || "")) > (i2 = i2[1] + i2[2] + i2[3] + (i2[4] || "")) ? 1 : e2 < i2 ? -1 : e2 === i2 ? 0 : void 0;
      }
      function d(t2, i2) {
        if (t2 && i2) {
          t2 = t2.split(e), i2 = i2.split(e);
          var r2 = n(t2[0], i2[0]);
          if (void 0 !== r2)
            return r2 || o(t2[1], i2[1]);
        }
      }
      module2.exports = function(t2) {
        var e2 = "format" + t2;
        return function i2(n2) {
          return i2.definition = { type: "string", inline: require2("./dotjs/_formatLimit"), statements: true, errors: "full", dependencies: ["format"], metaSchema: { anyOf: [{ type: "string" }, r] } }, n2.addKeyword(e2, i2.definition), n2.addKeyword("formatExclusive" + t2, { dependencies: ["format" + t2], metaSchema: { anyOf: [{ type: "boolean" }, r] } }), a(n2), n2;
        };
      };
    }, { "./dotjs/_formatLimit": "KeB4" }], "J927": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = require2("./_formatLimit")("Minimum");
    }, { "./_formatLimit": "mYD7" }], "dgLz": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = require2("./_formatLimit")("Maximum");
    }, { "./_formatLimit": "mYD7" }], "OTUE": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, r, a) {
        var t = " ", s = e.level, o = e.dataLevel, h = e.schema[r], i = e.schemaPath + e.util.getProperty(r), l = e.errSchemaPath + "/" + r, v = !e.opts.allErrors, n = "data" + (o || ""), d = "valid" + s, p = "key" + s, c = "idx" + s, u = "patternMatched" + s, m = "dataProperties" + s, P = "", f = e.opts.ownProperties;
        t += "var " + d + " = true;", f && (t += " var " + m + " = undefined;");
        var g = h;
        if (g)
          for (var y, E = -1, k = g.length - 1; E < k; ) {
            y = g[E += 1], t += " var " + u + " = false;  ", t += f ? " " + m + " = " + m + " || Object.keys(" + n + "); for (var " + c + "=0; " + c + "<" + m + ".length; " + c + "++) { var " + p + " = " + m + "[" + c + "]; " : " for (var " + p + " in " + n + ") { ", t += " " + u + " = " + e.usePattern(y) + ".test(" + p + "); if (" + u + ") break; } ";
            var b = e.util.escapeQuotes(y);
            t += " if (!" + u + ") { " + d + " = false;  var err =   ", false !== e.createErrors ? (t += " { keyword: 'patternRequired' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(l) + " , params: { missingPattern: '" + b + "' } ", false !== e.opts.messages && (t += " , message: 'should have property matching pattern \\'" + b + "\\'' "), e.opts.verbose && (t += " , schema: validate.schema" + i + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + n + " "), t += " } ") : t += " {} ", t += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; }   ", v && (P += "}", t += " else { ");
          }
        return t += "" + P;
      };
    }, {}], "u2zM": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function e(t) {
        return e.definition = { type: "object", inline: require2("./dotjs/patternRequired"), statements: true, errors: "full", metaSchema: { type: "array", items: { type: "string", format: "regex" }, uniqueItems: true } }, t.addKeyword("patternRequired", e.definition), t;
      };
    }, { "./dotjs/patternRequired": "OTUE" }], "mlCb": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function(e, r, a) {
        var s = " ", t = e.level, o = e.dataLevel, h = e.schema[r], l = e.schemaPath + e.util.getProperty(r), i = e.errSchemaPath + "/" + r, c = !e.opts.allErrors, v = "data" + (o || ""), n = "valid" + t, d = "errs__" + t, m = e.util.copy(e), p = "";
        m.level++;
        var u, f = "valid" + m.level, P = "ifPassed" + e.level, E = m.baseId;
        s += "var " + P + ";";
        var w = h;
        if (w)
          for (var y, b = -1, g = w.length - 1; b < g; ) {
            if (y = w[b += 1], b && !u && (s += " if (!" + P + ") { ", p += "}"), y.if && (e.opts.strictKeywords ? "object" == typeof y.if && Object.keys(y.if).length > 0 : e.util.schemaHasRules(y.if, e.RULES.all))) {
              s += " var " + d + " = errors;   ";
              var R = e.compositeRule;
              if (e.compositeRule = m.compositeRule = true, m.createErrors = false, m.schema = y.if, m.schemaPath = l + "[" + b + "].if", m.errSchemaPath = i + "/" + b + "/if", s += "  " + e.validate(m) + " ", m.baseId = E, m.createErrors = true, e.compositeRule = m.compositeRule = R, s += " " + P + " = " + f + "; if (" + P + ") {  ", "boolean" == typeof y.then) {
                if (false === y.then) {
                  (I = I || []).push(s), s = "", false !== e.createErrors ? (s += " { keyword: 'switch' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(i) + " , params: { caseIndex: " + b + " } ", false !== e.opts.messages && (s += ` , message: 'should pass "switch" keyword validation' `), e.opts.verbose && (s += " , schema: validate.schema" + l + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + v + " "), s += " } ") : s += " {} ";
                  var S = s;
                  s = I.pop(), !e.compositeRule && c ? e.async ? s += " throw new ValidationError([" + S + "]); " : s += " validate.errors = [" + S + "]; return false; " : s += " var err = " + S + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                }
                s += " var " + f + " = " + y.then + "; ";
              } else
                m.schema = y.then, m.schemaPath = l + "[" + b + "].then", m.errSchemaPath = i + "/" + b + "/then", s += "  " + e.validate(m) + " ", m.baseId = E;
              s += "  } else {  errors = " + d + "; if (vErrors !== null) { if (" + d + ") vErrors.length = " + d + "; else vErrors = null; } } ";
            } else if (s += " " + P + " = true;  ", "boolean" == typeof y.then) {
              if (false === y.then) {
                var I;
                (I = I || []).push(s), s = "", false !== e.createErrors ? (s += " { keyword: 'switch' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(i) + " , params: { caseIndex: " + b + " } ", false !== e.opts.messages && (s += ` , message: 'should pass "switch" keyword validation' `), e.opts.verbose && (s += " , schema: validate.schema" + l + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + v + " "), s += " } ") : s += " {} ";
                S = s;
                s = I.pop(), !e.compositeRule && c ? e.async ? s += " throw new ValidationError([" + S + "]); " : s += " validate.errors = [" + S + "]; return false; " : s += " var err = " + S + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
              }
              s += " var " + f + " = " + y.then + "; ";
            } else
              m.schema = y.then, m.schemaPath = l + "[" + b + "].then", m.errSchemaPath = i + "/" + b + "/then", s += "  " + e.validate(m) + " ", m.baseId = E;
            u = y.continue;
          }
        return s += p + "var " + n + " = " + f + ";";
      };
    }, {}], "KC2b": [function(require2, module2, exports3) {
      "use strict";
      var e = require2("./_util");
      module2.exports = function i(t) {
        if (!t.RULES.keywords.switch || !t.RULES.keywords.if) {
          var r = e.metaSchemaRef(t);
          return i.definition = { inline: require2("./dotjs/switch"), statements: true, errors: "full", metaSchema: { type: "array", items: { required: ["then"], properties: { if: r, then: { anyOf: [{ type: "boolean" }, r] }, continue: { type: "boolean" } }, additionalProperties: false, dependencies: { continue: ["if"] } } } }, t.addKeyword("switch", i.definition), t;
        }
      };
    }, { "./_util": "R4Fp", "./dotjs/switch": "mlCb" }], "mwue": [function(require2, module2, exports3) {
      "use strict";
      var e = require2("./_util");
      module2.exports = function r(t) {
        if (!t._opts.$data)
          return console.warn("keyword select requires $data option"), t;
        var a = e.metaSchemaRef(t), n = [];
        return r.definition = { validate: function e2(r2, t2, a2) {
          if (void 0 === a2.selectCases)
            throw new Error('keyword "selectCases" is absent');
          var n2 = o(a2, false), i2 = n2.cases[r2];
          if (void 0 === i2 && (i2 = n2.default), "boolean" == typeof i2)
            return i2;
          var s = i2(t2);
          return s || (e2.errors = i2.errors), s;
        }, $data: true, metaSchema: { type: ["string", "number", "boolean", "null"] } }, t.addKeyword("select", r.definition), t.addKeyword("selectCases", { compile: function(e2, r2) {
          var t2 = o(r2);
          for (var a2 in e2)
            t2.cases[a2] = i(e2[a2]);
          return function() {
            return true;
          };
        }, valid: true, metaSchema: { type: "object", additionalProperties: a } }), t.addKeyword("selectDefault", { compile: function(e2, r2) {
          return o(r2).default = i(e2), function() {
            return true;
          };
        }, valid: true, metaSchema: a }), t;
        function o(e2, r2) {
          var t2;
          return n.some(function(r3) {
            if (r3.parentSchema === e2)
              return t2 = r3, true;
          }), t2 || false === r2 || (t2 = { parentSchema: e2, cases: {}, default: true }, n.push(t2)), t2;
        }
        function i(e2) {
          return "boolean" == typeof e2 ? e2 : t.compile(e2);
        }
      };
    }, { "./_util": "R4Fp" }], "selR": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = function e(r) {
        var n = { trimLeft: function(e2) {
          return e2.replace(/^[\s]+/, "");
        }, trimRight: function(e2) {
          return e2.replace(/[\s]+$/, "");
        }, trim: function(e2) {
          return e2.trim();
        }, toLowerCase: function(e2) {
          return e2.toLowerCase();
        }, toUpperCase: function(e2) {
          return e2.toUpperCase();
        }, toEnumCase: function(e2, r2) {
          return r2.hash[t(e2)] || e2;
        } };
        return e.definition = { type: "string", errors: false, modifying: true, valid: true, compile: function(e2, r2) {
          var i;
          if (-1 !== e2.indexOf("toEnumCase")) {
            if (i = { hash: {} }, !r2.enum)
              throw new Error('Missing enum. To use `transform:["toEnumCase"]`, `enum:[...]` is required.');
            for (var o = r2.enum.length; o--; o) {
              var u = r2.enum[o];
              if ("string" == typeof u) {
                var s = t(u);
                if (i.hash[s])
                  throw new Error('Invalid enum uniqueness. To use `transform:["toEnumCase"]`, all values must be unique when case insensitive.');
                i.hash[s] = u;
              }
            }
          }
          return function(r3, t2, o2, u2) {
            if (o2) {
              for (var s2 = 0, a = e2.length; s2 < a; s2++)
                r3 = n[e2[s2]](r3, i);
              o2[u2] = r3;
            }
          };
        }, metaSchema: { type: "array", items: { type: "string", enum: ["trimLeft", "trimRight", "trim", "toLowerCase", "toUpperCase", "toEnumCase"] } } }, r.addKeyword("transform", e.definition), r;
        function t(e2) {
          return e2.toLowerCase();
        }
      };
    }, {}], "KP4Q": [function(require2, module2, exports3) {
      "use strict";
      module2.exports = { instanceof: require2("./instanceof"), range: require2("./range"), regexp: require2("./regexp"), typeof: require2("./typeof"), dynamicDefaults: require2("./dynamicDefaults"), allRequired: require2("./allRequired"), anyRequired: require2("./anyRequired"), oneRequired: require2("./oneRequired"), prohibited: require2("./prohibited"), uniqueItemProperties: require2("./uniqueItemProperties"), deepProperties: require2("./deepProperties"), deepRequired: require2("./deepRequired"), formatMinimum: require2("./formatMinimum"), formatMaximum: require2("./formatMaximum"), patternRequired: require2("./patternRequired"), switch: require2("./switch"), select: require2("./select"), transform: require2("./transform") };
    }, { "./instanceof": "dhP9", "./range": "uBCt", "./regexp": "AtCq", "./typeof": "yoml", "./dynamicDefaults": "FbE8", "./allRequired": "CJDR", "./anyRequired": "n1DR", "./oneRequired": "XrCF", "./prohibited": "MFGI", "./uniqueItemProperties": "m7Ap", "./deepProperties": "kIuQ", "./deepRequired": "KB8y", "./formatMinimum": "J927", "./formatMaximum": "dgLz", "./patternRequired": "u2zM", "./switch": "KC2b", "./select": "mwue", "./transform": "selR" }], "n1A8": [function(require2, module2, exports3) {
      "use strict";
      var r = require2("./keywords");
      function e(e2, t) {
        if (Array.isArray(t)) {
          for (var o = 0; o < t.length; o++)
            n(t[o])(e2);
          return e2;
        }
        if (t)
          return n(t)(e2), e2;
        for (t in r)
          n(t)(e2);
        return e2;
      }
      function n(e2) {
        var n2 = r[e2];
        if (!n2)
          throw new Error("Unknown keyword " + e2);
        return n2;
      }
      module2.exports = e, e.get = n;
    }, { "./keywords": "KP4Q" }], "STvH": [function(require2, module2, exports3) {
      "use strict";
      function r(r2) {
        if ("undefined" == typeof Symbol || null == r2[Symbol.iterator]) {
          if (Array.isArray(r2) || (r2 = n(r2))) {
            var t2 = 0, e2 = function() {
            };
            return { s: e2, n: function() {
              return t2 >= r2.length ? { done: true } : { done: false, value: r2[t2++] };
            }, e: function(r3) {
              throw r3;
            }, f: e2 };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var o2, a2, i2 = true, u2 = false;
        return { s: function() {
          o2 = r2[Symbol.iterator]();
        }, n: function() {
          var r3 = o2.next();
          return i2 = r3.done, r3;
        }, e: function(r3) {
          u2 = true, a2 = r3;
        }, f: function() {
          try {
            i2 || null == o2.return || o2.return();
          } finally {
            if (u2)
              throw a2;
          }
        } };
      }
      function t(r2) {
        return a(r2) || o(r2) || n(r2) || e();
      }
      function e() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function n(r2, t2) {
        if (r2) {
          if ("string" == typeof r2)
            return i(r2, t2);
          var e2 = Object.prototype.toString.call(r2).slice(8, -1);
          return "Object" === e2 && r2.constructor && (e2 = r2.constructor.name), "Map" === e2 || "Set" === e2 ? Array.from(e2) : "Arguments" === e2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e2) ? i(r2, t2) : void 0;
        }
      }
      function o(r2) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(r2))
          return Array.from(r2);
      }
      function a(r2) {
        if (Array.isArray(r2))
          return i(r2);
      }
      function i(r2, t2) {
        (null == t2 || t2 > r2.length) && (t2 = r2.length);
        for (var e2 = 0, n2 = new Array(t2); e2 < t2; e2++)
          n2[e2] = r2[e2];
        return n2;
      }
      Object.defineProperty(exports3, "__esModule", { value: true }), exports3.validate = y, Object.defineProperty(exports3, "ValidationError", { enumerable: true, get: function() {
        return c.default;
      } });
      var u = f(require2("./keywords/absolutePath")), c = f(require2("./ValidationError"));
      function f(r2) {
        return r2 && r2.__esModule ? r2 : { default: r2 };
      }
      var l = require2("ajv"), d = require2("ajv-keywords"), s = new l({ allErrors: true, verbose: true, $data: true });
      function y(r2, e2, n2) {
        var o2 = [];
        if (Array.isArray(e2) ? ((o2 = Array.from(e2, function(t2) {
          return h(r2, t2);
        })).forEach(function(r3, t2) {
          r3.forEach(function r4(e3) {
            e3.dataPath = "[".concat(t2, "]").concat(e3.dataPath), e3.children && e3.children.forEach(r4);
          });
        }), o2 = o2.reduce(function(r3, e3) {
          return r3.push.apply(r3, t(e3)), r3;
        }, [])) : o2 = h(r2, e2), o2.length > 0)
          throw new c.default(o2, r2, n2);
      }
      function h(r2, t2) {
        var e2 = s.compile(r2);
        return e2(t2) ? [] : e2.errors ? m(e2.errors) : [];
      }
      function m(t2) {
        var e2, n2 = [], o2 = r(t2);
        try {
          var a2 = function() {
            var r2 = e2.value, t3 = r2.dataPath, o3 = [];
            n2 = n2.filter(function(r3) {
              return !r3.dataPath.includes(t3) || (r3.children && (o3 = o3.concat(r3.children.slice(0))), r3.children = void 0, o3.push(r3), false);
            }), o3.length && (r2.children = o3), n2.push(r2);
          };
          for (o2.s(); !(e2 = o2.n()).done; )
            a2();
        } catch (i2) {
          o2.e(i2);
        } finally {
          o2.f();
        }
        return n2;
      }
      d(s, ["instanceof", "formatMinimum", "formatMaximum", "patternRequired"]), (0, u.default)(s);
    }, { "./keywords/absolutePath": "iIhC", "./ValidationError": "ySUA", "ajv": "hi5j", "ajv-keywords": "n1A8" }], "pA46": [function(require2, module2, exports3) {
      "use strict";
      var a = require2("./validate"), r = a.validate, i = a.ValidationError;
      module2.exports = { validate: r, ValidationError: i };
    }, { "./validate": "STvH" }], "t7hQ": [function(require2, module2, exports3) {
      function r(r2, n2) {
        return i(r2) || o(r2, n2) || e(r2, n2) || t();
      }
      function t() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function e(r2, t2) {
        if (r2) {
          if ("string" == typeof r2)
            return n(r2, t2);
          var e2 = Object.prototype.toString.call(r2).slice(8, -1);
          return "Object" === e2 && r2.constructor && (e2 = r2.constructor.name), "Map" === e2 || "Set" === e2 ? Array.from(e2) : "Arguments" === e2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e2) ? n(r2, t2) : void 0;
        }
      }
      function n(r2, t2) {
        (null == t2 || t2 > r2.length) && (t2 = r2.length);
        for (var e2 = 0, n2 = new Array(t2); e2 < t2; e2++)
          n2[e2] = r2[e2];
        return n2;
      }
      function o(r2, t2) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(r2)) {
          var e2 = [], n2 = true, o2 = false, i2 = void 0;
          try {
            for (var a2, u2 = r2[Symbol.iterator](); !(n2 = (a2 = u2.next()).done) && (e2.push(a2.value), !t2 || e2.length !== t2); n2 = true)
              ;
          } catch (l2) {
            o2 = true, i2 = l2;
          } finally {
            try {
              n2 || null == u2.return || u2.return();
            } finally {
              if (o2)
                throw i2;
            }
          }
          return e2;
        }
      }
      function i(r2) {
        if (Array.isArray(r2))
          return r2;
      }
      var a = require2("schema-utils"), u = a.validate;
      function l(r2, t2) {
        u(t2, r2);
      }
      function c(t2, e2) {
        for (var n2 = {}, o2 = 0, i2 = Object.entries(e2); o2 < i2.length; o2++) {
          var a2 = r(i2[o2], 2), u2 = a2[0], l2 = a2[1];
          n2[u2] = t2[u2], void 0 === n2[u2] && (n2[u2] = l2.default), l2.process && (n2[u2] = l2.process(n2[u2]));
        }
        return n2;
      }
      module2.exports = { validateOptions: l, processOptions: c };
    }, { "schema-utils": "pA46" }], "uYXM": [function(require2, module2, exports3) {
      module2.exports = { type: "object", properties: { filerDir: { type: "string" }, shimsDir: { type: "string" }, shimFs: { type: "boolean" }, shimPath: { type: "boolean" }, fsProvider: { type: "string" }, fsProviderDir: { type: "string" } } };
    }, {}], "qUtu": [function(require2, module2, exports3) {
      var process2 = require2("process");
      var e = require2("process"), r = require2("path"), s = "<rootDir>", o = e.cwd();
      module2.exports = { filerDir: { process: function(e2) {
        return e2 ? r.resolve(e2.replace(s, o)) : r.join(o, "node_modules", "filer");
      } }, shimsDir: { process: function(e2) {
        return e2 ? r.resolve(e2.replace(s, o)) : r.join(o, "node_modules", "filer", "shims");
      } }, fsProviderDir: { process: function(e2) {
        return e2 ? r.resolve(e2.replace(s, o)) : r.join(o, "node_modules", "filer", "shims", "providers");
      } }, shimFs: { default: true }, shimPath: { default: true }, fsProvider: { default: "default" } };
    }, { "path": "UUq2", "process": "pBGv" }], "Ge14": [function(require2, module2, exports3) {
      function e(e2, r2) {
        if (!(e2 instanceof r2))
          throw new TypeError("Cannot call a class as a function");
      }
      function r(e2, r2) {
        for (var i2 = 0; i2 < r2.length; i2++) {
          var o2 = r2[i2];
          o2.enumerable = o2.enumerable || false, o2.configurable = true, "value" in o2 && (o2.writable = true), Object.defineProperty(e2, o2.key, o2);
        }
      }
      function i(e2, i2, o2) {
        return i2 && r(e2.prototype, i2), o2 && r(e2, o2), e2;
      }
      var o = require2("path"), s = require2("./utils"), t = "filer-webpack-plugin", n = require2("./schema"), a = require2("./processors");
      module2.exports = function() {
        function r2() {
          var i2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          e(this, r2), s.validateOptions(i2, n), this.options = s.processOptions(i2, a);
        }
        return i(r2, [{ key: "apply", value: function(e2) {
          var r3 = this;
          e2.hooks.normalModuleFactory.tap(t, function(e3) {
            e3.hooks.resolve.tap(t, function(e4) {
              if ("fsProvider" === e4.request && e4.context === r3.options.shimsDir)
                return r3.resolveFsProvider(e4);
              if (!e4.context.startsWith(r3.options.filerDir))
                switch (e4.request) {
                  case "fs":
                    if (!r3.options.shimFs)
                      return;
                    return r3.applyFsShim(e4);
                  case "path":
                    if (!r3.options.shimPath)
                      return;
                    return r3.applyPathShim(e4);
                  default:
                    return;
                }
            });
          });
        } }, { key: "resolveFsProvider", value: function(e2) {
          switch (this.options.fsProvider) {
            case "default":
              e2.request = o.join(this.options.fsProviderDir, "default.js");
              break;
            case "indexeddb":
              e2.request = o.join(this.options.fsProviderDir, "indexeddb.js");
              break;
            case "memory":
              e2.request = o.join(this.options.fsProviderDir, "memory.js");
              break;
            case "custom":
              e2.request = o.join(this.options.fsProviderDir, "custom.js");
              break;
            default:
              throw new Error(["Invalid option for fsProvider.", "fsProvider must be one of 'default', 'indexeddb', 'memory' or 'custom'.", "If using a custom fsProvider, you must also provide the fsProviderDir option."].join(" "));
          }
        } }, { key: "applyFsShim", value: function(e2) {
          e2.request = o.join(this.options.shimsDir, "fs.js");
        } }, { key: "applyPathShim", value: function(e2) {
          e2.request = o.join(this.options.shimsDir, "path.js");
        } }]), r2;
      }();
    }, { "path": "UUq2", "./utils": "t7hQ", "./schema": "uYXM", "./processors": "qUtu" }], "Focm": [function(require2, module2, exports3) {
      var Buffer3 = require2("buffer").Buffer;
      var e = require2("buffer").Buffer, r = null, l = null;
      module2.exports = l = { FileSystem: require2("./filesystem/interface.js"), Buffer: e, Path: require2("./path.js"), path: require2("./path.js"), Errors: require2("./errors.js"), Shell: require2("./shell/shell.js"), FilerWebpackPlugin: require2("./webpack-plugin") }, Object.defineProperty(l, "fs", { enumerable: true, get: function() {
        return r || (r = new l.FileSystem()), r;
      } });
    }, { "./filesystem/interface.js": "GMi4", "./path.js": "UzoP", "./errors.js": "p8GN", "./shell/shell.js": "D1Ra", "./webpack-plugin": "Ge14", "buffer": "dskh" }] }, {}, ["Focm"], "Filer");
  }
});

// public/xen/js/core/FileSystem.ts
var FileSystem_exports = {};
__export(FileSystem_exports, {
  default: () => FileSystem_default
});
function makeProxy(dir = "/") {
  var proxy = new Proxy(file, {
    get(target, prop) {
      if (prop === "sh") {
        return target.sh;
      }
      if (prop === "cwd") {
        return () => dir;
      }
      if (prop === "exists") {
        return async (...a) => {
          try {
            await proxy.stat(...a);
            return true;
          } catch {
            return false;
          }
        };
      }
      if (prop === "openDir") {
        return async (path) => {
          path = Filer.path.resolve(
            dir,
            Filer.path.normalize(path)
          );
          if (!await proxy.exists(path)) {
            throw new Filer.Errors.EEXIST("no such file or directory", path);
          }
          return makeProxy(path);
        };
      }
      if (prop == "readFile") {
        return new Proxy(target[prop], {
          apply: async (target2, thisArg, args) => {
            args[0] = Filer.path.resolve(
              dir,
              Filer.path.normalize(args[0])
            );
            var result = await Reflect.apply(target2, thisArg, args);
            if (args[1] == "buffer") {
              return result.buffer;
            }
            if (args[1] == "string") {
              return Filer.Buffer.from(result).toString();
            }
            if (args[1] == "utf-8") {
              return new TextDecoder("utf-8").decode(result);
            }
            return result;
          }
        });
      }
      if (prop == "rmdir") {
        return new Proxy(target[prop], {
          apply: async (target2, thisArg, args) => {
            args[0] = Filer.path.resolve(
              dir,
              Filer.path.normalize(args[0])
            );
            try {
              return await Reflect.apply(target2, thisArg, args);
            } catch {
              await new Promise((resolve, reject) => {
                file.sh.rm(args[0], { recursive: true }, resolve);
              });
              return void 0;
            }
          }
        });
      }
      if (target[prop] instanceof Function) {
        return new Proxy(target[prop], {
          apply: (target2, thisArg, args) => {
            args[0] = Filer.path.resolve(
              dir,
              Filer.path.normalize(args[0])
            );
            return Reflect.apply(target2, thisArg, args);
          }
        });
      }
      return target[prop];
    }
  });
  return proxy;
}
var Filer, file, FileSystem_default;
var init_FileSystem = __esm({
  "public/xen/js/core/FileSystem.ts"() {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    Filer = require_filer_min();
    file = new Filer.FileSystem().promises;
    file.sh = new Filer.Shell(file);
    file.buffer = Filer.Buffer;
    FileSystem_default = makeProxy("/");
  }
});

// public/xen/js/core/WindowManager.ts
var require_WindowManager = __commonJS({
  "public/xen/js/core/WindowManager.ts"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var WindowManager = class {
      windows = [];
      init = async () => {
        window.addEventListener("xendrag", (e) => {
          const { id, x, y, type } = e.detail;
          const windowElement = document.getElementById(id);
          if (!windowElement)
            return;
          var dragTarget = windowElement.querySelector(".box-header-title");
          dragTarget?.dispatchEvent(
            new MouseEvent(type, {
              clientX: x,
              clientY: y,
              bubbles: true
            })
          );
        });
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
      createWindow = (title2, content, id, x = 0, y = 0, width = 0, height = 0, visible = true) => {
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
        titleLabel.innerText = title2;
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
          ...[
            "left",
            "top",
            "right",
            "bottom",
            "topLeft",
            "topRight",
            "bottomRight",
            "bottomLeft"
          ].map((direction) => {
            const div = document.createElement("div");
            div.classList.add(
              direction.includes("top") ? "resize" : "dresize",
              direction + "Resize"
            );
            return div;
          })
        );
        windowElement.style.display = visible ? "block" : "none";
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
            document.querySelectorAll(".drag iframe").forEach((iframe) => {
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
          ...Array.from(document.querySelectorAll(".box")).map(
            (e) => +(e.style.zIndex || 0)
          )
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
                var distTop = height > 70 ? parseInt(startTop.replace("px", "")) + (e.clientY - startY) : "";
                if (distTop < 0)
                  return master.style.top = "0px";
                master.style.height = (height > 70 ? height : 70) + "px";
                master.style.top = distTop + "px";
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
            document.querySelectorAll(".drag iframe").forEach(function(iframe) {
              iframe.style.pointerEvents = "none";
            });
            document.addEventListener("mousemove", mousemove);
          });
          document.addEventListener("mouseup", function(e) {
            if (!startX && !startY)
              return;
            master.style.transition = "";
            document.removeEventListener("mousemove", mousemove);
            document.querySelectorAll(".drag iframe").forEach(function(iframe) {
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
                var distTop = height > 70 ? parseInt(startTop.replace("px", "")) + (e.clientY - startY) : "";
                if (distTop < 0)
                  return master.style.top = "0px";
                master.style.height = (height > 70 ? height : 70) + "px";
                master.style.top = distTop + "px";
                master.style.width = (width > 70 ? width : 70) + "px";
                master.style.left = (width > 70 ? parseInt(startLeft.replace("px", "")) + (e.clientX - startX) : "") + "px";
              } else if (s == "topRight") {
                var height = parseInt(startHeight.replace("px", "")) - (e.clientY - startY);
                var width = parseInt(startWidth.replace("px", "")) + (e.clientX - startX);
                var distTop = height > 70 ? parseInt(startTop.replace("px", "")) + (e.clientY - startY) : "";
                if (distTop < 0)
                  return master.style.top = "0px";
                master.style.height = (height > 70 ? height : 70) + "px";
                master.style.top = distTop + "px";
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
            document.querySelectorAll(".drag iframe").forEach(function(iframe) {
              iframe.style.pointerEvents = "none";
            });
            document.addEventListener("mousemove", mousemove);
          });
          document.addEventListener("mouseup", function(e) {
            if (!startX && !startY)
              return;
            master.style.transition = "";
            document.removeEventListener("mousemove", mousemove);
            document.querySelectorAll(".drag iframe").forEach(function(iframe) {
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
    module.exports = WindowManager;
  }
});

// node_modules/path-browserify/index.js
var require_path_browserify = __commonJS({
  "node_modules/path-browserify/index.js"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
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
        var cwd2;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path;
          if (i >= 0)
            path = arguments[i];
          else {
            if (cwd2 === void 0)
              cwd2 = process_exports.cwd();
            path = cwd2;
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
    module.exports = posix;
  }
});

// public/xen/js/core/Loader.ts
var require_Loader = __commonJS({
  "public/xen/js/core/Loader.ts"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    var { join } = require_path_browserify();
    var ModuleLoader = class {
      load(module2) {
        return import(join("/xen/web/", module2)).then((imported) => {
          return imported.default.init();
        });
      }
      async init(...modules) {
        for (const module2 of modules) {
          await this.load(module2);
        }
        return true;
      }
    };
    module.exports = ModuleLoader;
  }
});

// node_modules/js-cookie/dist/js.cookie.js
var require_js_cookie = __commonJS({
  "node_modules/js-cookie/dist/js.cookie.js"(exports2, module) {
    init_dirname();
    init_buffer2();
    init_process2();
    (function(global, factory) {
      typeof exports2 === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, function() {
        var current = global.Cookies;
        var exports3 = global.Cookies = factory();
        exports3.noConflict = function() {
          global.Cookies = current;
          return exports3;
        };
      }());
    })(exports2, function() {
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

// public/xen/js/config.json
var require_config = __commonJS({
  "public/xen/js/config.json"(exports2, module) {
    module.exports = {
      bare: "https://tomp.app/"
    };
  }
});

// public/xen/js/core/Xen.ts
var require_Xen = __commonJS({
  "public/xen/js/core/Xen.ts"(exports2, module) {
    "use strict";
    init_dirname();
    init_buffer2();
    init_process2();
    init_dist();
    var { default: fs } = (init_FileSystem(), __toCommonJS(FileSystem_exports));
    var wm = require_WindowManager();
    var loader = require_Loader();
    var cookie = require_js_cookie();
    var config2 = require_config();
    window.path = require_path_browserify();
    var Xen2 = class {
      fs = fs;
      buffer = fs.buffer;
      wm = new wm();
      loader = new loader();
      bare = null;
      cookie = cookie;
      config = config2;
      taskbar;
      battery;
      apps;
      constructor() {
      }
      async Worker() {
        if ("serviceWorker" in navigator) {
          await navigator.serviceWorker.register("/xen/web/sw.bundle.js", {
            scope: "/"
          });
          await navigator.serviceWorker.ready;
        }
        if (!navigator.serviceWorker.controller) {
          location.reload();
        }
        return true;
      }
      async startup() {
        if (!navigator.serviceWorker.controller) {
          await this.Worker();
        }
        if (cookie.get("fs-initiated") !== "true") {
          await this.setupFileSystem();
          cookie.set("fs-initiated", "true", {
            expires: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 365 * 10),
            secure: true,
            sameSite: "strict"
          });
        }
        this.bare = await createBareClient(location.origin + "/bare/");
        await this.wm.init();
        await new Promise((resolve) => setTimeout(resolve, 150));
        window.EventTarget.prototype.addEventListener = new Proxy(
          window.EventTarget.prototype.addEventListener,
          {
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
          }
        );
        window.EventTarget.prototype.removeEventListeners = function(event) {
          if (!this.eventListeners)
            return;
          for (const listener of this.eventListeners.filter(
            ([type, listener2, options]) => type === event
          )) {
            this.removeEventListener(
              listener.type,
              listener.listener,
              listener.options
            );
          }
        };
        await this.loader.init(
          "components/apps.js",
          "components/taskbar.js",
          "components/battery.js",
          "components/cursor.js",
          "components/context.js",
          "components/pwa.js"
        );
        return;
      }
      async setupFileSystem() {
        const vfs = this.fs;
        try {
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
          await vfs.writeFile("/xen/system/taskbar/pinned.json", JSON.stringify([
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
            },
            {
              name: "App Store",
              id: "Xen/store"
            },
            {
              name: "Terminal",
              id: "Xen/terminal"
            }
          ]));
          await vfs.mkdir("/xen/system/apps");
          await vfs.mkdir("/xen/system/apps/Xen");
          await vfs.writeFile("/xen/system/apps/installed.json", JSON.stringify([]));
          await vfs.mkdir("/xen/system/assets");
          await vfs.writeFile(
            "/xen/system/assets/inject.bundle.js",
            await (await fetch("/xen/web/inject.bundle.js")).text()
          );
        } catch (e) {
          console.error(e);
        }
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
    module.exports = Xen2;
  }
});

// public/xen/js/entry.js
init_dirname();
init_buffer2();
init_process2();
var Xen = require_Xen();
window.xen = new Xen();
xen.loader.init(
  "components/error.js"
).then(() => {
  window.xen.startup().then(() => {
    console.log(
      "%cWelcome to XenOS",
      "color:black; background-color:white; padding:5px; border-radius: 5px; line-height: 26px; font-size:30px;"
    );
    window.xen.hideLoader();
  }).catch(window.xen.error.startup.bind(window.xen.error));
});
/*! Bundled license information:

@jspm/core/nodelibs/browser/buffer.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

js-cookie/dist/js.cookie.js:
  (*! js-cookie v3.0.5 | MIT *)
*/
