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
        this.firstItem = new _BinaryTreeNode__WEBPACK_IMPORTED_MODULE_0__["default"](argument, null, this.comparableValue(argument));
    }
    add(argument) {
        let parentNode = this.firstItem;
        let argumentComparableValue = this.comparableValue(argument);
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
    minimum() {
        return this.minimumOf(this.firstItem);
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
    isExist(arg) {
        return this.search(arg) != null;
    }
    search(arg) {
        return this.recursiveSearch(this.firstItem, this.comparableValue(arg));
    }
    recursiveSearch(node, key) {
        let nodeKey = node.getKey();
        if (node == null || nodeKey == key)
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
        if (arg.getValue().length > 1) {
        }
        let parentNode = arg.getParent();
        if (arg.getLeft() == null && arg.getRight() == null) {
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
        // let index = this.value.indexOf(arg);
        console.log(index);
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

/***/ "./src/scripts/EntryPoint.ts":
/*!***********************************!*\
  !*** ./src/scripts/EntryPoint.ts ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Engine_BinaryTree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Engine/BinaryTree */ "./src/scripts/Engine/BinaryTree.ts");
/* harmony import */ var _Helpers_Random__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Helpers/Random */ "./src/scripts/Helpers/Random.ts");
// import Field from './Environment/Field';
// import Game from './Engine/Game';
// import MapCoordinates from "./Engine/MapCoordinates";
// import PathFinder from "./Engine/PathFinder";
// import StopWatch from "./Helpers/StopWatch";
// import Sleep from "./Helpers/Sleep";
//
//
// let size: number = 50;
//
// let field = new Field(size);
// field.randomize();
// let game = new Game(field);
// game.start();
//
// game.field.cells[0][0] = 0;
// game.field.cells[49][49] = 0;
//
// let pathFinder = new PathFinder(game.field, game);
// let stopWatch: StopWatch = new StopWatch();
// // Sleep.sleep(1000);
// stopWatch.Start();
// let path = pathFinder.findPath(new MapCoordinates(0, 0), new MapCoordinates(size - 1, size - 1));
// stopWatch.end();
// console.log("bench result: " + stopWatch.getResult());
//
// game.field.showNodes(pathFinder.getCheckedNodes());
// if (path != null) {
//     console.log("path length: " + path.length);
//     game.field.addPath(path);
// }


class Test {
    constructor(asd) {
        this.value = asd;
        this.rValue = _Helpers_Random__WEBPACK_IMPORTED_MODULE_1__["default"].next(0, 20);
    }
    set(number) {
        this.rValue = number;
    }
    toString() {
        return this.rValue.toString();
    }
}
let main1 = new Test(8);
main1.set(12);
let binaryTree = new _Engine_BinaryTree__WEBPACK_IMPORTED_MODULE_0__["default"](main1, (test) => {
    return test.value;
});
let willDelete1 = new Test(2);
willDelete1.set(1337);
let willDelete2 = new Test(4);
willDelete2.set(133);
binaryTree.add(willDelete2);
binaryTree.add(new Test(12));
binaryTree.add(new Test(2));
binaryTree.add(new Test(6));
binaryTree.add(new Test(10));
binaryTree.add(new Test(14));
binaryTree.add(new Test(2));
binaryTree.add(willDelete1);
binaryTree.add(new Test(2));
binaryTree.add(new Test(2));
binaryTree.add(new Test(6));
binaryTree.print();
binaryTree.removeNodeElement(main1);
binaryTree.print();


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