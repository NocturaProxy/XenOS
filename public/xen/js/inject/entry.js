window.addEventListener("mousemove", function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.dispatchEvent(
    new MouseEvent("mousemove", {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );
});

document.addEventListener("mousemove", function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.document.dispatchEvent(
    new MouseEvent("mousemove", {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );
});
