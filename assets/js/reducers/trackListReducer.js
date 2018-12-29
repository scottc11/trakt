import _ from 'lodash';
import { FETCH_TRACK_LIST, UPDATE_ACTIVE_FILE_INDEX } from '../actions/actionTypes';



export default function(state = [], action) {
  switch (action.type) {

    case FETCH_TRACK_LIST:
      return action.payload.data;

    case UPDATE_ACTIVE_FILE_INDEX:
      // Updating an Item in an Array
      return state.map( (track, i) => {
        if (track.id == action.payload.trackId) {
          return { ...state[i], activeFileIndex: action.payload.index}
        } else {
          return track
        }
      })

    default:
      return state;
  }
}
