import React from 'react';
import Radium from 'radium';

import Header from 'header/Header';
import Body from 'body/Body';
import Footer from 'footer/Footer';

function App() {
  const style = {
    color: `#333`,
    margin: `auto`,
    width: `100%`,
    '@media (min-width: 1200px)': {
      maxWidth: `1200px`,
    },
  };

  return (
    <div style={style}>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default Radium(App);
