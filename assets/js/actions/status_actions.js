import axios from 'axios';

import { CREATE_STATUS, FETCH_STATUS_LIST } from './actionTypes';


export function createStatus(label, hex_code) {
  const url = window.location.href + `api/status/`;

  const data = {
    label: label,
    hex_code: hex_code
  }

  const request = axios.post(url, data);

  return {
    type: CREATE_STATUS,
    payload: request
  }
}


// updateStatusList()
// UpdateMessages()

export function fetchStatusList() {
  const url = window.location.href + `api/status/`;
  const request = axios.get(url);

  return {
    type: FETCH_STATUS_LIST,
    payload: request
  }
}
