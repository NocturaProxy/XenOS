import Xen from "./core/Xen";

declare global {
  interface Window {
    xen: Xen;
    path: {
      normalize: (path: string) => string;
      resolve: (...paths: string[]) => string;
      join: (...paths: string[]) => string;
    };
  }
}

Object.defineProperty(window, "xen", {
  value: new Xen(),
  writable: true,
  enumerable: true,
  configurable: true,
});

window.xen.loader.init("components/error.js").then(() => {
  window.xen
    .startup()
    .then(() => {
      console.log(
        "%cWelcome to XenOS",
        "color:black; background-color:white; padding:5px; border-radius: 5px; line-height: 26px; font-size:30px;",
      );

      window.xen.hideLoader();
    })
    .catch(window.xen.error.startup.bind(window.xen.error));
});
