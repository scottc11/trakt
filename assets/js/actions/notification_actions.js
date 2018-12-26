import axios from 'axios';
import { FETCH_NOTIFICATIONS } from './actionTypes';

export function FetchNotifications() {
  const url = axios.defaults.baseURL + 'api/notifications/';

  const request = axios.get(url);

  return {
    type: FETCH_NOTIFICATIONS,
    payload: request
  }
}
