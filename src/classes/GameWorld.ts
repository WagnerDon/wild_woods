import { AnimatedObject } from "./objects/animatedObject.js";
import { ChampionObject } from "./objects/championObject.js";

export class GameWorld {
 gameObjects: (ChampionObject | AnimatedObject)[] = [];
}
