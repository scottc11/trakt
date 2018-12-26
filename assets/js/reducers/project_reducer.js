import { combineReducers } from 'redux';

import { FETCH_PROJECT, UPDATE_TRACK_IN_PROJECT } from '../actions/actionTypes';

// State is not app state, only state this reducer is reponsible for
// it is different than projects reducer because this state changes based
// on Redux Actions.
// action.payload will return a project object { title, id, tracks, ect. }

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PROJECT:
      return Object.assign(
        {},
        state,
        action.payload.data
      );

    // updating item in array
    case UPDATE_TRACK_IN_PROJECT:
      const updatedItems = state.tracks.map( (item) => {
        if (item.id === action.payload.data.id) {
          return Object.assign({}, item, action.payload.data);
        } else {
          return item
        }
      })
      // you only need to includ ethe keys which have changed in order to
      // update a 'slice' of state being returned by this reducer.
      const updatedState = { tracks: updatedItems }
      return Object.assign({}, state, updatedState);

    default:
      return state;
  }
}
