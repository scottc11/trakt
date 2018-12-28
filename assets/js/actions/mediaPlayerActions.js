import { PLAY, PAUSE, UPDATE_MEDIA_PLAYER } from './actionTypes';

// update the media player with a new url to create <audio> element.
export function updateMediaPlayer(url, bool) {
  return {
    type: UPDATE_MEDIA_PLAYER,
    payload: { 'url': url, 'active': bool }
  }
}


export function PlayAudioFile(filePath) {
  return {
    type: PLAY,
    payload: filePath
  }
}

export function PauseAudioFile(filePath) {
  return {
    type: PAUSE,
    payload: filePath
  }
}
