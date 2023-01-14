
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

    static createMap(x:number, y: number){
        return new RectangularMap(x,y);
    }
    
    static createMapFromString(x:string, y:string){
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

    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }

    static createPosition(arr:string[]){
        if(arr.length!= 2){
            return new Position(-1,-1);
        }
        return new Position(parseInt(arr[0]), parseInt(arr[1]));
    }
}

export class CompassHeading {
    private readonly heading:string;
    
    constructor(heading: string) {
        this.heading = heading;
    }

    getheading(){
        return this.heading;
    }

    static createHeading(heading:string){
        return new CompassHeading(heading);
    }

}