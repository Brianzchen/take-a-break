import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

function Button(props) {
  const styles = {
    submit: {
      outline: `none`,
      backgroundColor: `transparent`,
      border: `1px solid #ccc`,
      borderRadius: `6px`,
      color: `#333`,
      fontSize: `18px`,
      marginTop: `8px`,
      padding: `8px 16px`,
      cursor: `pointer`,
      ':hover': {
        backgroundColor: `#eee`,
      },
      ':active': {
        backgroundColor: `#ccc`,
      },
    },
    cancel: {
      border: `1px solid #d9534f`,
      color: `white`,
      backgroundColor: `#d9534f`,
      ':hover': {
        backgroundColor: `#cc3a36`,
      },
      ':active': {
        backgroundColor: `#c9211c`,
      },
    },
  };

  const button = props.timerOn ? (
    <button style={[styles.submit, styles.cancel]} onClick={props.cancelTimer}>Cancel</button>
  ) : (
    <input style={styles.submit} type={`submit`} value={`Start`} />
  );

  return button;
}

Button.propTypes = {
  timerOn: PropTypes.bool.isRequired,
  cancelTimer: PropTypes.func.isRequired,
};

export default Radium(Button);
