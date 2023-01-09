import { Command } from "../model/Command";

export abstract class StateController {
    abstract getAllCommands(commands: Command[]): void;
    abstract getCommand():Command;
    abstract sendCommand(command:Command):boolean;
}