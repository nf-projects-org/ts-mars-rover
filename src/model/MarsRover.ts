import { Vehicle } from "./Vehicle";
import { Instrument } from "./Instrument";
import { PlanetaryMap } from "./PlanetaryMap";
import { Position } from "./Position";
import { CompassHeading } from "./Compassheading";


export class MarsRover extends Vehicle {
    private readonly instruments: Instrument[];

    constructor(id: String, map: PlanetaryMap, currentPosition: Position, heading: CompassHeading, vehicles: Position[], instruments: Instrument[]) {
        super(id, map, currentPosition, heading, vehicles);
        this.instruments = instruments;
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