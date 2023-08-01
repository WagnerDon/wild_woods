import { shared } from "../shared.js";
import GameScreen from "./GameScreen.js";

export default class GameWorld {
 constructor(canvas: HTMLCanvasElement) {
  this.players = this.createPlayers(canvas);
  this.entities = [];
  this.entities.concat(this.players.map((player) => player.entity));
 }

 entities: any[];
 players: shared.PlayerData[];

 createPlayers(canvas: HTMLCanvasElement) {
  const measure = { width: canvas.width / 2, height: canvas.height };
  const player1 = {
   entity: null,
   screen: new GameScreen({ x: 0, y: 0, ...measure }),
   keys: null,
  };
  const player2 = {
   entity: null,
   screen: new GameScreen({ x: canvas.width / 2, y: 0, ...measure }),
   keys: null,
  };
  return [player1, player2];
 }
}

// Characters
// Tiles
// Items
// Backgrounds
// Players
