import { auxiliary } from "../auxiliary.js";
import { shared } from "../shared.js";

export default class Screen {
    constructor({ x, y, w, h }: shared.BoundingBox, speed: number) {
        this.boundingBox = { x: 0, y: 0, w, h };
        this.coordinates = { x, y };
        this.speed = speed;
    }
    speed: number;
    coordinates: shared.Coordinates;
    boundingBox: shared.BoundingBox;

    update({ x: cx, y: cy }: shared.Coordinates, deltaTime: number) {
        const speed = this.speed * deltaTime;
        const { x, y, w, h } = this.boundingBox;
        const dx = cx - (x + w / 2);
        const dy = cy - (y + h / 2);
        this.boundingBox.x += dx * speed;
        this.boundingBox.y += dy * speed;
    }

    draw(objects: any[], ctx: CanvasRenderingContext2D) {
        const { x, y, w, h } = this.boundingBox;
        const { x: cx, y: cy } = this.coordinates;

        // set clipping region
        ctx.save();
        ctx.beginPath();
        ctx.rect(cx, cy, w, h);
        ctx.clip();

        // move viewport
        ctx.translate(cx - x, cy - y);

        // draw objects
        objects.forEach((object) => object.draw(ctx));
        ctx.restore();

        // draw border
        auxiliary.drawBorder({ x: cx, y: cy, w, h }, ctx, {});

        // draw center of screen
        auxiliary.drawRectangle(
            {
                x: cx + w / 2 - 7,
                y: cy + h / 2 - 7,
                w: 14,
                h: 14,
            },
            ctx,
            { color: "white" }
        );
    }
}
