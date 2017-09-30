import React from 'react';
import PropTypes from 'prop-types';

const NowPlaying = ({ title, show }) => {
  const style = {
    fontSize: '24px',
    margin: '16px',
    display: show ? 'block' : 'none',
  };

  return (
    <div style={style}>
      {`Now playing: ${title}`}
    </div>
  );
};

NowPlaying.propTypes = {
  title: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
};

export default NowPlaying;
