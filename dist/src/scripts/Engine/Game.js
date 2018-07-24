import StopWatch from "../Helpers/StopWatch";
class Game {
    constructor(field) {
        this.field = field;
    }
    start() {
        this.field.render();
        setInterval(this.update.bind(this), 2000);
    }
    update() {
        let stopwatch = new StopWatch();
        stopwatch.Start();
        this.field.render();
        stopwatch.end();
        console.log(stopwatch.getResult());
    }
}
export default Game;
//# sourceMappingURL=Game.js.map