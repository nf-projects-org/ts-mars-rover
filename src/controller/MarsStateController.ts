import { StateController } from "./StateController";
import { Command } from "../model/Command";
import { PlanetaryMap } from "../model/PlanetaryMap";
import { Position } from "../model/Position";
import { CompassHeading } from "../model/Compassheading";
import { Instrument } from "../model/Instrument";

export class MarsStateController extends StateController{
    getCommand(): Command {
        throw new Error("Method not implemented.");
    }
    sendCommand(command: Command): boolean {
        throw new Error("Method not implemented.");
    }

    getAllCommands(commands: Command[]): void {
    }
    
    createRover(id: String, map: PlanetaryMap, currentPosition: Position, heading: CompassHeading, vehicles: Position[], instruments: Instrument[]) {
    }

}
