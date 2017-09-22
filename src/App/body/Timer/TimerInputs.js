import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from 'reducers/timer';

import Input from './Input';

class TimerInputs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: props.timerDuration / 60 / 60 / 1000,
      minutes: props.timerDuration / 60 / 1000,
      seconds: props.timerDuration / 1000,
    };
    this.passBackTime();
  }

  setHours = event => {
    this.setTime('hours', event);
  }

  setMinutes = event => {
    this.setTime('minutes', event);
  }

  setSeconds = event => {
    this.setTime('seconds', event);
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

    this.props.actions.setTimerDuration(hours + minutes + seconds);
  }

  render() {
    const style = {
      display: this.props.timerOn ? 'none' : 'block',
      width: '100%',
    };

    return (
      <div style={style}>
        <Input label="Hours" value={this.state.hours} onChange={this.setHours} />
        <Input label="Minutes" value={this.state.minutes} onChange={this.setMinutes} />
        <Input label="Seconds" value={this.state.seconds} onChange={this.setSeconds} />
      </div>
    );
  }
}

TimerInputs.propTypes = {
  timerDuration: PropTypes.number.isRequired,
  timerOn: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    setTimerDuration: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  timerDuration: state.timer.timerDuration,
  timerOn: state.timer.timerOn,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...actions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimerInputs);
