import "../../../modules.d.ts";

import Filer from "filer";
const file = new Filer.FileSystem().promises;
file.sh = new Filer.Shell(file);
file.buffer = Filer.Buffer;

function makeProxy(dir = "/") {
  const proxy = new Proxy(file, {
    get(target, prop) {
      if (prop === "sh") {
        return target.sh;
      }

      if (prop === "cwd") {
        return () => dir;
      }

      if (prop === "exists") {
        return async (...a: NonNullable<unknown>[]) => {
          try {
            await proxy.stat(...a);

            return true;
          } catch {
            return false;
          }
        };
      }

      if (prop === "openDir") {
        return async (path: string) => {
          path = Filer.path.resolve(dir, Filer.path.normalize(path));

          if (!(await proxy.exists(path))) {
            throw new Filer.Errors.EEXIST("no such file or directory", path);
          }

          return makeProxy(path);
        };
      }

      if (prop == "readFile") {
        return new Proxy(target[prop], {
          apply: async (target, thisArg, args) => {
            args[0] = Filer.path.resolve(dir, Filer.path.normalize(args[0]));

            const result: Uint8Array = await Reflect.apply(
              target,
              thisArg,
              args,
            );

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
          },
        });
      }

      if (prop == "rmdir") {
        return new Proxy(target[prop], {
          apply: async (target, thisArg, args) => {
            args[0] = Filer.path.resolve(dir, Filer.path.normalize(args[0]));

            try {
              return await Reflect.apply(target, thisArg, args);
            } catch {
              await new Promise((resolve, reject) => {
                file.sh.rm(args[0], { recursive: true }, resolve, reject);
              });

              return undefined;
            }
          },
        });
      }

      if (target[prop] instanceof Function) {
        return new Proxy(target[prop], {
          apply: (target, thisArg, args) => {
            args[0] = Filer.path.resolve(dir, Filer.path.normalize(args[0]));

            return Reflect.apply(target, thisArg, args);
          },
        });
      }

      return target[prop];
    },
  });

  return proxy;
}

export default makeProxy("/");
