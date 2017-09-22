import React from 'react';
import PropTypes from 'prop-types';

export default function PlaylistModifier(props) {
  const styles = {
    container: {
      display: 'inline-block',
      width: '10%',
      verticalAlign: 'top',
    },
    title: {

    },
    toggle: {
      userSelect: 'none',
      color: '#555',
      marginTop: '8px',
      cursor: 'pointer',
    },
  };

  const header = 'Playlist';

  const toggle = props.value ? 'check_box' : 'check_box_outline_blank';

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        {header}
      </div>
      <i style={styles.toggle} className="material-icons" onClick={props.onChange}>
        {toggle}
      </i>
    </div>
  );
}

PlaylistModifier.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
