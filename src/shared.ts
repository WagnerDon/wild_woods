import GameScreen from "./classes/GameScreen.js";
import GameController from "./classes/GameController.js";

export * as shared from "./shared.js";

export interface ControllerData {
 id: number;
 keys: string[];
 object: any;
}

export interface BoundingBox extends Coordinate, Dimension {}

export interface Direction {
 left: string;
 right: string;
 up: string;
 down: string;
}

export interface Dimension {
 width: number;
 height: number;
}

export interface Coordinate {
 x: number;
 y: number;
}

export interface PlayerData {
 id: number;
 screen: GameScreen;
 controller: GameController;
 object: any;
}

export interface LoopData {
 frameInterval: number;
 previousTimestamp: number | undefined;
}

export interface CanvasData {
 canvas: HTMLCanvasElement;
 ctx: CanvasRenderingContext2D;
}
