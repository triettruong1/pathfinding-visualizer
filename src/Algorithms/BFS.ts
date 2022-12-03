import { Node } from './Helpers';
import { updateUnvisitedNeighbors, Queue } from './Helpers';

/*
1. Add Start Node
2. Add all unvisited neighbors to queue
3. Visit neighbors - newNode
4. Check all unvisited neighbors of newNode  
5. Repeat
*/

export default function BFS(grid: Node[][], startNode: Node, endNode: Node) {
	const nodeQueue = new Queue<Node>();
	const visitedNodes: Node[] = [];
	nodeQueue.enqueue(startNode);
	startNode.isVisited = true;
	visitedNodes.push(startNode);

	while (nodeQueue.size() !== 0) {
		let currentNode: Node = nodeQueue.dequeue();
		let neighbors = getAllNeighbors(currentNode, grid);
		for (let neighbor of neighbors) {
			if (neighbor === endNode) return visitedNodes;
			if (neighbor.isWall) continue;
			if (!neighbor.isVisited) {
				nodeQueue.enqueue(neighbor);
				neighbor.isVisited = true;
				visitedNodes.push(neighbor);
			}
			updateUnvisitedNeighbors(neighbor, grid);
		}
	}
	return visitedNodes;
}

function getAllNeighbors(node: Node, grid: Node[][]) {
	const neighbors: Node[] = [];
	const [row, col] = node.coordinate;
	if (row > 0) neighbors.push(grid[row - 1][col]);
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
	if (col > 0) neighbors.push(grid[row][col - 1]);
	if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
	return neighbors.filter((neighbor) => !neighbor.isVisited);
}
