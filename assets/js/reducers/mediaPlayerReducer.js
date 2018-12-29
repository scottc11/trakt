import { UPDATE_MEDIA_PLAYER, PLAY, PAUSE } from '../actions/actionTypes';

export default function(state = { url: '', isPlaying: false }, action) {
  switch (action.type) {

    case PLAY:
      return action.payload

    case PAUSE:
      return action.payload

    case UPDATE_MEDIA_PLAYER:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
