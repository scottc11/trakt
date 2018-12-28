import { FETCH_TRACK_LIST } from '../actions/actionTypes';



export default function(state = [], action) {
  switch (action.type) {

    case FETCH_TRACK_LIST:
      return action.payload.data;

    default:
      return state;
  }
}
