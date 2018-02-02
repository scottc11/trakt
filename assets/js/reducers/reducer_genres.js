import { CREATE_GENRE } from '../actions/actions';
import { FETCH_GENRES } from '../actions/actions';

export default function(state = null, action) {
  switch (action.type) {

    case CREATE_GENRE:
      return Object.assign({}, state, action.payload);

    case FETCH_GENRES:
      console.log(action.payload.data);
      return action.payload.data;

    default:
      return state;
  }
}
