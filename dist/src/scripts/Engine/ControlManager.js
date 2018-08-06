import { TickInMiliseconds } from "../GlobalVariables";
class ControlManager {
    constructor(player) {
        this.player = player;
        this.isDisabled = false;
    }
    cacthKey(event) {
        if (!this.isDisabled) {
            this.disableTemproary();
            switch (event.code) {
                case "ArrowLeft":
                    this.player.moveLeft();
                    break;
                case "ArrowRight":
                    this.player.moveRight();
                    break;
                case "ArrowDown":
                    this.player.moveBottom();
                    break;
                case "ArrowUp":
                    this.player.moveUp();
                    break;
            }
        }
        else {
            console.log("disabled");
        }
    }
    disableTemproary() {
        this.isDisabled = true;
        setTimeout(() => {
            this.isDisabled = false;
        }, TickInMiliseconds);
    }
}
export default ControlManager;
//# sourceMappingURL=ControlManager.js.map