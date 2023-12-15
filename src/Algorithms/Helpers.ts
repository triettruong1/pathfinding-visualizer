export interface Node {
	coordinate: [number, number];
	distance: number;
	previousNode: Node | null;
	isWall: boolean;
	isVisited: boolean;
}

export type AlgoFunc = (board: Node[][], startNode: Node, endNode: Node) => Node[];

interface IQueue<T> {
	enqueue(item: T): void;
	dequeue(): T;
	size(): number;
}

export class Queue<T> implements IQueue<T> {
	private storage: T[] = [];

	constructor(private capacity: number = Infinity) {}

	enqueue(item: T): void {
		if (this.size() === this.capacity) {
			throw Error('Queue has reached max capacity, you cannot add more items');
		}
		this.storage.push(item);
	}
	dequeue(): T {
		return this.storage.shift()!;
	}
	size(): number {
		return this.storage.length;
	}
}

export function sortNodesByDistance(unvisitedNodes: Node[]) {
	unvisitedNodes.sort((nodeA: Node, nodeB: Node) => nodeA.distance - nodeB.distance);
}

export function getAllNodes(grid: Node[][]) {
	const nodes: Node[] = [];
	for (const row of grid) {
		for (const node of row) {
			nodes.push(node);
		}
	}
	return nodes;
}

export function updateUnvisitedNeighbors(node: Node, grid: Node[][]): void {
	const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
	for (const neighbor of unvisitedNeighbors) {
		neighbor.distance = node.distance + 1;
		neighbor.previousNode = node;
	}
}

export function getUnvisitedNeighbors(node: Node, grid: Node[][]) {
	const neighbors: Node[] = [];
	const [row, col] = node.coordinate;
	if (row > 0) neighbors.push(grid[row - 1][col]);
	if (col > 0) neighbors.push(grid[row][col - 1]);
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
	if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
	return neighbors.filter((neighbor) => !neighbor.isVisited);
}

// Backtracks from the finishNode to find the shortest path.
export function getNodesInShortestPathOrder(finishNode: Node) {
	const nodesInShortestPathOrder = [];
	let currentNode: Node = finishNode;
	while (currentNode !== null) {
		nodesInShortestPathOrder.unshift(currentNode);
		currentNode = currentNode.previousNode!;
	}
	return nodesInShortestPathOrder;
}
