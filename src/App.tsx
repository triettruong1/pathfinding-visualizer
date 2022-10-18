import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { dijkstra, getNodesInShortestPathOrder } from './Algorithm/Dijkstra';
import './App.css';
import Grid from './Components/Grid';

const START_POS: number[] = [5, 10];
const END_POS: number[] = [15, 10];

export interface Node {
  coordinate: number[];
  distance: number;
  previousNode: Node | null;
  isWall: boolean;
  isVisited: boolean;
}

const App: React.FC = () => {
  const [isClicking, setIsClicking] = useState(false);
  const nodeRefs = useRef<(HTMLDivElement)[][]>([]);
  let board: Node[][] = [];

  const populateBoard = () => {
    for (let col = 0; col < 25; col++) {
      const currentCol: Node[] = [];
      for (let row = 0; row < 25; row++) {
        currentCol.push({
          coordinate: [col, row],
          distance: 8888,
          previousNode: null,
          isWall: false,
          isVisited: false,
        });
      }
      board.push(currentCol);
    }
  };


  populateBoard();

  const visualizeDijkstra = () => {
    const [START_X, START_Y] = START_POS
    const [END_X, END_Y] = END_POS;
    const startNode = board[START_X][START_Y];
    const endNode = board[END_X][END_Y];
    const visitedNodesInOrder: Node[] | undefined = dijkstra(board, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const animateDijkstra = (visitedNodesInOrder: Node[] | undefined, nodesInShortestPathOrder: Node[]) => {
    if (!visitedNodesInOrder) return console.log("error");
    for (let step = 0; step < visitedNodesInOrder.length; step++) {
      const element = visitedNodesInOrder[step];
      if (step === visitedNodesInOrder.length) return;
      setTimeout(() => {
        const node = visitedNodesInOrder[step];
        const [node_X, node_Y] = node.coordinate;
        const nodeEle = nodeRefs.current[node_X][node_Y];
        nodeEle.className = 'grid visited';

      }, step * 10)
    }
  }

  const isType = (x: number, y: number) => {
    const [START_X, START_Y] = START_POS;
    const [END_X, END_Y] = END_POS;
    let type = { isEnd: false, isStart: false };
    START_X == x && START_Y == y ? (type.isStart = true) : '';
    END_X == x && END_Y == y ? (type.isEnd = true) : '';
    return type;
  };

  return (
    <main className='App'>
      <div
        className='grid-container'
        onMouseDown={() => setIsClicking(true)}
        onMouseUp={() => setIsClicking(false)}
        onMouseLeave={() => setIsClicking(false)}>
        {board.map((nodeRow, rowIndex) => {
          return (
            <div key={rowIndex}>
              {nodeRow.map((Node, colIndex) => {
                return (
                  <Grid
                    ref={(element: HTMLDivElement) => {
                      nodeRefs.current[colIndex] = nodeRefs.current[colIndex] || [];
                      nodeRefs.current[colIndex][rowIndex] = element;
                    }}
                    coordinate={[rowIndex, colIndex]}
                    isClicking={isClicking}
                    {...isType(rowIndex, colIndex)}
                  />
                );
              })}
            </div>
          );
        })}
        <button onClick={visualizeDijkstra}>Animate</button>
      </div>
    </main>
  );
};

export default App;
