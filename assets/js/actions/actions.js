import axios from 'axios';
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const FETCH_PROJECT = 'FETCH_PROJECT';
export const UPDATE_MEDIA_PLAYER = 'UPDATE_MEDIA_PLAYER';
export const CREATE_GENRE = 'CREATE_GENRE';
export const FETCH_GENRES = 'FETCH_GENRES';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_KEYS = 'FETCH_KEYS';
export const FETCH_STATUS_LIST = 'FETCH_STATUS_LIST';


// Get initial user data to start up application
export function fetchCurrentUser() {
  const url = window.location.href + 'api/users/current/';
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
  const url = window.location.href + `api/projects/${proj_id}`;
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

export function createGenre(values) {
  const url = window.location.href + `api/genres/`;
  const request = axios.post(url, values);

  return {
    type: CREATE_GENRE,
    payload: request
  }
}

export function fetchGenres() {
  const url = window.location.href + `api/genres/`;
  const request = axios.get(url);

  return {
    type: FETCH_GENRES,
    payload: request
  }
}


export function fetchKeys() {
  const url = window.location.href + `api/keys/`;
  const request = axios.get(url);

  return {
    type: FETCH_KEYS,
    payload: request
  }
}


export function fetchStatusList() {
  const url = window.location.href + `api/status/`;
  const request = axios.get(url);

  return {
    type: FETCH_STATUS_LIST,
    payload: request
  }
}
