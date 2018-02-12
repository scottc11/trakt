// onUploadProgress
// pass the 'status' of the upload to this action, via upload thunks
import { UPDATE_PROGRESS } from './actions';
import { UPDATE_UPLOAD_STATUS } from './actions';

export function updateUploadProgress(loaded, total) {
  let percentLoaded = loaded / total;
  console.log(percentLoaded);
  return {
    type: UPDATE_PROGRESS,
    payload: percentLoaded
  }
}

// this will take a ajax response as a param
export function updateUploadStatus(response) {

  console.log(response.status, response.statusText);

  return {
    type: UPDATE_UPLOAD_STATUS,
    payload: response
  }
}


// use this function as a thunk to trigger other thunks
// initial upload kickoff
export function submitNewTrackForm() {

}
