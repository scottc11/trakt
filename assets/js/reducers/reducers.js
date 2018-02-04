import { combineReducers } from 'redux';

import ProjectReducer from './project_reducer';
import ProjectsReducer from './reducer_projects';
import UserReducer from './reducer_current_user';
import GenresReducer from './genres_reducer';
import KeysReducer from './keys_reducer';
import TrackReducer from './mediaPlayerReducer';
import StatusReducer from './status_reducer';

const rootReducer = combineReducers({
  activeProject: ProjectReducer,
  activeTrack: TrackReducer,
  currentUser: UserReducer,
  genres: GenresReducer,
  keys: KeysReducer,
  projects: ProjectsReducer,
  statusList: StatusReducer
})

export default rootReducer;
