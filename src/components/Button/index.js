import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

const style = {
  margin: '4px',
  fontSize: '24px',
  userSelect: 'none',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.5,
  },
};

const Button = props => (
  <i
    className={`mdi mdi-${props.iconName}`}
    style={{ ...style, ...props.style }}
    onClick={props.onClick}
  />
);

Button.propTypes = {
  iconName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

Button.defaultProps = {
  onClick: () => {},
  style: {},
};

export default Radium(Button);
