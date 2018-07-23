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
export default BinaryTreeNode;
//# sourceMappingURL=BinaryTreeNode.js.map