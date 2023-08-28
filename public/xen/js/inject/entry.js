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

window.addEventListener("click", function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );
});

document.addEventListener("click", function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.document.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );
});

window.addEventListener("mousedown", function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.dispatchEvent(
    new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );
});

document.addEventListener("mousedown", function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.document.dispatchEvent(
    new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );
});

window.addEventListener("mouseup", function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.dispatchEvent(
    new MouseEvent("mouseup", {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );
});

document.addEventListener("mouseup", function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.document.dispatchEvent(
    new MouseEvent("mouseup", {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );
});
