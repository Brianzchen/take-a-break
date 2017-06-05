import React from 'react';
import PropTypes from 'prop-types';

import Link from './Link';

export default class Links extends React.Component {
  render() {
    const styles = {
      container: {
        display: `inline-block`,
        width: `90%`,
      },
      label: {
        textAlign: `left`,
        marginLeft: `4px`,
        marginBottom: `1px`,
      },
    };

    const links = [];

    for (let i = 0, len = this.state.links; i < len; i++) {
      links.push(
        <Link
          key={i}
          setEmbededLink={link => { this.props.setEmbededLink(link, i); }}
        />);
    }

    const label = `Youtube Link`;

    return (
      <div style={styles.container}>
        <div style={styles.label}>
          {label}
        </div>
        {links}
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      links: 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isPlaylist && nextProps.isPlaylist) {
      this.setState({
        links: 2,
      });
    } else if (this.props.isPlaylist && !nextProps.isPlaylist) {
      this.setState({
        links: 1,
      });
    }
  }
}

Links.propTypes = {
  setEmbededLink: PropTypes.func.isRequired,
  isPlaylist: PropTypes.bool.isRequired,
};
