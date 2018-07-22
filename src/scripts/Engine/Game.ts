import Field from "../Environment/Field";

class Game {
    public field: Field;

    public constructor(field: Field) {
        this.field = field;
    }

    public start() {
        this.field.render();
        setInterval(this.update.bind(this), 2000);
    }

    public update() {
        this.field.rerender();
    }
}

export default Game;