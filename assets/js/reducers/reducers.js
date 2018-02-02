import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ProjectReducer from './reducer_active_project';
import ProjectsReducer from './reducer_projects';
import UserReducer from './reducer_current_user';
import TrackReducer from './mediaPlayerReducer';

const rootReducer = combineReducers({
  activeProject: ProjectReducer,
  activeTrack: TrackReducer,
  currentUser: UserReducer,
  form: formReducer,
  projects: ProjectsReducer
})

export default rootReducer;
