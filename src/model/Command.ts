export class Command{
    static commandTypes = ['CREATEMAP', 'CREATEROVER','MOVE', 'TURN', "UNKNOWN"] as const
    static createMapRegex = /^\d+ \d+$/;
    static createRoverRegex = /^\d+ \d+ [NSEW]$/;

    static parseCommand(input:string){
        if (this.createMapRegex.test(input)){
            return new Command(this.commandTypes[0],input.split(" "));
        } else if (this.createRoverRegex.test(input)){
            return new Command(this.commandTypes[1],input.split(" "));
        }
        else {
            return new Command(this.commandTypes[4],input.split(" "));
        }
    }

    static createCommands(input: string[]){
        let commands = input.map(commandString => this.parseCommand(commandString));
        if (Command.validateCommandList(commands)){
            return commands;
        }
        return [];
    }

    static validateCommandList(commands:Command[]){
        let filterCommandType = (type:string) => (command:Command) => command.getCommandType() === type;
        let invalidCommands = commands.filter(filterCommandType(Command.commandTypes[4]));
        let createMapCommands = commands.filter(filterCommandType(Command.commandTypes[0]));
        let createRoverCommands = commands.filter(filterCommandType(Command.commandTypes[1]));
        if (invalidCommands.length > 0){
            console.log("Invalid commands found. Terminating");
            return false;
        }

        if (commands[0].getCommandType()!== Command.commandTypes[0]){
            console.log("First Command must be the Create Map");
            return false;            
        }
        if (createMapCommands.length != 1){
            console.log("One map must be created");
            return false;
        }

        if(createRoverCommands.length < 1){
            console.log("At least one rover must be created");
            return false;
        }

        return true;
    }
    
    private commandType:string;
    private values:string[];

    constructor(commandType:string, values:string[]){
        this.commandType = commandType
        this.values = values;
    }

    getCommandType(){
        return this.commandType;
    }

    getValues(){
        return this.values;
    }

}