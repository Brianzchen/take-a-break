import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

class Input extends React.Component {
  onClick = () => {
    this.input.select();
  }

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
        boxSizing: 'border-box',
        width: '100%',
        fontSize: '16px',
        padding: '8px',
        borderRadius: '6px',
        outline: 'none',
        border: '1px solid #ccc',
        ':focus': {
          border: '1px solid #69b0e8',
        },
      },
    };

    return (
      <div style={styles.container}>
        <label style={styles.label} htmlFor={this.props.label}>
          {this.props.label}
        </label>
        <input
          style={styles.input}
          ref={o => { this.input = o; }}
          type={'number'}
          id={this.props.label}
          value={this.props.value}
          onClick={this.onClick}
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
