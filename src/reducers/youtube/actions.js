import { clone } from 'lodash';

import * as constants from './constants';
import newLink from './objects/newLink';

export const addOneToRepeat = () => ({
  type: constants.ADD_ONE_TO_REPEAT,
});

export const minusOneToRepeat = () => ({
  type: constants.MINUS_ONE_TO_REPEAT,
});

export const setLinks = links => ({
  type: constants.SET_LINKS,
  payload: links,
});

export const setLink = (link, index) => (
  (dispatch, getState) => {
    const links = clone(getState().youtube.links);
    if (typeof links[index] !== 'undefined') {
      links[index] = newLink(link);
    } else {
      links.push(newLink(link));
    }

    dispatch(setLinks(links));
    localStorage.setItem('links', JSON.stringify(links));
  }
);

export const setLinkTitle = (title, index) => (
  (dispatch, getState) => {
    const links = clone(getState().youtube.links);
    links[index].title = title;

    dispatch(setLinks(links));
  }
);

export const addLink = index => (
  (dispatch, getState) => {
    const links = clone(getState().youtube.links);
    links.splice(index + 1, 0, newLink());

    dispatch(setLinks(links));
    localStorage.setItem('links', JSON.stringify(links));
  }
);

export const removeLink = index => (
  (dispatch, getState) => {
    const links = clone(getState().youtube.links);
    links.splice(index, 1);

    dispatch(setLinks(links.length === 0 ? [newLink()] : links));
    localStorage.setItem('links', JSON.stringify(links.length === 0 ? [''] : links));
  }
);
