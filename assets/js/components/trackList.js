import React from 'react';
import Track from './trackDetail';

const TrackList = (props) => {
  const trackItems = props.tracks.map( (track) => {
    return <Track key={track.id} track={track} />
  });

  // if tracks ajax still loading
  if (!props.tracks.length) {
    return (
      <div className="track-list__spinner">
        <div className="spinner--track-list">
        </div>
      </div>
    )
  }

  return (
    <ul className="track-list col-xs-3">
      <li className="track-list--status">{ props.status }</li>
      {trackItems}
    </ul>
  )
}

export default TrackList;
