import { shared } from "../shared.js";
import GameWorld from "./GameWorld.js";

export default class Game {
 constructor({ canvas, ctx }: shared.CanvasData) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.world = new GameWorld(canvas);
  this.loop = this.loop.bind(this);
  requestAnimationFrame(this.loop);
 }

 canvas: HTMLCanvasElement;
 ctx: CanvasRenderingContext2D;
 world: GameWorld;

 loopData: shared.LoopData = {
  frameInterval: 1000 / 30,
  previousTimestamp: undefined,
 };

 loop(currentTimestamp: number) {
  const frameInterval = this.loopData.frameInterval;
  const elapsedTime =
   currentTimestamp - (this.loopData.previousTimestamp ?? currentTimestamp);
  if (elapsedTime > frameInterval) {
   this.loopData.previousTimestamp =
    currentTimestamp - (elapsedTime % frameInterval);
   const deltaTime = elapsedTime / 1000;
   this.update(deltaTime);
  }
  requestAnimationFrame(this.loop);
 }

 update(deltaTime: number) {
  this.world.entities.forEach((entity) => entity.update(deltaTime));
  this.world.players.forEach((player) =>
   player.screen.update({
    x: player.entity.x,
    y: player.entity.y,
    width: player.entity.width,
    height: player.entity.height,
   })
  );
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.world.players.forEach((player) =>
   player.screen.draw(this.ctx, this.world.entities)
  );
 }
}
