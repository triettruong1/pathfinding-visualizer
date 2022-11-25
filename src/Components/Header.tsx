import './Header.css';
import React, { useRef } from 'react';

interface HeaderProps {
  startAlgo: (algo: string) => void;
	hasAnimated: boolean;
}

const Header: React.FC<HeaderProps> = ({ startAlgo, hasAnimated }) => {
	const selectRef = useRef<HTMLSelectElement>(null);
	const beginAnimation = () => {
    let algo = selectRef.current!.value;
    console.log(startAlgo);
    startAlgo(algo);
	};

	const handleResetBoard = () => {
	};

	return (
		<header className='flex'>
			<h1>Path-finding visualizer</h1>
			<div className='controls flex'>
				<button
					disabled={hasAnimated}
					className={hasAnimated ? 'disabled' : ''}
					onClick={() => {
            let algo = selectRef.current!.value;
            console.log(startAlgo);
            startAlgo(algo);
          }}>
					Animate
				</button>
				<button onClick={handleResetBoard}>Reset</button>
				<select ref={selectRef}>
					<option>BFS</option>
					<option>Dijkstra</option>
				</select>
			</div>
		</header>
	);
};

export default Header;
