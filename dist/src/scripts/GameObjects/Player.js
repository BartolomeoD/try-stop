import MapCoordinates from "../Engine/MapCoordinates";
class Player {
    constructor(coords, field) {
        this.color = "green";
        this.isImpenetrable = true;
        this.coordinates = coords;
        this.field = field;
    }
    moveBottom() {
        this.move("bottom");
    }
    moveUp() {
        this.move("up");
    }
    moveLeft() {
        this.move("left");
    }
    moveRight() {
        this.move("right");
    }
    move(direction) {
        let supposedCoordinates;
        switch (direction) {
            case "up":
                supposedCoordinates = new MapCoordinates(this.coordinates.x, this.coordinates.y - 1);
                break;
            case "bottom":
                supposedCoordinates = new MapCoordinates(this.coordinates.x, this.coordinates.y + 1);
                break;
            case "left":
                supposedCoordinates = new MapCoordinates(this.coordinates.x - 1, this.coordinates.y);
                break;
            case "right":
                supposedCoordinates = new MapCoordinates(this.coordinates.x + 1, this.coordinates.y);
                break;
            default:
                throw "direction not parsed";
        }
        if (!this.isExisOnTheField(supposedCoordinates))
            return;
        if (this.field.getObjectByCoordinates(supposedCoordinates) != null)
            return;
        this.field.gameObjects.move(this.coordinates, supposedCoordinates);
        this.coordinates = supposedCoordinates;
    }
    isExisOnTheField(coords) {
        return !(coords.x >= this.field.size || coords.y >= this.field.size
            || coords.x < 0 || coords.y < 0);
    }
}
export default Player;
//# sourceMappingURL=Player.js.map