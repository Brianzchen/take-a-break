import React from 'react';
import PropTypes from 'prop-types';

export default function RepeatField(props) {
  const styles = {
    container: {
      verticalAlign: `top`,
      display: `inline-block`,
      width: `10%`,
    },
    label: {

    },
    counter: {
      lineHeight: `42px`,
    },
    value: {
      display: `inline-block`,
    },
    buttons: {
      display: `inline-block`,
      marginLeft: `8px`,
    },
    button: {
      userSelect: `none`,
      cursor: `pointer`,
      position: `relative`,
      top: `6px`,
      margin: `auto 4px`,
    },
  };

  const label = `Repeat`;

  return (
    <div style={styles.container}>
      <div style={styles.label}>
        {label}
      </div>
      <div style={styles.counter}>
        <div style={styles.value}>
          {props.repeat}
        </div>
        <div style={styles.buttons}>
          <i style={styles.button} className={`material-icons`} onClick={props.increaseRepeat}>keyboard_arrow_up</i>
          <i style={styles.button} className={`material-icons`} onClick={props.decreaseRepeat}>keyboard_arrow_down</i>
        </div>
      </div>
    </div>
  );
}

RepeatField.propTypes = {
  repeat: PropTypes.number.isRequired,
  increaseRepeat: PropTypes.func.isRequired,
  decreaseRepeat: PropTypes.func.isRequired,
};
