import axios from 'axios';
import { fetchProject } from './actions';
import { updateUploadStatus } from './progress_actions';
import {
  FETCH_TRACK,
  FETCH_TRACK_LIST,
  FETCHING_IN_PROGRESS,
  DELETE_AUDIO_FILE,
  DELETE_TRACK,
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
        dispatch(FetchTrackList());
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

export function FetchTrackList(proj_id = null) {
  const url = proj_id == null ? 'api/tracks/' : `api/tracks/?project=${proj_id}`

  return (dispatch) => {
    dispatch({ type: FETCHING_IN_PROGRESS, payload: true })
    axios.get(url).then(res => {
      dispatch({ type: FETCH_TRACK_LIST, payload: res })
      dispatch({ type: FETCHING_IN_PROGRESS, payload: false })
    })
  }
}


export function DeleteAudioFile(fileId, trackId) {
  const url = `api/files/${fileId}/`;

  return (dispatch) => {
    axios.delete(url).then( (res) => {
      if (res.status === 204) {
        dispatch({ type: DELETE_AUDIO_FILE, payload: null })
      }
      dispatch(fetchTrack(trackId))
    })
  }
}

export function DeleteTrack(id) {
  const url = `api/tracks/${id}/`;

  return (dispatch) => {
    axios.delete(url).then( (res) => {
      if (res.status === 204) {
        dispatch({ type: DELETE_TRACK, payload: id })
      }
    })
  }
}

export function UpdateActiveFileIndex(track, index) {
  const payload = {track, index};
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
