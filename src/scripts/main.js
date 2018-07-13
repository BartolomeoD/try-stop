import Field from './field';
import Game from './engine/game';

let field = new Field(10);
field.randomize();
let game = new Game(field);
game.start();
console.log(field);