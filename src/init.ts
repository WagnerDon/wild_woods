import Game from "./classes/Game.js";

const canvas = document.querySelector("canvas");
if (!canvas) {
 alert(`${canvas} (canvas) not found. Reloading...`);
 new Error(`Error: ${canvas}`);
 setTimeout(window.location.reload, 3000);
}

const ctx = canvas?.getContext("2d", { alpha: false });
if (!ctx) {
 alert("This browser is not supported!");
 new Error(`Error: ${ctx}`);
}
ctx!.imageSmoothingEnabled = false;

onload = () => {
 document.body.removeAttribute("style");
 new Game({ canvas: canvas!, ctx: ctx! });
};
