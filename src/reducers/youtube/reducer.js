import initialState from './initialState';
import * as constants from './constants';

export default (state = initialState, action) => {
  const canMinusRepeat = state.repeat > 0;

  switch (action.type) {
    case constants.ADD_ONE_TO_REPEAT:
      localStorage.setItem('repeat', state.repeat + 1);
      return {
        ...state,
        repeat: state.repeat + 1,
      };
    case constants.MINUS_ONE_TO_REPEAT:
      canMinusRepeat && localStorage.setItem('repeat', state.repeat - 1);
      return {
        ...state,
        repeat: canMinusRepeat ? state.repeat - 1 : state.repeat,
      };
    case constants.SET_LINKS:
      return {
        ...state,
        links: action.payload,
      };
    default:
      return state;
  }
};
