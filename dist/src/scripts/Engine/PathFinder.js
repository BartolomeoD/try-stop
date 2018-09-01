import PathNode from "./PathNode";
import MapCoordinates from "./MapCoordinates";
import ArrayBinaryTree from "../DataStructure/ArrayBinaryTree/ArrayBinaryTree";
import Enemy from "../GameObjects/Enemy";
class PathFinder {
    constructor(field) {
        this.field = field;
    }
    getCheckedNodes() {
        return this.checkedNodes;
    }
    findPath(from, to, isIgnoreEnemy = true) {
        let startNode = new PathNode(from, 0, null, to);
        this.nodesToCheck = new ArrayBinaryTree(startNode, (node1) => {
            return node1.getFullPath();
        });
        this.checkedNodes = new ArrayBinaryTree(null, (node1) => {
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
                }
                else {
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
    getNeighbors(node, to, isIgnoreEnemy) {
        let pathNodesCoordinates = [];
        let nodeCoordinates = node.getCoordinates();
        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x, nodeCoordinates.y + 1));
        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x + 1, nodeCoordinates.y));
        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x, nodeCoordinates.y - 1));
        pathNodesCoordinates.push(new MapCoordinates(nodeCoordinates.x - 1, nodeCoordinates.y));
        let pathNodes = [];
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