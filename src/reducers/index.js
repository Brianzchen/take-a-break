import { combineReducers } from 'redux';

import timer from './timer/reducer';
import youtube from './youtube/reducer';

export default combineReducers({
  timer,
  youtube,
});
