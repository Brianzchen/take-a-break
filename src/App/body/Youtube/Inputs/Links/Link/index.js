import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import getVideoId from 'lib/getVideoId';

import Buttons from './Buttons';

class Link extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };

    const linkId = getVideoId(props.value);
    if (linkId.length !== 0) this.setVideoName(linkId);
  }

  componentWillReceiveProps(nextProps) {
    const linkId = getVideoId(nextProps.value);

    if (linkId.length > 0) {
      if (this.props.value !== nextProps.value) {
        this.setVideoName(linkId);
      }
    } else {
      this.setState({ title: '' });
    }
  }

  setVideoName = linkId => {
    const query = `https://www.googleapis.com/youtube/v3/videos?id=${linkId}&key=AIzaSyDDYVfIvEePwE3S7BPTsXtiqSC_0SlVMuM&fields=items(snippet(title))&part=snippet`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', query);
    xhr.onload = () => {
      this.setState({
        title: JSON.parse(xhr.response).items[0].snippet.title,
      });
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
        display: 'inline-block',
        width: '50%',
        padding: '8px',
        borderRadius: '6px',
        outline: 'none',
        border: '1px solid #ccc',
        ':focus': {
          border: '1px solid #69b0e8',
        },
      },
      title: {
        display: 'inline-block',
        paddingLeft: '8px',
      },
    };

    return (
      <div style={styles.container}>
        <input
          style={styles.input}
          id={'youtubeInput'}
          value={this.props.value}
          onChange={e => {
            this.props.setLink(e.target.value, this.props.index);
          }}
          placeholder={'Link'}
        />
        <div style={styles.title}>
          - {this.state.title}
        </div>
        <Buttons index={this.props.index} />
      </div>
    );
  }
}

Link.propTypes = {
  value: PropTypes.string.isRequired,
  setLink: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Radium(Link);
