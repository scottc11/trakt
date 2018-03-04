import axios from 'axios';

export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';

export function FetchNotifications() {
  const url = axios.defaults.baseURL + 'api/notifications/';

  const request = axios.get(url);

  return {
    type: FETCH_NOTIFICATIONS,
    payload: request
  }
}
