import Random from "../Helpers/Random";
import MapCoordinates from "../Engine/MapCoordinates";
import Box from "../GameObjects/Box";
import GameObjectCollection from "./GameObjectCollection";
import GameObject from "../GameObjects/GameObject";

class Field {
    public size: number;
    public gameObjects: GameObjectCollection;
    private htmlSize: number = 600;
    private canvasHtmlElement: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private cellSize: number;

    public constructor(size: number) {
        this.canvasHtmlElement = <HTMLCanvasElement>document.getElementById("field");
        this.context = this.canvasHtmlElement.getContext("2d");
        this.canvasHtmlElement.setAttribute("width", this.htmlSize.toString());
        this.canvasHtmlElement.setAttribute("height", this.htmlSize.toString());
        this.cellSize = this.htmlSize / size;

        this.size = size;
        this.gameObjects = new GameObjectCollection(this.size);
    }

    public randomize() {
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

    public getObjectByCoordinates(coords: MapCoordinates) : GameObject {
        return this.gameObjects.getObject(coords);
    }

    public deleteObjectByCoordinates(coords: MapCoordinates) {
        this.gameObjects.removeByCoordinates(coords);
    }

    public render() {
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

    private fillRect(x: number, y: number) {
        this.context.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }

    public makeWall() {
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

    // public showNodes(nodes: PathNode[]) {
    //     for (let node of nodes) {
    //         this.cells[node.getCoordinates().y][node.getCoordinates().x] = 3;
    //     }
    // }
}

export default Field;