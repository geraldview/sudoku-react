import React from 'react';
import './App.css';
import Sudoku from './components/sudoku/sudoku';

const defaultPrefills = [
  [4, 0, 0, 6, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 6, 0, 4],
  [0, 0, 0, 0, 4, 9, 8, 0, 2],
  [0, 7, 0, 4, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 6, 0, 0, 0, 0],
  [1, 0, 5, 9, 0, 0, 0, 4, 0],
  [5, 0, 7, 0, 0, 0, 2, 8, 0],
  [2, 0, 8, 1, 0, 0, 4, 0, 0],
  [0, 0, 0, 0, 0, 0, 7, 3, 0],
];

function App() {

  return (
    <div className="App">
      <Sudoku preFills={defaultPrefills}/>
    </div>
  );
}

export default App;
