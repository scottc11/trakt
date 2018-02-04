import axios from 'axios';

import { CREATE_STATUS, FETCH_STATUS_LIST } from './actions';


export function createStatus(label) {
  const url = window.location.href + `api/status/`;

  const data = {
    label: label
  }

  const request = axios.post(url, data);
  
  return {
    type: CREATE_STATUS,
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
