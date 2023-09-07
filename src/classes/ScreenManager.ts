import Screen from "./Screen.js";
import { shared } from "../shared.js";

export default class ScreenManager {
    constructor({ w, h }: shared.Dimensions, splitscreen: boolean) {
        this.splitscreen = splitscreen;
        this.screens = splitscreen
            ? [new Screen({ x: 0, y: 0, w, h }, 0.5)]
            : [
                  new Screen({ x: 0, y: 0, w, h }, 0.5),
                  new Screen({ x: 0, y: 0, w: w / 2, h: h / 2 }, 0.3),
                  new Screen({ x: 0, y: 0, w: w / 2, h: h / 2 }, 0.3),
              ];
    }

    splitscreen: boolean;
    screens: Screen[];

    update(
        boundingBoxes: shared.BoundingBox[],
        canvas: HTMLCanvasElement,
        deltaTime: number
    ) {
        if (!this.splitscreen) {
            const screen = this.screens[0];
            const boundingBox = boundingBoxes[0];
            screen.update(boundingBox, deltaTime);
            return false;
        }

        const screen = this.screens[0];
        const [boundingBoxA, boundingBoxB] = boundingBoxes;
        const dx = (boundingBoxA.x - boundingBoxB.x) / 2;
        const dy = (boundingBoxA.y - boundingBoxB.y) / 2;
        const coordinates = {
            x: dx + boundingBoxA.x,
            y: dy + boundingBoxA.y,
        };
        if (dx < canvas.width) {
            screen.update(coordinates, deltaTime);
        } else {
            this.screens.forEach((screen, index) =>
                screen.update(this.screens, deltaTime)
            );
        }
    }

    draw(objects: any[], ctx: CanvasRenderingContext2D) {
        if (!this.splitscreen) {
            const screen = this.screens[0];
            screen.draw(objects, ctx);
            return;
        }
    }
}
