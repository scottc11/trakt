import React, { Component } from 'react';
import Spinner from './spinners/mediumSpinner';

export default function(props) {

  if (!props.activity) {
    return <Spinner />
  }

  const activity = props.activity.map( i => {
    return <li key={i.id}>{i.verb}</li>
  })

  return(
    <div>
      ACTIVITY
      <ul>
        {activity}
      </ul>
    </div>
  )
}
