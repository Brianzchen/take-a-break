import React from 'react';
import PropTypes from 'prop-types';
import { padStart } from 'lodash';

export default function CountDown(props) {
  const style = {
    fontSize: `32px`,
  };

  const hours = padStart(Math.floor(props.currentTimeLeft / 60 / 60 / 1000), 2, `0`);
  const minutes = padStart(Math.floor((props.currentTimeLeft / 60 / 1000) % 60), 2, `0`);
  const seconds = padStart(Math.floor((props.currentTimeLeft / 1000) % 60), 2, `0`);

  const time = `${hours}:${minutes}:${seconds}`;

  return (
    <div style={style}>
      {time}
    </div>
  );
}

CountDown.propTypes = {
  currentTimeLeft: PropTypes.number.isRequired,
};

// when component moounts can start counting down
