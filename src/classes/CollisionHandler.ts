import { AnyGameObject, CollisionSide, Screen } from "../interfaces.js";
import { AnimatedObject } from "../objects/animatedObject.js";
import { ChampionObject } from "../objects/championObject.js";

export class CollisionHandler {
 static checkForCollisions(gameObjects: AnyGameObject[]) {
  for (let i = 0, l = gameObjects.length; i < l; i++) {
   const objectA = gameObjects[i];
   const {
    position: { x, y },
    measure: { width, height },
   } = objectA;
   const objectAData = { x, y, width, height };
   for (let p = i + 1; p < l; p++) {
    const objectB = gameObjects[p];
    const {
     position: { x, y },
     measure: { width, height },
    } = objectB;
    const objectBData = { x, y, width, height };
    const collision = CollisionHandler.isColliding(objectAData, objectBData);
    if (!collision) return;
    const side = CollisionHandler.collidingSide(objectAData, objectBData);
    CollisionHandler.handleCollision(side, objectA, objectB);
   }
  }
 }

 static handleCollision(
  side: CollisionSide,
  caller: ChampionObject,
  object: ChampionObject
 ) {
  switch (side) {
   case CollisionSide.Top:
    caller.velocity;
    break;
   case CollisionSide.Left:
    break;
   case CollisionSide.Bottom:
    break;
   case CollisionSide.Right:
    break;
  }
 }

 static collidingSide(boxA: Screen, boxB: Screen): CollisionSide {
  const centerBoxAX = boxA.x + boxA.width / 2;
  const centerBoxBX = boxB.x + boxB.width / 2;
  const centerBoxAY = boxA.y + boxA.height / 2;
  const centerBoxBY = boxB.y + boxB.height / 2;

  const dx = centerBoxAX - centerBoxBX;
  const dy = centerBoxAY - centerBoxBY;

  const sumOfWidths = boxA.width + boxB.width;
  const sumOfHeights = boxA.height + boxB.height;

  const centerWidth = sumOfWidths / 2;
  const centerHeight = sumOfHeights / 2;

  const xOverlap = Math.abs(dx) <= centerWidth;
  const yOverlap = Math.abs(dy) <= centerHeight;

  if (xOverlap && yOverlap) {
   // We then calculate the cross product between the relative distance (dx, dy) and the dimensions (halfWidths, halfHeights)
   const crossProductWidth = centerWidth * dy; // Imagine this as the 'height' of the cross product
   const crossProductHeight = centerHeight * dx; // And this as the 'width' of the cross product

   // This will determine the collision side
   if (crossProductWidth > crossProductHeight) {
    if (crossProductWidth > -crossProductHeight) {
     return CollisionSide.Top;
    } else {
     return CollisionSide.Left;
    }
   } else {
    if (crossProductWidth > -crossProductHeight) {
     return CollisionSide.Right;
    } else {
     return CollisionSide.Bottom;
    }
   }
  } else {
   console.warn("No collision detected...?");
   return CollisionSide.None;
  }
 }

 static isColliding(boxA: Screen, boxB: Screen) {
  const isALeftSmallerBRight = boxA.x < boxB.x + boxB.width;
  if (!isALeftSmallerBRight) return false;
  const isARightBiggerBLeft = boxA.x + boxA.width > boxB.x;
  if (!isARightBiggerBLeft) return false;
  const isATopSmallerBBottom = boxA.y < boxB.y + boxB.height;
  if (!isATopSmallerBBottom) return false;
  const isABottomBiggerBTop = boxA.y + boxA.height > boxB.y;
  if (!isABottomBiggerBTop) return false;
  return true;
 }
}
