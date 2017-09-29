import newLink from './objects/newLink';

export default {
  repeat: parseInt(localStorage.getItem('repeat'), 10) || 0,
  links: JSON.parse(localStorage.getItem('links')) || [newLink()],
};
