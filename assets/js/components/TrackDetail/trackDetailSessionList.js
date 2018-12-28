import React, { Component } from 'react';

const TrackSessionList = (props) => {
  const sessions = props.sessions.map( (session) => {
    return (
      <li key={session.id}>
        <span className="fa fa-file"></span> {session.title}
        <span className="track__file-list--date-time"> - {session.date}</span>
        <a href={ session.file } download ><span className="track__file-list--action fa fa-cloud-download"></span></a>
      </li>
    )
  })

  return (
    <div className="track__file-list">
      <h6>sessions</h6>
      <ul>{sessions}</ul>
    </div>
  )
}

export default TrackSessionList;
