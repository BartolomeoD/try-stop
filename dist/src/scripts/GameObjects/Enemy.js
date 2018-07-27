import PathFinder from "../Engine/PathFinder";
import Track from "./Track";
class Enemy {
    constructor(coordinates, field) {
        this.color = "blueviolet";
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
        if (this.currentStep == this.path.length - 1) {
            console.log("end");
            clearInterval(this.interval);
            console.log(this.field.gameObjects);
            return;
        }
        let nextStepCoords = this.path[this.currentStep + 1];
        this.field.gameObjects.move(this.coordinates, nextStepCoords);
        this.field.gameObjects.add(new Track(this.coordinates));
        this.coordinates = nextStepCoords;
        this.currentStep++;
    }
    //TODO переделать это на следование за отдельным юнитом
    goTo(coords) {
        this.calculatePath(coords);
        this.interval = setInterval(this.everyInterval.bind(this), 100);
    }
    everyInterval() {
        console.log("moved");
        this.step();
    }
}
export default Enemy;
//# sourceMappingURL=Enemy.js.map