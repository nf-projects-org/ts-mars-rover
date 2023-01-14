import { Command } from "../../src/model/Command";

describe("Command Functionality", () => {

    test("createCommands" ,()=>{
        expect(Command.createCommands([])).toStrictEqual([]);
        expect(Command.createCommands([""])).toStrictEqual([]);
        expect(Command.createCommands(["1 1 N"])).toStrictEqual([]);
        expect(Command.createCommands(["5 5"])).toStrictEqual([]);
        expect(Command.createCommands(["5 5","1 1 N"])).toStrictEqual([
            new Command(Command.commandTypes[0],["5","5"]),
            new Command(Command.commandTypes[1],["1","1","N"]),
        ]);
        expect(Command.createCommands(["5 5","1 2 N","LMLMLMLMM"])).toStrictEqual([
            new Command(Command.commandTypes[0],["5","5"]),
            new Command(Command.commandTypes[1],["1","2","N"]),
            new Command(Command.commandTypes[2],["L","M","L","M","L","M","L","M","M"]),
        ]);
        expect(Command.createCommands(["5 5","1 2 N","LMLM LMLMM"])).toStrictEqual([]);

    });

    test("parseCommand - createMap", () => {
        expect(Command.parseCommand("5 5")).toStrictEqual(new Command(Command.commandTypes[0],["5","5"]));
        expect(Command.parseCommand("5 5 5")).toStrictEqual(new Command(Command.commandTypes[3],["5","5", "5"]));
        expect(Command.parseCommand("blahblah")).toStrictEqual(new Command(Command.commandTypes[3],["blahblah"]));
        expect(Command.parseCommand("3 4")).toStrictEqual(new Command(Command.commandTypes[0],["3","4"]));  
        expect(Command.parseCommand("blahblah")).toStrictEqual(new Command(Command.commandTypes[3],["blahblah"]));      
    });
    test("parseCommand - createRover", () => {
        expect(Command.parseCommand("0 0 N" )).toStrictEqual(new Command(Command.commandTypes[1],["0","0", "N"]));
        expect(Command.parseCommand("5 5 S")).toStrictEqual(new Command(Command.commandTypes[1],["5","5", "S"]));
        expect(Command.parseCommand("-5 4 S")).toStrictEqual(new Command(Command.commandTypes[3],["-5","4", "S"]));
        expect(Command.parseCommand("5 5 A")).toStrictEqual(new Command(Command.commandTypes[3],["5","5", "A"]));

    });
});