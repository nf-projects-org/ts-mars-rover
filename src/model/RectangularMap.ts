import { PlanetaryMap } from "./PlanetaryMap";
import { Position } from "./Position";

export class RectangularMap extends PlanetaryMap {
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