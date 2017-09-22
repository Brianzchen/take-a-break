import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Radium from 'radium';

import { actions } from 'reducers/timer';

const styles = {
  submit: {
    outline: 'none',
    backgroundColor: 'transparent',
    border: '1px solid #ccc',
    borderRadius: '6px',
    color: '#333',
    fontSize: '18px',
    marginTop: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#eee',
    },
    ':active': {
      backgroundColor: '#ccc',
    },
  },
  cancel: {
    border: '1px solid #d9534f',
    color: 'white',
    backgroundColor: '#d9534f',
    ':hover': {
      backgroundColor: '#cc3a36',
    },
    ':active': {
      backgroundColor: '#c9211c',
    },
  },
};

const Button = props => (
  props.timerOn ? (
    <button
      style={{ ...styles.submit, ...styles.cancel }}
      onClick={props.actions.cancelTimer}
    >
      Cancel
    </button>
  ) : (
    <input
      style={styles.submit}
      type="submit"
      value="Start"
    />
  )
);

Button.propTypes = {
  timerOn: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    cancelTimer: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  timerOn: state.timer.timerOn,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...actions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Radium(Button));
