import { UPDATE_MEDIA_PLAYER, PLAY, PAUSE } from '../actions/actionTypes';

export default function(state = { 'url': '', 'active': false }, action) {
  switch (action.type) {
    case PLAY:
      return {'url': action.payload, 'active': true}
    case PAUSE:
      return {'url': action.payload, 'active': false}
    case UPDATE_MEDIA_PLAYER:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
