import Player from "../GameObjects/Player";
import {TickInMiliseconds} from "../GlobalVariables";

class ControlManager {


    protected isDisabled: boolean;
    private player: Player;

    constructor(player: Player) {
        this.player = player;
        this.isDisabled = false;
    }

    public cacthKey(event: KeyboardEvent) {
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
        } else {
            console.log("disabled");
        }
    }

    private disableTemproary() {
        this.isDisabled = true;
        setTimeout(() => {
            this.isDisabled = false;
        },TickInMiliseconds);
    }
}

export default ControlManager;