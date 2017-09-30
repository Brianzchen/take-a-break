import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from 'reducers/youtube';
import { Button } from 'components';

const styles = {
  container: {
    verticalAlign: 'top',
    display: 'inline-block',
  },
  counter: {
    lineHeight: '42px',
  },
  value: {
    display: 'inline-block',
    verticalAlign: 'top',
    lineHeight: '38px',
  },
  buttons: {
    display: 'inline-block',
    marginLeft: '4px',
  },
};

const RepeatField = props => (
  <div style={styles.container}>
    <div>
      {'Repeat'}
    </div>
    <div style={styles.counter}>
      <div style={styles.value}>
        {props.repeatAmount}
      </div>
      <div style={styles.buttons}>
        <Button
          iconName="chevron-up"
          onClick={props.actions.addOneToRepeat}
        />
        <Button
          iconName="chevron-down"
          onClick={props.actions.minusOneToRepeat}
        />
      </div>
    </div>
  </div>
);

RepeatField.propTypes = {
  repeatAmount: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    addOneToRepeat: PropTypes.func.isRequired,
    minusOneToRepeat: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  repeatAmount: state.youtube.repeat,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...actions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RepeatField);
