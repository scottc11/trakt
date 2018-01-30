import React from 'react';
import UserBadge from './userBadge';

export default function(props) {


  const collaborators = props.project.collaborators.map( (user) => <li key={user.id} ><UserBadge user={user} /></li> )

  return (
    <div className="project__detail col-xs-3">
      <div className="project__detail--header">
        <h1>{props.project.title}</h1>
        <hr></hr>
      </div>
      <div className="project__detail--collaborators">
        <h4>Collaborators</h4>
        <ul>
          {collaborators}
        </ul>
      </div>
    </div>
  )
}
