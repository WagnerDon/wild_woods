import { shared } from "../../shared.js";
import InputLogger from "./InputLogger.js";

export default class GameController {
 constructor({ id, keys, object }: shared.ControllerData) {
  this.id = id;
  this.keys = keys;
  this.object = object;
 }

 id: number;
 keys: string[];
 object: any;

 forceControl(inputLogger: InputLogger, deltaTime: number) {
  const [left, right, up, down] = this.keys;
  const boundingBox = this.object.boundingBox;
  const speed = 200 * deltaTime;

  if (inputLogger.getKey(left)) boundingBox.x -= speed;
  else if (inputLogger.getKey(right)) boundingBox.x += speed;
  else if (inputLogger.getKey(up)) boundingBox.y -= speed;
  else if (inputLogger.getKey(down)) boundingBox.y += speed;
 }
}
