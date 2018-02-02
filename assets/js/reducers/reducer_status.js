import { FETCH_STATUS_LIST } from '../actions/actions';

export default function(state = null, action) {
  switch (action.type) {

    case FETCH_STATUS_LIST:
      console.log(action.payload.data);
      return action.payload.data;

    default:
      return state;
  }
}
