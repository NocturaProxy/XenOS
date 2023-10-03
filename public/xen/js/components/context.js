const contextMenu = {
  async init() {
    window.HTMLElement.prototype.registerContextMenu = this.register;
  },

  async register(opts, onopen = () => {}, onclose = () => {}) {
    this.menus = this.menus || [];
    var open = false;

    var master = document.createElement("div");
    master.classList.add("context-menu");
    master.style.display = "none";
    document.body.appendChild(master);

    onopen = new Proxy(onopen, {
      apply(t, g, a) {
        master.innerHTML = "";

        for (var i = 0; i < opts.components.length; i++) {
          var component = opts.components[i];
          var item = document.createElement("div");
    
          switch(component.type) {
            case "button":
              item.classList.add("context-btn");
              item.innerHTML = component.text;
              item.addEventListener("click", component.click);
              break;
            case "sep":
            case "separator":
              item.classList.add("context-sep");
              break;
            case "text":
            default:
              item.classList.add("context-text");
              item.innerHTML = component.text;
              break;
          }
    
          master.appendChild(item);
        }

        return Reflect.apply(t, g, a);
      }
    })

    opts.master = master;
    opts.type = opts.type || "default";
    
    document.addEventListener("click", (e) => {
      var el;

      for (var n = e.target; n.parentNode; n = n.parentNode) {
        if (n.classList.contains("context-menu")) {
          el = n;
          break;
        }
      }

      if (e.target.classList?.contains("context-btn")) {
        el = e.target;
      }

      if (!el) {
        master.style.opacity = 0;
        if (open) onclose(open = false);
        setTimeout(() => master.style.display = "none", 70);
      }
    });

    this.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      if (document.querySelectorAll(".context-menu").length) {
        for (var i = 0; i < document.querySelectorAll(".context-menu").length; i++) {
          if (document.querySelectorAll(".context-menu")[i].style.display == "block") {
            if (document.querySelectorAll(".context-menu")[i] == master && open)
              onclose(open = false);
            document.querySelectorAll(".context-menu")[i].style.opacity = 0;
            setTimeout(() => document.querySelectorAll(".context-menu")[i].style.display = "none", 70);
            return;
          }
        }
      }

      if (!open) onopen(open = true);

      master.style.display = "block";
      master.style.opacity = 1;
      var bounds = master.getBoundingClientRect();
      var tBounds = this.getBoundingClientRect();

      switch(opts.type) {
        case "center":
          console.log(master.style.top = tBounds.top - 10 - bounds.height + "px");
          master.style.top = tBounds.top - 10 - bounds.height + "px";
          master.style.left = tBounds.left + tBounds.width / 2 - bounds.width / 2 + "px";
          break;
        case "default":
        default:
          if (window.innerHeight < e.clientY + bounds.height) {
            master.style.top = e.clientY - bounds.height + "px";
            master.style.left = e.clientX + "px";
          } else {
            master.style.top = e.clientY + "px";
            master.style.left = e.clientX + "px";
          }
          break;
      }
    });

    this.menus.push(opts);
  }
};

window.xen.context = contextMenu;

export default contextMenu;
