import { PLAY, PAUSE, UPDATE_MEDIA_PLAYER } from './actionTypes';

// update the media player with a new url to create <audio> element.
export function updateMediaPlayer(url, bool) {
  return {
    type: UPDATE_MEDIA_PLAYER,
    payload: { 'url': url, 'active': bool }
  }
}


export function PlayAudioFile(track, fileIndex) {
  return {
    type: PLAY,
    payload: {...track, fileIndex, isPlaying: true}
  }
}

export function PauseAudioFile(track, fileIndex) {
  return {
    type: PAUSE,
    payload: {...track, fileIndex, isPlaying: false}
  }
}
