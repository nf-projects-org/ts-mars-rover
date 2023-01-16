import { RectangularMap, Position } from "../../src/model/PlanetMapNavigation";

describe("RectangularMap Functionality", () => {

    test("isPositionInMap", () => {
        let map = RectangularMap.createMap(5, 5);
        expect(map.isPositionInMap(new Position(1, 1))).toBe(true);
        expect(map.isPositionInMap(new Position(-1, 1))).toBe(false);
        expect(map.isPositionInMap(new Position(5, 1))).toBe(true);
        expect(map.isPositionInMap(new Position(6, 1))).toBe(false);
        expect(map.isPositionInMap(new Position(1, 8))).toBe(false);
        expect(map.isPositionInMap(new Position(1, -5))).toBe(false);
    });
});