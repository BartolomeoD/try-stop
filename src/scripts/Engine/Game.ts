import Field from "../Environment/Field";
import StopWatch from "../Helpers/StopWatch";

class Game {
    public field: Field;

    public constructor(field: Field) {
        this.field = field;
    }

    public start() {
        this.field.render();
        setInterval(this.update.bind(this), 16);
    }

    public update() {
        this.field.render();
    }
}

export default Game;