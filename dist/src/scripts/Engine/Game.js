class Game {
    constructor(field) {
        this.field = field;
    }
    start() {
        this.field.render();
        setInterval(this.update.bind(this), 2000);
    }
    update() {
        this.field.rerender();
    }
}
export default Game;
//# sourceMappingURL=Game.js.map