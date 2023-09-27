import normalize from "path-normalize";
import Path from "path-browserify";

interface EntryDetail {
  type?: string;
  size?: number;
}

class EntryStat {
  content: Blob | null = null;
  length: number = 0;

  constructor(
    public detail: EntryDetail,
    public file: any,
  ) {
    this.detail = detail;

    if (!this.isDirectory()) {
      this.file = file;
      this.length = file.size;
    }
  }

  isDirectory() {
    return this.detail.type == "directory";
  }

  isFile() {
    return this.detail.type == "file";
  }
}

class vfs {
  normalize: Function = normalize;
  base: URL;

  constructor(path: string = "") {
    this.base = new URL(
      normalize(location.origin + (path || "").replace(/\/?$/, "/")),
    );
  }

  error = class VFSError extends Error {
    constructor(type: number) {
      var types = [
        /* 0: Path Error */ "Invalid Path: /",
        /* 1: Missing Path */ "Missing Required Argument: path",
        /* 2: Missing Content */ "Missing Required Argument: content",
        /* 3: Dir Exists */ "Directory Already Exists",
        /* 4: File Exists */ "File Already Exists",
        /* 5: Not Found */ "File Not Found",
        /* 6: Dir Does Not Exist */ "Directory Does Not Exist",
        /* 7: Not A Directory */ "Not A Directory",
        /* 8: Not A File */ "Not A File",
        /* 9: Directory Path Nonexistent */ "Directory Path Nonexistent",
      ];

      super(`FILESYSTEM_ERR_${type}: ${types[type]}`);
    }
  };

  directory = class directory extends vfs {
    constructor(path: string = "", public parent: vfs = new vfs()) {
      super(path);
    }
  };

  #getPath(path: string | undefined = "") {
    return new URL(
        new URL(
          this.base.origin + Path.normalize(Path.resolve(this.base.pathname, path))
        ).href.replace(/(.+)\/?$/, "$1")
    );
  }

  get loading() {
    return caches.open("vfs").then(async cache => {
      if (!await cache.match(new URL(location.origin + "/")))
        await cache.put(new URL(location.origin + "/"), new Response(null, {
          headers: {
            "x-detail": JSON.stringify({
              type: "directory",
            }),
          },
        }));

      return cache;
    });
  }

  parent: any;

  async mkdir(path: string | undefined) {
    if (!path) throw new this.error(1);

    const fs = await this.loading;

    var relURL = this.#getPath(path).pathname;
    var build = "/";

    for await (var segment of relURL.split("/")) {
      if (!segment) continue;
      build += segment;

      if (build == "/") continue;
      if (build == path) continue;

      if (!(await this.exists(build))) await (this.parent || this).mkdir(build);

      build += "/";
    }

    await fs.put(
      this.#getPath(path),
      new Response(null, {
        headers: {
          "x-detail": JSON.stringify({
            type: "directory",
          }),
        },
      }),
    );

    return undefined;
  }

  async openDir(path: string | undefined) {
    if (!path) throw new this.error(1);

    const fs = await this.loading;

    const dir = await fs.match(this.#getPath(path));
    if (!dir) throw new this.error(6);

    const detail = JSON.parse(dir.headers.get("x-detail") || "{}");
    if (detail.type != "directory") throw new this.error(7);

    path = this.#getPath(path).pathname;

    return new this.directory(path);
  }

  async writeFile(
    path: string | undefined,
    content: Blob | string | any[],
    details: EntryDetail = {},
  ) {
    if (!path) throw new this.error(1);
    if (typeof content == "undefined") throw new this.error(2);
    if (path == "/") throw new this.error(0);

    if (!await this.exists(Path.dirname(path))) await this.mkdir(Path.dirname(path));

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
    } else if (typeof content == "number") {
      contentType = "text/plain";
      content = new Blob([`${content}`]);
    }

    details.type = "file";

    await fs.put(
      this.#getPath(path),
      new Response(content, {
        headers: {
          "x-detail": JSON.stringify(details),
          "content-length": content.size.toString(),
          "content-type": contentType,
        },
      }),
    );

    return undefined;
  }

  async readFile(path: string | undefined, encoding: string | null = null) {
    if (!path) throw new this.error(1);

    const fs = await this.loading;

    if (await fs.match(this.#getPath(path))) {
      return await fs
        .match(this.#getPath(path))
        .then((response: any) =>
          encoding == "utf-8" ? response.text() : response.blob(),
        );
    } else {
      throw new this.error(5);
    }
  }

  async unlink(path: string | undefined) {
    if (!path) throw new this.error(1);

    const fs = await this.loading;

    const file = await fs.match(this.#getPath(path));

    if (!file) throw new this.error(5);

    const detail = JSON.parse(file.headers.get("x-detail") || "{}");

    if (detail.type === "directory") {
      // delete recursive every directory

      const opened = await fs.keys();

      for (const file of opened) {
        if (file.url.startsWith(this.#getPath(path).href)) {
          await fs.delete(file.url);
        }
      }
    }

    await fs.delete(this.#getPath(path));

    return undefined;
  }

  async readdir(path: string | undefined) {
    if (!path) throw new this.error(1);

    const fs = await this.loading;

    const dir = await fs.match(this.#getPath(path));
    if (!dir) throw new this.error(6);

    const detail = JSON.parse(dir.headers.get("x-detail") || "{}");
    if (detail.type != "directory") throw new this.error(7);

    const opened = await fs.keys();

    const files: string[] = [];

    for (const file of opened) {
      if (file.url.startsWith(this.#getPath(path).href)) {
        let relative = file.url
          .replace(this.#getPath(path).href, "")
          .replace(/^\//, "");

        if (!relative) continue;
        if (relative.split("/").length > 1) relative = relative.split("/")[0];
        if (files.includes(relative)) continue;

        files.push(relative);
      }
    }

    return files;
  }

  async exists(path: string | undefined) {
    if (!path) throw new this.error(1);

    try {
      await this.stat(path);

      return true;
    } catch {
      return false;
    }
  }

  async stat(path: string | undefined) {
    if (!path) throw new this.error(1);

    const fs = await this.loading;

    const file = await fs.match(this.#getPath(path));
    if (!file) throw new this.error(5);

    const detail = JSON.parse(file.headers.get("x-detail") || "{}");

    return new EntryStat(detail, await file.blob());
  }
}

module.exports = vfs;