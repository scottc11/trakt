import axios from 'axios';
import { fetchProject } from './actions';
import { updateUploadStatus } from './progress_actions';

export const FETCH_TRACK = 'FETCH_TRACK';
export const FETCH_TRACKS = 'FETCH_TRACKS';

export function createTrackFile(filePath, trackID, projID) {
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
        dispatch(fetchProject(projID));
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
