import React from 'react';
import PropTypes from 'prop-types';

import Links from './Links';
import PlaylistModifier from './PlaylistModifier';

export default class Playlist extends React.Component {
  render() {
    const style = {
      display: `inline-block`,
      width: `90%`,
    };

    return (
      <div style={style}>
        <Links
          setEmbededLink={this.props.setEmbededLink}
          isPlaylist={this.state.isPlaylist}
        />
        <PlaylistModifier
          value={this.state.isPlaylist}
          onChange={this.setPlaylist}
        />
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      isPlaylist: false,
    };
  }

  setPlaylist = () => {
    this.setState({
      isPlaylist: !this.state.isPlaylist,
    });
  }
}

Playlist.propTypes = {
  setEmbededLink: PropTypes.func.isRequired,
};
