import { FETCH_NOTIFICATIONS } from '../actions/actionTypes';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_NOTIFICATIONS:
      return action.payload.data;

    default:
      return state;
  }
}
