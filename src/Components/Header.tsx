import './Header.css';
import React, { Dispatch, SetStateAction, useRef } from 'react';

interface HeaderProps {
	hasAnimated: boolean;
  animateButtonTrigger: (algo: string) => void;
  resetButtonTrigger: () => void;
}

const Header: React.FC<HeaderProps> = ({
	hasAnimated,
  animateButtonTrigger,
  resetButtonTrigger,
}) => {
	const selectRef = useRef<HTMLSelectElement>(null);
	const beginAnimation = () => {
    const algo = selectRef.current!.value;
    animateButtonTrigger(algo);
	};

	const handleResetBoard = () => {
    resetButtonTrigger();
	};

	return (
		<header className='flex'>
			<h1>Path-finding visualizer</h1>
			<div className='controls flex'>
				<button disabled={hasAnimated} className={hasAnimated ? 'disabled' : ''} onClick={beginAnimation}>Animate</button>
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
