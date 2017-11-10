import { UPDATE_MEDIA_PLAYER } from '../actions/actions';

export default function(state = { 'url': '', 'active': false }, action) {
  switch (action.type) {
    case UPDATE_MEDIA_PLAYER:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
