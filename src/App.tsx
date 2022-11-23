import { Board } from './Components/Board';
import Header from './Components/Header';
import './App.css';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  let animateReceiver = (algo: string) => {}
  const animateButtonTrigger = (algo: string) => {
    animateReceiver(algo);  
  }
  const animateReceiverCreator = (handler: (algo: string) => void) => {
    animateReceiver = handler;
  }

  let resetReceiver = () => {}
  const resetButtonTrigger = () => {
    resetReceiver();
  }
  const resetReceiverCreator = (handler: () => void) => {
    resetReceiver = handler;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <main className='App'>
        <Header
          hasAnimated={hasAnimated}
          animateButtonTrigger={animateButtonTrigger}
          resetButtonTrigger={resetButtonTrigger}
        />
        <Board
          animateReceiverCreator={animateReceiverCreator}
          resetReceiverCreator={resetReceiverCreator}
          hasAnimated={hasAnimated}
          setHasAnimated={setHasAnimated}
        />
      </main>
    </DndProvider>
  );
};

export default App;
