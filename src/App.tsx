import { Board } from './Components/Board';
import Header from './Components/Header';
import './App.css';
import { useCallback, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App: React.FC = () => {
	//There's gotta be a way to do this better
	let animateButtonReceiver = (algo: string) => {};
	const animateReceiverCreator = useCallback((handle: (algo: string) => void) => {
		animateButtonReceiver = handle;
	}, []);
	const animateButtonTrigger = useCallback((algo: string) => {
		animateButtonReceiver(algo);
	}, []);

	let resetButtonReceiver = () => {};
	const resetReceiverCreator = useCallback((handle: () => void) => {
		resetButtonReceiver = handle;
	}, []);
	const resetButtonTrigger = useCallback(() => {
		resetButtonReceiver();
	}, []);

	let resetPathButtonReceiver = () => {};
	const resetPathReceiverCreator = useCallback((handle: () => void) => {
		resetPathButtonReceiver = handle;
	}, []);
	const resetPathButtonTrigger = useCallback(() => {
		resetPathButtonReceiver();
	}, []);

	let generateMazeButtonReceiver = () => {};
	const generateMazeReceiverCreator = useCallback((handle: () => void) => {
		generateMazeButtonReceiver = handle;
	}, []);
	const generateMazeButtonTrigger = useCallback(() => {
		generateMazeButtonReceiver();
	}, []);

	return (
		<DndProvider backend={HTML5Backend}>
			<main className='App flex'>
				<div className='header-wrapper'>
					<Header
						startAlgo={animateButtonTrigger}
						resetBoard={resetButtonTrigger}
						resetPath={resetPathButtonTrigger}
						generateMaze={generateMazeButtonTrigger}
					/>
				</div>
				<div className='board-wrapper center'>
					<Board
						animateReceiverCreator={animateReceiverCreator}
						resetReceiverCreator={resetReceiverCreator}
						resetPathReceiverCreator={resetPathReceiverCreator}
						generateMazeReceiverCreator={generateMazeReceiverCreator}
					/>
				</div>
			</main>
		</DndProvider>
	);
};

export default App;
