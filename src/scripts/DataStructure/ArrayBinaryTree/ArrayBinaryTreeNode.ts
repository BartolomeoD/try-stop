class ArrayBinaryTreeNode<T> {
    private key: number;
    private value: T[];
    private parent: ArrayBinaryTreeNode<T>;
    private left: ArrayBinaryTreeNode<T>;
    private right: ArrayBinaryTreeNode<T>;

    public constructor(argument: T, parent: ArrayBinaryTreeNode<T>, key: number) {
        this.value = [argument];
        this.parent = parent;
        this.key = key;
    }

    public removeFromValue(arg: T) {
        let index = this.value.findIndex((value)=> {
            return value.toString() == arg.toString();
        });
        if (index != undefined)
            this.value.splice(index, 1);
    }

    public getParent(): ArrayBinaryTreeNode<T> {
        return this.parent;
    }

    public  getKey(): number {
        return this.key;
    }

    public setParent(parent: ArrayBinaryTreeNode<T>) {
        this.parent = parent;
    }

    public setLeft(argument: ArrayBinaryTreeNode<T>) {
        this.left = argument;
    }

    public setRight(argument: ArrayBinaryTreeNode<T>) {
        this.right = argument;
    }

    public getRight(): ArrayBinaryTreeNode<T> {
        return this.right;
    }

    public getLeft(): ArrayBinaryTreeNode<T> {
        return this.left;
    }

    public getValue(): T[] {
        return this.value;
    }

    public setValue(value: T[]) {
        this.value = value;
    }

    public setKey(value: number) {
        this.key = value;
    }

    public addValue(arg: T) {
        this.value.push(arg);
    }
}

export default ArrayBinaryTreeNode;