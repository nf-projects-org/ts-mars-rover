import { Position } from "./PlanetMapNavigation";
export class Command {
    private commandType: string;
    private values: string[];

    constructor(commandType: string, values: string[]) {
        this.commandType = commandType
        this.values = values;
    }

    static commandTypes = ['CREATEMAP', 'CREATEROVER', 'MOVETURN', "UNKNOWN"] as const
    static createMapRegex = /^\d+ \d+$/;
    static createRoverRegex = /^\d+ \d+ [NSEW]$/;
    static moveTurnRegex = /^[LMR]+$/;

    static parseCommand(input: string) {
        if (this.createMapRegex.test(input)) {
            return new Command(this.commandTypes[0], input.split(" "));
        } else if (this.createRoverRegex.test(input)) {
            return new Command(this.commandTypes[1], input.split(" "));
        } else if (this.moveTurnRegex.test(input)) {
            return new Command(this.commandTypes[2], input.split(""));
        }
        else {
            console.log(input);
            return new Command(this.commandTypes[3], input.split(" "));
        }
    }

    static createCommands(input: string[]) {
        let commands = input.map(commandString => this.parseCommand(commandString));
        if (Command.validateCommandList(commands)) {
            return commands;
        } else {
            return [];
        }
    }

    static validateCommandList(commands: Command[]) {
        if (commands.length == 0) {
            return false;
        }
        let invalidCommands = this.getInvalidCommands(commands);
        let createMapCommands = this.getCreateMapCommands(commands);
        let createRoverCommands = this.getCreateRoverCommands(commands);
        let moveTurnCommands = this.getMoveTurnRoverCommands(commands);

        if (invalidCommands.length > 0) {
            console.log("Invalid commands found. Terminating");
            console.log(invalidCommands);
            return false;
        }

        let roverPositions = createRoverCommands.map(command => {
            let [xString, yString] = command.getValues();
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

        if (commands[0].getCommandType() !== Command.commandTypes[0]) {
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

    static filterCommandType = (type: string) => (command: Command) => command.getCommandType() === type;

    static getCreateRoverCommands(commands: Command[]) {
        return commands.filter(this.filterCommandType(Command.commandTypes[1]))
    }

    static getMoveTurnRoverCommands(commands: Command[]) {
        return commands.filter(this.filterCommandType(Command.commandTypes[2]));
    }

    static getCreateMapCommands(commands: Command[]) {
        return commands.filter(this.filterCommandType(Command.commandTypes[0]));
    }

    static getInvalidCommands(commands: Command[]) {
        return commands.filter(this.filterCommandType(Command.commandTypes[3]))
    }


    toString() {
        return `${this.commandType} - ${this.values}`
    }

    getCommandType() {
        return this.commandType;
    }

    getValues() {
        return this.values;
    }

}