import initialState from './initialState';
import { SET_REPEATS, SET_LINK, SET_LINKS } from './constants';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REPEATS:
      return {
        ...state,
        repeats: action.payload,
      };
    case SET_LINK:
      return {
        ...state,
      };
    case SET_LINKS:
      return {
        ...state,
        links: action.payload,
      };
    default:
      return state;
  }
};
