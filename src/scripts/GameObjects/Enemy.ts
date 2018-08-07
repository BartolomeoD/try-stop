import MapCoordinates from "../Engine/MapCoordinates";
import PathFinder from "../Engine/PathFinder";
import Field from "../Environment/Field";
import GameObject from "./GameObject";
import {TickInMiliseconds} from "../GlobalVariables";
import DeadMan from "./DeadMan";

class Enemy implements GameObject {
    public isImpenetrable: boolean = true;
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

    public calculatePath(toCoordinates: MapCoordinates, isIgnoreEnemy: boolean = true) {
        this.currentStep = 0;
        this.path = this.pathFinder.findPath(this.coordinates, toCoordinates, isIgnoreEnemy);
        if (this.path == null) {
            throw "end game";
        }
    }

    public step() {
        let nextStepCoords = this.path[this.currentStep + 1];
        let nextObject = this.field.getObjectByCoordinates(this.path[this.currentStep + 1]);
        if (nextObject instanceof Enemy || nextObject instanceof DeadMan) {
            console.log("there is enemy");
            return false;
        }
        if (this.currentStep == this.path.length - 2) {
            clearInterval(this.interval);
            this.death();
            console.log("dead");
            return;
        }
        this.field.gameObjects.move(this.coordinates, nextStepCoords);
        this.coordinates = nextStepCoords;
        this.currentStep++;
        return true;
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
                oldCoordinates = obj.coordinates;
                this.calculatePath(obj.coordinates);
            }
            if (!this.step()) {
                this.calculatePath(obj.coordinates, false);
            }
        }, TickInMiliseconds * 1.5);
    }

    private everyInterval() {
        console.log("moved");
        this.step();
    }

    private death() {
        let deathCoords = this.coordinates;
        this.field.gameObjects.removeByCoordinates(this.coordinates);
        let body = new DeadMan(deathCoords);
        this.field.gameObjects.add(body);
    }
}

export default Enemy;