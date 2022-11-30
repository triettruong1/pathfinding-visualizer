import './Header.css';
import React, { useRef } from 'react';

interface HeaderProps {
	startAlgo: (algo: string) => void;
	resetBoard: () => void;
	hasAnimated: boolean;
}

const Header: React.FC<HeaderProps> = ({ startAlgo, hasAnimated, resetBoard }) => {
	const selectRef = useRef<HTMLSelectElement>(null);
	const beginAnimation = () => {
		let algo = selectRef.current!.value;
		startAlgo(algo);
	};

	const handleResetBoard = () => {
		resetBoard();
	};

	return (
		<header className='flex'>
			<h1>Path-finding visualizer</h1>
			<div className='controls flex'>
				<button
					disabled={hasAnimated}
					className={hasAnimated ? 'disabled' : ''}
					onClick={beginAnimation}>
					Animate
				</button>
				<button onClick={handleResetBoard}>Reset</button>
				<select ref={selectRef}>
					<option>BFS</option>
					<option>Dijkstra</option>
                    <option>A-Star</option>
				</select>
			</div>
		</header>
	);
};

export default Header;
