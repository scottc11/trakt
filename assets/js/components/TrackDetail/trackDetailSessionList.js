import React, { Component } from 'react';
import axios from 'axios';
import Button from '../Button';

const TrackSessionList = (props) => {
  const sessions = props.track.sessions.map( (session) => {
    return (
      <li key={session.id}>
        <i className="fas fa-folder"></i> {session.title}
        <span className="track__file-list--date-time"> - {session.date}</span>
        <a href={ session.file } download ><i className="txt--actionable fas fa-cloud-download-alt"></i></a>
      </li>
    )
  })

  return (
    <div className="track__file-list">
      <ul>{sessions}</ul>
      <div>
        <Button action={() => window.location.href = `${axios.defaults.baseURL}track/upload/session/${props.track.id}/`} icon="fas fa-upload" class="btn btn--orange" label="Upload Session" />
      </div>
    </div>
  )
}

export default TrackSessionList;
