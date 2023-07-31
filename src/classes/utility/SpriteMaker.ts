import { ImageLibrary } from "./imageLibrary.js";
import { Sprite } from "../interfaces.js";

export class SpriteMaker {
 private static readonly sprites: { [key: string]: Sprite } = {}; // Or use new Map() (Hash Map)

 static async loadSprites() {
  const response = await fetch("../assets/data/sprites.json");
  const json = await response.json();
  const spriteFiles = json.sprites;
  for (const file of spriteFiles) {
   const { name, spriteHeight, animations } = file;
   SpriteMaker.sprites[name] = {
    spriteHeight,
    duration: 0,
    animations: {},
   };
   const sprite = SpriteMaker.sprites[name];
   sprite.spriteHeight = spriteHeight;
   for (const file of animations) {
    const { name, duration, data } = file;
    const { url, frameAmount } = data;
    const image = await ImageLibrary.loadImage(url);
    sprite.animations[name] = {
     image: image,
     frameAmount: frameAmount,
     duration: duration,
    };
   }
  }
 }

 static getSprite(name: string) {
  return SpriteMaker.sprites[name];
 }
}
