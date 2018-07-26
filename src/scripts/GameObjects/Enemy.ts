import MapCoordinates from "../Engine/MapCoordinates";
import PathFinder from "../Engine/PathFinder";
import Field from "../Environment/Field";
import GameObject from "./GameObject";

class Enemy implements GameObject{
    public coordinates: MapCoordinates;
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
        if (this.currentStep == this.path.length - 1) {
            console.log("end");
            clearInterval(this.interval);
            console.log(this.field.gameObjects);
            return;
        }
        this.coordinates = this.path[this.currentStep + 1];
        this.currentStep++;
    }


    //TODO переделать это на следование за отдельным юнитом
    public goTo(coords: MapCoordinates) {
        this.calculatePath(coords);
        this.interval = setInterval(this.everyInterval.bind(this), 100);
    }

    private everyInterval() {
        console.log("moved");
        this.step();
    }
}

export default Enemy;