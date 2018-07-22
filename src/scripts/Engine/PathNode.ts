import MapCoordinates from "./MapCoordinates";

class PathNode {
    private distanceFromStart: number;
    private coordinates: MapCoordinates;
    private cameFrom: PathNode;
    public heuristicDistanceToGoal: number;

    constructor(coordinates: MapCoordinates, distanceFromStart: number,
                cameFrom: PathNode) {
        this.coordinates = coordinates;
        this.distanceFromStart = distanceFromStart;
        this.cameFrom = cameFrom;
    }

    public setCameFrom(cameFrom: PathNode) {
        this.cameFrom = cameFrom;
    }

    public setDistanceFroStart(distance: number) {
        this.distanceFromStart = distance;
    }

    public getHeuristicDistanceToGoal(): number {
        return this.heuristicDistanceToGoal;
    }

    public getHeuristicDistanceTo(coordinates: MapCoordinates): number {
        let distanceToCoordinates =
            Math.abs(coordinates.x - this.coordinates.x) +
            Math.abs(coordinates.y - this.coordinates.y);
        return this.distanceFromStart + distanceToCoordinates;
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
}

export default PathNode;