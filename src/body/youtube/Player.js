/* global YT */

import React from 'react';
import PropTypes from 'prop-types';

export default class Player extends React.Component {
  render() {
    const display = this.props.embededLinks[this.playlistCounter].length > 0 ?
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
    this.playlistCounter = 0;

    window.initReactPlayer = () => {
      this.player = new YT.Player(`player`, {
        height: `390`,
        width: `640`,
        videoId: this.props.embededLinks[0],
        events: {
          onStateChange: event => {
            switch (event.data) {
              case YT.PlayerState.PLAYING:
                break;
              case YT.PlayerState.ENDED:
                this.playerEnded();
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
    if (!this.player) return;
    this.player.cueVideoById(nextProps.embededLinks[this.playlistCounter]);
    if (!this.props.startVideo && nextProps.startVideo) {
      this.player.playVideo();
    }
  }

  playerEnded = () => {
    if (typeof this.props.embededLinks[this.playlistCounter + 1] === `undefined`) {
      this.playlistCounter = 0;

      if (this.repeatCounter >= this.props.repeat) {
        this.repeatCounter = 0;
        this.props.restartTimer();
      } else {
        this.player.playVideo();
        this.repeatCounter += 1;
      }
    } else {
      this.playlistCounter += 1;
      this.player.cueVideoById(this.props.embededLinks[this.playlistCounter]);
      this.player.playVideo();
    }
  }
}

Player.propTypes = {
  embededLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
  restartTimer: PropTypes.func.isRequired,
  startVideo: PropTypes.bool.isRequired,
  repeat: PropTypes.number.isRequired,
};
