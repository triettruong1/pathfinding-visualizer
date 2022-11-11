import { Board } from './Components/Board';
import Header from './Components/Header';
import './App.css';
import { useState } from 'react';
import {DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App: React.FC = () => {
	const [shouldAnimate, setAnimate] = useState(false);
	const [shouldReset, setReset] = useState(false);
	const [algo, setAlgo] = useState('');
	return (
    <DndProvider backend={HTML5Backend}>
      <main className='App'>
        <Header
          setAnimate={setAnimate}
          setResetBoard={setReset}
          setAlgo={setAlgo}
          />
        <Board
          shouldAnimate={shouldAnimate}
          shouldReset={shouldReset}
          algo={algo}
          />
      </main>
    </DndProvider>
	);
};

export default App;
