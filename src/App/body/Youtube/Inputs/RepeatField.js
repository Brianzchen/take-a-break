import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from 'reducers/youtube';

const styles = {
  container: {
    verticalAlign: 'top',
    display: 'inline-block',
    width: '10%',
  },
  label: {

  },
  counter: {
    lineHeight: '42px',
  },
  value: {
    display: 'inline-block',
  },
  buttons: {
    display: 'inline-block',
    marginLeft: '8px',
  },
  button: {
    userSelect: 'none',
    cursor: 'pointer',
    position: 'relative',
    top: '6px',
    margin: 'auto 4px',
  },
};

const RepeatField = props => (
  <div style={styles.container}>
    <div style={styles.label}>
      {'Repeat'}
    </div>
    <div style={styles.counter}>
      <div style={styles.value}>
        {props.repeatAmount}
      </div>
      <div style={styles.buttons}>
        <i
          style={styles.button}
          className={'material-icons'}
          onClick={props.actions.addOneToRepeats}
        >
          keyboard_arrow_up
        </i>
        <i
          style={styles.button}
          className={'material-icons'}
          onClick={props.actions.minusOneToRepeats}
        >
          keyboard_arrow_down
        </i>
      </div>
    </div>
  </div>
);

RepeatField.propTypes = {
  repeatAmount: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    addOneToRepeats: PropTypes.func.isRequired,
    minusOneToRepeats: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  repeatAmount: state.youtube.repeats,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...actions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RepeatField);
