import React from 'react';
import Radium from 'radium';

import Youtube from './youtube/Youtube';
import Timer from './timer/Timer';
import Button from './button/Button';

class Body extends React.Component {
  render() {
    const style = {
      textAlign: `center`,
      marginBottom: `24px`,
    };

    return (
      <form style={style} onSubmit={this.formSubmit}>
        <Youtube
          restartTimer={this.startTimer}
          startVideo={this.state.startVideo}
        />
        <Timer
          timerOn={this.state.timerOn}
          setCountdownTime={this.setCountdownTime}
          currentTimeLeft={this.state.currentTimeLeft}
        />
        <Button timerOn={this.state.timerOn} cancelTimer={this.cancelTimer} />
      </form>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      timerOn: false,
      currentTimeLeft: 0,
      startVideo: false,
    };

    // Request notification permission from user
    window.Notification && Notification.requestPermission(status => {
      this.notificationPermission = status;
    });

    window.addEventListener(`focus`, () => {
      this.n && this.n.close();
    });
  }

  formSubmit = event => {
    event.preventDefault();
    this.startTimer();
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      endTime: new Date().getTime() + this.millisecondsToPass,
      startVideo: false,
    }, () => {
      this.timer = setInterval(() => {
        const now = new Date().getTime();
        if (now >= this.state.endTime) {
          clearInterval(this.timer);

          this.setState({
            currentTimeLeft: 0,
            startVideo: true,
          });

          // Create notification
          if (window.Notification && this.notificationPermission === `granted`) {
            const title = `Take a Break`;
            const o = {
              body: `It's time to take a break!`,
              icon: `./images/notification.png`,
            };
            this.n = new Notification(title, o);
            this.n.addEventListener(`click`, () => {
              window.focus();
              this.n.close();
            });
            setTimeout(this.n.close.bind(this.n), 60000);
          }
        } else {
          this.setState({
            currentTimeLeft: this.state.endTime - now,
          });
        }
      }, 100);
    });
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
