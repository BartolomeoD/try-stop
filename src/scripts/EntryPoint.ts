import Field from './Environment/Field';
import Game from './Engine/Game';
import { FieldSize } from "./GlobalVariables";

let field = new Field(FieldSize);
let game = Game.Instance;
game.field = field;
game.endGameCallback = () => {
    alert("game ended");
};
game.start();
