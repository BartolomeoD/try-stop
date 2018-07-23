class PathNode {
    constructor(coordinates, distanceFromStart, cameFrom, goal) {
        this.coordinates = coordinates;
        this.distanceFromStart = distanceFromStart;
        this.cameFrom = cameFrom;
        this.heuristicDistanceToGoal = this.getHeuristicDistanceTo(goal);
    }
    setCameFrom(cameFrom) {
        this.cameFrom = cameFrom;
    }
    setDistanceFromStart(distance) {
        this.distanceFromStart = distance;
    }
    getHeuristicDistanceToGoal() {
        return this.heuristicDistanceToGoal;
    }
    getHeuristicDistanceTo(coordinates) {
        let distanceToCoordinates = Math.abs(coordinates.x - this.coordinates.x) +
            Math.abs(coordinates.y - this.coordinates.y);
        return distanceToCoordinates;
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
    getFullPath() {
        return this.getHeuristicDistanceToGoal() + this.distanceFromStart;
    }
    toString() {
        return this.getCoordinates().toString() + " distanceFromStart " + this.distanceFromStart.toString();
    }
}
export default PathNode;
//# sourceMappingURL=PathNode.js.map