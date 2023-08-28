import PureContextMenu from "./contextMenu";

const contextMenu = {
  menuData: {},

  async init() {
    window.HTMLElement.prototype.registerContextMenu = async function register(
      data,
    ) {
      const menu = new PureContextMenu(this, data);
      return menu;
    };
  },
};

window.xen.context = contextMenu;

export default contextMenu;
