import { CREATE_GENRE } from '../actions/actions';

export default function(state = null, action) {
  switch (action.type) {
    case CREATE_GENRE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
