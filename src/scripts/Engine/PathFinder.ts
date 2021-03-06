import PathNode from "./PathNode";
import Field from "../Environment/Field";
import MapCoordinates from "./MapCoordinates";
import ArrayBinaryTree from "../DataStructure/ArrayBinaryTree/ArrayBinaryTree";
import Enemy from "../GameObjects/Enemy";

class PathFinder {
    private checkedNodes: ArrayBinaryTree<PathNode>;
    private nodesToCheck: ArrayBinaryTree<PathNode>;
    private field: Field;

    public constructor(field: Field) {
        this.field = field;
    }

    public getCheckedNodes() {
        return this.checkedNodes;
    }

    public findPath(from: MapCoordinates, to: MapCoordinates, isIgnoreEnemy: boolean = true) {
        let startNode = new PathNode(from, 0, null, to);

        this.nodesToCheck = new ArrayBinaryTree<PathNode>(startNode, (node1) => {
            return node1.getFullPath();
        });
        this.checkedNodes = new ArrayBinaryTree<PathNode>(null, (node1) => {
            return node1.getHeuristicDistanceToGoal();
        });

        while (!this.nodesToCheck.isEmpty()) {
            let currentNode = this.nodesToCheck.minimum().getValue()[0];

            if (currentNode.getCoordinates().toString() == to.toString())
                return this.getResultPath(currentNode);

            this.nodesToCheck.removeNodeElement(currentNode);
            this.checkedNodes.add(currentNode);


            for (let neighbourNode of this.getNeighbors(currentNode, to, isIgnoreEnemy)) {
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
        console.log("not found");
        return null;
    }

    public getNeighbors(node: PathNode, to: MapCoordinates, isIgnoreEnemy: boolean): PathNode[] {
        let pathNodesCoordinates: MapCoordinates[] = [];
        let nodeCoordinates = node.getCoordinates();

        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x, nodeCoordinates.y + 1));
        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x + 1, nodeCoordinates.y));
        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x, nodeCoordinates.y - 1));
        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x - 1, nodeCoordinates.y));

        let pathNodes: PathNode[] = [];

        for (let coords of pathNodesCoordinates) {
            if (coords.x < 0 || coords.x >= this.field.size) {
                continue;
            }
            if (coords.y < 0 || coords.y >= this.field.size) {
                continue;
            }
            let objInCoords = this.field.getObjectByCoordinates(coords);
            if (objInCoords != null) {
                if (isIgnoreEnemy && !objInCoords.isImpenetrable)
                    continue;

                if (!isIgnoreEnemy && (!objInCoords.isImpenetrable || objInCoords instanceof Enemy))
                    continue;
            }

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