import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

class Link extends React.Component {
  render() {
    const styles = {
      container: {
        verticalAlign: `top`,
        textAlign: `left`,
        width: `100%`,
      },
      input: {
        display: `inline-block`,
        width: `calc(100% - 16px)`,
        padding: `8px`,
        margin: `4px`,
        borderRadius: `6px`,
        outline: `none`,
        border: `1px solid #ccc`,
        ':focus': {
          border: `1px solid #69b0e8`,
        },
      },
    };

    return (
      <div style={styles.container}>
        <input
          style={styles.input}
          id={`youtubeInput`}
          value={this.state.link}
          onChange={this.onChange}
          placeholder={`Link`}
        />
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      link: ``,
    };
  }

  onChange = event => {
    this.setState({
      link: event.target.value,
    }, () => {
      this.props.setEmbededLink(this.state.link);
    });
  }
}

Link.propTypes = {
  setEmbededLink: PropTypes.func.isRequired,
};

export default Radium(Link);
