import initialState from './initialState';
import { SET_CURRENT_TIME, SET_TIMER_STATUS } from './constants';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TIME:
      return {
        ...state,
        currentTimeLeft: action.payload,
      };
    case SET_TIMER_STATUS:
      return {
        ...state,
        timerOn: action.payload,
      };
    default:
      return state;
  }
};
