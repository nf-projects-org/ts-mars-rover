export abstract class Instrument {

}

export class Camera extends Instrument {
    captureImage() {
        return true;
    }

    startRecording() {
        return true;
    }

    stopRecording() {
        return true;
    }
}

export class RobotArm extends Instrument {
    open() {
        return true;
    }

    close() {
        return false;
    }

    move(x: number, y: number, z: number) {
        if (x + y + z){}
        return true;
    }
}