import { FETCH_TAGS, CREATE_TAG } from '../actions/actionTypes';

export default function(state = [], action) {
  switch (action.type) {

    case FETCH_TAGS:
      return action.payload.data

    case CREATE_TAG:
      if (action.payload.status == 201) {
        return [ action.payload.data, ...state ];
      } else {
        return state;
      }

    default:
      return state;
  }
}
