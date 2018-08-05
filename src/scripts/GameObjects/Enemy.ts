import MapCoordinates from "../Engine/MapCoordinates";
import PathFinder from "../Engine/PathFinder";
import Field from "../Environment/Field";
import GameObject from "./GameObject";
import Track from "./Track";
import {TickInMiliseconds} from "../GlobalVariables";

class Enemy implements GameObject {
    public coordinates: MapCoordinates;
    public color: string = "red";
    private path: MapCoordinates[];
    private pathFinder: PathFinder;
    private currentStep: number;
    private field: Field;
    private interval: number;

    constructor(coordinates: MapCoordinates, field: Field) {
        this.coordinates = coordinates;
        this.pathFinder = new PathFinder(field);
        this.field = field;
    }

    public calculatePath(toCoordinates: MapCoordinates) {
        this.currentStep = 0;
        this.path = this.pathFinder.findPath(this.coordinates, toCoordinates);
        if (this.path == null) {
            throw "end game";
        }
    }

    public step() {
        if (this.currentStep == this.path.length - 2) {
            console.log("end");
            clearInterval(this.interval);
            return;
        }
        let nextStepCoords = this.path[this.currentStep + 1];
        this.field.gameObjects.move(this.coordinates, nextStepCoords);
        this.coordinates = nextStepCoords;
        this.currentStep++;
    }

    public goTo(coords: MapCoordinates) {
        this.calculatePath(coords);
        this.interval = setInterval(this.everyInterval.bind(this), TickInMiliseconds);
    }

    public follow(obj: GameObject) {
        this.calculatePath(obj.coordinates);
        let oldCoordinates = obj.coordinates;
        this.interval = setInterval(() => {
            if (obj.coordinates.toString() != oldCoordinates.toString()) {
                console.log("coordinates changed");
                oldCoordinates = obj.coordinates;
                this.calculatePath(obj.coordinates);
            }
            this.step();
        },TickInMiliseconds)
    }

    private everyInterval() {
        console.log("moved");
        this.step();
    }
}

export default Enemy;