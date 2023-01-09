import { Instrument } from "./Instrument";

export class RobotArm extends Instrument {
    open() {
        return true;
    }

    close() {
        return false;
    }

    move(x: number, y: number, z: number) {
        return true;
    }
}