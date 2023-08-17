const { onReady } = self.xen;

onReady(async () => {
    console.log("App Ready");

    const win = await xen.register({
        native: false,
        width: 500,
        height: 500,
        url: "https://example.com",
        type: "static",
        name: "Settings"
    });

    await win.loadFile(`data:text/html,${encodeURIComponent("<h1>Hello World</h1>")}`);
});