import axios from 'axios';


export function selectProject(project) {
  // selectProject is an actionCreator, it needs to return an action,
  // which is an object with a type property
  return {
    type: 'PROJECT_SELECTED',
    payload: project
  };
}


export const FETCH_PROJECT = 'FETCH_PROJECT';

export function fetchProject(proj_id) {
  const url = window.location.href + `api/projects/${proj_id}`;
  const request = axios.get(url);
  // promise middleware stops this action until the promise finishes
  // once request finishes, displatches a new action of same type but
  // with a payload of the promise response
  return {
    type: FETCH_PROJECT,
    payload: request
  }
}
