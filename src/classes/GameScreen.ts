import { Position, Screen, AnyGameObject } from "./interfaces.js";

export class GameScreen {
 screen: Screen;

 context: CanvasRenderingContext2D;

 viewport: Position = { x: 0, y: 0 };

 constructor(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  screen?: Partial<Screen>
 ) {
  this.context = context;
  this.screen = {
   x: 0,
   y: 0,
   width: canvas.width,
   height: canvas.height,
   ...screen,
  };
 }

 update(gameObjects: AnyGameObject[]) {
  this.context.save();

  this.context.beginPath();
  this.context.rect(
   this.screen.x,
   this.screen.y,
   this.screen.width,
   this.screen.height
  );
  this.context.clip();

  this.context.translate(
   this.screen.x + this.viewport.x,
   this.screen.y + this.viewport.y
  );

  for (let x = 0, l = gameObjects.length; x < l; x++) gameObjects[x].draw(this);

  this.context.restore();
 }
}
