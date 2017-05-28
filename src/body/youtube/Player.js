/* global YT */

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
          onStateChange: event => {
            switch (event.data) {
              case YT.PlayerState.PLAYING:
                // this.props.stopTimer();
                break;
              case YT.PlayerState.ENDED:
                this.props.restartTimer();
                break;
              case YT.PlayerState.UNSTARTED:
                break;
              case YT.PlayerState.PAUSED:
                break;
              default:
                break;
            }
          },
        },
      });
    };
  }

  componentWillReceiveProps(nextProps) {
    this.player.cueVideoById(nextProps.embededLink);
    if (!this.props.startVideo && nextProps.startVideo) {
      this.player.playVideo();
    }
  }
}

Player.propTypes = {
  embededLink: PropTypes.string.isRequired,
  restartTimer: PropTypes.func.isRequired,
  startVideo: PropTypes.bool.isRequired,
};
