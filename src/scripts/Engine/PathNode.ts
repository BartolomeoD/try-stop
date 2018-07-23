import MapCoordinates from "./MapCoordinates";

class PathNode {
    private distanceFromStart: number;
    private coordinates: MapCoordinates;
    private cameFrom: PathNode;
    private heuristicDistanceToGoal: number;

    constructor(coordinates: MapCoordinates, distanceFromStart: number,
                cameFrom: PathNode, goal: MapCoordinates) {
        this.coordinates = coordinates;
        this.distanceFromStart = distanceFromStart;
        this.cameFrom = cameFrom;
        this.heuristicDistanceToGoal = this.getHeuristicDistanceTo(goal);
    }

    public setCameFrom(cameFrom: PathNode) {
        this.cameFrom = cameFrom;
    }

    public setDistanceFromStart(distance: number) {
        this.distanceFromStart = distance;
    }

    public getHeuristicDistanceToGoal(): number {
        return this.heuristicDistanceToGoal;
    }

    private getHeuristicDistanceTo(coordinates: MapCoordinates): number {
        let distanceToCoordinates =
            Math.abs(coordinates.x - this.coordinates.x) +
            Math.abs(coordinates.y - this.coordinates.y);
        return distanceToCoordinates;
    }

    public getCoordinates(): MapCoordinates {
        return this.coordinates;
    }

    public getDistanceFromStart(): number {
        return this.distanceFromStart;
    }

    public getCamefrom(): PathNode {
        return this.cameFrom;
    }

    public getFullPath() {
        return this.getHeuristicDistanceToGoal() + this.distanceFromStart;
    }

    public toString() {
        return this.getCoordinates().toString() + " distanceFromStart " + this.distanceFromStart.toString();
    }
}

export default PathNode;