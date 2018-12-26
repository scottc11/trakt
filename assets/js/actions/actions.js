import axios from 'axios';
import {
  FETCH_CURRENT_USER,
  FETCH_PROJECTS,
  FETCH_PROJECT,
  UPDATE_MEDIA_PLAYER
} from './actionTypes';

// Get initial user data to start up application
export function fetchCurrentUser() {
  const url = axios.defaults.baseURL + 'api/users/current/';
  const request = axios.get(url);

  return {
    type: FETCH_CURRENT_USER,
    payload: request
  }
}

export function fetchProjects() {
  const url = axios.defaults.baseURL + 'api/projects/'
  const request = axios.get(url);

  return {
    type: FETCH_PROJECTS,
    payload: request
  }
}


// get the currently selected project data
export function fetchProject(proj_id) {
  const url = window.location.href + `api/projects/${proj_id}/`;
  const request = axios.get(url);

  return {
    type: FETCH_PROJECT,
    payload: request
  }
}

// update the media player with a new url to create <audio> element.
export function updateMediaPlayer(url, bool) {
  return {
    type: UPDATE_MEDIA_PLAYER,
    payload: { 'url': url, 'active': bool }
  }
}
