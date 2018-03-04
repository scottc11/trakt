import axios from 'axios';

import { CREATE_KEY, FETCH_KEYS } from './actions';

export function createKey(label) {
  const url = window.location.href + `api/keys/`;
  const data = {
    label: label
  }
  const request = axios.post(url, data);

  return {
    type: CREATE_KEY,
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
