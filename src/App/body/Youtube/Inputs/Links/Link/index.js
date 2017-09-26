import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import getVideoId from 'lib/getVideoId';
import { Input } from 'components';

import Buttons from './Buttons';
import Title from './Title';

class Link extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };

    const linkId = getVideoId(props.link);
    if (linkId.length !== 0) this.setVideoName(linkId);
  }

  componentWillReceiveProps(nextProps) {
    const linkId = getVideoId(nextProps.link);

    if (linkId.length > 0) {
      if (this.props.link !== nextProps.link) {
        this.setVideoName(linkId);
      }
    }
  }

  setVideoName = linkId => {
    const query = `https://www.googleapis.com/youtube/v3/videos?id=${linkId}&key=AIzaSyDDYVfIvEePwE3S7BPTsXtiqSC_0SlVMuM&fields=items(snippet(title))&part=snippet`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', query);
    xhr.onload = () => {
      this.props.setLinkTitle(
        JSON.parse(xhr.response).items[0].snippet.title,
        this.props.index,
      );
    };
    xhr.send();
  }

  render() {
    const styles = {
      container: {
        position: 'relative',
        verticalAlign: 'top',
        textAlign: 'left',
        width: '100%',
        margin: '4px',
        paddingRight: '67px',
        boxSizing: 'border-box',
      },
      input: {
        width: '50%',
      },
    };

    return (
      <div style={styles.container}>
        <Input
          id="youtubeInput"
          style={styles.input}
          value={this.props.link}
          onChange={e => {
            this.props.setLink(e.target.value, this.props.index);
          }}
          placeholder={'Link'}
        />
        <Title value={this.props.title} />
        <Buttons index={this.props.index} />
      </div>
    );
  }
}

Link.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  setLink: PropTypes.func.isRequired,
  setLinkTitle: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Radium(Link);
