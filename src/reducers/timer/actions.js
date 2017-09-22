import { SET_CURRENT_TIME, SET_TIMER_STATUS } from './constants';

export const setCurrentTime = newTime => ({
  type: SET_CURRENT_TIME,
  payload: newTime,
});

export const setTimerStatus = bool => ({
  type: SET_TIMER_STATUS,
  payload: bool,
});

export const startTimer = () => (
  dispatch => {
    dispatch(setTimerStatus(true));
    console.log('timer is starting'); // eslint-disable-line
  }
);

export const cancelTimer = () => (
  dispatch => {
    dispatch(setTimerStatus(false));
    console.log('timer is stopping'); // eslint-disable-line
  }
);
