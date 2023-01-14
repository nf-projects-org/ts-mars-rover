import { InputParser } from "./InputParser";
import { PlanetMap, RectangularMap, Position, CompassHeading } from "../model/PlanetMapNavigation";
import { Instrument } from "../model/Instrument";
import { Command } from "../model/Command";
import { Vehicle, MarsRover } from "../model/Vehicle";

export class MarsStateController {
    static CREATEMAP = Command.commandTypes[0];
    static CREATEROVER = Command.commandTypes[1];
    static MOVETURN = Command.commandTypes[2];
    static UNKNOWN = Command.commandTypes[3];

    private inputParser: InputParser;
    private planetMap: PlanetMap;
    private vehicles: Vehicle[];

    constructor(inputParser: InputParser) {
        this.inputParser = inputParser;
        this.vehicles = [];
    }

    /**
     * Main execution function
     */
    start() {
        let commands = this.inputParser.getCommands();
        if (commands.length > 0) {
            this.executeCommand(Command.getCreateMapCommands(commands)[0]);
            let createRoverCommands = Command.getCreateRoverCommands(commands);
            createRoverCommands.forEach(this.executeCommand);
            let moveTurnRoverCommands = Command.getMoveTurnRoverCommands(commands);
            moveTurnRoverCommands.forEach((command, index) => this.executeRoverCommand(command, index));
        }
        console.log(this.getState());
    }

    getState() {
        return `${this.planetMap}\n${this.vehicles}`;
    }

    private executeCommand = (command: Command) => {
        if (command.getCommandType() == MarsStateController.CREATEMAP) {
            let [xString, yString] = command.getValues();
            this.planetMap = RectangularMap.createMapFromString(xString, yString);
        } else if (command.getCommandType() == MarsStateController.CREATEROVER) {
            let [xString, yString, compassString] = command.getValues();
            let roverPostion = Position.createPosition([xString, yString]);
            let compassHeading = CompassHeading.createHeading(compassString);
            let vehiclePositions: Position[] = [];
            let roverInstruments: Instrument[] = [];
            this.vehicles.push(MarsRover.createRover(this.planetMap, roverPostion, compassHeading, vehiclePositions, roverInstruments));
        }
    }

    private executeRoverCommand = (command: Command, index: number) => {
        if (command.getCommandType() == MarsStateController.MOVETURN) {
            if (index >= 0) {
                this.vehicles[index].moveOrTurn(command);
            }
        }

    }
}
