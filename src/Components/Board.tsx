import React from "react";
import { dijkstra, getNodesInShortestPathOrder } from '../Algorithm/Dijkstra';
import { useState, useRef } from 'react';
import Grid from './Grid';



const START_POS: number[] = [5, 10];
const END_POS: number[] = [49, 10];
const BOARD_COL_NUM: number = 75;
const BOARD_ROW_NUM: number = 30;

export interface Node {
  coordinate: number[];
  distance: number;
  previousNode: Node | null;
  isWall: boolean;
  isVisited: boolean;
}

export const Board: React.FC = () => {
  const [isClicking, setIsClicking] = useState(false);
  const nodeRefs = useRef<(HTMLDivElement)[][]>([]);
  let board: Node[][] = [];

  const populateBoard = () => {
    for (let col = 0; col < BOARD_COL_NUM; col++) {
      const currentCol: Node[] = [];
      for (let row = 0; row < BOARD_ROW_NUM; row++) {
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

  const updateBoard = () => {
    for (let col = 0; col < BOARD_COL_NUM; col++) {
      for (let row = 0; row < BOARD_ROW_NUM; row++) {
        if (nodeRefs.current) {
          nodeRefs.current[col][row].className.includes('wall') ? board[col][row].isWall = true : ' ';
        }
      }
    }
  }

  const visualizeDijkstra = () => {
    const [START_X, START_Y] = START_POS
    const [END_X, END_Y] = END_POS;
    updateBoard();
    const startNode = board[START_X][START_Y];
    const endNode = board[END_X][END_Y];
    const visitedNodesInOrder: Node[] | undefined = dijkstra(board, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const animateDijkstra = (visitedNodesInOrder: Node[] | undefined, nodesInShortestPathOrder: Node[]) => {
    if (!visitedNodesInOrder) return console.log("error");
    for (let step = 0; step <= visitedNodesInOrder.length; step++) {
      if (step === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, step * 5)
        return;
      }
      setTimeout(() => {
        const { coordinate } = visitedNodesInOrder[step];
        const [node_X, node_Y] = coordinate;
        const nodeEle = nodeRefs.current[node_X][node_Y];
        nodeEle.className = 'grid visited';

      }, step * 5)
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder: Node[]) => {
    for (let step = 0; step < nodesInShortestPathOrder.length; step++) {
      setTimeout(() => {
        const { coordinate } = nodesInShortestPathOrder[step];
        const [node_X, node_Y] = coordinate;
        const nodeEle = nodeRefs.current[node_X][node_Y];
        console.log(nodeEle);
        nodeEle.className = 'grid shortest-path';
      }, 20 * step);
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

  return <div className='grid-container' onMouseDown={() => setIsClicking(true)} onMouseUp={() => setIsClicking(false)} onMouseLeave={() => setIsClicking(false)}>
    {board.map((nodeRow, rowIndex) => {
      return <div key={rowIndex}>
        {nodeRow.map((Node, colIndex) => {
          return <Grid ref={(element: HTMLDivElement) => {
            nodeRefs.current[rowIndex] = nodeRefs.current[rowIndex] || [];
            nodeRefs.current[rowIndex][colIndex] = element;
          }} coordinate={[rowIndex, colIndex]} isClicking={isClicking} {...isType(rowIndex, colIndex)} isWall={Node.isWall} />;
        })}
      </div>;
    })}
    <button onClick={visualizeDijkstra}>Animate</button>
  </div>;
}
