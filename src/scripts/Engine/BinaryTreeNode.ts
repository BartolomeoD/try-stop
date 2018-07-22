class BinaryTreeNode<T> {
    private key: number;
    private value: T[];
    private parent: BinaryTreeNode<T>;
    private left: BinaryTreeNode<T>;
    private right: BinaryTreeNode<T>;

    public constructor(argument: T, parent: BinaryTreeNode<T>, key: number) {
        this.value = [argument];
        this.parent = parent;
        this.key = key;
    }

    public removeFromValue(arg: T) {
        let index = this.value.findIndex((value)=> {
            return value.toString() == arg.toString();
        });
        // let index = this.value.indexOf(arg);
        console.log(index);
        if (index != undefined)
            this.value.splice(index, 1);
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

export default BinaryTreeNode;