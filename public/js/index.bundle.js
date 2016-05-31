/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //View
	
	
	var _draw = __webpack_require__(1);
	
	var _draw2 = _interopRequireDefault(_draw);
	
	var _point = __webpack_require__(2);
	
	var _point2 = _interopRequireDefault(_point);
	
	var _astar = __webpack_require__(3);
	
	var _astar2 = _interopRequireDefault(_astar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Controller = function () {
	    function Controller() {
	        _classCallCheck(this, Controller);
	
	        this.cellsCount = 0;
	        this.cells = [];
	
	        this.changeCellsCount(10);
	    }
	
	    _createClass(Controller, [{
	        key: "changeCellsCount",
	        value: function changeCellsCount(number) {
	            this.cellsCount = number;
	
	            //TODO: save
	            this.cells = [];
	
	            for (var i = 0; i < number; i++) {
	                for (var j = 0; j < number; j++) {
	                    if (!this.cells[i]) {
	                        this.cells[i] = [];
	                    }
	                    if (!this.cells[i][j]) {
	                        this.cells[i][j] = new _point2.default(i, j);
	                    }
	                }
	            }
	
	            this.draw = new _draw2.default(document.getElementById('canvas'), this.cells);
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            this.changeCellsCount(this.cellsCount);
	        }
	    }, {
	        key: "changeMarker",
	        value: function changeMarker(marker) {
	            this.draw.changeMarker(marker);
	        }
	    }, {
	        key: "findPath",
	        value: function findPath() {
	            var alg = new _astar2.default(this.draw.cells);
	
	            if (alg.findPath()) {
	                this.draw.setCells(alg.points);
	            } else {
	                this.draw.setCells(alg.points);
	                alert('can\'t find a way!');
	            }
	        }
	    }]);
	
	    return Controller;
	}();
	
	exports.default = Controller;
	
	
	var ctrl = new Controller();
	
	//grid input process
	document.querySelector("input#grid").addEventListener('change', function (e) {
	    var cellsCount = parseInt(document.querySelector("input#grid").value);
	
	    if (cellsCount > 1000) {
	        cellsCount = 1000;
	    }
	
	    if (cellsCount < 0) {
	        cellsCount = 0;
	    }
	
	    document.querySelector("input#grid").value = cellsCount;
	    ctrl.changeCellsCount(cellsCount);
	});
	
	//marker
	document.querySelector('.button-start').addEventListener('click', function (e) {
	    ctrl.changeMarker('start');
	});
	
	document.querySelector('.button-end').addEventListener('click', function (e) {
	    ctrl.changeMarker('end');
	});
	
	document.querySelector('.button-obstacle').addEventListener('click', function (e) {
	    ctrl.changeMarker('obstacle');
	});
	
	document.querySelector('.button-find').addEventListener('click', function (e) {
	    ctrl.findPath();
	});
	
	document.querySelector('.button-clear').addEventListener('click', function (e) {
	    ctrl.clear();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Draw = function () {
	    function Draw(canvas, cells) {
	        var _this = this;
	
	        _classCallCheck(this, Draw);
	
	        this.canvas = canvas;
	        this.ctx = canvas.getContext('2d');
	        this.grid = cells.length;
	        this.cells = cells;
	
	        this.startPoint = {};
	        this.endPoint = {};
	
	        this.marker = 'start'; // 'end', 'start', 'obstacle', 'null'
	
	        this.redraw();
	
	        canvas.addEventListener('click', function (e) {
	            _this.clickHandle(e, canvas);
	        });
	    }
	
	    _createClass(Draw, [{
	        key: 'setGrid',
	        value: function setGrid(grid) {
	            this.grid = parseInt(grid);
	            this.redraw();
	        }
	    }, {
	        key: 'setCells',
	        value: function setCells(cells) {
	            this.cells = cells;
	            this.redraw();
	        }
	    }, {
	        key: 'redraw',
	        value: function redraw() {
	            var i = void 0,
	                j = void 0;
	            var ctx = canvas.getContext('2d');
	            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	            for (i = 0; i < this.cells.length; i++) {
	                for (j = 0; j < this.cells.length; j++) {
	                    var fill = "";
	
	                    if (this.cells[i][j].marker !== 'null') {
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
	
	                        this.fillSector({ x: j, y: i }, fill);
	                    }
	                }
	            }
	
	            this.drawGrid();
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	        }
	    }, {
	        key: 'drawGrid',
	        value: function drawGrid() {
	            this.step = this.canvas.width / this.grid;
	            var start = 0;
	            var end = this.canvas.width;
	            var i = 0;
	
	            this.ctx.strokeStyle = "#ccc";
	            this.ctx.fillStyle = "#ccc";
	
	            for (i = start; i < end; i += this.step) {
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
	    }, {
	        key: 'changeMarker',
	        value: function changeMarker(marker) {
	            this.marker = marker;
	        }
	    }, {
	        key: 'clickHandle',
	        value: function clickHandle(e, canvas) {
	            var x;
	            var y;
	
	            if (e.pageX || e.pageY) {
	                x = e.pageX;
	                y = e.pageY;
	            } else {
	                x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	                y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	            }
	            x -= this.canvas.offsetLeft;
	            y -= this.canvas.offsetTop;
	
	            x = x / canvas.clientWidth * canvas.width;
	            y = y / canvas.clientHeight * canvas.height;
	
	            this.processClick({ x: x, y: y });
	        }
	    }, {
	        key: 'processClick',
	        value: function processClick(point) {
	            var i = Math.ceil(point.y / this.step) - 1;
	            var j = Math.ceil(point.x / this.step) - 1;
	
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
	    }, {
	        key: 'fillSector',
	        value: function fillSector(point, fill) {
	            var startPoint = void 0;
	            var step = this.step;
	
	            startPoint = {
	                x: point.x * step,
	                y: point.y * step
	            };
	
	            this.ctx.fillStyle = fill;
	            this.ctx.fillRect(startPoint.x, startPoint.y, step, step);
	        }
	    }]);
	
	    return Draw;
	}();
	
	exports.default = Draw;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Point = function Point(x, y) {
	    _classCallCheck(this, Point);
	
	    this.marker = 'null';
	    this.open = true;
	    this.metrics = undefined;
	
	    this.x = x;
	    this.y = y;
	};
	
	exports.default = Point;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Astar = function () {
	    function Astar(points) {
	        _classCallCheck(this, Astar);
	
	        this.points = points;
	    }
	
	    _createClass(Astar, [{
	        key: 'findPath',
	        value: function findPath() {
	            this.findStartEnd();
	
	            if (this.start !== undefined && this.end !== undefined) {
	                return this.search();
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'search',
	        value: function search() {
	            var last = this.start;
	            var minMetrics = 99999;
	            var openList = [];
	            var best = void 0;
	            var i = void 0,
	                j = void 0;
	            var counter = 0;
	
	            //добавление точки в список открытых вершин
	            var addPoints = function addPoints(i, j, parent, points, openList) {
	                var checkAndAdd = function checkAndAdd(i, j) {
	                    console.log(i, j);
	                    if (points[i][j].open && points[i][j].marker != 'obstacle') {
	
	                        //при нахождении оптимального родители закрашиваются.
	                        //тут сохранение родителя для элемента
	                        points[i][j].parent = parent;
	                        //игнорируем уже добавленные при попытке добавить еще раз
	                        points[i][j].open = false;
	
	                        openList.splice(0, 0, points[i][j]);
	                    }
	                };
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
	
	                if (i < points.length - 1) {
	                    checkAndAdd(i + 1, j);
	
	                    //diagonals
	                    // if (j < points[i].length - 1) {
	                    //     checkAndAdd(i + 1, j + 1);
	                    // }
	                    // if (j > 0) {
	                    //     checkAndAdd(i + 1, j - 1);
	                    // }
	                }
	            };
	
	            i = last.x;
	            j = last.y;
	
	            addPoints(i, j, undefined, this.points, openList);
	
	            while (openList.length > 0) {
	                counter++;
	
	                minMetrics = 99999;
	                best = undefined;
	
	                var maxIndex = 0;
	
	                //нахождение оптимального элемента из списка открытых вершин
	                for (var k = 0; k < openList.length; k++) {
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
	                if (best.x == this.end.x && best.y == this.end.y) {
	                    best.marker = 'end';
	                    var _last = last;
	
	                    //закраска родителей
	                    while (_last.parent) {
	                        _last.parent.marker = 'path';
	                        _last = _last.parent;
	                        //кроме первого
	                        if (!_last.parent) {
	                            break;
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
	    }, {
	        key: 'lineLength',
	        value: function lineLength(point1, point2) {
	            var x1 = void 0,
	                x2 = void 0,
	                y1 = void 0,
	                y2 = void 0,
	                res = void 0;
	
	            x1 = point1.x;
	            x2 = point2.x;
	            y1 = point1.y;
	            y2 = point2.y;
	
	            res = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	            return res;
	        }
	    }, {
	        key: 'findStartEnd',
	        value: function findStartEnd() {
	            var i = void 0,
	                j = void 0;
	
	            for (i = 0; i < this.points.length; i++) {
	                for (j = 0; j < this.points[i].length; j++) {
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
	    }]);
	
	    return Astar;
	}();
	
	exports.default = Astar;

/***/ }
/******/ ]);
//# sourceMappingURL=index.bundle.map