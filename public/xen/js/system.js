import FS from "./vfs";
import Mutation from "@dynamic-pkg/mutation";

export default class Xen {
  wait(ms) {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve();
      }, ms);
    });
  }

  constructor(...modules) {
    console.log("XEN: Startup");

    this.fs = new FS("/");

    this.startup = new Promise(async (resolve) => {
      const comm = document.getElementById("os-pre-text2");

      while (document.readyState !== "complete") {
        // wait for every script/image on the page to load before moving foward

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
                setTimeout(fail, 5000),
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

      // Load components asynchronously

      for (var module of modules) {
        await this.load(module);
        console.debug("Loaded Module", module);
        continue;
      }

      comm.innerText = "Downloading apps and content";

      // Load apps asynchronously

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
}
