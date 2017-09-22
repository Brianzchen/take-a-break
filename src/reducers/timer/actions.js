import { SET_TIMER_DURATION, SET_CURRENT_TIME, SET_TIMER_STATUS } from './constants';

export const setTimerDuration = time => ({
  type: SET_TIMER_DURATION,
  payload: time,
});

export const setCurrentTime = newTime => ({
  type: SET_CURRENT_TIME,
  payload: newTime,
});

export const setTimerStatus = bool => ({
  type: SET_TIMER_STATUS,
  payload: bool,
});

export const cancelTimer = () => (
  dispatch => {
    dispatch(setTimerStatus(false));
  }
);

export const startTimer = () => (
  (dispatch, getState) => {
    if (getState().timer.timerDuration <= 0
        || getState().youtube.links[0].length === 0) return;

    dispatch(setTimerStatus(true));

    const endTime = new Date().getTime() + getState().timer.timerDuration;

    const interval = setInterval(() => {
      const now = new Date().getTime();

      if (!getState().timer.timerOn || now >= endTime) {
        clearInterval(interval);
        dispatch(cancelTimer());
      } else {
        dispatch(setCurrentTime(endTime - now));
      }
    }, 100);
  }
);
