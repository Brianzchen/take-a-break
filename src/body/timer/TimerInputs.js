import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

export default class TimerInputs extends React.Component {
  render() {
    const style = {
      display: this.props.timerOn ? `none` : `initial`,
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
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  setHours = event => {
    this.setState({
      hours: parseInt(event.target.value, 10),
    }, () => {
      this.passBackTime();
    });
  }

  setMinutes = event => {
    this.setState({
      minutes: parseInt(event.target.value, 10),
    }, () => {
      this.passBackTime();
    });
  }

  setSeconds = event => {
    this.setState({
      seconds: parseInt(event.target.value, 10),
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
