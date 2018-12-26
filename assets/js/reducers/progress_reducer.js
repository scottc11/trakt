import { UPDATE_PROGRESS, UPDATE_UPLOAD_STATUS } from '../actions/actionTypes';

export default function(state = null, action) {
  switch (action.type) {

    case UPDATE_PROGRESS:
      return Object.assign({}, state, { progress: action.uploadProgress });

    case UPDATE_UPLOAD_STATUS:
      return Object.assign({}, state, { status: action.uploadStatus });

    default:
      return state;
  }
}
