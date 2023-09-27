const { onReady, register } = self.xen;

onReady(async () => {
  const win = await register({
    native: true,
    width: 1000,
    height: 700,
    name: "Velocity",
    visible: false,
    menu: false,
  });

  self.win = win;

  await win
    .loadURL("/", {
      event: "load", // default: load
    })
    .then(() => win.show());
});
