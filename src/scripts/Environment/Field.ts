import Random from "../Helpers/Random";
import MapCoordinates from "../Engine/MapCoordinates";
import GameObject from "../GameObjects/GameObject";
import Box from "../GameObjects/Box";
import Enemy from "../GameObjects/Enemy";

class Field {
    public size: number;
    public gameObjects: GameObject[];
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
        this.gameObjects = [];
    }

    public randomize() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let r = Random.next(0, 20);
                if (r > 15) {
                    let currCoords = new MapCoordinates(x, y);
                    this.gameObjects[x + y * this.size] = new Box(currCoords);
                }
            }
        }
    }

    public getObjectByCoordinates(coords: MapCoordinates) {
        let obj = this.gameObjects[coords.x + coords.y * this.size];
        if (obj == undefined)
            return null;
        return obj;
    }

    public deleteObjectByCoordinates(coords: MapCoordinates) {
        this.gameObjects[coords.x + coords.y * this.size] = undefined;
    }

    public render() {
        this.context.fillStyle= "white";
        this.context.fillRect(0, 0, this.htmlSize, this.htmlSize);
        for (let gameObject of this.gameObjects) {
            if (gameObject instanceof Box) {
                this.context.fillStyle = "black";
            } else if (gameObject instanceof Enemy) {
                console.log("enemy");
                this.context.fillStyle = "blueviolet";
            } else if (gameObject == undefined) {
                continue;
            }
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
                    this.gameObjects[x + y * this.size] = (new Box(coords));
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