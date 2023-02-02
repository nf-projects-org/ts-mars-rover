import { InputParser } from "./input_parser";
import { PlanetMap, RectangularMap, Position, CompassHeading } from "../model/planet_map_navigation";
import { Command } from "../model/command";
import { Vehicle, MarsRover } from "../model/vehicle";
import { Camera, RobotArm } from "../model/instrument";

export class MarsStateController {

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
            this.executeCreationCommand(commands.filter(Command.filterCommandType("CREATEMAP")) [0]);
            let createRoverCommands = commands.filter(Command.filterCommandType("CREATEROVER"));
            createRoverCommands.forEach(this.executeCreationCommand);
            let moveTurnRoverCommands = commands.filter(Command.filterCommandType("MOVEORTURN"));
            moveTurnRoverCommands.forEach((command, index) => this.executeRoverCommand(command, index));
        }
        this.vehicles.forEach(vehicle => console.log(vehicle.toString()))
    }

    getState() {
        return `${this.planetMap}\n${this.vehicles}`;
    }

    /**
     * Creates Maps and Rovers depending on the passed command
     * @param command 
     */
    private executeCreationCommand = (command: Command) => {
        if (command.getCommandType() === "CREATEMAP") {
            let [xString, yString] = command.getCommandParams();
            this.planetMap = RectangularMap.createMapFromString(xString, yString);
        } else if (command.getCommandType() === "CREATEROVER") {
            let [xString, yString, compassString] = command.getCommandParams();
            let roverPostion = Position.createPosition([xString, yString]);
            let compassHeading = CompassHeading.createHeading(compassString);
            let vehiclePositions: Position[] = [];
            let roverInstruments: Array<RobotArm|Camera> = [];
            this.vehicles.push(MarsRover.createRover(this.planetMap, roverPostion, compassHeading, vehiclePositions, roverInstruments));
        }
    }

    /**
     * Sends a Move or Turn command to the rover to execute
     * @param command 
     * @param index 
     */
    private executeRoverCommand = (command: Command, index: number) => {
        if (command.getCommandType() === "MOVEORTURN") {
            if (index >= 0) {
                this.vehicles[index].moveOrTurn(command);
            }
        }

    }
}
