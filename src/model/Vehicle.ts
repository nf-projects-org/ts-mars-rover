import { PlanetaryMap } from "./PlanetaryMap";
import { Position } from "./Position";
import { CompassHeading } from "./Compassheading";
import { Direction } from "./Direction";

export class Vehicle {
    private readonly id: String;
    private readonly map: PlanetaryMap;
    private currentPosition: Position;
    private heading: CompassHeading;
    private vehicles: Position[];

    constructor(id: String, map: PlanetaryMap, currentPosition: Position, heading: CompassHeading, vehicles: Position[]) {
        this.id = id;
        this.map = map;
        this.currentPosition = currentPosition;
        this.heading = heading;
        this.vehicles = vehicles;
    }

    move() {
        return "";
    }

    turn(direction: Direction) {
        return "";
    }

    broadcastPosition() {
        return this.currentPosition;
    }

    getOtherVehiclePositions() {

    }
}