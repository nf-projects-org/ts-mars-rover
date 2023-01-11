export class Command{
    static commandTypes = ['CREATEMAP', 'CREATEROVER','MOVE', 'TURN', "UNKNOWN"] as const
    static createMapRegex = /^\d+ \d+$/;
    static parseCommand(input:string){
        if (this.createMapRegex.test(input)){
            return new Command(this.commandTypes[0],input.split(" "));
        }
        else {
            return new Command(this.commandTypes[4],input.split(" "));
        }
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