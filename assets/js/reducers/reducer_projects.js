import { FETCH_PROJECTS } from '../actions/actions';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_PROJECTS:
      console.log(action.payload.data);
      return action.payload.data
    default:
      return state;
  }
}