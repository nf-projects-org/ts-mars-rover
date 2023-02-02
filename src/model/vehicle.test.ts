import { Command } from "./command";
import { CompassHeading, RectangularMap, Position } from "../../src/model/planet_map_navigation";
import { MarsRover } from "./vehicle";


describe("MarsRover Functionality", () => {

    test("moveOrTurn", () => {
        let map = RectangularMap.createMap(5, 5);
        let position = new Position(1, 2);
        let heading = new CompassHeading("N");
        let rover = MarsRover.createRover(map, position, heading, [], []);
        let command = new Command("MOVEORTURN", "MMM".split(""));
        expect(rover.moveOrTurn(command)).toBe(true);
        rover = MarsRover.createRover(map, position, heading, [], []);
        command = new Command("MOVEORTURN", "MMMMMM".split(""));
        expect(rover.moveOrTurn(command)).toBe(false);
        rover = MarsRover.createRover(map, position, heading, [], []);
        command = new Command("MOVEORTURN", "LMLMLMLMM".split(""));
        expect(rover.moveOrTurn(command)).toBe(true);
    });

    test("_Move", () => {
        let map = RectangularMap.createMap(5, 5);
        let position = new Position(1, 2);
        let heading = new CompassHeading("N");
        let rover = MarsRover.createRover(map, position, heading, [], []);
        rover.move(false);
        expect(rover.getCurrentPosition()).toStrictEqual(new Position(1, 3));
        rover.setCurrentHeading(new CompassHeading("S"));
        rover.move(false);
        expect(rover.getCurrentPosition()).toStrictEqual(new Position(1, 2));
        rover.setCurrentHeading(new CompassHeading("E"));
        rover.move(false);
        expect(rover.getCurrentPosition()).toStrictEqual(new Position(2, 2));
        rover.setCurrentHeading(new CompassHeading("W"));
        rover.move(false);
        expect(rover.getCurrentPosition()).toStrictEqual(new Position(1, 2));
    });

    test("_Turn", () => {
        let map = RectangularMap.createMap(5, 5);
        let position = new Position(1, 2);
        let heading = new CompassHeading("N");
        let rover = MarsRover.createRover(map, position, heading, [], []);

        rover.turn(false, "L");
        expect(rover.getCurrentHeading()).toStrictEqual(new CompassHeading("W"));
        rover.turn(false, "L");
        expect(rover.getCurrentHeading()).toStrictEqual(new CompassHeading("S"));
        rover.turn(false, "L");
        expect(rover.getCurrentHeading()).toStrictEqual(new CompassHeading("E"));
        rover.turn(false, "L");
        expect(rover.getCurrentHeading()).toStrictEqual(new CompassHeading("N"));

        rover.turn(false, "R");
        expect(rover.getCurrentHeading()).toStrictEqual(new CompassHeading("E"));
        rover.turn(false, "R");
        expect(rover.getCurrentHeading()).toStrictEqual(new CompassHeading("S"));
        rover.turn(false, "R");
        expect(rover.getCurrentHeading()).toStrictEqual(new CompassHeading("W"));
        rover.turn(false, "R");
        expect(rover.getCurrentHeading()).toStrictEqual(new CompassHeading("N"));

    });
});