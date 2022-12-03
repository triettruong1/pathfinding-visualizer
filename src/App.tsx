import { Board } from './Components/Board';
import Header from './Components/Header';
import './App.css';
import { useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App: React.FC = () => {
	let animateButtonReceiver = (algo: string) => {};
	const animateReceiverCreator = (handle: (algo: string) => void) => {
		animateButtonReceiver = handle;
	};
	const animateButtonTrigger = (algo: string) => {
		animateButtonReceiver(algo);
	};

	let resetButtonReceiver = () => {};
	const resetReceiverCreator = (handle: () => void) => {
		resetButtonReceiver = handle;
	};
	const resetButtonTrigger = () => {
		resetButtonReceiver();
	};

	let resetPathButtonReceiver = () => {};
	const resetPathReceiverCreator = (handle: () => void) => {
		resetPathButtonReceiver = handle;
	};
	const resetPathButtonTrigger = () => {
      resetPathButtonReceiver();
    };

	return (
		<DndProvider backend={HTML5Backend}>
			<main className='App'>
				<Header startAlgo={animateButtonTrigger} resetBoard={resetButtonTrigger} resetPath={resetPathButtonTrigger}/>
				<Board
					animateReceiverCreator={animateReceiverCreator}
					resetReceiverCreator={resetReceiverCreator}
                    resetPathReceiverCreator={resetPathReceiverCreator}
				/>
			</main>
		</DndProvider>
	);
};

export default App;
