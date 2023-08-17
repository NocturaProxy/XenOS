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
      <rect width="188" height="185" rx="92.5" fill="#41a641"></rect>
    </svg>`;
  }

  createWindow = (title: string, content: HTMLElement, id: string, x: number = 0, y: number = 0, width: number = 0, height: number = 0) => {
    const windowElement = document.createElement('div');
    windowElement.classList.add('drag', 'box');

    windowElement.id = id;
    windowElement.style.left = `${x}px`;
    windowElement.style.top = `${y}px`;
    windowElement.style.width = `${width}px`;
    windowElement.style.height = `${height}px`;

    const titleBar = document.createElement('div');
    titleBar.classList.add('box-header');

    const titleLabel = document.createElement('div');
    titleLabel.classList.add('box-header-title');
    titleLabel.innerText = title;

    const minimizeButton = document.createElement('span');
    minimizeButton.classList.add('os-mini');
    minimizeButton.innerHTML = this.getMiniSVG();
    minimizeButton.addEventListener('click', () => {
      // Minimize the window logic
    });

    const closeButton = document.createElement('span');
    closeButton.classList.add('os-exit');
    closeButton.innerHTML = this.getCloseSVG();
    closeButton.addEventListener('click', () => {
      // Close the window logic
      windowElement.remove();
    });

    const fullscreenButton = document.createElement('span');
    fullscreenButton.classList.add('os-full');
    fullscreenButton.innerHTML = this.getFullSVG();
    fullscreenButton.addEventListener('click', () => {
      // Fullscreen the window logic
    });

    const innerBody = document.createElement('div');
    innerBody.classList.add('box-body-inner');
    innerBody.appendChild(content);

    titleBar.appendChild(titleLabel);
    titleLabel.appendChild(minimizeButton);
    titleLabel.appendChild(closeButton);
    titleLabel.appendChild(fullscreenButton);

    windowElement.appendChild(titleBar);
    windowElement.appendChild(innerBody);

    document.getElementById("os-desktop")?.appendChild(windowElement);
    window.xen.wm.windows.push(windowElement);

    const drag = windowElement.querySelector('.box-header-title');

    drag?.addEventListener('mousedown', (e: any) => {
      const box = windowElement.getBoundingClientRect();
      const titleBox = titleBar.getBoundingClientRect();
      const offsetX = e.clientX - box.left;
      const offsetY = e.clientY - box.top;

      windowElement.querySelectorAll("iframe").forEach((iframe) => {
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
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);

        let top = e.clientY - offsetY;

        if (top + titleBox.height > window.innerHeight) {
          windowElement.style.top = `${window.innerHeight - titleBox.height}px`;
        }

        windowElement.querySelectorAll("iframe").forEach((iframe) => {
          iframe.style.pointerEvents = "auto";
        });
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });

    return windowElement;
  };
};

module.exports = WindowManager;