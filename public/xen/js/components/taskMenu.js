const menu = {
  open: false,
  dock: document.getElementById("os-taskbar-resizable"),
  dockUnder: document.querySelector(".os-taskbar-under"),
  taskMenu: document.querySelector(".os-taskbar-menu"),
  startMenu: document.querySelector(".start-over"),
  searchMenu: document.querySelector(".start-search"),

  show: async function () {
    this.open = true;
    this.searchOpen = false;

    this.taskMenu.style.height = "400px";
    this.dock.style.height = "445px";
  },

  hide: async function () {
    this.open = false;
    this.searchOpen = false;

    await this.hideSearch();

    this.taskMenu.style.height = "";
    this.dock.style.height = "";
  },

  searchOpen: false,

  showSearch: async function (event) {
    if (this.searchOpen || !this.open) return;

    this.searchMenu.querySelector("input").value = `${event.key}`;
    this.searchMenu.querySelector("input").focus();

    this.renderSearch(event.key);

    this.startMenu.style.opacity = "0";
    await new Promise((r) => setTimeout(r, 100));
    this.startMenu.style.visibility = "hidden";

    this.searchMenu.style.opacity = "0";
    this.searchMenu.style.visibility = "visible";
    this.searchMenu.style.opacity = "1";

    return (this.searchOpen = true);
  },

  hideSearch: async function () {
    this.searchMenu.querySelector("input").blur();

    this.searchMenu.style.opacity = "0";
    await new Promise((r) => setTimeout(r, 100));
    this.searchMenu.style.visibility = "hidden";

    this.startMenu.style.opacity = "0";
    this.startMenu.style.visibility = "visible";
    this.startMenu.style.opacity = "1";

    this.searchOpen = false;

    return true;
  },

  renderSearch: async function (term) {
    const container = this.searchMenu.querySelector(".start-results");
    const appContainer = container.querySelector(".search-apps");
    const newsContainer = container.querySelector(".search-news");
    const searchContainer = container.querySelector(".search-search");

    const searchData = await this.generateSearch(term);

    if (appContainer) appContainer.innerHTML = searchData.apps;
    if (newsContainer) newsContainer.innerHTML = searchData.news;
    if (searchContainer) searchContainer.innerHTML = searchData.search;

    appContainer.querySelectorAll(".start-app").forEach((app) => {
      app.addEventListener("click", async (e) => {
        const id = app.dataset.app;

        await menu.hide();

        if (xen.apps.apps.find((app) => app.appId == id)) {
          // TODO: App Event Emitter

          return true;
        } else {
          await xen.apps.open(
            id,
            document.querySelector(".os-dock-item[data-id='" + id + "']"),
          );
        }

        return true;
      });
    });

    searchContainer
      .querySelectorAll(".start-app.velocity-browser-search")
      .forEach((app) => {
        app.addEventListener("click", async (e) => {
          const url = app.innerText;

          await menu.hide();
          await xen.apps.open(
            "Xen/velocity",
            document.querySelector(".os-dock-item[data-id='Xen/velocity']"),
          );

          const { master: el } = xen.apps.apps.find(
            (app) => app.appId == "Xen/velocity",
          );

          if (!el) return;

          if (el.querySelector("iframe").contentWindow.Velocity)
            new (el.querySelector("iframe").contentWindow.Velocity.Tab)(
              url,
              true,
            );
        });
      });

    searchContainer.querySelectorAll(".start-app.ddg-search").forEach((app) => {
      app.addEventListener("click", async (e) => {
        let parser = new DOMParser().parseFromString(
          decodeURIComponent(atob(app.dataset.result)),
          "text/html",
        );

        const result = parser.querySelector("a:first-of-type").innerText;

        this.searchMenu.querySelector("input").value = `${result}`;

        return await this.renderSearch(result);
      });
    });

    return true;
  },

  initSearch: async function (e) {
    const input = this.searchMenu.querySelector("input");

    input.focus();

    if (e.key == "Backspace" && input.value.length == 0) {
      return await this.hideSearch();
    }

    if (this.searchOpen) {
      // wait a second for event to bubble
      await new Promise((r) => setTimeout(r, 100));

      await this.renderSearch(input.value || " ");

      return;
    }

    await this.showSearch(e);
  },

  generateSearch: async function (term) {
    var data = {
      apps: [],
      search: [],
      news: [],
    };

    term = term.trim();

    const apps = await window.xen.apps.getAppsData();
    var names = apps.map((app) => app.name);

    if (names.find((name) => name.toLowerCase().includes(term.toLowerCase()))) {
      data.apps = names
        .filter((name) => name.toLowerCase().includes(term.toLowerCase()))
        .map((name) => apps.find((app) => app.name == name));
    }

    console.log(data.apps, apps, names, term);

    data.apps = data.apps
      .map(
        (app) =>
          `<div class="start-app" data-app="${app.id}">
                <img class="start-app-icon" src="${app.icon}">
                ${app.name}
            </div>`,
      )
      .join("\n");

    if (term.length > 0) {
      const searchResults = await fetch(window.xen.config.bare + "v2/", {
        method: "GET",
        headers: {
          "x-bare-headers": JSON.stringify({ host: "duckduckgo.com" }),
          "x-bare-host": "duckduckgo.com",
          "x-bare-protocol": "https:",
          "x-bare-port": 443,
          "x-bare-path": `/?q=${encodeURIComponent(term)}&format=json`,
        },
      }).then((response) => response.json());

      try {
        if (searchResults.AbstractURL && searchResults.AbstractText) {
          data.search.push(
            `<div class="start-app wiki-search">
              <img class="start-app-icon" src="https://en.wikipedia.org/static/favicon/wikipedia.ico">
              <div class="wiki-info">
                <h2 class="wiki-title">${searchResults.Heading}</h2>
                ${
                  searchResults.AbstractText.length >= 260
                    ? searchResults.AbstractText.substring(0, 260) + "..."
                    : searchResults.AbstractText
                }
              </div>
            </div>`,
          );
        }
      } catch (e) {
        data.search = [];
      }

      if (searchResults.RelatedTopics?.length > 0) {
        data.search.push(
          ...searchResults.RelatedTopics.map((topic, index) =>
            topic.FirstURL && index < 4
              ? `<div class="start-app ddg-search" data-result="${btoa(
                  encodeURIComponent(topic.Result) || "",
                )}">
                        <img class="start-app-icon" src="${
                          topic.Icon.URL
                            ? `https://duckduckgo.com${topic.Icon.URL}`
                            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
                        }">
                        ${
                          topic.Text.length > 120
                            ? topic.Text.substring(0, 120) + "..."
                            : topic.Text
                        }
                    </div>`
              : "",
          ),
        );
      }

      const omniResults = await fetch(window.xen.config.bare + "v2/", {
        method: "GET",
        headers: {
          "x-bare-headers": JSON.stringify({ host: "duckduckgo.com" }),
          "x-bare-host": "duckduckgo.com",
          "x-bare-protocol": "https:",
          "x-bare-port": 443,
          "x-bare-path": `/ac/?q=${encodeURIComponent(term)}&format=json`,
        },
      }).then((response) => response.json());

      data.search.push(
        `
                    <div class="start-app velocity-browser-search">
                        <img class="start-app-icon" src="/xen/~/apps/Xen/velocity/icon.png">
                        ${term}
                    </div>
                `,
      );

      if (omniResults.length > 0) {
        data.search.push(
          ...omniResults
            .filter((result, index) => index < 2)
            .map(
              (result) => `<div class="start-app">
                        <img class="start-app-icon" src="/xen/~/apps/Xen/velocity/icon.png">
                        ${result.phrase}
                    </div>`,
            ),
        );
      }

      data.search = data.search.join("\n");
    }

    console.log(data);

    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value.length > 0
          ? value
          : `<div class="start-app"><img class="start-app-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=" />No ${key} found</div>`,
      ]),
    );
  },
};

menu.searchMenu
  .querySelector("button.start-back")
  .addEventListener("click", async function (e) {
    return await menu.hideSearch();
  });

menu.startMenu
  .querySelector(".start-go")
  .addEventListener("click", async function (e) {
    return await menu.showSearch(
      new KeyboardEvent("keydown", {
        key: "",
      }),
    );
  });

document.getElementById("startButton").addEventListener("click", function (e) {
  if (menu.open) {
    menu.hide();
  } else {
    menu.show();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "Option" || e.key == "Alt") {
    if (menu.open) {
      menu.hide();
    } else {
      menu.show();
    }
  }
});

document.addEventListener("mousedown", function (e) {
  let target;

  for (var n = e.target; n.parentNode; n = n.parentNode) {
    if (n.id == "os-taskbar-resizable") {
      target = n;
      break;
    }
  }

  if (!target) {
    return menu.hide();
  }
});

window.addEventListener("keydown", function (e) {
  return queueMicrotask(async () => {
    if (!menu.open) return;

    switch (e.key) {
      case "a":
      case "b":
      case "c":
      case "d":
      case "e":
      case "f":
      case "g":
      case "h":
      case "i":
      case "j":
      case "k":
      case "l":
      case "m":
      case "n":
      case "o":
      case "p":
      case "q":
      case "r":
      case "s":
      case "t":
      case "u":
      case "v":
      case "w":
      case "x":
      case "y":
      case "z":
      case " ":
      case "Backspace":
        //if (menu.searchOpen) return false;

        return menu.initSearch(e);
      case "Escape":
        return menu.hide();
      default:
        console.log(e.key);
        break;
    }
  });
});

export default menu;
