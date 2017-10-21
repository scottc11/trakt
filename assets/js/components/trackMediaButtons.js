import React from 'react';

// below syntax 'peels off' the properties of the 'props' object.
// ex. onTrackPlay === props.onTrackPlay
const MediaButtons = ({track, onPlay, onPause, onStop}) => {
  return (
    <div>
      <span onClick={ () => onPlay(track) } className="fa fa-play"></span>
      <span onClick={ () => onPause(track) } className="fa fa-pause"></span>
      <span onClick={ () => onStop() } className="fa fa-stop"></span>
    </div>
  )
}

export default MediaButtons;
