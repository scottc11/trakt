import React, { Component } from 'react';

export default function(props) {

  const activity = props.activity.map( i => {
    const date = Date(i.timestamp).split('GMT')[0];
    return (
      <li className="activity" key={i.id}>

        <span className="activity--actor">{i.actor.username} </span>
        <span className="activity--verb">{i.verb} </span>
        <span className="activity--target">{i.target.title} </span>
        <span className="activity--timestamp">{date}</span>
      </li>
    )
  })

  return(
    <div>
      <ul>
        {activity}
      </ul>
    </div>
  )
}
