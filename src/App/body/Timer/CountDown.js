import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { padStart } from 'lodash';

const CountDown = props => {
  const style = {
    display: props.timerOn ? 'block' : 'none',
    fontSize: '32px',
  };

  const hours = padStart(Math.floor(props.currentTimeLeft / 60 / 60 / 1000), 2, '0');
  const minutes = padStart(Math.floor((props.currentTimeLeft / 60 / 1000) % 60), 2, '0');
  const seconds = padStart(Math.floor((props.currentTimeLeft / 1000) % 60), 2, '0');

  const time = `${hours}:${minutes}:${seconds}`;

  return (
    <div style={style}>
      {time}
    </div>
  );
};

CountDown.propTypes = {
  currentTimeLeft: PropTypes.number.isRequired,
  timerOn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  currentTimeLeft: state.timer.currentTimeLeft,
  timerOn: state.timer.timerOn,
});

export default connect(mapStateToProps)(CountDown);
