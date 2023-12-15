import { Node } from './Helpers';

const generateMazeSetup = (boardColNum: number, boardRowNum: number, grid: Node[][]) => {
	const maze: [number, number][] = [];
	for (let i = 0; i < boardColNum; i++) {
		for (let j = 0; j < boardRowNum; j++) {
			maze.push([i, j]);
		}
	}

	return maze;
};

const recursiveBacktrackMazeAlgo = (startNode: Node, maze: [number, number][], grid: Node[][]) => {
	const visistedNodes = new Map<Node, [number, number]>();
	recursiveGeneration(startNode, maze, grid, visistedNodes);
};

const recursiveGeneration = (
	node: Node,
	maze: [number, number][],
	grid: Node[][],
	visistedNodes: Map<Node, [number, number]>
) => {
	visistedNodes.set(node, node.coordinate);
	node.isVisited = true;
	maze.push(node.coordinate);
	let neighbors: Node[] = getMazeNeighbors(node, grid);
	while (neighbors.length !== 0) {
		const randomIndex = randomSelection(neighbors.length);
		const randomlySelectedNeighbor = neighbors[randomIndex];

		neighbors = neighbors.filter((_, index) => !(index === randomIndex));

		if (visistedNodes.has(randomlySelectedNeighbor)) continue;

		randomlySelectedNeighbor.previousNode = node;

		connectTwoPathNode(node, randomlySelectedNeighbor, grid, maze, visistedNodes);
		recursiveGeneration(randomlySelectedNeighbor, maze, grid, visistedNodes);
	}
};

const connectTwoPathNode = (
	currentNode: Node,
	previousNode: Node,
	grid: Node[][],
	maze: [number, number][],
	visistedNodes: Map<Node, [number, number]>
) => {
	const [nodeX, nodeY] = currentNode.coordinate;
	const [newNodeX, newNodeY] = previousNode.coordinate;
	if (newNodeX - nodeX === -2) {
		//Moved Left
		grid[nodeX - 1][nodeY].isVisited = true;
		visistedNodes.set(grid[nodeX - 1][nodeY], grid[nodeX - 1][nodeY].coordinate);
		maze.push([nodeX - 1, nodeY]);
	} else if (newNodeX - nodeX === 2) {
		//Moved Right
		grid[nodeX + 1][nodeY].isVisited = true;
		visistedNodes.set(grid[nodeX + 1][nodeY], grid[nodeX + 1][nodeY].coordinate);
		maze.push([nodeX + 1, nodeY]);
	} else if (newNodeY - nodeY === -2) {
		//Moved Up
		grid[nodeX][nodeY - 1].isVisited = true;
		visistedNodes.set(grid[nodeX][nodeY - 1], grid[nodeX][nodeY - 1].coordinate);
		maze.push([nodeX, nodeY - 1]);
	} else if (newNodeY - nodeY === 2) {
		//Moved Down
		grid[nodeX][nodeY + 1].isVisited = true;
		visistedNodes.set(grid[nodeX][nodeY + 1], grid[nodeX][nodeY + 1].coordinate);
		maze.push([nodeX, nodeY + 1]);
	}
};

const randomSelection = (options: number) => {
	return Math.floor(Math.random() * options);
};

const getMazeNeighbors = (node: Node, grid: Node[][]) => {
	const neighbors: Node[] = [];
	const [row, col] = node.coordinate;
	if (row > 2) neighbors.push(grid[row - 2][col]);
	if (row < grid.length - 3) neighbors.push(grid[row + 2][col]);
	if (col > 2) neighbors.push(grid[row][col - 2]);
	if (col < grid[0].length - 3) neighbors.push(grid[row][col + 2]);
	return neighbors.filter((neighbor) => !neighbor.isVisited);
};

export { generateMazeSetup, recursiveBacktrackMazeAlgo };
