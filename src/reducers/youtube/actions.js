import { clone } from 'lodash';

import { SET_REPEATS, SET_LINKS } from './constants';

export const setRepeats = repeats => ({
  type: SET_REPEATS,
  payload: repeats,
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

export const setLinks = links => ({
  type: SET_LINKS,
  payload: links,
});

export const setLink = (link, index) => (
  (dispatch, getState) => {
    const links = clone(getState().youtube.links);
    if (typeof links[index] !== 'undefined') {
      links[index] = link;
    } else {
      links.push(link);
    }

    dispatch(setLinks(links));
    localStorage.setItem('links', JSON.stringify(links));
  }
);

export const addLink = index => (
  (dispatch, getState) => {
    const links = getState().youtube.links;
    links.splice(index + 1, 0, 'test');
    console.log(links);
    dispatch(setLinks(links));
  }
);

export const removeLink = index => (
  (dispatch, getState) => {
    const links = getState().youtube.links;
    links.splice(index, 1);

    dispatch(setLinks(links.length === 0 ? [''] : links));
  }
);
