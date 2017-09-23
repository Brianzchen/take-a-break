export default {
  timerDuration: parseInt(localStorage.getItem('timerDuration'), 10) || 0,
  timerOn: false,
  currentTimeLeft: 0,
};
