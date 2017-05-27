import React from 'react';

export default function Footer() {
  const styles = {
    container: {
      fontSize: `14px`,
      textAlign: `center`,
    },
    text: {
      margin: `16px`,
    },
    warning: {
      padding: `16px`,
      color: `#777`,
      backgroundColor: `#f2dede`,
    },
  };

  const text1 = `Get the link from a YouTube video of your choice, set your timer and forget about it on a separate browser.`;
  const text2 = `You'll be alerted when it's time to take a break from work, play or whatever else you do with your time by the video of your choice.`;
  const text3 = `Once your video ends the timer will reset and you can continue whatever you were doing until your next break.`;

  const warning = `Make sure to enable notifications if you plan on minimizing the browser or keeping the tab running in the background, otherwise you will not be notified when it's time for your break.`;

  return (
    <div style={styles.container}>
      <hr />
      <div style={styles.text}>
        {text1}
      </div>
      <div style={styles.text}>
        {text2}
      </div>
      <div style={styles.text}>
        {text3}
      </div>
      <hr />
      <div style={styles.warning}>
        {warning}
      </div>
    </div>
  );
}
