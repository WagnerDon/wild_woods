import { shared } from "../shared.js";
import GameController from "./GameController.js";
import GameScreen from "./GameScreen.js";
import GameWorld from "./GameWorld.js";
import GameObject from "./game_objects/GameObject.js";
import InputLogger from "./utility/InputLogger.js";

export default class Game {
 constructor({ canvas, ctx }: shared.CanvasData) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.players = this.createPlayers(canvas);
  this.world = new GameWorld(this.players);
  this.inputLogger = new InputLogger();
  this.loop = this.loop.bind(this);
  requestAnimationFrame(this.loop);
 }

 players: shared.PlayerData[];
 inputLogger: InputLogger;
 canvas: HTMLCanvasElement;
 ctx: CanvasRenderingContext2D;
 world: GameWorld;

 createPlayers(canvas: HTMLCanvasElement) {
  const boundingBox_1 = { x: 20, y: 10, width: 100, height: 100 };
  const boundingBox_2 = { x: 100, y: 120, width: 100, height: 100 };
  const { width, height } = { width: canvas.width / 2, height: canvas.height };
  const keys_1 = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
  const keys_2 = ["KeyA", "KeyD", "KeyW", "KeyS"];
  const object_1 = new GameObject(boundingBox_1);
  const object_2 = new GameObject(boundingBox_2);

  const playerData_1 = {
   id: 0,
   screen: new GameScreen(object_1, { x: width, y: 0, width, height }),
   controller: new GameController({ id: 0, keys: keys_1, object: object_1 }),
   object: object_1,
  };

  const playerData_2 = {
   id: 1,
   screen: new GameScreen(object_2, { x: 0, y: 0, width, height }),
   controller: new GameController({ id: 1, keys: keys_2, object: object_2 }),
   object: object_2,
  };

  return [playerData_1, playerData_2];
 }

 loopData: shared.LoopData = {
  frameInterval: 1000 / 100,
  previousTimestamp: undefined,
 };

 loop(currentTimestamp: number) {
  const frameInterval = this.loopData.frameInterval;
  const elapsedTime =
   currentTimestamp - (this.loopData.previousTimestamp ?? currentTimestamp);
  this.loopData.previousTimestamp =
   currentTimestamp - (elapsedTime % frameInterval);
  if (elapsedTime > frameInterval) {
   const deltaTime = elapsedTime / 1000;
   this.update(deltaTime);
  }
  requestAnimationFrame(this.loop);
 }

 update(deltaTime: number) {
  const players = this.players;

  players.forEach((player) => {
   player.controller.forceControl(this.inputLogger, deltaTime);
   player.screen.lockViewport(deltaTime);
  });

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  players.forEach((player) => {
   player.screen.draw(this.world.objects.reverse(), this.ctx);
  });
 }
}
