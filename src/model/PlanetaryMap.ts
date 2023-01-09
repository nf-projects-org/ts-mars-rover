import { Position } from "./Position";

export abstract class PlanetaryMap {
    abstract isPositionInMap(position: Position): boolean;
}