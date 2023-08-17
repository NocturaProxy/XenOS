const { join } = require("path-browserify");

class ModuleLoader {
    load(module: string) {
        return import(
            join(
                "../js", 
                module
            )
        ).then(imported => {
            return imported.default.init();
        });
    }

    async init(...modules: string[]) {
        await Promise.allSettled(
            modules.map(module => this.load(module))
        );

        return true;
    }
}

module.exports = ModuleLoader;