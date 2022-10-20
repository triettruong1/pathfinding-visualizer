import { Board } from './Components/Board';
import Header from './Components/Header';
import './App.css';


const App: React.FC = () => {

  return (
    <main className='App'>
      <Header />
      <Board />
    </main>
  );
};

export default App;
