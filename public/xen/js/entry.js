import System from "./system";

// Load XEN System With Components
window.xen = new System(import("./components"), import("./startup"));
