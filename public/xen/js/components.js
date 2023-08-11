export default Promise.allSettled([
  console.log("Loading Modules"),
  import("./core/windows").then(
    (module) => (console.debug("Loaded Windows Component"), module.default),
  ),
  import("./core/apps").then(
    (module) => (console.debug("Loaded Apps Component"), module.default),
  ),
  import("./core/battery").then(
    (module) => (console.debug("Loaded Battery Component"), module.default),
  ),
  import("./core/weather").then(
    (module) => (console.debug("Loaded Weather Component"), module.default),
  ),
]);
