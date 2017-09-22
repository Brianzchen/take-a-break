/* global YT */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.repeatCounter = 0;
    this.playlistCounter = 0;
  }

  componentDidMount() {
    const tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      this.player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: this.props.links[0],
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

    this.player.cueVideoById(
      nextProps.links[this.playlistCounter].substr('https://www.youtube.com/watch?v='.length),
    );
    if (!this.props.startVideo && nextProps.startVideo) {
      this.player.playVideo();
    }
  }

  playerEnded = () => {
    if (typeof this.props.links[this.playlistCounter + 1] === 'undefined') {
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
      this.player.cueVideoById(this.props.links[this.playlistCounter]);
      this.player.playVideo();
    }
  }

  render() {
    const style = {
      display: this.props.links[this.playlistCounter].length > 0 ? 'initial' : 'none',
    };

    return (
      <div style={style}>
        <div id={'player'} />
      </div>
    );
  }
}

Player.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  restartTimer: PropTypes.func.isRequired,
  startVideo: PropTypes.bool.isRequired,
  repeat: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  repeat: state.youtube.repeats,
  links: state.youtube.links,
});

export default connect(mapStateToProps)(Player);
