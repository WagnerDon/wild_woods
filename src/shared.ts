import { GameObject } from "./objects/gameObject.js";
import { StaticObject } from "./objects/staticObject.js";
import { AnimatedObject } from "./objects/animatedObject.js";
import { ChampionObject } from "./objects/championObject.js";

export type AnyGameObject =
 | GameObject
 | StaticObject
 | AnimatedObject
 | ChampionObject;

export enum CollisionSide {
 Top,
 Left,
 Right,
 Bottom,
 None,
}

export interface Sprite {
 spriteHeight: number;
 duration: number;
 animations: { [key: string]: Animation };
}

export interface Animation {
 image: HTMLImageElement;
 frameAmount: number;
 duration: number;
}

export interface Screen {
 x: number;
 y: number;
 width: number;
 height: number;
}

export interface Position {
 x: number;
 y: number;
}

export interface Measure {
 width: number;
 height: number;
}

export interface Keys {
 left: string;
 up: string;
 right: string;

 //Temporary
 cycle: string;
}
