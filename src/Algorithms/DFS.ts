import { getUnvisitedNeighbors, Node } from "./Helpers";

const DFS = (grid: Node[][], startNode: Node, endNode: Node) => {
	const nodeStack: Node[] = [];
	const visitedNodes: Node[] = [];
	nodeStack.unshift(startNode);
	startNode.isVisited = true;
	visitedNodes.push(startNode);

	while (nodeStack.length !== 0) {
		let currentNode: Node = nodeStack.shift()!;
        currentNode.isVisited = true;
        visitedNodes.push(currentNode);
		if (currentNode === endNode) return visitedNodes;
		let neighbors = getUnvisitedNeighbors(currentNode, grid);
		for (let neighbor of neighbors) {
			if (neighbor.isWall) continue;
            nodeStack.unshift(neighbor);
            neighbor.previousNode = currentNode;
		}
	}
	return visitedNodes;
}

export default DFS;
