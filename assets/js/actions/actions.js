import axios from 'axios';

export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const FETCH_PROJECT = 'FETCH_PROJECT';

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
