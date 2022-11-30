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
	//using the distance property as F cost
	startNode.distance = 0;
	startNode.isVisited = true;
	openSet.set(startNode, startNode.distance);
	visitedNodes.push(startNode);
	while (openSet.size !== 0) {
		const sortedOpenSet = new Map([...openSet.entries()].sort((a, b) => a[1] - b[1])); //Sort and create a copy of openSet
		const [currentSmallestFCostNode]: any = sortedOpenSet.keys();
		openSet.delete(currentSmallestFCostNode); //Remove node from openSet
		if (currentSmallestFCostNode === endNode) return visitedNodes;
		const neighbors: Node[] = getUnvisitedNeighbors(currentSmallestFCostNode, grid);
		updateUnvisitedNeighbors(currentSmallestFCostNode, grid);
		for (let neighbor of neighbors) {
			if (neighbor === endNode) return visitedNodes;
            if (neighbor.isWall) continue;
			const manhattanDistance = manDistance(neighbor, endNode);
			const fCost = neighbor.distance + manhattanDistance;
			if (openSet.has(neighbor) && openSet.get(neighbor)! < fCost) continue;
            else if (closedSet.has(neighbor) && closedSet.get(neighbor)! < fCost) continue;
			else {
                console.log(neighbor.distance);
                neighbor.isVisited = true;
				neighbor.distance = fCost;
                visitedNodes.push(neighbor);
				openSet.set(neighbor, fCost);
			}
		}
        closedSet.set(currentSmallestFCostNode, currentSmallestFCostNode.distance);
	}
    return visitedNodes;
}

const manDistance = (node: Node, endNode: Node) => {
	const [endX, endY] = endNode.coordinate;
	const [nodeX, nodeY] = node.coordinate;
	return Math.abs(nodeX - endX) + Math.abs(nodeY - endY);
};
