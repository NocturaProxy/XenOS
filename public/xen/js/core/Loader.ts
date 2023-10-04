import { join } from "path-browserify";

class ModuleLoader {
  async load(module: string) {
    return await import(join("/xen/web/", module))
      .then((imported) => {
        return imported.default.init();
      })
      .catch((err) => {
        console.error(err);
        console.log(module);
      });
  }

  async init(...modules: string[]) {
    for (const module of modules) {
      await this.load(module);
    }

    return true;
  }
}

export default ModuleLoader;
