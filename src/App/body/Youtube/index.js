import React from 'react';
import PropTypes from 'prop-types';

import Inputs from './Inputs';
import Player from './Player';

const Youtube = props => (
  <div>
    <Inputs />
    <Player
      restartTimer={props.restartTimer}
      startVideo={props.startVideo}
    />
  </div>
);

Youtube.propTypes = {
  restartTimer: PropTypes.func.isRequired,
  startVideo: PropTypes.bool.isRequired,
};

export default Youtube;
