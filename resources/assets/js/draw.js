export default class Draw{
    constructor(canvas, cells){
        this.canvas= canvas;
        this.ctx = canvas.getContext('2d');
        this.grid = cells.length;
        this.cells = cells;

        this.startPoint = {};
        this.endPoint = {};

        this.marker = 'start'; // 'end', 'start', 'obstacle', 'null'

        this.redraw();

        canvas.addEventListener('click', (e) => {this.clickHandle(e, canvas)});
    }

    setGrid(grid) {
        this.grid = parseInt(grid);
        this.redraw();
    }

    setCells(cells){
        this.cells = cells;
        this.redraw();
    }

    redraw(){
        let i,j;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (i = 0; i < this.cells.length; i++){
            for (j = 0; j < this.cells.length; j++){
                let fill = "";

                if (this.cells[i][j].marker !== 'null'){
                    switch (this.cells[i][j].marker) {
                        case 'start':
                            fill = "#90ee90";
                            this.startPoint = this.cells[i][j];
                            break;
                        case 'end':
                            fill = "#f00";
                            this.endPoint = this.cells[i][j];
                            break;
                        case 'opened':
                            fill = '#FFFEC9';
                            break;
                        case 'path':
                            fill = '#add8e6';
                            break;
                        case 'obstacle':
                            fill = "#535353";
                            break;
                        default:
                            fill = "#fff";
                    }

                    this.fillSector({x:j, y:i}, fill);
                }
            }
        }

        this.drawGrid();
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGrid(){
        this.step = this.canvas.width / this.grid;
        let start = 0;
        let end = this.canvas.width;
        let i = 0;

        this.ctx.strokeStyle="#ccc";
        this.ctx.fillStyle="#ccc";

        for (i = start; i < end; i += this.step){
            this.ctx.beginPath();
            this.ctx.moveTo(start, i);
            this.ctx.lineTo(end, i);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(i, start);
            this.ctx.lineTo(i, end);
            this.ctx.stroke();
        }
    }

    changeMarker(marker) {
        this.marker = marker;
    }

    clickHandle(e, canvas){
        var x;
        var y;

        if (e.pageX || e.pageY) {
          x = e.pageX;
          y = e.pageY;
        }
        else {
          x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        x -= this.canvas.offsetLeft;
        y -= this.canvas.offsetTop;

        x = x / canvas.clientWidth * canvas.width;
        y = y / canvas.clientHeight * canvas.height;

        this.processClick({x, y});
    }

    processClick(point){
        let i = Math.ceil(point.y / this.step) - 1;
        let j = Math.ceil(point.x / this.step) - 1;

        if (this.marker == 'start') {
            this.startPoint.marker = 'null';
        }
        if (this.marker == 'end') {
            this.endPoint.marker = 'null';
        }

        if (this.marker == 'obstacle') {
            this.cells[i][j].open = !this.cells[i][j].open;
        }

        if (this.cells[i][j].marker == this.marker) {
            this.cells[i][j].marker = 'null';
        } else {
            this.cells[i][j].marker = this.marker;
        }

        this.redraw();
    }

    fillSector(point, fill) {
        let startPoint;
        let step = this.step;

        startPoint = {
            x: point.x * step,
            y: point.y * step
        };

        this.ctx.fillStyle = fill;
        this.ctx.fillRect(startPoint.x, startPoint.y, step, step);
    }
}
