import promptSync from 'prompt-sync';
const prompt = promptSync();
import * as fs from 'fs';
import { Command } from "../model/Command";

export abstract class InputParser {

    abstract getCommands(): Command[];

}


export class FileInputParser extends InputParser{

    static file = './Input.txt'; 

    private readInput(){
        try {
            const data = fs.readFileSync(FileInputParser.file, 'utf8');
            return data;
        } catch (err) {
            console.error(err);
            return "";
        }
    }

    getCommands(): Command[] {
        let input = this.readInput();
        console.log(input);
        let lines = input.split("\n").filter( line => line !== '');
        console.log(lines);
        return Command.createCommands(lines);
    }

}


export class NodeInputParser extends InputParser{

    private static prompt = "Enter Input and type #EOF# on a new line to finish";
    // private static endInput = "#EOF#";

    private buffer:string[] = [];
    
    getInput(){
        console.log(NodeInputParser.prompt);
        console.log(1);
        const input =  prompt("Hello");
        console.log(2);
        this.buffer.push(input);
        return this.buffer;
    }

    getCommands(){
        let input = this.getInput();
        let commands:Command[] = input.map( line => Command.parseCommand(line));
        console.log(commands);
        return commands;
    }
}

export class BrowserInputParser {

    getCommands(){
        return [ Command.parseCommand("")];
    }
}
