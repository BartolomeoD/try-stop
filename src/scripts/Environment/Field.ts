import Random from "../Helpers/Random";
import $ from "jquery";
import MapCoordinates from "../Engine/MapCoordinates";
import PathNode from "../Engine/PathNode";

class Field {
    public size: number;
    public cells: number[][];

    public constructor(size: number) {
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
                let r = Random.next(0, 10);
                let isWall = 0;
                if (r > 7) {
                    isWall = 1;
                }
                this.cells[y][x] = isWall;
            }
        }
    }

    public render() {
        for (let y = 0; y < this.size; y++) {
            let row = $('<div/>', {
                class: 'row'
            });
            row.appendTo($("#field"));
            for (let x = 0; x < this.size; x++) {
                let classesName = 'cell';
                if (this.cells[y][x] == 1)
                    classesName += ' iscontains';
                let cell = $('<div/>', {
                    class: classesName,
                    "data-position-x": x,
                    "data-position-y": y,
                    text: " "
                });
                cell.appendTo(row);
            }
        }
    }

    public rerender() {
        let currentRow = $('.field .row');
        for (let y = 0; y < this.size; y++) {
            let currentCell = currentRow.find('.cell').first();
            for (let x = 0; x < this.size; x++) {
                currentCell.attr("class", "cell");
                switch (this.cells[y][x]) {
                    case 1:
                        currentCell.addClass('is-contains');
                        break;
                    case 2:
                        currentCell.addClass('path');
                        break;
                    case 3:
                        currentCell.addClass('checked-nodes');
                        break;
                }

                currentCell = currentCell.next();
            }
            currentRow = currentRow.next();
        }
    }

    public addPath(path: MapCoordinates[]) {
        console.log(path);
        for (let coords of path) {
            this.cells[coords.y][coords.x] = 2;
        }
    }

    public makeWall() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let isWall = 0;
                if (x == Math.round(this.size/2) && y < Math.round(this.size/2)) {
                    isWall = 1;
                }
                if (y == Math.round(this.size/2) && x < Math.round(this.size/2)) {
                    isWall = 1;
                }
                this.cells[y][x] = isWall;
            }
        }
        this.cells[0][Math.round(this.size/2)] = 0;
        this.cells[this.size-1][Math.round(this.size/2)] = 0;
        this.cells[Math.round(this.size/2)][0] = 0;
        this.cells[Math.round(this.size/2)][this.size-1] = 0;
    }

    public showNodes(nodes: PathNode[]) {
        for (let node of nodes) {
            this.cells[node.getCoordinates().y][node.getCoordinates().x] = 3;
        }
    }
}

export default Field;