import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

const styles = {
  container: {
    verticalAlign: 'top',
    textAlign: 'left',
    width: '100%',
    margin: '4px',
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

class Link extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const linkId = nextProps.value.substr('https://www.youtube.com/watch?v='.length);

    if (linkId.length > 0) {
      if (this.props.value !== nextProps.value) {
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
    } else {
      this.setState({ title: '' });
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <input
          style={styles.input}
          id={'youtubeInput'}
          value={this.props.value}
          onChange={e => { this.props.setLink(e.target.value); }}
          placeholder={'Link'}
        />
        <div style={styles.title}>
          - {this.state.title}
        </div>
      </div>
    );
  }
}

Link.propTypes = {
  value: PropTypes.string.isRequired,
  setLink: PropTypes.func.isRequired,
};

export default Radium(Link);
