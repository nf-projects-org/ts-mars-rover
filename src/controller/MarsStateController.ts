import { InputParser } from "./InputParser";
import { Command } from "../model/Command";
import { PlanetaryMap } from "../model/PlanetaryMap";
import { Position } from "../model/Position";
import { CompassHeading } from "../model/Compassheading";
import { Instrument } from "../model/Instrument";
import { MarsRover } from "../model/MarsRover";

export class MarsStateController {
    private inputParser:InputParser;

    constructor(inputParser:InputParser){
        this.inputParser = inputParser;
    }

    start(){
        let commands = this.inputParser.getCommands();
    }

    // private getCommand(): Command {
    //     return new Command();
    // }
    // private sendCommand(command: Command): boolean {
    //     if (command){}
    //     return false;
    // }

    
    createRover(id: String, map: PlanetaryMap, currentPosition: Position, heading: CompassHeading, vehicles: Position[], instruments: Instrument[]) {
        return new MarsRover(id, map, currentPosition, heading, vehicles, instruments);
    }

}
