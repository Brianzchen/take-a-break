import React from 'react';
import PropTypes from 'prop-types';

import TimerInputs from './TimerInputs';
import CountDown from './CountDown';

export default function Timer(props) {
  const style = {
    width: `100%`,
  };

  const countdown = props.timerOn ? (
    <CountDown currentTimeLeft={props.currentTimeLeft} />
  ) : null;

  return (
    <div style={style}>
      <TimerInputs timerOn={props.timerOn} setCountdownTime={props.setCountdownTime} />
      {countdown}
    </div>
  );
}

Timer.propTypes = {
  timerOn: PropTypes.bool.isRequired,
  setCountdownTime: PropTypes.func.isRequired,
  currentTimeLeft: PropTypes.number.isRequired,
};
