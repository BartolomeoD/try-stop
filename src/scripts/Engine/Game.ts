import Field from "../Environment/Field";
import StopWatch from "../Helpers/StopWatch";

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
        let stopwatch: StopWatch = new StopWatch();
        stopwatch.Start();
        this.field.render();
        stopwatch.end();
        console.log(stopwatch.getResult());
    }
}

export default Game;