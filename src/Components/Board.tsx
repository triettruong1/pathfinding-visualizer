import React, { useEffect } from 'react';
import './Board.css';
import { getNodesInShortestPathOrder } from '../Algorithm/Helpers';
import dijkstra from '../Algorithm/Dijkstra';
import BFS from '../Algorithm/BFS';
import { useState, useRef } from 'react';
import Grid from './Grid';

interface BoardProps {
	shouldReset: boolean;
	shouldAnimate: boolean;
	algo: string;
}

const START_POS: number[] = [5, 10];
const END_POS: number[] = [49, 10];
const BOARD_COL_NUM: number = 76;
const BOARD_ROW_NUM: number = 30;

export interface Node {
	coordinate: number[];
	distance: number;
	previousNode: Node | null;
	isWall: boolean;
	isVisited: boolean;
}

export const Board: React.FC<BoardProps> = ({
	shouldReset,
	shouldAnimate,
	algo,
}) => {
	const [isClicking, updateMouseClick] = useState(false);
	const nodeRefs = useRef<HTMLDivElement[][]>([]);
	const [board, setBoard] = useState<Node[][]>([]);

	const populateBoard = () => {
		const newBoard: Node[][] = [];
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
			newBoard.push(currentCol);
		}
		return newBoard;
	};

	const resetBoard = () => {
		updateBoard();
		for (let col = 0; col < BOARD_COL_NUM; col++) {
			for (let row = 0; row < BOARD_ROW_NUM; row++) {
				let node = nodeRefs.current[col][row];
				if (node.classList.contains('visited'))
					node.classList.remove('visited');
				if (node.classList.contains('wall'))
					node.classList.remove('wall');
				if (node.classList.contains('shortest-path'))
					node.classList.remove('shortest-path');
			}
		}
		setBoard(populateBoard());
	};

	useEffect(() => {
		if (shouldAnimate) {
			startAlgo(algo);
		}
	}, [shouldAnimate]);

	useEffect(() => {
		if (shouldReset) {
			resetBoard();
		}
	}, [shouldReset]);

	useEffect(() => {
		setBoard(populateBoard());
	}, []);

	const updateBoard = () => {
		for (let col = 0; col < BOARD_COL_NUM; col++) {
			for (let row = 0; row < BOARD_ROW_NUM; row++) {
				if (nodeRefs.current) {
					nodeRefs.current[col][row].className.includes('wall')
						? (board[col][row].isWall = true)
						: ' ';
				}
			}
		}
	};

	const startAlgo = (algo: string) => {
		const [START_X, START_Y] = START_POS;
		const [END_X, END_Y] = END_POS;
		const startNode = board[START_X][START_Y];
		const endNode = board[END_X][END_Y];
		switch (algo) {
			case 'BFS':
				visualizeAlgo(BFS, startNode, endNode);
				break;
			case 'Dijkstra':
				visualizeAlgo(dijkstra, startNode, endNode);
			default:
				console.log('error');
		}
	};

	const visualizeAlgo = (
		algoFunction: (
			board: Node[][],
			startNode: Node,
			endNode: Node
		) => Node[],
		startNode: Node,
		endNode: Node
	) => {
		updateBoard();
		const visitedNodes: Node[] = algoFunction(board, startNode, endNode);
		const shortestPathOfNodes: Node[] =
			getNodesInShortestPathOrder(endNode);
		animateAlgo(visitedNodes, shortestPathOfNodes);
	};

	const animateAlgo = (
		visitedNodesInOrder: Node[],
		nodesInShortestPathOrder: Node[]
	) => {
		if (!visitedNodesInOrder) return console.log('error');
		for (let step = 0; step <= visitedNodesInOrder.length; step++) {
			if (step === visitedNodesInOrder.length) {
				setTimeout(() => {
					animateShortestPath(nodesInShortestPathOrder);
				}, step * 5);
				return;
			}
			setTimeout(() => {
				const { coordinate } = visitedNodesInOrder[step];
				const [node_X, node_Y] = coordinate;
				const nodeEle = nodeRefs.current[node_X][node_Y];
				nodeEle.className = nodeEle.className.concat(' visited');
			}, step * 5);
		}
	};

	const animateShortestPath = (nodesInShortestPathOrder: Node[]) => {
		for (let step = 0; step < nodesInShortestPathOrder.length; step++) {
			setTimeout(() => {
				const { coordinate } = nodesInShortestPathOrder[step];
				const [node_X, node_Y] = coordinate;
				const nodeEle = nodeRefs.current[node_X][node_Y];
				nodeEle.className = nodeEle.className.concat(' shortest-path');
			}, 25 * step);
		}
	};

	const isType = (x: number, y: number) => {
		const [START_X, START_Y] = START_POS;
		const [END_X, END_Y] = END_POS;
		let type = { isEnd: false, isStart: false };
		START_X == x && START_Y == y ? (type.isStart = true) : '';
		END_X == x && END_Y == y ? (type.isEnd = true) : '';
		return type;
	};

	return (
		<div
			className='grid-container'
			onMouseDown={() => updateMouseClick(true)}
			onMouseUp={() => {
				updateMouseClick(false);
				updateBoard();
			}}
			onMouseLeave={() => updateMouseClick(false)}>
			{board.map((nodeRow, rowIndex) => {
				return (
					<div key={rowIndex}>
						{nodeRow.map((Node, colIndex) => {
							return (
								<Grid
									ref={(element: HTMLDivElement) => {
										nodeRefs.current[rowIndex] =
											nodeRefs.current[rowIndex] || [];
										nodeRefs.current[rowIndex][colIndex] =
											element;
									}}
									coordinate={[rowIndex, colIndex]}
									isClicking={isClicking}
									{...isType(rowIndex, colIndex)}
									isWall={Node.isWall}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};
