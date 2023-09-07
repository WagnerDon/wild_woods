import Game from "./classes/Game.js";

// get canvas
const canvas = document.querySelector("canvas");
if (!canvas) {
    alert(`${canvas} (canvas) not found. Reloading...`);
    new Error(`Error: ${canvas}`);
    setTimeout(window.location.reload, 3000);
}

// get context
const ctx = canvas?.getContext("2d", { alpha: false });
if (!ctx) {
    alert("This browser is not supported!");
    new Error(`Error: ${ctx}`);
}
ctx!.imageSmoothingEnabled = false;

// when everything is loaded display body and create game instance
onload = () => {
    document.body.removeAttribute("style");
    new Game({ canvas: canvas!, ctx: ctx! }, true);
};
