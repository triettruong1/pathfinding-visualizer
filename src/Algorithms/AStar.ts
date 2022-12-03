import { Node, getUnvisitedNeighbors, updateUnvisitedNeighbors } from './Helpers';
// G costs - how far away that node is from the starting Node
// H costs - how far away that node is from the end Node
// F costs = G cost + H cost
// Choose the node that has the lowest F cost first (mark visited
// If all neighbor nodes has same F cost, select the lowest H cost
// Update FGH costs as you visit nodes only if it is a better path with lower F cost
// End node has F cost = G cost

export default function AStar(grid: Node[][], startNode: Node, endNode: Node) {
	const visitedNodes: Node[] = [];
	const openSet = new Map<Node, number>();
	const closedSet = new Map<Node, number>();
	//using distance property as G cost
	startNode.distance = 0;
	startNode.isVisited = true;
	openSet.set(startNode, startNode.distance);
	visitedNodes.push(startNode);
	while (openSet.size !== 0) {
		const sortedOpenSet = new Map([...openSet.entries()].sort((a, b) => a[1] - b[1])); //Sort and create a copy of openSet
		const [currentSmallestFCostNode]: Iterable<Node> = sortedOpenSet.keys();
		openSet.delete(currentSmallestFCostNode); //Remove node from openSet
		if (currentSmallestFCostNode === endNode) return visitedNodes;
		const neighbors: Node[] = getUnvisitedNeighbors(currentSmallestFCostNode, grid);
		for (let neighbor of neighbors) {
			if (neighbor.isWall) continue;
            neighbor.previousNode = currentSmallestFCostNode;
            neighbor.distance = currentSmallestFCostNode.distance + 1;
            neighbor.isVisited = true;
			const HCost = manDistance(neighbor, endNode);
			const neighborFCost = neighbor.distance + HCost;
			if (openSet.has(neighbor) && openSet.get(neighbor)! < neighborFCost) continue;
			else if (closedSet.has(neighbor) && closedSet.get(neighbor)! < neighborFCost) continue;
			else {
				openSet.set(neighbor, neighborFCost);
			}
		}
        currentSmallestFCostNode.isVisited = true;
		visitedNodes.push(currentSmallestFCostNode);
		closedSet.set(currentSmallestFCostNode, currentSmallestFCostNode.distance);
	}
	return visitedNodes;
}

const manDistance = (node: Node, destinationNode: Node) => {
	const [endX, endY] = destinationNode.coordinate;
	const [nodeX, nodeY] = node.coordinate;
	return Math.abs(endX - nodeX) + Math.abs(endY - nodeY);
};
