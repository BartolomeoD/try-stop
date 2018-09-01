import PathFinder from "../Engine/PathFinder";
import { TickInMiliseconds } from "../GlobalVariables";
import DeadMan from "./DeadMan";
import Game from "../Engine/Game";
class Enemy {
    constructor(coordinates, field) {
        this.isImpenetrable = true;
        this.color = "red";
        this.coordinates = coordinates;
        this.pathFinder = new PathFinder(field);
        this.field = field;
        this.guid = Math.floor(Math.random() * 1000);
    }
    calculatePath(toCoordinates, isIgnoreEnemy = true) {
        this.currentStep = 0;
        this.path = this.pathFinder.findPath(this.coordinates, toCoordinates, isIgnoreEnemy);
        let game = Game.Instance;
        if (this.path == null && game.active) {
            Game.Instance.endGame();
        }
    }
    step() {
        if (this.path == null) {
            clearInterval(this.interval);
            return;
        }
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
    goTo(coords) {
        this.calculatePath(coords);
        this.interval = setInterval(this.everyInterval.bind(this), TickInMiliseconds);
    }
    follow(obj) {
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
    kill() {
        clearInterval(this.interval);
        Game.Instance.field.deleteObjectByCoordinates(this.coordinates);
    }
    everyInterval() {
        console.log("moved");
        this.step();
    }
    death() {
        let deathCoords = this.coordinates;
        this.field.gameObjects.removeByCoordinates(this.coordinates);
        let body = new DeadMan(deathCoords);
        this.field.gameObjects.add(body);
    }
}
export default Enemy;
//# sourceMappingURL=Enemy.js.map