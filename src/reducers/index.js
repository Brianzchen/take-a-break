import { combineReducers } from 'redux';

import notification from './notification/reducer';
import timer from './timer/reducer';
import youtube from './youtube/reducer';

export default combineReducers({
  notification,
  timer,
  youtube,
});
