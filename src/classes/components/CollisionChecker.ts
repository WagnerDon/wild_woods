import { shared } from "../../shared.js";

export class CollisionChecker {
 collision(
  { x: ax, y: ay, width: aWidth, height: aHeight }: shared.BoundingBox,
  { x: bx, y: by, width: bWidth, height: bHeight }: shared.BoundingBox
 ) {
  const isALeftSmallerBRight = ax < bx + bWidth;
  if (!isALeftSmallerBRight) return false;
  const isARightBiggerBLeft = ax + aWidth > bx;
  if (!isARightBiggerBLeft) return false;
  const isATopSmallerBBottom = ay < by + bHeight;
  if (!isATopSmallerBBottom) return false;
  const isABottomBiggerBTop = ay + aHeight > by;
  if (!isABottomBiggerBTop) return false;
  return true;
 }

 /* checkForCollisions(objects: any[]) {
  for (let i = 0, l = objects.length; i < l; i++) {
   const objectA = objects[i];
   const {
    position: { x, y },
    measure: { width, height },
   } = objectA;
   const objectAData = { x, y, width, height };
   for (let p = i + 1; p < l; p++) {
    const objectB = objects[p];
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
 } */

 /* collidingSide(boxA: Screen, boxB: Screen): CollisionSide {
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
 } */
}
