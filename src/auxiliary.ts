import { shared } from "./shared";

export * as auxiliary from "./auxiliary.js";

export function getCenter({
    x,
    y,
    w,
    h,
}: shared.BoundingBox): shared.Coordinates {
    const cx = x + w / 2;
    const cy = y + h / 2;
    return { x: cx, y: cy };
}

export function drawBorder(
    { x, y, w, h }: shared.BoundingBox,
    ctx: CanvasRenderingContext2D,
    {
        color = "red",
        lineWidth = 5,
        opacity = 1,
    }: { color?: string; lineWidth?: number; opacity?: number }
) {
    ctx.globalAlpha = opacity;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
}

export function drawRectangle(
    { x, y, w, h }: shared.BoundingBox,
    ctx: CanvasRenderingContext2D,
    { color = "red", opacity = 1 }: { color?: string; opacity?: number }
) {
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}
