export default youtubeLink => {
  const youtubeStart = 'https://www.youtube.com/watch?v=';
  return youtubeLink.substring(youtubeStart.length);
};
