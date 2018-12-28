import { UPDATE_PROGRESS, UPDATE_UPLOAD_STATUS } from '../actions/actionTypes';

const initialState = {
  progress: 0,
  status: 'N/A'
}

export default function(state = initialState, action) {
  switch (action.type) {

    case UPDATE_PROGRESS:
      return Object.assign({}, state, { progress: action.uploadProgress });

    case UPDATE_UPLOAD_STATUS:
      return Object.assign({}, state, { status: action.uploadStatus });

    default:
      return state;
  }
}
