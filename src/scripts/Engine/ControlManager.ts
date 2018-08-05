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
            switch (event.code) {
                case "ArrowLeft":
                    this.disableTemproary();
                    console.log("left");
                    this.player.moveLeft();
                    break;
                case "ArrowRight":
                    this.disableTemproary();
                    console.log("right");
                    this.player.moveRight();
                    break;
                case "ArrowDown":
                    this.disableTemproary()
                    this.player.moveBottom();
                    break;
                case "ArrowUp":
                    this.disableTemproary();
                    console.log("up");
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