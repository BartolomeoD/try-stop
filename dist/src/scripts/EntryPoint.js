import Field from './Environment/Field';
import Game from './Engine/Game';
import Enemy from "./GameObjects/Enemy";
import MapCoordinates from "./Engine/MapCoordinates";
import ControlManager from "./Engine/ControlManager";
import Player from "./GameObjects/Player";
window.onload = () => {
    let size = 50;
    let field = new Field(size);
    field.randomize();
    let game = new Game(field);
    game.start();
    let startPoint = new MapCoordinates(0, 0);
    let endPoint = new MapCoordinates(size - 1, size - 1);
    game.field.deleteObjectByCoordinates(startPoint);
    game.field.deleteObjectByCoordinates(endPoint);
    let enemy = new Enemy(startPoint, field);
    let player = new Player(endPoint, field);
    game.field.gameObjects.add(enemy);
    game.field.gameObjects.add(player);
    enemy.follow(player);
    let controlManager = new ControlManager(player);
    window.onkeydown = (e) => {
        controlManager.cacthKey(e);
    };
};
//# sourceMappingURL=EntryPoint.js.map