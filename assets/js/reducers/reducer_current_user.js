import { FETCH_CURRENT_USER } from '../actions/actions';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return Object.assign({}, state, action.payload.data);
    default:
      return state;
  }
}
