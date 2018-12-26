import axios from 'axios';
import { fetchProject } from './actions';
import { updateUploadStatus } from './progress_actions';
import {
  FETCH_TRACK,
  FETCH_TRACKS,
  DELETE_AUDIO_FILE,
  UPDATE_TRACK_IN_PROJECT
} from './actionTypes';

export function createTrackFile(filePath, trackID) {
  const url = axios.defaults.baseURL + 'api/files/'

  const data = {
    title: filePath.split('/').slice(-1)[0],
    file_path: filePath,
    track: trackID
  }

  const request = axios.post(url, data);

  // THUNK
  // create a track_file object in DB via DRF

  return (dispatch) => {
    request.then( (response) => {
      if (response.status == 201) {
        dispatch(updateUploadStatus('Done'));
        dispatch(UpdateTrackInProject(trackID));
      }
    })
  }
}


export function fetchTrack(id) {
  const url = axios.defaults.baseURL + `api/tracks/${id}/`;

  const request = axios.get(url);

  return {
    type: FETCH_TRACK,
    payload: request
  }
}

export function FetchTracks() {
  const url = 'api/tracks/'
  const request = axios.get(url);
  return {
    type: FETCH_TRACKS,
    payload: request
  }
}


export function UpdateTrackInProject(id) {
  const url = axios.defaults.baseURL + `api/tracks/${id}/`;

  const request = axios.get(url);

  return {
    type: UPDATE_TRACK_IN_PROJECT,
    payload: request
  }
}
