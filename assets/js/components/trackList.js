import React from 'react';
import axios from 'axios';
import TrackDetail from './trackDetail';

const TrackList = (props) => {
  const trackItems = props.tracks.map( (track) => {
    return <TrackDetail key={track.id} track={track} />
  });

  return (
    <ul style={{height: props.dimensions.height}} className="track-list col-xs-12 col-sm-9">
      {trackItems}
    </ul>
  )
}

export default TrackList;
