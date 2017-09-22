/* global YT */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import { actions } from 'reducers/timer';
import getVideoId from 'lib/getVideoId';

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
        videoId: getVideoId(this.props.links[0]),
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

    if (!isEqual(this.props.links, nextProps.links)) {
      this.player.cueVideoById(getVideoId(nextProps.links[this.playlistCounter]));
    }

    if (!this.props.startVideo && nextProps.startVideo) {
      this.player.playVideo();
    }
  }

  playerEnded = () => {
    if (typeof this.props.links[this.playlistCounter + 1] === 'undefined') {
      this.playlistCounter = 0;

      if (this.repeatCounter >= this.props.repeat) {
        this.repeatCounter = 0;
        this.props.actions.startTimer();
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
  startVideo: PropTypes.bool.isRequired,
  repeat: PropTypes.number.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  actions: PropTypes.shape({
    startTimer: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  startVideo: state.timer.timerOn && state.timer.currentTimeLeft <= 0,
  repeat: state.youtube.repeats,
  links: state.youtube.links,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...actions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
