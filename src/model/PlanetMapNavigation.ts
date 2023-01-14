
export abstract class PlanetMap {
    abstract isPositionInMap(position: Position): boolean;
}


export class RectangularMap extends PlanetMap {
    private readonly width: number;
    private readonly height: number;

    constructor(width: number, height: number) {
        super();
        this.height = height;
        this.width = width;
    }

    toString() {
        return `RectangularMap: ${this.width}, ${this.height}`;
    }

    static createMap(x: number, y: number) {
        return new RectangularMap(x, y);
    }

    static createMapFromString(x: string, y: string) {
        return this.createMap(parseInt(x), parseInt(y));
    }

    isPositionInMap(position: Position): boolean {
        return position.getX() >= 0 && position.getX() <= this.width && position.getY() >= 0 && position.getY() <= this.height;
    }

}

export class Position {
    private readonly x: number;
    private readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `Position: ${this.x}, ${this.y}`;
    }

    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }

    static createPosition(arr: string[]) {
        if (arr.length != 2) {
            return new Position(-1, -1);
        }
        return new Position(parseInt(arr[0]), parseInt(arr[1]));
    }
}

export class CompassHeading {
    private readonly heading: string;

    constructor(heading: string) {
        this.heading = heading;
    }

    static NORTH = "N";
    static SOUTH = "S";
    static EAST = "E";
    static WEST = "W";

    static leftMap = new Map([
        ["N", "W"],
        ["W", "S"],
        ["S", "E"],
        ["E", "N"]
    ]);

    static rightMap = new Map([
        ["N", "E"],
        ["E", "S"],
        ["S", "W"],
        ["W", "N"]
    ]);



    toString() {
        return `Heading: ${this.heading}`;
    }
    getHeading() {
        return this.heading;
    }

    getLeft() {
        let heading = CompassHeading.leftMap.get(this.heading);
        if (heading == undefined) {
            return "ERROR";
        } else {
            return heading;
        }
    }

    getRight() {
        let heading = CompassHeading.rightMap.get(this.heading);
        if (heading == undefined) {
            return "ERROR";
        } else {
            return heading;
        }
    }

    static createHeading(heading: string) {
        return new CompassHeading(heading);
    }

}
