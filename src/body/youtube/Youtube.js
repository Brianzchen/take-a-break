import React from 'react';
import PropTypes from 'prop-types';

import Inputs from './inputs/Inputs';
import Player from './Player';

export default class Youtube extends React.Component {
  render() {
    return (
      <div>
        <Inputs
          setEmbededLink={this.props.setEmbededLink}
          repeat={this.state.repeat}
          increaseRepeat={this.increaseRepeat}
          decreaseRepeat={this.decreaseRepeat}
        />
        <Player
          embededLinks={this.props.embededLinks}
          restartTimer={this.props.restartTimer}
          startVideo={this.props.startVideo}
          repeat={this.state.repeat}
        />
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      repeat: 0,
    };
  }

  increaseRepeat = () => {
    this.setState({
      repeat: this.state.repeat + 1,
    });
  }

  decreaseRepeat = () => {
    const repeat = this.state.repeat > 0 ? this.state.repeat - 1 : 0;

    this.setState({
      repeat,
    });
  }
}

Youtube.propTypes = {
  restartTimer: PropTypes.func.isRequired,
  startVideo: PropTypes.bool.isRequired,
  embededLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
  setEmbededLink: PropTypes.func.isRequired,
};
