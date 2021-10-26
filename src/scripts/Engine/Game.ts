import Field from "../Environment/Field";
import {TickInMiliseconds} from "../GlobalVariables";
import ControlManager from "./ControlManager";
import Enemy from "../GameObjects/Enemy";
import Player from "../GameObjects/Player";
import MapCoordinates from "./MapCoordinates";

class Game {
    private static _instance: Game;
    public field: Field;
    public endGameCallback: Function;
    public active: boolean = false;
    private enemyCreator: number;

    public constructor() {
    }

    public static get Instance() {
        return this._instance || (this._instance = new this())
    }

    public start() {
        this.active = true;
        this.field.render();
        this.field.makeBoxForPlayer();
        // this.field.randomize();

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

        window.onkeydown = (e: KeyboardEvent) => {
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
            } else {
                if (skip > max) {
                    curr = 0;
                    max++;
                }
                skip++;
            }
        }, TickInMiliseconds * 10);

        setInterval(this.update.bind(this), 16);
    }

    public update() {
        this.field.render();
    }

    public endGame() :void {
        this.active = false;
        clearInterval(this.enemyCreator);
        for (let object of this.field.gameObjects.toArray()) {
            if (object instanceof Enemy) {
                (<Enemy>object).kill();
            }
        }
        this.endGameCallback();
    }
}

export default Game;