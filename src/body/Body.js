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
          embededLink={this.state.embededLink}
          setEmbededLink={this.setEmbededLink}
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
      embededLink: ``,
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
    if (this.millisecondsToPass === 0 || this.state.embededLink.length === 0) {
      return;
    }

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

  setEmbededLink = link => {
    this.setState({
      embededLink: link.substr(`https://www.youtube.com/watch?v=`.length),
    });
  }
}

export default Radium(Body);
