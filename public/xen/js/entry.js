const Xen = require("./core/Xen");

window.xen = new Xen();

window.xen.startup().then(() => {
  console.log(
    "%cWelcome to XenOS",
    "color:black; background-color:white; padding:5px; border-radius: 5px; line-height: 26px; font-size:30px;",
  );

  window.xen.hideLoader();
})/*.catch(err => {
  console.error(err);
});
*/