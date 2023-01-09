import { Instrument } from "./Instrument";

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