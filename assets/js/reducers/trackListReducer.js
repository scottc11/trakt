import _ from 'lodash';
import {
  FETCH_TRACK,
  FETCH_TRACK_LIST,
  UPDATE_ACTIVE_FILE_INDEX,
  DELETE_AUDIO_FILE,
  DELETE_TRACK
} from '../actions/actionTypes';



export default function(state = [], action) {
  switch (action.type) {

    case FETCH_TRACK:
      // update item in array
      return state.map(track => {
        if (track.id == action.payload.data.id) {
          return action.payload.data
        } else {
          return track
        }
      })

    case FETCH_TRACK_LIST:
      return action.payload.data;

    // updating item in array
    case DELETE_AUDIO_FILE:
      return state

    case DELETE_TRACK:
      return state.filter( track => track.id == action.payload ? false : true)

    case UPDATE_ACTIVE_FILE_INDEX:
      // Updating an Item in an Array
      return state.map( (track, i) => {
        if (track.id == action.payload.track.id) {
          return { ...state[i], activeFileIndex: action.payload.index}
        } else {
          return track
        }
      })

    default:
      return state;
  }
}
