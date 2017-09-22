import initialState from './initialState';
import { SET_OPEN_STATUS, SET_PERMISSION } from './constants';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_OPEN_STATUS:
      return {
        ...state,
        isOpen: action.payload,
      };
    case SET_PERMISSION:
      return {
        ...state,
        permission: action.payload,
      };
    default:
      return state;
  }
};
