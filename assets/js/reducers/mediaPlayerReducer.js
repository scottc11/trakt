import { PLAY, PAUSE, UPDATE_ACTIVE_TRACK_ACTIVE_FILE, INIT_MEDIA_PLAYER } from '../actions/actionTypes';

export default function(state = { url: '', isPlaying: false }, action) {
  switch (action.type) {

    case INIT_MEDIA_PLAYER:
      return action.payload

    case PLAY:
      return action.payload

    case PAUSE:
      return action.payload

    case UPDATE_ACTIVE_TRACK_ACTIVE_FILE:
      return Object.assign({}, state, {activeFileIndex: action.payload.index})

    default:
      return state;
  }
}
