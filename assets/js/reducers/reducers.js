import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ProjectReducer from './reducer_active_project';
import UserReducer from './reducer_current_user';
import TrackReducer from './reducer_active_track';

const rootReducer = combineReducers({
  activeProject: ProjectReducer,
  activeTrack: TrackReducer,
  currentUser: UserReducer,
  form: formReducer
})

export default rootReducer;
