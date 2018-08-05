import PathFinder from "../Engine/PathFinder";
import { TickInMiliseconds } from "../GlobalVariables";
class Enemy {
    constructor(coordinates, field) {
        this.color = "red";
        this.coordinates = coordinates;
        this.pathFinder = new PathFinder(field);
        this.field = field;
    }
    calculatePath(toCoordinates) {
        this.currentStep = 0;
        this.path = this.pathFinder.findPath(this.coordinates, toCoordinates);
        if (this.path == null) {
            throw "end game";
        }
    }
    step() {
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
    goTo(coords) {
        this.calculatePath(coords);
        this.interval = setInterval(this.everyInterval.bind(this), TickInMiliseconds);
    }
    follow(obj) {
        this.calculatePath(obj.coordinates);
        let oldCoordinates = obj.coordinates;
        this.interval = setInterval(() => {
            if (obj.coordinates.toString() != oldCoordinates.toString()) {
                console.log("coordinates changed");
                oldCoordinates = obj.coordinates;
                this.calculatePath(obj.coordinates);
            }
            this.step();
        }, TickInMiliseconds);
    }
    everyInterval() {
        console.log("moved");
        this.step();
    }
}
export default Enemy;
//# sourceMappingURL=Enemy.js.map