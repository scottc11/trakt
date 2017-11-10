import React from 'react';

const TrackDetails = (props) => {
  return (
    <div className="track--badges">
      <span className="badge badge--genre">{ props.genre }</span>
      <span className="badge badge--key">{ props._key }</span>
      <span className="badge badge--bpm">{ props.bpm }</span>
    </div>
  )
}

export default TrackDetails;
