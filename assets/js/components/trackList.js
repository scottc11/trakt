import React from 'react';
import axios from 'axios';
import TrackDetail from './trackDetail';

const TrackList = (props) => {
  const trackItems = props.tracks.map( (track) => {
    return <TrackDetail key={track.id} track={track} />
  });

  return (
    <ul className="track-list col-xs-9">
      {trackItems}
    </ul>
  )
}

export default TrackList;
