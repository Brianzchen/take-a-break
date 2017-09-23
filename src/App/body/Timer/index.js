import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TimerInputs from './TimerInputs';
import CountDown from './CountDown';

const style = {
  width: '100%',
};

const Timer = props => (
  <div style={style}>
    {props.timerOn ? (
      <CountDown />
    ) : (
      <TimerInputs />
    )}
  </div>
);

Timer.propTypes = {
  timerOn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  timerOn: state.timer.timerOn,
});

export default connect(mapStateToProps)(Timer);
