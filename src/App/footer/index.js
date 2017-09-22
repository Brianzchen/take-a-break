import React from 'react';

const styles = {
  container: {
    fontSize: '14px',
    textAlign: 'center',
  },
  text: {
    margin: '16px',
  },
  warning: {
    padding: '16px',
    color: '#777',
    backgroundColor: '#f2dede',
  },
};

const Footer = () => (
  <div style={styles.container}>
    <hr />
    <div style={styles.text}>
      {'Get the link from a YouTube video of your choice, set your timer and forget about it on a separate browser.'}
    </div>
    <div style={styles.text}>
      {'You\'ll be alerted when it\'s time to take a break from work, play or whatever else you do with your time by the video of your choice.'}
    </div>
    <div style={styles.text}>
      {'Once your video ends the timer will reset and you can continue whatever you were doing until your next break.'}
    </div>
    <hr />
    <div style={styles.warning}>
      {'Make sure to enable notifications if you plan on minimizing the browser or keeping the tab running in the background, otherwise you will not be notified when it\'s time for your break.'}
    </div>
  </div>
);

export default Footer;
