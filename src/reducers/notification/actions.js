import { SET_OPEN_STATUS, SET_PERMISSION } from './constants';

export const setOpenStatus = status => ({
  type: SET_OPEN_STATUS,
  payload: status,
});

export const setPermission = status => ({
  type: SET_PERMISSION,
  payload: status,
});

export const setupNotification = () => (
  dispatch => {
    // Request notification permission from user
    window.Notification && Notification.requestPermission(status => {
      dispatch(setPermission(status));
    });

    window.addEventListener('focus', () => {
      window.breakNotification && window.breakNotification.close();
      dispatch(setOpenStatus(false));
    });
  }
);

export const createNotification = () => (
  (dispatch, getState) => {
    if (window.Notification &&
        getState().notification.permission === 'granted' &&
        !getState().notification.isOpen &&
        !document.hasFocus()) {
      const title = 'Take a Break';
      const o = {
        body: 'It\'s time to take a break!',
        icon: './images/notification.png',
      };
      window.breakNotification = new Notification(title, o);
      dispatch(setOpenStatus(true));
      window.breakNotification.addEventListener('click', () => {
        window.focus();
        window.breakNotification.close();
        dispatch(setOpenStatus(false));
      });
    }
  }
);
