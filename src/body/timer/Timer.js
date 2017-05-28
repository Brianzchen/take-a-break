import React from 'react';
import PropTypes from 'prop-types';

import TimerInputs from './TimerInputs';
import CountDown from './CountDown';

export default function Timer(props) {
  const countdown = props.timerOn ? (
    <CountDown currentTimeLeft={props.currentTimeLeft} />
  ) : null;

  return (
    <div>
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
