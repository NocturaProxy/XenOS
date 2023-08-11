// Used to manage installed apps and app updates

export default new (class AppsComponent {
  builtins = ["Xen/welcome", "Xen/settings", "Xen/store"];

  constructor() {
    window.xen.constructor.prototype.AppsComponent = this.constructor;
    window.xen.apps = this;
  }

  async install(pkg) {
    if (!this.builtins.includes(pkg)) {
      return;
    }
  }

  async getInstalledApps() {
    return await fetch("/~xen/apps/installed.json").then((res) => res.json());
  }

  async startup() {
    await xen.wait(1000);

    return true;
  }
})();
