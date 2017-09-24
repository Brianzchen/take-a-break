import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import { Input as ReuseableInput } from 'components';

class Input extends React.Component {
  render() {
    const styles = {
      container: {
        display: 'inline-block',
        width: '33%',
        paddingRight: '8px',
        boxSizing: 'border-box',
      },
      label: {
        textAlign: 'left',
        display: 'block',
      },
      input: {
        display: 'block',
        width: '100%',
      },
    };

    return (
      <div style={styles.container}>
        <label style={styles.label} htmlFor={this.props.label}>
          {this.props.label}
        </label>
        <ReuseableInput
          ref={o => { if (o !== null) this.input = o.input; }}
          id={this.props.label}
          style={styles.input}
          type={'number'}
          value={this.props.value}
          onClick={() => { this.input.select(); }}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Radium(Input);
