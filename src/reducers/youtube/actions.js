import * as constants from './constants';

export const addOneToRepeat = () => ({
  type: constants.ADD_ONE_TO_REPEAT,
});

export const minusOneToRepeat = () => ({
  type: constants.MINUS_ONE_TO_REPEAT,
});

export const addLink = index => ({
  type: constants.ADD_LINK,
  payload: index,
});

export const removeLink = index => ({
  type: constants.REMOVE_LINK,
  payload: index,
});

export const setLink = (link, index) => ({
  type: constants.SET_LINK,
  payload: { link, index },
});

export const setLinkTitle = (title, index) => ({
  type: constants.SET_LINK_TITLE,
  payload: { title, index },
});
