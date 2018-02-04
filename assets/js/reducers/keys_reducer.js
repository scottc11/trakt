import { FETCH_KEYS, CREATE_KEY } from '../actions/actions';

export default function(state = null, action) {
  switch (action.type) {

    case CREATE_KEY:
      if (action.payload.status == 201) {
        return [ action.payload.data, ...state ];
      } else {
        return state;
      }

    case FETCH_KEYS:
      return action.payload.data;

    default:
      return state;
  }
}
