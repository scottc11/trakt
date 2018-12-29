import axios from 'axios';
import { fetchProject } from './actions';
import { updateUploadStatus } from './progress_actions';
import {
  FETCH_TRACK,
  FETCH_TRACK_LIST,
  DELETE_AUDIO_FILE,
  UPDATE_ACTIVE_FILE_INDEX,
  UPDATE_ACTIVE_TRACK_ACTIVE_FILE
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
        dispatch(DeleteAudioFile(trackID));
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

export function FetchTrackList() {
  const url = 'api/tracks/'
  const request = axios.get(url);
  return {
    type: FETCH_TRACK_LIST,
    payload: request
  }
}


export function DeleteAudioFile(id) {
  const url = axios.defaults.baseURL + `api/tracks/${id}/`;

  const request = axios.get(url);

  return {
    type: DELETE_AUDIO_FILE,
    payload: request
  }
}

export function UpdateActiveFileIndex(trackId, index) {
  const payload = {trackId, index};
  return (dispatch) => {
    dispatch({
      type: UPDATE_ACTIVE_FILE_INDEX,
      payload: payload
    })
    dispatch({
      type: UPDATE_ACTIVE_TRACK_ACTIVE_FILE,
      payload: payload
    })
  }
}
