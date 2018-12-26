import {SCREEN_RESIZE} from './actionTypes';

// ACTIONS FOR GENERAL UI CHANGES

export function ScreenResize() {
  const screen = {
    width: window.innerWidth,
    height: window.innerHeight
  }

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
    height: screen.height - mediaPlayer.height - header.height
  }

  return {
    type: SCREEN_RESIZE,
    screen: window,
    header: header,
    body: body,
    mediaPlayer: mediaPlayer
  };
}
