class BinaryTreeNode<T> {
    private key: number;
    private value: T;
    private parent: BinaryTreeNode<T>;
    private left: BinaryTreeNode<T>;
    private right: BinaryTreeNode<T>;

    public constructor(argument: T, parent: BinaryTreeNode<T>, key: number) {
        this.value = argument;
        this.parent = parent;
        this.key = key;
    }

    public getParent(): BinaryTreeNode<T> {
        return this.parent;
    }

    public  getKey(): number {
        return this.key;
    }

    public setParent(parent: BinaryTreeNode<T>) {
        this.parent = parent;
    }

    public setLeft(argument: BinaryTreeNode<T>) {
        this.left = argument;
    }

    public setRight(argument: BinaryTreeNode<T>) {
        this.right = argument;
    }

    public getRight(): BinaryTreeNode<T> {
        return this.right;
    }

    public getLeft(): BinaryTreeNode<T> {
        return this.left;
    }

    public getValue(): T {
        return this.value;
    }

    public setValue(value: T) {
        this.value = value;
    }

    public setKey(value: number) {
        this.key = value;
    }

}

export default BinaryTreeNode;