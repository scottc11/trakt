import { SCREEN_RESIZE, FETCHING_IN_PROGRESS, } from '../actions/actionTypes';

const initialState = {
  header: null,
  body: null,
  mediaPlayer: null,
  isFetching: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SCREEN_RESIZE:
        return Object.assign({}, state, {...action.payload});

    case FETCHING_IN_PROGRESS:
      return {...state, isFetching: action.payload}

    default:
      return state;
  }

}
