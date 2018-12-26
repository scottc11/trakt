import { PLAY, PAUSE, UPDATE_MEDIA_PLAYER } from './actionTypes';

// update the media player with a new url to create <audio> element.
export function updateMediaPlayer(url, bool) {
  return {
    type: UPDATE_MEDIA_PLAYER,
    payload: { 'url': url, 'active': bool }
  }
}


export function PlayAudioFile(file) {
  return {
    type: PLAY,
    payload: file
  }
}

export function PauseAudioFile(file) {
  return {
    type: PAUSE,
    payload: file
  }
}
