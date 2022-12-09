import './Header.css';
import React, { useRef, useState } from 'react';

interface HeaderProps {
	startAlgo: (algo: string) => void;
	resetBoard: () => void;
	resetPath: () => void;
	generateMaze: () => void;
}

const Header: React.FC<HeaderProps> = ({ startAlgo, resetBoard, resetPath, generateMaze }) => {
	const [hasAnimated, setHasAnimate] = useState(false);
	const selectRef = useRef<HTMLSelectElement>(null);
	const beginAnimation = () => {
		let algo = selectRef.current!.value;
		setHasAnimate(true);
		startAlgo(algo);
	};

	const handleResetBoard = () => {
		setHasAnimate(false);
		resetBoard();
	};

	const handleResetPath = () => {
		setHasAnimate(false);
		resetPath();
	};

	const handleGenerateMaze = () => {
		generateMaze();
	};

	return (
		<header className='flex'>
			<h1>Path-finding Visualizer</h1>
			<div className='controls flex'>
				<select ref={selectRef}>
					<option>A-Star</option>
					<option>BFS</option>
					<option>DFS</option>
					<option>Dijkstra</option>
				</select>
				<button
					disabled={hasAnimated}
					className={hasAnimated ? 'disabled accent' : 'accent'}
					onClick={beginAnimation}>
					Animate
				</button>
				<button
					disabled={hasAnimated}
					className={hasAnimated ? 'disabled' : ''}
					onClick={handleGenerateMaze}>
					Generate Maze
				</button>
				<button onClick={handleResetPath}>Reset Path</button>
				<button className='danger' onClick={handleResetBoard}>Reset</button>
			</div>
		</header>
	);
};

export default Header;
