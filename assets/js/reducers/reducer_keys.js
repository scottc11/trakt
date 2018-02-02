import { FETCH_KEYS } from '../actions/actions';

export default function(state = null, action) {
  switch (action.type) {

    case FETCH_KEYS:
      console.log(action.payload.data);
      return action.payload.data;

    default:
      return state;
  }
}
