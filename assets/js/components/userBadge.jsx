import React from 'react';

export default function(props) {
  const styles = {
    background: props.user.profile.hex_code
  }

  return(
    <span className="badge badge--user" style={styles}>{ props.user.username }</span>
  )

}
