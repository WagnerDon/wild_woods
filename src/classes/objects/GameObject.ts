import { shared } from "../../shared";

export default class GameObject {
 constructor(boundingBox: shared.BoundingBox, image?: HTMLImageElement) {
  this.boundingBox = boundingBox;
  this.image = image;
  this.color = `rgb(${this.colorNumber()},${this.colorNumber()},${this.colorNumber()})`;
 }

 boundingBox: shared.BoundingBox;
 color: string;
 image: HTMLImageElement | undefined;

 draw(ctx: CanvasRenderingContext2D) {
  if (!this.image) {
   this.drawRectangle(ctx);
   return;
  }

  const { x, y, width, height } = this.boundingBox;

  ctx.drawImage(this.image, x, y, width, height);
 }

 drawRectangle(ctx: CanvasRenderingContext2D) {
  const { x, y, width, height } = this.boundingBox;
  ctx.fillStyle = this.color;
  ctx.fillRect(x, y, width, height);
 }
}
