import { combineReducers } from 'redux';

import form from './form/reducer';
import timer from './timer/reducer';
import youtube from './youtube/reducer';

export default combineReducers({
  form,
  timer,
  youtube,
});
