import { InputParser } from "./InputParser";
import { PlanetMap, RectangularMap, Position, CompassHeading } from "../model/PlanetMapNavigation";
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
    private planetMap:PlanetMap;
    private vehicles:Vehicle[];

    constructor(inputParser:InputParser){
        this.inputParser = inputParser;
        this.vehicles = [];
    }

    start(){
        let commands = this.inputParser.getCommands();
        console.log(commands);
        if(commands.length > 0){
            this.executeCommand(Command.getCreateMapCommands(commands)[0]);
            Command.getCreateRoverCommands(commands).forEach(this.executeCommand);
        }
        console.log(this.getState());

    }

    getState(){
        let output = `${this.planetMap}\n${this.vehicles}`
        return output;
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


    


}
