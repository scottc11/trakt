import { SCREEN_RESIZE } from '../actions/ui_actions';

const initialState = {
  screen: null,
  header: null,
  body: null,
  mediaPlayer: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SCREEN_RESIZE:
        return Object.assign({}, state, {
            screen: action.screen,
            header: action.header,
            body: action.body,
            mediaPlayer: action.mediaPlayer
        });
  }
  return state;
}
