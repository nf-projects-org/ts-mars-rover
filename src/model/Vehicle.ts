import { PlanetMap, Position, CompassHeading } from "./PlanetMapNavigation";
import { Direction } from "./Direction";

export class Vehicle {
    private readonly id: String;
    private readonly map: PlanetMap;
    private currentPosition: Position;
    private heading: CompassHeading;
    private vehicles: Position[];

    constructor(id: String, map: PlanetMap, currentPosition: Position, heading: CompassHeading, vehicles: Position[]) {
        this.id = id;
        this.map = map;
        this.currentPosition = currentPosition;
        this.heading = heading;
        this.vehicles = vehicles;
    }

    move() {
        if (this.id) { }
        if (this.map) { }
        if (this.currentPosition) { }
        if (this.heading) { }
        if (this.vehicles) { }
        return "";
    }

    turn(direction: Direction) {
        if (direction) { }
        return "";
    }

    broadcastPosition() {
        return this.currentPosition;
    }

    getOtherVehiclePositions() {

    }
}