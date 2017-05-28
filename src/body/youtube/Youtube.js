import React from 'react';
import PropTypes from 'prop-types';

import Link from './Link';
import Player from './Player';

export default class Youtube extends React.Component {
  render() {
    return (
      <div>
        <Link setEmbededLink={this.setEmbededLink} />
        <Player
          embededLink={this.state.embededLink}
          restartTimer={this.props.restartTimer}
        />
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      embededLink: ``,
    };
  }

  setEmbededLink = link => {
    this.setState({
      embededLink: link.substr(`https://www.youtube.com/watch?v=`.length),
    });
  }
}

Youtube.propTypes = {
  restartTimer: PropTypes.func.isRequired,
};
