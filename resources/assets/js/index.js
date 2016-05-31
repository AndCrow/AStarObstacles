import Draw from "./draw.js"; //View
import Point from "./point.js";
import Astar from './astar';

export default class Controller{
    constructor(){
        this.cellsCount = 0;
        this.cells = [];

        this.changeCellsCount(10);
    }

    changeCellsCount(number) {
        this.cellsCount = number;

        //TODO: save
        this.cells = [];

        for (let i = 0; i < number; i++){
            for (let j = 0; j < number; j ++){
                if (!this.cells[i]){
                    this.cells[i] = [];
                }
                if (!this.cells[i][j]){
                    this.cells[i][j] = new Point(i, j);
                }
            }
        }

        this.draw = new Draw(document.getElementById('canvas'), this.cells);
    }

    clear(){
        this.changeCellsCount(this.cellsCount);
    }

    changeMarker(marker) {
        this.draw.changeMarker(marker);
    }

    findPath(){
        let alg = new Astar(this.draw.cells);

        if (alg.findPath()) {
            this.draw.setCells(alg.points);
        } else {
            this.draw.setCells(alg.points);
            alert('can\'t find a way!')
        }
    }
}

var ctrl = new Controller();

//grid input process
document.querySelector("input#grid").addEventListener('change', (e) => {
    let cellsCount = parseInt(document.querySelector("input#grid").value);

    if (cellsCount > 1000){
        cellsCount = 1000;
    }

    if (cellsCount < 0){
        cellsCount = 0;
    }

    document.querySelector("input#grid").value = cellsCount;
    ctrl.changeCellsCount(cellsCount);
});

//marker
document.querySelector('.button-start').addEventListener('click', (e)=>{
    ctrl.changeMarker('start');
});

document.querySelector('.button-end').addEventListener('click', (e)=>{
    ctrl.changeMarker('end');
});

document.querySelector('.button-obstacle').addEventListener('click', (e)=>{
    ctrl.changeMarker('obstacle');
});

document.querySelector('.button-find').addEventListener('click', (e)=>{
    ctrl.findPath();
});

document.querySelector('.button-clear').addEventListener('click', (e)=>{
    ctrl.clear();
});
