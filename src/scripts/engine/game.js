class Game {
    constructor(field) {
        this.field = field;
        const f = field;
    }

    start() {
        this.field.render();
        setInterval(this.update.bind(this), 500);
    }

    update() {
        this.field.rerender();
        this.field.randomize();
    }
}

export default Game;