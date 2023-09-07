import { shared } from "../../shared.js";

export default class Culler {
 cullObjects(objects: any[], boundingBox: shared.BoundingBox) {
  objects.forEach((object) => {
   const { x, y, width, height } = object.boundingBox;
   const objectWidth = x + width;
   const objectHeight = y + height;

   const { x: vx, y: vy, width: vWidth, height: vHeight } = boundingBox;
   const viewportWidth = vx + vWidth;
   const viewportHeight = vy + vHeight;
   const conditionX = objectWidth < vx || x > viewportWidth;
   const conditionY = objectHeight < vy || y > viewportHeight;
   if (conditionX && conditionY) return true;
  });
 }
}
