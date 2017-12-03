import axios from 'axios';
import Cookies from 'js-cookie';

export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const FETCH_PROJECT = 'FETCH_PROJECT';
export const UPDATE_MEDIA_PLAYER = 'UPDATE_MEDIA_PLAYER';
export const CREATE_GENRE = 'CREATE_GENRE';

// Get initial user data to start up application
export function fetchCurrentUser() {
  const url = window.location.href + 'api/users/current/';
  const request = axios.get(url);

  return {
    type: FETCH_CURRENT_USER,
    payload: request
  }
}


// get the currently selected project data
export function fetchProject(proj_id) {
  const url = window.location.href + `api/projects/${proj_id}`;
  const request = axios.get(url);
  // promise middleware stops this action until the promise finishes
  // once request finishes, dispatches a new action of same type but
  // with a payload of the promise response
  return {
    type: FETCH_PROJECT,
    payload: request
  }
}

export function updateMediaPlayer(url, bool) {

  return {
    type: UPDATE_MEDIA_PLAYER,
    payload: { 'url': url, 'active': bool }
  }
}

export function createGenre(values) {
  const url = window.location.href + `api/genres/`;
  const csrftoken = Cookies.get('csrftoken');
  const config = {
    headers: {
      'X-CSRFToken': csrftoken
    }
  };

  const request = axios.post(url, values, config);

  return {
    type: CREATE_GENRE,
    payload: request
  }
}
