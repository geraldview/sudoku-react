import React, { useState } from 'react';
import InputArea from '../inputArea/inputArea';
import Timer from '../timer/timer';
import './sudoku.css';

const SudokuCell = (props) => {

  const { rowIdx, colIdx, content, numSelect, selectedCell, preFills } = props;

  const groupRange = ((selectedCell) => {
    const [x, y] = selectedCell;
    const ranges = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    return [
      ranges[Math.floor(x / 3)] || [],
      ranges[Math.floor(y / 3)] || [],
    ];
  })(selectedCell);

  return (
    <div className={`
      sudokuCell 
      ${colIdx === selectedCell[1] ? 'selectedCol' : ''} 
      ${rowIdx === selectedCell[0] && colIdx === selectedCell[1] ? 'selectedCell' : ''}
      ${groupRange[0].includes(rowIdx) && groupRange[1].includes(colIdx) ? 'selectedGroup' : ''}
      ${preFills === 0 && content > 0 ? 'userInput' : ''}
      `}>
      <input value={preFills === 0 ? (content === 0 ? '' : content) : preFills} onChange={() => {}} onFocus={() => numSelect(rowIdx, colIdx)} />
    </div>
  );
};

const SudokuRow = (props) => {
  const { rowIdx, rowContent, numSelect, selectedCell, preFills } = props;

  return (
    <div className={`sukokuRow ${rowIdx === selectedCell[0] ? 'selectedRow' : ''}`}>
      {rowContent.map((c, idx) => <SudokuCell key={`${rowIdx}-${idx}`} rowIdx={rowIdx} colIdx={idx} content={c} numSelect={numSelect} selectedCell={selectedCell} preFills={preFills[idx]} />)}
    </div>
  );  
};

const Sudoku = (props) => {

  const { preFills } = props;
  const [solution, setSolution] = useState(preFills);
  const [paused, setPaused] = useState(false);
  const [selectedCell, setSelectedCell] = useState([]);

  const pauseHandler = (timerStart) => setPaused(!timerStart);
  const numSelect = (x, y) => setSelectedCell([x, y]);

  const inputHandler = (num) => {
    if (selectedCell[0] !== undefined && selectedCell[1] !== undefined) {
      let tempSolution = JSON.parse(JSON.stringify(solution));
      tempSolution[selectedCell[0]][selectedCell[1]] = num;
      setSolution(tempSolution);
    }
  };

  const interactionHandler = (action) => {
    switch (action) {
      case 'Clear':
        setSolution(preFills);
        break;
      case 'Erase':
        inputHandler(0);
        break;
      case 'Notes':
        console.log('notes');
        break;
      case 'Hints':
      default:
        console.log('hints');
        break;
    };
  }

  const PauseResume = (props) => {
    const { paused, resumeHandler } = props;
    return paused ?
      <div className="pauseResumeContainer"><div className="pauseResume" onClick={resumeHandler}></div></div>
      : null;
  };

  const resumeHandler = () => {
    setPaused(false);
  };

  return (
    <div className="sudoku">
      <PauseResume paused={paused} resumeHandler={resumeHandler} />
      <Timer paused={paused} pauseHandler={pauseHandler} />
      <div className={`sudokuBoard ${paused ? 'paused' : ''}`}>
        {solution.map((r, idx) => <SudokuRow key={idx} rowIdx={idx} rowContent={r} numSelect={numSelect} selectedCell={selectedCell} preFills={preFills[idx]}/>)}
        <InputArea inputHandler={inputHandler} interactionHandler={interactionHandler} />
      </div>
      
    </div>
  );
};

export default Sudoku;