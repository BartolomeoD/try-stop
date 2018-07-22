import BinaryTreeNode from "./BinaryTreeNode";

class BinaryTree<T> {
    public firstItem: BinaryTreeNode<T>;
    private comparableValue: (T: T) => number;

    public constructor(argument: T) {
        this.firstItem = new BinaryTreeNode<T>(argument, null);
    }

    public add(argument: T) {
        let parentNode: BinaryTreeNode<T> = this.firstItem;
        let argumentComparableValue = this.comparableValue(argument);
        while (true) {
            if (this.comparableValue(parentNode.getValue()) > argumentComparableValue) {
                if (parentNode.getLeft() == null) {
                    parentNode.setLeft(new BinaryTreeNode<T>(argument, parentNode));
                    break;
                }
                else {
                    parentNode = parentNode.getLeft();
                }
            }
            else {
                if (parentNode.getRight() == null) {
                    parentNode.setRight(new BinaryTreeNode<T>(argument, parentNode));
                    break;
                }
                else {
                    parentNode = parentNode.getRight();
                }
            }
        }
    }

    public setComparableValue(func: (T: T) => number) {
        this.comparableValue = func;
    }

    public minimum(): BinaryTreeNode<T> {
        return this.minimumOf(this.firstItem);
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

    private recursiveSearch(node: BinaryTreeNode<T>, key: number): BinaryTreeNode<T> {
        let nodeKey = this.comparableValue(node.getValue());
        if (node == null || nodeKey == key)
            return node;
        if (key < nodeKey)
            return this.recursiveSearch(node.getLeft(), key);
        else
            return this.recursiveSearch(node.getRight(), key);
    }

    public removeElement(arg: BinaryTreeNode<T>) {
        let argValue = this.comparableValue(arg.getValue());
        let parentNode = arg.getParent();
        if (arg.getLeft() == null && arg.getRight() == null) {
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

    public print() {
        let nodesArray: BinaryTreeNode<T>[] = [];
        nodesArray.push(this.firstItem);
        let consoleRow: string = "";
        while (nodesArray.length > 0) {
            consoleRow = "";
            let newNodesArray: BinaryTreeNode<T>[] = [];
            for (let i: number = 0; i < nodesArray.length; i++) {
                consoleRow += this.comparableValue(nodesArray[i].getValue()) + " ";
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

export default BinaryTree;