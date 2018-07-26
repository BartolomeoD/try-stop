class Game {
    constructor(field) {
        this.field = field;
    }
    start() {
        this.field.render();
        setInterval(this.update.bind(this), 16);
    }
    update() {
        this.field.render();
    }
}
export default Game;
//# sourceMappingURL=Game.js.map