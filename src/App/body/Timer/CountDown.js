import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { padStart } from 'lodash';

import { toHours, toMinutes, toSeconds } from 'lib/timeConversion';

const style = {
  fontSize: '32px',
};

const CountDown = props => {
  const hours = padStart(toHours(props.currentTimeLeft), 2, '0');
  const minutes = padStart(toMinutes(props.currentTimeLeft), 2, '0');
  const seconds = padStart(toSeconds(props.currentTimeLeft), 2, '0');

  const time = `${hours}:${minutes}:${seconds}`;

  return (
    <div style={style}>
      {time}
    </div>
  );
};

CountDown.propTypes = {
  currentTimeLeft: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  currentTimeLeft: state.timer.currentTimeLeft,
});

export default connect(mapStateToProps)(CountDown);
