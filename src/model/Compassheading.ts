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