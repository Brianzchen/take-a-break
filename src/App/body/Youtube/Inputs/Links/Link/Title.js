import React from 'react';
import PropTypes from 'prop-types';

const style = {
  display: 'inline-block',
  paddingLeft: '8px',
  width: '50%',
  boxSizing: 'border-box',
  lineHeight: '31px',
  verticalAlign: 'top',
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const Title = ({ value }) => (
  <div style={style}>
    {`${value.length > 0 ? '-' : ''} ${value}`}
  </div>
);

Title.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Title;
