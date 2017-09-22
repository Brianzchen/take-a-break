import React from 'react';

import TimerInputs from './TimerInputs';
import CountDown from './CountDown';

const style = {
  width: '100%',
};

const Timer = () => (
  <div style={style}>
    <TimerInputs />
    <CountDown />
  </div>
);

export default Timer;
