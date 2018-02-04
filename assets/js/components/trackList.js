import React from 'react';
import axios from 'axios';
import TrackDetail from './trackDetail';
import TrackForm from './forms/submitTrack';

const TrackList = (props) => {
  const trackItems = props.tracks.map( (track) => {
    return <TrackDetail key={track.id} track={track} />
  });

  return (
    <ul className="track-list col-xs-9">
      {trackItems}
      <li><TrackForm /></li>
    </ul>
  )
}

export default TrackList;
