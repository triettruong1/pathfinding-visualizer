import './Header.css';
import React, { Dispatch, SetStateAction, useRef } from 'react';

interface HeaderProps {
	setAnimate: Dispatch<SetStateAction<boolean>>;
	setResetBoard: Dispatch<SetStateAction<boolean>>;
	setAlgo: Dispatch<SetStateAction<string>>;
	hasAnimated: boolean;
}

const Header: React.FC<HeaderProps> = ({
	setAnimate,
	setResetBoard,
	setAlgo,
	hasAnimated
}) => {
	const selectRef = useRef<HTMLSelectElement>(null);
	const beginAnimation = () => {
		setAlgo(selectRef.current!.value);
		setAnimate((prevState) => !prevState);
		setTimeout(() => {
			setAnimate((prevState) => !prevState);
		});
	};

	const handleResetBoard = () => {
		setResetBoard((prevState) => !prevState);
		setTimeout(() => {
			setResetBoard((prevState) => !prevState);
		});
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
