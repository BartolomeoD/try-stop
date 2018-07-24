import Random from "../Helpers/Random";
import $ from "jquery";
import MapCoordinates from "../Engine/MapCoordinates";
import PathNode from "../Engine/PathNode";

class Field {
    public size: number;
    public cells: number[][];
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
        this.cells = [[]];
        for (let y = 0; y < size; y++) {
            this.cells[y] = [];
            for (let x = 0; x < size; x++) {
                this.cells[y][x] = 0;
            }
        }
    }

    public randomize() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let r = Random.next(0, 20);
                let isWall = 0;
                if (r > 15) {
                    isWall = 1;
                }
                this.cells[y][x] = isWall;
            }
        }
    }

    public render() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                switch (this.cells[y][x]) {
                    case 0:
                        this.context.fillStyle = "white";
                        break;
                    case 1:
                        this.context.fillStyle = "black";
                        break;
                    case 2:
                        this.context.fillStyle = "red";
                        break;
                    case 3:
                        this.context.fillStyle = "blueviolet";
                        break;

                }
                this.fillRect(x, y);
            }
        }
    }

    public fillRect(x: number, y: number) {
        this.context.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }

    public addPath(path: MapCoordinates[]) {
        for (let coords of path) {
            this.cells[coords.y][coords.x] = 2;
        }
    }

    public makeWall() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let isWall = 0;
                if (x == Math.round(this.size / 2) && y < Math.round(this.size / 2)) {
                    isWall = 1;
                }
                if (y == Math.round(this.size / 2) && x < Math.round(this.size / 2)) {
                    isWall = 1;
                }
                this.cells[y][x] = isWall;
            }
        }
        this.cells[0][Math.round(this.size / 2)] = 0;
        this.cells[this.size - 1][Math.round(this.size / 2)] = 0;
        this.cells[Math.round(this.size / 2)][0] = 0;
        this.cells[Math.round(this.size / 2)][this.size - 1] = 0;
    }

    public showNodes(nodes: PathNode[]) {
        for (let node of nodes) {
            this.cells[node.getCoordinates().y][node.getCoordinates().x] = 3;
        }
    }
}

export default Field;