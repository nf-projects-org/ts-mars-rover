import { Vehicle } from "./Vehicle";
import { Instrument } from "./Instrument";
import { PlanetaryMap } from "./PlanetaryMap";
import { Position } from "./Position";
import { CompassHeading } from "./Compassheading";
import * as uuid from 'uuid';

export class MarsRover extends Vehicle {
    private readonly instruments: Instrument[];

    constructor(id: String, map: PlanetaryMap, currentPosition: Position, heading: CompassHeading, vehicles: Position[], instruments: Instrument[]) {
        super(id, map, currentPosition, heading, vehicles);
        this.instruments = instruments;
    }

    static createRover(map: PlanetaryMap, currentPosition: Position, heading: CompassHeading, vehicles: Position[], instruments: Instrument[]) {
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