import { useEffect, useState, useRef } from 'react';
import './App.css';
import Grid from './Components/Grid';

const START_POS = [5, 10];
const END_POS = [25, 10]
const App: React.FC = () => {
  const [isClicking, setIsClicking] = useState(false);

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
    let type = { isEnd: false, isStart: false };
    (START_X == x && START_Y == y) ? type.isStart = true : '';
    (END_X == x && END_Y == y) ? type.isEnd = true : '';
    return type;
  }

  return (
    <main className='App'>
      <div className="grid-container"
        onMouseDown={() => {
          setIsClicking(true);
          console.log("clicking");
        }}
        onMouseUp={() => {
          console.log("stopped");
          setIsClicking(false);
        }}
      >
        {board.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((colIndex) => {
                return <Grid
                  coordinate={[rowIndex, colIndex]}
                  isClicking={isClicking}
                  {...isType(rowIndex, colIndex)}
                />
              })}
            </div>
          )
        })}
      </div>
    </main>
  );
};

export default App;
