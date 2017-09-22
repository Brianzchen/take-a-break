import React from 'react';
import PropTypes from 'prop-types';

import Playlist from './Playlist';
import RepeatField from './RepeatField';

const style = {
  marginBottom: '8px',
};

const Inputs = () => (
  <div style={style}>
    <Playlist />
    <RepeatField />
  </div>
);

export default Inputs;
