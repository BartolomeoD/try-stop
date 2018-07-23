import PathNode from "./PathNode";
import MapCoordinates from "./MapCoordinates";
import BinaryTree from "./BinaryTree";
class PathFinder {
    constructor(field, game) {
        this.field = field;
        this.game = game;
    }
    getCheckedNodes() {
        return this.checkedNodes;
    }
    findPath(from, to) {
        let startNode = new PathNode(from, 0, null, to);
        this.nodesToCheck = new BinaryTree(startNode, (node1) => {
            return node1.getFullPath();
        });
        this.checkedNodes = new BinaryTree(null, (node1) => {
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
                }
                else {
                    if (processedNode.getDistanceFromStart() > neighbourNode.getDistanceFromStart()) {
                        processedNode.setCameFrom(currentNode);
                        processedNode.setDistanceFromStart(currentNode.getDistanceFromStart());
                    }
                }
            }
        }
        return null;
    }
    getNeighbors(node, to) {
        let pathNodesCoordinates = [];
        let nodeCoordinates = node.getCoordinates();
        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x + 1, nodeCoordinates.y));
        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x - 1, nodeCoordinates.y));
        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x, nodeCoordinates.y + 1));
        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x, nodeCoordinates.y - 1));
        let pathNodes = [];
        for (let coords of pathNodesCoordinates) {
            if (coords.x < 0 || coords.x >= this.field.size) {
                continue;
            }
            if (coords.y < 0 || coords.y >= this.field.size) {
                continue;
            }
            if (this.field.cells[coords.y][coords.x] == 1)
                continue;
            pathNodes.push(new PathNode(coords, node.getDistanceFromStart() + 1, node, to));
        }
        return pathNodes;
    }
    getResultPath(node) {
        let result = [];
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
//# sourceMappingURL=PathFinder.js.map