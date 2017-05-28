import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  render() {
    const styles = {
      container: {
        display: `inline-block`,
      },
      label: {
        display: `block`,
      },
      input: {
        display: `block`,
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
          type={`number`}
          id={this.props.label}
          value={this.props.value}
          onClick={this.onClick}
          onChange={this.props.onChange}
        />
      </div>
    );
  }

  onClick = () => {
    this.input.select();
  }
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
