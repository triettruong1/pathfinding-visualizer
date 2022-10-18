import { Node } from '../App';

export function dijkstra(grid: Node[][], startNode: Node, finishNode: Node) {
    const visitedNodes: Node[] = [];

    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if (closestNode) {
            if (closestNode.isWall) continue;
            if (closestNode.distance === 8888) return visitedNodes;
            closestNode.isVisited = true;
            visitedNodes.push(closestNode);
            updateUnvisitedNeighbors(closestNode, grid);
        }

        if (closestNode === finishNode) return visitedNodes;

    }
}

function sortNodesByDistance(unvisitedNodes: Node[]) {
    unvisitedNodes.sort((nodeA: Node, nodeB: Node) => nodeA.distance - nodeB.distance);
}

function getAllNodes(grid: Node[][]) {
    const nodes: Node[] = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function updateUnvisitedNeighbors(node: Node, grid: Node[][]) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbors(node: Node, grid: Node[][]) {
    const neighbors: Node[] = [];
    const [row, col] = node.coordinate;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode: Node) {
    const nodesInShortestPathOrder = [];
    let currentNode: Node | null = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}