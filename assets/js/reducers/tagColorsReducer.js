import { FETCH_TAG_COLORS } from '../actions/actionTypes';

export default function(state = [], action) {
  switch (action.type) {

    case FETCH_TAG_COLORS:
      return action.payload.data

    default:
      return state;
  }
}
