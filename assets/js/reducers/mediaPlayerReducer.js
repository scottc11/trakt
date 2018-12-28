import { UPDATE_MEDIA_PLAYER, PLAY, PAUSE } from '../actions/actionTypes';

export default function(state = { url: '', isPlaying: false }, action) {
  switch (action.type) {
    case PLAY:
      return {url: action.payload, isPlaying: true}
    case PAUSE:
      return {url: action.payload, isPlaying: false}
    case UPDATE_MEDIA_PLAYER:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
