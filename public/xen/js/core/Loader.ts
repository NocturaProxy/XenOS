const { join } = require("path-browserify");

class ModuleLoader {
  load(module: string) {
    return import(join("/xen/web/", module)).then((imported) => {
      return imported.default.init();
    });
  }

  async init(...modules: string[]) {
    for (const module of modules) {
      await this.load(module);
    }

    return true;
  }
}

module.exports = ModuleLoader;
