import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from 'reducers/youtube';
import { Button } from 'components';

const style = {
  position: 'absolute',
  top: 0,
  right: 0,
};

const Buttons = props => (
  <div style={style}>
    <Button
      iconName="plus"
      style={{ color: 'green' }}
      onClick={() => { props.actions.addLink(props.index); }}
    />
    <Button
      iconName="close"
      style={{ color: 'red' }}
      onClick={() => { props.actions.removeLink(props.index); }}
    />
  </div>
);

Buttons.propTypes = {
  index: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    addLink: PropTypes.func.isRequired,
    removeLink: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...actions,
  }, dispatch),
});

export default connect(undefined, mapDispatchToProps)(Buttons);
