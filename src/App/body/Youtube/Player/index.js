/* global YT */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual, get } from 'lodash';

import { actions } from 'reducers/timer';
import getVideoId from 'lib/getVideoId';

import NowPlaying from './NowPlaying';

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
        videoId: getVideoId(this.props.links[0].link),
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

    if (!isEqual(
      this.props.links[this.playlistCounter],
      nextProps.links[this.playlistCounter],
    )) {
      this.player.cueVideoById(
        getVideoId(nextProps.links[this.playlistCounter].link),
      );
    }

    if (!this.props.startVideo && nextProps.startVideo) {
      this.player.playVideo();
    } else if (this.props.startVideo && !nextProps.startVideo) {
      this.player.pauseVideo();
    }
  }

  playerEnded = () => {
    const nextVideo = get(this.props.links, '[this.playlistCounter + 1].link');

    if (typeof nextVideo === 'undefined' || getVideoId(nextVideo).length === 0) {
      this.playlistCounter = 0;
      this.player.cueVideoById(getVideoId(this.props.links[this.playlistCounter].link));

      if (this.repeatCounter >= this.props.repeat) {
        this.repeatCounter = 0;
        this.props.actions.startTimer();
      } else {
        this.player.playVideo();
        this.repeatCounter += 1;
      }
    } else {
      this.playlistCounter += 1;
      this.player.cueVideoById(getVideoId(nextVideo));
      this.player.playVideo();
    }
  }

  render() {
    const style = {
      display: this.props.links[this.playlistCounter].link.length > 0 ? 'initial' : 'none',
    };

    return (
      <div style={style}>
        {this.props.startVideo ?
          (
            <NowPlaying
              title={this.props.links[this.playlistCounter].title}
            />
          ) : null
        }
        <div id={'player'} />
      </div>
    );
  }
}

Player.propTypes = {
  startVideo: PropTypes.bool.isRequired,
  repeat: PropTypes.number.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  actions: PropTypes.shape({
    startTimer: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  startVideo: state.timer.timerOn && state.timer.currentTimeLeft <= 0,
  repeat: state.youtube.repeat,
  links: state.youtube.links,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...actions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
