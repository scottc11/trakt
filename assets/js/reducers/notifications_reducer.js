import { FETCH_NOTIFICATIONS } from '../actions/notification_actions';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_NOTIFICATIONS:
      return action.payload.data;

    default:
      return state;
  }
}
