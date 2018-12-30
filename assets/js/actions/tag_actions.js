import axios from 'axios';
import {
  FETCH_TAG_COLORS,
  CREATE_TAG,
  FETCH_TAGS,
} from './actionTypes';

export function FetchTagColors() {
  const url = 'api/tagcolors/';
  const request = axios.get(url);
  return {
    type: FETCH_TAG_COLORS,
    payload: request
  }
}

export function FetchTags() {
  const url = 'api/tags/';
  const request = axios.get(url);
  return {
    type: FETCH_TAGS,
    payload: request
  }
}


export function CreateTag(label, hex_code_id) {
  const url = 'api/tags/';

  const data = {
    label: label,
    color: hex_code_id
  }

  const request = axios.post(url, data)

  return {
    type: CREATE_TAG,
    payload: request
  }

}
