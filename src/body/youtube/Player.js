import React from 'react';
import PropTypes from 'prop-types';

export default class Player extends React.Component {
  render() {
    const display = this.props.embededLink.length > 0 ?
      `initial` : `none`;

    const style = {
      border: `none`,
      display,
    };

    const src = `https://www.youtube.com/embed/${this.props.embededLink}`;

    return (
      <iframe
        style={style}
        title={`Youtube`}
        src={src}
        allowFullScreen
      />
    );
  }

  constructor(props) {
    super(props);

    this.ytConstants = {
      STOP: 0,
      PLAY: 1,
      PAUSE: 2,
      STATUS_CHANGE: 3,
    };
  }
}

Player.propTypes = {
  embededLink: PropTypes.string.isRequired,
};
