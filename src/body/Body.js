import React from 'react';
import Radium from 'radium';
import { clone } from 'lodash';

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
          embededLinks={this.state.embededLinks}
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
      embededLinks: [``],
    };

    // Flag to check whether there is a notification already open
    this.notificationOpen = false;

    // Request notification permission from user
    window.Notification && Notification.requestPermission(status => {
      this.notificationPermission = status;
    });

    window.addEventListener(`focus`, () => {
      this.n && this.n.close();
      this.notificationOpen = false;
    });
  }

  formSubmit = event => {
    event.preventDefault();
    this.startTimer();
  }

  startTimer = () => {
    if (this.millisecondsToPass === 0 || this.state.embededLinks[0].length === 0) {
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
          if (window.Notification &&
              this.notificationPermission === `granted` &&
              !this.notificationOpen &&
              !document.hasFocus()) {
            const title = `Take a Break`;
            const o = {
              body: `It's time to take a break!`,
              icon: `./images/notification.png`,
            };
            this.n = new Notification(title, o);
            this.notificationOpen = true;
            this.n.addEventListener(`click`, () => {
              window.focus();
              this.n.close();
              this.notificationOpen = false;
            });
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
    clearInterval(this.timer);
    this.setState({
      timerOn: false,
    });
  }

  setCountdownTime = milliseconds => {
    this.millisecondsToPass = milliseconds;
  }

  setEmbededLink = (link, track) => {
    const sublink = link.substr(`https://www.youtube.com/watch?v=`.length);

    const embededLinks = clone(this.state.embededLinks);
    if (typeof embededLinks[track] !== `undefined`) {
      embededLinks[track] = sublink;
    } else {
      embededLinks.push(sublink);
    }

    this.setState({
      embededLinks,
    });
  }
}

export default Radium(Body);
