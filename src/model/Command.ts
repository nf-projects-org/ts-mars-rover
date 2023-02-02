import { Position } from "./planet_map_navigation";

const COMMAND_TYPES = ['CREATEMAP', 'CREATEROVER', 'MOVEORTURN', "UNKNOWN"] as const;
export type CommandType = typeof COMMAND_TYPES[number];

export class Command {
    private commandType: CommandType;
    private commandParameters: string[];

    constructor(commandType: CommandType, commandParameters: string[]) {
        this.commandType = commandType
        this.commandParameters = commandParameters;
    }

    static readonly createMapRegex = /^\d+ \d+$/;
    static readonly createRoverRegex = /^\d+ \d+ [NSEW]$/;
    static readonly moveTurnRegex = /^[LMR]+$/;

    /**
     * 
     * @param input - Lines of input from the user
     * @returns parsed and validated list of commands or empty list if 
     * any command could not be validated or parsed
     * All commands are run or no commands are run
     */
    static createCommands(input: string[]) {
        let commands = input.map(commandString => this.parseCommand(commandString));
        if (Command.validateCommandList(commands)) {
            return commands;
        } else {
            return [];
        }
    }


    /**
     * 
     * @param input 
     * @returns Command object corresponding to input or Unknown Command for unrecognized input
     */
    static parseCommand(input: string) {
        if (this.createMapRegex.test(input)) {
            return new Command("CREATEMAP", input.split(" "));
        } else if (this.createRoverRegex.test(input)) {
            return new Command("CREATEROVER", input.split(" "));
        } else if (this.moveTurnRegex.test(input)) {
            return new Command("MOVEORTURN", input.split(""));
        }
        else {
            console.log(input);
            return new Command("UNKNOWN", input.split(" "));
        }
    }


    /**
     * 
     * @param commands 
     * @returns true if the commands are all valid
     * No invalid commands
     * Single Create map
     * At least one Rover created
     * Rovers at separate positions and not on top of each other
     * Every Rover has one MOVEORTURN command
     */
    static validateCommandList(commands: Command[]) {
        if (commands.length == 0) {
            return false;
        }
        let invalidCommands = commands.filter(this.filterCommandType("UNKNOWN"));
        let createMapCommands = commands.filter(this.filterCommandType("CREATEMAP"));
        let createRoverCommands = commands.filter(this.filterCommandType("CREATEROVER"))
        let moveTurnCommands = commands.filter(this.filterCommandType("MOVEORTURN"));

        if (invalidCommands.length > 0) {
            console.log("Invalid commands found. Terminating");
            console.log(invalidCommands);
            return false;
        }

        let roverPositions = createRoverCommands.map(command => {
            let [xString, yString] = command.commandParameters;
            let roverPostion = Position.createPosition([xString, yString]);
            return roverPostion
        });
        for (let i = 0; i < roverPositions.length; i++) {
            for (let j = i + 1; j < roverPositions.length; j++) {
                if (roverPositions[i].toString() == roverPositions[j].toString()) {
                    console.log("Rovers at the same position. Terminating");
                    return false;
                }
            }
        }

        if (commands[0].commandType !== "CREATEMAP") {
            console.log("First Command must be the Create Map. Terminating");
            return false;
        }
        if (createMapCommands.length != 1) {
            console.log("One map must be created. Terminating");
            return false;
        }

        if (createRoverCommands.length < 1) {
            console.log("At least one rover must be created. Terminating");
            return false;
        }

        if (createRoverCommands.length !== moveTurnCommands.length) {
            console.log("Each rover needs to have a move or turn command. Terminating");
            return false;
        }

        return true;
    }

    static filterCommandType = (type: CommandType) => (command: Command) => command.commandType === type;

  
    toString() {
        return `${this.commandType} - ${this.commandParameters}`
    }

    getCommandType(){
        return this.commandType;
    }

    getCommandParams(){
        return this.commandParameters;
    }
   
}