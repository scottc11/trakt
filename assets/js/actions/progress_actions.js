import axios from 'axios';

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
// Geting the signed url from the server
export function getSignedUrl(file, trackID, projID) {
  const url = axios.defaults.baseURL + 'track/submit/sign_url/'
  const params = {
    filename: file.name,
    type: file.type,
    expiration: '10',
    track_id: trackID
  }

  const request = axios.get(url, { params: params } )

  return (dispatch) => {
    request.then( response => {
      dispatch(updateUploadStatus('PREPARING UPLOADING'));
      if (response.status == 200) {
        dispatch(uploadFileToCloud(file, response.data.file_path, response.data.signed_url, trackID, projID));
      }
    })
    .catch( (err) => {
      dispatch( updateUploadStatus('ERROR') );
    });
  }
}

// upload file directly to gcloud using the returned 'signed url' file path
export function uploadFileToCloud(file, filePath, signedURL, trackID, projID) {
  // immediately return a thunk so you have dispatch available for 'onUploadProgress'
  return (dispatch) => {

    const filePath = filePath;
    const config = {
      headers: { 'Content-Type': file.type },
      onUploadProgress: (progressEvent) => {
        dispatch(updateUploadProgress(progressEvent.loaded, progressEvent.total));
      }
    }

    dispatch(updateUploadStatus('UPLOADING'))

    axios.put(signedURL, file, config)
      .then( (response) => {
        dispatch( updateUploadStatus('ADDING TO PROJECT') );
        dispatch( createTrackFile(filePath, trackID, projID) );
      })
      .catch( (err) => {
        dispatch( updateUploadStatus('ERROR') );
      });
  }
}
