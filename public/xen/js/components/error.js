const errorManager = {
  errorContainer: document.getElementById("errorCatter"),
  restartBtn: document.querySelector(".crashReturnBtn"),
  tsBtn: document.querySelector(".crashTroubleShoot"),

  async init() {
    this.restartBtn.addEventListener("click", () => {
      this.restartBtn.querySelector(".crashSpinner").style.width = "16px";
      this.restartBtn.querySelector(".crashSpinner").style.visibility =
        "visible";

      window.location.reload(true);
    });

    this.tsBtn.addEventListener("click", async () => {
      this.tsBtn.querySelector(".crashSpinner").style.width = "16px";
      this.tsBtn.querySelector(".crashSpinner").style.visibility = "visible";

      // Factory Reset (bruh moment)

      window.localStorage.clear();
      window.sessionStorage.clear();

      document.cookie.split("; ").forEach((cookie) => {
        const name = cookie.split("=")[0];

        document.cookie = `${name}=ruh; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      });

      // Clear Filesystem

      await window.xen.fs.rmdir("/");

      await window.caches.delete("xen-cache");
      await window.caches.delete("xen-apps");
      await window.caches.delete("vfs");

      if (window.xen.apps) {
        window.xen.apps.processes.forEach((process) => {
          if (process.worker) {
            process.worker.terminate();
          }
        });
      }

      delete window.xen;

      window.location.reload(true);
    });
  },
  // Startup Errors
  async startup(err) {
    console.warn(err);
    console.warn(err.stack);

    document.querySelector("#os-pre-text2").childNodes[0].remove();
    document.querySelector("#os-pre-text2").style.animation = "none";

    document.querySelector("#os-pre-text").remove();

    document.querySelector("#os-pre").style.background = "#bb1b1b";

    this.errorContainer.querySelector(
      "h2",
    ).innerText = `Fatal Error: ${err.name}`;
    this.errorContainer.querySelector("p").innerHTML = `
    ${err.message}
    <br><br>
    <details>
      <summary>Error Stack</summary>
      <pre>${err.stack}</pre>
    </details>`;

    this.errorContainer.style.display = "block";

    return true;
  },
};

window.xen.error = errorManager;

export default errorManager;
