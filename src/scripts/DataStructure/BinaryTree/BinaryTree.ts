import BinaryTreeNode from "./BinaryTreeNode";

class BinaryTree<T> implements Iterable<BinaryTreeNode<T>> {
    public firstItem: BinaryTreeNode<T>;
    private comparableValue: (T: T) => number;

    public constructor(argument: T, func: (T: T) => number) {
        this.comparableValue = func;
        if (argument != null)
            this.firstItem = new BinaryTreeNode<T>(argument, null, this.comparableValue(argument));
    }

    public add(argument: T) {
        let argumentComparableValue = this.comparableValue(argument);
        if (this.firstItem == null || this.firstItem == undefined) {
            this.firstItem = new BinaryTreeNode<T>(argument, null, argumentComparableValue);
            return;
        }
        let parentNode: BinaryTreeNode<T> = this.firstItem;
        while (true) {
            if (parentNode.getKey() > argumentComparableValue) {
                if (parentNode.getLeft() == null) {
                    parentNode.setLeft(new BinaryTreeNode<T>(argument, parentNode, argumentComparableValue));
                    break;
                }
                else {
                    parentNode = parentNode.getLeft();
                }
            }
            else if (parentNode.getKey() < argumentComparableValue) {
                if (parentNode.getRight() == null) {
                    parentNode.setRight(new BinaryTreeNode<T>(argument, parentNode, argumentComparableValue));
                    break;
                }
                else {
                    parentNode = parentNode.getRight();
                }
            } else {
                throw "added value with exist key " + argumentComparableValue;
            }
        }
    }

    private arrayOfElements: T[];

    public toArray(): T[] {
        this.arrayOfElements = [];
        this.inOrder(this.firstItem);
        return this.arrayOfElements;
    }

    private inOrder(node: BinaryTreeNode<T>) {
        if (node != null && node != undefined) {
            this.inOrder(node.getLeft());
            this.arrayOfElements = this.arrayOfElements.concat(node.getValue());
            this.inOrder(node.getRight());
        }
    }

    public minimum(): BinaryTreeNode<T> {
        return this.minimumOf(this.firstItem);
    }

    public isEmpty(): boolean {
        return this.firstItem == null;
    }

    public minimumOf(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
        if (node.getLeft() == null)
            return node;
        return this.minimumOf(node.getLeft());
    }

    public next(node: BinaryTreeNode<T>) {
        if (node.getRight() != null)
            return this.minimumOf(node.getRight());
        let parent = node.getParent();
        while (parent != null && node == parent.getRight()) {
            node = parent;
            parent = node.getParent();
        }
        return parent;
    }

    public search(arg: T): BinaryTreeNode<T> {
        return this.recursiveSearch(this.firstItem, this.comparableValue(arg));
    }

    public searchItem(arg: T): T {
        let node = this.search(arg);
        if (node == null)
            return null;
        return node.getValue();
    }

    public searchByKey(key: number): T {
        let node = this.recursiveSearch(this.firstItem, key);
        if (node == null)
            return null;
        return node.getValue();
    }

    private recursiveSearch(node: BinaryTreeNode<T>, key: number): BinaryTreeNode<T> {
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


    public removeNode(arg: BinaryTreeNode<T>) {
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
        } else if (arg.getLeft() == null || arg.getRight() == null) {
            if (arg.getLeft() == null) {
                if (parentNode.getLeft() == arg) {
                    parentNode.setLeft(arg.getRight());
                } else {
                    parentNode.setRight(arg.getRight());
                }
                arg.getRight().setParent(parentNode);
            } else {
                if (parentNode.getLeft() == arg) {
                    parentNode.setLeft(arg.getLeft());
                } else {
                    parentNode.setRight(arg.getLeft());
                }
                arg.getLeft().setParent(parentNode);
            }
        } else {
            let successor = this.next(arg);
            arg.setValue(successor.getValue());
            arg.setKey(successor.getKey());
            if (successor.getParent().getLeft() == successor) {
                successor.getParent().setLeft(successor.getRight());
                if (successor.getRight() != null) {
                    successor.getRight().setParent(successor.getParent());
                }
            } else {
                successor.getParent().setRight(successor.getLeft());
                if (successor.getLeft() != null) {
                    successor.getRight().setParent(successor.getParent());
                }
            }
        }

    }

    public removeNodeElement(arg: T) {
        let node = this.search(arg);
        this.removeNode(node);
    }

    public print() {
        let nodesArray: BinaryTreeNode<T>[] = [];
        nodesArray.push(this.firstItem);
        let consoleRow: string = "";
        while (nodesArray.length > 0) {
            consoleRow = "";
            let newNodesArray: BinaryTreeNode<T>[] = [];
            for (let i: number = 0; i < nodesArray.length; i++) {
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
            next(): IteratorResult<BinaryTreeNode<T>> {
                if (node != null && node != undefined) {
                    node = this.next(node);
                    return {
                        done: false,
                        value: node
                    }
                } else {
                    return {
                        done: true,
                        value: null
                    }
                }
            }
        }
    }
}

export default BinaryTree;