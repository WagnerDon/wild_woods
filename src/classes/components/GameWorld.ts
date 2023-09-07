import { shared } from "../../shared.js";

export default class GameWorld {
 constructor(players: shared.PlayerData[]) {
  this.objects = players.map((player) => player.object);
 }

 objects: any[];
}
