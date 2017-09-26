import React from 'react';
import PropTypes from 'prop-types';

const style = {
  fontSize: '24px',
  margin: '16px',
};

const NowPlaying = ({ title }) => (
  <div style={style}>
    {`Now playing: ${title}`}
  </div>
);

NowPlaying.propTypes = {
  title: PropTypes.node.isRequired,
};

export default NowPlaying;
