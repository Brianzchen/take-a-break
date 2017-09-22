import { clone } from 'lodash';

import { SET_REPEATS, SET_LINK, SET_LINKS } from './constants';

export const setRepeats = repeats => ({
  type: SET_REPEATS,
  payload: repeats,
});

export const setLink = (link, index) => ({
  type: SET_LINK,
  payload: {
    link,
    index,
  },
});

export const setLinks = links => ({
  type: SET_LINKS,
  payload: links,
});

export const addOneToRepeats = () => (
  (dispatch, getState) => {
    dispatch(setRepeats(getState().youtube.repeats + 1));
  }
);

export const minusOneToRepeats = () => (
  (dispatch, getState) => {
    const repeats = getState().youtube.repeats;
    if (repeats > 0) dispatch(setRepeats(repeats - 1));
  }
);

export const addLink = (link, index) => (
  (dispatch, getState) => {
    const links = clone(getState().youtube.links);
    if (typeof links[index] !== 'undefined') {
      links[index] = link;
    } else {
      links.push(link);
    }

    dispatch(setLinks(links));
  }
);
