import { FETCH_PROJECT } from '../actions/actions';

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
    default:
      return state;
  }
}
