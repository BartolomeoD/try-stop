import { TickInMiliseconds } from "../GlobalVariables";
import ControlManager from "./ControlManager";
import Enemy from "../GameObjects/Enemy";
import Player from "../GameObjects/Player";
import MapCoordinates from "./MapCoordinates";
class Game {
    constructor() {
        this.active = false;
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    start() {
        this.active = true;
        this.field.render();
        this.field.randomize();
        let startPoint = new MapCoordinates(0, 0);
        let endPoint = new MapCoordinates(this.field.size - 1, this.field.size - 1);
        for (let i = 0; i < this.field.size; i++) {
            this.field.deleteObjectByCoordinates(new MapCoordinates(i, 0));
            this.field.deleteObjectByCoordinates(new MapCoordinates(i, this.field.size - 1));
            this.field.deleteObjectByCoordinates(new MapCoordinates(this.field.size - 1, i));
            this.field.deleteObjectByCoordinates(new MapCoordinates(0, i));
        }
        let player = new Player(endPoint, this.field);
        this.field.gameObjects.add(player);
        let controlManager = new ControlManager(player);
        window.onkeydown = (e) => {
            controlManager.cacthKey(e);
        };
        let skip = 0;
        let curr = 0;
        let max = 1;
        this.enemyCreator = setInterval(() => {
            if (curr < max) {
                let enemy = new Enemy(startPoint, this.field);
                this.field.gameObjects.add(enemy);
                enemy.follow(player);
                curr++;
            }
            else {
                if (skip > max) {
                    curr = 0;
                    max++;
                }
                skip++;
            }
        }, TickInMiliseconds * 10);
        setInterval(this.update.bind(this), 16);
    }
    update() {
        this.field.render();
    }
    endGame() {
        this.active = false;
        clearInterval(this.enemyCreator);
        for (let object of this.field.gameObjects.toArray()) {
            if (object instanceof Enemy) {
                object.kill();
            }
        }
        this.endGameCallback();
    }
}
export default Game;
//# sourceMappingURL=Game.js.map