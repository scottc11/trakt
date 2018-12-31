import {SCREEN_RESIZE} from './actionTypes';

// ACTIONS FOR GENERAL UI CHANGES

export function ScreenResize() {

  const header = {
    width: window.innerWidth,
    height: 71
  }

  const mediaPlayer = {
    width: window.innerWidth,
    height: 82
  }

  const body = {
    width: window.innerWidth,
    height: window.innerHeight - mediaPlayer.height - header.height
  }

  return {
    type: SCREEN_RESIZE,
    payload: {
      header: header,
      body: body,
      mediaPlayer: mediaPlayer
    }
  };
}
