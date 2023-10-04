const CURSOR_MAP = {
  default: "/xen/cursors/default.svg",
  pointer: "/xen/cursors/pointer.svg",
  text: "/xen/cursors/text.svg",
  wait: "/xen/cursors/wait.svg",
  help: "/xen/cursors/help.svg",
  "zoom-in": "/xen/cursors/zoom-in.svg",
  "zoom-out": "/xen/cursors/zoom-out.svg",
  grab: "/xen/cursors/grab.svg",
  grabbing: "/xen/cursors/grabbing.svg",
  "e-resize": "/xen/cursors/e-resize.svg",
  "n-resize": "/xen/cursors/n-resize.svg",
  "ne-resize": "/xen/cursors/ne-resize.svg",
  "nw-resize": "/xen/cursors/nw-resize.svg",
  "s-resize": "/xen/cursors/s-resize.svg",
  "se-resize": "/xen/cursors/se-resize.svg",
  "sw-resize": "/xen/cursors/sw-resize.svg",
  "w-resize": "/xen/cursors/w-resize.svg",
  "ew-resize": "/xen/cursors/ew-resize.svg",
  "ns-resize": "/xen/cursors/ns-resize.svg",
  "nesw-resize": "/xen/cursors/nesw-resize.svg",
  "nwse-resize": "/xen/cursors/nwse-resize.svg",
  "col-resize": "/xen/cursors/col-resize.svg",
  "row-resize": "/xen/cursors/row-resize.svg",
  "all-scroll": "/xen/cursors/all-scroll.svg",
  "no-drop": "/xen/cursors/no-drop.svg",
  alias: "/xen/cursors/alias.svg",
  copy: "/xen/cursors/copy.svg",
  move: "/xen/cursors/move.svg",
  "not-allowed": "/xen/cursors/not-allowed.svg",
  progress: "/xen/cursors/progress.svg",
};

export default {
  async init() {
    return CURSOR_MAP;
  },
};
