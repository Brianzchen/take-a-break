import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

const style = {
  display: 'inline-block',
  padding: '8px',
  borderRadius: '6px',
  outline: 'none',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
  ':focus': {
    border: '1px solid #69b0e8',
  },
};

class Input extends React.Component {
  render() {
    return (
      <input
        ref={o => { this.input = o; }}
        {...this.props}
        style={{ ...style, ...this.props.style }}
      />
    );
  }
}

Input.propTypes = {
  style: PropTypes.object,
};

Input.defaultProps = {
  style: {},
};

export default Radium(Input);
