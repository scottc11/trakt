import { FETCH_KEYS } from '../actions/actions';

export default function(state = null, action) {
  switch (action.type) {

    case FETCH_KEYS:
      return action.payload.data;

    default:
      return state;
  }
}
