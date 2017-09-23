import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toHours, toMinutes, toSeconds } from 'lib/timeConversion';
import { actions } from 'reducers/timer';

import Input from './Input';

class TimerInputs extends React.Component {
  constructor(props) {
    super(props);

    this.convertTime(props.timerDuration);
  }

  componentWillReceiveProps(nextProps) {
    this.convertTime(nextProps.timerDuration);
  }

  setHours = event => {
    this.setTime('hours', event.target.value);
  }

  setMinutes = event => {
    this.setTime('minutes', event.target.value);
  }

  setSeconds = event => {
    this.setTime('seconds', event.target.value);
  }

  setTime = (type, value) => {
    this[type] = value;
    this.passBackTime();
  }

  convertTime = timerDuration => {
    this.hours = toHours(timerDuration);
    this.minutes = toMinutes(timerDuration);
    this.seconds = toSeconds(timerDuration);
  }

  passBackTime = () => {
    // Get the amount of time that needs to pass in milliseconds
    const hours = this.hours * 60 * 60 * 1000;
    const minutes = this.minutes * 60 * 1000;
    const seconds = this.seconds * 1000;

    this.props.actions.applyTimerDuration(hours + minutes + seconds);
  }

  render() {
    const style = {
      width: '100%',
    };

    return (
      <div style={style}>
        <Input label="Hours" value={this.hours} onChange={this.setHours} />
        <Input label="Minutes" value={this.minutes} onChange={this.setMinutes} />
        <Input label="Seconds" value={this.seconds} onChange={this.setSeconds} />
      </div>
    );
  }
}

TimerInputs.propTypes = {
  timerDuration: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    applyTimerDuration: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  timerDuration: state.timer.timerDuration,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...actions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimerInputs);
