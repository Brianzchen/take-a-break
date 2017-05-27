import React from 'react';

export default function Header() {
  const styles = {
    container: {
      padding: `16px`,
      textAlign: `center`,
    },
    title: {
      fontSize: `36px`,
      marginBottom: `8px`,
    },
    subTitle: {
      fontSize: `14px`,
      color: `#777`,
      marginBottom: `16px`,
    },
  };

  const title = `Take a Break`;
  const subTitle = `The most awesome way to take regular breaks throughout your day`;

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        {title}
      </div>
      <div style={styles.subTitle}>
        {subTitle}
      </div>
      <hr />
    </div>
  );
}
