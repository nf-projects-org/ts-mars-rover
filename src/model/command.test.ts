import { Command } from "./command";

describe("Command Functionality", () => {

    test("createCommands", () => {
        expect(Command.createCommands([])).toStrictEqual([]);
        expect(Command.createCommands([""])).toStrictEqual([]);
        expect(Command.createCommands(["1 1 N"])).toStrictEqual([]);
        expect(Command.createCommands(["5 5"])).toStrictEqual([]);
        expect(Command.createCommands(["5 5", "1 1 N"])).toStrictEqual([]);
        expect(Command.createCommands(["5 5", "1 2 N", "LMLMLMLMM"])).toStrictEqual([
            new Command("CREATEMAP", ["5", "5"]),
            new Command("CREATEROVER", ["1", "2", "N"]),
            new Command("MOVEORTURN", ["L", "M", "L", "M", "L", "M", "L", "M", "M"]),
        ]);
        expect(Command.createCommands(["5 5", "1 2 N", "LMLM LMLMM"])).toStrictEqual([]);

    });

    test("parseCommand - createMap", () => {
        expect(Command.parseCommand("5 5")).toStrictEqual(new Command("CREATEMAP", ["5", "5"]));
        expect(Command.parseCommand("5 5 5")).toStrictEqual(new Command("UNKNOWN", ["5", "5", "5"]));
        expect(Command.parseCommand("blahblah")).toStrictEqual(new Command("UNKNOWN", ["blahblah"]));
        expect(Command.parseCommand("3 4")).toStrictEqual(new Command("CREATEMAP", ["3", "4"]));
        expect(Command.parseCommand("blahblah")).toStrictEqual(new Command("UNKNOWN", ["blahblah"]));
    });
    test("parseCommand - createRover", () => {
        expect(Command.parseCommand("0 0 N")).toStrictEqual(new Command("CREATEROVER", ["0", "0", "N"]));
        expect(Command.parseCommand("5 5 S")).toStrictEqual(new Command("CREATEROVER", ["5", "5", "S"]));
        expect(Command.parseCommand("-5 4 S")).toStrictEqual(new Command("UNKNOWN", ["-5", "4", "S"]));
        expect(Command.parseCommand("5 5 A")).toStrictEqual(new Command("UNKNOWN", ["5", "5", "A"]));

    });
});