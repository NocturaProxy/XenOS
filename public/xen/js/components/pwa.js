export default window.xen.pwa = {
  async init() {
    if (navigator.windowControlsOverlay) {
      // TODO: Figure out what to put in the titlebar
      navigator.windowControlsOverlay.addEventListener("geometrychange", () => {
        const bounds = navigator.windowControlsOverlay.getTitlebarAreaRect();
        console.log(bounds);
      });
    }
  },
};
