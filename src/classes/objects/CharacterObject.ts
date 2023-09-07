import { AnimatedObject } from "./animatedObject.js";
import { Position, Measure, Sprite } from "../interfaces.js";
import { GameScreen } from "../components/GameScreen.js";
import { Game } from "../game.js";

export class ChampionObject extends AnimatedObject {
 mirrored = false;
 velocity: Position = { x: 0, y: 0 };
 stats: { [key: string]: number } = {
  hp: 10,
  strength: 1,
  speed: 3,
 };

 constructor(
  sprite: Sprite,
  position?: Partial<Position>,
  measure?: Partial<Measure>
 ) {
  super(sprite, position, measure);
 }

 logic(deltaTime: number) {
  this.mirror();
  this.updatePosition(deltaTime);
  super.nextFrame(deltaTime);
  this.defaultAnimations();
 }

 mirror() {
  const velocityX = this.velocity.x;
  if (velocityX !== 0) this.mirrored = velocityX < 0;
 }

 updatePosition(deltaTime: number) {
  this.position.x += this.velocity.x * deltaTime;
  this.position.y += this.velocity.y * deltaTime;
 }

 defaultAnimations() {
  const animation = this.currentAnimation;
  const inMotion = this.velocity.x !== 0;
  const idle = animation === "idle";
  const walking = animation === "walk";
  if (inMotion && idle) super.setAnimation = "walk";
  else if (!inMotion && walking) super.setAnimation = "idle";
  const animationEnd = this.frameIndex !== 0;
  if (!animationEnd) return;
  if (!idle && !walking) super.setAnimation = "idle";
 }

 draw(screen: GameScreen) {
  if (this.cullObject(screen)) return;
  if (!this.image) {
   console.error(`There is no image assigned to ${this}!`);
   super.drawRectangle();
   return;
  }
  const condition = this.mirrored;
  const spriteX =
   this.position.x + this.measure.width / 2 - this.scaledWidth / 2;
  const spriteY =
   this.position.y -
   this.scaledHeight / 2 +
   (this.spriteHeight / 2) * this.scaleFactor;
  this.save = condition;
  Game.context.drawImage(
   this.image,
   this.frameIndex * this.frameWidth,
   0,
   this.frameWidth,
   this.image.height,
   condition ? -spriteX - this.scaledWidth : spriteX,
   spriteY,
   this.scaledWidth,
   this.scaledHeight
  );
  this.drawSpriteBounds(spriteX, spriteY);
  this.restore = condition;
  this.drawObjectBounds();
 }

 drawSpriteBounds(spriteX: number, spriteY: number) {
  Game.context.strokeStyle = "green";
  Game.context.lineWidth = 2;
  Game.context.strokeRect(
   this.mirrored ? -spriteX - this.scaledWidth : spriteX,
   spriteY,
   this.scaledWidth,
   this.scaledHeight
  );
 }

 set save(condition: boolean) {
  if (!condition) return;
  Game.context.save();
  Game.context.scale(-1, 1);
 }

 set restore(condition: boolean) {
  if (!condition) return;
  Game.context.restore();
 }
}
