import { Command } from "../model/Command";
export class BrowserInputParser {

    getCommands(){
        return [ Command.parseCommand("")];
    }
}

