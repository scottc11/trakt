import { FETCH_TRACK, FETCH_TRACK_LIST } from '../actions/actionTypes';

// NOTE: slice reducer: a reducer that is being used to handle updates to one
// specific slice of the state tree, usually done by passing it to combineReducers
// NOT IMPLEMENETED
export default function(state = null, action) {
  switch (action.type) {

    case FETCH_TRACK:
      return action.payload.data;

    default:
      return state;
  }
}
