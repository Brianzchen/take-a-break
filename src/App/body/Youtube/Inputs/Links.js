import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from 'reducers/youtube';

import Link from './Link';

class Links extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      links: 1,
    };
  }

  render() {
    const styles = {
      container: {
        display: 'inline-block',
        width: '90%',
      },
      label: {
        textAlign: 'center',
        marginLeft: '4px',
        marginBottom: '1px',
      },
    };

    const links = [];

    for (let i = 0, len = this.state.links; i < len; i++) {
      links.push(
        <Link
          key={i}
          value={this.props.links[i]}
          setLink={link => { this.props.actions.addLink(link, i); }}
        />);
    }

    const label = 'Youtube Link';

    return (
      <div style={styles.container}>
        <div style={styles.label}>
          {label}
        </div>
        {links}
      </div>
    );
  }
}

Links.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  actions: PropTypes.shape({
    addLink: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  links: state.youtube.links,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...actions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Links);
