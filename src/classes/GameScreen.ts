import { shared } from "../shared.js";

export default class GameScreen {
 constructor({ x, y, width, height }: shared.BoundingBox) {
  this.position = { x, y };
  this.measure = { width, height };
  this.viewport = { x: 0, y: 0 };
 }

 position: shared.Coordinate;
 measure: shared.Dimension;
 viewport: shared.Coordinate;

 update({ x, y, width, height }: shared.BoundingBox) {
  this.viewport.x = x + width / 2 - this.measure.width / 2;
  this.viewport.y = y + height / 2 - this.measure.height / 2;
 }

 draw(ctx: CanvasRenderingContext2D, arr: any[]) {
  const positionX = this.position.x;
  const positionY = this.position.y;

  ctx.save();

  ctx.beginPath();
  ctx.rect(positionX, positionY, this.measure.width, this.measure.height);
  ctx.clip();

  ctx.translate(positionX + this.viewport.x, positionY + this.viewport.y);

  arr.forEach((entity) => entity.draw());

  ctx.restore();
 }
}
