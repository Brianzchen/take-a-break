import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';

ReactDOM.render(
  <Root />,
  document.getElementById(`container`),
);

// When youtube api loads it will call this method
// It will periodically check for whether the player construction function
// within Player.js has been initialized and if so it will be called
window.onYouTubeIframeAPIReady = () => {
  const timer = setInterval(() => {
    if (window.initReactPlayer) {
      window.initReactPlayer();
      clearInterval(timer);
    }
  }, 50);
};
