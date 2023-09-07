export * as shared from "./shared.js";

export interface Coordinates {
 x: number;
 y: number;
}

export interface Dimensions {
 w: number;
 h: number;
}

export interface BoundingBox extends Coordinates, Dimensions {}
