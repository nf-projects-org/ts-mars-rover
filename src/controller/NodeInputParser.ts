import { InputParser } from './InputParser';
import * as readline from 'node:readline';
import { Command } from '../model/Command';
export class NodeInputParser extends InputParser{

    private static prompt = "Enter Input and type #EOF# on a new line to finish";
    // private static endInput = "#EOF#";

    private buffer:string[] = [];

    private reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });;

    private askQuestion(question: string, callback: (arg: string) => void) {
        this.reader.question(`${question}`, callback);
        console.log("after Question");
    }

    private getUserInput(){
        console.log(NodeInputParser.prompt);
        this.askQuestion("", input => {
            this.buffer.push(input);
        });
        return this.buffer;
    }

    // private getInputFromTerminal(){
    //     console.log(NodeInputParser.prompt);

    //     let input = this.reader.prompt();
    //     console.log(input);
    //     while (input !== NodeInputParser.endInput){
    //         this.buffer.push(input);
    //         console.log(6);
    //         console.log(this.buffer);
    //         input = this.reader.prompt();
    //     }
    //     console.log(7);
    //     console.log(this.buffer);
    //     return this.buffer;
    // }


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

    // private getInputFromTerminal(){
    //     console.log(5);
    //     console.log(NodeInputParser.prompt);
    //     let promise = this.readInput();
    //     while(input !== NodeInputParser.endInput){
    //         console.log(6);
    //         this.buffer.push(input);
    //         input = await this.readInput();
    //     }
    //     console.log(7);
    //     this.reader.close();
    //     console.log("Input End");
    //     console.log(8);
    //     return this.buffer;
    // }

    // private readInput(){
    //     return new Promise<string>((resolve)=>{
    //         this.reader.question('',(input)=> {
    //             console.log("X");
    //             resolve(input);
    //         });
    //     });
    // }

    getCommands(){
        let input = this.getUserInput();
        let commands:Command[] = input.map( line => Command.parseCommand(line));
        console.log(commands);
        console.log(9);
        return commands;
    }
}

