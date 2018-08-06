import MapCoordinates from "../Engine/MapCoordinates";
import Field from "../Environment/Field";
import GameObject from "./GameObject";

class Player implements GameObject {

    public coordinates: MapCoordinates;
    protected field: Field;
    public color: string = "green";
    public isImpenetrable: boolean = true;

    constructor(coords: MapCoordinates, field: Field) {
        this.coordinates = coords;
        this.field = field;
    }

    public moveBottom() {
        this.move("bottom");
    }

    public moveUp() {
        this.move("up");
    }

    public moveLeft() {
        this.move("left");
    }

    public moveRight() {
        this.move("right");
    }

    private move(direction: string) {
        let supposedCoordinates: MapCoordinates;
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

    private isExisOnTheField(coords: MapCoordinates): boolean {
        return !(coords.x >= this.field.size || coords.y >= this.field.size
            || coords.x < 0 || coords.y < 0);
    }
}

export default Player;