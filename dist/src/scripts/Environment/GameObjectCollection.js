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
export default GameObjectCollection;
//# sourceMappingURL=GameObjectCollection.js.map