import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Radium from 'radium';

import { actions } from 'reducers/timer';

import Youtube from './Youtube';
import Timer from './Timer';
import Button from './Button';

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startVideo: false,
    };

    // Flag to check whether there is a notification already open
    this.notificationOpen = false;

    // Request notification permission from user
    window.Notification && Notification.requestPermission(status => {
      this.notificationPermission = status;
    });

    window.addEventListener('focus', () => {
      this.n && this.n.close();
      this.notificationOpen = false;
    });
  }

  setCountdownTime = milliseconds => {
    this.millisecondsToPass = milliseconds;
  }

  createNotification = () => {
    if (window.Notification &&
        this.notificationPermission === 'granted' &&
        !this.notificationOpen &&
        !document.hasFocus()) {
      const title = 'Take a Break';
      const o = {
        body: 'It\'s time to take a break!',
        icon: './images/notification.png',
      };
      this.n = new Notification(title, o);
      this.notificationOpen = true;
      this.n.addEventListener('click', () => {
        window.focus();
        this.n.close();
        this.notificationOpen = false;
      });
    }
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
      // Create timer
      this.timer = setInterval(() => {
        const now = new Date().getTime();
        if (now >= this.state.endTime) {
          clearInterval(this.timer);

          this.setState({
            currentTimeLeft: 0,
            startVideo: true,
          });
        } else {
          this.setState({
            currentTimeLeft: this.state.endTime - now,
          });
        }
      }, 100);
    });
  }

  render() {
    const style = {
      textAlign: 'center',
      marginBottom: '24px',
    };

    return (
      <form
        style={style}
        onSubmit={e => {
          e.preventDefault();
          this.props.actions.startTimer();
        }}
      >
        <Youtube />
        <Timer />
        <Button />
      </form>
    );
  }
}

Body.propTypes = {
  actions: PropTypes.shape({
    startTimer: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...actions,
  }, dispatch),
});

export default connect(undefined, mapDispatchToProps)(Radium(Body));
