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

    windowElement.append(
      titleBar,
      innerBody, 
      ...['left', 'top', 'right', 'bottom', 'topLeft', 'topRight', 'bottomRight', 'bottomLeft'].map(direction => {
        const div = document.createElement('div');
        div.classList.add(direction.includes('top') ? 'resize' : 'dresize', direction + 'Resize');
        return div;
      })
    );

    this.resizeListener(windowElement); 

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

  resizeListener(master: HTMLElement) {
    var left = master.querySelector('.leftResize'),
      right = master.querySelector('.rightResize'),
      top = master.querySelector('.topResize'),
      bottom = master.querySelector('.bottomResize');

    var topLeft = master.querySelector('.topLeftResize'),
      topRight = master.querySelector('.topRightResize'),
      bottomLeft = master.querySelector('.bottomLeftResize'),
      bottomRight = master.querySelector('.bottomRightResize');

    [left, right, top, bottom].forEach((side, index) => {
      var s = ['left', 'right', 'top', 'bottom'][index];
      
      var startX: any;
      var startY: any;
      var computed: any;
      var startHeight: any;
      var startWidth: any;
      var startTop: any;
      var startLeft: any;
      
      var mousemove = function(e: MouseEvent) {

        requestAnimationFrame(() => {
          if (s=='top') {
            var height = (parseInt(startHeight.replace('px', '')) - (e.clientY - startY));
            master.style.height = (height>70?height:70)+'px';
            master.style.top = (height>70?parseInt(startTop.replace('px', '')) + (e.clientY - startY):'')+'px';
          } else if (s=='bottom') {
            var height = (parseInt(startHeight.replace('px', '')) + (e.clientY - startY));
            master.style.height = (height>70?height:70)+'px';
            master.style.top = startTop;
          } else if (s=='left') {
            var width = (parseInt(startWidth.replace('px', '')) - (e.clientX - startX));
            master.style.width = (width>70?width:70)+'px';
            master.style.left = (width>70?parseInt(startLeft.replace('px', '')) + (e.clientX - startX):'')+'px';
          } else if (s=='right') {
            var width = (parseInt(startWidth.replace('px', '')) + (e.clientX - startX));
            master.style.width = (width>70?width:70)+'px';
            master.style.left = startLeft;
          }
        });
      };
    
      document.addEventListener('mousedown', function(e) {
        if (e.target!==side) return;

        computed = window.getComputedStyle(master);

        startHeight = computed.height+'';
        startWidth = computed.width+'';
        startTop = computed.top+'';
        startLeft = computed.left+'';
        
        startX = e.clientX;
        startY = e.clientY;

        master.style.transition = "0s";
        
  			master.querySelectorAll('iframe').forEach(function(iframe) {
  				iframe.style.pointerEvents = "none";
  			});
        
        document.addEventListener('mousemove', mousemove);
      });

      document.addEventListener('mouseup', function(e) {
        if (!startX&&!startY) return

        master.style.transition = "";

        document.removeEventListener('mousemove', mousemove);   
        
  			master.querySelectorAll('iframe').forEach(function(iframe) {
  				iframe.style.pointerEvents = "all";
  			});     
      });
    });

    [topLeft, topRight, bottomLeft, bottomRight].forEach((side, index) => {
      var s = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'][index];
      
      var startX: any;
      var startY: any;
      var computed: any;
      var startHeight: any;
      var startWidth: any;
      var startTop: any;
      var startLeft: any;
      
      var mousemove = function(e: MouseEvent) {
        requestAnimationFrame(() => {
          if (s=='topLeft') {
            var height = (parseInt(startHeight.replace('px', '')) - (e.clientY - startY));
            var width = (parseInt(startWidth.replace('px', '')) - (e.clientX - startX));
            master.style.height = (height>70?height:70)+'px';
            master.style.top = (height>70?parseInt(startTop.replace('px', '')) + (e.clientY - startY):'')+'px';
            master.style.width = (width>70?width:70)+'px';
            master.style.left = (width>70?parseInt(startLeft.replace('px', '')) + (e.clientX - startX):'')+'px';
          } else if (s=='topRight') {
            var height = (parseInt(startHeight.replace('px', '')) - (e.clientY - startY));
            var width = (parseInt(startWidth.replace('px', '')) + (e.clientX - startX));
            master.style.height = (height>70?height:70)+'px';
            master.style.top = (height>70?parseInt(startTop.replace('px', '')) + (e.clientY - startY):'')+'px';
            master.style.width = (width>70?width:70)+'px';
            master.style.left = startLeft;
          } else if (s=='bottomLeft') {
            var height = (parseInt(startHeight.replace('px', '')) + (e.clientY - startY));
            var width = (parseInt(startWidth.replace('px', '')) - (e.clientX - startX));
            master.style.height = (height>70?height:70)+'px';
            master.style.top = startTop
            master.style.width = (width>70?width:70)+'px';
            master.style.left = (width>70?parseInt(startLeft.replace('px', '')) + (e.clientX - startX):'')+'px';
          } else if (s=='bottomRight') {
            var height = (parseInt(startHeight.replace('px', '')) + (e.clientY - startY));
            var width = (parseInt(startWidth.replace('px', '')) + (e.clientX - startX));
            master.style.height = (height>70?height:70)+'px';
            master.style.top = startTop
            master.style.width = (width>70?width:70)+'px';
            master.style.left = startLeft;
          }
        });
      };
    
      document.addEventListener('mousedown', function(e) {
        if (e.target!==side) return;

        computed = window.getComputedStyle(master);

        startHeight = computed.height+'';
        startWidth = computed.width+'';
        startTop = computed.top+'';
        startLeft = computed.left+'';
        
        startX = e.clientX;
        startY = e.clientY;

        master.style.transition = "0s";
        
  			master.querySelectorAll('iframe').forEach(function(iframe) {
  				iframe.style.pointerEvents = "none";
  			});
        
        document.addEventListener('mousemove', mousemove);
      });

      document.addEventListener('mouseup', function(e) {
        if (!startX&&!startY) return;

        master.style.transition = "";

        document.removeEventListener('mousemove', mousemove);   
        
  			master.querySelectorAll('iframe').forEach(function(iframe) {
  				iframe.style.pointerEvents = "all";
  			});     
      });
    });
  }
};

module.exports = WindowManager;