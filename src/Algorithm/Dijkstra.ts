import { Node } from './Helpers';
import { getAllNodes, sortNodesByDistance, updateUnvisitedNeighbors } from './Helpers';

export default function dijkstra(grid: Node[][], startNode: Node, finishNode: Node) {
    const visitedNodes: Node[] = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift()!;
        if (closestNode.isWall) continue;
        if (closestNode.distance === 8888) return visitedNodes;
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);
        updateUnvisitedNeighbors(closestNode, grid);

        if (closestNode === finishNode) return visitedNodes;
    }
    return visitedNodes;
}
