import React from 'react';
import Radium from 'radium';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const style = {
  color: '#333',
  margin: 'auto',
  width: '100%',
  minWidth: '1000px',
  '@media (min-width: 1000px)': {
    maxWidth: '1000px',
  },
};

const App = () => (
  <div style={style}>
    <Header />
    <Body />
    <Footer />
  </div>
);

export default Radium(App);
