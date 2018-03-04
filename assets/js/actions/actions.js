import axios from 'axios';

export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const FETCH_PROJECT = 'FETCH_PROJECT';
export const UPDATE_MEDIA_PLAYER = 'UPDATE_MEDIA_PLAYER';
export const CREATE_GENRE = 'CREATE_GENRE';
export const FETCH_GENRES = 'FETCH_GENRES';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const CREATE_KEY = 'CREATE_KEY';
export const FETCH_KEYS = 'FETCH_KEYS';
export const CREATE_STATUS = 'CREATE_STATUS';
export const FETCH_STATUS_LIST = 'FETCH_STATUS_LIST';
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';
export const UPDATE_UPLOAD_STATUS = 'UPDATE_UPLOAD_STATUS';

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
