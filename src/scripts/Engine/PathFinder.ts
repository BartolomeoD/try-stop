import PathNode from "./PathNode";
import Field from "../Environment/Field";
import MapCoordinates from "./MapCoordinates";
import Game from "./Game";
import Sleep from "../Helpers/Sleep";

class PathFinder {
    private checkedNodes: PathNode[];
    private nodesToCheck: PathNode[];
    private field: Field;
    private game: Game;

    public constructor(field: Field, game: Game) {
        this.field = field;
        this.game = game;
    }

    public getCheckedNodes() {
        return this.checkedNodes;
    }

    public findPath(from: MapCoordinates, to: MapCoordinates) {
        this.nodesToCheck = [];
        this.checkedNodes = [];

        let startNode = new PathNode(from, 0, null);

        this.nodesToCheck.push(startNode);

        let index = 0;


        while (this.nodesToCheck.length > 0) {
            let sortedNodes = this.nodesToCheck.sort((bigger, smaller) => {
                // console.log(bigger.getHeuristicDistanceToGoal().toString() + " "
                //     + smaller.getHeuristicDistanceToGoal().toString());
                if (bigger.getHeuristicDistanceTo(to) > smaller.getHeuristicDistanceTo(to))
                    return 1;
                if (bigger.getHeuristicDistanceTo(to) < smaller.getHeuristicDistanceTo(to))
                    return -1;
                return 0;
            });
            let currentNode = sortedNodes[0];

            // this.game.field.cells[currentNode.getCoordinates().y][currentNode.getCoordinates().x] = 3;
            // if (index > 20) {
            //     this.game.field.rerender();
            //     index = 0;
            // }

            index++;


            if (currentNode.getCoordinates().toString() == to.toString()) {
                console.log(currentNode);
                return this.getResultPath(currentNode);
            }

            this.nodesToCheck.splice(0, 1);
            this.checkedNodes.push(currentNode);

            for (let neighbourNode of this.getNeighbors(currentNode)) {

                if (this.checkedNodes.some((value) => {
                    // if (value.getCoordinates().toString() == neighbourNode.getCoordinates().toString()) {
                    //     console.log("true");
                    // }
                    return value.getCoordinates().toString() == neighbourNode.getCoordinates().toString();
                })) {
                    continue;
                }
                let processedNode = this.nodesToCheck.find((value) => {
                    return value.getCoordinates().toString() == neighbourNode.getCoordinates().toString();
                });

                if (processedNode == undefined)
                    this.nodesToCheck.push(neighbourNode);
                else {
                    if (processedNode.getDistanceFromStart() > neighbourNode.getDistanceFromStart()) {
                        processedNode.setCameFrom(currentNode);
                        processedNode.setDistanceFroStart(currentNode.getDistanceFromStart());
                    }
                }
            }
        }
        return null;
    }

    public getNeighbors(node: PathNode): PathNode[] {
        let pathNodesCoordinates: MapCoordinates[] = [];
        let nodeCoordinates = node.getCoordinates();

        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x + 1, nodeCoordinates.y));
        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x - 1, nodeCoordinates.y));
        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x, nodeCoordinates.y + 1));
        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x, nodeCoordinates.y - 1));

        let pathNodes: PathNode[] = [];

        for (let coords of pathNodesCoordinates) {
            if (coords.x < 0 || coords.x >= this.field.size) {
                continue;
            }
            if (coords.y < 0 || coords.y >= this.field.size) {
                continue;
            }

            if (this.field.cells[coords.y][coords.x] == 1)
                continue;

            pathNodes.push(
                new PathNode(coords, node.getDistanceFromStart() + 1, node)
            )
        }

        return pathNodes;
    }

    private getResultPath(node: PathNode): MapCoordinates[] {
        let result: MapCoordinates[] = [];
        let currentNode = node;
        while (currentNode != null) {
            result.push(currentNode.getCoordinates());
            currentNode = currentNode.getCamefrom();
        }
        result.reverse();
        return result;
    }
}

export default PathFinder;