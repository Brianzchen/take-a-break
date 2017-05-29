import React from 'react';
import PropTypes from 'prop-types';

import Link from './Link';
import RepeatField from './RepeatField';
import Player from './Player';

export default class Youtube extends React.Component {
  render() {
    const styles = {
      inputRow: {
        marginBottom: `8px`,
      },
    };

    return (
      <div>
        <div style={styles.inputRow}>
          <Link setEmbededLink={this.props.setEmbededLink} />
          <RepeatField
            repeat={this.state.repeat}
            increaseRepeat={this.increaseRepeat}
            decreaseRepeat={this.decreaseRepeat}
          />
        </div>
        <Player
          embededLink={this.props.embededLink}
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
  embededLink: PropTypes.string.isRequired,
  setEmbededLink: PropTypes.func.isRequired,
};
