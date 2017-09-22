import initialState from './initialState';
import { SET_TIMER_DURATION, SET_CURRENT_TIME_LEFT, SET_TIMER_STATUS } from './constants';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMER_DURATION:
      return {
        ...state,
        timerDuration: action.payload,
      };
    case SET_CURRENT_TIME_LEFT:
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
