import BinaryTreeNode from "./BinaryTreeNode";
class BinaryTree {
    constructor(argument, func) {
        this.comparableValue = func;
        if (argument != null)
            this.firstItem = new BinaryTreeNode(argument, null, this.comparableValue(argument));
    }
    add(argument) {
        let argumentComparableValue = this.comparableValue(argument);
        if (this.firstItem == null || this.firstItem == undefined) {
            this.firstItem = new BinaryTreeNode(argument, null, argumentComparableValue);
            return;
        }
        let parentNode = this.firstItem;
        while (true) {
            if (parentNode.getKey() > argumentComparableValue) {
                if (parentNode.getLeft() == null) {
                    parentNode.setLeft(new BinaryTreeNode(argument, parentNode, argumentComparableValue));
                    break;
                }
                else {
                    parentNode = parentNode.getLeft();
                }
            }
            else if (parentNode.getKey() < argumentComparableValue) {
                if (parentNode.getRight() == null) {
                    parentNode.setRight(new BinaryTreeNode(argument, parentNode, argumentComparableValue));
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
export default BinaryTree;
//# sourceMappingURL=BinaryTree.js.map