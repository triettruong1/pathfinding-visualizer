import './Header.css';
import React, { useRef, useState } from 'react';

interface HeaderProps {
	startAlgo: (algo: string) => void;
	resetBoard: () => void;
    resetPath: () => void;
}

const Header: React.FC<HeaderProps> = ({ startAlgo, resetBoard, resetPath}) => {
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
    }

	return (
		<header className='flex'>
			<h1>Path-finding visualizer</h1>
			<div className='controls flex'>
				<select ref={selectRef}>
					<option>A-Star</option>
					<option>BFS</option>
					<option>Dijkstra</option>
				</select>
				<button
					disabled={hasAnimated}
					className={hasAnimated ? 'disabled' : ''}
					onClick={beginAnimation}>
					Animate
				</button>
				<button onClick={handleResetPath}>Reset Path</button>
				<button onClick={handleResetBoard}>Reset</button>
			</div>
		</header>
	);
};

export default Header;
