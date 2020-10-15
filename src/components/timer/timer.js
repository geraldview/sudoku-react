import React, { useEffect, useState } from 'react';
import './timer.css';

const Timer = (props) => {
  const [timerStart, setTimerStart] = useState(false);
  const [second, setSecond] = useState(0);

  const { paused, pauseHandler } = props;

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec - (3600 * h)) / 60);
    const s = sec - (3600 * h) - (60 * m);
    return `${h >= 10 ? h + ':' : (h === 0 ? '' : '0' + h + ':')}${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  useEffect(() => {
    if (timerStart) {
      setTimeout(() => setSecond(second + 1), 1000);
    }
  });

  useEffect(() => {
    console.log('componentDidUpdate');
    setTimerStart(!paused);
  }, [paused]);

  const timerHandler = () => {
    const newStatus = !timerStart;
    setTimerStart(newStatus);
    pauseHandler(newStatus);
  };

  return (
    <div className="timer">
    {formatTime(second)}
    {
      timerStart ? 
        <i className="fa fa-pause" onClick={timerHandler}></i> :
        <i className="fa fa-play"  onClick={timerHandler}></i>
    }
    </div>
  );
};


export default Timer;