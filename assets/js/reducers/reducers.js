import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ProjectReducer from './reducer_active_project';
import ProjectsReducer from './reducer_projects';
import UserReducer from './reducer_current_user';
import GenresReducer from './reducer_genres';
import KeysReducer from './reducer_keys';
import TrackReducer from './mediaPlayerReducer';
import StatusReducer from './reducer_status';

const rootReducer = combineReducers({
  activeProject: ProjectReducer,
  activeTrack: TrackReducer,
  currentUser: UserReducer,
  form: formReducer,
  genres: GenresReducer,
  keys: KeysReducer,
  projects: ProjectsReducer,
  statusList: StatusReducer
})

export default rootReducer;
