import React from 'react';
import Track from './trackDetail';

const TrackList = (props) => {
  const trackItems = props.tracks.map( (track) => {
    return <Track key={track.id} track={track} audioCtx={props.audioCtx} />
  });

  // if tracks ajax still loading
  if (props.tracks.length === 0) { return (<div className="track-list__spinner">loading....</div>) }

  return (
    <ul className="track-list">
      {trackItems}
    </ul>
  )
}

export default TrackList;
