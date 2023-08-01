import Game from "./classes/Game.js";

const canvas = document.createElement("canvas");
canvas.width = 1280;
canvas.height = 720;

const userInterface = document.createElement("div");
userInterface.id = "user-interface";

const content = document.createElement("div");
content.id = "content";
content.append(canvas, userInterface);

const paragraph = document.createElement("p");
paragraph.textContent = "Rotate Your Device";

const phone = document.createElement("img");
phone.id = "phone";
phone.src = "../assets/images/user_interface/phone.png";

const rotateDevice = document.createElement("div");
rotateDevice.id = "rotate-device";
rotateDevice.append(paragraph, phone);

const documentFragment = document.createDocumentFragment();
documentFragment.append(content, rotateDevice);

const body = document.body;
body.append(documentFragment);

let ctx = canvas.getContext("2d", { alpha: false });
if (!ctx) {
 alert("This browser is not supported!");
 new Error(`Error: ${ctx}`);
}
ctx = ctx as CanvasRenderingContext2D;
ctx.imageSmoothingEnabled = false;

const canvasData = { canvas, ctx };

onload = () => {
 body.removeAttribute("style");
 new Game(canvasData);
};
