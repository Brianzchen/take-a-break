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
      cancel: {
        color: `white`,
        backgroundColor: `#d9534f`,
        ':hover': {
          backgroundColor: `#cc3a36`,
        },
        ':active': {
          backgroundColor: `#c9211c`,
        },
      },
    };

    const button = this.state.timerOn ? (
      <button style={[styles.submit, styles.cancel]} onClick={this.cancelTimer}>Cancel</button>
    ) : (
      <input style={styles.submit} type={`submit`} value={`Start`} />
    );

    return (
      <form style={styles.container} onSubmit={this.startTimer}>
        <Youtube restartTimer={this.restartTimer} />
        <Timer
          timerOn={this.state.timerOn}
          setCountdownTime={this.setCountdownTime}
          currentTimeLeft={this.state.currentTimeLeft}
        />
        {button}
      </form>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      timerOn: false,
      currentTimeLeft: 0,
    };
  }

  startTimer = event => {
    event.preventDefault();
    this.setState({
      timerOn: true,
      endTime: new Date().getTime() + this.millisecondsToPass,
    }, () => {
      this.timer = setInterval(() => {
        const now = new Date().getTime();
        if (now >= this.state.endTime) {
          clearInterval(this.timer);
          // play the video
          this.setState({
            currentTimeLeft: 0,
          });
        } else {
          this.setState({
            currentTimeLeft: this.state.endTime - now,
          });
        }
      }, 100);
    });
  }

  restartTimer = () => {

  }

  cancelTimer = () => {
    this.setState({
      timerOn: false,
    });
  }

  setCountdownTime = milliseconds => {
    this.millisecondsToPass = milliseconds;
  }
}

export default Radium(Body);
