import { actions as notificationActions } from 'reducers/notification';

import { SET_TIMER_DURATION, SET_CURRENT_TIME_LEFT, SET_TIMER_STATUS } from './constants';

export const setTimerDuration = time => ({
  type: SET_TIMER_DURATION,
  payload: time,
});

export const setCurrentTimeLeft = newTime => ({
  type: SET_CURRENT_TIME_LEFT,
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
    if (getState().timer.timerDuration <= 0) return;

    dispatch(setTimerStatus(true));

    const endTime = new Date().getTime() + getState().timer.timerDuration;
    dispatch(setCurrentTimeLeft(endTime - new Date().getTime()));

    const interval = setInterval(() => {
      const now = new Date().getTime();

      if (!getState().timer.timerOn || getState().timer.currentTimeLeft <= 0) {
        clearInterval(interval);
        dispatch(notificationActions.createNotification());
      } else {
        dispatch(setCurrentTimeLeft(Math.max(endTime - now, 0)));
      }
    }, 100);
  }
);
