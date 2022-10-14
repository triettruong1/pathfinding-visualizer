import { useEffect, useState, useRef } from 'react';
import './App.css';
import Grid from './Components/Grid';

const START_POS = [5, 10];
const END_POS = [25, 10]
const App: React.FC = () => {
  const mouseRef = useRef(false);


  let board: number[][] = [];
  const populateBoard = () => {
    for (let col = 0; col < 50; col++) {
      const currentCol = [];
      for (let row = 0; row < 25; row++) {
        currentCol.push(row);
      }
      board.push(currentCol);
    }
  };

  populateBoard();

  const isType = (x: number, y: number) => {
    const [START_X, START_Y] = START_POS;
    const [END_X, END_Y] = END_POS;
    let type: string = "";
    (START_X == x && START_Y == y) ? type = "start" : "";
    (END_X == x && END_Y == y) ? type = "end" : "";
    return type;
  }

  return (
    <main className='App'>
      <div className="grid-container"
        onMouseDown={() => {
          mouseRef.current = true;
        }}
        onMouseUp={() => {
          mouseRef.current = false;
        }}
      >
        {board.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((colIndex) => {
                return <Grid
                  coordinate={[rowIndex, colIndex]}
                  type={isType(rowIndex, colIndex)}
                  mouseRef={mouseRef}
                />;
              })}
            </div>
          )
        })}
      </div>
    </main>
  );
};

export default App;
