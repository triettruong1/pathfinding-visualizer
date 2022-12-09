import { useEffect, useState, useRef } from 'react';
import './Board.css';
import { getNodesInShortestPathOrder, Node } from '../Algorithms/Helpers';
import { generateMazeSetup, recursiveBacktrackMazeAlgo } from '../Algorithms/MazeGenerations';
import dijkstra from '../Algorithms/Dijkstra';
import BFS from '../Algorithms/BFS';
import AStar from '../Algorithms/AStar';
import Grid from './Grid';
import Start from './Start';
import End from './End';
import DFS from '../Algorithms/DFS';

interface BoardProps {
	animateReceiverCreator: (handle: (algo: string) => void) => void;
	resetReceiverCreator: (handle: () => void) => void;
	resetPathReceiverCreator: (handle: () => void) => void;
	generateMazeReceiverCreator: (handle: () => void) => void;
}

const BOARD_COL_NUM: number = 78;
const BOARD_ROW_NUM: number = 35;

export const Board: React.FC<BoardProps> = ({
	animateReceiverCreator,
	resetReceiverCreator,
	resetPathReceiverCreator,
	generateMazeReceiverCreator,
}) => {
	const [board, setBoard] = useState<Node[][]>([]);
	const [startPos, setStartPos] = useState<[number, number]>([35, 10]);
	const [endPos, setEndPos] = useState<[number, number]>([50, 10]);
	const [isClicking, updateMouseClick] = useState(false);
	const nodeRefs = useRef<HTMLDivElement[][]>([]);

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
		for (let col = 0; col < BOARD_COL_NUM; col++) {
			for (let row = 0; row < BOARD_ROW_NUM; row++) {
				let node = nodeRefs.current[col][row];
				if (node.classList.contains('visited')) node.classList.remove('visited');
				if (node.classList.contains('wall')) node.classList.remove('wall');
				if (node.classList.contains('shortest-path'))
					node.classList.remove('shortest-path');
			}
		}
		setBoard(populateBoard());
	};

	const resetPath = () => {
		for (let col = 0; col < BOARD_COL_NUM; col++) {
			for (let row = 0; row < BOARD_ROW_NUM; row++) {
				let node = nodeRefs.current[col][row];
				if (node.classList.contains('visited')) {
					node.classList.remove('visited');
				}
				if (node.classList.contains('shortest-path'))
					node.classList.remove('shortest-path');
				board[col][row].isVisited = false;
			}
		}
		setBoard([...board]);
	};

	//update wall state of grid
	const updateBoardWallState = () => {
		for (let col = 0; col < BOARD_COL_NUM; col++) {
			for (let row = 0; row < BOARD_ROW_NUM; row++) {
				nodeRefs.current[col][row].className.includes('wall')
					? (board[col][row].isWall = true)
					: ' ';
			}
		}
	};

	useEffect(() => {
		setBoard(populateBoard());
	}, []);

	const handleChangeStartPos = (coordinate: [number, number]) => {
		setStartPos(coordinate);
	};
	const handleChangeEndPos = (coordinate: [number, number]) => {
		setEndPos(coordinate);
	};

	const startAlgo = (algo: string) => {
		const [START_X, START_Y] = startPos;
		const [END_X, END_Y] = endPos;
		const startNode = board[START_X][START_Y];
		const endNode = board[END_X][END_Y];
		switch (algo) {
			case 'BFS':
				visualizeAlgo(BFS, startNode, endNode);
				break;
            case 'DFS':
                visualizeAlgo(DFS, startNode, endNode);
                break;
			case 'Dijkstra':
				visualizeAlgo(dijkstra, startNode, endNode);
				break;
			case 'A-Star':
				visualizeAlgo(AStar, startNode, endNode);
				break;
			default:
				console.log('error');
		}
	};

	function visualizeAlgo(
		algoFunction: (board: Node[][], startNode: Node, endNode: Node) => Node[],
		startNode: Node,
		endNode: Node
	) {
		updateBoardWallState();
		const visitedNodesInOrder: Node[] = algoFunction(board, startNode, endNode);
		const shortestPathOfNodes: Node[] = getNodesInShortestPathOrder(endNode);
        console.log(shortestPathOfNodes);
		animatePath(visitedNodesInOrder, shortestPathOfNodes);
	}

	const animatePath = (visitedNodesInOrder: Node[], nodesInShortestPathOrder: Node[]) => {
		if (!visitedNodesInOrder) return console.log('error');
		for (let step = 0; step <= visitedNodesInOrder.length; step++) {
			if (step === visitedNodesInOrder.length) {
				setTimeout(() => {
					animateShortestPath(nodesInShortestPathOrder);
				}, step * 15);
				return;
			}
			setTimeout(() => {
				const { coordinate } = visitedNodesInOrder[step];
				const [node_X, node_Y] = coordinate;
				const nodeEle = nodeRefs.current[node_X][node_Y];
				nodeEle.className = nodeEle.className.concat(' visited');
			}, step * 15);
		}
	};

	const animateShortestPath = (nodesInShortestPathOrder: Node[]) => {
		for (let step = 0; step < nodesInShortestPathOrder.length; step++) {
			setTimeout(() => {
				const { coordinate } = nodesInShortestPathOrder[step];
				const [node_X, node_Y] = coordinate;
				const nodeEle = nodeRefs.current[node_X][node_Y];
				nodeEle.className = nodeEle.className.concat(' shortest-path');
			}, 10 * step);
		}
	};

	const drawMaze = () => {
		const startNode = board[1][1];
		const mazeSetup = generateMazeSetup(BOARD_COL_NUM, BOARD_ROW_NUM, board);
        const maze: [number, number][] = [];
        recursiveBacktrackMazeAlgo(startNode, maze, board);
		let step = 0;
		while (mazeSetup.length !== 0) {
			const [nodeX, nodeY] = mazeSetup.shift()!;
			setTimeout(() => {
				if (
					!nodeRefs.current[nodeX][nodeY].classList.contains('wall') &&
				    !!!nodeRefs.current[nodeX][nodeY].innerHTML
				) {
					nodeRefs.current[nodeX][nodeY].classList.add('wall');
				}
			}, step++ * 2);
		}
        while (maze.length !== 0) {
            const [nodeX, nodeY] = maze.shift()!;
            setTimeout(() => {
                board[nodeX][nodeY].isVisited = false;
                nodeRefs.current[nodeX][nodeY].classList.remove('wall');
            }, step++ * 2)
        }
	};

	animateReceiverCreator(startAlgo);
	resetReceiverCreator(resetBoard);
	resetPathReceiverCreator(resetPath);
	generateMazeReceiverCreator(drawMaze);

	const instantGeneratePath = () => {};

	const isType = (x: number, y: number) => {
		const [START_X, START_Y] = startPos;
		const [END_X, END_Y] = endPos;
		let type = '';
		START_X == x && START_Y == y ? (type = 'isStart') : null;
		END_X == x && END_Y == y ? (type = 'isEnd') : null;
		board[x][y].isWall ? (type = 'isWall') : null;
		return type;
	};

	const generateGridComponent = (x: number, y: number) => {
		const componentType = isType(x, y);
		if (componentType === 'isStart') {
			return (
				<Grid
					ref={(element: HTMLDivElement) => {
						nodeRefs.current[x] = nodeRefs.current[x] || [];
						nodeRefs.current[x][y] = element;
					}}
					coordinate={[x, y]}
					className='grid'
					isClicking={isClicking}
					updateMouseClick={updateMouseClick}>
					<Start />
				</Grid>
			);
		} else if (componentType === 'isEnd') {
			return (
				<Grid
					ref={(element: HTMLDivElement) => {
						nodeRefs.current[x] = nodeRefs.current[x] || [];
						nodeRefs.current[x][y] = element;
					}}
					coordinate={[x, y]}
					isClicking={isClicking}
					updateMouseClick={updateMouseClick}
					className='grid'>
					<End />
				</Grid>
			);
		} else if (componentType === 'isWall') {
			return (
				<Grid
					ref={(element: HTMLDivElement) => {
						nodeRefs.current[x] = nodeRefs.current[x] || [];
						nodeRefs.current[x][y] = element;
					}}
					coordinate={[x, y]}
					isClicking={isClicking}
					updateMouseClick={updateMouseClick}
					className='grid wall'
				/>
			);
		} else
			return (
				<Grid
					ref={(element: HTMLDivElement) => {
						nodeRefs.current[x] = nodeRefs.current[x] || [];
						nodeRefs.current[x][y] = element;
					}}
					coordinate={[x, y]}
					isClicking={isClicking}
					updateMouseClick={updateMouseClick}
					className='grid'
					handleChangeStartPosition={handleChangeStartPos}
					handleChangeEndPosition={handleChangeEndPos}
				/>
			);
	};

	return (
		<div
			className='grid-container'
			onMouseDown={() => updateMouseClick(true)}
			onMouseUp={() => {
				updateBoardWallState();
				updateMouseClick(false);
			}}
			onMouseLeave={() => updateMouseClick(false)}
			draggable='false'>
			{board.map((nodeRow, rowIndex) => {
				return (
					<div className='row' draggable='false' key={rowIndex}>
						{nodeRow.map((Node, colIndex) => {
							return generateGridComponent(rowIndex, colIndex);
						})}
					</div>
				);
			})}
		</div>
	);
};
