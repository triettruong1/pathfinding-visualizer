import { Board } from './Components/Board';
import Header from './Components/Header';
import './App.css';
import { useState } from 'react';

const App: React.FC = () => {
	const [shouldAnimate, setAnimate] = useState(false);
	const [shouldReset, setReset] = useState(false);
	const [algo, setAlgo] = useState('');
	return (
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
	);
};

export default App;
