import { Board } from './Components/Board';
import Header from './Components/Header';
import './App.css';
import { useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App: React.FC = () => {
	const [hasAnimated, setHasAnimated] = useState(false);

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

	return (
		<DndProvider backend={HTML5Backend}>
			<main className='App'>
				<Header
					hasAnimated={hasAnimated}
					startAlgo={animateButtonTrigger}
					resetBoard={resetButtonTrigger}
				/>
				<Board
					hasAnimated={hasAnimated}
					setHasAnimated={setHasAnimated}
					animateReceiverCreator={animateReceiverCreator}
					resetReceiverCreator={resetReceiverCreator}
				/>
			</main>
		</DndProvider>
	);
};

export default App;
