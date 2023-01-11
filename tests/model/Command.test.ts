import { Command } from "../../src/model/Command";

describe("Command Functionality", () => {

    test("create map command functionality", () => {
        expect(Command.parseCommand("5 5")).toStrictEqual(new Command(Command.commandTypes[0],["5","5"]));
        expect(Command.parseCommand("5 5 5")).toStrictEqual(new Command(Command.commandTypes[4],["5","5", "5"]));
        expect(Command.parseCommand("blahblah")).toStrictEqual(new Command(Command.commandTypes[4],["blahblah"]));
    });
});