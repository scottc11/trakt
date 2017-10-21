import React from 'react';
import Track from './trackDetail';

const TrackList = (props) => {
  const trackItems = props.tracks.map( (track) => {
    return <Track key={track.id} track={track} />
  });

  return (
    <ul className="track-list">
      {trackItems}
    </ul>
  )
}

export default TrackList;
