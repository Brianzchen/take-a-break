import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Radium from 'radium';

import { actions as notificationActions } from 'reducers/notification';
import { actions as timerActions } from 'reducers/timer';

import Youtube from './Youtube';
import Timer from './Timer';
import Button from './Button';

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.props.actions.setupNotification();
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
    setupNotification: PropTypes.func.isRequired,
    startTimer: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...notificationActions,
    ...timerActions,
  }, dispatch),
});

export default connect(undefined, mapDispatchToProps)(Radium(Body));
