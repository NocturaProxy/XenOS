import "../components/rewriter.js";

function dragEvent(event, x, y) {
  var isDrag = false;

  if (
    window.getComputedStyle(event.target).getPropertyValue("app-region") === "drag" ||
    window.getComputedStyle(event.target).getPropertyValue("--webkit-app-region") === "drag"
  ) {
    isDrag = true;
  }

  for (var n = event.target; n.parentNode; n = n.parentNode) {
    if (
      window.getComputedStyle(n).getPropertyValue("app-region") === "drag" ||
      window.getComputedStyle(n).getPropertyValue("--webkit-app-region") === "drag"
    ) {
      isDrag = true;
      break;
    }
  }

  for (var n = event.target; n.parentNode; n = n.parentNode) {
    if (
      window.getComputedStyle(n).getPropertyValue("app-region") === "no-drag" ||
      window.getComputedStyle(n).getPropertyValue("--webkit-app-region") === "no-drag"
    ) {
      isDrag = false;
      break;
    }
  }

  if (!isDrag) return null;
  if (event.defaultPrevented) return null;

  if (
    window.getComputedStyle(event.target).getPropertyValue("app-region") !== "no-drag" ||
    window.getComputedStyle(event.target).getPropertyValue("--webkit-app-region") !== "no-drag"
  ) {
    window.top.dispatchEvent(
      new window.CustomEvent("xendrag", {
        bubbles: true,
        cancelable: true,
        detail: {
          x,
          y,
          el: event.target,
          type: event.type,
          id: window.frameElement.parentNode.parentNode.id
        },
      }),
    );
  }
}

window.addEventListener('mousemove', function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.dispatchEvent(
    new window.MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );

  dragEvent(e, e.clientX + bounds.x, e.clientY + bounds.y);
});

document.addEventListener('mousemove', function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.document.dispatchEvent(
    new window.MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );

  dragEvent(e, e.clientX + bounds.x, e.clientY + bounds.y);
});

window.addEventListener('click', function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.dispatchEvent(
    new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );

  dragEvent(e, e.clientX + bounds.x, e.clientY + bounds.y);
});

document.addEventListener('click', function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.document.dispatchEvent(
    new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );

  dragEvent(e, e.clientX + bounds.x, e.clientY + bounds.y);
});

window.addEventListener('mousedown', function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.dispatchEvent(
    new window.MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );

  dragEvent(e, e.clientX + bounds.x, e.clientY + bounds.y);
});

document.addEventListener('mousedown', function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.document.dispatchEvent(
    new window.MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );

  dragEvent(e, e.clientX + bounds.x, e.clientY + bounds.y);
});

window.addEventListener('mouseup', function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.dispatchEvent(
    new window.MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );

  dragEvent(e, e.clientX + bounds.x, e.clientY + bounds.y);
});

document.addEventListener('mouseup', function (e) {
  const bounds = window.frameElement.getBoundingClientRect();

  window.top.document.dispatchEvent(
    new window.MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX + bounds.x,
      clientY: e.clientY + bounds.y,
      screenX: e.screenX + bounds.x,
      screenY: e.screenY + bounds.y,
    }),
  );

  dragEvent(e, e.clientX + bounds.x, e.clientY + bounds.y);
});
