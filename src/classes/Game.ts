// import { GameScreen } from "./gameScreen.js";
// import { SETTINGS } from "./ui.js";
// import { GameWorld } from "./gameWorld.js";
// import { CollisionHandler } from "./utility/collisionHandler.js";

export default class Game {
 constructor(ctx: CanvasRenderingContext2D) {
  this.mainCtx = ctx;
 }

 mainCtx: CanvasRenderingContext2D;

 loopInfo = {
  targetFps: 30,
  previousTimestamp: 0,
 };

 canvasOptions = {
  alpha: false,
 };

 canvas: HTMLCanvasElement | undefined;
 context: CanvasRenderingContext2D | undefined;

 screens: GameScreen[] = [];

 gameWorld: GameWorld | undefined;

 init() {
  const canvas = document.getElementById("canvas");

  if (!(canvas instanceof HTMLCanvasElement))
   throw new Error(`${canvas} is not of type canvas`);

  this.canvas = canvas;
  const ctx = this.canvas.getContext("2d", this.canvasOptions);

  if (!(ctx instanceof CanvasRenderingContext2D))
   throw new Error(`Creating context ${ctx} failed`);

  this.context = ctx;
  this.context.imageSmoothingEnabled = false;

  if (SETTINGS.twoPlayer) {
   const width = this.canvas.width / 2;
   this.screens = [
    new GameScreen(canvas, this.context, { width: width }),
    new GameScreen(canvas, this.context, { x: width, width: width }),
   ];
  } else this.screens.push(new GameScreen(canvas, this.context));

  this.loopLogic = this.loopLogic.bind(this);
  this.loop();

  this.gameWorld = new GameWorld();
 }

 clearCanvas() {
  this.context?.clearRect(
   0,
   0,
   this.canvas?.width ?? 0,
   this.canvas?.height ?? 0
  );
 }

 exe(deltaTime: number) {
  const gameObjects = this.gameWorld?.gameObjects;
  if (!gameObjects) throw new Error(`${gameObjects} does not exist`);
  for (let l = gameObjects.length - 1; l > -1; l--)
   gameObjects[l].logic(deltaTime);
  CollisionHandler.checkForCollisions(gameObjects);
  this.clearCanvas();
  this.screens.forEach((screen) => screen.update(gameObjects));
 }

 loopLogic(currentTimestamp: number) {
  const loopInfo = this.loopInfo;
  const elapsedTime = currentTimestamp - loopInfo.previousTimestamp;
  if (elapsedTime > loopInfo.targetFps) {
   loopInfo.previousTimestamp =
    currentTimestamp - (elapsedTime % loopInfo.targetFps);
   const deltaTime = elapsedTime / 1000;
   this.exe(deltaTime);
  }
  if (!SETTINGS.pause) {
   requestAnimationFrame(this.loopLogic);
  }
 }

 loop() {
  requestAnimationFrame(this.loopLogic);
 }
}
