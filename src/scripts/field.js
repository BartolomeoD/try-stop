import $ from 'jquery';
import Random from './helpers/random';

class Field {
    constructor(size) {
        this.size = size;
        this.cells = [[]];
        for (let y = 0; y < size; y++) {
            this.cells[y] = [];
            for (let x = 0; x < size; x++) {
                this.cells[y][x] = 0;
            }
        }
    }

    randomize() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let r =  Random.next(0, 10);
                let isWall = 0;
                if (r > 7) {
                    isWall = 1;
                }
                this.cells[y][x] = isWall;
            }
        }
    }

    render() {
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
                    text: " "
                });
                cell.appendTo(row);
            }
        }
    }

    rerender() {
        let currentRow = $('.field .row');
        for (let y = 0; y < this.size; y++) {
            let currentCell = currentRow.find('.cell').first();          
            for (let x = 0; x < this.size; x++) {
                if (this.cells[y][x] == 1) {
                    currentCell.addClass('iscontains'); 
                } else {
                    currentCell.removeClass('iscontains');
                }
                currentCell = currentCell.next();
            }
            currentRow = currentRow.next();
        }
    }
};

export default Field;