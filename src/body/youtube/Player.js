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

    this.repeatCounter = 0;

    window.onYouTubeIframeAPIReady = () => {
      this.player = new YT.Player(`player`, {
        height: `390`,
        width: `640`,
        videoId: this.props.embededLink,
        events: {
          onStateChange: event => {
            switch (event.data) {
              case YT.PlayerState.PLAYING:
                break;
              case YT.PlayerState.ENDED:
                if (this.repeatCounter >= this.props.repeat) {
                  this.props.restartTimer();
                } else {
                  this.player.playVideo();
                  this.repeatCounter += 1;
                }
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
  repeat: PropTypes.number.isRequired,
};
