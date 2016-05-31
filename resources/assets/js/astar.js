export default class Astar{

    constructor(points){
        this.points = points;
    }

    findPath(){
        this.findStartEnd();

        if ((this.start !== undefined) && (this.end  !== undefined)){
            return this.search();
        } else {
            return false;
        }
    }

    search(){
        let last = this.start;
        let minMetrics = 99999;
        let openList = [];
        let best;
        let i,j;
        let counter = 0;

        //добавление точки в список открытых вершин
        let addPoints = function(i, j, parent, points, openList){
            let checkAndAdd = function(i, j){
                console.log(i, j);
                if (points[i][j].open && points[i][j].marker != 'obstacle'){

                    //при нахождении оптимального родители закрашиваются.
                    //тут сохранение родителя для элемента
                    points[i][j].parent = parent;
                    //игнорируем уже добавленные при попытке добавить еще раз
                    points[i][j].open = false;

                    openList.splice(0,0,points[i][j]);
                }
            }
            //проверки существования элемента в текущей сетке
            if (j > 0) {
                checkAndAdd(i, j - 1);
            }

            if (j + 1 < points[i].length) {
                checkAndAdd(i, j + 1);
            }

            if (i > 0) {
                checkAndAdd(i - 1, j);

                //diagonals
                // if (j > 0) {
                //     checkAndAdd(i - 1, j - 1);
                // }
                // if (j < points[i - 1].length - 1) {
                //     checkAndAdd(i - 1, j + 1);
                // }
            }

            if (i < points.length - 1){
                checkAndAdd(i + 1, j);

                //diagonals
                // if (j < points[i].length - 1) {
                //     checkAndAdd(i + 1, j + 1);
                // }
                // if (j > 0) {
                //     checkAndAdd(i + 1, j - 1);
                // }
            }
        }

        i = last.x;
        j = last.y;

        addPoints(i, j, undefined, this.points, openList);

        while (openList.length > 0) {
            counter++;

            minMetrics = 99999;
            best = undefined;

            let maxIndex = 0;

            //нахождение оптимального элемента из списка открытых вершин
            for (let k = 0; k < openList.length; k ++){
                openList[k].metrics = this.lineLength(openList[k], this.end);
                if (openList[k].metrics < minMetrics) {
                    minMetrics = openList[k].metrics;
                    best = openList[k];
                    maxIndex = k;
                }
            }

            //удаление оптимального элемента из списка открытых вершин
            openList.splice(maxIndex, 1);

            //best.open = false;
            //закраска раскрытой вершины
            best.marker = 'opened';

            last = best;

            //end search
            if ((best.x == this.end.x) && (best.y == this.end.y)){
                best.marker = 'end';
                let _last = last;

                //закраска родителей
                while (_last.parent) {
                    _last.parent.marker = 'path';
                    _last = _last.parent;
                    //кроме первого
                    if (!_last.parent) {
                        break
                    }
                }

                //this.start.marker = 'start';

                console.log('success!');
                return true;
            }

            i = best.x;
            j = best.y;

            //добавление всех соседних точек от текущей лучшей
            addPoints(i, j, last, this.points, openList);

        }
        console.log('');
        return false;
    }

    lineLength(point1, point2){
        let x1,x2,y1,y2, res;

        x1 = point1.x;
        x2 = point2.x;
        y1 = point1.y;
        y2 = point2.y;

        res = Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2));
        return res;
    }

    findStartEnd(){
        let i,j;

        for (i = 0; i < this.points.length; i++) {
            for (j = 0; j < this.points[i].length; j++){
                if (this.points[i][j].marker == 'start') {
                    this.start = {
                                    x: i,
                                    y: j
                                };
                    continue;
                }

                if (this.points[i][j].marker == 'end') {
                    this.end = {
                                    x: i,
                                    y: j
                                };
                    continue;
                }
            }
        }
    }
}
