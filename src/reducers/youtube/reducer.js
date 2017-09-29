import clone from 'lodash/clone';

import initialState from './initialState';
import * as constants from './constants';
import newLink from './objects/newLink';

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_ONE_TO_REPEAT:
      localStorage.setItem('repeat', state.repeat + 1);

      return {
        ...state,
        repeat: state.repeat + 1,
      };
    case constants.MINUS_ONE_TO_REPEAT: {
      const canMinusRepeat = state.repeat > 0;
      canMinusRepeat && localStorage.setItem('repeat', state.repeat - 1);

      return {
        ...state,
        repeat: canMinusRepeat ? state.repeat - 1 : state.repeat,
      };
    }
    case constants.ADD_LINK: {
      const links = clone(state.links);
      links.splice(action.payload + 1, 0, newLink());

      localStorage.setItem('links', JSON.stringify(links));

      return {
        ...state,
        links,
      };
    }
    case constants.REMOVE_LINK: {
      const oldLinks = clone(state.links);
      oldLinks.splice(action.payload, 1);

      const links = oldLinks.length === 0 ? [newLink()] : oldLinks;
      localStorage.setItem('links', JSON.stringify(links));

      return {
        ...state,
        links,
      };
    }
    case constants.SET_LINK: {
      const { link, index } = action.payload;

      const links = clone(state.links);
      if (typeof links[link] !== 'undefined') {
        links[index] = newLink(link);
      } else {
        links.push(newLink(link));
      }

      localStorage.setItem('links', JSON.stringify(links));

      return {
        ...state,
        links,
      };
    }
    case constants.SET_LINK_TITLE: {
      const { title, index } = action.payload;

      const links = clone(state.links);
      links[index].title = title;

      return {
        ...state,
        links,
      };
    }
    default:
      return state;
  }
};
