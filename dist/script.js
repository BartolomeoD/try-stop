define("Helpers/Random", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Random {
        static next(min, max) {
            return Math.round(Math.random() * (max - min)) + min;
        }
    }
    exports.default = Random;
});
define("Engine/MapCoordinates", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MapCoordinates {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        toString() {
            return this.x.toString() + "," + this.y.toString();
        }
    }
    exports.default = MapCoordinates;
});
define("GameObjects/GameObject", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameObject {
    }
    exports.default = GameObject;
});
define("GameObjects/Box", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Box {
        constructor(coordinates) {
            this.color = "black";
            this.isImpenetrable = false;
            this.coordinates = coordinates;
        }
    }
    exports.default = Box;
});
define("DataStructure/BinaryTree/BinaryTreeNode", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BinaryTreeNode {
        constructor(argument, parent, key) {
            this.value = argument;
            this.parent = parent;
            this.key = key;
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
    }
    exports.default = BinaryTreeNode;
});
define("DataStructure/BinaryTree/BinaryTree", ["require", "exports", "DataStructure/BinaryTree/BinaryTreeNode"], function (require, exports, BinaryTreeNode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BinaryTree {
        constructor(argument, func) {
            this.comparableValue = func;
            if (argument != null)
                this.firstItem = new BinaryTreeNode_1.default(argument, null, this.comparableValue(argument));
        }
        add(argument) {
            let argumentComparableValue = this.comparableValue(argument);
            if (this.firstItem == null || this.firstItem == undefined) {
                this.firstItem = new BinaryTreeNode_1.default(argument, null, argumentComparableValue);
                return;
            }
            let parentNode = this.firstItem;
            while (true) {
                if (parentNode.getKey() > argumentComparableValue) {
                    if (parentNode.getLeft() == null) {
                        parentNode.setLeft(new BinaryTreeNode_1.default(argument, parentNode, argumentComparableValue));
                        break;
                    }
                    else {
                        parentNode = parentNode.getLeft();
                    }
                }
                else if (parentNode.getKey() < argumentComparableValue) {
                    if (parentNode.getRight() == null) {
                        parentNode.setRight(new BinaryTreeNode_1.default(argument, parentNode, argumentComparableValue));
                        break;
                    }
                    else {
                        parentNode = parentNode.getRight();
                    }
                }
                else {
                    throw "added value with exist key " + argumentComparableValue;
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
        searchItem(arg) {
            let node = this.search(arg);
            if (node == null)
                return null;
            return node.getValue();
        }
        searchByKey(key) {
            let node = this.recursiveSearch(this.firstItem, key);
            if (node == null)
                return null;
            return node.getValue();
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
        removeNode(arg) {
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
        removeNodeElement(arg) {
            let node = this.search(arg);
            this.removeNode(node);
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
                    consoleRow += nodesArray[i].getValue().toString();
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
    exports.default = BinaryTree;
});
define("Environment/GameObjectCollection", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameObjectCollection {
        constructor(fielSize) {
            this.array = [];
            this.fieldSize = fielSize;
        }
        getObject(coords) {
            let item = this.array[coords.x + coords.y * this.fieldSize];
            if (item == undefined)
                return null;
            return item;
        }
        add(gameObject) {
            this.array[gameObject.coordinates.x + gameObject.coordinates.y * this.fieldSize] = gameObject;
        }
        removeByCoordinates(coords) {
            this.array[coords.x + coords.y * this.fieldSize] = undefined;
        }
        move(from, to) {
            this.array[to.x + to.y * this.fieldSize] = this.array[from.x + from.y * this.fieldSize];
            this.removeByCoordinates(from);
        }
        toArray() {
            return this.array;
        }
    }
    exports.default = GameObjectCollection;
});
define("Environment/Field", ["require", "exports", "Helpers/Random", "Engine/MapCoordinates", "GameObjects/Box", "Environment/GameObjectCollection"], function (require, exports, Random_1, MapCoordinates_1, Box_1, GameObjectCollection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Field {
        constructor(size) {
            this.htmlSize = 600;
            this.canvasHtmlElement = document.getElementById("field");
            this.context = this.canvasHtmlElement.getContext("2d");
            this.canvasHtmlElement.setAttribute("width", this.htmlSize.toString());
            this.canvasHtmlElement.setAttribute("height", this.htmlSize.toString());
            this.cellSize = this.htmlSize / size;
            this.size = size;
            this.gameObjects = new GameObjectCollection_1.default(this.size);
        }
        randomize() {
            for (let y = 0; y < this.size; y++) {
                for (let x = 0; x < this.size; x++) {
                    let r = Random_1.default.next(0, 20);
                    if (r > 15) {
                        let currCoords = new MapCoordinates_1.default(x, y);
                        this.gameObjects.add(new Box_1.default(currCoords));
                    }
                }
            }
        }
        getObjectByCoordinates(coords) {
            return this.gameObjects.getObject(coords);
        }
        deleteObjectByCoordinates(coords) {
            this.gameObjects.removeByCoordinates(coords);
        }
        render() {
            this.context.fillStyle = "#f6f6f6";
            this.context.fillRect(0, 0, this.htmlSize, this.htmlSize);
            for (let gameObject of this.gameObjects.toArray()) {
                if (gameObject == undefined) {
                    continue;
                }
                this.context.fillStyle = gameObject.color;
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
                        var coords = new MapCoordinates_1.default(x, y);
                        this.gameObjects.add((new Box_1.default(coords)));
                    }
                }
            }
        }
        makeBoxForPlayer() {
            for (let x = 0; x < this.size / 2; x++) {
                var coords = new MapCoordinates_1.default(x, this.size / 2);
                this.gameObjects.add((new Box_1.default(coords)));
            }
            for (let y = 0; y < this.size / 2; y++) {
                var coords = new MapCoordinates_1.default(this.size / 2, y);
                this.gameObjects.add((new Box_1.default(coords)));
            }
        }
    }
    exports.default = Field;
});
define("GlobalVariables", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TickInMiliseconds = 100;
    exports.FieldSize = 50;
});
define("GameObjects/Player", ["require", "exports", "Engine/MapCoordinates"], function (require, exports, MapCoordinates_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Player {
        constructor(coords, field) {
            this.color = "green";
            this.isImpenetrable = true;
            this.coordinates = coords;
            this.field = field;
        }
        moveBottom() {
            this.move("bottom");
        }
        moveUp() {
            this.move("up");
        }
        moveLeft() {
            this.move("left");
        }
        moveRight() {
            this.move("right");
        }
        move(direction) {
            let supposedCoordinates;
            switch (direction) {
                case "up":
                    supposedCoordinates = new MapCoordinates_2.default(this.coordinates.x, this.coordinates.y - 1);
                    break;
                case "bottom":
                    supposedCoordinates = new MapCoordinates_2.default(this.coordinates.x, this.coordinates.y + 1);
                    break;
                case "left":
                    supposedCoordinates = new MapCoordinates_2.default(this.coordinates.x - 1, this.coordinates.y);
                    break;
                case "right":
                    supposedCoordinates = new MapCoordinates_2.default(this.coordinates.x + 1, this.coordinates.y);
                    break;
                default:
                    throw "direction not parsed";
            }
            if (!this.isExisOnTheField(supposedCoordinates))
                return;
            if (this.field.getObjectByCoordinates(supposedCoordinates) != null)
                return;
            this.field.gameObjects.move(this.coordinates, supposedCoordinates);
            this.coordinates = supposedCoordinates;
        }
        isExisOnTheField(coords) {
            return !(coords.x >= this.field.size || coords.y >= this.field.size
                || coords.x < 0 || coords.y < 0);
        }
    }
    exports.default = Player;
});
define("Engine/ControlManager", ["require", "exports", "GlobalVariables"], function (require, exports, GlobalVariables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ControlManager {
        constructor(player) {
            this.player = player;
            this.isDisabled = false;
        }
        cacthKey(event) {
            if (!this.isDisabled) {
                this.disableTemproary();
                switch (event.code) {
                    case "ArrowLeft":
                        this.player.moveLeft();
                        break;
                    case "ArrowRight":
                        this.player.moveRight();
                        break;
                    case "ArrowDown":
                        this.player.moveBottom();
                        break;
                    case "ArrowUp":
                        this.player.moveUp();
                        break;
                }
            }
            else {
                console.log("disabled");
            }
        }
        disableTemproary() {
            this.isDisabled = true;
            setTimeout(() => {
                this.isDisabled = false;
            }, GlobalVariables_1.TickInMiliseconds * 0.3);
        }
    }
    exports.default = ControlManager;
});
define("Engine/PathNode", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = PathNode;
});
define("DataStructure/ArrayBinaryTree/ArrayBinaryTreeNode", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ArrayBinaryTreeNode {
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
    exports.default = ArrayBinaryTreeNode;
});
define("DataStructure/ArrayBinaryTree/ArrayBinaryTree", ["require", "exports", "DataStructure/ArrayBinaryTree/ArrayBinaryTreeNode"], function (require, exports, ArrayBinaryTreeNode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ArrayBinaryTree {
        constructor(argument, func) {
            this.comparableValue = func;
            if (argument != null)
                this.firstItem = new ArrayBinaryTreeNode_1.default(argument, null, this.comparableValue(argument));
        }
        add(argument) {
            let argumentComparableValue = this.comparableValue(argument);
            if (this.firstItem == null || this.firstItem == undefined) {
                this.firstItem = new ArrayBinaryTreeNode_1.default(argument, null, argumentComparableValue);
                return;
            }
            let parentNode = this.firstItem;
            while (true) {
                if (parentNode.getKey() > argumentComparableValue) {
                    if (parentNode.getLeft() == null) {
                        parentNode.setLeft(new ArrayBinaryTreeNode_1.default(argument, parentNode, argumentComparableValue));
                        break;
                    }
                    else {
                        parentNode = parentNode.getLeft();
                    }
                }
                else if (parentNode.getKey() < argumentComparableValue) {
                    if (parentNode.getRight() == null) {
                        parentNode.setRight(new ArrayBinaryTreeNode_1.default(argument, parentNode, argumentComparableValue));
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
        searchByKey(key) {
            let node = this.recursiveSearch(this.firstItem, key);
            if (node == null)
                return null;
            let items = node.getValue();
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
    }
    exports.default = ArrayBinaryTree;
});
define("Engine/PathFinder", ["require", "exports", "Engine/PathNode", "Engine/MapCoordinates", "DataStructure/ArrayBinaryTree/ArrayBinaryTree", "GameObjects/Enemy"], function (require, exports, PathNode_1, MapCoordinates_3, ArrayBinaryTree_1, Enemy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PathFinder {
        constructor(field) {
            this.field = field;
        }
        getCheckedNodes() {
            return this.checkedNodes;
        }
        findPath(from, to, isIgnoreEnemy = true) {
            let startNode = new PathNode_1.default(from, 0, null, to);
            this.nodesToCheck = new ArrayBinaryTree_1.default(startNode, (node1) => {
                return node1.getFullPath();
            });
            this.checkedNodes = new ArrayBinaryTree_1.default(null, (node1) => {
                return node1.getHeuristicDistanceToGoal();
            });
            while (!this.nodesToCheck.isEmpty()) {
                let currentNode = this.nodesToCheck.minimum().getValue()[0];
                if (currentNode.getCoordinates().toString() == to.toString())
                    return this.getResultPath(currentNode);
                this.nodesToCheck.removeNodeElement(currentNode);
                this.checkedNodes.add(currentNode);
                for (let neighbourNode of this.getNeighbors(currentNode, to, isIgnoreEnemy)) {
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
            console.log("not found");
            return null;
        }
        getNeighbors(node, to, isIgnoreEnemy) {
            let pathNodesCoordinates = [];
            let nodeCoordinates = node.getCoordinates();
            pathNodesCoordinates.push(new MapCoordinates_3.default(nodeCoordinates.x, nodeCoordinates.y + 1));
            pathNodesCoordinates.push(new MapCoordinates_3.default(nodeCoordinates.x + 1, nodeCoordinates.y));
            pathNodesCoordinates.push(new MapCoordinates_3.default(nodeCoordinates.x, nodeCoordinates.y - 1));
            pathNodesCoordinates.push(new MapCoordinates_3.default(nodeCoordinates.x - 1, nodeCoordinates.y));
            let pathNodes = [];
            for (let coords of pathNodesCoordinates) {
                if (coords.x < 0 || coords.x >= this.field.size) {
                    continue;
                }
                if (coords.y < 0 || coords.y >= this.field.size) {
                    continue;
                }
                let objInCoords = this.field.getObjectByCoordinates(coords);
                if (objInCoords != null) {
                    if (isIgnoreEnemy && !objInCoords.isImpenetrable)
                        continue;
                    if (!isIgnoreEnemy && (!objInCoords.isImpenetrable || objInCoords instanceof Enemy_1.default))
                        continue;
                }
                pathNodes.push(new PathNode_1.default(coords, node.getDistanceFromStart() + 1, node, to));
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
    exports.default = PathFinder;
});
define("GameObjects/DeadMan", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DeadMan {
        constructor(coords) {
            this.color = "blueviolet";
            this.isImpenetrable = false;
            this.coordinates = coords;
        }
    }
    exports.default = DeadMan;
});
define("GameObjects/Enemy", ["require", "exports", "Engine/PathFinder", "GlobalVariables", "GameObjects/DeadMan", "Engine/Game"], function (require, exports, PathFinder_1, GlobalVariables_2, DeadMan_1, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Enemy {
        constructor(coordinates, field) {
            this.isImpenetrable = true;
            this.color = "red";
            this.coordinates = coordinates;
            this.pathFinder = new PathFinder_1.default(field);
            this.field = field;
            this.guid = Math.floor(Math.random() * 1000);
        }
        calculatePath(toCoordinates, isIgnoreEnemy = true) {
            this.currentStep = 0;
            this.path = this.pathFinder.findPath(this.coordinates, toCoordinates, isIgnoreEnemy);
            let game = Game_1.default.Instance;
            if (this.path == null && game.active) {
                Game_1.default.Instance.endGame();
            }
        }
        step() {
            if (this.path == null) {
                clearInterval(this.interval);
                return;
            }
            let nextStepCoords = this.path[this.currentStep + 1];
            let nextObject = this.field.getObjectByCoordinates(this.path[this.currentStep + 1]);
            if (nextObject instanceof Enemy || nextObject instanceof DeadMan_1.default) {
                console.log("there is enemy");
                return false;
            }
            if (this.currentStep == this.path.length - 2) {
                clearInterval(this.interval);
                this.death();
                console.log("dead");
                return;
            }
            this.field.gameObjects.move(this.coordinates, nextStepCoords);
            this.coordinates = nextStepCoords;
            this.currentStep++;
            return true;
        }
        goTo(coords) {
            this.calculatePath(coords);
            this.interval = setInterval(this.everyInterval.bind(this), GlobalVariables_2.TickInMiliseconds);
        }
        follow(obj) {
            this.calculatePath(obj.coordinates);
            let oldCoordinates = obj.coordinates;
            this.interval = setInterval(() => {
                if (obj.coordinates.toString() != oldCoordinates.toString()) {
                    oldCoordinates = obj.coordinates;
                    this.calculatePath(obj.coordinates);
                }
                if (!this.step()) {
                    this.calculatePath(obj.coordinates, false);
                }
            }, GlobalVariables_2.TickInMiliseconds * 1.5);
        }
        kill() {
            clearInterval(this.interval);
            Game_1.default.Instance.field.deleteObjectByCoordinates(this.coordinates);
        }
        everyInterval() {
            console.log("moved");
            this.step();
        }
        death() {
            let deathCoords = this.coordinates;
            this.field.gameObjects.removeByCoordinates(this.coordinates);
            let body = new DeadMan_1.default(deathCoords);
            this.field.gameObjects.add(body);
        }
    }
    exports.default = Enemy;
});
define("Engine/Game", ["require", "exports", "GlobalVariables", "Engine/ControlManager", "GameObjects/Enemy", "GameObjects/Player", "Engine/MapCoordinates"], function (require, exports, GlobalVariables_3, ControlManager_1, Enemy_2, Player_1, MapCoordinates_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor() {
            this.active = false;
        }
        static get Instance() {
            return this._instance || (this._instance = new this());
        }
        start() {
            this.active = true;
            this.field.render();
            this.field.makeBoxForPlayer();
            // this.field.randomize();
            let startPoint = new MapCoordinates_4.default(0, 0);
            let endPoint = new MapCoordinates_4.default(this.field.size - 1, this.field.size - 1);
            for (let i = 0; i < this.field.size; i++) {
                this.field.deleteObjectByCoordinates(new MapCoordinates_4.default(i, 0));
                this.field.deleteObjectByCoordinates(new MapCoordinates_4.default(i, this.field.size - 1));
                this.field.deleteObjectByCoordinates(new MapCoordinates_4.default(this.field.size - 1, i));
                this.field.deleteObjectByCoordinates(new MapCoordinates_4.default(0, i));
            }
            let player = new Player_1.default(endPoint, this.field);
            this.field.gameObjects.add(player);
            let controlManager = new ControlManager_1.default(player);
            window.onkeydown = (e) => {
                controlManager.cacthKey(e);
            };
            let skip = 0;
            let curr = 0;
            let max = 1;
            this.enemyCreator = setInterval(() => {
                if (curr < max) {
                    let enemy = new Enemy_2.default(startPoint, this.field);
                    this.field.gameObjects.add(enemy);
                    enemy.follow(player);
                    curr++;
                }
                else {
                    if (skip > max) {
                        curr = 0;
                        max++;
                    }
                    skip++;
                }
            }, GlobalVariables_3.TickInMiliseconds * 10);
            setInterval(this.update.bind(this), 16);
        }
        update() {
            this.field.render();
        }
        endGame() {
            this.active = false;
            clearInterval(this.enemyCreator);
            for (let object of this.field.gameObjects.toArray()) {
                if (object instanceof Enemy_2.default) {
                    object.kill();
                }
            }
            this.endGameCallback();
        }
    }
    exports.default = Game;
});
define("EntryPoint", ["require", "exports", "Environment/Field", "Engine/Game", "GlobalVariables"], function (require, exports, Field_1, Game_2, GlobalVariables_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let field = new Field_1.default(GlobalVariables_4.FieldSize);
    let game = Game_2.default.Instance;
    game.field = field;
    game.endGameCallback = () => {
        alert("game ended");
    };
    game.start();
});
define("GameObjects/Track", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Track {
        constructor(coords) {
            this.color = "blueviolet";
            this.isImpenetrable = true;
            this.coordinates = coords;
        }
    }
    exports.default = Track;
});
define("Helpers/Sleep", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Sleep {
        static sleep(milliseconds) {
            let time = new Date().getTime() + milliseconds;
            while (new Date().getTime() <= time) {
            }
        }
    }
    exports.default = Sleep;
});
define("Helpers/StopWatch", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StopWatch {
        constructor() {
        }
        Start() {
            this.startDate = new Date();
        }
        end() {
            this.endDate = new Date();
            this.result = this.endDate.getTime() - this.startDate.getTime();
        }
        getResult() {
            return this.result;
        }
    }
    exports.default = StopWatch;
});
//# sourceMappingURL=script.js.map