class WindowManager {
  windows = [];

  init = async () => {
    // Initialize window management data structures
  };

  getCloseSVG() {
    return `<svg style="width: 13px;height: 13px;" xmlns="http://www.w3.org/2000/svg" width="188" height="185" viewBox="0 0 188 185" fill="none">
      <rect width="188" height="185" rx="92.5" fill="#F46868"></rect>
    </svg>`;
  }

  getMiniSVG() {
    return `<svg style="width: 13px;height: 13px;" xmlns="http://www.w3.org/2000/svg" width="188" height="185" viewBox="0 0 188 185" fill="none">
      <rect width="188" height="185" rx="92.5" fill="#ffcd5b"></rect>
    </svg>`;
  }

  getFullSVG() {
    return `<svg style="width: 13px;height: 13px;" xmlns="http://www.w3.org/2000/svg" width="188" height="185" viewBox="0 0 188 185" fill="none">
      <rect width="188" height="185" rx="92.5" fill="rgb(64 190 64)"></rect>
    </svg>`;
  }

  createWindow = (
    title: string,
    content: HTMLElement,
    id: string,
    x: number = 0,
    y: number = 0,
    width: number = 0,
    height: number = 0,
    visible: boolean = true,
  ) => {
    const windowElement = document.createElement("div");
    windowElement.classList.add("drag", "box");

    windowElement.id = id;
    windowElement.style.left = `${x}px`;
    windowElement.style.top = `${y}px`;
    windowElement.style.width = `${width}px`;
    windowElement.style.height = `${height}px`;

    const titleBar = document.createElement("div");
    titleBar.classList.add("box-header");

    const titleLabel = document.createElement("div");
    titleLabel.classList.add("box-header-title");
    titleLabel.innerText = title;

    const minimizeButton = document.createElement("span");
    minimizeButton.classList.add("os-mini");
    minimizeButton.innerHTML = this.getMiniSVG();
    minimizeButton.addEventListener("click", () => {
      this.minimizeWindow(id);
    });

    const closeButton = document.createElement("span");
    closeButton.classList.add("os-exit");
    closeButton.innerHTML = this.getCloseSVG();
    closeButton.addEventListener("click", () => {
      window.xen.apps.close(id, windowElement);
    });

    const fullscreenButton = document.createElement("span");
    fullscreenButton.classList.add("os-full");
    fullscreenButton.innerHTML = this.getFullSVG();
    fullscreenButton.addEventListener("click", () => {
      this.fullscreen(id);
    });

    const innerBody = document.createElement("div");
    innerBody.classList.add("box-body-inner");
    innerBody.appendChild(content);

    titleBar.appendChild(titleLabel);
    titleLabel.appendChild(minimizeButton);
    titleLabel.appendChild(closeButton);
    titleLabel.appendChild(fullscreenButton);

    windowElement.append(
      titleBar,
      innerBody,
      ...[
        "left",
        "top",
        "right",
        "bottom",
        "topLeft",
        "topRight",
        "bottomRight",
        "bottomLeft",
      ].map((direction) => {
        const div = document.createElement("div");
        div.classList.add(
          direction.includes("top") ? "resize" : "dresize",
          direction + "Resize",
        );
        return div;
      }),
    );

    windowElement.style.display = visible ? "block" : "none";

    this.resizeListener(windowElement);

    document.getElementById("os-desktop")?.appendChild(windowElement);
    window.xen.wm.windows.push(windowElement);

    const drag = windowElement.querySelector(".box-header-title");

    drag?.addEventListener("mousedown", (e: any) => {
      const box = windowElement.getBoundingClientRect();
      const titleBox = titleBar.getBoundingClientRect();
      const offsetX = e.clientX - box.left;
      const offsetY = e.clientY - box.top;

      this.focus(id);

      if (
        document.querySelector(".os-mini")?.contains(e.target) ||
        document.querySelector(".os-full")?.contains(e.target) ||
        document.querySelector(".os-exit")?.contains(e.target)
      )
        return false;

      if (windowElement.dataset.mini === "true") return false;

      document.querySelectorAll(".drag iframe").forEach((iframe: any) => {
        iframe.style.pointerEvents = "none";
      });

      const mouseMoveHandler = (e: MouseEvent) => {
        requestAnimationFrame(() => {
          let left = e.clientX - offsetX;
          let top = e.clientY - offsetY;

          if (e.clientX < 0) {
            left = 0;
          }

          if (e.clientY < 0) {
            top = 0;
          }

          if (left > window.innerWidth) {
            left = window.innerWidth - box.width;
          }

          if (top > window.innerHeight) {
            top = window.innerHeight - box.height;
          }

          windowElement.style.left = `${left}px`;
          windowElement.style.top = `${top}px`;
        });
      };

      const mouseUpHandler = (e: any) => {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);

        let top = e.clientY - offsetY;

        if (top + titleBox.height > window.innerHeight) {
          windowElement.style.top = `${window.innerHeight - titleBox.height}px`;
        }

        if (top < 0) {
          windowElement.style.top = `0px`;
        }

        document.querySelectorAll(".drag iframe").forEach((iframe: any) => {
          iframe.style.pointerEvents = "auto";
        });
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    });

    return windowElement;
  };

  focus(id: string) {
    const elem = document.getElementById(id);

    if (!elem) return;

    const zIndex =
      Math.max(
        ...Array.from(document.querySelectorAll(".box")).map(
          (e: any) => +(e.style.zIndex || 0),
        ),
      ) || 0;

    elem.style.zIndex = `${zIndex + 1}`;
  }

  resizeListener(master: HTMLElement) {
    var left = master.querySelector(".leftResize"),
      right = master.querySelector(".rightResize"),
      top = master.querySelector(".topResize"),
      bottom = master.querySelector(".bottomResize");

    var topLeft = master.querySelector(".topLeftResize"),
      topRight = master.querySelector(".topRightResize"),
      bottomLeft = master.querySelector(".bottomLeftResize"),
      bottomRight = master.querySelector(".bottomRightResize");

    [left, right, top, bottom].forEach((side, index) => {
      var s = ["left", "right", "top", "bottom"][index];

      var startX: any;
      var startY: any;
      var computed: any;
      var startHeight: any;
      var startWidth: any;
      var startTop: any;
      var startLeft: any;

      var mousemove = function (e: MouseEvent) {
        requestAnimationFrame(() => {
          if (s == "top") {
            var height =
              parseInt(startHeight.replace("px", "")) - (e.clientY - startY);
            var distTop: any =
              height > 70
                ? parseInt(startTop.replace("px", "")) + (e.clientY - startY)
                : "";
            if (distTop < 0) return (master.style.top = "0px");

            master.style.height = (height > 70 ? height : 70) + "px";
            master.style.top = distTop + "px";
          } else if (s == "bottom") {
            var height =
              parseInt(startHeight.replace("px", "")) + (e.clientY - startY);
            master.style.height = (height > 70 ? height : 70) + "px";
            master.style.top = startTop;
          } else if (s == "left") {
            var width =
              parseInt(startWidth.replace("px", "")) - (e.clientX - startX);
            master.style.width = (width > 70 ? width : 70) + "px";
            master.style.left =
              (width > 70
                ? parseInt(startLeft.replace("px", "")) + (e.clientX - startX)
                : "") + "px";
          } else if (s == "right") {
            var width =
              parseInt(startWidth.replace("px", "")) + (e.clientX - startX);
            master.style.width = (width > 70 ? width : 70) + "px";
            master.style.left = startLeft;
          }
        });
      };

      document.addEventListener("mousedown", function (e) {
        if (e.target !== side) return;

        computed = window.getComputedStyle(master);

        startHeight = computed.height + "";
        startWidth = computed.width + "";
        startTop = computed.top + "";
        startLeft = computed.left + "";

        startX = e.clientX;
        startY = e.clientY;

        master.style.transition = "0s";

        document.querySelectorAll(".drag iframe").forEach(function (
          iframe: any,
        ) {
          iframe.style.pointerEvents = "none";
        });

        document.addEventListener("mousemove", mousemove);
      });

      document.addEventListener("mouseup", function (e) {
        if (!startX && !startY) return;

        master.style.transition = "";

        document.removeEventListener("mousemove", mousemove);

        document.querySelectorAll(".drag iframe").forEach(function (
          iframe: any,
        ) {
          iframe.style.pointerEvents = "all";
        });
      });
    });

    [topLeft, topRight, bottomLeft, bottomRight].forEach((side, index) => {
      var s = ["topLeft", "topRight", "bottomLeft", "bottomRight"][index];

      var startX: any;
      var startY: any;
      var computed: any;
      var startHeight: any;
      var startWidth: any;
      var startTop: any;
      var startLeft: any;

      var mousemove = function (e: MouseEvent) {
        requestAnimationFrame(() => {
          if (s == "topLeft") {
            var height =
              parseInt(startHeight.replace("px", "")) - (e.clientY - startY);
            var width =
              parseInt(startWidth.replace("px", "")) - (e.clientX - startX);
            var distTop: any =
              height > 70
                ? parseInt(startTop.replace("px", "")) + (e.clientY - startY)
                : "";
            if (distTop < 0) return (master.style.top = "0px");

            master.style.height = (height > 70 ? height : 70) + "px";
            master.style.top = distTop + "px";
            master.style.width = (width > 70 ? width : 70) + "px";
            master.style.left =
              (width > 70
                ? parseInt(startLeft.replace("px", "")) + (e.clientX - startX)
                : "") + "px";
          } else if (s == "topRight") {
            var height =
              parseInt(startHeight.replace("px", "")) - (e.clientY - startY);
            var width =
              parseInt(startWidth.replace("px", "")) + (e.clientX - startX);
            var distTop: any =
              height > 70
                ? parseInt(startTop.replace("px", "")) + (e.clientY - startY)
                : "";
            if (distTop < 0) return (master.style.top = "0px");

            master.style.height = (height > 70 ? height : 70) + "px";
            master.style.top = distTop + "px";
            master.style.width = (width > 70 ? width : 70) + "px";
            master.style.left = startLeft;
          } else if (s == "bottomLeft") {
            var height =
              parseInt(startHeight.replace("px", "")) + (e.clientY - startY);
            var width =
              parseInt(startWidth.replace("px", "")) - (e.clientX - startX);
            master.style.height = (height > 70 ? height : 70) + "px";
            master.style.top = startTop;
            master.style.width = (width > 70 ? width : 70) + "px";
            master.style.left =
              (width > 70
                ? parseInt(startLeft.replace("px", "")) + (e.clientX - startX)
                : "") + "px";
          } else if (s == "bottomRight") {
            var height =
              parseInt(startHeight.replace("px", "")) + (e.clientY - startY);
            var width =
              parseInt(startWidth.replace("px", "")) + (e.clientX - startX);
            master.style.height = (height > 70 ? height : 70) + "px";
            master.style.top = startTop;
            master.style.width = (width > 70 ? width : 70) + "px";
            master.style.left = startLeft;
          }
        });
      };

      document.addEventListener("mousedown", function (e: any) {
        if (e.target !== side) return;

        computed = window.getComputedStyle(master);

        startHeight = computed.height + "";
        startWidth = computed.width + "";
        startTop = computed.top + "";
        startLeft = computed.left + "";

        startX = e.clientX;
        startY = e.clientY;

        master.style.transition = "0s";

        document.querySelectorAll(".drag iframe").forEach(function (
          iframe: any,
        ) {
          iframe.style.pointerEvents = "none";
        });

        document.addEventListener("mousemove", mousemove);
      });

      document.addEventListener("mouseup", function (e) {
        if (!startX && !startY) return;

        master.style.transition = "";

        document.removeEventListener("mousemove", mousemove);

        document.querySelectorAll(".drag iframe").forEach(function (
          iframe: any,
        ) {
          iframe.style.pointerEvents = "all";
        });
      });
    });
  }

  minimizeWindow = (id: string) => {
    const windowElement = document.getElementById(id);

    if (!windowElement) return false;

    windowElement.style.transform = "scale(0.15)";
    windowElement.style.transition = "all 0.7s ease";
    windowElement.dataset.mini = "true";

    windowElement.querySelectorAll("*").forEach((element: any) => {
      element.style.pointerEvents = "none";
    });

    const bounds = windowElement.getBoundingClientRect();

    if (bounds.top > window.innerHeight - 310) {
      windowElement.style.top = window.innerHeight - 310 + "px";
    }

    if (bounds.top < -193) {
      windowElement.style.top = -193 + "px";
    }

    if (bounds.left < -275) {
      windowElement.style.left = -275 + "px";
    }

    if (bounds.left > window.innerWidth - 425) {
      windowElement.style.left = window.innerWidth - 425 + "px";
    }

    setTimeout(() => (windowElement.style.transition = ""), 700);

    // moving stuff kinda breaks when transform scale(0.15);

    const down = (e: any) => {
      if (e.which !== 1) return;

      let startX = e.clientX - e.target.offsetLeft;
      let startY = e.clientY - e.target.offsetTop;

      function move(event: any) {
        if (windowElement?.dataset.fullscreen === "true") return;

        let left = event.clientX - startX;
        let top = event.clientY - startY;

        if (top < -193) top = -193;
        if (left < -275) left = -275;
        if (left > window.innerWidth - 425) left = window.innerWidth - 425;
        if (top > window.innerHeight - 310) top = window.innerHeight - 310;

        requestAnimationFrame(() => {
          e.target.style.position = `absolute`;
          e.target.style.top = `${top}px`;
          e.target.style.left = `${left}px`;
        });
      }

      const up = (event: any) => {
        // Unminimizing logic

        if (event.clientX === e.clientX && event.clientY === e.clientY) {
          windowElement.style.transform = "scale(1)";
          windowElement.dataset.mini = "false";

          windowElement.style.transition = "all 0.7s ease";

          windowElement.querySelectorAll("*").forEach((element: any) => {
            element.style.pointerEvents = "auto";
          });

          if (parseInt(windowElement.style.top.replace("px", "")) < 0)
            windowElement.style.top = "0";

          setTimeout(() => (windowElement.style.transition = ""), 700);

          windowElement.removeEventListener("mousedown", down);
        }

        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };

      document.addEventListener("mouseup", up);
      document.addEventListener("mousemove", move);
    };

    windowElement.addEventListener("mousedown", down);
  };

  unminimize = async (id: string) => {
    const windowElement = document.getElementById(id);

    if (!windowElement) return false;

    windowElement.style.transform = "scale(1)";
    windowElement.dataset.mini = "false";

    windowElement.style.transition = "all 0.7s ease";

    windowElement.querySelectorAll("*").forEach((element: any) => {
      element.style.pointerEvents = "auto";
    });

    if (parseInt(windowElement.style.top.replace("px", "")) < 0)
      windowElement.style.top = "0";

    await new Promise((r) => setTimeout(r, 700));

    windowElement.style.transition = "";

    (windowElement as any).removeEventListeners("mousedown");

    return true;
  };

  fullscreen = async (id: string) => {
    const windowElement = document.getElementById(id);

    if (!windowElement) return false;

    if (windowElement.dataset.mini === "true") {
      await this.unminimize(id);
    }

    windowElement.style.transition = "all 0.15s ease";

    if (windowElement.dataset.fullscreen === "true") {
      requestAnimationFrame(async () => {
        windowElement.style.width = windowElement.dataset.prevWidth || "";
        windowElement.style.height = windowElement.dataset.prevHeight || "";

        windowElement.style.top = windowElement.dataset.prevTop || "";
        windowElement.style.left = windowElement.dataset.prevLeft || "";

        windowElement.dataset.fullscreen = "false";

        await new Promise((r) => setTimeout(r, 150));

        windowElement.style.transition = "";
      });

      return window.xen.taskbar.show();
    }

    requestAnimationFrame(async () => {
      windowElement.dataset.prevWidth = windowElement.style.width;
      windowElement.dataset.prevHeight = windowElement.style.height;

      windowElement.style.width = "100vw";
      windowElement.style.height = "100vh";

      windowElement.dataset.prevTop = windowElement.style.top;
      windowElement.dataset.prevLeft = windowElement.style.left;

      windowElement.style.top = "0";
      windowElement.style.left = "0";

      window.xen.taskbar.hide();

      windowElement.dataset.fullscreen = "true";

      await new Promise((r) => setTimeout(r, 150));

      windowElement.style.transition = "";
    });

    return true;
  };
}

module.exports = WindowManager;
