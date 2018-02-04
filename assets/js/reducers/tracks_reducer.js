import { FETCH_TRACK, FETCH_TRACKS } from '../actions/track_actions';

// NOT IMPLEMENETED
export default function(state = null, action) {
  switch (action.type) {

    case FETCH_TRACK:
      return action.payload.data;

    case FETCH_TRACKS:
      return action.payload.data;

    default:
      return state;
  }
}
