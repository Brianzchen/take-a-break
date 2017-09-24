import React from 'react';

import { VerticalRule } from 'components';

import Links from './Links';
import RepeatField from './RepeatField';

const style = {
  display: 'flex',
  marginBottom: '8px',
};

const Inputs = () => (
  <div style={style}>
    <Links />
    <VerticalRule />
    <RepeatField />
  </div>
);

export default Inputs;
