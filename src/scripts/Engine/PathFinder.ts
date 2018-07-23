import PathNode from "./PathNode";
import Field from "../Environment/Field";
import MapCoordinates from "./MapCoordinates";
import Game from "./Game";
import BinaryTree from "./BinaryTree";

class PathFinder {
    private checkedNodes: BinaryTree<PathNode>;
    private nodesToCheck: BinaryTree<PathNode>;
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
        let startNode = new PathNode(from, 0, null, to);

        this.nodesToCheck = new BinaryTree<PathNode>(startNode, (node1) => {
            return node1.getFullPath();
        });
        this.checkedNodes = new BinaryTree<PathNode>(null, (node1) => {
            return node1.getHeuristicDistanceToGoal();
        });

        while (!this.nodesToCheck.isEmpty()) {
            let currentNode = this.nodesToCheck.minimum().getValue()[0];

            if (currentNode.getCoordinates().toString() == to.toString()) {
                console.log("path find");
                return this.getResultPath(currentNode);
            }

            this.nodesToCheck.removeNodeElement(currentNode);
            this.checkedNodes.add(currentNode);


            for (let neighbourNode of this.getNeighbors(currentNode, to)) {
                if (this.checkedNodes.searchItem(neighbourNode, (value) => {
                    return value.getCoordinates().toString() == neighbourNode.getCoordinates().toString();
                })) {
                    continue;
                }

                let processedNode = this.nodesToCheck.searchItem(neighbourNode, (value) => {
                    return value.getCoordinates().toString() == neighbourNode.getCoordinates().toString();
                });

                if (processedNode == null) {
                    this.nodesToCheck.add(neighbourNode);
                } else {
                    if (processedNode.getDistanceFromStart() > neighbourNode.getDistanceFromStart()) {
                        processedNode.setCameFrom(currentNode);
                        processedNode.setDistanceFromStart(currentNode.getDistanceFromStart());
                    }
                }
            }
        }
        return null;
    }

    public getNeighbors(node: PathNode, to: MapCoordinates): PathNode[] {
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
                new PathNode(coords, node.getDistanceFromStart() + 1, node, to)
            );
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