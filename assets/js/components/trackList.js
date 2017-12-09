import React from 'react';
import TrackDetail from './trackDetail';

const TrackList = (props) => {
  const trackItems = props.tracks.map( (track) => {
    if (track.status == props.status) {
      return <TrackDetail key={track.id} track={track} />
    }
  });

  return (
    <ul className="track-list col-xs-3">
      <li className="track-list--status">{ props.label }</li>
      {trackItems}
    </ul>
  )
}

export default TrackList;
