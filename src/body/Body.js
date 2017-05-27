import React from 'react';
import Radium from 'radium';

import Youtube from './youtube/Youtube';
import Timer from './timer/Timer';

class Body extends React.Component {
  render() {
    const styles = {
      container: {
        textAlign: `center`,
      },
      submit: {
        outline: `none`,
        backgroundColor: `transparent`,
        border: `1px solid #ccc`,
        borderRadius: `6px`,
        color: `#333`,
        fontSize: `18px`,
        marginTop: `8px`,
        padding: `8px 16px`,
        cursor: `pointer`,
        ':hover': {
          backgroundColor: `#eee`,
        },
        ':active': {
          backgroundColor: `#ccc`,
        },
      },
    };

    return (
      <form style={styles.container} onSubmit={this.startTimer}>
        <Youtube />
        <Timer />
        <input style={styles.submit} type={`submit`} value={`Start`} />
      </form>
    );
  }

  startTimer = event => {
    event.preventDefault();
  }
}

export default Radium(Body);
