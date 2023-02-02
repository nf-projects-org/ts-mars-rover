import { Command } from "./command";
import { PlanetMap, Position, CompassHeading } from "./planet_map_navigation";
import { RobotArm, Camera } from "./instrument";
import * as uuid from 'uuid';


export abstract class Vehicle {
    private readonly id: String;
    private readonly map: PlanetMap;
    private currentPosition: Position;
    private heading: CompassHeading;
    private vehicles: Position[];

    constructor(id: String, map: PlanetMap, currentPosition: Position, heading: CompassHeading, vehicles: Position[]) {
        this.id = id;
        this.map = map;
        this.currentPosition = currentPosition;
        this.heading = heading;
        this.vehicles = vehicles;
    }

    toString() {
        return `${this.id} - ${this.currentPosition} - ${this.heading}`;
    }

    abstract moveOrTurn(command: Command): boolean;

    broadcastPosition() {
        return this.currentPosition;
    }

    getCurrentPosition() {
        return this.currentPosition;
    }

    setCurrentPosition(position: Position) {
        this.currentPosition = position;
    }

    getId() {
        return this.id;
    }

    getCurrentHeading() {
        return this.heading;
    }

    setCurrentHeading(heading: CompassHeading) {
        this.heading = heading;
    }

    getMap() {
        return this.map;
    }

    setOtherVehicles(vehicles: Position[]) {
        this.vehicles = vehicles;
    }

    getOtherVehicles() {
        return this.vehicles;
    }

}


export class MarsRover extends Vehicle {

    private readonly instruments: Array<Camera|RobotArm>;

    constructor(id: String, map: PlanetMap, currentPosition: Position, heading: CompassHeading, vehicles: Position[], instruments: Array<RobotArm|Camera>) {
        super(id, map, currentPosition, heading, vehicles);
        this.instruments = instruments;
    }

    toString() {
        return `Rover:${this.getId()} - ${this.getCurrentPosition()} - ${this.getCurrentHeading()}`;
    }

    static createRover(map: PlanetMap, currentPosition: Position, heading: CompassHeading, vehicles: Position[], instruments: Array<RobotArm|Camera>) {
        const id = uuid.v4();
        return new MarsRover(id, map, currentPosition, heading, vehicles, instruments);
    }

    moveOrTurn(command: Command) {
        if (this.calculatePath(command)) {
            this.executePath(command);
            return true;
        } else {
            console.log("Error - Cannot move: " + this)
            return false;
        }
    }

    private executePath(command: Command) {
        let cmd = command.getCommandParams();
        for (let i = 0; i < cmd.length; i++) {
            if (cmd[i] === "M") {
                this.move(false);
                // console.log(this.toString());
            }
            else if (cmd[i] === "L" || cmd[i] === "R") {
                this.turn(false, cmd[i]);
                // console.log(this.toString());
            }
        }
    }

    private calculatePath(command: Command) {
        let roverVirtualPostion = this.getCurrentPosition();
        let roverVirtualHeading = this.getCurrentHeading();
        let cmd = command.getCommandParams();
        for (let i = 0; i < cmd.length; i++) {
            if (cmd[i] === "M") {
                roverVirtualPostion = this.move(true, roverVirtualPostion, roverVirtualHeading);
                if (!this.validatePosition(roverVirtualPostion)) {
                    console.log("Invalid Position:" + roverVirtualPostion);
                    return false;
                }
            } else if (cmd[i] === "L" || cmd[i] === "R") {
                roverVirtualHeading = this.turn(true, cmd[i], roverVirtualHeading);
            }
        }
        return true;
    }

    move(virtualMove: boolean, referencePosition = this.getCurrentPosition(), referenceHeading = this.getCurrentHeading(), distance: number = 1): Position {
        let newPosition = referencePosition;
        if (referenceHeading.getHeading() == CompassHeading.NORTH) {
            newPosition = new Position(referencePosition.getX(), referencePosition.getY() + distance);
        }
        else if (referenceHeading.getHeading() == CompassHeading.SOUTH) {
            newPosition = new Position(referencePosition.getX(), referencePosition.getY() - distance);
        }
        else if (referenceHeading.getHeading() == CompassHeading.EAST) {
            newPosition = new Position(referencePosition.getX() + distance, referencePosition.getY());
        }
        else if (referenceHeading.getHeading() == CompassHeading.WEST) {
            newPosition = new Position(referencePosition.getX() - distance, referencePosition.getY());
        }
        if (!virtualMove) {
            this.setCurrentPosition(newPosition);
        }
        return newPosition;
    }

    turn(virtualTurn: boolean, direction: string, referenceHeading = this.getCurrentHeading()): CompassHeading {
        let newHeading = referenceHeading;
        if (direction == "L") {
            newHeading = new CompassHeading(newHeading.getLeft());
        }
        else {
            newHeading = new CompassHeading(newHeading.getRight())
        }
        if (!virtualTurn) {
            this.setCurrentHeading(newHeading);
        }
        return newHeading;

    }

    private validatePosition(position: Position) {
        return this.getMap().isPositionInMap(position) && !this.getOtherVehicles().includes(position);
    }

    captureImage() {
        if (this.instruments != null) {

        }
        return false;
    }

}