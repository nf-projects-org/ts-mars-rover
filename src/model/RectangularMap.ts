import { PlanetaryMap } from "./PlanetaryMap";
import { Position } from "./Position";

export class RectangularMap extends PlanetaryMap {
    private readonly width: number;
    private readonly height: number;

    constructor(width: number, height: number) {
        super();
        this.height = height;
        this.width = width;
    }

    isPositionInMap(position: Position): boolean {
        return position.getX() <= this.width && position.getY() <= this.height;
    }
}