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
        console.log(4);
        return this.getInputFromTerminal().then( data => data);
    }


    // private getInputFromTerminal(){
    //     console.log(NodeInputParser.prompt);
    //     this.reader.on('line', (input:string) => {
    //         if (input === NodeInputParser.endInput){
    //             this.reader.close();
    //         }else {
    //             this.buffer.push(input);
    //         }
    //     });
    //     this.reader.on('close',()=>{
    //         console.log("Input End");
    //     })
    // }

    private async getInputFromTerminal(){
        console.log(5);
        console.log(NodeInputParser.prompt);
        let input = await this.readInput();
        while(input !== NodeInputParser.endInput){
            console.log(6);
            this.buffer.push(input);
            input = await this.readInput();
        }
        console.log(7);
        this.reader.close();
        console.log("Input End");
        console.log(8);
        return this.buffer;
    }

    private async readInput(){
        return new Promise<string>((resolve)=>{
            this.reader.question('',(input)=> {
                console.log("X");
                resolve(input);
            });
        });
    }

    getCommands(){
        console.log(3);
        let commands:Command[] = this.getUserInput().map( line => Command.parseCommand(line));
        console.log(commands);
        console.log(9);
        return commands;
    }
}

