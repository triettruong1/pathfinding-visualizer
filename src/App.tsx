import { useState } from 'react';
import './App.css';
import Grid from './Components/Grid';

const App: React.FC = () => {
  let board: number[][] = [];

  const populateBoard = () => {
    for (let row = 0; row < 50; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(col);
      }
      board.push(currentRow);
    }
  };

  populateBoard();

  return (
    <main className='App'>
      <div className="grid-container">
        {board.map((row, rowIndex) => {
          return row.map((colIndex) => {
            return <Grid coordinate={[rowIndex, colIndex]} />;
          })
        })}
      </div>
    </main>
  );
};

export default App;
