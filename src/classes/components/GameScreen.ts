import { shared } from "../../shared.js";

export default class GameScreen {
 constructor(boundingBox: shared.BoundingBox) {
  this.boundingBox = boundingBox;
  this.viewport = { x: 0, y: 0 };
 }

 object: any;
 viewport: shared.Coordinate;
 boundingBox: shared.BoundingBox;

 lockViewport(deltaTime: number, boundingBox: any) {
  const { x, y, width, height } = boundingBox;
  const { x: vx, y: vy } = this.viewport;
  const { width: sWidth, height: sHeight } = this.boundingBox;
  const objectCenterX = x + width / 2;
  const objectCenterY = y + height / 2;
  const viewportCenterX = vx + sWidth / 2;
  const viewportCenterY = vy + sHeight / 2;
  const differenceX = objectCenterX - viewportCenterX;
  const differenceY = objectCenterY - viewportCenterY;

  const speed = 200 * deltaTime;

  const moving = Math.abs(differenceX) + Math.abs(differenceY) > 0;
  if (!moving) return;

  if (differenceX > 0)
   this.viewport.x += Math.abs(differenceX) < 10 ? 1 : speed;
  else if (differenceX < 0)
   this.viewport.x -= Math.abs(differenceX) < 10 ? 1 : speed;

  if (differenceY > 0)
   this.viewport.y += Math.abs(differenceY) < 10 ? 1 : speed;
  else if (differenceY < 0)
   this.viewport.y -= Math.abs(differenceY) < 10 ? 1 : speed;
 }

 draw(objects: any[], ctx: CanvasRenderingContext2D) {
  const { x, y, width, height } = this.boundingBox;

  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, width, height);

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();

  ctx.translate(x - this.viewport.x, y - this.viewport.y);

  objects.forEach((object) => object.draw(ctx));
  ctx.restore();
 }
}
