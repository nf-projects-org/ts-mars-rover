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