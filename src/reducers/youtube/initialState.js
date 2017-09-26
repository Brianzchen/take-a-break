import newLink from './objects/newLink';

export default {
  repeats: 0,
  links: JSON.parse(localStorage.getItem('links')) || [newLink()],
};
