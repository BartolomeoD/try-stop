/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/Engine/BinaryTree.ts":
/*!******************************************!*\
  !*** ./src/scripts/Engine/BinaryTree.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BinaryTreeNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BinaryTreeNode */ "./src/scripts/Engine/BinaryTreeNode.ts");

class BinaryTree {
    constructor(argument, func) {
        this.comparableValue = func;
        if (argument != null)
            this.firstItem = new _BinaryTreeNode__WEBPACK_IMPORTED_MODULE_0__["default"](argument, null, this.comparableValue(argument));
    }
    add(argument) {
        let argumentComparableValue = this.comparableValue(argument);
        if (this.firstItem == null || this.firstItem == undefined) {
            this.firstItem = new _BinaryTreeNode__WEBPACK_IMPORTED_MODULE_0__["default"](argument, null, argumentComparableValue);
            return;
        }
        let parentNode = this.firstItem;
        while (true) {
            if (parentNode.getKey() > argumentComparableValue) {
                if (parentNode.getLeft() == null) {
                    parentNode.setLeft(new _BinaryTreeNode__WEBPACK_IMPORTED_MODULE_0__["default"](argument, parentNode, argumentComparableValue));
                    break;
                }
                else {
                    parentNode = parentNode.getLeft();
                }
            }
            else if (parentNode.getKey() < argumentComparableValue) {
                if (parentNode.getRight() == null) {
                    parentNode.setRight(new _BinaryTreeNode__WEBPACK_IMPORTED_MODULE_0__["default"](argument, parentNode, argumentComparableValue));
                    break;
                }
                else {
                    parentNode = parentNode.getRight();
                }
            }
            else {
                parentNode.addValue(argument);
                break;
            }
        }
    }
    toArray() {
        this.arrayOfElements = [];
        this.inOrder(this.firstItem);
        return this.arrayOfElements;
    }
    inOrder(node) {
        if (node != null && node != undefined) {
            this.inOrder(node.getLeft());
            this.arrayOfElements = this.arrayOfElements.concat(node.getValue());
            this.inOrder(node.getRight());
        }
    }
    minimum() {
        return this.minimumOf(this.firstItem);
    }
    isEmpty() {
        return this.firstItem == null;
    }
    minimumOf(node) {
        if (node.getLeft() == null)
            return node;
        return this.minimumOf(node.getLeft());
    }
    next(node) {
        if (node.getRight() != null)
            return this.minimumOf(node.getRight());
        let parent = node.getParent();
        while (parent != null && node == parent.getRight()) {
            node = parent;
            parent = node.getParent();
        }
        return parent;
    }
    search(arg) {
        return this.recursiveSearch(this.firstItem, this.comparableValue(arg));
    }
    searchItem(arg, func) {
        let node = this.search(arg);
        if (node == null)
            return null;
        let items = node.getValue();
        return items.find(func);
    }
    recursiveSearch(node, key) {
        if (node == null)
            return null;
        let nodeKey = node.getKey();
        if (nodeKey == key)
            return node;
        if (key < nodeKey)
            return this.recursiveSearch(node.getLeft(), key);
        else
            return this.recursiveSearch(node.getRight(), key);
    }
    removeNodeElement(arg) {
        let node = this.search(arg);
        if (node.getValue().length > 1) {
            node.removeFromValue(arg);
            return;
        }
        this.removeNode(node);
    }
    removeNode(arg) {
        // let argValue = arg.getValue());
        let parentNode = arg.getParent();
        if (parentNode == null) {
            let nextRoot = arg.getRight();
            this.firstItem = nextRoot;
            if (nextRoot != null)
                nextRoot.setParent(null);
        }
        else if (arg.getLeft() == null && arg.getRight() == null) {
            if (parentNode == null) {
                this.firstItem = null;
            }
            if (parentNode.getRight() == arg)
                parentNode.setRight(null);
            if (parentNode.getLeft() == arg)
                parentNode.setLeft(null);
        }
        else if (arg.getLeft() == null || arg.getRight() == null) {
            if (arg.getLeft() == null) {
                if (parentNode.getLeft() == arg) {
                    parentNode.setLeft(arg.getRight());
                }
                else {
                    parentNode.setRight(arg.getRight());
                }
                arg.getRight().setParent(parentNode);
            }
            else {
                if (parentNode.getLeft() == arg) {
                    parentNode.setLeft(arg.getLeft());
                }
                else {
                    parentNode.setRight(arg.getLeft());
                }
                arg.getLeft().setParent(parentNode);
            }
        }
        else {
            let successor = this.next(arg);
            arg.setValue(successor.getValue());
            arg.setKey(successor.getKey());
            if (successor.getParent().getLeft() == successor) {
                successor.getParent().setLeft(successor.getRight());
                if (successor.getRight() != null) {
                    successor.getRight().setParent(successor.getParent());
                }
            }
            else {
                successor.getParent().setRight(successor.getLeft());
                if (successor.getLeft() != null) {
                    successor.getRight().setParent(successor.getParent());
                }
            }
        }
    }
    print() {
        let nodesArray = [];
        nodesArray.push(this.firstItem);
        let consoleRow = "";
        while (nodesArray.length > 0) {
            consoleRow = "";
            let newNodesArray = [];
            for (let i = 0; i < nodesArray.length; i++) {
                consoleRow += nodesArray[i].getKey().toString();
                consoleRow += " [";
                for (let value of nodesArray[i].getValue()) {
                    consoleRow += value.toString() + " ";
                }
                consoleRow += "]";
                consoleRow += "   ";
                if (nodesArray[i].getLeft() != null)
                    newNodesArray.push(nodesArray[i].getLeft());
                if (nodesArray[i].getRight() != null)
                    newNodesArray.push(nodesArray[i].getRight());
            }
            console.log(consoleRow);
            nodesArray = newNodesArray;
        }
    }
    [Symbol.iterator]() {
        let node = this.minimum();
        return {
            next() {
                if (node != null && node != undefined) {
                    node = this.next(node);
                    return {
                        done: false,
                        value: node
                    };
                }
                else {
                    return {
                        done: true,
                        value: null
                    };
                }
            }
        };
    }
}
/* harmony default export */ __webpack_exports__["default"] = (BinaryTree);


/***/ }),

/***/ "./src/scripts/Engine/BinaryTreeNode.ts":
/*!**********************************************!*\
  !*** ./src/scripts/Engine/BinaryTreeNode.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class BinaryTreeNode {
    constructor(argument, parent, key) {
        this.value = [argument];
        this.parent = parent;
        this.key = key;
    }
    removeFromValue(arg) {
        let index = this.value.findIndex((value) => {
            return value.toString() == arg.toString();
        });
        if (index != undefined)
            this.value.splice(index, 1);
    }
    getParent() {
        return this.parent;
    }
    getKey() {
        return this.key;
    }
    setParent(parent) {
        this.parent = parent;
    }
    setLeft(argument) {
        this.left = argument;
    }
    setRight(argument) {
        this.right = argument;
    }
    getRight() {
        return this.right;
    }
    getLeft() {
        return this.left;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    setKey(value) {
        this.key = value;
    }
    addValue(arg) {
        this.value.push(arg);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (BinaryTreeNode);


/***/ }),

/***/ "./src/scripts/Engine/Game.ts":
/*!************************************!*\
  !*** ./src/scripts/Engine/Game.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Game {
    constructor(field) {
        this.field = field;
    }
    start() {
        this.field.render();
        setInterval(this.update.bind(this), 16);
    }
    update() {
        this.field.render();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./src/scripts/Engine/MapCoordinates.ts":
/*!**********************************************!*\
  !*** ./src/scripts/Engine/MapCoordinates.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class MapCoordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return this.x.toString() + "," + this.y.toString();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (MapCoordinates);


/***/ }),

/***/ "./src/scripts/Engine/PathFinder.ts":
/*!******************************************!*\
  !*** ./src/scripts/Engine/PathFinder.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PathNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PathNode */ "./src/scripts/Engine/PathNode.ts");
/* harmony import */ var _MapCoordinates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MapCoordinates */ "./src/scripts/Engine/MapCoordinates.ts");
/* harmony import */ var _BinaryTree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BinaryTree */ "./src/scripts/Engine/BinaryTree.ts");
/* harmony import */ var _GameObjects_Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../GameObjects/Box */ "./src/scripts/GameObjects/Box.ts");




class PathFinder {
    constructor(field) {
        this.field = field;
    }
    getCheckedNodes() {
        return this.checkedNodes;
    }
    findPath(from, to) {
        let startNode = new _PathNode__WEBPACK_IMPORTED_MODULE_0__["default"](from, 0, null, to);
        this.nodesToCheck = new _BinaryTree__WEBPACK_IMPORTED_MODULE_2__["default"](startNode, (node1) => {
            return node1.getFullPath();
        });
        this.checkedNodes = new _BinaryTree__WEBPACK_IMPORTED_MODULE_2__["default"](null, (node1) => {
            return node1.getHeuristicDistanceToGoal();
        });
        while (!this.nodesToCheck.isEmpty()) {
            let currentNode = this.nodesToCheck.minimum().getValue()[0];
            if (currentNode.getCoordinates().toString() == to.toString()) {
                console.log("path find");
                return this.getResultPath(currentNode);
            }
            this.nodesToCheck.removeNodeElement(currentNode);
            this.checkedNodes.add(currentNode);
            for (let neighbourNode of this.getNeighbors(currentNode, to)) {
                if (this.checkedNodes.searchItem(neighbourNode, (value) => {
                    return value.getCoordinates().toString() == neighbourNode.getCoordinates().toString();
                })) {
                    continue;
                }
                let processedNode = this.nodesToCheck.searchItem(neighbourNode, (value) => {
                    return value.getCoordinates().toString() == neighbourNode.getCoordinates().toString();
                });
                if (processedNode == null) {
                    this.nodesToCheck.add(neighbourNode);
                }
                else {
                    if (processedNode.getDistanceFromStart() > neighbourNode.getDistanceFromStart()) {
                        processedNode.setCameFrom(currentNode);
                        processedNode.setDistanceFromStart(currentNode.getDistanceFromStart());
                    }
                }
            }
        }
        return null;
    }
    getNeighbors(node, to) {
        let pathNodesCoordinates = [];
        let nodeCoordinates = node.getCoordinates();
        pathNodesCoordinates.push(new _MapCoordinates__WEBPACK_IMPORTED_MODULE_1__["default"](nodeCoordinates.x + 1, nodeCoordinates.y));
        pathNodesCoordinates.push(new _MapCoordinates__WEBPACK_IMPORTED_MODULE_1__["default"](nodeCoordinates.x - 1, nodeCoordinates.y));
        pathNodesCoordinates.push(new _MapCoordinates__WEBPACK_IMPORTED_MODULE_1__["default"](nodeCoordinates.x, nodeCoordinates.y + 1));
        pathNodesCoordinates.push(new _MapCoordinates__WEBPACK_IMPORTED_MODULE_1__["default"](nodeCoordinates.x, nodeCoordinates.y - 1));
        let pathNodes = [];
        for (let coords of pathNodesCoordinates) {
            if (coords.x < 0 || coords.x >= this.field.size) {
                continue;
            }
            if (coords.y < 0 || coords.y >= this.field.size) {
                continue;
            }
            if (this.field.getObjectByCoordinates(coords) instanceof _GameObjects_Box__WEBPACK_IMPORTED_MODULE_3__["default"])
                continue;
            pathNodes.push(new _PathNode__WEBPACK_IMPORTED_MODULE_0__["default"](coords, node.getDistanceFromStart() + 1, node, to));
        }
        return pathNodes;
    }
    getResultPath(node) {
        let result = [];
        let currentNode = node;
        while (currentNode != null) {
            result.push(currentNode.getCoordinates());
            currentNode = currentNode.getCamefrom();
        }
        result.reverse();
        return result;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (PathFinder);


/***/ }),

/***/ "./src/scripts/Engine/PathNode.ts":
/*!****************************************!*\
  !*** ./src/scripts/Engine/PathNode.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class PathNode {
    constructor(coordinates, distanceFromStart, cameFrom, goal) {
        this.coordinates = coordinates;
        this.distanceFromStart = distanceFromStart;
        this.cameFrom = cameFrom;
        this.heuristicDistanceToGoal = this.getHeuristicDistanceTo(goal);
    }
    setCameFrom(cameFrom) {
        this.cameFrom = cameFrom;
    }
    setDistanceFromStart(distance) {
        this.distanceFromStart = distance;
    }
    getHeuristicDistanceToGoal() {
        return this.heuristicDistanceToGoal;
    }
    getHeuristicDistanceTo(coordinates) {
        let distanceToCoordinates = Math.abs(coordinates.x - this.coordinates.x) +
            Math.abs(coordinates.y - this.coordinates.y);
        return distanceToCoordinates;
    }
    getCoordinates() {
        return this.coordinates;
    }
    getDistanceFromStart() {
        return this.distanceFromStart;
    }
    getCamefrom() {
        return this.cameFrom;
    }
    getFullPath() {
        return this.getHeuristicDistanceToGoal() + this.distanceFromStart;
    }
    toString() {
        return this.getCoordinates().toString() + " distanceFromStart " + this.distanceFromStart.toString();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (PathNode);


/***/ }),

/***/ "./src/scripts/EntryPoint.ts":
/*!***********************************!*\
  !*** ./src/scripts/EntryPoint.ts ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Environment_Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Environment/Field */ "./src/scripts/Environment/Field.ts");
/* harmony import */ var _Engine_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Engine/Game */ "./src/scripts/Engine/Game.ts");
/* harmony import */ var _GameObjects_Enemy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameObjects/Enemy */ "./src/scripts/GameObjects/Enemy.ts");
/* harmony import */ var _Engine_MapCoordinates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Engine/MapCoordinates */ "./src/scripts/Engine/MapCoordinates.ts");




window.onload = () => {
    let size = 50;
    let field = new _Environment_Field__WEBPACK_IMPORTED_MODULE_0__["default"](size);
    field.randomize();
    let game = new _Engine_Game__WEBPACK_IMPORTED_MODULE_1__["default"](field);
    game.start();
    let startPoint = new _Engine_MapCoordinates__WEBPACK_IMPORTED_MODULE_3__["default"](0, 0);
    let endPoint = new _Engine_MapCoordinates__WEBPACK_IMPORTED_MODULE_3__["default"](size - 1, size - 1);
    game.field.deleteObjectByCoordinates(startPoint);
    game.field.deleteObjectByCoordinates(endPoint);
    let enemy = new _GameObjects_Enemy__WEBPACK_IMPORTED_MODULE_2__["default"](startPoint, field);
    game.field.gameObjects.push(enemy);
    enemy.goTo(endPoint);
};


/***/ }),

/***/ "./src/scripts/Environment/Field.ts":
/*!******************************************!*\
  !*** ./src/scripts/Environment/Field.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Helpers_Random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Helpers/Random */ "./src/scripts/Helpers/Random.ts");
/* harmony import */ var _Engine_MapCoordinates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Engine/MapCoordinates */ "./src/scripts/Engine/MapCoordinates.ts");
/* harmony import */ var _GameObjects_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../GameObjects/Box */ "./src/scripts/GameObjects/Box.ts");
/* harmony import */ var _GameObjects_Enemy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../GameObjects/Enemy */ "./src/scripts/GameObjects/Enemy.ts");




class Field {
    constructor(size) {
        this.htmlSize = 600;
        this.canvasHtmlElement = document.getElementById("field");
        this.context = this.canvasHtmlElement.getContext("2d");
        this.canvasHtmlElement.setAttribute("width", this.htmlSize.toString());
        this.canvasHtmlElement.setAttribute("height", this.htmlSize.toString());
        this.cellSize = this.htmlSize / size;
        this.size = size;
        this.gameObjects = [];
    }
    randomize() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let r = _Helpers_Random__WEBPACK_IMPORTED_MODULE_0__["default"].next(0, 20);
                if (r > 15) {
                    let currCoords = new _Engine_MapCoordinates__WEBPACK_IMPORTED_MODULE_1__["default"](x, y);
                    this.gameObjects[x + y * this.size] = new _GameObjects_Box__WEBPACK_IMPORTED_MODULE_2__["default"](currCoords);
                }
            }
        }
    }
    getObjectByCoordinates(coords) {
        let obj = this.gameObjects[coords.x + coords.y * this.size];
        if (obj == undefined)
            return null;
        return obj;
    }
    deleteObjectByCoordinates(coords) {
        this.gameObjects[coords.x + coords.y * this.size] = undefined;
    }
    render() {
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.htmlSize, this.htmlSize);
        for (let gameObject of this.gameObjects) {
            if (gameObject instanceof _GameObjects_Box__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                this.context.fillStyle = "black";
            }
            else if (gameObject instanceof _GameObjects_Enemy__WEBPACK_IMPORTED_MODULE_3__["default"]) {
                console.log("enemy");
                this.context.fillStyle = "blueviolet";
            }
            else if (gameObject == undefined) {
                continue;
            }
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
                    var coords = new _Engine_MapCoordinates__WEBPACK_IMPORTED_MODULE_1__["default"](x, y);
                    this.gameObjects[x + y * this.size] = (new _GameObjects_Box__WEBPACK_IMPORTED_MODULE_2__["default"](coords));
                }
            }
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Field);


/***/ }),

/***/ "./src/scripts/GameObjects/Box.ts":
/*!****************************************!*\
  !*** ./src/scripts/GameObjects/Box.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Box {
    constructor(coordinates) {
        this.coordinates = coordinates;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Box);


/***/ }),

/***/ "./src/scripts/GameObjects/Enemy.ts":
/*!******************************************!*\
  !*** ./src/scripts/GameObjects/Enemy.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Engine_PathFinder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Engine/PathFinder */ "./src/scripts/Engine/PathFinder.ts");

class Enemy {
    constructor(coordinates, field) {
        this.coordinates = coordinates;
        this.pathFinder = new _Engine_PathFinder__WEBPACK_IMPORTED_MODULE_0__["default"](field);
        this.field = field;
    }
    calculatePath(toCoordinates) {
        this.currentStep = 0;
        this.path = this.pathFinder.findPath(this.coordinates, toCoordinates);
        if (this.path == null) {
            throw "end game";
        }
    }
    step() {
        if (this.currentStep == this.path.length - 1) {
            console.log("end");
            clearInterval(this.interval);
            console.log(this.field.gameObjects);
            return;
        }
        this.coordinates = this.path[this.currentStep + 1];
        this.currentStep++;
    }
    //TODO переделать это на следование за отдельным юнитом
    goTo(coords) {
        this.calculatePath(coords);
        this.interval = setInterval(this.everyInterval.bind(this), 100);
    }
    everyInterval() {
        console.log("moved");
        this.step();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Enemy);


/***/ }),

/***/ "./src/scripts/Helpers/Random.ts":
/*!***************************************!*\
  !*** ./src/scripts/Helpers/Random.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Random {
    static next(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Random);


/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!****************************************************************!*\
  !*** multi ./src/scripts/EntryPoint.ts ./src/styles/main.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/scripts/EntryPoint.ts */"./src/scripts/EntryPoint.ts");
module.exports = __webpack_require__(/*! ./src/styles/main.scss */"./src/styles/main.scss");


/***/ })

/******/ });
//# sourceMappingURL=script.js.map