import { InputParser } from "./InputParser";
import { PlanetaryMap } from "../model/PlanetaryMap";
import { RectangularMap } from "../model/RectangularMap";
import { Position } from "../model/Position";
import { CompassHeading } from "../model/Compassheading";
import { Instrument } from "../model/Instrument";
import { MarsRover } from "../model/MarsRover";
import { Command } from "../model/Command";
import { Vehicle } from "../model/Vehicle";

export class MarsStateController {
    static CREATEMAP = Command.commandTypes[0];
    static CREATEROVER = Command.commandTypes[1];
    static MOVE = Command.commandTypes[2];
    static TURN = Command.commandTypes[3];
    static UNKNOWN = Command.commandTypes[4];

    private inputParser:InputParser;
    private planetMap:PlanetaryMap;
    private vehicles:Vehicle[];

    constructor(inputParser:InputParser){
        this.inputParser = inputParser;
    }

    start(){
        let commands = this.inputParser.getCommands();
        //TODO get all command types and execute in the right order

    }

    private executeCommand = (command:Command) => {
        if (command.getCommandType() == MarsStateController.CREATEMAP){
            let [xString,yString] = command.getValues();
            this.planetMap = RectangularMap.createMapFromString(xString,yString);
        } else if(command.getCommandType() == MarsStateController.CREATEROVER){
            let [xString, yString, compassString] = command.getValues();
            let roverPostion = Position.createPosition([xString,yString])
            let compassHeading = CompassHeading.createHeading(compassString);
            let vehiclePositions:Position[] = [];
            let roverInstruments:Instrument[] = [];
            this.vehicles.push(MarsRover.createRover(this.planetMap, roverPostion, compassHeading, vehiclePositions,roverInstruments ));
        }
    }

    // private getCommand(): Command {
    //     return new Command();
    // }
    // private sendCommand(command: Command): boolean {
    //     if (command){}
    //     return false;
    // }

    


}
