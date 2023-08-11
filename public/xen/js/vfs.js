import normalize from "path-normalize";

class vfs {
  normalize = normalize;

  constructor(path) {
    this.base = new URL(
      normalize(location.origin + (path || "").replace(/\/?$/, "/")),
    );
  }

  error = class VFSError extends Error {
    constructor(type) {
      var types = [
        /* Path Error */ "Invalid Path: /",
        /* Missing Path */ "Missing Required Argument: path",
        /* Missing Content */ "Missing Required Argument: content",
      ];

      return super(types[type]);
    }
  };

  directory = class directory extends vfs {
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
      new URL(normalize(this.base.href + path)),
      new Response(content, {
        headers: {
          "x-detail": JSON.stringify(details),
        },
      }),
    );

    return undefined;
  }

  async readFile(path) {
    if (!path) throw new this.error(1);

    const fs = await this.loading;

    return await fs.match(new URL(normalize(this.base.href + path)));
  }

  async unlink(path) {
    if (!path) throw new this.error(1);

    const fs = await this.loading;

    await fs.delete(new URL(normalize(this.base.href + path)));

    return undefined;
  }
}

export default vfs;
