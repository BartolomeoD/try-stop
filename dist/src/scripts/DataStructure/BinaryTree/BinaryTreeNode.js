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
export default BinaryTreeNode;
//# sourceMappingURL=BinaryTreeNode.js.map