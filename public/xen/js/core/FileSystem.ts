import normalize from "path-normalize";

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

      super(types[type]);
    }
  };

  directory = class directory extends vfs {
    constructor(path: string = "") {
      super(path);
    }
  };

  get loading() {
    return caches.open("vfs");
  }

  async mkdir(path: string | undefined) {
    if (!path) throw new this.error(1);

    path = path.replace(/\/$/, "");

    const fs = await this.loading;

    var relURL = new URL(normalize(this.base.href + path)).pathname;
    var build = "/";

    for (var segment of relURL.split("/")) {
      if (!segment) continue;
      build += segment;

      if (build == "/") continue;
      if (build == path) continue;

      if (!(await this.exists(build))) await this.mkdir(build);

      build += "/";
    }

    await fs.put(
      new URL(normalize(this.base.href + path)),
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

    path = path.replace(/\/$/, "");

    const fs = await this.loading;

    const dir = await fs.match(new URL(normalize(this.base.href + path + "/")));
    if (!dir) throw new this.error(6);

    const detail = JSON.parse(dir.headers.get("x-detail") || "{}");
    if (detail.type != "directory") throw new this.error(7);

    return new this.directory(path);
  }

  async writeFile(
    path: string | undefined,
    content: Blob | string | any[],
    details: EntryDetail = {},
  ) {
    if (!path) throw new this.error(1);
    if (!content) throw new this.error(2);
    if (path == "/") throw new this.error(0);

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
      new URL(normalize(this.base.href + path)),
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

    path = path.replace(/\/$/, "");

    const fs = await this.loading;

    if (await fs.match(new URL(normalize(this.base.href + path)))) {
      return await fs
        .match(new URL(normalize(this.base.href + path)))
        .then((response: any) =>
          encoding == "utf-8" ? response.text() : response.blob(),
        );
    } else {
      throw new this.error(5);
    }
  }

  async unlink(path: string | undefined) {
    if (!path) throw new this.error(1);

    path = path.replace(/\/$/, "");

    const fs = await this.loading;

    await fs.delete(new URL(normalize(this.base.href + path)));

    return undefined;
  }

  async readdir(path: string | undefined) {
    if (!path) throw new this.error(1);

    path = path.replace(/\/$/, "");

    const fs = await this.loading;

    const dir = await fs.match(new URL(normalize(this.base.href + path)));
    if (!dir) throw new this.error(6);

    const detail = JSON.parse(dir.headers.get("x-detail") || "{}");
    if (detail.type != "directory") throw new this.error(7);

    const opened = await fs.keys();

    const files: string[] = [];

    for (const file of opened) {
      if (file.url.startsWith(new URL(normalize(this.base.href + path)).href)) {
        let relative = file.url
          .replace(new URL(normalize(this.base.href + path)).href, "")
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

    path = path.replace(/\/$/, "");

    try {
      await this.stat(path);

      return true;
    } catch {
      return false;
    }
  }

  async stat(path: string | undefined) {
    if (!path) throw new this.error(1);

    path = path.replace(/\/$/, "");

    const fs = await this.loading;

    const file = await fs.match(new URL(normalize(this.base.href + path)));
    if (!file) throw new this.error(5);

    const detail = JSON.parse(file.headers.get("x-detail") || "{}");

    return new EntryStat(detail, await file.blob());
  }
}

module.exports = vfs;
