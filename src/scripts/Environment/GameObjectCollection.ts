import GameObject from "../GameObjects/GameObject";
import MapCoordinates from "../Engine/MapCoordinates";
import BinaryTree from "../DataStructure/BinaryTree/BinaryTree";

class GameObjectCollection {
    private array: GameObject[];
    private fieldSize: number;

    constructor(fielSize: number) {
        this.array = [];
        this.fieldSize = fielSize;
    }

    public getObject(coords: MapCoordinates): GameObject {
        let item = this.array[coords.x + coords.y * this.fieldSize];
        if (item == undefined)
            return null;
        return item;
    }

    public add(gameObject: GameObject) {
        this.array[gameObject.coordinates.x + gameObject.coordinates.y *this.fieldSize] = gameObject;
    }

    public removeByCoordinates(coords: MapCoordinates): void {
        this.array[coords.x + coords.y * this.fieldSize] = undefined;
    }

    public move(from: MapCoordinates, to: MapCoordinates) {
        this.array[to.x + to.y * this.fieldSize] = this.array[from.x + from.y * this.fieldSize];
        this.removeByCoordinates(from);
    }

    public toArray() : GameObject[] {
        return this.array;
    }
}

export default GameObjectCollection;