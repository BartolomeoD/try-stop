import Random from "../Helpers/Random";
import MapCoordinates from "../Engine/MapCoordinates";
import Box from "../GameObjects/Box";
import GameObjectCollection from "./GameObjectCollection";
class Field {
    constructor(size) {
        this.htmlSize = 600;
        this.canvasHtmlElement = document.getElementById("field");
        this.context = this.canvasHtmlElement.getContext("2d");
        this.canvasHtmlElement.setAttribute("width", this.htmlSize.toString());
        this.canvasHtmlElement.setAttribute("height", this.htmlSize.toString());
        this.cellSize = this.htmlSize / size;
        this.size = size;
        this.gameObjects = new GameObjectCollection(this.size);
    }
    randomize() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let r = Random.next(0, 20);
                if (r > 15) {
                    let currCoords = new MapCoordinates(x, y);
                    this.gameObjects.add(new Box(currCoords));
                }
            }
        }
    }
    getObjectByCoordinates(coords) {
        return this.gameObjects.getObject(coords);
    }
    deleteObjectByCoordinates(coords) {
        this.gameObjects.removeByCoordinates(coords);
    }
    render() {
        this.context.fillStyle = "#f6f6f6";
        this.context.fillRect(0, 0, this.htmlSize, this.htmlSize);
        for (let gameObject of this.gameObjects.toArray()) {
            if (gameObject == undefined) {
                continue;
            }
            this.context.fillStyle = gameObject.color;
            this.fillRect(gameObject.coordinates.x, gameObject.coordinates.y);
        }
    }
    fillRect(x, y) {
        this.context.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }
    makeWall() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let isWall = 0;
                if (x == Math.round(this.size / 2) && y < Math.round(this.size / 2) ||
                    (y == Math.round(this.size / 2) && x < Math.round(this.size / 2))) {
                    var coords = new MapCoordinates(x, y);
                    this.gameObjects.add((new Box(coords)));
                }
            }
        }
    }
}
export default Field;
//# sourceMappingURL=Field.js.map