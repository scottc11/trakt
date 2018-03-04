import { CREATE_GENRE } from '../actions/actions';
import { FETCH_GENRES } from '../actions/actions';

export default function(state = null, action) {
  switch (action.type) {

    case CREATE_GENRE:
      if (action.payload.status == 201) {
        return [ action.payload.data, ...state ];
      } else {
        return state;
      }


    case FETCH_GENRES:
      return action.payload.data;

    default:
      return state;
  }
}
