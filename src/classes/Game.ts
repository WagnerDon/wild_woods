import { auxiliary } from "../auxiliary.js";
import { shared } from "../shared.js";
import Loop from "./Loop.js";
import Screen from "./Screen.js";
import ScreenManager from "./ScreenManager.js";

export default class Game {
  constructor({
    canvas,
    ctx,
  }: {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
  }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.loop = new Loop(this);
    this.screenManager = new ScreenManager(
      { w: canvas.width, h: canvas.height },
      true
    );
  }

  screenManager: ScreenManager;
  loop: Loop;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  update(deltaTime: number) {
    // update screens
    // this.updateScreens(deltaTime);

    // clear canvas
    this.clearCanvas();

    // draw screens
    // this.drawScreens();
  }
}

// temporary objects
const objectA = {
  boundingBox: {
    x: 0,
    y: 0,
    w: 50,
    h: 50,
  },
  draw: (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "orange";
    ctx.fillRect(
      objectA.boundingBox.x,
      objectA.boundingBox.y,
      objectA.boundingBox.w,
      objectA.boundingBox.h
    );
  },
};

const objectB = {
  boundingBox: {
    x: 0,
    y: 0,
    w: 50,
    h: 50,
  },
  draw: (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "yellow";
    ctx.fillRect(
      objectB.boundingBox.x,
      objectB.boundingBox.y,
      objectB.boundingBox.w,
      objectB.boundingBox.h
    );
  },
};

// temporary event listener
onkeydown = (e) => {
  switch (e.code) {
    case "ArrowLeft":
      objectA.boundingBox.x -= 50;
      break;
    case "ArrowRight":
      objectA.boundingBox.x += 50;
      break;
    case "ArrowUp":
      objectA.boundingBox.y -= 50;
      break;
    case "ArrowDown":
      objectA.boundingBox.y += 50;
      break;
    case "KeyA":
      objectB.boundingBox.x -= 50;
      break;
    case "KeyD":
      objectB.boundingBox.x += 50;
      break;
    case "KeyW":
      objectB.boundingBox.y -= 50;
      break;
    case "KeyS":
      objectB.boundingBox.y += 50;
      break;
  }
};
