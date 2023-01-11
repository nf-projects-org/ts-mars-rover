import { Command } from "../model/Command";
export abstract class InputParser {

    abstract getCommands(): Command[];

}

