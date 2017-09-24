import React from 'react';
import PropTypes from 'prop-types';

const style = {
  margin: '4px',
  fontSize: '24px',
  cursor: 'pointer',
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

export default Button;
