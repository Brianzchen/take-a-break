import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { StyleRoot } from 'radium';

import appReducer from 'reducers';
import App from 'App';

render(
  <Provider store={createStore(appReducer, applyMiddleware(thunk))}>
    <StyleRoot>
      <App />
    </StyleRoot>
  </Provider>,
  document.getElementById('container'),
);
