const bar = document.getElementById("os-battery-bar");
const bound = 215;

let data = await window.xen.battery;

bar.style.width = `${(data.level * bound).toFixed(0)}px`;

data.addEventListener("levelchange", async function (event) {
  bar.style.width = `${(data.level * bound).toFixed(0)}px`;
});
