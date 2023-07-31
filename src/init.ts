import Game from "./classes/Game.js";

const mainCanvas = document.createElement("canvas");
mainCanvas.id = "main-canvas";
mainCanvas.width = 1280;
mainCanvas.height = 720;

const userInterface = document.createElement("div");
userInterface.id = "user-interface";

const content = document.createElement("div");
content.id = "content";
content.append(mainCanvas, userInterface);

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

const mainCanvasCtx = mainCanvas.getContext("2d", { alpha: false });
if (mainCanvasCtx) mainCanvasCtx.imageSmoothingEnabled = false;
else {
 alert("This browser is not supported!");
 new Error(`Error: ${mainCanvasCtx}`);
}

onload = () => {
 body.removeAttribute("style");
 new Game(mainCanvasCtx);
};
