import { FETCH_PROJECTS } from '../actions/actionTypes';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_PROJECTS:
      return action.payload.data
    default:
      return state;
  }
}
