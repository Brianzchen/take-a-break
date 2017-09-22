import React from 'react';

const styles = {
  container: {
    padding: '16px',
    textAlign: 'center',
  },
  title: {
    fontSize: '36px',
    marginBottom: '8px',
  },
  subTitle: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '16px',
  },
};

const Header = () => (
  <div style={styles.container}>
    <div style={styles.title}>
      {'Take a Break'}
    </div>
    <div style={styles.subTitle}>
      {'The most awesome way to take regular breaks throughout your day'}
    </div>
    <hr />
  </div>
);

export default Header;
