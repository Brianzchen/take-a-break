import React from 'react';
import PropTypes from 'prop-types';

import Playlist from './Playlist';
import RepeatField from './RepeatField';

export default function Inputs(props) {
  const style = {
    marginBottom: `8px`,
  };

  return (
    <div style={style}>
      <Playlist setEmbededLink={props.setEmbededLink} />
      <RepeatField
        repeat={props.repeat}
        increaseRepeat={props.increaseRepeat}
        decreaseRepeat={props.decreaseRepeat}
      />
    </div>
  );
}

Inputs.propTypes = {
  setEmbededLink: PropTypes.func.isRequired,
  repeat: PropTypes.number.isRequired,
  increaseRepeat: PropTypes.func.isRequired,
  decreaseRepeat: PropTypes.func.isRequired,
};
