import { PLAY, PAUSE, INIT_MEDIA_PLAYER } from './actionTypes';

export function PlayAudioFile(track) {
  return {
    type: PLAY,
    payload: {...track, isPlaying: true}
  }
}

export function PauseAudioFile(track) {
  return {
    type: PAUSE,
    payload: {...track, isPlaying: false}
  }
}


export function InitMediaPlayer(track) {
  return {
    type: INIT_MEDIA_PLAYER,
    payload: {...track, isPlaying: false}
  }
}
