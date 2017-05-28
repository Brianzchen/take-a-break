import React from 'react';
import PropTypes from 'prop-types';

export default class Player extends React.Component {
  render() {
    const display = this.props.embededLink.length > 0 ?
      `initial` : `none`;

    const style = {
      display,
    };

    return (
      <div style={style}>
        <div id={`player`} />
      </div>
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

    window.onYouTubeIframeAPIReady = () => {
      this.player = new YT.Player(`player`, {
        height: `390`,
        width: `640`,
        videoId: this.props.embededLink,
        events: {

        },
      });
    };
  }
}

Player.propTypes = {
  embededLink: PropTypes.string.isRequired,
};
