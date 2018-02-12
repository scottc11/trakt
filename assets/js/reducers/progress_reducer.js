import { UPDATE_PROGRESS, UPDATE_UPLOAD_STATUS } from '../actions/actions';

export default function(state = null, action) {
  switch (action.type) {

    case UPDATE_PROGRESS:
      return action.payload;

    case UPDATE_UPLOAD_STATUS:
      return action.payload;

    default:
      return state;
  }
}
