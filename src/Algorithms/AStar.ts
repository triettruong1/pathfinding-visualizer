import { Node, getUnvisitedNeighbors } from './Helpers';
// G costs - how far away that node is from the starting Node
// H costs - how far away that node is from the end Node
// F costs = G cost + H cost
// Choose the node that has the lowest F cost first (mark visited
// If all neighbor nodes has same F cost, select the lowest H cost
// Update FGH costs as you visit nodes only if it is a better path with lower F cost
// End node has F cost = G cost

const AStar = (grid: Node[][], startNode: Node, endNode: Node): Node[] => {
	const visitedNodesInOrder: Node[] = [];
	const openSet = new Map<Node, number>();
	const closedSet = new Set<Node>();

	// Using distance property as G cost
	startNode.distance = 0;
	startNode.isVisited = true;
	openSet.set(startNode, startNode.distance);

	while (openSet.size !== 0) {
		const [currentNode, currentFCost] = getLowestFCostNode(openSet);

		if (currentNode === endNode) {
			// Found the shortest path from startNode to endNode
			return visitedNodesInOrder;
		}

		openSet.delete(currentNode);
		closedSet.add(currentNode);

		const neighbors: Node[] = getUnvisitedNeighbors(currentNode, grid);

		for (let neighbor of neighbors) {
			if (neighbor.isWall) {
				continue;
			}

			if (closedSet.has(neighbor)) {
				continue;
			}

			const tentativeGCost = currentNode.distance + 1;

			if (!openSet.has(neighbor) || tentativeGCost < neighbor.distance) {
				neighbor.previousNode = currentNode;
				neighbor.distance = tentativeGCost;
				neighbor.isVisited = true;

				const hCost = euclideanDistance(neighbor, endNode);
				const fCost = tentativeGCost + hCost;

				openSet.set(neighbor, fCost);
			}
		}

		visitedNodesInOrder.push(currentNode);
	}

	// There is no path from startNode to endNode
	return visitedNodesInOrder;
};

const getLowestFCostNode = (openSet: Map<Node, number>): [Node, number] => {
	let lowestFCost = Infinity;
	let lowestFCostNode: Node | null = null;

	for (let [node, fCost] of openSet) {
		if (fCost < lowestFCost) {
			lowestFCost = fCost;
			lowestFCostNode = node;
		}
	}

	if (lowestFCostNode === null) {
		throw new Error('openSet should not be empty');
	}

	return [lowestFCostNode, lowestFCost];
};

const euclideanDistance = (node: Node, destinationNode: Node): number => {
	const [endX, endY] = destinationNode.coordinate;
	const [nodeX, nodeY] = node.coordinate;
	return Math.sqrt((endX - nodeX) ** 2 + (endY - nodeY) ** 2);
};

export default AStar;
