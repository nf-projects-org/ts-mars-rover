import { PlanetMap, Position, CompassHeading, Direction } from "./PlanetMapNavigation";
import { Instrument } from "./Instrument";
import * as uuid from 'uuid';


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

    toString(){
        return `${this.id} - ${this.currentPosition} - ${this.heading}`;
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


export class MarsRover extends Vehicle {
    private readonly instruments: Instrument[];

    constructor(id: String, map: PlanetMap, currentPosition: Position, heading: CompassHeading, vehicles: Position[], instruments: Instrument[]) {
        super(id, map, currentPosition, heading, vehicles);
        this.instruments = instruments;
    }

    static createRover(map: PlanetMap, currentPosition: Position, heading: CompassHeading, vehicles: Position[], instruments: Instrument[]) {
        const id = uuid.v4();
        return new MarsRover(id, map, currentPosition, heading, vehicles, instruments);
    }

    calculatePath() {
        return true;
    }

    captureImage(){
        if (this.instruments!=null){

        }
        return false;
    }

}