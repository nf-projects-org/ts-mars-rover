import * as readline from 'node:readline';
import { InputParser } from './InputParser';
import { Command } from '../model/Command';

export class NodeInputParser extends InputParser{

    private static prompt = "Enter Input and type #EOF# on a new line to finish";
    private static endInput = "#EOF#";

    private buffer:string[] = [];

    private reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    private getUserInput(){
        this.getInputFromTerminal();
        return this.buffer;        
    }

    private getInputFromTerminal(){
        console.log(NodeInputParser.prompt);
        this.reader.on('line', (input:string) => {
            if (input === NodeInputParser.endInput){
                this.reader.close();
            }else {
                this.buffer.push(input);
            }
        });
        this.reader.on('close',()=>{
            console.log("Input End");
        })
    }

    getCommands(){
        let commands:Command[] = this.getUserInput().map( line => Command.parseCommand(line));
        return commands;
    }
}

