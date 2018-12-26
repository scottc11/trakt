import axios from 'axios';

import { CREATE_GENRE, FETCH_GENRES } from './actionTypes';

export function createGenre(label) {
  const url = window.location.href + `api/genres/`;
  const data = {
    label: label
  }
  const request = axios.post(url, data);

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
