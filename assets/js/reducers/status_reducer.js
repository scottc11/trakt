import { FETCH_STATUS_LIST, CREATE_STATUS } from '../actions/actions';

export default function(state = null, action) {
  switch (action.type) {

    case CREATE_STATUS:
      if (action.payload.status == 201) {
        return [ action.payload.data, ...state ];
      } else {
        return state;
      }

    case FETCH_STATUS_LIST:
      return action.payload.data;

    default:
      return state;
  }
}
