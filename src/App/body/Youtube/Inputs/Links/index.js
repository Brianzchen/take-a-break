import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { map } from 'lodash';

import { actions } from 'reducers/youtube';

import Link from './Link';

const Links = props => {
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

  const links = map(props.links, (o, i) => (
    <Link
      key={i}
      link={o.link}
      title={o.title}
      setLink={props.actions.setLink}
      setLinkTitle={props.actions.setLinkTitle}
      index={i}
    />
  ));

  return (
    <div style={styles.container}>
      <div style={styles.label}>
        {'Youtube Links'}
      </div>
      {links}
    </div>
  );
};

Links.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  actions: PropTypes.shape({
    setLink: PropTypes.func.isRequired,
    setLinkTitle: PropTypes.func.isRequired,
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
