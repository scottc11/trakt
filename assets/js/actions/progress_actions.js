// onUploadProgress
// pass the 'status' of the upload to this action, via upload thunks
import { UPDATE_PROGRESS } from './actions';
import { UPDATE_UPLOAD_STATUS } from './actions';

export function updateUploadProgress(loaded, total) {
  let percentLoaded = Math.round( (loaded / total) * 100 );
  return {
    type: UPDATE_PROGRESS,
    uploadProgress: percentLoaded
  }
}

// this will take a ajax response as a param
export function updateUploadStatus(statusText) {
  return {
    type: UPDATE_UPLOAD_STATUS,
    uploadStatus: statusText
  }
}


// use this function as a thunk to trigger other thunks
// initial upload kickoff
export function submitNewTrackForm() {

}
