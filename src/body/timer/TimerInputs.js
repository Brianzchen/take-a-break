import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

export default class TimerInputs extends React.Component {
  render() {
    const style = {
      display: this.props.timerOn ? `none` : `block`,
      width: `100%`,
    };

    return (
      <div style={style}>
        <Input label={`Hours`} value={this.state.hours} onChange={this.setHours} />
        <Input label={`Minutes`} value={this.state.minutes} onChange={this.setMinutes} />
        <Input label={`Seconds`} value={this.state.seconds} onChange={this.setSeconds} />
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      hours: `0`,
      minutes: `0`,
      seconds: `0`,
    };
    this.passBackTime();
  }

  setHours = event => {
    this.setTime(`hours`, event);
  }

  setMinutes = event => {
    this.setTime(`minutes`, event);
  }

  setSeconds = event => {
    this.setTime(`seconds`, event);
  }

  setTime = (type, event) => {
    this.setState({
      [type]: event.target.value,
    }, () => {
      this.passBackTime();
    });
  }

  passBackTime = () => {
    // Get the amount of time that needs to pass in milliseconds
    const hours = this.state.hours * 60 * 60 * 1000;
    const minutes = this.state.minutes * 60 * 1000;
    const seconds = this.state.seconds * 1000;

    this.props.setCountdownTime(hours + minutes + seconds);
  }
}

TimerInputs.propTypes = {
  timerOn: PropTypes.bool.isRequired,
  setCountdownTime: PropTypes.func.isRequired,
};
