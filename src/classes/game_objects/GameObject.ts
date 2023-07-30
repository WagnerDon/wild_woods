import { Game } from "../game.js";
import { GameScreen } from "../gameScreen.js";
import { Position, Measure } from "../interfaces.js";

export class GameObject {
 image: HTMLImageElement | undefined;
 position: Position = { x: 0, y: 0 };
 measure: Measure = { width: 100, height: 100 };

 constructor(
  image?: HTMLImageElement,
  position?: Partial<Position>,
  measure?: Partial<Measure>
 ) {
  this.image = image;
  Object.assign(this.position, position);
  Object.assign(this.measure, measure);
 }

 draw(_screen?: GameScreen) {
  if (!this.image) {
   console.error(`There is no image assigned to ${this}!`);
   this.drawRectangle();
   return;
  }
  Game.context.drawImage(
   this.image,
   this.position.x,
   this.position.y,
   this.measure.width,
   this.measure.height
  );
 }

 drawRectangle() {
  Game.context.fillStyle = "magenta";
  Game.context.fillRect(
   this.position.x,
   this.position.y,
   this.measure.width,
   this.measure.height
  );
 }
}
