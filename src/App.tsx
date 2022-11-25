import { Board } from './Components/Board';
import Header from './Components/Header';
import './App.css';
import { createContext, MutableRefObject, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface FuncRef {
	startAlgo: (algo: string) => void;
}

const App: React.FC = () => {
	const [hasAnimated, setHasAnimated] = useState(false);
	const context: MutableRefObject<FuncRef | null> = useRef(null);

	return (
		<DndProvider backend={HTML5Backend}>
			<main className='App'>
				<Header
					hasAnimated={hasAnimated}
					startAlgo={context.current?.startAlgo!}
				/>
				<Board hasAnimated={hasAnimated} setHasAnimated={setHasAnimated} ref={context} />
			</main>
		</DndProvider>
	);
};

export default App;
