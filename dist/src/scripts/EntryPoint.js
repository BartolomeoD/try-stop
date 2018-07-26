import Field from './Environment/Field';
import Game from './Engine/Game';
import Enemy from "./GameObjects/Enemy";
import MapCoordinates from "./Engine/MapCoordinates";
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
    game.field.gameObjects.push(enemy);
    enemy.goTo(endPoint);
};
//# sourceMappingURL=EntryPoint.js.map