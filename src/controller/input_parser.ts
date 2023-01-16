import * as fs from 'fs';
import { Command } from "../model/command";

export abstract class InputParser {
    abstract getCommands(): Command[];
}

export class FileInputParser extends InputParser {

    file: string;

    constructor(file = './Input.txt') {
        super();
        this.file = file;
    }

    private readInput() {
        try {
            const data = fs.readFileSync(this.file, 'utf8');
            return data;
        } catch (err) {
            console.error(err);
            return "";
        }
    }

    /**
     * 
     * @returns Array of Commands parsed from the Input
     */
    getCommands(): Command[] {
        let input = this.readInput();
        console.log(input);
        let lines = input.split("\n").filter(line => line !== '');
        return Command.createCommands(lines);
    }

}


// export class NodeInputParser extends InputParser{

//     private static prompt = "Enter Input and type #EOF# on a new line to finish";
//     // private static endInput = "#EOF#";

//     private buffer:string[] = [];

//     getInput(){
//     }

//     getCommands():Command[]{
//         return [new Command()]
//     }
// }

export class BrowserInputParser {

    getCommands() {
        return [Command.parseCommand("")];
    }
}
