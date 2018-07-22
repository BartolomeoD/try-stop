class PathNode {
    constructor(coordinates, distanceFromStart, cameFrom) {
        this.coordinates = coordinates;
        this.distanceFromStart = distanceFromStart;
        this.cameFrom = cameFrom;
    }
    setCameFrom(cameFrom) {
        this.cameFrom = cameFrom;
    }
    setDistanceFroStart(distance) {
        this.distanceFromStart = distance;
    }
    getHeuristicDistanceToGoal() {
        return this.heuristicDistanceToGoal;
    }
    getHeuristicDistanceTo(coordinates) {
        let distanceToCoordinates = Math.abs(coordinates.x - this.coordinates.x) +
            Math.abs(coordinates.y - this.coordinates.y);
        return this.distanceFromStart + distanceToCoordinates;
    }
    getCoordinates() {
        return this.coordinates;
    }
    getDistanceFromStart() {
        return this.distanceFromStart;
    }
    getCamefrom() {
        return this.cameFrom;
    }
}
export default PathNode;
//# sourceMappingURL=PathNode.js.map