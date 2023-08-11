import { v4 as uuid } from "@lukeed/uuid";

class Window {
  constructor(details) {
    Object.entries(
      Object.assign(details, {
        name: "Unknown",
        icon: undefined,
        width: 500,
        height: 400,
        x: 0,
        y: 0,
      }),
    ).forEach(([name, value]) => (this[name] = value));

    this.id = this.createID();
    this.containers = this.initializeContainer();
    this.iframe = this.initializeFrame();

    this.containers[1].appendChild(this.iframe);

    console.log(this.containers);
  }

  createID() {
    return uuid();
  }

  createElement(tag, classList, id) {
    const el = document.createElement(tag);

    el.classList.add(...classList);
    el.id = id;

    return el;
  }

  initializeContainer() {
    const el = this.createElement(
      "div",
      ["xen-window-container", this.id],
      this.id,
    );
    const content = this.createElement(
      "div",
      ["xen-window-content", this.id],
      "",
    );

    const controls = this.createElement(
      "div",
      ["xen-window-controls", this.id],
      "",
    );
    const maximize = this.createElement(
      "span",
      ["xen-window-maximize", this.id],
      "",
    );
    const minimize = this.createElement(
      "span",
      ["xen-window-minimize", this.id],
      "",
    );
    const close = this.createElement("span", ["xen-window-close", this.id], "");

    controls.append(maximize, minimize, close);
    el.appendChild(controls);
    el.appendChild(content);

    return [el, content];
  }

  initializeFrame() {
    const el = this.createElement("iframe", ["xen-window-frame", this.id], "");

    el.style.background = "black";

    return el;
  }
}

export default new (class WindowComponent {
  constructor() {
    window.xen.constructor.prototype.WindowComponent = this.constructor;
    window.xen.windows = this;
  }

  register(
    cfg = {
      name: "Unknown",
      icon: undefined,
      width: 500,
      height: 400,
      x: 0,
      y: 0,
      element: null,
    },
  ) {
    return new Window(cfg, cfg.element);
  }
})();
