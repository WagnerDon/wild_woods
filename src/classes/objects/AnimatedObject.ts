import { GameObject } from "./gameObject.js";
import { Game } from "../game.js";
import { Position, Sprite, Measure, Animation } from "../interfaces.js";
import { GameScreen } from "../components/GameScreen.js";

export class AnimatedObject extends GameObject {
 sprite: Sprite;
 spriteHeight: number;
 scaleFactor: number;
 scaledHeight = 0;
 scaledWidth = 0;
 frameIndex = 0;
 frameTime = 0;
 frameWidth = 0;
 frameAmount = 0;
 animationDuration = 0;
 currentAnimation: string | undefined;

 constructor(
  sprite: Sprite,
  position?: Partial<Position>,
  measure?: Partial<Measure>
 ) {
  super(undefined, position, measure);
  this.sprite = sprite;
  this.spriteHeight = this.sprite.spriteHeight;
  this.scaleFactor = this.measure.height / this.spriteHeight;
  this.setAnimation = "default";
 }

 logic(deltaTime: number) {
  this.nextFrame(deltaTime);
 }

 nextFrame(deltaTime: number) {
  this.frameTime += deltaTime;
  if (this.frameTime <= this.animationDuration) return;
  this.frameIndex = (this.frameIndex + 1) % this.frameAmount;
  this.frameTime -= this.animationDuration;
 }

 draw(screen: GameScreen) {
  if (this.cullObject(screen)) return;
  if (!this.image) {
   console.error(`There is no image assigned to ${this}!`);
   super.drawRectangle();
   return;
  }
  const spriteX =
   this.position.x + this.measure.width / 2 - this.scaledWidth / 2;
  const spriteY =
   this.position.y -
   this.scaledHeight / 2 +
   (this.spriteHeight / 2) * this.scaleFactor;
  Game.context.drawImage(
   this.image,
   this.frameIndex * this.frameWidth,
   0,
   this.frameWidth,
   this.image.height,
   spriteX,
   spriteY,
   this.scaledWidth,
   this.scaledHeight
  );
  this.drawSpriteBounds(spriteX, spriteY);
  this.drawObjectBounds();
 }

 drawSpriteBounds(spriteX: number, spriteY: number) {
  Game.context.strokeStyle = "green";
  Game.context.lineWidth = 2;
  Game.context.strokeRect(
   spriteX,
   spriteY,
   this.scaledWidth,
   this.scaledHeight
  );
 }

 drawObjectBounds() {
  Game.context.strokeStyle = "red";
  Game.context.lineWidth = 2;
  Game.context.strokeRect(
   this.position.x,
   this.position.y,
   this.measure.width,
   this.measure.height
  );
 }

 set setAnimation(name: string) {
  const animations = this.sprite.animations;
  if (!(name in animations)) {
   if (name === "default") name = Object.keys(animations)[0];
   else {
    console.error(`${name} not found in `);
    return;
   }
  }
  this.currentAnimation = name;
  this.setFrameData = animations[name];
  this.image = animations[name].image;
  this.scaledHeight = this.image.height * this.scaleFactor;
  this.scaledWidth = this.frameWidth * this.scaleFactor;
 }

 set setFrameData(animation: Animation) {
  this.frameIndex = 0;
  this.frameTime = 0;
  this.frameAmount = animation.frameAmount;
  this.frameWidth = animation.image.width / this.frameAmount;
  this.animationDuration = animation.duration;
 }
}
