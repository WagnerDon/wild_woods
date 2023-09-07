import Game from "./Game";

export default class Loop {
  constructor(game: Game) {
    this.game = game;
    this.frameInterval = 1000 / 30;
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  previousTimestamp: number | undefined;
  frameInterval: number;
  game: Game;

  loop(currentTimestamp: number) {
    const frameInterval = this.frameInterval;
    const elapsedTime =
      currentTimestamp - (this.previousTimestamp ?? currentTimestamp);
    this.previousTimestamp = currentTimestamp - (elapsedTime % frameInterval);
    if (elapsedTime > frameInterval) {
      const deltaTime = elapsedTime / 1000;
      this.game.update(deltaTime);
    }
    requestAnimationFrame(this.loop);
  }
}
