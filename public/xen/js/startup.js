export default new (class Startup {
  pre = document.getElementById("os-pre");
  comm = document.getElementById("os-pre-text2");

  constructor() {
    window.xen.startup.then(async (timing) => {
      this.pre.style.transition = "0.4s ease";
      this.pre.style.opacity = "0";

      await window.xen.wait(400);

      this.pre.style.display = "none";
    });
  }
})();
